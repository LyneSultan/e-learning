// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function App() {
//   const navigate = useNavigate(); // Usage
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const login = () => {
//     const data = new FormData();
//     data.append("username", username);
//     data.append("password", password);

//     fetch("http://localhost/e-learning/server-side/login.php", {
//       method: "POST",
//       body: data,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data.user.user_type);
//         if (data.user.user_type === "admin") {
//           console.log("data.user.user_type");
//           navigate("/admin");
//         }
//       })
//       .catch((error) => console.error("Error:", error));
//   };

//   return (
//     <div className="App">
//       <div>
//         <input
//           type="text"
//           placeholder="enter your name"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </div>
//       <div>
//         <input
//           type="password"
//           placeholder="enter your password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       <button onClick={login}>Log in</button>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import AdminPage from "./pages/AdminPage";

import Courses from './components/Courses';
import Instructors from './components/Instructors';
import Students from './components/Students';
import Instructor_dashboard from './pages/Instructor_dashboard';
import Login from './pages/login';
import Student_dashboard from './pages/Student_dashboard';

const App = () => {
  const location = useLocation();

  return (
    <div >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/students" element={<Students />} />
        <Route path="/admin/instructors" element={<Instructors />} />
        <Route path="/admin/courses" element={<Courses />} />
        <Route path="/instructor" element={<Instructor_dashboard />} />
        <Route path="/student" element={<Student_dashboard />} />


      </Routes>
    </div>
  );
};

export default App;
