import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import icons from "../../../config/Icons.jsx";
import { useAboutUs } from "../../../context/AboutusContext.jsx";
import { useEnquiry } from "../../../context/EnquiryContext.jsx";
import { postEnquiry } from "../../../api/aboutus.api.js";
import StatusMessage, {
  showStatusMessage,
} from "../../../components/common/MessagePopup.jsx";

// Empty shape used to reset the context after a successful submit -
// keep this in sync with whatever fields EnquiryContext actually stores.

const GetInTouch = () => {
  const { aboutUs, loading, error } = useAboutUs();
  const { formData, setFormData, resetFormData } = useEnquiry();

  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  // Watch form values
  const fullName = Form.useWatch("fullName", form);
  const mobileNumber = Form.useWatch("mobileNumber", form);
  const email = Form.useWatch("email", form);
  const message = Form.useWatch("message", form);

  // Check all fields based on the existing validation rules
  const isFullNameValid =
    fullName?.trim().length >= 3 && fullName?.trim().length <= 100;

  const isMobileValid = /^[6-9]\d{9}$/.test(mobileNumber || "");

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");

  const isMessageValid =
    message?.trim().length > 0 && message?.trim().length <= 200;

  const canSubmit =
    isFullNameValid &&
    isMobileValid &&
    isEmailValid &&
    isMessageValid &&
    !submitting;

  const handleFinish = async (values) => {
    const updatedFormData = {
      ...formData,
      name: values.fullName,
      mobile: values.mobileNumber,
      email: values.email,
      message: values.message,
    };

    setSubmitting(true);

    try {
      const response = await postEnquiry(updatedFormData);

      if (response.success === 0) {
        throw new Error("Enquiry submission failed");
      }

      showStatusMessage({
        type: "success",
        text: "Message Sent Successfully",
      });

      // Clear the visible form fields
      form.resetFields();

      // Clear the context state too, not just the form UI
      resetFormData();
    } catch (err) {
      console.error("Error submitting enquiry:", err);

      showStatusMessage({
        type: "error",
        text: "Failed To Send Message",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <StatusMessage placement="top-right" />

      <div className="w-full py-16">
        <div className="w-[90%] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left content */}
          <div className="lg:w-1/2 text-start">
            <span className="inline-block bg-[#dbe4fb] text-secondary text-base font-medium px-3 py-1.5 rounded-md">
              Contact Us
            </span>

            <h2 className="text-3xl md:text-4xl font-bold mt-4 leading-tight">
              <span className="text-secondary">Get In Touch</span>
              <br />
              <span className="text-gray-900">With Our Team</span>
            </h2>

            <p className="text-base text-gray-500 mt-4 max-w-md">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit,
            </p>

            <div className="flex flex-col gap-y-4 mt-8">
              <div className="bg-white shadow-md rounded-lg p-4">
                <div className="flex items-center gap-x-2">
                  <img
                    src={icons.locationBlueIcon}
                    alt="address"
                    className="w-5 h-5"
                  />
                  <h3 className="text-base font-semibold text-gray-900">
                    Address
                  </h3>
                </div>

                <p
                  className="text-base text-gray-500 mt-2 truncate"
                  title={aboutUs?.[0]?.address}
                >
                  {aboutUs?.[0]?.address}
                </p>
              </div>

              <div className="bg-white shadow-md rounded-lg p-4">
                <div className="flex items-center gap-x-2">
                  <img
                    src={icons.callBlueIcon}
                    alt="mobile number"
                    className="w-5 h-5"
                  />
                  <h3 className="text-base font-semibold text-gray-900">
                    Mobile Number
                  </h3>
                </div>

                <p className="text-base text-gray-500 mt-2">
                  +91 {aboutUs?.[0]?.mobile}
                </p>
              </div>

              <div className="bg-white shadow-md rounded-lg p-4">
                <div className="flex items-center gap-x-2">
                  <img
                    src={icons.mailBlueIcon}
                    alt="email address"
                    className="w-5 h-5"
                  />
                  <h3 className="text-base font-semibold text-gray-900">
                    Email Address
                  </h3>
                </div>

                <p className="text-base text-gray-500 mt-2">
                  {aboutUs?.[0]?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Right form card */}
          <div className="lg:w-1/2 rounded-xl h-fit overflow-hidden shadow-lg bg-secondary px-0.5">
            <div className="h-6 md:h-10 bg-secondary rounded-t-4xl"></div>

            <div className="bg-[#dee9ff] p-2.5 sm:p-8 py-3 rounded-t-2xl">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                requiredMark={false}
              >
                {/* Full Name */}
                <Form.Item
                  label={
                    <span className="text-base font-medium text-gray-800">
                      Full Name
                    </span>
                  }
                  name="fullName"
                  className="text-start"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your full name",
                    },
                    {
                      min: 3,
                      message: "Name must be at least 3 characters",
                    },
                    {
                      max: 100,
                      message: "Name cannot exceed 100 characters",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Your Full name"
                    className={`!border-gray-200 !py-2.5 !text-sm ${
                      fullName?.trim() ? "!bg-[#eaf1fd]" : "!bg-white"
                    }`}
                  />
                </Form.Item>

                {/* Mobile Number */}
                <Form.Item
                  label={
                    <span className="text-base font-medium text-gray-800">
                      Mobile Number
                    </span>
                  }
                  name="mobileNumber"
                  className="text-start"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your mobile number",
                    },
                    {
                      pattern: /^[6-9]\d{9}$/,
                      message: "Please enter a valid 10-digit mobile number",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Your Mobile number"
                    className={`!border-gray-200 !py-2.5 !text-sm ${
                      mobileNumber?.trim() ? "!bg-[#eaf1fd]" : "!bg-white"
                    }`}
                  />
                </Form.Item>

                {/* Email */}
                <Form.Item
                  label={
                    <span className="text-base font-medium text-gray-800">
                      Email Address
                    </span>
                  }
                  name="email"
                  className="text-start"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your email address",
                    },
                    {
                      type: "email",
                      message: "Enter a valid email address",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Your email"
                    className={`!border-gray-200 !py-2.5 !text-sm ${
                      email?.trim() ? "!bg-[#eaf1fd]" : "!bg-white"
                    }`}
                  />
                </Form.Item>

                {/* Message */}
                <Form.Item
                  label={
                    <span className="text-base font-medium text-gray-800">
                      Message
                    </span>
                  }
                  name="message"
                  className="text-start"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your message",
                    },
                    {
                      max: 200,
                      message: "Message cannot exceed 200 characters",
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Enter Your thoughts here ....."
                    rows={5}
                    className={`!border-gray-200 !text-sm !resize-none ${
                      message?.trim() ? "!bg-[#eaf1fd]" : "!bg-white"
                    }`}
                  />
                </Form.Item>

                {/* Button */}
                <Form.Item className="!mb-0">
                  <Button
                    htmlType="submit"
                    loading={submitting}
                    disabled={!canSubmit}
                    className={`!text-sm !border-none !font-medium !h-11 !px-8 ${
                      canSubmit
                        ? "!bg-secondary !text-white"
                        : "!bg-gray-400 !text-white"
                    }`}
                  >
                    Send Message
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetInTouch;
