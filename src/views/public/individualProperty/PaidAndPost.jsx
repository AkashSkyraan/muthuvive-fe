import React from "react";
import { Link } from "react-router-dom";

const PaidAndPost = ({ type = "paid" }) => {
  return (
    <>
      {/* <Link to="/pay-and-post"> */}
      <button
        type="button"
        className={`
w-full
rounded-md
px-4
py-3
text-sm
font-medium
text-white
transition-colors
sm:py-3.5
sm:text-base
cursor-pointer
${
  type === "approved"
    ? "bg-[#00942A] hover:bg-green-700"
    : "bg-gray-500 hover:bg-gray-600"
}
`}
      >
        {type === "approved" ? "Paid & Post" : "Expired"}
      </button>
      {/* </Link> */}
    </>
  );
};

export default PaidAndPost;
