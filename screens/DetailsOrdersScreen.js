import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { Icon } from "react-native-elements";
import tw from "twrnc";
import {
  SwipeItem,
  SwipeButtonsContainer,
  SwipeProvider,
} from "react-native-swipe-item";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import EStyleSheet from "react-native-extended-stylesheet";
import Carousel from "../component/Carousel";
import { Select, Box, CheckIcon } from "native-base";

const screen = Dimensions.get("screen");

const DetailsOrdersScreen = ({ navigation, route }) => {
  const { user } = useAuth();
  const { OrderId } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalgalleryVisible, setModalgalleryVisible] = useState(false);
  const [imagePressed, setImagePressed] = useState(false);
  const [dimensions, setDimensions] = useState(screen);
  const [currentproduct, setCurrentPorduct] = useState({});
  const [Order, setOrder] = useState({});
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [loadingProducts, setloadingProducts] = useState(true);
  const [service, setService] = useState(null);

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );
  });

  const leftButton = (ProductId) => (
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
      <TouchableOpacity onPress={() => SwipeStatus(ProductId, 0)}>
        <Icon type="antdesign" size={70} name="close" color="white" />
      </TouchableOpacity>
    </SwipeButtonsContainer>
  );
  const rightButton = (ProductId) => (
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
      <TouchableOpacity onPress={() => SwipeStatus(ProductId, 1)}>
        <Icon type="antdesign" size={70} name="check" color="white" />
      </TouchableOpacity>
    </SwipeButtonsContainer>
  );

  const getDetailsOrder = async () => {
    axios
      .get("https://msyds.madtec.be/api/app/commande/" + OrderId, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          userid: "APP",
          authorization: user,
        },
      })
      .then((response) => {
        setOrder(SortArray(response.data[0]));
        setLoadingOrder(false);
        setloadingProducts(false);
      })
      .catch((error) => console.warn(error));
  };

  const SwipeStatus = async (ProductId, Status) => {
    setloadingProducts(true);

    const url =
      "https://msyds.madtec.be/api/app/commande/" +
      OrderId +
      "/prod/" +
      ProductId +
      "/status/" +
      Status;

    axios
      .post(url, null, {
        headers: {
          userid: "APP",
          authorization: user,
        },
      })
      .then((response) => {
        setOrder(SortArray(response.data[0]));
        setloadingProducts(false);
      })
      .catch((error) => console.warn(error));
  };

  const SortArray = (ProductArray) => {
    ProductArray.produits.sort(
      (a, b) => parseInt(a.STATUS) - parseInt(b.STATUS)
    );

    return ProductArray;
  };

  const ConvertDate = function (seconds) {
    const dateMilliseconds = seconds * 1000;

    return new Date(dateMilliseconds).toLocaleDateString("en-GB");
  };

  useEffect(() => {
    getDetailsOrder();
  }, []);

  const SelectItems = useMemo(() => {
    <Select.Item label={"ffff"} value={"ffff"} />;
  });

  return (
    <View style={tw`flex-1 bg-white min-h-full`}>
      {loadingOrder ? (
        <ActivityIndicator size="large" color="#B5000D" style={tw`top-1/2`} />
      ) : (
        <View>
          <View style={tw`pb-6 items-center`}>
            <View>
              <Text style={tw`text-red-700 font-bold ml-4 text-3xl  mb-2 mt-5`}>
                {"#" + Order.id}
              </Text>
            </View>
            <View style={tw`flex-row mb-2`}>
              <Text style={tw`font-light`}>Client : </Text>
              <Text style={tw`text-red-700 font-bold`}>{Order.cust_name}</Text>
            </View>
            <View style={tw`flex-row mb-2`}>
              <Text style={tw`font-light`}>Société : </Text>
              <Text style={tw`text-red-700 font-bold`}>
                {Order.cust_company}
              </Text>
            </View>
            <View style={tw`flex-row mb-2`}>
              <Text style={tw`font-light`}>Type : </Text>
              <Text style={tw`text-red-700 font-bold`}>{Order.type}</Text>
            </View>
            <View style={tw`flex-row mb-2`}>
              <Text style={tw`font-light`}>Date : </Text>
              <Text style={tw`text-red-700 font-bold`}>
                {ConvertDate(Order.date)}
              </Text>
            </View>
            <View style={tw`flex-row mb-2`}>
              <Text style={tw`font-light`}>Poids total : </Text>
              <Text style={tw`text-red-700 font-bold`}>
                {Order.poids + " Kg"}
              </Text>
            </View>
            <View style={tw`flex-row mb-4`}>
              <Text style={tw`font-light`}>Quantité : </Text>
              <Text style={tw`text-red-700 font-bold`}>
                {Order.qu + " Art."}
              </Text>
            </View>
            <View style={tw`flex-row text-center mb-2`}>
              <View
                style={tw`flex-row justify-around content-center items-center pb-0.5 pl-2 pr-2 rounded-xl w-30 h-8 bg-orange-400 mr-2`}
              >
                <Icon type="antdesign" name="dropbox" color="white" />
                <Text style={tw`text-white text-center text-sm font-light`}>
                  {Order.prep}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("CameraScreen", {
                    OrderId: Order.id,
                    User: user,
                  });
                }}
              >
                <View
                  style={tw`flex-row justify-around content-center items-center pb-0.5 pl-2 pr-2 rounded-xl w-35 h-8 bg-zinc-400 ml-2`}
                >
                  <Icon type="antdesign" name="camerao" color="white" />
                  <Text style={tw`text-white text-center text-sm font-light`}>
                    Prendre photo
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <View style={tw`flex-row ml-8 pb-4`}>
              <Text style={tw`text-red-700 font-bold`}> Articles :</Text>
            </View>
            <View style={tw`flex-row justify-center pb-8 px-8`}>
              {loadingProducts ? (
                <ActivityIndicator
                  size="large"
                  color="#B5000D"
                  style={tw`top-1/3 `}
                />
              ) : (
                <SwipeProvider>
                  <FlatList
                    contentContainerStyle={{
                      flexGrow: 1,
                      paddingBottom: 720,
                      marginBottom: 50,
                    }}
                    data={Order.produits}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => (
                      <SwipeItem
                        style={styles.button}
                        swipeContainerStyle={
                          item.STATUS == 1
                            ? [
                                styles.swipeContentContainerStyle,
                                tw`bg-gray-200`,
                              ]
                            : [
                                styles.swipeContentContainerStyle,
                                { backgroundColor: "#FAF6F6" },
                              ]
                        }
                        leftButtons={leftButton(item.ID)}
                        rightButtons={rightButton(item.ID)}
                      >
                        <View
                          style={
                            item.STATUS == 1
                              ? tw`flex-row justify-between w-9/12 h-full opacity-10`
                              : tw`flex-row justify-between w-9/12 h-full`
                          }
                        >
                          <Pressable
                            onPress={() => {
                              setModalVisible(true), setCurrentPorduct(item);
                            }}
                          >
                            <View style={tw`min-h-full w-22`}>
                              <Image
                                resizeMode="cover"
                                style={tw`h-full w-full rounded-xl`}
                                source={{ uri: item.PICS[0] }}
                              />
                            </View>
                          </Pressable>
                          <View
                            style={[
                              tw`p-3 justify-between w-full`,
                              styles.txtslider,
                            ]}
                          >
                            <Text>{item["SKU"]}</Text>
                            <Text numberOfLines={1}>{item.DESC}</Text>
                            <View
                              style={tw`flex-row justify-between items-center`}
                            >
                              <View
                                style={tw`flex-row justify-between items-center`}
                              >
                                <Text style={tw`text-gray-400 text-xs`}>Commandé: </Text>
                                <Text style={tw`text-gray-400 text-xs`}>{item.QUAN}</Text>
                              </View>
                              <View
                                style={tw`flex-row justify-between items-center`}
                              >
                                <Text style={tw`text-gray-400 text-xs`}>Stock: </Text>

                                <Select
                                  selectedValue={service}
                                  minWidth="60"
                                  borderWidth="0"
                                  fontSize="xs"
                                  color="white"
                                  placeholder={item.QUAN}
                                  _selectedItem={{
                                    endIcon: <CheckIcon size="5" />,
                                  }}
                                  onValueChange={(itemValue) =>
                                    setService(itemValue)
                                  }
                                >
                                  <Select.Item label={"ffff"} value={"ffff"} />
                                </Select>
                              </View>
                            </View>
                          </View>
                        </View>
                      </SwipeItem>
                    )}
                  />
                </SwipeProvider>
              )}
            </View>
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
              <View style={tw`h-full bg-white mt-40 rounded-t-3xl `}>
                <Pressable
                  style={tw`w-20`}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Icon
                    style={tw`p-5`}
                    type="antdesign"
                    name="back"
                    color="#B5000D"
                  />
                </Pressable>

                <Carousel
                  data={currentproduct.PICS}
                  width={dimensions.width}
                  height={dimensions.width > 480 ? 350 : 200}
                  CurrentImagePressed={(index) => {
                    setImagePressed(index);
                    setModalgalleryVisible(!modalgalleryVisible);
                  }}
                />

                <Modal
                  visible={modalgalleryVisible}
                  onRequestClose={() => {
                    setModalgalleryVisible(!modalgalleryVisible);
                  }}
                >
                  <View style={tw`flex-1 justify-center bg-white`}>
                    <Carousel
                      data={currentproduct.PICS}
                      width={dimensions.width}
                      height={dimensions.width}
                      FirstImage={imagePressed}
                      CurrentImagePressed={(index) => {}}
                    />
                  </View>
                </Modal>

                <View style={tw`pb-6 items-center px-6 pt-8`}>
                  <View>
                    <Text
                      numberOfLines={2}
                      style={tw`text-red-700 text-2xl text-center mb-5`}
                    >
                      {currentproduct.DESC}
                    </Text>
                  </View>
                  <View style={tw`flex-row mb-2`}>
                    <Text style={tw`font-light`}>SKU : </Text>
                    <Text style={tw`text-red-700 font-bold`}>
                      {currentproduct.SKU}
                    </Text>
                  </View>
                  <View style={tw`flex-row mb-2`}>
                    <Text style={tw`font-light`}>Code produit : </Text>
                    <Text style={tw`text-red-700 font-bold`}>
                      {currentproduct.EAN}
                    </Text>
                  </View>
                  <View style={tw`flex-row mb-2`}>
                    <Text style={tw`font-light`}>Quantité : </Text>
                    <Text style={tw`text-red-700 font-bold`}>
                      {"x" + currentproduct.QUAN}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

export default DetailsOrdersScreen;

const styles = EStyleSheet.create({
  button: {
    width: "98%",
    height: 100,
    alignSelf: "center",
    marginVertical: 5,
  },
  swipeContentContainerStyle: {
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    width: "85%",
    height: 100,
    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 4,
  },
  scrollView: {
    height: "50%",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    width: 50,
    height: 100,
  },
  "@media (min-width: 600) and (max-width: 900)": {
    // media queries
    button: {
      width: "90%",
    },
    txtslider: {
      width: "125%",
    },
  },
});
