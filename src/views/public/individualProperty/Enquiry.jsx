import React from "react";
import { Form, Input, Checkbox, Button } from "antd";

const EnquiryForm = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit?.(values);
  };

  return (
    <div className="w-full lg:w-[380px] lg:shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-start">
      <h2 className="text-lg font-semibold text-gray-900">Send Enquiry</h2>

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

        <Form.Item name="fullName" className="!mb-5">
          <Input
            placeholder="Full Name"
            variant="borderless"
            className="!px-0 !border-b !border-gray-200 !rounded-none !text-sm"
          />
        </Form.Item>

        <Form.Item name="mobileNumber" className="!mb-5">
          <Input
            placeholder="Mobile Number"
            variant="borderless"
            className="!px-0 !border-b !border-gray-200 !rounded-none !text-sm"
          />
        </Form.Item>

        <Form.Item name="email" className="!mb-5">
          <Input
            placeholder="E-Mail"
            variant="borderless"
            className="!px-0 !border-b !border-gray-200 !rounded-none !text-sm"
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

        <Form.Item name="agreeTerms" valuePropName="checked" className="!mb-5">
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
            className="!h-11 !rounded-lg !bg-gray-400 !border-none !text-white !font-medium hover:!bg-gray-500"
          >
            Send Enquiries
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EnquiryForm;
