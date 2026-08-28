import React from "react";
import { Row, Col, Empty } from "antd";
import PropertyCard from "./PropertyCard";

const PropertyGrid = ({
  properties = [],
  onPropertyClick,
  onBookmark,
  bookmarkedIds = [],
}) => {
  if (!properties.length) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Empty description="No properties found" />
      </div>
    );
  }

  return (
    <Row gutter={[24, 40]}>
      {properties.map((property) => (
        <Col key={property.id} xs={24} sm={24} md={12} lg={12} xl={12}>
          <PropertyCard
            property={property}
            onClick={onPropertyClick}
            onBookmark={onBookmark}
            isBookmarked={bookmarkedIds.includes(property.id)}
          />
        </Col>
      ))}
    </Row>
  );
};

export default PropertyGrid;
