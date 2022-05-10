import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { Icon } from "react-native-elements";
import React, { useState, useEffect, } from "react";
import tw from "twrnc";
import { SearchBar } from "react-native-elements";
import axios from "axios";
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
  },
];

const HomeScreen = ({ navigation }) => {
  const { user, orders, logout } = useAuth();

  const [FilterStatus, setFilterStatus] = useState("Toutes");
  const [ArrayStatus, setArrayStatus] = useState(BarStat);
  const [ArrayDetailsOrders, setArrayDetailsOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDetailsOrders = async  () => {
        try {
          var api = null;

          var tab = [];
          for (var order of orders) {
            api = await axios.get("https://msyds.madtec.be/api/app/commande/" + order["id"], {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "userid": "APP",
                "authorization": user,
              },
            });

            tab.push(api.data[0]);
          }

          return setArrayDetailsOrders(tab), setLoading(false);
        } catch (error) {
          return console.error(error);
        }
  }

  useEffect(() => {
    getDetailsOrders();
  }, []);

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
              onPress={() => setFilterStatus(item.stat)}
              style={
                FilterStatus == item.stat
                  ? tw`border-b-2 border-red-700 pb-1`
                  : tw`border-b-0`
              }
            >
              <Text
                style={
                    FilterStatus == item.stat
                    ? [{ fontSize: 18 }, tw`text-red-700 font-bold`]
                    : [{ fontSize: 16 }, tw`text-black font-light`]
                }
              >
                {item.stat}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <SearchBar
        containerStyle={tw`mr-5 ml-5`}
        inputContainerStyle={tw`bg-zinc-600 rounded-3xl h-8`}
        inputStyle={tw`text-white`}
        searchIcon={{ color: "white" }}
        cancelIcon={{ color: "white" }}
        clearIcon={{ color: "white" }}
        platform="android"
        placeholder="Rechercher"
        style={{ fontSize: 16 }}
      />
      <View style={tw`bg-zinc-300 mt-3 pt-3 rounded-t-3xl `}>
      {loading ? 
        <ActivityIndicator size="large" color="#B5000D" style={tw`h-1/2 items-center`}/> :
            <FlatList
                  contentContainerStyle={{ flexGrow: 1, alignItems: "center", marginBottom:50,paddingBottom:260, }}
                  data={ArrayDetailsOrders}
                  KeyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => navigation.navigate("DetailsOrdersScreen", {item})}
                      style={tw`pl-6 pr-6 pt-4 pb-4 bg-white m-2 w-90 rounded-xl shadow-md  `}
                    >
                      <View>
                        <View style={tw`flex-row justify-between`}>
                          <Text style={tw`text-zinc-500 text-base font-bold pr-4`}>
                            {item.cust_company}
                          </Text>
                          <Text style={tw`text-zinc-500 text-base font-light pr-2`}>
                            {item.type}
                          </Text>
                          <View
                            style={tw`flex-row justify-around pt-0.5 rounded-xl w-30 bg-orange-400`}
                          >
                            <Icon type="antdesign" name="dropbox" color="white" />
                            <Text style={tw`text-white text-sm font-light`}>
                              {item.status}
                            </Text>
                          </View>
                        </View>
                        <View style={tw`flex-row justify-between`}>
                          <Text style={tw`text-zinc-500 mt-2 text-base font-semibold`}>
                            {"#" + item.id}
                          </Text>
                          <Text style={tw`text-zinc-500 mt-2 text-base font-semibold`}>
                            {item.date}
                          </Text>
                          <Text style={tw`text-zinc-500 mt-2 text-base font-semibold`}>
                            {item.poids + " kg"}
                          </Text>
                          <Text style={tw`text-zinc-500 mt-2 text-base font-semibold`}>
                            {item.qu + " art."}
                          </Text>
                        </View>
                        <Text numberOfLines={1} style={tw`text-zinc-500 mt-2 text-base font-semibold`}>
                        {item.produits.map((prod) =>prod["QUAN"] + " x " + prod["DESC"])}
                        </Text>
                      </View>
                      
                    </TouchableOpacity>
                  )}
          />
        }
      </View>
    </View>
  );
};

export default HomeScreen;
//<ActivityIndicator size="large" color="#B5000D"/>