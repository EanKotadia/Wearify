import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebase';

const ProfileScreen = () => {
    const [user, setUser] = useState(null);
    const [carbonSaved, setCarbonSaved] = useState(0);

    useEffect(() => {
        const auth = getAuth();
        const fetchUserData = async () => {
            if (!auth.currentUser) return;
            setUser(auth.currentUser);

            const userRef = doc(db, 'users', auth.currentUser.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                setCarbonSaved(userDoc.data().carbonSaved || 0);
            }
        };

        fetchUserData();
    }, []);

    return (
        <View style={styles.container}>
            {user ? (
                <>
                    <Text style={styles.name}>{user.displayName || 'User'}</Text>
                    <Text>Email: {user.email}</Text>
                    <Text>Carbon Saved: {carbonSaved} kg</Text>
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    name: { fontSize: 22, fontWeight: 'bold' },
});

export default ProfileScreen;
