import { Alert } from 'react-native'
import React, { createContext, useContext, useState, useEffect, useMemo, useLayoutEffect } from "react";
import * as SQLite from "expo-sqlite";
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);

    const db = SQLite.openDatabase('user.db');

    useEffect(() => {
      openDatabase();
      AuthStateChanged();
    }, []);

    const saveUsercode = async (usercode) =>{
      await SecureStore.setItemAsync('usercode', usercode);
    }

    const AuthStateChanged = async () => {
      const getUsercode = await SecureStore.getItemAsync('usercode');
    
      if(getUsercode){
        setUser(getUsercode);
      } else {
        setUser(null);
      }
    }

    const openDatabase = async () => {
        if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
          await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    
          await FileSystem.downloadAsync(
            Asset.fromModule(require("../assets/db/user.db")).uri,
            FileSystem.documentDirectory + 'SQLite/user.db'
          );
        }
    
        return SQLite.openDatabase('user.db');
    };

    async function verifyuser(usercode) {
        return await axios.get('https://msyds.madtec.be/api/app/commandes', {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'userid': 'APP',
              'authorization': usercode,
            },
            timeout: 3000,
        })
        .then((response) => {
          saveUsercode(usercode);
          AuthStateChanged();
          setOrders(response.data);
          
          db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_code VARCHAR(30))', []);
            tx.executeSql('SELECT * FROM tbl_user WHERE user_code = ?', [usercode],  
            (tx, res) => {
              if(res.rows.length = 0){
                tx.executeSql('INSERT INTO tbl_user (user_code) VALUES (?)', [usercode]);
              }
            });
          });
        })
        .catch((error) => {
          console.log(error);
        
            db.transaction((tx) => {
              tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_code VARCHAR(30))', []);
              tx.executeSql('SELECT * FROM tbl_user WHERE user_code = ?', [usercode], 
              (tx, res) => {
                if(res.rows.length > 0){
                  tx.executeSql('DELETE FROM tbl_user WHERE user_code = ?', [usercode]);
                  Alert.alert("Erreur d'authentification", "Le code d'utilisateur à été desactivé");
                } else {
                  Alert.alert("Erreur d'authentification", "Le code d'utilisateur n'est pas correct");
                }
              });
            })
        })
    };

    const logout = async () =>  {
        await SecureStore.deleteItemAsync('usercode');
        setUser(null);
    };

    const memodValue = useMemo(() => ({
        user,
        orders,
        verifyuser, 
        logout, 
    }), [user, orders]);

    return (
        <AuthContext.Provider value={memodValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext);
}