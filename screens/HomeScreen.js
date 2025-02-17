import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import { db, auth } from '../Firebase/firebase';
import { getDocs, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import ProductCard from '../components/ProductCard';

const HomeScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userCarbonSaved, setUserCarbonSaved] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productSnapshot = await getDocs(collection(db, 'products'));
                console.log('Fetched products:', productSnapshot.docs.length);

                if (productSnapshot.empty) {
                    setError('No products available.');
                    setLoading(false);
                    return;
                }

                const productList = productSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                console.log('Mapped products:', productList);
                setProducts(productList);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error.message);
                setError('Error fetching products: ' + error.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchUserCarbonSaved = async () => {
            const user = getAuth().currentUser;  // Corrected to use getAuth()
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    setUserCarbonSaved(userDoc.data().carbonSaved || 0);
                }
            }
        };

        fetchUserCarbonSaved();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading products...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'red' }}>{error}</Text>
            </View>
        );
    }

    const handleAddToProfile = async (carbonSaved) => {
        try {
            const user = getAuth().currentUser;  // Corrected to use getAuth()
            if (!user) {
                console.log('User not logged in!');
                return;
            }

            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const currentCarbon = userDoc.data().carbonSaved || 0;
                const newCarbonSaved = currentCarbon + carbonSaved;

                await setDoc(userRef, { carbonSaved: newCarbonSaved }, { merge: true });
                setUserCarbonSaved(newCarbonSaved);
                console.log(`Updated carbon saved: ${newCarbonSaved}`);
            } else {
                console.log('User document does not exist!');
            }
        } catch (error) {
            console.error('Error updating carbon saved:', error.message);
        }
    };

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                Carbon Saved: {userCarbonSaved} kg
            </Text>
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <ProductCard product={item} onAddToProfile={handleAddToProfile} />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default HomeScreen;
