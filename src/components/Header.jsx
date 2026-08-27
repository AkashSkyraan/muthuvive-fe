import React, { useState } from "react";
import { Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import logo from "../assets/icons/Logo.png";
import callIcon from "../assets/icons/call-black.png";
import userProfileHolder from "../assets/icons/userProfileHolder.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full md:h-[12%] bg-primary">
      <div className="w-[90%] p-4 mx-auto">
        <div className="grid grid-cols-[40%_60%] md:grid-cols-[25%_75%] lg:grid-cols-[20%_80%] xl:grid-cols-[40%_60%]">
          <div className="flex items-center">
            <a href="#">
              <img src={logo} alt="Logo" className="" />
            </a>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-x-5 justify-between">
            <div className="">
              <ul className="flex gap-x-5 lg:gap-x-4 xl:gap-x-5 text-sm">
                <li className="transition-colors hover:text-secondary">
                  <a href="#">Home</a>
                </li>
                <li className="transition-colors hover:text-secondary">
                  <a href="#">Properties</a>
                </li>
                <li className="transition-colors hover:text-secondary">
                  <a href="#">Gallery</a>
                </li>
                <li className="transition-colors hover:text-secondary">
                  <a href="#">AboutUs</a>
                </li>
                <li className="transition-colors hover:text-secondary">
                  <a href="#">ContactUs</a>
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
                src={callIcon}
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
              <a>
                <img
                  src={userProfileHolder}
                  alt="user-profile-placeholder"
                  className="w-[75%]"
                />
              </a>
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
              <a href="#">
                <img src={logo} alt="Logo" className="" />
              </a>
              <button onClick={() => setIsMenuOpen(false)} className="ms-5">
                <CloseOutlined />
              </button>
            </div>

            <ul className="flex flex-col text-start gap-y-5 text-sm mt-8">
              <li className="transition-colors hover:text-secondary">
                <a href="#" onClick={() => setIsMenuOpen(false)}>
                  Home
                </a>
              </li>
              <li className="transition-colors hover:text-secondary">
                <a href="#" onClick={() => setIsMenuOpen(false)}>
                  Properties
                </a>
              </li>
              <li className="transition-colors hover:text-secondary">
                <a href="#" onClick={() => setIsMenuOpen(false)}>
                  Gallery
                </a>
              </li>
              <li className="transition-colors hover:text-secondary">
                <a href="#" onClick={() => setIsMenuOpen(false)}>
                  AboutUs
                </a>
              </li>
              <li className="transition-colors hover:text-secondary">
                <a href="#" onClick={() => setIsMenuOpen(false)}>
                  ContactUs
                </a>
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
                src={callIcon}
                alt="call"
                className="w-5 h-5 md:w-6 md:h-6"
              />
              <a href="#" className="underline underline-offset-2 ml-2 text-sm">
                +91 9456783490
              </a>
            </div>

            <div className="mt-8">
              <a>
                <img
                  src={userProfileHolder}
                  alt="user-profile-placeholder"
                  className="w-6 md:w-10"
                />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
