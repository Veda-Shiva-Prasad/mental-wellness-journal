import React, { useState } from "react";
import Auth from "./Auth";
import Journal from "./Journal";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  function handleToken(newToken) {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }
  function handleLogout() {
    setToken("");
    localStorage.removeItem("token");
  }

  return (
    <div>
      {!token ? (
        <Auth setToken={handleToken} />
      ) : (
        <Journal onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
