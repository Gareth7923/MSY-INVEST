import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { Icon } from "react-native-elements";
import React, { useState, useEffect, useCallback } from "react";
import tw from "twrnc";
import useAuth from "../hooks/useAuth";
import axios from 'axios';


const HomeScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  const [currentStaus, setCurrentStaus] = useState("Toutes");
  const [ArrayStatus, setArrayStatus] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      axios.get('https://msyds.madtec.be/api/app/commandes', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'userid': 'APP',
            'authorization': user,
          }
      })
      .then((response) => {;
        setOrders(response.data);
      })
      .catch((error) => {
        console.warn(error);
        logout();
      });   
    };

    getOrders();
  }, []);


  useEffect(() => {
    const getOrderStatus = () => {
      const tabStatus = [{ id: "1", status: "Toutes" }];
  
      for (let i = 0; i < orders.length; i++) {
        const count = 0;
  
        for (let j = 0; j < tabStatus.length; j++) {
          if (orders[i].prep == tabStatus[j].status) {
            count++;
          }
        }
  
        if (count == 0) {
          tabStatus.push({ id: orders[i].id, status: orders[i].prep });
        }
      }
  
      setArrayStatus(tabStatus);
    }

    getOrderStatus();
  }, [orders]);

  const ConvertDate = function(millisec) {
    var length = millisec.length - 7;
    var date = parseInt(millisec.substring(6,length));
    return (new Date(date).toLocaleDateString('fr-FR'));
  }

  return (
    <View style={tw`bg-white`}>
      <View style={tw`flex-row justify-between mt-15`}>
        <Text style={tw`text-red-700 font-bold ml-4 text-3xl`}>Commandes</Text>
        <View>
          <TouchableOpacity
            onPress={logout}
            style={tw`bg-red-700 p-2 mr-3 rounded-xl mt-1`}
          >
            <Text style={[{ fontSize: 12 }, tw`text-white`]}>
              Se deconnecter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        horizontal
        data={ArrayStatus}
        KeyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={tw`pl-6 h-13 mt-8`}>
            <TouchableOpacity
              onPress={() => { setCurrentStaus(item.status) }}
              style={
                currentStaus == item.status
                  ? tw`border-b-2 border-red-700 pb-1`
                  : tw`border-b-0`
              }
            >
              <Text
                style={
                  currentStaus == item.status
                    ? [{ fontSize: 18 }, tw`text-red-700 font-bold`]
                    : [{ fontSize: 16 }, tw`text-black font-light`]
                }
              >
                {item.status}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
        <FlatList
          contentContainerStyle={{ flexGrow: 1, alignItems: "center", marginBottom: 50, paddingBottom: 260, }}
          style={tw`bg-zinc-300 mt-3 pt-3 rounded-t-3xl`}
          data={orders}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("DetailsOrdersScreen", { OrderId: item.id })}
              style={tw`pl-6 pr-6 pt-4 pb-4 bg-white m-2 w-90 rounded-xl shadow-md `}
            >
              <View>
                <View style={tw`flex-row justify-between`}>
                  <Text style={tw`text-zinc-500 text-base font-bold pr-4`}>
                    {item.cust_company}
                  </Text>
                  <Text style={tw`text-zinc-500 text-base font-light pr-2`}>
                    {item.type}
                  </Text>
                </View>
                <View style={tw`flex-row justify-between`}>
                  <Text style={tw`text-zinc-500 mt-2 text-base font-semibold`}>
                    {"#" + item.id}
                  </Text>
                  <Text style={tw`text-zinc-500 mt-2 text-base font-semibold`}>
                    {ConvertDate(item.date)}
                  </Text>
                  <Text style={tw`text-zinc-500 mt-2 text-base font-semibold`}>
                    {item.poids + " Kg"}
                  </Text>
                  <Text style={tw`text-zinc-500 mt-2 text-base font-semibold`}>
                    {item.qu + " Art."}
                  </Text>
                </View>
                <View style={tw`flex-row justify-around pt-0.5 rounded-xl w-30 bg-orange-400 mt-4`}>
                  <Icon type="antdesign" name="dropbox" color="white" />
                  <Text style={tw`text-white text-sm font-light `}>
                    {item.status}
                  </Text>
                </View>
              </View>

            </TouchableOpacity>
          )}
        />
    </View>
  );
};

export default HomeScreen;