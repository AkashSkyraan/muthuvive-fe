import React, { useEffect, useState } from "react";
import { Form, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import FormNavigationButtons from "../../fornNavButtons";
import { useNavigate } from "react-router-dom";
import { useSellProperty } from "../../../context/SellPropertyContext";
import {
  getPropertyCategories,
  getSubPropertyCategories,
} from "../../../api/propertyForm.api";

const selectClassName =
  "!h-12 [&_.ant-select-selector]:!rounded-full [&_.ant-select-selector]:!bg-gray-500 [&_.ant-select-selector]:!px-5 [&_.ant-select-selector]:!h-12 [&_.ant-select-selection-item]:!leading-[48px] [&_.ant-select-selection-placeholder]:!leading-[48px] [&_.ant-select-selection-item]:!text-white [&_.ant-select-selection-placeholder]:!text-white";

const PropertyCategoryForm = ({ onPrevious }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { setCategory } = useSellProperty();

  // State
  const [propertyCategories, setPropertyCategories] = useState([]);
  const [subPropertyCategories, setSubPropertyCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // Watched form values
  const propertyCategory = Form.useWatch("propertyCategory", form);
  const propertyCategoryType = Form.useWatch("propertyCategoryType", form);

  // Derived values
  const selectedCategory = propertyCategories.find(
    (category) => category.id === propertyCategory,
  );

  const isCategoryTypeEnabled = selectedCategory?.has_subcat === 1;

  // Fetch main property categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);

        const data = await getPropertyCategories();

        setPropertyCategories(data);
      } catch (error) {
        console.error("Failed to fetch property categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch subcategories when selected category requires them
  useEffect(() => {
    if (selectedCategory?.has_subcat !== 1) {
      setSubPropertyCategories([]);
      return;
    }

    const fetchSubCategories = async () => {
      try {
        setLoadingCategories(true);

        const data = await getSubPropertyCategories({
          prop_id: selectedCategory.id,
        });

        setSubPropertyCategories(data);
      } catch (error) {
        console.error("Failed to fetch subcategories:", error);
        setSubPropertyCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchSubCategories();
  }, [selectedCategory]);

  // Handle category selection
  const handleCategoryChange = (value) => {
    const selectedCategory = propertyCategories.find(
      (category) => category.id === value,
    );

    if (selectedCategory?.has_subcat !== 1) {
      form.setFieldValue("propertyCategoryType", undefined);
    }
  };

  // Handle next
  const handleNext = async () => {
    const values = await form.validateFields();

    setCategory(values.propertyCategory);

    navigate("/sell-property/location");
  };

  // Button state
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
          rules={[
            {
              required: true,
              message: "Please select a category",
            },
          ]}
        >
          <Select
            placeholder="Select your Category"
            suffixIcon={<DownOutlined className="text-gray-900!" />}
            className={`w-full bg-[#f3f3f3]!
             ${selectClassName}`}
            options={propertyCategories}
            fieldNames={{
              label: "name",
              value: "id",
            }}
            onChange={handleCategoryChange}
          />
        </Form.Item>

        {/* =====================================================
            PROPERTY CATEGORY TYPE

            Only render this Form.Item when the selected
            category has sub_cat === 1.
            ===================================================== */}

        {isCategoryTypeEnabled && (
          <Form.Item
            label={
              <span className="text-sm font-semibold text-gray-900">
                Select Property Category type
              </span>
            }
            name="propertyCategoryType"
            rules={[
              {
                required: true,
                message: "Please select a category type",
              },
            ]}
          >
            <Select
              placeholder="Select your Category"
              suffixIcon={<DownOutlined className="text-gray-400" />}
              className={`w-full bg-[#f3f3f3]! ${selectClassName}`}
              options={subPropertyCategories}
              fieldNames={{
                label: "sub_name",
                value: "id",
              }}
            />
          </Form.Item>
        )}

        {/* Reusable navigation buttons */}
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
