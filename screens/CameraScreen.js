import {
    Text,
    View,
    TouchableOpacity,
    Alert
} from "react-native";
import React, { useState, useEffect } from "react";
import tw from "twrnc";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";


const CameraScreen = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState("back");

    useEffect(() => {
        const CameraFunction = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };

        CameraFunction();
    })

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
   // return <Text>No access to camera</Text>;
    }

    return (
        <View style={tw`flex-1`}>
            {hasPermission === true ? 
            <Camera style={tw`flex-1`} type={type}>
                <View style={tw`flex-1 flex-row items-end bg-transparent`}>
                    <View
                        style={tw`flex-row h-32 w-full justify-center`}
                    >
                        <TouchableOpacity
                            style={tw`flex-row h-22 w-20`}
                            onPress={() => {
                                setType(type === "back" ? "front" : "back");
                            }}
                        >
                            <Ionicons
                                name="radio-button-on"
                                size={84}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </Camera>
            : null }
        </View>
    )
}

export default CameraScreen