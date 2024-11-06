import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import { getCart, clearCart } from './cartStorage'; // Adjust the import path accordingly
import { COLORS, SIZES, FONTS } from '../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons'
const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items
  const fetchCartItems = async () => {
    const items = await getCart();
    setCartItems(items);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const emptyCart = async () => {
    await clearCart(); // Clear the cart from AsyncStorage
    await fetchCartItems(); // Reload the cart items after clearing
    Alert.alert("Cart Cleared", "Your cart has been emptied.");
  };

  const handleRemoveItem = async (itemToRemove) => {
    const updatedCart = cartItems.filter(item => item.name !== itemToRemove.name);
    setCartItems(updatedCart);
    // Optionally, you can save the updated cart back to AsyncStorage here
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.cartItemName}>{item.name}</Text>
      <Text style={styles.cartItemSize}>Size: {item.selectedSize}</Text>
      <Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>
      <TouchableOpacity onPress={() => handleRemoveItem(item)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
        
      <View style={styles.cart}>
      <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Your Cart</Text>
        <TouchableOpacity onPress={emptyCart}>
            <Icon name='delete-outline' size={25} />
          {/* <Text style={styles.header}>Empty Cart</Text> */}
        </TouchableOpacity>
      </View>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.name} // You might want to use a unique ID if available
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cart: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    padding:10,
    marginBottom: 20,
    // backgroundColor: 'red',
    height: 50,
  },
  backButton: {
    // position: 'absolute',
    // top: 40,
    // left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: COLORS.white,
    fontSize: SIZES.body3,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: SIZES.padding,
    // backgroundColor:'yellow'
  },
  emptyCartText: {
    fontSize: SIZES.body3,
    color: COLORS.gray,
    textAlign: 'center',
  },
  cartItem: {
    padding: SIZES.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    marginBottom: SIZES.base,
  },
  cartItemName: {
    fontSize: SIZES.body2,
    fontWeight: 'bold',
  },
  cartItemSize: {
    fontSize: SIZES.body3,
    color: COLORS.gray,
  },
  cartItemPrice: {
    fontSize: SIZES.body2,
    color: COLORS.primary,
  },
  removeButton: {
    backgroundColor: COLORS.red,
    padding: SIZES.base,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginTop: SIZES.base,
  },
  removeButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default CartScreen;
