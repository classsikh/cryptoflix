import React, { useState, useEffect } from "react";
import { CryptoContext } from "./cryptocontext.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./config/firebaseConfig.js";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./pages/fireBase.jsx";
import { CoinList } from "./config/api.js";
import axios from "axios";

export const CryptoProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coins, setCoins] = useState([]);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [watchlist, setWatchlist] = useState([]);
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);
  
  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setWatchlist(coin.data().coins);
        } else {
          console.log("No Items in WatchList");
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      console.log(user.uid);
    });
  });
  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);
  return (
    <CryptoContext.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        alert,
        setAlert,
        user,
        setUser,
        watchlist,
        setWatchlist,
        coins,
        setCoins,
        fetchCoins,
        loading
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
