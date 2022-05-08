import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native'
import { Icon } from 'react-native-elements';
import React, { useState, useEffect } from 'react'
import tw from 'twrnc';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'
import useAuth from "../hooks/useAuth";


const BarStat = [
  {
    id: "1",
    stat: "Toutes",
  },
  {
    id: "2",
    stat: "A Preparer",
  },
  {
    id: "3",
    stat: "Prête",
  },
  {
    id: "4",
    stat: "Partie",
  },];

const HomeScreen = ({ navigation }) => {
  const { logout, user } = useAuth();

  const [FilterStatus, setFilterStatus] = useState("Toutes");
  const [ArrayStatus, setArrayStatus] = useState(BarStat);
  const [Arrayorders, setArrayorders] = useState([]);

  const getDetailsOrders = () => {
    return axios.get('https://msyds.madtec.be/api/app/commande/15253', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'userid': 'APP',
          'authorization': usercode,
        }
    })
    .then((json) => {      
      let response = json.data;
      let order = [];

      for(let i = 0; i < response.length; i++) {
        if(response[i] === "[") {
          order = response.slice(i, response.length);
          order.json();
          break;
        }
      }
      console.log(order);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  useEffect(() => {
    getDetailsOrders();
  });

  return (
    <View style={tw`bg-white`}>
      <View style={tw`flex-row justify-between mt-15`}>
        <Text style={tw`text-red-700 font-bold ml-4 text-3xl`}>Commandes</Text>

        <View>
          <TouchableOpacity onPress={logout} style={tw`bg-red-700 p-2 mr-3 rounded-xl mt-1`}>
            <Text style={[{ fontSize: 12 }, tw`text-white`]}>Se deconnecter</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        horizontal
        data={ArrayStatus}
        KeyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={tw`pl-6 h-13 mt-8`}>
            <TouchableOpacity onPress={() => setFilterStatus(item.stat)} style={(FilterStatus == item.stat) ? (tw`border-b-2 border-red-700 pb-1`) : (tw`border-b-0`)}>
              <Text style={(FilterStatus == item.stat) ? ([{ fontSize: 18 }, tw`text-red-700 font-bold`]) : ([{ fontSize: 16 }, tw`text-black font-light`])}>{item.stat}</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <SearchBar
        containerStyle={tw`mr-5 ml-5`}
        inputContainerStyle={tw`bg-zinc-600 rounded-3xl h-8`}
        inputStyle={tw`text-white`}
        searchIcon={{ color: 'white' }}
        cancelIcon={{ color: 'white' }}
        clearIcon={{ color: 'white' }}
        platform='android'
        placeholder="Rechercher"
        style={{ fontSize: 16 }}
      />

      <FlatList
        contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
        style={tw`bg-zinc-300 h-full mt-3 pt-3  rounded-t-3xl `}
        data={Arrayorders}
        KeyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('DetailsOrdersScreen')}
            style={tw`pl-6 pr-6 pb-4 pt-4 bg-white m-2 w-90 rounded-xl shadow-md  `}
          >
            <View>
              <View style={tw`flex-row justify-between`}>
                <Text style={tw`text-zinc-500 text-base font-bold pr-4`}>{item.cust_company}</Text>
                <Text style={tw`text-zinc-500 text-base font-light pr-2`}>{item.type}</Text>
                <View style={tw`flex-row justify-around pt-0.5 rounded-xl w-30 bg-orange-400`}>
                  <Icon type="antdesign" name="dropbox" color="white" />
                  <Text style={tw`text-white text-sm font-light`}>
                    {item.status}</Text>
                </View>
              </View>
              <View style={tw`flex-row justify-between`}>
                <Text style={tw`text-zinc-500 mt-2 text-base font-semibold`}>{"#" + item.id}</Text>
                <Text style={tw`text-zinc-500 mt-2 text-base font-semibold`}>{item.date}</Text>
                <Text style={tw`text-zinc-500 mt-2 text-base font-semibold`}>{item.poids + " kg"}</Text>
                <Text style={tw`text-zinc-500 mt-2 text-base font-semibold`}>{item.qu + " art."}</Text>
              </View>
              <Text numberOfLines={1} style={tw`text-zinc-500 mt-2 text-base font-semibold`}>{item.produits.map((produit) => {})}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>

    

  )
}

export default HomeScreen;
