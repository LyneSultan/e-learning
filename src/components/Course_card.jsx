import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './../styles/base.css';

const Course_card = () => {
  const { course_id } = useParams();
  const [assignments, setAssignments] = useState();
  const [annoucements, setAnnoucements] = useState();

  useEffect(() => {
    const data = new FormData();
    data.append("course_id", course_id);
    fetch("http://localhost/e-learning/server-side/get_annoucements_assignments.php", {
      method: "POST",
      body: data
    }).then(response => response.json())
      .then(data => {
        setAssignments(data.assignments);
        setAnnoucements(data.annoucements);
      })
  }, [])

  return (
    <div className='flex space-around'>

      <div>
        <h1>Assignments</h1>
        {assignments && assignments.length > 0 ? (
          assignments.map((assignment) => (
            <div key={assignment.assignment_id} className='card'>
              <div className='flex space-around'>
                <div>{assignment.title}</div>
                <div>{assignment.due_date}</div>
              </div>


              <form action="http://localhost/e-learning/server-side/upload.php" method="post" encType="multipart/form-data">
                <input type="file" name="fileToUpload" id="fileToUpload" />

                <input type="hidden" name="token" value={localStorage.token} />
                <input type="hidden" name="assignment_id" value={assignment.assignment_id} />
                <input type="submit" value="Upload" name="submit" />

              </form>

            </div>
          ))
        ) : (
          <div>No courses available</div>
        )}
      </div>


      <div>
        <h1>Annoucements</h1>
        {annoucements && annoucements.length > 0 ? (
          annoucements.map((annoucement) => (
            <div className='card'>
              {annoucement.annoucement_text}
            </div>
          ))
        ) : (
          <div>No courses available</div>
        )}
      </div>
    </div>)
}
export default Course_card;
