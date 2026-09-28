import React from "react";
import { Link } from "react-router-dom";

const PaidAndPost = () => {
  return (
    <>
      {/* <Link to="/pay-and-post"> */}
      <button
        type="button"
        className="
        w-full
        rounded-md
        bg-[#00942A]
        px-4
        py-3
        text-sm
        font-medium
        text-white
        transition-colors
        hover:bg-green-700
        sm:py-3.5
        sm:text-base
        cursor-pointer
      "
      >
        Paid & Post
      </button>
      {/* </Link> */}
    </>
  );
};

export default PaidAndPost;
