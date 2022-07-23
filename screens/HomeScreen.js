import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import React, { useState, useEffect, useCallback } from "react";
import tw from "twrnc";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import EStyleSheet from "react-native-extended-stylesheet";


const tab = [
  {
      "id": "15263",
      "date": "1650629153",
      "cust_name": "MSYB2CNL Alon",
      "cust_company": "MSY Invest SPRL",
      "status": "Finalized",
      "produits": [
          {
              "ID": "17688",
              "IDMSY": "3538",
              "SKU": "HG-5065-BK",
              "DESC": "Herzberg HG-5065; Stand Mixer 1200W (1800W max), 6.5L Black",
              "QUAN": "1",
              "STATUS": "1",
              "EAN": "5836254106657",
              "PICS": [
                  "http://www.msy.be/images/Image/DSC_345_Black-1.jpg",
                  "http://www.msy.be/images/Image/Herzberg-HG-5065-Robot-mixeur-1800-W-max-HG-5065-3-2-1.jpg",
                  "http://www.msy.be/images/Image/Herzberg-HG-5065-Robot-mixeur-1800-W-max-HG-5065-1-1-1.jpg",
                  "http://www.msy.be/images/Image/Herzberg-HG-5065-Robot-mixeur-1800-W-max-HG-5065-2-1-1.jpg",
                  "http://www.msy.be/images/Image/Herzberg-HG-5065-Robot-mixeur-1800-W-max-HG-5065-3-1-1.jpg",
                  "http://www.msy.be/images/Image/Herzberg-HG-5065-Robot-mixeur-1800-W-max-HG-5065-4-1.JPG"
              ]
          },
          {
              "ID": "17689",
              "IDMSY": "4676",
              "SKU": "HG-8086",
              "DESC": "Herzberg Turbo Charger Showerhead",
              "QUAN": "1",
              "STATUS": 0,
              "EAN": "0634158802256",
              "PICS": [
                  "http://www.msy.be/images/Image/Herzberg-HG-8086-Pomme-de-douche-a-turbocompresseur-HG-8-18.jpg",
                  "http://www.msy.be/images/Image/Herzberg-HG-8086-Pomme-de-douche-a-turbocompresseur-HG-8-18.jpg",
                  "http://www.msy.be/images/Image/https://www.youtube.com/watch?v=F8NUhrigBDg",
                  "http://www.msy.be/images/Image/Herzberg-Pomme-de-douche-a-turbocompresseur-HG-8086-5-1.jpg",
                  "http://www.msy.be/images/Image/Herzberg-HG-8086-Pomme-de-douche-a-turbocompresseur-HG-8-15.jpg",
                  "http://www.msy.be/images/Image/Herzberg-HG-8086-Pomme-de-douche-a-turbocompresseur-HG-8.png"
              ]
          },
          {
              "ID": "17690",
              "IDMSY": "4697",
              "SKU": "GI-131870",
              "DESC": "Genius Ideas 2in1 High-Pressure Water Jet Lance",
              "QUAN": "1",
              "STATUS": 0,
              "EAN": "3574591318709",
              "PICS": [
                  "http://www.msy.be/images/Image/Genius-Ideas-x000000ae-GI-131870-Lance-a-jet-d-eau-haute.jpg",
                  "http://www.msy.be/images/Image/Genius-Ideas-x000000ae-GI-131870-Lance-a-jet-d-eau-haute.jpg",
                  "http://www.msy.be/images/Image/https://www.youtube.com/watch?v=SbjhZ_A4uGA&ab_channel=MSY.TV",
                  "http://www.msy.be/images/Image/Genius-Ideas-x000000ae-GI-131870-Lance-a-jet-d-eau-haute-9.jpg",
                  "http://www.msy.be/images/Image/Genius-Ideas-x000000ae-GI-131870-Lance-a-jet-d-eau-haute-11.jpg",
                  "http://www.msy.be/images/Image/Genius-Ideas-x000000ae-GI-131870-Lance-a-jet-d-eau-haute-1.jpg"
              ]
          },
          {
              "ID": "17691",
              "IDMSY": "4320",
              "SKU": "HG-8065BLU",
              "DESC": "Herzberg Travel HG-8065BLU: Cabin Bag - Blue",
              "QUAN": "1",
              "STATUS": 0,
              "EAN": "0634158799204",
              "PICS": [
                  "http://www.msy.be/images/Image/Herzberg-Travel-HG-8065BLU-Sac-Cabine-Bleu-HG-8065BLU-1.jpg",
                  "http://www.msy.be/images/Image/Herzberg-Travel-HG-8065BLU-Sac-Cabine-Bleu-HG-8065BLU-1.jpg",
                  "http://www.msy.be/images/Image/Herzberg-Travel-HG-8065BLU-Sac-Cabine-Bleu-HG-8065BLU-1-1.jpg",
                  "http://www.msy.be/images/Image/Herzberg-Travel-HG-8065BLU-Sac-Cabine-Bleu-HG-8065BLU-2-.jpg",
                  "http://www.msy.be/images/Image/Herzberg-Travel-HG-8065BLU-Sac-Cabine-Bleu-HG-8065BLU-3.jpg",
                  "http://www.msy.be/images/Image/Herzberg-Travel-HG-8065BLU-Sac-Cabine-Bleu-HG-8065BLU-4-.jpg"
              ]
          },
          {
              "ID": "17692",
              "IDMSY": "4351",
              "SKU": "HG-8034BLU",
              "DESC": "Herzberg HG-8034BLU: Moving Clothes Rack - Blue 1",
              "QUAN": "1",
              "STATUS": 0,
              "EAN": "0634158805066",
              "PICS": [
                  "http://www.msy.be/images/Image/Herzberg-HG-8034BLU-Porte-vetements-de-Demenagement-Bleu-12.jpg",
                  "http://www.msy.be/images/Image/Herzberg-HG-8034BLU-Porte-vetements-de-Demenagement-Bleu-12.jpg",
                  "http://www.msy.be/images/Image/Herzberg-HG-8034BLU-Porte-vetements-de-Demenagement-Bleu-1.jpg",
                  "http://www.msy.be/images/Image/Herzberg-HG-8034BLU-Porte-vetements-de-Demenagement-Bleu-17.jpg",
                  "http://www.msy.be/images/Image/Herzberg-HG-8034BLU-Porte-vetements-de-Demenagement-Bleu-18.jpg",
                  "http://www.msy.be/images/Image/Herzberg-HG-8034BLU-Porte-vetements-de-Demenagement-Bleu-16.jpg"
              ]
          },
          {
              "ID": "17693",
              "IDMSY": "4635",
              "SKU": "RL-CG-150.3",
              "DESC": "Royalty Line Coffee Grinder",
              "QUAN": "1",
              "STATUS": 0,
              "EAN": "5407004743165",
              "PICS": [
                  "http://www.msy.be/images/Image/Royalty-Line-RL-CG-150-1-Moulin-a-cafe-et-a-epices-RL-CG.jpg",
                  "http://www.msy.be/images/Image/Royalty-Line-RL-CG-150-1-Moulin-a-cafe-et-a-epices-RL-CG.jpg",
                  "http://www.msy.be/images/Image/Royalty-Line-RL-CG-150-1-Moulin-a-cafe-et-a-epices-RL-CG-1.jpg",
                  "http://www.msy.be/images/Image/Royalty-Line-RL-CG-150-1-Moulin-a-cafe-et-a-epices-RL-CG-2.jpg",
                  "http://www.msy.be/images/Image/Royalty-Line-RL-CG-150-1-Moulin-a-cafe-et-a-epices-RL-CG.JPG",
                  "http://www.msy.be/images/Image/Royalty-Line-RL-CG-150-1-Moulin-a-cafe-et-a-epices-RL-CG-1.JPG"
              ]
          },
          {
              "ID": "17694",
              "IDMSY": "4297",
              "SKU": "CC-9081",
              "DESC": "Cenocco CC-9081: Mini Sewing Machine",
              "QUAN": "1",
              "STATUS": 0,
              "EAN": "0634158798986",
              "PICS": [
                  "http://www.msy.be/images/Image/Cenocco-CC-9081-Mini-Machine-a-Coudre-CC-9081-8-1.jpg",
                  "http://www.msy.be/images/Image/Cenocco-CC-9081-Mini-Machine-a-Coudre-CC-9081-8-1.jpg",
                  "http://www.msy.be/images/Image/Cenocco-CC-9081-Mini-Machine-a-Coudre-CC-9081-1.jpg",
                  "http://www.msy.be/images/Image/Cenocco-CC-9081-Mini-Machine-a-Coudre-CC-9081-2-1.jpg",
                  "http://www.msy.be/images/Image/Cenocco-CC-9081-Mini-Machine-a-Coudre-CC-9081-3.jpg",
                  "http://www.msy.be/images/Image/Cenocco-CC-9081-Mini-Machine-a-Coudre-CC-9081-4.jpg"
              ]
          },
          {
              "ID": "17695",
              "IDMSY": "4297",
              "SKU": "CC-9081",
              "DESC": "Cenocco CC-9081: Mini Sewing Machine",
              "QUAN": "1",
              "STATUS": 0,
              "EAN": "0634158798986",
              "PICS": [
                  "http://www.msy.be/images/Image/Cenocco-CC-9081-Mini-Machine-a-Coudre-CC-9081-8-1.jpg",
                  "http://www.msy.be/images/Image/Cenocco-CC-9081-Mini-Machine-a-Coudre-CC-9081-8-1.jpg",
                  "http://www.msy.be/images/Image/Cenocco-CC-9081-Mini-Machine-a-Coudre-CC-9081-1.jpg",
                  "http://www.msy.be/images/Image/Cenocco-CC-9081-Mini-Machine-a-Coudre-CC-9081-2-1.jpg",
                  "http://www.msy.be/images/Image/Cenocco-CC-9081-Mini-Machine-a-Coudre-CC-9081-3.jpg",
                  "http://www.msy.be/images/Image/Cenocco-CC-9081-Mini-Machine-a-Coudre-CC-9081-4.jpg"
              ]
          },
          {
              "ID": "17696",
              "IDMSY": "4846",
              "SKU": "GI-023452",
              "DESC": "Genius Ideas Sewing Kit w/ Metal Box",
              "QUAN": "1",
              "STATUS": 0,
              "EAN": "3574590234529",
              "PICS": [
                  "http://www.msy.be/images/Image/Genius-Ideas-Kit-de-couture-avec-boite-en-metal-Gi-02345.png",
                  "http://www.msy.be/images/Image/Genius-Ideas-Kit-de-couture-avec-boite-en-metal-Gi-02345.png",
                  "http://www.msy.be/images/Image/https://www.youtube.com/watch?v=KH-bPJZjkmI&ab_channel=MSY.TV",
                  "http://www.msy.be/images/Image/Genius-Ideas-Kit-de-couture-avec-boite-en-metal-Gi-02345.jpg",
                  "http://www.msy.be/images/Image/Genius-Ideas-Kit-de-couture-avec-boite-en-metal-Gi-02345-1.jpg",
                  "http://www.msy.be/images/Image/Genius-Ideas-Kit-de-couture-avec-boite-en-metal-Gi-02345-2.jpg"
              ]
          }
      ],
      "type": "Dropshipping",
      "qu": 9,
      "poids": 20,
      "prep": "A preparer"
  },
];


const HomeScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [currentStatus, setCurrentStatus] = useState("Toutes");
  const [ArrayStatus, setArrayStatus] = useState([]);
  const [orders, setOrders] = useState(tab);

  /*useEffect(() => {
    const getOrders = async () => {
      axios
        .get("https://msyds.madtec.be/api/app/commandes", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            userid: "APP",
            authorization: user,
          },
        })
        .then((response) => {
          if (currentStatus === "Toutes") {
            setOrders(response.data);
          } else {
            const tab = [];

            response.data.forEach((order) => {
              if (order.prep === currentStatus) {
                tab.push(order);
              }
            });

            setOrders(tab);
          }
        })
        .catch((error) => {
          Alert.alert(
            "Erreur d'authentification",
            "Le code d'utilisateur à été desactivé"
          );

          logout();
        });
    };

    getOrders();
  }, [currentStatus]);

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
    };

    getOrderStatus();
  }, [orders]);*/

  const ConvertDate = function (seconds) {
    const dateMilliseconds = seconds * 1000;

    return new Date(dateMilliseconds).toLocaleDateString("fr-FR");
  };

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
              onPress={() => {
                [setCurrentStatus(item.status)];
              }}
              style={
                currentStatus == item.status
                  ? tw`border-b-2 border-red-700 pb-1`
                  : tw`border-b-0`
              }
            >
              <Text
                style={
                  currentStatus == item.status
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
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          marginBottom: 50,
          paddingBottom: 260,
        }}
        style={tw`bg-zinc-300 h-full mt-3 pt-3 rounded-t-3xl`}
        data={orders}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("DetailsOrdersScreen", { OrderId: item.id })
            }
            style={[
              tw`pl-6 pr-6 pt-4 pb-4 bg-white m-2 rounded-xl shadow-md w-3/4`,
              styles.ordercont,
            ]}
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
              <View
                style={tw`flex-row justify-around pt-0.5 pb-0.6 pr-2 rounded-xl w-30 bg-orange-400 mt-4`}
              >
                <Icon type="antdesign" name="dropbox" color="white" />
                <Text style={tw`text-white text-sm font-light `}>
                  {item.prep}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = EStyleSheet.create({
  ordercont: {
    width: 350,
  },
  "@media (min-width: 600) and (max-width: 900)": {
    // media queries
    ordercont: {
      width: 560,
    },
  },
});

export default HomeScreen;
