import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { handleBanUnban } from "./../utils/handleBanButton";

function Instructors() {
  const location = useLocation();

  const { instructors, courses } = location.state;
  console.log(instructors);
  console.log(courses);

  const [instructor, setInstructor] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const createInstructor = (instructor_name) => {
    const data = new FormData()
    data.append("username", instructor_name);
    fetch("http://localhost/e-learning/server-side/create_instructor.php",
      {
        method: "POST",
        body: data,
      }
    ).then(response => response.json())
      .then(data => { console.log(data); })
      .catch(error => {
        console.error("Error:", error);
      })
  }
  return (
    <>
      <h1>Create instructor record and View all instructors</h1>

      <div>
        <input
          type="text"
          placeholder="enter the instructor name"
          onChange={(e) => setInstructor(e.target.value)}
        />
        <button onClick={() => createInstructor(instructor)}>add this instructor</button>

      </div>

      <div>
        <label>Select Instructor:</label>
        <select value={selectedInstructor}
          onChange={(e) => {
            setSelectedInstructor(e.target.value); // it is not getting the latest change
            console.log(selectedInstructor);
          }}>
          {instructors.map((instructor) => (
            <option value={instructor.user_id}>
              {instructor.username}
            </option>
          ))}
        </select>
        <label>select the course</label>
        <select value={selectedCourse}
          onChange={(e) => {
            setSelectedCourse(e.target.value);
            console.log(selectedCourse);
          }}>
          {courses.map((course) => (
            <option value={course.course_id}>
              {course.title}
            </option>
          ))}
        </select>
        <button onClick={() => {
          const data = new FormData();
          data.append("course_id", selectedCourse);
          data.append("instructor_id", selectedInstructor);
          fetch("http://localhost/e-learning/server-side/assign_instructor.php", {
            method: "POST",
            body: data
          }).then(response => response.json())
            .then(data => {
              console.log(selectedCourse);
              console.log(selectedInstructor);
              console.log(data);

            })
            .catch(error => {
              console.error('Error:', error);
            });

        }
        }>assign</button>
      </div>



      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((instructor, index) => (
            <tr key={index}>
              <td>{instructor.username}</td>
              <td>
                <button onClick={() => handleBanUnban(instructor.user_id, 1)}>Ban</button>
                <button onClick={() => handleBanUnban(instructor.user_id, 0)}>Unban</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


    </>
  )
}
export default Instructors;
