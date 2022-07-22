import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import tw from "twrnc";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import * as FileSystem from 'expo-file-system';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';


const CameraScreen = ({ route, navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState("back");
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { OrderId, User} = route.params;

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

  const convertImageToBase64 = async (image) => {
    const manipResult = await manipulateAsync(image,
      [
        { resize: { height: 1280, width: 800 } }
      ],
      { compress: 0, format: SaveFormat.JPEG }
    );
    
    const uri = manipResult.uri;

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const reader = new FileReader();
    reader.readAsDataURL(blob);

    reader.onloadend = () => {
      const imageBase64 = reader.result;

      sendImage(imageBase64);
    };
}

const convertBase64 = async (image) => {
  FileSystem.readAsStringAsync(image, { encoding: 'base64' })
    .then((response) => {
      console.log(response.length);

    })
    .catch((error) => console.log(error));
}

const sendImage = async (imageBase64) => {
  const params = { cmd: OrderId, pic: imageBase64 }
  axios
    .post("https://msyds.madtec.be/api/app/piccmd/", params, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        userid: "APP",
        authorization: User,
      }
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

                <TouchableOpacity style={tw`h-20 w-17`} onPress={() => { convertImageToBase64(image) }}>
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
