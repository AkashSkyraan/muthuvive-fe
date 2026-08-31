import React from "react";
import { Form, Input, Checkbox, Button } from "antd";
import { UpOutlined } from "@ant-design/icons";
import icons from "../../../config/Icons.jsx";

const EnquiryForm = () => {
  const [form] = Form.useForm();

  // Watch both checkboxes so the submit button only activates once agreed
  const agreeContact = Form.useWatch("agreeContact", form);
  const agreeTerms = Form.useWatch("agreeTerms", form);
  const canSubmit = agreeContact && agreeTerms;

  const handleFinish = (values) => {
    console.log("Enquiry submitted:", values);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full bg-[#eaf1fd] py-16 relative">
      <div className="w-[90%] mx-auto">
        <div className="flex flex-col lg:flex-row rounded-xl overflow-hidden">
          {/* Left content */}
          <div className="lg:w-1/2 p-6 sm:p-8 md:p-10 text-start">
            <span className="inline-block bg-[#dbe4fb] text-secondary text-xs font-medium px-3 py-1.5 rounded-md">
              Enquiry Now
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
              Let&rsquo;s Work Together
            </h2>

            <p className="text-sm text-gray-500 mt-4 leading-relaxed max-w-md">
              Whether you have a question, need more details about our services,
              or want to discuss a potential collaboration, we&rsquo;re here to
              help.
            </p>

            <ul className="flex flex-col gap-y-4 mt-6 text-sm text-gray-700">
              <li className="flex items-center gap-x-3">
                <img
                  src={icons.locationBlackIcon}
                  alt="location"
                  className="w-5 h-5"
                />
                <span>Tarde build Road,Chennai,Viruthnagar,-64100</span>
              </li>
              <li className="flex items-center gap-x-3">
                <img src={icons.callBlackIcon} alt="call" className="w-5 h-5" />
                <span>+91 9923 45672</span>
              </li>
              <li className="flex items-center gap-x-3">
                <img src={icons.mailBlackIcon} alt="mail" className="w-5 h-5" />
                <span>muthuview&rsquo;s123@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Right form */}
          <div className="lg:w-1/2 bg-white p-6 sm:p-8 md:p-10 text-start">
            <h3 className="text-base font-semibold text-gray-900 pb-4 -mx-6 sm:-mx-8 md:-mx-10 px-6 sm:px-8 md:px-10 border-b border-gray-200">
              Send Enquiry
            </h3>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleFinish}
              className="mt-2"
            >
              <Form.Item
                name="fullName"
                rules={[
                  { required: true, message: "Please enter your full name" },
                ]}
                className="!mb-0"
              >
                <Input
                  placeholder="Full Name"
                  variant="borderless"
                  className="!px-0 !py-3 !border-0 !border-b !border-gray-200 !rounded-none !shadow-none"
                />
              </Form.Item>

              <Form.Item
                name="mobileNumber"
                rules={[
                  {
                    required: true,
                    message: "Please enter your mobile number",
                  },
                ]}
                className="!mb-0"
              >
                <Input
                  placeholder="Mobile Number"
                  variant="borderless"
                  className="!px-0 !py-3 !border-0 !border-b !border-gray-200 !rounded-none !shadow-none"
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Enter a valid email" },
                ]}
                className="!mb-0"
              >
                <Input
                  placeholder="E-Mail"
                  variant="borderless"
                  className="!px-0 !py-3 !border-0 !border-b !border-gray-200 !rounded-none !shadow-none"
                />
              </Form.Item>

              <Form.Item
                name="agreeContact"
                valuePropName="checked"
                className="!mb-3 !mt-5"
              >
                <Checkbox className="text-xs text-gray-600">
                  I Agree To Be Contacted By Housing And Agents Via WhatsApp,
                  SMS, Phone, Email Etc
                </Checkbox>
              </Form.Item>

              <Form.Item
                name="agreeTerms"
                valuePropName="checked"
                className="!mb-6"
              >
                <Checkbox className="text-xs text-gray-600">
                  I Agree To The{" "}
                  <a href="#" className="underline text-gray-700">
                    Terms Of Services
                  </a>{" "}
                  And{" "}
                  <a href="#" className="underline text-gray-700">
                    Privacy Policy
                  </a>
                </Checkbox>
              </Form.Item>

              <Form.Item className="!mb-0">
                <Button
                  htmlType="submit"
                  disabled={!canSubmit}
                  block
                  className={`!h-11 !font-medium !border-none ${
                    canSubmit
                      ? "!bg-secondary !text-white"
                      : "!bg-gray-400 !text-white"
                  }`}
                >
                  Send Enquiries
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryForm;
