import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap 스타일 적용

function Lists({ alldata }) {
  if (!alldata || alldata.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>
        {alldata.map((element) => (
          <tr key={element.id}>
            <td>{element.id}</td>
            <td>{element.title}</td>
            <td>{element.author}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Lists;