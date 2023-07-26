import React from 'react';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllNew } from "../../services/NewService";
import ReactPaginate from "react-paginate";
import AddNewModal from "../../components/admin/modal/AddNewModal";
import UpdateNewModal from '../../components/admin/modal/UpdateNewModal';

const ManagerNew = () => {

  const [isShowInsert, setShowInsert] = useState(false);
  const [isShowUpdate, setShowUpdate] = useState(false);
  const [dataNewUpdate, setDataNewUpdate] = useState({});
  const [listNews, setListNews] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const handleClose = () => {
    setShowInsert(false);
    setShowUpdate(false);
  };

  const handlePageClick = (event) => {
    getNew(+event.selected + 1);
  };

  useEffect(() => {
    getNew(1);
  }, []);

  const getNew = async (page) => {
    let res = await getAllNew(page);
    if (res && res.data) {
      setListNews(res.data.data);
      setTotalPages(res.data.totalPage);
    }
  };

  const handleUpdateNew = (user) => {
    setDataNewUpdate(user);
    setShowUpdate(true);
  }

  return (
    <>
      <section className="content container py-4">
        <div className="d-flex justify-content-between">
          <p>List of news</p>
          <Link onClick={() => setShowInsert(true)} className="btn btn-primary">
            Add New
          </Link>
        </div>
        <table className="table caption-top">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Short Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {listNews &&
              listNews.length > 0 &&
              listNews.map((item, index) => {
                return (
                  <tr key={`news-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.shortDescription}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleUpdateNew(item)}
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
      <AddNewModal
        show={isShowInsert}
        handleClose={handleClose}
      />
      <UpdateNewModal
        show={isShowUpdate}
        handleClose={handleClose}
        dataNewUpdate={dataNewUpdate}
      />
    </>
  )
}

export default ManagerNew;