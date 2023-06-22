import React from 'react';
import Path from "../../components/web/Path";
import { useParams } from 'react-router-dom';

const New = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <Path title="New"/>
      <div>New</div>
    </>
  )
}

export default New