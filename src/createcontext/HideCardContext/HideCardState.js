import React, { useState } from "react";
import HideCardContext from './HideCardContext'
export default function SearchModalState(props) {
    const[showCard,setShowCard]=useState(true);
    const handleShowCard=(val)=>{
        setShowCard(val)
    }
  return (
    <>
      <HideCardContext.Provider value={{ showCard,handleShowCard }}>
        {props.children}
      </HideCardContext.Provider>
    </>
  );
}
