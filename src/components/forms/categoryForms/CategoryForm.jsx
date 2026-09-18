import React, { useEffect, useState } from "react";
import { Form, Select, Modal } from "antd";
import { DownOutlined } from "@ant-design/icons";
import FormNavigationButtons from "../../fornNavButtons";
import { useNavigate } from "react-router-dom";
import { useSellProperty } from "../../../context/SellPropertyContext";
import {
  getPropertyCategories,
  getSubPropertyCategories,
} from "../../../api/propertyFormDropdown.api";
// import { deleteProperty } from "../../../api/property.api";

const selectClassName =
  "!h-12 [&_.ant-select-selector]:!rounded-full [&_.ant-select-selector]:!bg-gray-500 [&_.ant-select-selector]:!px-5 [&_.ant-select-selector]:!h-12 [&_.ant-select-selection-item]:!leading-[48px] [&_.ant-select-selection-placeholder]:!leading-[48px] [&_.ant-select-selection-item]:!text-white [&_.ant-select-selection-placeholder]:!text-white";

const PropertyCategoryForm = ({ onPrevious }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const {
    category,
    setCategory,
    formData,
    updateFormData,
    propertyId,
    setPropertyId,
    resetCategoryDependentData,
  } = useSellProperty();

  // State
  const [propertyCategories, setPropertyCategories] = useState([]);
  const [subPropertyCategories, setSubPropertyCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // Watched form values
  const categoryValue = Form.useWatch("category", form);
  const subCategory = Form.useWatch("sub_category", form);

  // Derived values
  const selectedCategory = propertyCategories.find(
    (category) => category.id === categoryValue,
  );

  const isCategoryTypeEnabled = selectedCategory?.has_subcat === 1;

  // ============================================================
  // Restore previously entered values from Context
  // ============================================================

  useEffect(() => {
    const savedCategory = formData.category;

    if (!savedCategory) {
      return;
    }

    if (savedCategory.category || savedCategory.sub_category) {
      form.setFieldsValue({
        category: savedCategory.category,
        sub_category: savedCategory.sub_category,
      });
    }
  }, [formData.category, form]);

  // ============================================================
  // Fetch main property categories
  // ============================================================

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

  // ============================================================
  // Fetch subcategories when selected category requires them
  // ============================================================

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

  // ============================================================
  // Handle category selection
  // ============================================================

  const handleCategoryChange = (value) => {
    const selectedCategory = propertyCategories.find(
      (category) => category.id === value,
    );

    // Existing saved category
    const savedCategory = formData.category?.category;

    // ==========================================================
    // If propertyId does NOT exist:
    // No need to show confirmation modal.
    // ==========================================================

    if (!propertyId) {
      if (selectedCategory?.has_subcat !== 1) {
        form.setFieldValue("sub_category", undefined);

        updateFormData("category", "sub_category", undefined);
      }

      setCategory(value);

      updateFormData("category", "category", value);

      return;
    }

    // ==========================================================
    // If selected category is the same as existing category:
    // No modal required.
    // ==========================================================

    if (savedCategory === value) {
      return;
    }

    // ==========================================================
    // Existing property + category changed
    // Show confirmation modal.
    // ==========================================================

    // Put the old category back in the Form immediately.
    // This prevents the UI from changing before confirmation.
    form.setFieldValue("category", savedCategory);

    Modal.confirm({
      title: "Change Property Category ?",
      content: (
        <p className="mt-2 text-base leading-6 text-gray-500">
          Changing the property category will erase the previously entered
          property details and features. Do you want to continue?
        </p>
      ),
      centered: true,
      okText: "Yes",
      cancelText: "No",

      onOk: async () => {
        try {
          // ======================================================
          // Delete existing property
          // ======================================================

          // Replace this with your actual delete API.
          //
          // await deleteProperty({
          //   property_id: propertyId,
          // });

          // ======================================================
          // Clear category-dependent frontend data
          // ======================================================

          resetCategoryDependentData();

          // Clear old property ID
          setPropertyId(null);

          // ======================================================
          // Set newly selected category
          // ======================================================

          if (selectedCategory?.has_subcat !== 1) {
            form.setFieldValue("sub_category", undefined);

            updateFormData("category", "sub_category", undefined);
          }

          form.setFieldValue("category", value);

          setCategory(value);

          updateFormData("category", "category", value);
        } catch (error) {
          console.error("Failed to change property category:", error);

          // Restore old category if delete failed
          form.setFieldValue("category", savedCategory);
        }
      },
    });
  };

  // ============================================================
  // Handle sub category selection
  // ============================================================

  const handleCategoryTypeChange = (value) => {
    updateFormData("category", "sub_category", value);
  };

  // ============================================================
  // Handle next
  // ============================================================

  const handleNext = async () => {
    const values = await form.validateFields();

    // Keep the category state because you are using it
    // to determine which next form should be rendered.
    setCategory(values.category);

    // Save the complete Step 1 data into Context
    updateFormData("category", "category", values.category);

    updateFormData("category", "sub_category", values.sub_category);

    // No API call here.
    // Step 1 only saves data and moves to Step 2.
    navigate("/sell-property/location");
  };

  // ============================================================
  // Button state
  // ============================================================

  const isNextDisabled =
    !categoryValue || (isCategoryTypeEnabled && !subCategory);

  return (
    <div className="w-full max-w-xl">
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          label={
            <span className="text-base font-semibold text-gray-900">
              Select Category
            </span>
          }
          name="category"
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
            className={`w-full bg-[#f3f3f3]! !text-base   
             ${selectClassName}`}
            classNames={{
              popup: {
                root: "property-category-dropdown",
              },
            }}
            options={propertyCategories}
            fieldNames={{
              label: "name",
              value: "id",
            }}
            onChange={handleCategoryChange}
          />
        </Form.Item>

        {isCategoryTypeEnabled && (
          <Form.Item
            label={
              <span className="text-base font-semibold text-gray-900">
                Select Sub Category
              </span>
            }
            name="sub_category"
            rules={[
              {
                required: true,
                message: "Please select a sub category",
              },
            ]}
          >
            <Select
              placeholder="Select your Category"
              suffixIcon={<DownOutlined className="text-gray-400" />}
              className={`w-full bg-[#f3f3f3]! !text-base ${selectClassName}`}
              classNames={{
                popup: {
                  root: "property-category-dropdown",
                },
              }}
              options={subPropertyCategories}
              fieldNames={{
                label: "sub_name",
                value: "id",
              }}
              onChange={handleCategoryTypeChange}
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
