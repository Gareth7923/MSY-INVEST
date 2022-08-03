import { Text, View, TouchableOpacity, ImageBackground, Modal, Alert, Platform, Dimensions, } from "react-native";
import React, { useState, useEffect } from "react";
import tw from "twrnc";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";


const CameraScreen = ({ route, navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState("back");
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState("4:3");
  const { height, width } = Dimensions.get("window");
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);
  const { OrderId, User } = route.params;

  useEffect(() => {
    const CameraFunction = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      if (status === "granted") {
        setHasPermission(status);
      } else {
        navigation.goBack();
      }
    };
    CameraFunction();
  }, []);

  // set the camera ratio and padding.
  // this code assumes a portrait mode screen
  const prepareRatio = async () => {
    let desiredRatio = "4:3"; // Start with the system default
    // This issue only affects Android
    if (Platform.OS === "android") {
      const ratios = await cameraRef.getSupportedRatiosAsync();

      // Calculate the width/height of each of the supported camera ratios
      // These width/height are measured in landscape mode
      // find the ratio that is closest to the screen ratio without going over
      let distances = {};
      let realRatios = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(":");
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        // ratio can't be taller than screen, so we don't want an abs()
        const distance = screenRatio - realRatio;
        distances[ratio] = realRatio;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      // set the best match
      desiredRatio = minDistance;
      //  calculate the difference between the camera width and the screen height
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      );
      // set the preview padding and preview ratio
      setImagePadding(remainder);
      setRatio(desiredRatio);
      // Set a flag so we don't do this
      // calculation each time the screen refreshes
      setIsRatioSet(true);
    }
  };

  const setCameraReady = async() => {
    if (!isRatioSet) {
      await prepareRatio();
    }
    setIsCameraReady(true);
  };

  const takePicture = async () => {
    if (isCameraReady) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.takePictureAsync(options);

      setImageBase64(data.base64);
    }
  };

  const sendImage = async () => {
    const params = { cmd: OrderId, pic: imageBase64 };
    axios
      .post("https://msyds.madtec.be/api/app/piccmd/", params, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          userid: "APP",
          authorization: User,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          navigation.goBack();
        } else {
          Alert.alert(response.status, "Erreur lors de l'envoi de l'image");
        }
      })
      .catch((error) => console.warn(error));
  };

  return (
    <View style={tw`flex-1`}>
      {hasPermission === "granted" ? (
        <View style={tw`flex-1`}>
          <Camera
            style={[tw`flex-1`, {marginTop: imagePadding, marginBottom: imagePadding}]}
            type={type}
            ratio={ratio}
            ref={(ref) => {
              setCameraRef(ref);
            }}
            onCameraReady={setCameraReady}
          >
            <View
              style={tw`flex-1 flex-row items-end bg-transparent justify-between h-32 pb-12 px-6`}
            >
              <View style={tw`flex-row`}>
                <TouchableOpacity
                  style={tw`h-22 w-20 justify-center items-center`}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={tw`text-xl text-white `}>Annuler</Text>
                </TouchableOpacity>
              </View>
              <View style={tw`flex-row`}>
                <TouchableOpacity
                  style={tw`h-22 w-20 justify-center items-center`}
                  onPress={() => {
                    takePicture(), setModalVisible(true);
                  }}
                >
                  <Ionicons name="radio-button-on" size={84} color="white" />
                </TouchableOpacity>
              </View>
              <View style={tw`flex-row`}>
                <TouchableOpacity
                  style={tw`h-22 w-20 justify-center items-center`}
                  onPress={() => {
                    setType(type === "back" ? "front" : "back");
                  }}
                >
                  <Ionicons name="sync" size={44} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </Camera>
          <Modal
            statusBarTranslucent={true}
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
              <ImageBackground
                source={{ uri: 'data:image/jpg;base64,' + imageBase64 }}
                resizeMode="stretch"
                style={[tw`flex-1`, {marginTop: imagePadding, marginBottom: imagePadding}]}
              >
                <View
                  style={tw`flex-1 flex-row items-end bg-transparent justify-between pb-12 px-8`}
                >
                  <TouchableOpacity
                    style={tw`h-20 w-17`}
                    onPress={() => {
                      setImageBase64(null), setModalVisible(!modalVisible);
                    }}
                  >
                    <Ionicons name="close-circle" size={74} color="red" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={tw`h-20 w-17`}
                    onPress={() => {
                      sendImage();
                    }}
                  >
                    <Ionicons name="checkmark-circle" size={74} color="white" />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
          </Modal>
        </View>
      ) : null}
    </View>
  );
};

export default CameraScreen;
