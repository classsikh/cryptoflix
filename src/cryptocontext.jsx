//  import React, { Children, useEffect, useState,createContext} from 'react';

//  const Crypto= createContext(null);

 
//  const cryptocontext = ({Children}) => {
//   const[currency, setCurrency] = useState("INR");
//   const[symbol, setSymbol] = useState("₹");

//   useEffect(() => {
//     if (currency === "INR") setSymbol("₹");
//     else if (currency === "USD") setSymbol("$");
//   },[currency]);
//    return (
//      <Crypto.Provider value={{currency,symbol,setCurrency}}>
//         {Children}
//      </Crypto.Provider>
//    )
//  }
 
//  export default cryptocontext;

//  export const CryptoState = () => {
//     useContext(Crypto);
//  }
import React, { createContext } from 'react';

export const CryptoContext = createContext(null);