
"use client";

import { CoinList } from "@/config/api";
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  const [watchlist, setWatchlist] = useState([]);

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

 
  
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);


  useEffect(() => {
    const savedWatchlist = localStorage.getItem("watchlist");
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);
  
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setLoading(false);

    setCoins(data);
  }

  const fetchHistoricalData = async (coinId) => {
    const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`);
    setHistoricData(data.prices);
  };

  useEffect(() => {
    if (currency === "USD") setSymbol("$");
    else if (currency === "GBP") setSymbol("£");
    else if (currency === "INR") setSymbol("₹")
  }, [currency]);

  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        coins,
        loading,
        fetchCoins,
        alert,
        setAlert,
        watchlist,
       setWatchlist,
       setDays,
       historicData,
       fetchHistoricalData
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export const CryptoState = () => useContext(Crypto);

export default CryptoContext;



