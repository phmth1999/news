import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllUser } from "../../services/UserService";
import AddUserModal from "../../components/admin/modal/AddUserModal";
import UpdateUserModal from "../../components/admin/modal/UpdateUserModal";
import ReactPaginate from "react-paginate";
// import _ from 'lodash';
import RemoveUserModal from "../../components/admin/modal/RemoveUserModal";

const ManagerUser = () => {
  const [isShowInsert, setShowInsert] = useState(false);
  const [isShowUpdate, setShowUpdate] = useState(false);
  const [isShowDelete, setShowDelete] = useState(false);
  const [dataUserUpdate, setDataUserUpdate] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});

  const handleClose = () => {
    setShowInsert(false);
    setShowUpdate(false);
    setShowDelete(false);
  };

  const [listUsers, setListUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pages, setPage] = useState(0);

  useEffect(() => {
    getUser(1);
    setPage(1);
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
    setPage(+event.selected + 1);
  };

  const handleClickUpdateUser = (user) => {
    setDataUserUpdate(user);
    setShowUpdate(true);
  }

  // const handleUpdateUserFormModal = (user) => {
  //   let cloneListUsers = _.cloneDeep(listUsers);
  //   let index = listUsers.findIndex(item => item.id === user.id);
  //   cloneListUsers[index].fullname = user.fullname;
  //   cloneListUsers[index].status = user.status;
  //   setListUsers(cloneListUsers);
  // }

  const handleClickDeleteUser = (user) => {
    setDataUserDelete(user);
    setShowDelete(true);
  }

  const handleLoadListUserByFirst = () => {
      getUser(1);
      setPage(1);
  };

  const handleLoadListUserByPage = () => {
      getUser(pages);
      setPage(pages);
  };

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
                        onClick={() => handleClickUpdateUser(item)}
                      >
                        Update
                      </button>
                      <button 
                        className="btn btn-sm btn-danger mx-1"
                        onClick={() => handleClickDeleteUser(item)}
                      >
                        Delete
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
        handleLoadListUserByFirst={handleLoadListUserByFirst}
      />
      <UpdateUserModal 
        show={isShowUpdate}
        handleClose={handleClose}
        dataUserUpdate={dataUserUpdate}
        handleLoadListUserByPage={handleLoadListUserByPage}
      />
      <RemoveUserModal
        show={isShowDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleLoadListUserByPage={handleLoadListUserByPage}
      />
    </>
  );
};

export default ManagerUser;
