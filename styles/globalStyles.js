import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 10,
    },
    input: {
        height: 40,
        borderColor: colors.dark,
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    cardContainer: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: colors.secondary,
        borderRadius: 8,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productDescription: {
        fontSize: 14,
        color: colors.dark,
    },
    productCarbon: {
        fontSize: 14,
        color: colors.primary,
    },
    trackerContainer: {
        padding: 20,
        backgroundColor: colors.primary,
        borderRadius: 8,
    },
    trackerText: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold',
    },
});
