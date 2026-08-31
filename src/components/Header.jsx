import React, { useState } from "react";
import { Button, Popover } from "antd";
import { MenuOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import images from "../config/Images.jsx";
import icons from "../config/Icons.jsx";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountPopoverOpen, setIsAccountPopoverOpen] = useState(false);

  const propertyCategories = [
    { key: "farmland", label: "Farmland", icon: icons.farmlandIcon },
    {
      key: "dtcp-approved",
      label: "DTCP Approved",
      icon: icons.dtcpApprovedIcon,
    },
    {
      key: "agriculture-land",
      label: "Agriculture Land",
      icon: icons.agriculturalLandsIcon,
    },
    {
      key: "commercial-land",
      label: "Commercial Land",
      icon: icons.commercialLandIcon,
    },
    {
      key: "construction",
      label: "Construction",
      icon: icons.constructionIcon,
    },
    { key: "investment-land", label: "Investment", icon: icons.investmentIcon },
    {
      key: "commercial-residential",
      label: "Commercial / Residential Buildings",
      icon: icons.commercialResidentialIcon,
    },
  ];

  const accountPopoverContent = (
    <div className="w-64 p-1 z-40">
      <div className="flex items-center gap-x-2 ">
        <UserOutlined className="text-gray-500" />
        <p className="text-xs text-gray-600">
          Login or sign Up Your Account to Explore
        </p>
      </div>

      <div className="flex items-center gap-x-3 mt-3">
        <Button
          className="!border-secondary !text-secondary flex-1"
          onClick={() => setIsAccountPopoverOpen(false)}
        >
          Login
        </Button>
        <Button
          type="primary"
          className="!bg-secondary flex-1"
          onClick={() => setIsAccountPopoverOpen(false)}
        >
          Sign UP
        </Button>
      </div>
    </div>
  );
  const propertiesPopoverContent = (
    <div className="w-55 py-1 z-40">
      {propertyCategories.map((category) => (
        <Link
          key={category.key}
          to={`/properties/${category.key}`}
          className="flex items-center gap-x-3 px-2 py-2 rounded-md hover:bg-gray-50 transition-colors"
        >
          <img src={category.icon} alt={category.label} className="w-5 h-5" />
          <span className="text-sm text-gray-800 hover:text-secondary">
            {category.label}
          </span>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="w-full md:h-[12%] bg-primary sticky top-0 z-30">
      <div className="w-[90%] p-4 mx-auto">
        <div className="grid grid-cols-[40%_60%] md:grid-cols-[25%_75%] lg:grid-cols-[20%_80%] xl:grid-cols-[40%_60%]">
          <div className="flex items-center">
            <Link to="/">
              <img
                src={images.logo}
                alt="Logo"
                className="w-24 sm:w-32 lg:w-36 xl:w-40 h-auto"
              />
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-x-5 justify-between">
            <div className="">
              <ul className="flex gap-x-5 lg:gap-x-4 xl:gap-x-5 text-sm">
                <li className="transition-colors hover:text-secondary">
                  <Link to="/">Home</Link>
                </li>
                <li className="transition-colors hover:text-secondary">
                  <Popover
                    content={propertiesPopoverContent}
                    trigger="hover"
                    placement="bottomLeft"
                    arrow={false}
                    align={{
                      offset: [0, 10],
                    }}
                  >
                    <Link to="/properties">Properties</Link>
                  </Popover>
                </li>
                <li className="transition-colors hover:text-secondary">
                  <Link to="gallery">Gallery</Link>
                </li>
                <li className="transition-colors hover:text-secondary">
                  <Link to="/about">AboutUs</Link>
                </li>
                <li className="transition-colors hover:text-secondary">
                  <Link to="/contactus">ContactUs</Link>
                </li>
              </ul>
            </div>

            <div>
              <Button type="primary" className="!bg-secondary">
                Sell my Properties
              </Button>
            </div>

            <div className="flex items-center">
              <img
                src={icons.callBlackIcon}
                alt="call"
                className="w-6 h-6 lg:w-5 lg:h-5 xl:w-6 xl:h-6"
              />
              <a
                href="#"
                className="font-bold underline underline-offset-2 ml-2 text-sm whitespace-nowrap"
              >
                +91 9456783490
              </a>
            </div>

            <div>
              <Popover
                content={accountPopoverContent}
                trigger="click"
                open={isAccountPopoverOpen}
                onOpenChange={setIsAccountPopoverOpen}
                placement="bottomRight"
                arrow={false}
                align={{
                  offset: [0, 15],
                }}
              >
                <button>
                  <img
                    src={icons.userAvatarHolder}
                    alt="user-profile-placeholder"
                    className="w-[75%] hover: cursor-pointer"
                  />
                </button>
              </Popover>
            </div>
          </div>

          {/* Mobile hamburger trigger */}
          <div className="flex lg:hidden items-center justify-end">
            <button onClick={() => setIsMenuOpen(true)}>
              <MenuOutlined className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-primary md:lg overflow-y-auto">
          <div className="w-[90%] mx-auto p-4">
            <div className="flex items-center justify-around">
              <Link to="/">
                <img src={images.logo} alt="Logo" className="" />
              </Link>
              <button onClick={() => setIsMenuOpen(false)} className="ms-5">
                <CloseOutlined />
              </button>
            </div>

            <ul className="flex flex-col text-start gap-y-5 text-sm mt-8">
              <li className="transition-colors hover:text-secondary">
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li className="transition-colors hover:text-secondary">
                <Link to="/properties" onClick={() => setIsMenuOpen(false)}>
                  Properties
                </Link>
              </li>
              <li className="transition-colors hover:text-secondary">
                <Link to="/gallery" onClick={() => setIsMenuOpen(false)}>
                  Gallery
                </Link>
              </li>
              <li className="transition-colors hover:text-secondary">
                <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                  AboutUs
                </Link>
              </li>
              <li className="transition-colors hover:text-secondary">
                <Link to="/contactus" onClick={() => setIsMenuOpen(false)}>
                  ContactUs
                </Link>
              </li>
            </ul>

            <div className="mt-8 text-start">
              <Button
                type="primary"
                className="!bg-secondary w-auto max-w-[500px]"
                block
              >
                Sell my Properties
              </Button>
            </div>

            <div className="flex items-center mt-8">
              <img
                src={icons.callBlackIcon}
                alt="call"
                className="w-5 h-5 md:w-6 md:h-6"
              />
              <a href="#" className="underline underline-offset-2 ml-2 text-sm">
                +91 9456783490
              </a>
            </div>

            <div className="mt-8">
              <Popover
                content={accountPopoverContent}
                trigger="click"
                open={isAccountPopoverOpen}
                onOpenChange={setIsAccountPopoverOpen}
                placement="bottomLeft"
              >
                <button>
                  <img
                    src={icons.userAvatarHolder}
                    alt="user-profile-placeholder"
                    className="w-6 md:w-10 hover: cursor-pointer"
                  />
                </button>
              </Popover>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
