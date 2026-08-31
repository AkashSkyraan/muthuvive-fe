import React from "react";
import { Form, Input, Button } from "antd";
import icons from "../../../config/Icons.jsx";

const GetInTouch = () => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("Contact form submitted:", values);
  };

  return (
    <div className="w-full py-16">
      <div className="w-[90%] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16">
        {/* Left content */}
        <div className="lg:w-1/2 text-start">
          <span className="inline-block bg-[#dbe4fb] text-secondary text-xs font-medium px-3 py-1.5 rounded-md">
            Contact Us
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mt-4 leading-tight">
            <span className="text-secondary">Get In Touch</span>
            <br />
            <span className="text-gray-900">With Our Team</span>
          </h2>

          <p className="text-sm text-gray-500 mt-4 max-w-md">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit,
          </p>

          <div className="flex flex-col gap-y-4 mt-8">
            <div className="bg-white shadow-sm rounded-lg p-4">
              <div className="flex items-center gap-x-2">
                <img
                  src={icons.locationBlueIcon}
                  alt="address"
                  className="w-5 h-5"
                />
                <h3 className="text-sm font-semibold text-gray-900">Address</h3>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Tarde build Road,Chennai,Viruthnagar,-64100
              </p>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-4">
              <div className="flex items-center gap-x-2">
                <img
                  src={icons.callBlueIcon}
                  alt="mobile number"
                  className="w-5 h-5"
                />
                <h3 className="text-sm font-semibold text-gray-900">
                  Mobile Number
                </h3>
              </div>
              <p className="text-sm text-gray-500 mt-2">+91 9923 45672</p>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-4">
              <div className="flex items-center gap-x-2">
                <img
                  src={icons.mailBlueIcon}
                  alt="email address"
                  className="w-5 h-5"
                />
                <h3 className="text-sm font-semibold text-gray-900">
                  Email Address
                </h3>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                muthuview&rsquo;s123@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Right form card */}
        <div className="lg:w-1/2 rounded-xl overflow-hidden shadow-lg bg-secondary px-0.5">
          <div className="h-10 bg-secondary rounded-t-4xl"></div>

          <div className="bg-[#dee9ff] p-6 sm:p-8 rounded-t-2xl">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFinish}
              requiredMark={false}
            >
              <Form.Item
                label={
                  <span className="text-sm font-medium text-gray-800">
                    Full Name
                  </span>
                }
                name="fullName"
                rules={[
                  { required: true, message: "Please enter your full name" },
                ]}
              >
                <Input
                  placeholder="Enter Your Full name"
                  className="!bg-white !border-gray-200 !py-2.5"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-sm font-medium text-gray-800">
                    Mobile Number
                  </span>
                }
                name="mobileNumber"
                rules={[
                  {
                    required: true,
                    message: "Please enter your mobile number",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Your email / Mobile number"
                  className="!bg-white !border-gray-200 !py-2.5"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-sm font-medium text-gray-800">
                    Email Address
                  </span>
                }
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Enter a valid email" },
                ]}
              >
                <Input
                  placeholder="Enter Your email / Mobile number"
                  className="!bg-white !border-gray-200 !py-2.5"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-sm font-medium text-gray-800">
                    Message
                  </span>
                }
                name="message"
                rules={[
                  { required: true, message: "Please enter your message" },
                ]}
              >
                <Input.TextArea
                  placeholder="Enter Your thoughts here ....."
                  rows={5}
                  className="!bg-white !border-gray-200"
                />
              </Form.Item>

              <Form.Item className="!mb-0">
                <Button
                  htmlType="submit"
                  className="!bg-secondary !text-white !border-none !font-medium !h-11 !px-8"
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
