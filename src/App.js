import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate(); // Usage
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const data = new FormData();
    data.append("username", username);
    data.append("password", password);

    fetch("http://localhost/e-learning/server-side/login.php", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.user.user_type);
        if (data.user.user_type === "admin") {
          console.log("data.user.user_type");
          navigate("/admin");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={login}>Log in</button>
    </div>
  );
}

export default App;
