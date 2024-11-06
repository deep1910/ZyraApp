

import React , {useEffect, useRef} from 'react';
import { View, StyleSheet, Dimensions, ScrollView , Animated} from 'react-native';
import { Text, Button } from 'react-native-paper';
import  { FadeIn,FadeInDown, SlideInRight } from 'react-native-reanimated';
const { width, height } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { ChevronRight } from 'lucide-react';
// import { MaterialIcons } from '@expo/vector-icons';



const images = [
  require('../assets/shirt1.jpeg'),
  require('../assets/pant1.jpeg'),
  require('../assets/pant2.jpeg'),
  require('../assets/tshirt1.jpg'),
  require('../assets/tshirt2.jpg'),
];

export default function LandingScreen({ navigation }) {

  const loadingAnim = useRef(new Animated.Value(0)).current;

 
  useEffect(() => {
    // Start the loading animation, expanding width from 0 to 100% over 3 seconds
    Animated.timing(loadingAnim, {
      toValue: 1,
      duration: 3000, // 3 seconds
      useNativeDriver: false, // Width animation requires useNativeDriver to be false
    }).start();

    const checkLoginStatus = async () => {
            try {
              const userToken = await AsyncStorage.getItem('userToken');
              setTimeout(() => {
                navigation.replace(userToken ? 'ProductListing' : 'Login');
              }, 3000);
            } catch (error) {
              console.error('Error checking login status:', error);
              navigation.replace('Login');
            }
          };
      
          checkLoginStatus();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.backgroundTextContainer}>
        {Array.from({ length: 10 }).map((_, index) => (
          <Text key={index} style={styles.backgroundText}>ZYRA</Text>
        ))}
      </View>
      
      <View style={styles.contentContainer}>
        <Animated.View 
          entering={FadeIn.delay(300).duration(1000)} 
          style={styles.leftContainer}
        >
          <Text style={styles.title}>ZYRA</Text>
          <Text style={styles.subtitle}>fashion marketplace</Text>
          <Text style={styles.description}>
            Discover the latest trends and unique styles from independent designers and luxury brands.
          </Text>
        
        </Animated.View>
        
        <Animated.View 
          entering={SlideInRight.delay(600).duration(1000)} 
          style={styles.rightContainer}
        >
          <ScrollView 
            horizontal={false} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.imageStrip}
          >
            {images.map((image, index) => (
              <Animated.Image
                key={index}
                source={image }
                style={styles.image}
                entering={FadeIn.delay(index * 200)}
              />
            ))}
          </ScrollView>
        </Animated.View>
      </View>

      <Animated.View 
        entering={FadeInDown.delay(1000).springify()} 
        style={styles.bottomContentContainer}
      >
      
       <View style={styles.loadingContainer}>
      <View style={styles.loadingBar}>
        <Animated.View
          style={[
            styles.loadingProgress,
            {
              width: loadingAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'], // Animate width from 0% to 100%
              }),
            },
          ]}
        />
      </View>
    </View>
      </Animated.View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-30deg' }],
  },
  backgroundText: {
    fontSize: 120,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.05)',
    marginVertical: -20,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 2,
    justifyContent: 'center',
    paddingLeft: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 24,
    color: '#333',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    maxWidth: 400,
  },
  button: {
    width: 200,
    borderRadius: 25,
    backgroundColor: '#000',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4,
  },
  rightContainer: {
    flex: 1,
    
  },
  imageStrip: {
    paddingVertical: 20,
  },
  image: {
    width: width * 0.3,
    height: height * 0.2,
    borderRadius: 15,
    marginBottom: 20,
  },
  loadingContainer: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  loadingBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(200, 200, 200, 0.3)',
    borderRadius: 2,
    overflow: 'hidden', // Keeps the animated bar inside the container
  },
  loadingProgress: {
    height: '100%',
    backgroundColor: 'black', // Set your loading bar color here
  },
  bottomContentContainer: {
    display:'flex',
    flexDirection:'column',
    gap:10,
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
  },
  brandName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  bottomTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  bottomSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  bottomButton: {
    // marginTop:10,
    marginBottom:40,
    width: 200,
    borderRadius: 25,
    backgroundColor: '#000',
  },
  bottomButtonContent: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    // marginTop:
  },
});