
import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import Course_card from './components/Course_card';
import Instructor_course from './components/Instructor_course';
import AdminPage from "./pages/AdminPage";
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
        {/* <Route path="/admin/students" element={<Students />} />
        <Route path="/admin/instructors" element={<Instructors />} />
        <Route path="/admin/courses" element={<Courses />} /> */}
        <Route path="/student/course/:course_id" element={<Course_card />} />
        <Route path="/instructor" element={<Instructor_dashboard />} />
        <Route path="/instructor/course/:course_id" element={<Instructor_course />} />
        <Route path="/student" element={<Student_dashboard />} />


      </Routes>
    </div>
  );
};

export default App;
