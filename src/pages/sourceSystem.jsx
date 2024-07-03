import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchSchemas, setSelectedSchemaId } from "../rtk/schemas";

const SourceSystem = () => {
  const dispatch = useDispatch();
  const schemas = useSelector((state) => state.schemas);
  console.log(schemas);
  useEffect(() => {
    dispatch(fetchSchemas());
  }, []);
  return (
    <div>Source Systems</div>
  )
}

export default SourceSystem