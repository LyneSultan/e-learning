import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './../styles/base.css';
function Login() {
  const navigate = useNavigate();
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
      .then((response) => { return response.json(); })
      .then((data) => {
        console.log(data.user);

        if (data.user.ban == 0) {
          localStorage.setItem("token", data.access_token);

          if (data.user.user_type === "admin") {
            navigate("/admin");
          } else if (data.user.user_type === "student") {
            navigate("/student");
          } else if (data.user.user_type === "instructor") {
            navigate("/instructor");
          }
        } else {
          console.log("user banned");
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <div className="flex justify-center align-center flex-column ">

      <h1>Login</h1>
      <div class="flex flex-column">
        <label>Name:</label>
        <input
          type="text"
          placeholder="enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)} required
        />
      </div>
      <div class="flex flex-column">
        <label>Password:</label>
        <input
          type="password"
          placeholder="enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} required
        />
      </div>
      <button onClick={login}>Log in</button>
    </div>
  );
}

export default Login;
