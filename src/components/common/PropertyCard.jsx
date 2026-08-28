import React from "react";
import { Card, Image, Button, Tag, Typography, Tooltip } from "antd";
import {
  EnvironmentOutlined,
  BorderOutlined,
  BankOutlined,
  HomeOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";

const { Text } = Typography;

const PropertyCard = ({
  property,
  onClick,
  onBookmark,
  isBookmarked = false,
}) => {
  const {
    image,
    propertyType,
    title,
    price,
    priceUnit = "Per Acre",
    location,
    area,
    hospitals,
    schools,
  } = property;

  return (
    <Card
      hoverable
      className="!overflow-hidden !rounded-sm !border-gray-200 !p-0"
      styles={{
        body: {
          padding: 0,
        },
      }}
      onClick={() => onClick?.(property)}
    >
      {/* IMAGE */}
      <div className="relative h-[265px] w-full overflow-hidden">
        <Image
          preview={false}
          src={image}
          alt={title}
          className="!h-full !w-full object-cover"
        />

        {/* BOOKMARK */}
        <Tooltip
          title={
            isBookmarked
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          <Button
            type="text"
            icon={
              isBookmarked ? (
                <HeartFilled />
              ) : (
                <HeartOutlined />
              )
            }
            onClick={(e) => {
              e.stopPropagation();
              onBookmark?.(property);
            }}
            className="
              !absolute
              !right-3
              !top-3
              !flex
              !h-9
              !w-9
              !items-center
              !justify-center
              !rounded-md
              !bg-black/20
              !p-0
              !text-[21px]
              !text-white
              hover:!bg-black/30
              hover:!text-white
            "
          />
        </Tooltip>

        {/* PROPERTY TYPE */}
        {propertyType && (
          <Tag
            bordered={false}
            className="
              !absolute
              !bottom-3
              !right-3
              !m-0
              !rounded-lg
              !bg-white
              !px-3
              !py-2
              !text-[13px]
              !font-medium
              !text-primary
              !shadow-sm
            "
          >
            {propertyType}
          </Tag>
        )}
      </div>

      {/* CONTENT */}
      <div className="px-4 pb-4 pt-4">

        {/* TITLE */}
        <Text
          strong
          className="
            block
            truncate
            !text-[17px]
            !font-medium
            !text-[#111111]
          "
        >
          {title}
        </Text>

        {/* PRICE */}
        <div className="mt-3 text-[17px] font-semibold text-primary">
          ₹ {price}

          <span className="text-[15px] font-medium">
            {" "}
            / {priceUnit}
          </span>
        </div>

        {/* LOCATION */}
        <div className="mt-3 flex min-h-[40px] items-start gap-2">
          <EnvironmentOutlined
            className="
              mt-[2px]
              shrink-0
              !text-[18px]
              !text-[#17213D]
            "
          />

          <Text
            type="secondary"
            ellipsis={{
              tooltip: location,
            }}
            className="!text-[13px] !leading-[18px]"
          >
            {location}
          </Text>
        </div>

        {/* DETAILS */}
        <div className="mt-3 flex items-center justify-between gap-2">

          {/* AREA */}
          <div className="flex min-w-0 items-center gap-1.5">
            <BorderOutlined className="shrink-0 !text-[#17213D]" />

            <Text
              type="secondary"
              className="truncate !text-[12px]"
            >
              {area}
            </Text>
          </div>

          {/* HOSPITAL */}
          <div className="flex min-w-0 items-center gap-1.5">
            <BankOutlined className="shrink-0 !text-[#17213D]" />

            <Text
              type="secondary"
              className="truncate !text-[12px]"
            >
              {hospitals} Hospitals
            </Text>
          </div>

          {/* SCHOOL */}
          <div className="flex min-w-0 items-center gap-1.5">
            <HomeOutlined className="shrink-0 !text-[#17213D]" />

            <Text
              type="secondary"
              className="truncate !text-[12px]"
            >
              {schools} Schools
            </Text>
          </div>

        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;