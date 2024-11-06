// cartStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_KEY = '@cart_items';

// Function to add an item to the cart
export const addToCart = async (item) => {
    try {
      const existingCart = await getCart(); // Get current cart items
  
      // Check if the item already exists in the cart
      const itemExists = existingCart.some(cartItem => cartItem.id === item.id);
  
      if (itemExists) {
        console.log('Item already in cart:', item);
        return; // Do not add the item if it already exists
      }
  
      const updatedCart = [...existingCart, item]; // Create new cart array
      await AsyncStorage.setItem(CART_KEY, JSON.stringify(updatedCart)); // Store updated cart
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  
// Function to get cart items
export const getCart = async () => {
  try {
    const cartData = await AsyncStorage.getItem(CART_KEY); // Fetch cart from AsyncStorage
    return cartData != null ? JSON.parse(cartData) : []; // Parse JSON or return empty array
  } catch (error) {
    console.error('Error retrieving cart:', error);
    return [];
  }
};


export const clearCart = async () => {
    try {
      await AsyncStorage.clear(); // Clears all AsyncStorage data
      console.log('AsyncStorage has been cleared.');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };
