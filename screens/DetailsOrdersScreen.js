import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Modal, Pressable, Dimensions } from "react-native";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import tw from "twrnc";
import { SwipeItem, SwipeButtonsContainer, SwipeProvider } from "react-native-swipe-item";
import {FlatListSlider} from 'react-native-flatlist-slider';


const data2 = {
  id: "123",
  client: "Auto MM",
  type: "Standard",
  date: "10/12/2021",
  weight: "12kg",
  quantity: "13 Art.",
  commandeDescription: "1 x Notebook, 2 x Wireless Headphones, 1 x Wat .. ",
  commandeScreen: "CommandeScreen",
  status: "A preparer",
};

const images = [
  {
    banner: require('../assets/images/Herzberg-HG-8027-Clayette-de-Stockage-Galvanisee-HG-8027-1.jpg'),
    desc: 'Silent Waters in the mountains in midst of Himilayas',
   
  },
  {
    banner: require('../assets/images/Herzberg-HG-8027-Clayette-de-Stockage-Galvanisee-HG-8027-2.webp'),
    desc: 'Silent Waters in the mountains in midst of Himilayas',
  },
]

 
const DetailsOrdersScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [modalgalleryVisible, setModalgalleryVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const leftButton = (
    <SwipeButtonsContainer
      style={{
        alignSelf: "center",
        aspectRatio: 1,
        flexDirection: "column",
        padding: 13,
        backgroundColor: "#B5000D",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
      }}
    >
      <TouchableOpacity onPress={() => console.log("left button clicked")}>
        <Icon type="antdesign" size={70} name="close" color="white" />
      </TouchableOpacity>
    </SwipeButtonsContainer>
  );
  const rightButton = (
    <SwipeButtonsContainer
      style={{
        alignSelf: "center",
        aspectRatio: 1,
        flexDirection: "column",
        padding: 13,
        backgroundColor: "#AEE05D",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
      }}
    >
      <TouchableOpacity onPress={() => console.log("right button clicked")}>
        <Icon type="antdesign" size={70} name="check" color="white" />
      </TouchableOpacity>
    </SwipeButtonsContainer>
  );

  return (
    <View style={tw`bg-white min-h-full`}>
      <View style={tw`pb-6 items-center`}>
        <View>
          <Text style={tw`text-red-700 font-bold ml-4 text-3xl  mb-2 mt-5`}>
            ZG011AQA
          </Text>
        </View>
        <View style={tw`flex-row mb-2`}>
          <Text style={tw`font-light`}>Client :</Text>
          <Text style={tw`text-red-700 font-bold`}>{data2.client}</Text>
        </View>
        <View style={tw`flex-row mb-2`}>
          <Text style={tw`font-light`}>Type :</Text>
          <Text style={tw`text-red-700 font-bold`}>Standard</Text>
        </View>
        <View style={tw`flex-row mb-2`}>
          <Text style={tw`font-light`}>ID: </Text>
          <Text style={tw`text-red-700 font-bold`}>#1456</Text>
        </View>
        <View style={tw`flex-row mb-2`}>
          <Text style={tw`font-light`}>Code barre :</Text>
          <Text style={tw`text-red-700 font-bold`}>45896789</Text>
        </View>
        <View style={tw`flex-row mb-2`}>
          <Text style={tw`font-light`}>Date :</Text>
          <Text style={tw`text-red-700 font-bold`}>14/02/2022</Text>
        </View>
        <View style={tw`flex-row mb-2`}>
          <Text style={tw`font-light`}>Poids total : </Text>
          <Text style={tw`text-red-700 font-bold`}>12Kg</Text>
        </View>
        <View style={tw`flex-row mb-4`}>
          <Text style={tw`font-light`}>Quantité : </Text>
          <Text style={tw`text-red-700 font-bold`}>13 Art.</Text>
        </View>
        <View style={tw`flex-row text-center mb-2`}>
          <View
            style={tw`flex-row justify-around content-center items-center pb-0.5 pl-2 pr-2 rounded-xl w-30 bg-orange-400 mr-2`}
          >
            <Icon type="antdesign" name="dropbox" color="white" />
            <Text style={tw`text-white 	text-center text-sm font-light`}>
              A Preparer
            </Text>
          </View>
          <View
            style={tw`flex-row justify-around content-center items-center pb-0.5 pl-2 pr-2 rounded-xl w-35 h-8 bg-zinc-400 ml-2`}
          >
            <Icon type="antdesign" name="camerao" color="white" />
            <Text style={tw`text-white 	text-center text-sm font-light`}>
              Prendre photo
            </Text>
          </View>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={tw`h-full bg-zinc-600/50`}>
          <View style={tw`h-full bg-white mt-40 rounded-t-3xl`}>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text>
                <Icon
                  style={tw`p-5`}
                  type="antdesign"
                  name="back"
                  color="#B5000D"
                />
              </Text>

              <FlatListSlider 
                data={images} 
                imageKey={'banner'}
                autoscroll={false}
                local
                onPress={index => {
                  setModalgalleryVisible(true);
                  setCurrentImage(index);
                }}
              />

              <Modal visible={modalgalleryVisible}>
                <View style={tw`flex-1 justify-center bg-black`}>
              
                <FlatListSlider 
                  data={images} 
                  imageKey={'banner'}
                  autoscroll={false}
                  local
                  onPress={index => {
                    setModalgalleryVisible(true);
                    setCurrentImage(index);
                  }}
                />
              </View>
            </Modal>
          </Pressable>

          <View style={tw`pb-6 items-center`}>
            <View>
              <Text
                style={tw`text-red-700 ml-4 text-3xl text-center mb-2 mt-5`}
              >
                Clayette de Stockage Galvanisée
              </Text>
            </View>
            <View style={tw`flex-row mb-2`}>
              <Text style={tw`font-light`}>SKU :</Text>
              <Text style={tw`text-red-700 font-bold`}>
                {" "}
                Herzberg HG-8027
              </Text>
            </View>
            <View style={tw`flex-row mb-2`}>
              <Text style={tw`font-light`}>Code produit :</Text>
              <Text style={tw`text-red-700 font-bold`}> 0634158797989</Text>
            </View>
            <View style={tw`flex-row mb-2`}>
              <Text style={tw`font-light`}>Quantité : </Text>
              <Text style={tw`text-red-700 font-bold`}> x 2</Text>
            </View>
            <View style={tw`flex-row mb-2`}>
              <Text style={tw`font-light`}>Poids :</Text>
              <Text style={tw`text-red-700 font-bold`}>14 kg</Text>
            </View>
          </View>
        </View>
    </View>
      </Modal >

  <View>
    <View style={tw`flex-row ml-8 pb-4`}>
      <Text style={tw`text-red-700 font-bold`}> Articles :</Text>
    </View>
    <ScrollView style={styles.scrollView}>
      <SwipeProvider>
        <Pressable onPress={() => setModalVisible(true)}>
          <SwipeItem
            style={styles.button}
            swipeContainerStyle={styles.swipeContentContainerStyle}
            leftButtons={leftButton}
            rightButtons={rightButton}
          >
            <View style={tw`flex-row justify-between `}>
              <View style={tw`min-h-full w-22 `}>
                <Image
                  resizeMode="cover"
                  style={tw`h-full w-full rounded-xl`}
                  source={require("../assets/images/Herzberg-HG-8027-Clayette-de-Stockage-Galvanisee-HG-8027-1.jpg")}
                />
              </View>
              <View style={tw`justify-center`}>
                <Text>Ska5599741</Text>
                <Text>Clayette de Stockage Galv ...</Text>
              </View>
              <View style={tw`mr-4 justify-center`}>
                <Text>x 2</Text>
              </View>
            </View>
          </SwipeItem>
        </Pressable>
        <SwipeItem
          style={styles.button}
          swipeContainerStyle={styles.swipeContentContainerStyle}
          leftButtons={leftButton}
          rightButtons={rightButton}
        >
          <Text>Swipe me!</Text>
        </SwipeItem>
        <SwipeItem
          style={styles.button}
          swipeContainerStyle={styles.swipeContentContainerStyle}
          leftButtons={leftButton}
          rightButtons={rightButton}
        >
          <Text>Swipe me!</Text>
        </SwipeItem>
        <SwipeItem
          style={styles.button}
          swipeContainerStyle={styles.swipeContentContainerStyle}
          leftButtons={leftButton}
          rightButtons={rightButton}
        >
          <Text>Swipe me!</Text>
        </SwipeItem>
        <SwipeItem
          style={styles.button}
          swipeContainerStyle={styles.swipeContentContainerStyle}
          leftButtons={leftButton}
          rightButtons={rightButton}
        >
          <Text>Swipe me!</Text>
        </SwipeItem>
      </SwipeProvider>
    </ScrollView>
  </View>
    </View >
  );
};

export default DetailsOrdersScreen;

const styles = StyleSheet.create({
  button: {
    width: "85%",
    height: 100,
    alignSelf: "center",
    marginVertical: 5,
  },
  swipeContentContainerStyle: {
    justifyContent: "center",
    backgroundColor: "#FAF6F6",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 4,
  },
  scrollView: {
    height: "50%",
  },
});