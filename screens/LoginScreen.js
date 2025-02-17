import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from '../Firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate('Home');
        } catch (error) {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <View style={{ padding: 10 }}>
            <TextInput
                style={{ height: 40, borderColor: '#000', borderWidth: 1, marginBottom: 10 }}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={{ height: 40, borderColor: '#000', borderWidth: 1, marginBottom: 10 }}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />
            <Text onPress={() => navigation.navigate('Signup')}>Don't have an account? Sign up</Text>
        </View>
    );
};

export default LoginScreen;
