import { Alert } from 'react-native'
import React, { createContext, useContext, useState, useEffect, useMemo, useLayoutEffect } from "react";
import * as SQLite from "expo-sqlite";
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);

    const db = SQLite.openDatabase('user.db');

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

    useEffect(() => {
      openDatabase();
      AuthStateChanged();
    }, []);

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

    const verifyuser = (usercode) => {
        return fetch('https://msyds.madtec.be/api/app/commandes', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'userid': 'APP',
              'authorization': usercode,
            }
        })
        .then((response) => response.json())
        .then((json) => {
          saveUsercode(usercode);
          setOrders(json);
          AuthStateChanged();
          
          db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_code VARCHAR(30))', []);
            tx.executeSql('SELECT * FROM tbl_user WHERE user_code = ?', [usercode],  
            (tx, res) => {
              if(res.rows.length > 0){
                  console.log(json);
              } else {
                  tx.executeSql('INSERT INTO tbl_user (user_code) VALUES (?)', [usercode]);
              }
            });
          });
        })
        .catch((error) => {
          setError(error);
          console.log(error);
        
            db.transaction((tx) => {
              tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_code VARCHAR(30))', []);
              tx.executeSql('SELECT * FROM tbl_user WHERE user_code = ?', [usercode], 
              (tx, res) => {
                if(res.rows.length > 0){
                  tx.executeSql('DELETE FROM tbl_user WHERE user_code = ?', [usercode]);
                  Alert.alert("Erreur d'authentification", "Le code introduit à été desactivé");
                } else {
                  Alert.alert("Erreur d'authentification", "Le code introduit n'est pas correct");
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
        error,
        verifyuser, 
        logout, 
    }), [user, orders, error]);

    return (
        <AuthContext.Provider value={memodValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext);
}