import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './../styles/base.css';

const Instructor_dashboard = () => {
  const navigate = useNavigate();
  const [instructorCourses, setInstructorCourses] = useState([]);
  useEffect(() => {
    fetch("http://localhost/e-learning/server-side/instructor_courses.php", {
      method: "POST",
      headers: { "Authorization": localStorage.token }
    })
      .then(response => response.json())
      .then(data => {
        setInstructorCourses(data.instructor_courses);
      })
      .catch((e) => console.log(e))
  }, [])

  return (<>
    <h1>your courses</h1>
    <div className="flex space-around flec-wrap align-center">
      {
        instructorCourses.map((instructorCourse) => (
          <div className="card"
            key={instructorCourse.id}
            onClick={() => navigate(`/instructor/course/${instructorCourse.course_id}`)}>
            {instructorCourse.title}
          </div>
        ))
      }</div>
  </>)
}
export default Instructor_dashboard;
