import React from 'react'
import { Link } from 'react-router-dom'

const Settings = () => {
  return (
    <div>
      <Link to={"/manage-ownership"} className="text-blue-500 hover:underline">
        Manage Ownership </Link>
        <Link to={"/manage-domains"} className="text-blue-500 hover:underline">
        Manage Domains </Link>
    </div>
  )
}

export default Settings