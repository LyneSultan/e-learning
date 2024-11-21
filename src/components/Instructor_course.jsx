import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './../styles/base.css';

const Instructor_course = () => {
  const { course_id } = useParams();
  const [annoucement, setAnnoucement] = useState();
  const [assignment, setAssignment] = useState();
  const [invitation, setInvitation] = useState();

  function add_annoucement(annoucement_text, postData, url) {
    const data = new FormData();
    data.append("course_id", course_id);
    data.append(annoucement_text, postData);
    fetch(url,
      {
        method: "POST",
        headers: {
          "Authorization": localStorage.token
        },
        body: data
      }).then(response => response.json())
      .then(data => console.log(data))
      .catch((e) => console.log(e))
  }

  const [students, setStudents] = useState([]);


  useEffect(() => {
    fetch("http://localhost/e-learning/server-side/view_all.php")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data.students);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);



  return (
    <>
      <div className='flex space-around'>
        <div className='flex flex-column'>
          <input type="text" onChange={(e) => { setAnnoucement(e.target.value) }}></input>
          <button onClick={() => { add_annoucement("annoucement_text", annoucement, "http://localhost/e-learning/server-side/post_annoucement.php") }}>post annoucements</button>
        </div>

        <div className='flex flex-column'>
          <input type="text" onChange={(e) => { setAssignment(e.target.value) }}></input>
          <button onClick={() => { add_annoucement("title", assignment, "http://localhost/e-learning/server-side/post_assignments.php") }}>post assignments</button>
        </div>



        <div className='flex flex-column'>
          <select onChange={(e) => {
            setInvitation(e.target.value);
          }}>
            {students.map((student) => (
              <option key={student.username} value={student.user_id}>
                {student.username}
              </option>
            ))}
          </select>

          <button onClick={() => {
            const data = new FormData();
            data.append("course_id", course_id);
            data.append("student_id", invitation);
            fetch("http://localhost/e-learning/server-side/invitation.php", {
              method: "POST",
              headers: {
                "Authorization": localStorage.token
              }, body: data
            }).then(response => response.json())
              .then(data => console.log(data))
          }}>add invitation</button>
        </div>
      </div>
      <div>
        <h1>View submissions</h1>
      </div>

    </>)
}
export default Instructor_course;
