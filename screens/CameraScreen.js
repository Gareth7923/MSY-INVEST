import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import tw from "twrnc";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState("back");
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  const takePicture = async () => {
    if (isCameraReady) {
      const data = await cameraRef.takePictureAsync(null);
      setImage(data.uri);
    }
  };

  return (
    <View style={tw`flex-1`}>
      {hasPermission === "granted" ? (
        <View style={tw`flex-1`}>
          <Camera
            style={tw`flex-1`}
            type={type}
            ratio={"20:9"}
            ref={(ref) => {
              setCameraRef(ref);
            }}
            onCameraReady={() => {
              setIsCameraReady(true);
            }}
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
            <View style={tw`flex-1`}>
              <ImageBackground
                source={{ uri: image }}
                resizeMode="stretch"
                style={tw`flex-1`}
              >
                <View
                  style={tw`flex-1 flex-row items-end bg-transparent justify-between pb-12 px-8`}
                >
                  <TouchableOpacity
                    style={tw`h-20 w-17`}
                    onPress={() => {
                      setImage(null), setModalVisible(!modalVisible);
                    }}
                  >
                    <Ionicons name="close-circle" size={74} color="red" />
                  </TouchableOpacity>

                  <TouchableOpacity style={tw`h-20 w-17`} onPress={() => {}}>
                    <Ionicons name="checkmark-circle" size={74} color="white" />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          </Modal>
        </View>
      ) : null}
    </View>
  );
};

export default CameraScreen;
