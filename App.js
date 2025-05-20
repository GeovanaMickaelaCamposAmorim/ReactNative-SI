import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/services/firebase';
import { View, StyleSheet } from 'react-native';

import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Home from './src/screens/Home'; // Note: capitalização consistente
import CatGallery from './src/screens/CatGallery';
import Loading from './src/components/Loading';

const Stack = createNativeStackNavigator();

export default function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Adicione este estado

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false); // Desativa loading quando o estado de autenticação é resolvido
        });
        return unsubscribe;
    }, []);

    if (loading) {
        return <Loading />; // Mostra o loading enquanto verifica autenticação
    }

    return (
        <View style={styles.container}>
            <NavigationContainer>
                <Stack.Navigator>
                    {user ? (
                        <>
                            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                            <Stack.Screen name="CatGallery" component={CatGallery} options={{ headerShown: false }} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                        </>
                    )}
                </Stack.Navigator>

            </NavigationContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFD6E7',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        color: '#FF6B9E'
    }
});
