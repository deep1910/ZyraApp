import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, TextInput, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants/theme';
import { products } from '../constants/dummyData';
const { width } = Dimensions.get('window');
import { Text, Card } from 'react-native-paper'
import Animated, { FadeInRight } from 'react-native-reanimated'
import colimg from '../assets/collection.png'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon1 from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'
import { isEnumDeclaration } from 'typescript';

export default function ProductListingScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [isList, setIsList] = useState(false);
  const [isdark, setdark] = useState(false);

  const toggleTheme = () => {
    setdark((prev) => !prev); // Toggles the state
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchText.toLowerCase())
  );

  const categories = [
    { id: '1', title: 'Shirts', image: require('../assets/shirt.png') },
    { id: '2', title: 'Bottoms', image: require('../assets/bottom.png') },
    { id: '3', title: 'Socks', image: require('../assets/socks.png') },
    { id: '4', title: 'Socks', image: require('../assets/socks.png') },

  ];
  
  // useEffect(()=>{
    
  // },[dark])
  
  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.productCard, isList && styles.listCard , isdark && { backgroundColor: '#333', borderColor: '#444' },
      ]}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <View style={styles.imageContainer}>
        <Image source={item.image} style={[styles.image,  isdark && { backgroundColor: '#333', borderColor: '#444' }]} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.name, isdark && {color:'white'}]}>{item.name}</Text>
        <Text style={[styles.brand,isdark && {color:'white'}]}>{item.brand}</Text>
        <Text style={[styles.price,isdark && {color:'white'}]}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, isdark && { backgroundColor: '#333', borderColor: '#444' },
    ]}>
   
    <View style={styles.heading}>
       
      {isdark ? <Icon2 name="menu-unfold" size={25}  style={styles.iconheaddark}/> : <Icon2 name="menu-unfold" size={25}  style={styles.iconhead}/>}
       <Text style={[{fontWeight:"bold", fontSize:20},isdark && { color:'white' },
]}>Zyra</Text>
       <View style={styles.head}>
       <TouchableOpacity onPress={()=> navigation.navigate("CartScreen")}>{isdark ? <Icon name="cart-outline" size={25}  style={styles.iconheaddark}/> : <Icon name='cart-sharp' size={25}  style={styles.iconhead}/>}</TouchableOpacity>
         <TouchableOpacity  onPress={toggleTheme}>{isdark ? <Icon1 name="toggle-off" size={25}  style={styles.iconheaddark}/> : <Icon1 name='toggle-on' size={25}  style={styles.iconhead}/>}</TouchableOpacity>
       </View>
    </View>
   <View style={[styles.categoriesRow,isdark && { backgroundColor: '#333', borderColor: '#444' },
]}>
        {categories.map((category, index) => (
          <Animated.View
            key={category.id}
            entering={FadeInRight.delay(index * 100).springify()}
            style={styles.categoryWrapper}
          >
            <Card style={styles.card} onPress={() => {}}>
              <View style={styles.cardImage}>
                <Card.Cover 
                source={category.image}
                style={styles.Image}
              />
              </View>
              
              <Card.Content style={styles.cardContent}>
                <Text  style={styles.categoryTitle}>
                  {category.title}
                </Text>
              </Card.Content>
            </Card>
          </Animated.View>
        ))}
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity
          style={styles.listToggle}
          onPress={() => setIsList((prev) => !prev)}
        >
          <Text style={styles.listToggleText}>
            {isList ? 'Grid' : 'List'}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        key={isList ? 'list' : 'grid'}
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={isList ? 1 : 2}
        columnWrapperStyle={!isList ? styles.listWrapper : undefined}
        renderItem={renderProductItem}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical:1 ,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  listToggle: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 8,
  },
  listToggleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  categoriesRow: {
    flexDirection: 'row',
    // gap:1,
    justifyContent: 'space-around',
    marginVertical: 16,
    flexWrap: 'wrap', // Allows wrapping of categories to next line

  },
  categoryWrapper: {
    width: width * 0.2,  // Adjust width to fit screen with spacing
    alignItems: 'center',
    marginBottom: 16,  // Add margin for spacing between rows

  },
  card: {
    
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    overflow: 'hidden',
    // height:100,
    paddingTop:5,
    margin:0,
    width: 70, // Ensure card takes full width of the wrapper
    height: 70,
  },
  cardImage: {
    // backgroundColor:'red',
    padding:2 ,
    // Set height relative to screen width for aspect ratio
    alignSelf: 'center', // Center the image
    resizeMode: 'contain',
  },
  
  Image: {
    
    width: 37,
    height: 37,  // Set height relative to screen width for aspect ratio
  },
  head:{
    width:65,
    // backgroundColor:'red',
   display:'flex',
   flexDirection:'row',
   justifyContent:'space-between'
  },
  iconhead:{
    // size:30,
    //  width:30,s
    // borderWidth:1,
    borderColor:'white' 
    
  },
  iconheaddark:{

    borderRadius:10,
    // pading:30,
    backgroundColor:'white'
  },
  heading:{
    // backgroundColor:'red',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'

  },


  cardContent: {
    // backgroundColor:'red',
    // paddingVe
    // rtical: 8,
  
    // backgroundColor:'blue',
    // padding:6,
    // marginHorizontal:10,
    // display:'flex',
    // width:70,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  categoryTitle: {
    // width:'100%',/
    // backgroundColor:'yellow',
    width:80,
    marginTop:5,
    // padding:6,
    // marginRight:19,
    // textAlign: 'center',
    // fontWeight: 'bold',
    fontSize: 12,
  },

  
 
  title: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  scrollViewContent: {
    margin:10,
    paddingRight: 16,
    // paddingLeft: ,
  },
  productList: {
    paddingBottom: 16,
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    elevation: 2,
  },
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: width * 0.5,
    resizeMode: 'cover',
    // backgroundColor:'red'
  },
  infoContainer: {
    padding: SIZES.padding,
    flex: 1,
  },
  name: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  brand: {
    fontSize: SIZES.body3,
    color: COLORS.gray,
    marginVertical: SIZES.base / 2,
  },
  price: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  listWrapper: {
    justifyContent: 'space-between',
  },
});