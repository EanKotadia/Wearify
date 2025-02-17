import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { db } from '../Firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { firebase } from '../Firebase/firebase';

const AdminAddProductScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [carbonSaved, setCarbonSaved] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdmin = async () => {
            const user = firebase.auth().currentUser;
            if (user?.email === 'kotadia.ean@gmail.com') {
                setIsAdmin(true);
            } else {
                Alert.alert("Access Denied", "You are not authorized to access this page.");
                navigation.navigate('Home'); // Redirect non-admin users
            }
        };
        checkAdmin();
    }, []);

    const handleAddProduct = async () => {
        try {
            // Validate input
            if (!name || !description || !price || !carbonSaved || !imageUrl) {
                Alert.alert("Error", "All fields are required!");
                return;
            }

            // Add product to Firestore
            await addDoc(collection(db, "products"), {
                name,
                description,
                price: parseFloat(price),
                carbonSaved: parseFloat(carbonSaved),
                imageUrl,
            });

            // Reset input fields
            setName('');
            setDescription('');
            setPrice('');
            setCarbonSaved('');
            setImageUrl('');

            Alert.alert("Success", "Product added successfully!");
        } catch (error) {
            Alert.alert("Error", "There was an error adding the product: " + error.message);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Add a New Product</Text>
            <TextInput
                placeholder="Product Name"
                value={name}
                onChangeText={setName}
                style={{ marginBottom: 10, borderBottomWidth: 1 }}
            />
            <TextInput
                placeholder="Product Description"
                value={description}
                onChangeText={setDescription}
                style={{ marginBottom: 10, borderBottomWidth: 1 }}
            />
            <TextInput
                placeholder="Price"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
                style={{ marginBottom: 10, borderBottomWidth: 1 }}
            />
            <TextInput
                placeholder="Carbon Saved (kg)"
                keyboardType="numeric"
                value={carbonSaved}
                onChangeText={setCarbonSaved}
                style={{ marginBottom: 10, borderBottomWidth: 1 }}
            />
            <TextInput
                placeholder="Image URL"
                value={imageUrl}
                onChangeText={setImageUrl}
                style={{ marginBottom: 10, borderBottomWidth: 1 }}
            />
            <Button title="Add Product" onPress={handleAddProduct} disabled={!isAdmin} />
        </View>
    );
};

export default AdminAddProductScreen;
