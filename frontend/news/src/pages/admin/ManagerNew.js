import React from 'react';
import { Link } from "react-router-dom";

const ManagerNew = () => {
  return (
    <>
      <section className="content container py-4">
        <div className='d-flex justify-content-between'>
          <p>List of news</p>
          <Link className="btn btn-primary">Add New</Link>
        </div>
        <table className="table caption-top">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  )
}

export default ManagerNew;