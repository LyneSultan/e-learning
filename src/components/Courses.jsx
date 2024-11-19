import { useState } from "react";
import { useLocation } from "react-router-dom";
const Courses = () => {
  const location = useLocation();
  const { courses } = location.state;
  console.log(courses);

  const [courseTitle, setCourseTitle] = useState("");

  const createCourse = () => {
    const data = new FormData();
    data.append("title", courseTitle);
    fetch("http://localhost/e-learning/server-side/create_course.php",
      {
        method: "POST",
        body: data
      }
    ).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log("error:", error));

  }
  const deleteCourse = (courseId) => {
    const data = new FormData();
    data.append("course_id", courseId);

    fetch("http://localhost/e-learning/server-side/delete_course.php", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log("Error deleting course:", error));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="enter the course title"
        onChange={(e) => setCourseTitle(e.target.value)}
      />
      <button onClick={() => createCourse()}>add Course</button>


      <table>
        <thead>
          <tr>
            <th>course title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>{course.title}</td>
              <td>
                <button >Edit</button>
                <button onClick={() => deleteCourse(course.course_id)}>
                  Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div >
  );
};

export default Courses;
