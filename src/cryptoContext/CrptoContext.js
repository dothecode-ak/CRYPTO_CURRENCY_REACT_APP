import React, { createContext, useContext,useEffect, useState } from "react";
const Crpto = createContext();
const CrptoContext = ({ children }) => {
    const [currency, setCurrency] = useState('INR');
    const [symbol, setSymbol] = useState("₹");
    useEffect(() => {
        if (currency === 'INR') setSymbol("₹");
        else if (currency === 'USD')setSymbol("$");
    }, [currency])
  return (
    <>
      <Crpto.Provider value={{ currency, symbol, setCurrency }}>
        {children}
      </Crpto.Provider>
    </>
  );
}

export default CrptoContext;
export const CrptoState = () =>
{
    return useContext(Crpto);
}