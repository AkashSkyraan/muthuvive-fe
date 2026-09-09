import React, { useState } from "react";
import { Button, Popover, Drawer } from "antd";
import { MenuOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import images from "../config/Images.jsx";
import icons from "../config/Icons.jsx";
import { Link } from "react-router-dom";
import useScrollLock from "../hooks/UseScrollLock.jsx";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountPopoverOpen, setIsAccountPopoverOpen] = useState(false);
  useScrollLock(isAccountPopoverOpen);

  // ASSUMPTION: token is stored under "authToken" - swap this key if your
  // app uses a different one.
  const isLoggedIn = !!localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.reload();
  };

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
      key: "construction-services",
      label: "Construction",
      icon: icons.constructionIcon,
    },
    { key: "investment-land", label: "Investment", icon: icons.investmentIcon },
    {
      key: "commercial-residential-building",
      label: "Commercial / Residential Buildings",
      icon: icons.commercialResidentialIcon,
    },
  ];

  const loggedOutPopoverContent = (
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

  const loggedInPopoverContent = (
    <div className="w-64 sm:w-72 p-1 z-40 max-h-[70vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex flex-col items-center text-center pb-3 border-b border-gray-100">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-lg">
          M
        </div>
        <p className="mt-2 text-sm font-semibold text-gray-900">
          Muthvive's Properties
        </p>
      </div>

      <div className="pt-3">
        <p className="text-base font-semibold text-gray-900 mb-1 px-1">
          My Activity
        </p>
        <ul className="flex flex-col text-sm text-gray-600">
          <li>
            <Link
              to="/my-properties"
              onClick={() => setIsAccountPopoverOpen(false)}
              className="block px-1 py-1.5 !text-[#3E3E3E] font-semibold"
            >
              My Properties
            </Link>
          </li>
          <li>
            <Link
              to="/saved-lands"
              onClick={() => setIsAccountPopoverOpen(false)}
              className="block px-1 py-1.5 !text-[#3E3E3E] font-semibold"
            >
              Saved Lands
            </Link>
          </li>
          <li>
            <Link
              to="/recently-viewed"
              onClick={() => setIsAccountPopoverOpen(false)}
              className="block px-1 py-1.5 !text-[#3E3E3E] font-semibold"
            >
              Recently Viewed Properties
            </Link>
          </li>
        </ul>

        <p className="text-base font-semibold text-gray-900 mt-3 mb-1 px-1">
          Account Settings
        </p>
        <ul className="flex flex-col text-sm text-gray-600">
          <li>
            <Link
              to="/my-profile"
              onClick={() => setIsAccountPopoverOpen(false)}
              className="block px-1 py-1.5 !text-[#3E3E3E] font-semibold"
            >
              My Profile
            </Link>
          </li>
          <li>
            <Link
              to="/change-password"
              onClick={() => setIsAccountPopoverOpen(false)}
              className="block px-1 py-1.5 !text-[#3E3E3E] font-semibold"
            >
              Change Password
            </Link>
          </li>
        </ul>

        <p className="text-base font-semibold text-gray-900 mt-3 mb-1 px-1">
          General Settings
        </p>
        <ul className="flex flex-col text-sm text-gray-600">
          <li>
            <Link
              to="/about"
              onClick={() => setIsAccountPopoverOpen(false)}
              className="block px-1 py-1.5 !text-[#3E3E3E] font-semibold"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contactus"
              onClick={() => setIsAccountPopoverOpen(false)}
              className="block px-1 py-1.5 !text-[#3E3E3E] font-semibold"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to="/gallery"
              onClick={() => setIsAccountPopoverOpen(false)}
              className="block px-1 py-1.5 !text-[#3E3E3E] font-semibold"
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link
              to="/terms-and-conditions"
              onClick={() => setIsAccountPopoverOpen(false)}
              className="block px-1 py-1.5 !text-[#3E3E3E] font-semibold"
            >
              Terms &amp; conditions
            </Link>
          </li>
          <li>
            <Link
              to="/privacy-policy"
              onClick={() => setIsAccountPopoverOpen(false)}
              className="block px-1 py-1.5 !text-[#3E3E3E] font-semibold"
            >
              Privacy Policy
            </Link>
          </li>
        </ul>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full text-left px-1 py-1.5 mt-2 pt-2 border-t border-gray-100 text-sm text-gray-600 !text-[#3E3E3E] font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );

  const accountPopoverContent = isLoggedIn
    ? loggedInPopoverContent
    : loggedOutPopoverContent;

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
    <div
      id="main-header"
      className="w-full md:h-[12%] bg-primary sticky top-0 z-30 shadow-lg"
    >
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
                    Properties
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
              <Link to="/sell-property">
                <Button type="primary" className="!bg-secondary">
                  Sell my Properties
                </Button>
              </Link>
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

          {/* Mobile hamburger trigger + account avatar */}
          <div className="flex lg:hidden items-center justify-end gap-x-4">
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
                  className="w-6 h-6 hover:cursor-pointer"
                />
              </button>
            </Popover>

            <button onClick={() => setIsMenuOpen(true)}>
              <MenuOutlined className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - antd Drawer, right to left */}
      <Drawer
        placement="right"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        closable={false}
        size="85%"
        styles={{ body: { padding: 0 } }}
      >
        <div className="bg-primary h-full overflow-y-auto">
          <div className="w-[90%] mx-auto p-4">
            <div className="flex items-center justify-between">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <img src={images.logo} alt="Logo" className="w-36 h-auto" />
              </Link>
              <button onClick={() => setIsMenuOpen(false)}>
                <CloseOutlined className="text-lg" />
              </button>
            </div>

            <ul className="flex flex-col text-start gap-y-5 text-sm mt-8">
              <li className="transition-colors">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="!text-black"
                >
                  Home
                </Link>
              </li>
              <li className="transition-colors">
                <Link
                  to="/properties"
                  onClick={() => setIsMenuOpen(false)}
                  className="!text-black"
                >
                  Properties
                </Link>
              </li>
              <li className="transition-colors">
                <Link
                  to="/gallery"
                  onClick={() => setIsMenuOpen(false)}
                  className="!text-black"
                >
                  Gallery
                </Link>
              </li>
              <li className="transition-colors">
                <Link
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="!text-black"
                >
                  AboutUs
                </Link>
              </li>
              <li className="transition-colors">
                <Link
                  to="/contactus"
                  onClick={() => setIsMenuOpen(false)}
                  className="!text-black"
                >
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
              <a
                href="#"
                className="underline underline-offset-2 ml-2 text-sm !text-black"
              >
                +91 9456783490
              </a>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
