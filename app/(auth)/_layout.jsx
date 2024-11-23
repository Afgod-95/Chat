import React, { useEffect } from 'react';
import {   Slot } from 'expo-router';
import { setStatusBarStyle } from "expo-status-bar";

const _layout = () => {
  useEffect(() => {
    setTimeout(() => {
      setStatusBarStyle("light");
    }, 0);
  }, []);
  return (
   <Slot />
  )
}

export default _layout