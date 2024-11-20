import React from "react";
import DataTable from "../utils/table";
import './../styles/base.css';
const Students = ({ students }) => {

  console.log(students);

  return (
    <div >
      <DataTable data={students} />
    </div>
  );
};

export default Students;

