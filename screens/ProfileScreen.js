import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { db } from '../Firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

const ProfileScreen = () => {
    const [userCarbonSaved, setUserCarbonSaved] = useState(0);

    useEffect(() => {
        const fetchUserCarbonSaved = async () => {
            const userId = firebase.auth().currentUser.uid;
            const userRef = doc(db, 'users', userId);

            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                setUserCarbonSaved(userDoc.data().carbonSaved || 0);
            }
        };

        fetchUserCarbonSaved();
    }, []);  // Runs only once when the screen loads

    return (
        <View style={{ padding: 20 }}>
            <Text>User Profile</Text>
            <Text>Carbon Saved: {userCarbonSaved} kg</Text>
        </View>
    );
};

export default ProfileScreen;
