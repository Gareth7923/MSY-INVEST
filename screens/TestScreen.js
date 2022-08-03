import { View, Dimensions, Modal, TouchableOpacity, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Carousel from "../component/Carousel";
import tw from "twrnc";
import * as ImagePicker from 'expo-image-picker';
import ImageZoom from "react-native-image-pan-zoom";

const screen = Dimensions.get("screen");

const data = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ_G9U9095poYEIvtg8fnA2Ef3dcjLEebptQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAKct50NCsVyvNuADQHKbmPKvN4vwU_kabkg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmBIgYj1yY-r7Fh2ZwHmaAfq8tGJTXxy5pEg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3Wjd-Cak78mooEfHTx64D7xhFtgBMZRFiiQ&usqp=CAU",
];

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

    return (
        <View style={tw`flex-1 justify-center`}>
            <TouchableOpacity
                style={tw`h-10 w-12 bg-black`}
                onPress={() => {
                    navigation.navigate("CameraScreen", { OrderId: 123, User: "user" });
                }}
            ></TouchableOpacity>
      <ImageZoom cropWidth={Dimensions.get('screen').width}
        cropHeight={Dimensions.get('screen').height}
        imageWidth={Dimensions.get('screen').width}
        imageHeight={Dimensions.get('screen').width}
        enableCenterFocus={false}>

                <Carousel
                    data={data}
                    width={Dimensions.get('screen').width}
                    height={Dimensions.get('screen').width}
                    FirstImage={0}
                    CurrentImagePressed={(index) => { }}
                />
</ImageZoom>
        </View>
    )
}

export default SliderScreen