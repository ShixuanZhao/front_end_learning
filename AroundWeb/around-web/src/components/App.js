
import React, { useState } from "react";
import TopBar from "./TopBar";
import Main from "./Main";
import { TOKEN_KEY } from "../constants";
import "../styles/App.css";


//persistent login    localStorage.setItem(TOKEN_KEY, token);
//browser提供localStorage API
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
      localStorage.getItem(TOKEN_KEY) ? true : false
  );

  const logout = () => {
    console.log("log out");
    localStorage.removeItem(TOKEN_KEY);
    setIsLoggedIn(false);
  };
//子传父
  const loggedIn = (token) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      setIsLoggedIn(true);
    }
  };
  return (
      <div className="App">
        <TopBar isLoggedIn={isLoggedIn} handleLogout={logout} />
        <Main isLoggedIn={isLoggedIn} handleLoggedIn={loggedIn} />
      </div>
  );
}

export default App;

