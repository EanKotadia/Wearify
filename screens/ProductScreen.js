import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { db, auth } from '../Firebase/firebase';  // Firebase imports
import { doc, getDoc, updateDoc } from 'firebase/firestore';  // Firestore methods

const ProductScreen = ({ route, navigation }) => {
    const { productId } = route.params;  // Get the productId passed from the previous screen
    const [product, setProduct] = useState(null);
    const [carbonSaved, setCarbonSaved] = useState(0);
    const [loading, setLoading] = useState(true);  // State for loading indicator

    useEffect(() => {
        // Fetch product details from Firestore
        const fetchProduct = async () => {
            try {
                const productDoc = doc(db, 'products', productId);
                const productSnapshot = await getDoc(productDoc);

                if (productSnapshot.exists()) {
                    setProduct(productSnapshot.data());
                    setCarbonSaved(productSnapshot.data().carbonSaved);  // Assuming each product has a carbonSaved value
                } else {
                    Alert.alert("Error", "Product not found.");
                }
            } catch (error) {
                Alert.alert("Error", "Error fetching product details: " + error.message);
            } finally {
                setLoading(false);  // Stop loading when data fetch is complete
            }
        };

        fetchProduct();
    }, [productId]);

    const handleAddToProfile = async () => {
        try {
            const userId = auth.currentUser.uid;
            const userRef = doc(db, 'users', userId);

            const userDoc = await getDoc(userRef);
            const currentCarbon = userDoc.exists() ? userDoc.data().carbonSaved : 0;
            const newCarbonSaved = currentCarbon + carbonSaved;

            // Update the user's carbonSaved value
            await updateDoc(userRef, { carbonSaved: newCarbonSaved });

            // Show success message
            Alert.alert('Success', 'Product added to your profile! Carbon saved updated.');
            navigation.goBack();  // Go back to the previous screen
        } catch (error) {
            Alert.alert("Error", "Error updating carbon saved: " + error.message);
        }
    };

    // If the product is loading, show the loading spinner
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading product details...</Text>
            </View>
        );
    }

    if (!product) {
        return <Text>Product not found.</Text>;  // Handle case if product doesn't exist
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            <Text style={styles.productCarbonSaved}>
                Carbon Saved: {carbonSaved} kg CO₂
            </Text>

            <Button title="Add to Profile" onPress={handleAddToProfile} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productImage: {
        width: 200,
        height: 200,
        marginBottom: 16,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    productDescription: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
    },
    productCarbonSaved: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default ProductScreen;
