import React, { useState } from "react";
import DataTable from "../utils/table";
import './../styles/base.css';

function Instructors({ instructors, courses, setInstructors }) {
  console.log(courses);
  console.log(instructors);

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
      .then(data => {
        console.log(data);
        setInstructors(() => [
          ...instructors,
          { user_id: data.instructor_id, username: data.username, user_type: "instructor" },
        ]);

      })
      .catch(error => {
        console.error("Error:", error);
      })
  }
  return (
    <div className="flex flex-column ">
      <h1>Create instructor record and View all instructors</h1>

      <div className="flex space-around">

        <div className="flex flex-column">
          <input
            type="text"
            placeholder="enter the instructor name"
            onChange={(e) => setInstructor(e.target.value)}
          />
          <button onClick={() => createInstructor(instructor)}>add this instructor</button>

        </div>

        <div className="flex flex-column">
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
          }}>assign</button>
        </div>
        <DataTable data={instructors} />
      </div>
    </div>
  )
}
export default Instructors;
// import React, { useState } from "react";
// import DataTable from "../utils/table";
// import './../styles/base.css';

// function Instructors({ instructors, courses, setInstructors }) {
//   const [instructor, setInstructor] = useState("");
//   const [selectedInstructor, setSelectedInstructor] = useState("");
//   const [selectedCourse, setSelectedCourse] = useState("");

//   const createInstructor = (instructor_name) => {
//     const data = new FormData()
//     data.append("username", instructor_name);
//     fetch("http://localhost/e-learning/server-side/create_instructor.php",
//       {
//         method: "POST",
//         body: data,
//       }
//     ).then(response => response.json())
//       .then(data => {
//         console.log(data);

//       })
//       .catch(error => {
//         console.error("Error:", error);
//       })
//   }
//   return (
//     <div className="flex flex-column ">
//       <h1>Create instructor record and View all instructors</h1>

//       <div class="flex space-around">

//         <div class="flex flex-column">
//           <input
//             type="text"
//             placeholder="enter the instructor name"
//             onChange={(e) => setInstructor(e.target.value)}
//           />
//           <button onClick={() => createInstructor(instructor)}>add this instructor</button>

//         </div>

//         <div className="flex flex-column">
//           <label>Select Instructor:</label>
//           <select value={selectedInstructor}
//             onChange={(e) => {
//               setSelectedInstructor(e.target.value); // it is not getting the latest change
//               console.log(selectedInstructor);
//             }}>
//             {instructors.map((instructor) => (
//               <option value={instructor.user_id}>
//                 {instructor.username}
//               </option>
//             ))}
//           </select>
//           <label>select the course</label>

//           <select value={selectedCourse}
//             onChange={(e) => {
//               setSelectedCourse(e.target.value);
//               console.log(selectedCourse);
//             }}>
//             {courses.map((course) => (
//               <option value={course.course_id}>
//                 {course.title}
//               </option>
//             ))}
//           </select>
//           <button onClick={() => {
//             const data = new FormData();
//             data.append("course_id", selectedCourse);
//             data.append("instructor_id", selectedInstructor);

//             fetch("http://localhost/e-learning/server-side/assign_instructor.php", {
//               method: "POST",
//               body: data
//             }).then(response => response.json())
//               .then(data => {
//                 console.log(selectedCourse);
//                 console.log(selectedInstructor);
//                 console.log(data);

//               })
//               .catch(error => {
//                 console.error('Error:', error);
//               });
//           }}>assign</button>
//         </div>


//         <DataTable data={instructors} />


//       </div>
//     </div>
//   )
// }
// export default Instructors;
