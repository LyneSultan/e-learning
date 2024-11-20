import './../styles/base.css';

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Courses from '../components/Courses';
import Instructors from "../components/Instructors";
import Students from "../components/Students";

function AdminPage() {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState();
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);


  useEffect(() => {
    fetch("http://localhost/e-learning/server-side/view_all.php")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setInstructors(data["instructors"]);
        console.log(data);
        setCourses(data["courses"]);
        console.log(courses);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <h1 className="flex justify-center">Welcome to admin page</h1>
      <div className="flex justify-center">
        <button onClick={() => setActiveComponent("students")}>Student</button>
        <button onClick={() => setActiveComponent("instructors")}>Instructors</button>
        <button onClick={() => setActiveComponent("courses")}>Courses</button>
      </div>

      {/* {activeComponent === "students" && <Students students={data.students}></Students>}
      {activeComponent === "instructors" && <Instructors instructors={data.instructors} courses={data.courses} />} */}
      {activeComponent === "students" && <Students students={data.students}></Students>}
      {activeComponent === "instructors" && <Instructors instructors={instructors} setInstructors={setInstructors} courses={courses} />}
      {activeComponent === "courses" && <Courses courses={courses} setCourses={setCourses} />}

    </>
  )

}
export default AdminPage;
