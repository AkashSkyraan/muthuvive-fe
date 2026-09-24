import React, { useState } from "react";
import { Form, Input, Checkbox, Button } from "antd";

import { postEnquiry } from "../../../api/aboutus.api";
import { useEnquiry } from "../../../context/EnquiryContext";

import StatusMessage, {
  showStatusMessage,
} from "../../../components/common/MessagePopup";

const EnquiryForm = ({ propertyId = 0, onSubmit }) => {
  console.log(propertyId);
  const [form] = Form.useForm();

  const { formData, setFormData, resetFormData } = useEnquiry();

  const [submitting, setSubmitting] = useState(false);

  // Watch form values
  const fullName = Form.useWatch("fullName", form);
  const mobileNumber = Form.useWatch("mobileNumber", form);
  const email = Form.useWatch("email", form);
  const agreeContact = Form.useWatch("agreeContact", form);
  const agreeTerms = Form.useWatch("agreeTerms", form);

  // Check whether all required fields are filled
  const isFormFilled =
    fullName?.trim() && mobileNumber?.trim() && email?.trim();

  // Check whether both checkboxes are checked
  const areTermsAccepted = agreeContact === true && agreeTerms === true;

  // Final button state
  const isSubmitEnabled =
    Boolean(isFormFilled) && areTermsAccepted && !submitting;

  const handleFinish = async (values) => {
    const updatedFormData = {
      ...formData,
      name: values.fullName,
      mobile: values.mobileNumber,
      email: values.email,
      message: values.message,
      property_id: propertyId,
      regarding: "Property Enquiry",
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

      // Clear the context state
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

      <div className="w-full lg:shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-start">
        <h2 className="text-xl font-semibold text-gray-900">Send Enquiry</h2>

        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={handleFinish}
          className="mt-4"
        >
          <p className="text-sm font-semibold text-gray-900 mb-3">
            Please Enter Your Contact Details
          </p>

          <Form.Item
            name="fullName"
            className="!mb-5"
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
              placeholder="Full Name"
              variant="borderless"
              className="!px-0 !border-b !border-gray-200 !rounded-none !text-base"
            />
          </Form.Item>

          <Form.Item
            name="mobileNumber"
            className="!mb-5"
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
              placeholder="Mobile Number"
              variant="borderless"
              className="!px-0 !border-b !border-gray-200 !rounded-none !text-base"
            />
          </Form.Item>

          <Form.Item
            name="email"
            className="!mb-5"
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
              placeholder="E-Mail"
              variant="borderless"
              className="!px-0 !border-b !border-gray-200 !rounded-none !text-base"
            />
          </Form.Item>

          <Form.Item
            name="agreeContact"
            valuePropName="checked"
            className="!mb-3"
          >
            <Checkbox className="!items-start [&>span:last-child]:text-xs [&>span:last-child]:text-gray-600">
              I Agree To Be Contacted By Housing And Agents Via WhatsApp, SMS,
              Phone, Email Etc
            </Checkbox>
          </Form.Item>

          <Form.Item
            name="agreeTerms"
            valuePropName="checked"
            className="!mb-5"
          >
            <Checkbox className="!items-start [&>span:last-child]:text-xs [&>span:last-child]:text-gray-600">
              I Agree To The{" "}
              <a href="#" className="text-secondary underline">
                Terms Of Services
              </a>{" "}
              And{" "}
              <a href="#" className="text-secondary underline">
                Privacy Policy
              </a>
            </Checkbox>
          </Form.Item>

          <Form.Item className="!mb-0">
            <Button
              htmlType="submit"
              block
              disabled={!isSubmitEnabled}
              loading={submitting}
              className={`!h-11 !rounded-lg !border-none !text-white !text-base !font-medium ${
                isSubmitEnabled
                  ? "!bg-secondary hover:!bg-secondary"
                  : "!bg-gray-400 hover:!bg-gray-400"
              }`}
            >
              Send Enquiries
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EnquiryForm;
