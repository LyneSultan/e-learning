import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost/e-learning/server-side/view_all.php")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <h1>Welcome to admin page</h1>
      <button onClick={() => navigate("/admin/students", { state: { students: data.students } })}>
        Student
      </button>
      <button onClick={() => navigate("/admin/instructors", { state: { instructors: data.instructors, courses: data.courses, } })}>instructors</button>
      <button onClick={() => navigate("/admin/courses", { state: { courses: data.courses, } })}>courses</button>

      {/* <Link to="/admin/courses"> <button>courses</button></Link> */}
    </>
  )

}
export default AdminPage;
