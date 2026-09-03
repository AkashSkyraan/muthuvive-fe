import React from "react";
import { Form, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import FormNavigationButtons from "../../fornNavButtons";
import { useNavigate } from "react-router-dom";
import { useSellProperty } from "../../../context/SellPropertyContext";

const propertyCategories = [
  { value: "agriculture_land", label: "Agriculture Land" },
  { value: "commercial_land", label: "Commercial Land" },
  { value: "investment_land", label: "Investment Land" },
  {
    value: "commercial_residential",
    label: "Commercial / Residential Buildings",
  },
];

const propertyCategoryTypes = [
  { value: "commercial-building", label: "Commercial Building" },
  { value: "residential-building", label: "Residential Building" },
];

const selectClassName =
  "!h-12 [&_.ant-select-selector]:!rounded-full [&_.ant-select-selector]:!bg-gray-500 [&_.ant-select-selector]:!px-5 [&_.ant-select-selector]:!h-12 [&_.ant-select-selection-item]:!leading-[48px] [&_.ant-select-selection-placeholder]:!leading-[48px] [&_.ant-select-selection-item]:!text-white [&_.ant-select-selection-placeholder]:!text-white";

const PropertyCategoryForm = ({ onPrevious }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { setCategory } = useSellProperty();

  const propertyCategory = Form.useWatch("propertyCategory", form);

  const isCategoryTypeEnabled = propertyCategory === "commercial_residential";

  const handleCategoryChange = (value) => {
    if (value !== "commercial-residential") {
      form.setFieldValue("propertyCategoryType", undefined);
    }
  };

  const handleNext = async () => {
    const values = await form.validateFields();

    setCategory(values.propertyCategory);

    navigate("/sell-property/location");
  };
  const propertyCategoryType = Form.useWatch("propertyCategoryType", form);

  const isNextDisabled =
    !propertyCategory || (isCategoryTypeEnabled && !propertyCategoryType);

  return (
    <div className="w-full max-w-xl">
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          label={
            <span className="text-sm font-semibold text-gray-900">
              Select Property Category
            </span>
          }
          name="propertyCategory"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select
            placeholder="Select your Category"
            suffixIcon={<DownOutlined className="text-gray-900!" />}
            className={`w-full bg-[#f3f3f3]!
             ${selectClassName}`}
            options={propertyCategories}
            onChange={handleCategoryChange}
          />
        </Form.Item>

        <Form.Item
          label={
            <span
              className={`text-sm font-semibold ${
                isCategoryTypeEnabled ? "text-gray-900" : "text-gray-400"
              }`}
            >
              Select Property Category type
            </span>
          }
          name="propertyCategoryType"
          rules={
            isCategoryTypeEnabled
              ? [{ required: true, message: "Please select a category type" }]
              : []
          }
        >
          <Select
            placeholder="Select your Category"
            suffixIcon={<DownOutlined className="text-gray-400" />}
            disabled={!isCategoryTypeEnabled}
            className={`w-full bg-[#f3f3f3]! ${selectClassName}`}
            options={propertyCategoryTypes}
          />
        </Form.Item>

        {/* ✅ Reusable navigation buttons */}
        <FormNavigationButtons
          onPrevious={onPrevious}
          onNext={handleNext}
          disableNext={isNextDisabled}
        />
      </Form>
    </div>
  );
};

export default PropertyCategoryForm;
