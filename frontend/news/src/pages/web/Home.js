import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllNew } from "../../services/NewService";
import ReactPaginate from "react-paginate";

const Home = () => {
  const [listNews, setListNews] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

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

  return (
    <>
      <section>
        <div className="container p-3">
          <div className="row pb-3">
            <div className="col-12">
              <div className="box-news">
                {listNews &&
                  listNews.length > 0 &&
                  listNews.map((item, index) => {
                    return (
                      <div key={`news-${index}`} className="box-new-item">
                        <div className="row">
                          <div className="col-3">
                            <img alt="" src={item.thumbnail} />
                          </div>
                          <div className="col-9">
                            <div className="new-content">
                              <h5>
                                <Link to={`/new/${item.id}`}>
                                  {item.title}
                                </Link>
                              </h5>
                              <p>{item.shortDescription}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
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
        </div>
      </section>
    </>
  );
};

export default Home;
