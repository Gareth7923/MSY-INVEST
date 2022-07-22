import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Feather } from "@expo/vector-icons";
import useAuth from "../hooks/useAuth";
import EStyleSheet from "react-native-extended-stylesheet";

EStyleSheet.build({
  // always call EStyleSheet.build() even if you don't use global variables!
  $textColor: "#0275d8",
});

const LoginScreen = () => {
  const [textencrypt, setTextencrypt] = useState(true);
  const [usercode, setUsercode] = useState('KtzKKjxGeDVHYaxjNvtYh4MA');

  const { verifyuser } = useAuth();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
      enabled={Platform.OS === "ios" ? true : false}
      style={styles.container}
    >
      <View style={tw`flex-1 bg-white`}>
        <View style={tw`items-center`}>
          <Image
            style={[tw`w-full h-55`, styles.imgacc]}
            source={require("../assets/images/img-gestion-stock.png")}
          />
          <Image
            style={tw`mt-15 w-50 h-23`}
            source={require("../assets/images/logo-msy.png")}
          />
        </View>

        <View style={tw`flex-1 justify-between `}>
          <View style={[tw`flex-row mx-8 py-4 rounded-2xl`, styles.bg]}>
            <Feather name="lock" size={24} style={tw`text-red-700 pl-4`} />
            <TextInput
              style={[
                tw`text-base pl-4 w-3/4 text-white bottom-1`,
                styles.input,
              ]}
              placeholder="Code d'accés"
              placeholderTextColor="gray"
              onChangeText={setUsercode}
              maxLength={50}
              secureTextEntry={textencrypt}
            />
            <TouchableOpacity onPress={() => setTextencrypt(!textencrypt)}>
              <Feather name="eye" size={22} style={tw`text-red-700 px-2`} />
            </TouchableOpacity>
          </View>

          <View style={tw`mx-14 `}>
            <View>
              <TouchableOpacity
                style={tw`bg-red-700 py-4 rounded-full shadow-xl`}
                onPress={() => verifyuser(usercode)}
              >
                <Text
                  style={tw`text-center text-white text-base font-semibold`}
                >
                  Connectez-vous
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={[
                  tw`w-full text-center text-red-700 text-xs font-semibold pt-20 mb-10`,
                  styles.dbcs,
                ]}
              >
                Developped By Control Studio
              </Text>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = EStyleSheet.create({
  bg: {
    backgroundColor: "#2D2D2D",
    marginTop: 70,
  },
  container: {
    flex: 1,
  },
  "@media (min-width: 600) and (max-width: 900)": {
    // media queries
    bg: {
      marginTop: "-20%",
    },
    dbcs: {
      paddingTop: 150,
    },
    input: {
      width: "82%",
    },
    imgacc: {
      height: "60%",
      marginTop: -100,
    },
  },
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
