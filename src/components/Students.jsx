import React from "react";
import { useLocation } from "react-router-dom";
import { handleBanUnban } from "./../utils/handleBanButton";

const Students = () => {
  const location = useLocation();
  const { students } = location.state || { students: [] };

  console.log(students);

  return (
    <>
      <h1>Student</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.username}</td>
              <td>
                <button onClick={() => handleBanUnban(student.user_id, 1)} >Ban</button>
                <button onClick={() => handleBanUnban(student.user_id, 0)}>Unban</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Students;
