import { View, Dimensions, Modal, TouchableOpacity, Platform, Image, Button } from 'react-native'
import React, { useState, useEffect } from 'react';
import Carousel from "../component/Carousel";
import tw from "twrnc";
import * as ImagePicker from 'expo-image-picker';

const SliderScreen = ({ navigation }) => {

    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const convertImageToBase64 = async (uri) => {
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
          const toString = reader.result;

        };
    }
    
    return (
        <View style={tw`flex-1 justify-center`}>
            <TouchableOpacity
                style={tw`h-10 w-12 bg-black`}
                onPress={() => {
                    navigation.navigate("CameraScreen", { OrderId: 123, User: "user" });
                    //convertImageToBase64(image)
                }}
            ></TouchableOpacity>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        </View>
    )
}

export default SliderScreen