import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllUser } from "../../services/UserService";
import AddUserModal from "../../components/admin/modal/AddUserModal";
import UpdateUserModal from "../../components/admin/modal/UpdateUserModal";
import ReactPaginate from "react-paginate";
import _ from 'lodash';

const ManagerUser = () => {
  const [isShowInsert, setShowInsert] = useState(false);
  const [isShowUpdate, setShowUpdate] = useState(false);
  const [dataUserUpdate, setDataUserUpdate] = useState({});

  const handleClose = () => {
    setShowInsert(false);
    setShowUpdate(false);
  };

  const [listUsers, setListUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getUser(1);
  }, []);

  const getUser = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setListUsers(res.data.data);
      setTotalPages(res.data.totalPage);
    }
  };

  const handlePageClick = (event) => {
    getUser(+event.selected + 1);
  };

  const handleUpdateTable = (user) => {
    if (user) {
      getUser(1);
    }
  };

  const handleUpdateUser = (user) => {
    setDataUserUpdate(user);
    setShowUpdate(true);
  }

  const handleUpdateUserFormModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    let index = listUsers.findIndex(item => item.id === user.id);
    cloneListUsers[index].fullname = user.fullname;
    cloneListUsers[index].status = user.status;
    setListUsers(cloneListUsers);
  }

  return (
    <>
      <section className="content container py-4">
        <div className="d-flex justify-content-between">
          <p>List of users</p>
          <Link onClick={() => setShowInsert(true)} className="btn btn-primary">
            Add User
          </Link>
        </div>
        <table className="table caption-top">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">UserName</th>
              <th scope="col">FullName</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {listUsers &&
              listUsers.length > 0 &&
              listUsers.map((item, index) => {
                return (
                  <tr key={`users-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.fullname}</td>
                    <td>{item.roles}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleUpdateUser(item)}
                      >
                        Update
                      </button>
                      <button className="btn btn-sm btn-danger mx-1">
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={totalPages}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </section>
      <AddUserModal
        show={isShowInsert}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      <UpdateUserModal 
        show={isShowUpdate}
        handleClose={handleClose}
        dataUserUpdate={dataUserUpdate}
        handleUpdateUserFormModal={handleUpdateUserFormModal}
      />
    </>
  );
};

export default ManagerUser;
