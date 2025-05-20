import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function CatGallery() {
  const navigation = useNavigation();

  const [cats, setCats] = useState([]);
  const [newCatTitle, setNewCatTitle] = useState('');
  const [newCatUrl, setNewCatUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCats = async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=5');
      const data = await response.json();
      setCats(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os gatinhos da API');
    } finally {
      setLoading(false);
    }
  };

  const isValidImageUrl = (url) => {
    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(url);
  };

  const handleAddCat = () => {
    if (!newCatTitle.trim()) {
      Alert.alert('Atenção', 'Dê um nome ao gatinho!');
      return;
    }

    if (!isValidImageUrl(newCatUrl)) {
      Alert.alert('URL inválida', 'Use um link direto de imagem (jpg, png, etc)');
      return;
    }

    const newCat = {
      id: Math.random().toString(),
      title: newCatTitle,
      url: newCatUrl,
      custom: true,
    };

    setCats([newCat, ...cats]);
    setNewCatTitle('');
    setNewCatUrl('');
  };

  useEffect(() => {
    fetchCats();
  }, []);

  if (loading) {
    return (
      <View style={galleryStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B9E" />
      </View>
    );
  }

  return (
    <View style={galleryStyles.container}>
      <TouchableOpacity
        style={galleryStyles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={galleryStyles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

      <View style={galleryStyles.formContainer}>
        <TextInput
          style={[galleryStyles.input, { width: width * 0.9 }]}
          placeholder="Nome do gatinho"
          value={newCatTitle}
          onChangeText={setNewCatTitle}
        />
        <TextInput
          style={[galleryStyles.input, { width: width * 0.9 }]}
          placeholder="Cole a URL da imagem (ex: https://...jpg)"
          value={newCatUrl}
          onChangeText={setNewCatUrl}
          keyboardType="url"
          autoCapitalize="none"
        />
        <TouchableOpacity style={galleryStyles.addButton} onPress={handleAddCat}>
          <Text style={galleryStyles.buttonText}>Adicionar Gatinho</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={galleryStyles.catCard}>
            {item.title && (
              <Text style={galleryStyles.catTitle}>
                {item.title} {item.custom && '🌟'}
              </Text>
            )}
            <Image
              source={{ uri: item.url }}
              style={galleryStyles.catImage}
              onError={() => console.log('Erro ao carregar: ', item.url)}
              resizeMode="cover"
            />
            {item.custom && (
              <Text style={galleryStyles.urlText} numberOfLines={1}>
                {item.url}
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
}

const galleryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD6E7',
    paddingTop: 80,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    right: 100,
    backgroundColor: '#FF6B9E',

    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    zIndex: 10,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#F8F8F8',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  addButton: {
    backgroundColor: '#FF6B9E',
    padding: 14,
    width: width * 0.9,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  catCard: {
    width: width * 0.9,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  catTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B9E',
    marginBottom: 8,
  },
  catImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#F3F3F3',
  },
  urlText: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
