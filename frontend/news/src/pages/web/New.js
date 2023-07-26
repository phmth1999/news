import React from 'react';
import Path from "../../components/web/Path";
import { useParams } from 'react-router-dom';
import { getNewById } from "../../services/NewService";
import { useEffect, useState } from "react";
import parse  from 'html-react-parser';

const New = () => {
  const { id } = useParams();
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNews(id);
  }, []);

  const getNews = async (id) => {
    let res = await getNewById(id);
    if (res && res.data) {
      setNews(res.data);
    }
  };
  console.log(news);
  const content = `${news.content}`;
  return (
    <>
      <Path title="New"/>
      <section>
			<div className="container">
      {/* {parse(content)} */}
      <div dangerouslySetInnerHTML={{__html: content}}></div>
			</div>
		</section>
    </>
  )
}

export default New