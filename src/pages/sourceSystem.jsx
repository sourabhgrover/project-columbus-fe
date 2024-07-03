import React, { useEffect } from 'react'
 import SourceSystems from "../components/sourceSystems"; // Adjust the path as necessary
import { useDispatch, useSelector } from "react-redux";
import { fetchSchemas, setSelectedSchemaId } from "../rtk/schemas";

function Home() {
  const dispatch = useDispatch();
  const schemas = useSelector((state) => state.schemas);
  console.log(schemas);
  useEffect(() => {
    dispatch(fetchSchemas());
  }, []);
  return (
    <div className="p-4">
      <SourceSystems />
    </div>
  );
}

export default Home;
