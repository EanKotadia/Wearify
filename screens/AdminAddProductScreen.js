import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebase';

const AdminAddProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleAddProduct = async () => {
        try {
            await addDoc(collection(db, 'newProducts'), {
                name,
                price: parseFloat(price),
                imageUrl,
                description,
            });
            setMessage('Product added successfully!');
            setName('');
            setPrice('');
            setImageUrl('');
            setDescription('');
        } catch (error) {
            setMessage('Error adding product: ' + error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Add New Product</Text>
            <TextInput placeholder="Product Name" value={name} onChangeText={setName} style={styles.input} />
            <TextInput placeholder="Price" value={price} onChangeText={setPrice} style={styles.input} keyboardType="numeric" />
            <TextInput placeholder="Image URL" value={imageUrl} onChangeText={setImageUrl} style={styles.input} />
            <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} />
            <Button title="Add Product" onPress={handleAddProduct} />
            {message ? <Text>{message}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    input: { borderBottomWidth: 1, marginBottom: 10, padding: 5 },
});

export default AdminAddProductScreen;
