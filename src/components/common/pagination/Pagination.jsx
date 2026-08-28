import React from "react";
import { Pagination as AntPagination } from "antd";


import "./Pagination.css";
import { images } from "../../../config/Images";

const Pagination = ({ current = 1, total = 50, pageSize = 10, onChange }) => {
  return (
    <div className="mt-14 flex w-full justify-center">
      <AntPagination
        className="property-pagination"
        current={current}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
        showSizeChanger={false}
        showQuickJumper={false}
        showTotal={false}
        itemRender={(page, type, originalElement) => {
          if (type === "prev") {
            return (
              <span className="pagination-arrow">
                <img src={images?.left} alt="Previous" />
              </span>
            );
          }

          if (type === "next") {
            return (
              <span className="pagination-arrow">
                <img src={images?.right} alt="Next" />
              </span>
            );
          }

          if (type === "jump-prev" || type === "jump-next") {
            return <span className="pagination-dots">...</span>;
          }

          return originalElement;
        }}
      />
    </div>
  );
};

export default Pagination;
