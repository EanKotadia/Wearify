import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from '../Firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebase';

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            // Create a new user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save additional user info in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                carbonSaved: 0, // Initialize carbon saved to 0
            });

            navigation.navigate('Home');
        } catch (error) {
            alert('Signup failed. Please try again.');
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
            <Button title="Sign Up" onPress={handleSignup} />
            <Text onPress={() => navigation.navigate('Login')}>Already have an account? Log in</Text>
        </View>
    );
};

export default SignupScreen;
