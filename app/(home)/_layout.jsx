
import React, { useEffect } from 'react';
import { router, Slot } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';


const _layout = () => {

  const { isSignedIn } = useAuth();
  useEffect(() => {
    if (!isSignedIn) {
      //redirect to onboarding screen when user is not signed
      console.log('redirecting to onboarding');
      router.replace('/')
    }
  },[isSignedIn])

 

  return (
   
    <Slot />
    
  
  )
}

export default _layout