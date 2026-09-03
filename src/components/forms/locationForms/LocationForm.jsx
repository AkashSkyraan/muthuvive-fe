import React from "react";
import { Form, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import FormNavigationButtons from "../../fornNavButtons";
import { useNavigate } from "react-router-dom";

// Dynamic data - replace with API response
const countries = [{ value: "india", label: "India" }];

// Dynamic data - replace with API response
const states = [
  { value: "tamil-nadu", label: "Tamil Nadu" },
  { value: "kerala", label: "Kerala" },
  { value: "karnataka", label: "Karnataka" },
  { value: "andhra-pradesh", label: "Andhra Pradesh" },
];

// Dynamic data - replace with API response
const districts = [
  { value: "coimbatore", label: "Coimbatore" },
  { value: "chennai", label: "Chennai" },
  { value: "madurai", label: "Madurai" },
  { value: "tirupur", label: "Tirupur" },
];

// Dynamic data - replace with API response
const cities = [
  { value: "peelamedu", label: "Peelamedu" },
  { value: "gandhipuram", label: "Gandhipuram" },
  { value: "saibaba-colony", label: "Saibaba Colony" },
];

const selectClassName =
  "!h-12 [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!bg-gray-100 [&_.ant-select-selector]:!border-gray-200 [&_.ant-select-selector]:!px-5 [&_.ant-select-selector]:!h-12 [&_.ant-select-selection-item]:!leading-[48px] [&_.ant-select-selection-placeholder]:!leading-[48px]";

const LocationForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const country = Form.useWatch("country", form);
  const state = Form.useWatch("state", form);
  const district = Form.useWatch("district", form);

  const isStateEnabled = Boolean(country);
  const isDistrictEnabled = Boolean(state);
  const isCityEnabled = Boolean(district);

  const handleStateChange = () => {
    // A new state invalidates whatever district/city were picked before
    form.setFieldsValue({ district: undefined, city: undefined });
  };

  const handleDistrictChange = () => {
    // A new district invalidates whatever city was picked before
    form.setFieldValue("city", undefined);
  };

  const fieldLabel = (text, enabled) => (
    <span
      className={`text-sm font-semibold ${
        enabled ? "text-gray-900" : "text-gray-400"
      }`}
    >
      {text}
    </span>
  );
  const handleNext = async () => {
    const values = await form.validateFields();

    navigate("/sell-property/details");
  };
  const handlePrevious = async () => {
    navigate("/sell-property");
  };

  return (
    <div className="w-full max-w-xl">
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        initialValues={{ country: "india" }}
      >
        <Form.Item label={fieldLabel("Country", true)} name="country">
          <Select
            placeholder="Select your Category"
            suffixIcon={<DownOutlined className="text-gray-700" />}
            className={`w-full bg-[#f3f3f3]! ${selectClassName}`}
            options={countries}
          />
        </Form.Item>

        <Form.Item
          label={fieldLabel("State", isStateEnabled)}
          name="state"
          rules={[{ required: true, message: "Please select a state" }]}
        >
          <Select
            placeholder="Select your State"
            suffixIcon={
              <DownOutlined
                className={isStateEnabled ? "text-gray-700" : "text-gray-400"}
              />
            }
            disabled={!isStateEnabled}
            className={`w-full bg-[#f3f3f3]! ${selectClassName}`}
            options={states}
            onChange={handleStateChange}
          />
        </Form.Item>

        <Form.Item
          label={fieldLabel("District", isDistrictEnabled)}
          name="district"
          rules={[{ required: true, message: "Please select a district" }]}
        >
          <Select
            placeholder="Select your District"
            suffixIcon={
              <DownOutlined
                className={
                  isDistrictEnabled ? "text-gray-700" : "text-gray-400"
                }
              />
            }
            disabled={!isDistrictEnabled}
            className={`w-full bg-[#f3f3f3]! ${selectClassName}`}
            options={districts}
            onChange={handleDistrictChange}
          />
        </Form.Item>

        <Form.Item
          label={fieldLabel("City", isCityEnabled)}
          name="city"
          rules={[{ required: true, message: "Please select a city" }]}
        >
          <Select
            placeholder="Select your City"
            suffixIcon={
              <DownOutlined
                className={isCityEnabled ? "text-gray-700" : "text-gray-400"}
              />
            }
            disabled={!isCityEnabled}
            className={`w-full bg-[#f3f3f3]! ${selectClassName}`}
            options={cities}
          />
        </Form.Item>
        <FormNavigationButtons
          onPrevious={handlePrevious}
          onNext={handleNext}
          disableNext={!form.isFieldsTouched(true)}
        />
      </Form>
    </div>
  );
};

export default LocationForm;
