import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Image, ActivityIndicator, Alert } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { fetchProducts } from '../Firebase/firebaseService';

const HomeScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const auth = getAuth();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                navigation.navigate("Login");

                return;
            }

            console.log("User logged in:", user.email);

            try {
                const fetchedProducts = await fetchProducts();
                console.log("Products in HomeScreen:", fetchedProducts);
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        });

        return unsubscribe; // Cleanup listener
    }, []);


    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
                <Text>Loading Products...</Text>
            </View>
        );
    }

    return (
        <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Products</Text>

            {isAdmin && (
                <Button title="Add Product" onPress={() => navigation.navigate('AddProduct')} />
            )}

            {products.length === 0 ? (
                <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 20 }}>No products available.</Text>
            ) : (
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={{ padding: 10, borderBottomWidth: 1, alignItems: 'center' }}>
                            <Image source={{ uri: item.imageUrl }} style={{ width: 100, height: 100, marginBottom: 5 }} />
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
                            <Text style={{ fontSize: 16, color: 'gray' }}>${item.price}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

export default HomeScreen;
