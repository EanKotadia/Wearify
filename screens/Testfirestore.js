const fetchProducts = async () => {
    try {
        const productSnapshot = await getDocs(collection(db, 'products'));

        if (productSnapshot.empty) {
            console.log("No products available.");
            return [];
        }

        const productList = productSnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                price: data.price,
                imageUrl: data.imageUrl,
                description: data.description,
                category: data.category,
                availability: data.availability,
                carbonSaved: parseFloat(data.carbonSaved) || 0, // Ensure number format
                rating: data.rating || 0
            };
        });

        console.log('Fetched products:', productList);
        return productList;
    } catch (error) {
        console.error('Error fetching products:', error.message);
        return [];
    }
};
