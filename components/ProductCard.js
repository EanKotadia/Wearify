import React from 'react';
import { View, Text, Button, Image } from 'react-native';

const ProductCard = ({ product, onAddToProfile }) => {
    return (
        <View style={{ padding: 10, borderWidth: 1, marginBottom: 10 }}>
            <Image
                source={{ uri: product.imageUrl }}
                style={{ width: 100, height: 100 }}
            />
            <Text>{product.name}</Text>
            <Text>{product.description}</Text>
            <Text>Carbon Saved: {product.carbonSaved} kg</Text>
            <Button
                title="Add to Profile"
                onPress={() => onAddToProfile(product.carbonSaved)}
            />
        </View>
    );
};

export default ProductCard;
