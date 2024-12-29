import React from "react";

export default function Alert({ message, type }) {
  const alertStyles = {
    success: "bg-green-100 text-green-800 border-green-300",
    error: "bg-red-100 text-red-800 border-red-300",
    info: "bg-blue-100 text-blue-800 border-blue-300",
  };

  return (
    <div
      className={`border-l-4 p-4 mb-4 ${alertStyles[type] || alertStyles.info} rounded-md`}
      role="alert"
    >
      <p>{message}</p>
    </div>
  );
}