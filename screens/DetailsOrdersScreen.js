import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Modal, Pressable, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { Icon } from "react-native-elements";
import tw from "twrnc";
import { SwipeItem, SwipeButtonsContainer, SwipeProvider } from "react-native-swipe-item";
import { SliderBox } from "react-native-image-slider-box";
import ImageZoom from 'react-native-image-pan-zoom';


const DetailsOrdersScreen = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [modalgalleryVisible, setModalgalleryVisible] = useState(false);
  const [currentimage, setCurrentImage] = useState(null);
  const [currentproduct, setCurrentPorduct] = useState({});

  const { item } = route.params;

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

  useEffect(() => {
    console.log(currentproduct["PICS"]);
  })

  return (
    <View style={tw`bg-white min-h-full`}>
      <View style={tw`pb-6 items-center`}>
        <View>
          <Text style={tw`text-red-700 font-bold ml-4 text-3xl  mb-2 mt-5`}>
            ZG011AQA
          </Text>
        </View>
        <View style={tw`flex-row mb-2`}>
          <Text style={tw`font-light`}>Client : </Text>
          <Text style={tw`text-red-700 font-bold`}>{item.cust_company}</Text>
        </View>
        <View style={tw`flex-row mb-2`}>
          <Text style={tw`font-light`}>Type : </Text>
          <Text style={tw`text-red-700 font-bold`}>{item.type}</Text>
        </View>
        <View style={tw`flex-row mb-2`}>
          <Text style={tw`font-light`}>ID : </Text>
          <Text style={tw`text-red-700 font-bold`}>{"#" + item.id}</Text>
        </View>
        <View style={tw`flex-row mb-2`}>
          <Text style={tw`font-light`}>Date : </Text>
          <Text style={tw`text-red-700 font-bold`}>{item.date}</Text>
        </View>
        <View style={tw`flex-row mb-2`}>
          <Text style={tw`font-light`}>Poids total : </Text>
          <Text style={tw`text-red-700 font-bold`}>{item.poids + " Kg"}</Text>
        </View>
        <View style={tw`flex-row mb-4`}>
          <Text style={tw`font-light`}>Quantité : </Text>
          <Text style={tw`text-red-700 font-bold`}>{item.qu + " Art"}</Text>
        </View>
        <View style={tw`flex-row text-center mb-2`}>
          <View
            style={tw`flex-row justify-around content-center items-center pb-0.5 pl-2 pr-2 rounded-xl w-30 bg-orange-400 mr-2`}
          >
            <Icon type="antdesign" name="dropbox" color="white" />
            <Text style={tw`text-white 	text-center text-sm font-light`}>
              {item.prep}
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

      <View>
        <View style={tw`flex-row ml-8 pb-4`}>
          <Text style={tw`text-red-700 font-bold`}> Articles :</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <SwipeProvider>
            {item.produits.map((product) =>
              <Pressable onPress={() => { setModalVisible(true), setCurrentPorduct(product) }}>
                <SwipeItem
                  style={styles.button}
                  swipeContainerStyle={styles.swipeContentContainerStyle}
                  leftButtons={leftButton}
                  rightButtons={rightButton}
                >
                  <View style={tw`flex-row justify-between`}>
                    <View style={tw`min-h-full w-22 `}>
                      <Image
                        resizeMode="cover"
                        style={tw`h-full w-full rounded-xl`}
                        source={{ uri: product["PICS"][0] }}
                      />
                    </View>
                    <View style={tw`justify-center px-6`}>
                      <Text>{product["SKU"]}</Text>
                      <Text>{product["DESC"]}</Text>
                    </View>
                    <View style={tw`mr-4 justify-center`}>
                      <Text>{"x " + product["QUAN"]}</Text>
                    </View>
                  </View>
                </SwipeItem>
              </Pressable>
            )}
          </SwipeProvider>
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
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

              <SliderBox
                images={currentproduct["PICS"]}
                sliderBoxHeight={250}
                resizeMode="contain"
                onCurrentImagePressed={index => {
                  setModalgalleryVisible(true);
                  setCurrentImage(index);
                }}
                firstItem={currentimage} />

              <Modal 
                visible={modalgalleryVisible} 
                onRequestClose={() => {
                  setModalgalleryVisible(!modalgalleryVisible);}}
              >
                <View style={tw`flex-1 justify-center bg-black`}>
                  <ImageZoom
                    cropWidth={Dimensions.get('window').width}
                    cropHeight={Dimensions.get('window').height}
                    imageWidth={380}
                    imageHeight={600}>
                    <SliderBox
                      images={currentproduct["PICS"]}
                      sliderBoxHeight={600}
                      resizeMode="contain"
                      firstItem={currentimage} />
                  </ImageZoom>

                </View>
              </Modal>
            </Pressable>

            <View style={tw`pb-6 items-center`}>
              <View>
                <Text style={tw`text-red-700 ml-4 text-3xl text-center mb-2 mt-5`}>{currentproduct["DESC"]}</Text>
              </View>
              <View style={tw`flex-row mb-2`}>
                <Text style={tw`font-light`}>SKU :</Text>
                <Text style={tw`text-red-700 font-bold`}>{currentproduct["SKU"]}</Text>
              </View>
              <View style={tw`flex-row mb-2`}>
                <Text style={tw`font-light`}>Code produit :</Text>
                <Text style={tw`text-red-700 font-bold`}>{currentproduct["EAN"]}</Text>
              </View>
              <View style={tw`flex-row mb-2`}>
                <Text style={tw`font-light`}>Quantité : </Text>
                <Text style={tw`text-red-700 font-bold`}>{"x " + currentproduct["QUAN"]}</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal >
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