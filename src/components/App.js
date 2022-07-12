import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged(function(user){
      if (user){
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      }else{
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    })
  },[])

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  }
  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} userObj={userObj} isLoggedIn={isLoggedIn} /> : "Initializing..." }
      <footer style={{textAlign: 'center'}}>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;