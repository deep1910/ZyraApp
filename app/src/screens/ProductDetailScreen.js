import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants/theme';
import { addToCart } from './cartStorage'; // Adjust the import path accordingly

export default function ProductDetailScreen ({ route, navigation }) {
  const { product } = route.params;
  const [selectedSize, setSelectedSize] = useState(null);
  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Please select a size before adding to cart.');
      return;
    }

    const cartItem = { ...product, selectedSize };
    await addToCart(cartItem);
    alert(`${product.name} (${selectedSize}) added to cart!`);
  };

  return (
    <ScrollView style={styles.container}>
       <View style={styles.imageContainer}>
        <Image source={product.image} style={styles.image} />
        
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
       <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:10}}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.brand}>({product.brand})</Text>
          </View>
        
        <Text style={styles.description}>{product.description}</Text>

        <Text style={styles.price}>${product.price.toFixed(2)}</Text>

        <View style={styles.sizeContainer}>
          <Text style={styles.sizeLabel}>Size:</Text>
          {product.sizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                selectedSize === size && styles.selectedSize,
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text style={styles.sizeText}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity  onPress={handleAddToCart} style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: COLORS.white,
    fontSize: SIZES.body3,
  },
  detailsContainer: {
    // padding: SIZES.padding,
    padding:20,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  brand: {
    fontSize: SIZES.h3,
    color: COLORS.gray,
    marginVertical: SIZES.base,
  },
  price: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  description: {
    fontSize: SIZES.body3,
    color: COLORS.gray,
    marginVertical: SIZES.base,
  },
  sizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.base,
  },
  sizeLabel: {
    fontSize: SIZES.body3,
    color: COLORS.gray,
    marginRight: SIZES.base,
  },
  sizeButton: {
    // paddingHorizontal: SIZES.padding,
    // paddingVertical: SIZES.base,
    // marginRight: SIZES.base,
    marginRight:20,
    padding:10,
    width:40,
    height:40,
    borderRadius:100,
    alignItems:'center',
    // borderWidth: 0,
    borderColor: COLORS.gray,
    // borderRadius: SIZES.radius,
    backgroundColor:COLORS.primary
  },
  selectedSize: {
    backgroundColor: 'red',
    borderColor: COLORS.primary,
  },
  sizeText: {
    fontSize: 20,
    color:'white'
    // color:COLORS.primary,
  },
  addToCartButton: {
    backgroundColor: COLORS.primary,
    // paddingVertical: SIZES.padding,
    borderRadius:30,
    width:120,
    height:40,
    alignItems:'center',
    alignContent:'center'
    // marginTop: SIZES.padding,
  },
  addToCartText: {
    color: COLORS.white,
    fontSize: SIZES.body3,
    fontWeight: 'bold',
    textAlign: 'center',
    alignContent:'center'
  },
});









