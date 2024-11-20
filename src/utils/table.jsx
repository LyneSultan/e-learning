import React from "react";
import { handleBanUnban } from "./handleBanButton";

function DataTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.username}</td>
            <td>
              <button onClick={() => handleBanUnban(item.user_id, 1)}>Ban</button>
              <button onClick={() => handleBanUnban(item.user_id, 0)}>Unban</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
