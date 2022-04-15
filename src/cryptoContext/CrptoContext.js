import React, { createContext, useContext,useEffect, useState } from "react";
const Crpto = createContext();
const CrptoContext = ({ children }) => {
    const [currency, setCurrency] = useState('INR');
    const [sybmol, setSybmol] = useState("₹");
    useEffect(() => {
        if (currency === 'INR') setSybmol("₹");
        else if (currency === 'USD')setSybmol("$");
    }, [currency])
  return (
    <>
      <Crpto.Provider value={{ currency, sybmol,setCurrency}}>
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