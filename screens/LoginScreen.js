import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Platform, Modal } from 'react-native'
import React, { useState } from 'react';
import tw from 'twrnc';
import { Feather } from '@expo/vector-icons' ;
import useAuth from "../hooks/useAuth";

const LoginScreen = () => {
  const [textencrypt, setTextencrypt] = useState(true);
  const [usercode, setUsercode] = useState("KtzKKjxGeDVHYaxjNvtYh4MA");
  
  const { verifyuser } = useAuth();

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`items-center`}>
          <Image style={tw`w-full h-58`} source={require("../assets/images/img-gestion-stock.png")}/>
          <Image style={tw`mt-18 w-50 h-23`} source={require("../assets/images/logo-msy.png")}/>
      </View>

      <View style={tw`flex-1 justify-between`}>
          <View style={[tw`flex-row mx-8 py-4 mt-24 rounded-2xl`, styles.bg]}>
            <Feather name="lock" size={24} style={tw`text-red-700 pl-4`} />
            <TextInput 
                style={tw`text-base pl-4 w-3/4 text-white bottom-1`} 
                placeholder="Code d'accés"
                placeholderTextColor="gray"
                onChangeText={setUsercode}
                maxLength={50}
                secureTextEntry={textencrypt}
            />
            <TouchableOpacity onPress={() => setTextencrypt(!textencrypt)}>
              <Feather name="eye" size={22} style={tw`text-red-700 px-2`}/>
            </TouchableOpacity> 
          </View>

          <View style={tw`items-center mx-18`}>
            <TouchableOpacity style={tw`w-full bg-red-700 py-4 rounded-full shadow-xl`} onPress={() => {verifyuser(usercode)}}>
              <Text style={tw`text-center text-white text-base font-semibold`} >Connectez-vous</Text>
            </TouchableOpacity>
            <Text style={tw`text-center text-red-700 text-xs font-semibold pt-18 pb-8`}>Developped By Control Studio</Text>
          </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  bg : {
    backgroundColor: "#2D2D2D",
  }
});

export default LoginScreen;


  /*useEffect(() =>{
    Sharing.shareAsync(
      FileSystem.documentDirectory + 'SQLite/user.db', 
      {dialogTitle: 'share or copy your DB via'}
    ).catch(error =>{
      console.log(error);
    })
  });*/
