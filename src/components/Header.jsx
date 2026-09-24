import React, { useState } from "react";
import { Button, Popover, Drawer } from "antd";
import { MenuOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import images from "../config/Images.jsx";
import icons from "../config/Icons.jsx";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useScrollLock from "../hooks/UseScrollLock.jsx";
import { useAboutUs } from "../context/AboutusContext.jsx";

const Header = () => {
  const { aboutUs, loading, error } = useAboutUs();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isDesktopAccountOpen, setIsDesktopAccountOpen] = useState(false);

  const [isMobileAccountOpen, setIsMobileAccountOpen] = useState(false);

  const [isMobilePropertiesOpen, setIsMobilePropertiesOpen] = useState(false);

  // Lock scroll if account Popover is open
  useScrollLock(isDesktopAccountOpen || isMobileAccountOpen);

  const isLoggedIn = !!localStorage.getItem("authToken");

  // ---------------------------------------------------------
  // Check active route
  // ---------------------------------------------------------

  const isActive = (path) => {
    return location.pathname === path;
  };

  // ---------------------------------------------------------
  // Check if any property route is active
  // ---------------------------------------------------------

  const isPropertiesActive = location.pathname.startsWith("/properties/");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.reload();
  };

  const closeAccountPopover = () => {
    setIsDesktopAccountOpen(false);
    setIsMobileAccountOpen(false);
  };

  const propertyCategories = [
    {
      key: "farmland",
      label: "Farmland",
      icon: icons.farmlandIcon,
    },
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
    {
      key: "investment-land",
      label: "Investment",
      icon: icons.investmentIcon,
    },
    {
      key: "commercial-building",
      label: "Commercial Buildings",
      icon: icons.commercialLandIcon,
    },
    {
      key: "residential-building",
      label: "Residential Buildings",
      icon: icons.commercialResidentialIcon,
    },
  ];

  const loggedOutPopoverContent = (
    <div className="w-75 p-1 z-40">
      <div className="flex items-center gap-x-2">
        <UserOutlined className="text-gray-500" />

        <p className="text-sm text-gray-600">
          Login or sign Up Your Account to Explore
        </p>
      </div>

      <div className="flex items-center gap-x-3 mt-3">
        <Button
          className="!border-secondary !text-secondary flex-1 !text-sm"
          onClick={() => {
            closeAccountPopover;
            navigate("/login");
          }}
        >
          Login
        </Button>

        <Button
          type="primary"
          className="!bg-secondary flex-1 !text-sm"
          onClick={() => {
            closeAccountPopover;
            navigate("/signup");
          }}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );

  // ---------------------------------------------------------
  // Logged In Account Popover
  // ---------------------------------------------------------

  const loggedInPopoverContent = (
    <div className="w-64 sm:w-72 p-1 z-40 max-h-[70vh] account-popover-scroll overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden overscroll-contain">
      <div className="flex flex-col items-center text-center pb-3 border-b border-gray-100">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-lg">
          A
        </div>

        <p className="mt-2 text-base font-semibold text-black">
          Muthvive's Properties
        </p>
      </div>

      <div className="pt-3">
        <p className="text-base font-semibold text-black mb-1 px-1">
          My Activity
        </p>

        <ul className="flex flex-col text-sm text-gray-600">
          <li>
            <Link
              to="/properties/my-properties"
              onClick={closeAccountPopover}
              className="block px-1 py-1.5 !text-[#3E3E3E] font-semibold"
            >
              My Properties
            </Link>
          </li>

          <li>
            <Link
              to="/properties/saved-properties"
              onClick={closeAccountPopover}
              className="block px-1 py-1.5 !text-[#3E3E3E] font-semibold"
            >
              Saved Lands
            </Link>
          </li>

          <li>
            <Link
              to="/properties/recent-properties"
              onClick={closeAccountPopover}
              className="block px-1 py-1.5 !text-[#3E3E3E] font-semibold"
            >
              Recently Viewed Properties
            </Link>
          </li>
        </ul>

        <p className="text-base font-semibold text-black mt-3 mb-1 px-1">
          Account Settings
        </p>

        <ul className="flex flex-col text-sm text-gray-600">
          <li>
            <Link
              to="/profile"
              onClick={closeAccountPopover}
              className="block px-1 py-1.5 !text-[#3E3E3E] font-semibold"
            >
              My Profile
            </Link>
          </li>

          <li>
            <Link
              to="/forgot-password"
              onClick={closeAccountPopover}
              className="block px-1 py-1.5 !text-[#3E3E3E] font-semibold"
            >
              Change Password
            </Link>
          </li>
        </ul>

        <p className="text-base font-semibold text-black mt-3 mb-1 px-1">
          General Settings
        </p>

        <ul className="flex flex-col text-sm text-gray-600">
          <li>
            <Link
              to="/about"
              onClick={closeAccountPopover}
              className="block px-1 py-1.5 !text-[#3E3E3E] font-semibold"
            >
              About Us
            </Link>
          </li>

          <li>
            <Link
              to="/contactus"
              onClick={closeAccountPopover}
              className="block px-1 py-1.5 !text-[#3E3E3E] font-semibold"
            >
              Contact Us
            </Link>
          </li>

          <li>
            <Link
              to="/gallery"
              onClick={closeAccountPopover}
              className="block px-1 py-1.5 !text-[#3E3E3E] font-semibold"
            >
              Gallery
            </Link>
          </li>

          <li>
            <Link
              to="/terms-and-conditions"
              onClick={closeAccountPopover}
              className="block px-1 py-1.5 !text-[#3E3E3E] font-semibold"
            >
              Terms & conditions
            </Link>
          </li>

          <li>
            <Link
              to="/privacy-policy"
              onClick={closeAccountPopover}
              className="block px-1 py-1.5 !text-[#3E3E3E] font-semibold"
            >
              Privacy Policy
            </Link>
          </li>
        </ul>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full text-left px-1 py-1.5 mt-2 pt-2 border-t border-gray-100 text-sm text-gray-600 !text-[#3E3E3E] font-semibold cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );

  // ---------------------------------------------------------
  // Account Popover Content
  // ---------------------------------------------------------

  const accountPopoverContent = isLoggedIn
    ? loggedInPopoverContent
    : loggedInPopoverContent;

  // ---------------------------------------------------------
  // Properties Popover Content
  // ---------------------------------------------------------

  const propertiesPopoverContent = (
    <div className="w-55 py-1 z-40">
      {propertyCategories.map((category) => (
        <Link
          key={category.key}
          to={`/properties/${category.key}`}
          onClick={() => {
            setIsMobilePropertiesOpen(false);
            setIsMenuOpen(false);
          }}
          className="flex items-center gap-x-3 px-2 py-2 rounded-md hover:bg-gray-50 transition-colors"
        >
          <img src={category.icon} alt={category.label} className="w-5 h-5" />

          <span className="text-base text-gray-800 hover:text-secondary">
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
      <div className="w-[90%] p-4 lg:p-3 mx-auto">
        <div className="grid grid-cols-[40%_60%] md:grid-cols-[25%_75%] lg:grid-cols-[17%_83%] xl:grid-cols-[30%_70%] 2xl:grid-cols-[35%_65%]">
          {/* Logo */}

          <div className="flex items-center">
            <Link to="/">
              <img
                src={images.logo}
                alt="Logo"
                className="w-30 sm:w-32 lg:w-36 xl:w-40 h-auto"
              />
            </Link>
          </div>

          {/* Desktop nav */}

          <div className="hidden lg:flex items-center gap-x-5 justify-between">
            <div>
              <ul className="flex gap-x-5 lg:gap-x-4 xl:gap-x-5 text-base">
                {/* Home */}

                <li
                  className={`transition-colors ${
                    isActive("/") ? "text-secondary" : "hover:text-secondary"
                  }`}
                >
                  <Link to="/">Home</Link>
                </li>

                {/* Desktop Properties Popover */}

                <li
                  className={`transition-colors ${
                    isPropertiesActive
                      ? "text-secondary"
                      : "hover:text-secondary"
                  }`}
                >
                  <Popover
                    content={propertiesPopoverContent}
                    trigger="hover"
                    placement="bottomLeft"
                    arrow={false}
                    align={{
                      offset: [0, 10],
                    }}
                  >
                    <span className="cursor-pointer">Properties</span>
                  </Popover>
                </li>

                {/* Gallery */}

                <li
                  className={`transition-colors ${
                    isActive("/gallery")
                      ? "text-secondary"
                      : "hover:text-secondary"
                  }`}
                >
                  <Link to="/gallery">Gallery</Link>
                </li>

                {/* About */}

                <li
                  className={`transition-colors ${
                    isActive("/about")
                      ? "text-secondary"
                      : "hover:text-secondary"
                  }`}
                >
                  <Link to="/about">AboutUs</Link>
                </li>

                {/* Contact */}

                <li
                  className={`transition-colors ${
                    isActive("/contactus")
                      ? "text-secondary"
                      : "hover:text-secondary"
                  }`}
                >
                  <Link to="/contactus">ContactUs</Link>
                </li>
              </ul>
            </div>

            {/* Sell property */}

            <div>
              <Link to="/sell-property">
                <Button type="primary" className="!bg-secondary !text-base">
                  Sell my Properties
                </Button>
              </Link>
            </div>

            {/* Phone */}

            <div className="flex items-center">
              <img
                src={icons.callBlackIcon}
                alt="call"
                className="w-6 h-6 lg:w-5 lg:h-5 xl:w-6 xl:h-6"
              />

              <a
                href={`tel:+91${aboutUs?.[0]?.mobile}`}
                className="font-bold underline underline-offset-2 ml-2 text-base whitespace-nowrap"
              >
                +91 {aboutUs?.[0]?.mobile}
              </a>
            </div>

            {/* Desktop account Popover */}

            <div>
              <Popover
                content={accountPopoverContent}
                trigger="click"
                open={isDesktopAccountOpen}
                onOpenChange={setIsDesktopAccountOpen}
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
                    className="w-[80%] hover:cursor-pointer"
                  />
                </button>
              </Popover>
            </div>
          </div>

          {/* Mobile hamburger trigger + account avatar */}

          <div className="flex lg:hidden items-center justify-end gap-x-5">
            {/* Mobile account Popover */}

            <Popover
              content={accountPopoverContent}
              trigger="click"
              open={isMobileAccountOpen}
              onOpenChange={setIsMobileAccountOpen}
              placement="bottomRight"
              arrow={false}
              align={{
                offset: [70, 20],
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

            {/* Mobile menu button */}

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
        onClose={() => {
          setIsMenuOpen(false);
          setIsMobilePropertiesOpen(false);
        }}
        closable={false}
        size="85%"
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <div className="bg-primary h-full overflow-y-auto">
          <div className="w-[90%] mx-auto p-4">
            {/* Drawer header */}

            <div className="flex items-center justify-between">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <img src={images.logo} alt="Logo" className="w-36 h-auto" />
              </Link>

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsMobilePropertiesOpen(false);
                }}
              >
                <CloseOutlined className="text-lg" />
              </button>
            </div>

            {/* Drawer navigation */}

            <ul className="flex flex-col text-start gap-y-5 text-base mt-8">
              {/* Home */}

              <li className="transition-colors">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={isActive("/") ? "!text-secondary" : "!text-black"}
                >
                  Home
                </Link>
              </li>

              {/* Mobile Properties Popover */}

              <li
                className={`transition-colors ${
                  isPropertiesActive ? "text-secondary" : "text-black"
                }`}
              >
                <Popover
                  content={propertiesPopoverContent}
                  trigger="click"
                  open={isMobilePropertiesOpen}
                  onOpenChange={setIsMobilePropertiesOpen}
                  placement="bottomLeft"
                  arrow={false}
                  align={{
                    offset: [0, 10],
                  }}
                >
                  <button
                    type="button"
                    className={
                      isPropertiesActive ? "!text-secondary" : "!text-black"
                    }
                  >
                    Properties
                  </button>
                </Popover>
              </li>

              {/* Gallery */}

              <li className="transition-colors">
                <Link
                  to="/gallery"
                  onClick={() => setIsMenuOpen(false)}
                  className={
                    isActive("/gallery") ? "!text-secondary" : "!text-black"
                  }
                >
                  Gallery
                </Link>
              </li>

              {/* About */}

              <li className="transition-colors">
                <Link
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className={
                    isActive("/about") ? "!text-secondary" : "!text-black"
                  }
                >
                  AboutUs
                </Link>
              </li>

              {/* Contact */}

              <li className="transition-colors">
                <Link
                  to="/contactus"
                  onClick={() => setIsMenuOpen(false)}
                  className={
                    isActive("/contactus") ? "!text-secondary" : "!text-black"
                  }
                >
                  ContactUs
                </Link>
              </li>
            </ul>

            {/* Phone */}

            <div className="flex items-center mt-8">
              <img
                src={icons.callBlackIcon}
                alt="call"
                className="w-5 h-5 md:w-6 md:h-6"
              />

              <a
                href={`tel:+91${aboutUs?.[0]?.mobile}`}
                className="underline underline-offset-2 ml-2 text-sm font-semibold !text-black"
              >
                +91 {aboutUs?.[0]?.mobile}
              </a>
            </div>

            {/* Sell property */}

            <div className="mt-8 text-start">
              <Link to="/sell-property" onClick={() => setIsMenuOpen(false)}>
                <Button
                  type="primary"
                  className="!bg-secondary w-auto max-w-[500px] !py-5 !text-base"
                  block
                >
                  Sell my Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
