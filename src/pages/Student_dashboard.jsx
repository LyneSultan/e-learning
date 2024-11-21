import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './../styles/base.css';

const Student_dashboard = () => {
  let token = localStorage.token;
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [studentCourses, setStudentCourses] = useState([]);
  const [commentType, setCommentType] = useState('');
  const [commentValue, setCommentValue] = useState('');


  useEffect(() => {
    fetch("http://localhost/e-learning/server-side/get_courses.php")
      .then((response) => response.json())
      .then((data) => setCourses(data.courses))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);
  useEffect(() => {
    fetch("http://localhost/e-learning/server-side/student_courses.php", {
      method: "POST",
      headers: {
        "Authorization": localStorage.token
      }
    })
      .then((response) => response.json())
      .then((data) => setStudentCourses(data.courses))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  return (
    <div>
      <div className="flex  space-around">
        <div className="flex flex-column">
          <h2>Select courses to enroll in</h2>
          <select
            onChange={(e) => {
              setSelectedCourse(e.target.value);
            }}
          >
            {courses.map((course) => (
              <option key={course.course_id} value={course.course_id}>
                {course.title}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              const data = new FormData();
              data.append("course_id", selectedCourse);
              fetch("http://localhost/e-learning/server-side/enroll_student.php", {
                method: "POST",
                body: data,
                headers: {
                  Authorization: localStorage.token,
                },
              })
                .then((response) => response.json())
                .then((data) => console.log(data));
            }}
          >
            Enroll
          </button>
        </div>

        <div className="flex flex-column">
          <h2>Add Comments</h2>
          <div>
            <label>
              <input
                type="radio"
                value="public"
                name="commentType"
                onChange={(e) => { setCommentType(e.target.value) }}
              />
              Public
            </label>
          </div>


          <div>
            <label>
              <input
                type="radio"
                value="private"
                name="commentType"
                onChange={(e) => { setCommentType(e.target.value) }}
              />
              Private
            </label>
          </div>
          <div><input type="text" onChange={(e) => setCommentValue(e.target.value)} /></div>
          <button onClick={() => {
            const data = new FormData();
            data.append("comment_value", commentValue);
            data.append("comment_type", commentType);
            fetch("http://localhost/e-learning/server-side/add_comment.php", {
              method: "POST",
              body: data,
              headers: {
                Authorization: localStorage.token,
              },
            })
              .then((response) => response.json())
              .then((data) => console.log(data));
          }}> Submit</button>
        </div>
      </div>

      <div className="flex space-around flex-wrap">
        {studentCourses && studentCourses.length > 0 ? (
          studentCourses.map((studentCourse) => (
            <div key={studentCourse.course_id} className="card flex justify-center align-center" onClick={() => {
              navigate(`/student/course/${studentCourse.course_id}`);
            }}>
              <div >
                {studentCourse.title}
              </div>
            </div>
          ))
        ) : (
          <div>No courses available</div>
        )}

      </div>
    </div>
  );
}

export default Student_dashboard;
