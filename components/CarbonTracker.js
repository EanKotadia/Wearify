import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/globalStyles';

const CarbonTracker = ({ carbonSaved }) => {
    return (
        <View style={styles.trackerContainer}>
            <Text style={styles.trackerText}>Total Carbon Saved: {carbonSaved} kg</Text>
        </View>
    );
};

export default CarbonTracker;
