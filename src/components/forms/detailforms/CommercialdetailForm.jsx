import React, { useState } from "react";
import { Form, Input, Select, Button } from "antd";
import {
  DownOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import FormNavigationButtons from "../../fornNavButtons";

const roadPlanOptions = [
  { value: "on-road", label: "On road" },
  { value: "interior", label: "Interior" },
];

const yesNoOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const facingOptions = [
  { value: "north", label: "North" },
  { value: "south", label: "South" },
  { value: "east", label: "East" },
  { value: "west", label: "West" },
  { value: "north-east", label: "North East" },
  { value: "north-west", label: "North West" },
  { value: "south-east", label: "South East" },
  { value: "south-west", label: "South West" },
];

const availabilityStatusOptions = [
  { value: "ready-to-move", label: "Ready to move" },
  { value: "under-construction", label: "Under Construction" },
];

const areaUnitOptions = [
  { value: "acres", label: "Acres" },
  { value: "cents", label: "Cents" },
  { value: "sqft", label: "Sqft" },
];

const lengthUnitOptions = [
  { value: "ft", label: "Ft" },
  { value: "m", label: "M" },
];

// A single-select group of pill buttons - controlled via value/onChange so
// it plugs directly into antd Form.Item like any other form control.
const ToggleGroup = ({ options, value, onChange }) => (
  <div className="flex flex-wrap gap-3">
    {options.map((option) => {
      const isSelected = value === option.value;
      return (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange?.(option.value)}
          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
            isSelected
              ? "bg-blue-50 border-secondary text-secondary"
              : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
          }`}
        >
          {option.label}
        </button>
      );
    })}
  </div>
);

const inputClassName =
  "!bg-transparent !border-none !shadow-none !px-5 !py-3 !text-sm";

const selectSelectorClassName =
  "[&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!bg-gray-100 [&_.ant-select-selector]:!border-gray-200 [&_.ant-select-selector]:!px-5 [&_.ant-select-selector]:!h-12 [&_.ant-select-selection-item]:!leading-[48px] [&_.ant-select-selection-placeholder]:!leading-[48px]";

// A value input + unit dropdown combined into one bordered box (e.g. "200" + "Acres")
const UnitField = ({
  label,
  valueName,
  unitName,
  unitOptions,
  defaultUnit,
  onRemove,
}) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm font-semibold text-gray-900">{label}</p>
      {onRemove && (
        <button type="button" onClick={onRemove}>
          <MinusCircleOutlined className="text-gray-400 hover:text-red-500 transition-colors" />
        </button>
      )}
    </div>
    <div className="flex items-center rounded-xl bg-[#f3f3f3] overflow-hidden">
      <Form.Item name={valueName} noStyle>
        <Input
          placeholder="200"
          variant="borderless"
          className={`flex-1 ${inputClassName}`}
        />
      </Form.Item>
      <div className="w-px h-6 bg-gray-300 shrink-0" />
      <Form.Item name={unitName} noStyle initialValue={defaultUnit}>
        <Select
          variant="borderless"
          suffixIcon={<DownOutlined className="text-gray-500 text-xs" />}
          className="!w-24 shrink-0"
          options={unitOptions}
        />
      </Form.Item>
    </div>
  </div>
);

const fieldLabel = (text) => (
  <span className="text-sm font-semibold text-gray-900">{text}</span>
);

const CommercialPropertyDetailsForm = ({ onPrevious, onNext }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [hasBuildUpArea, setHasBuildUpArea] = useState(true);
  const [hasSuperBuildUpArea, setHasSuperBuildUpArea] = useState(true);

  const roadPlan = Form.useWatch("roadPlan", form);
  const pathwayAvailable = Form.useWatch("pathwayAvailable", form);
  const totalFloor = Form.useWatch("totalFloor", form);

  const isOnRoad = roadPlan === "on-road";
  const isInterior = roadPlan === "interior";
  const showPathwayDimension = isInterior && pathwayAvailable === "yes";

  const floorOptions = totalFloor
    ? Array.from({ length: Number(totalFloor) || 0 }, (_, index) => ({
        value: String(index + 1),
        label: String(index + 1),
      }))
    : [];

  const handleRoadPlanChange = (value) => {
    form.setFieldsValue({
      roadPlan: value,
      pathwayAvailable: undefined,
      pathwayLengthValue: undefined,
      pathwayWidthValue: undefined,
      roadLengthValue: undefined,
    });
  };

  const handleRemoveBuildUpArea = () => {
    setHasBuildUpArea(false);
    form.setFieldsValue({ buildUpAreaValue: undefined });
  };

  const handleRemoveSuperBuildUpArea = () => {
    setHasSuperBuildUpArea(false);
    form.setFieldsValue({ superBuildUpAreaValue: undefined });
  };

  const handleNext = async () => {
    // const values = await form.validateFields();

    // setCategory(values.propertyCategory);
    navigate("/sell-property/features");
  };

  return (
    <div className="w-full max-w-2xl">
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        className="flex flex-col gap-6"
      >
        <Form.Item
          label={fieldLabel("Property Name")}
          name="propertyName"
          className="!mb-0"
        >
          <Input
            placeholder="Muthvive's Agriculture Land for sale"
            className="!rounded-xl !bg-[#f3f3f3] !border-gray-200 !px-5 !py-3 !text-sm"
          />
        </Form.Item>

        <UnitField
          label="Carpet Area"
          valueName="carpetAreaValue"
          unitName="carpetAreaUnit"
          unitOptions={areaUnitOptions}
          defaultUnit="acres"
        />

        {hasBuildUpArea && (
          <UnitField
            label="Build-Up Area"
            valueName="buildUpAreaValue"
            unitName="buildUpAreaUnit"
            unitOptions={areaUnitOptions}
            defaultUnit="acres"
            onRemove={handleRemoveBuildUpArea}
          />
        )}
        {!hasBuildUpArea && (
          <button
            type="button"
            onClick={() => setHasBuildUpArea(true)}
            className="flex items-center gap-x-1 text-sm text-secondary font-medium self-start"
          >
            <PlusOutlined /> Add Build-Up Area
          </button>
        )}

        {hasSuperBuildUpArea && (
          <UnitField
            label="Super Build-Up Area"
            valueName="superBuildUpAreaValue"
            unitName="superBuildUpAreaUnit"
            unitOptions={areaUnitOptions}
            defaultUnit="acres"
            onRemove={handleRemoveSuperBuildUpArea}
          />
        )}
        {!hasSuperBuildUpArea && (
          <button
            type="button"
            onClick={() => setHasSuperBuildUpArea(true)}
            className="flex items-center gap-x-1 text-sm text-secondary font-medium self-start"
          >
            <PlusOutlined /> Add Super Build-Up Area
          </button>
        )}

        <div>
          <p className="text-sm text-start font-semibold text-gray-900 mb-3">
            Floor Plan
          </p>

          <div className="flex flex-col gap-4">
            <Form.Item
              label={
                <span className="text-sm  font-semibold text-gray-700">
                  Total Floor
                </span>
              }
              name="totalFloor"
              className="!mb-0"
            >
              <Input
                placeholder="20"
                className="!rounded-xl !bg-gray-100 !border-gray-200 !px-5 !py-3 !text-sm"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-sm font-semibold text-gray-700">
                  Your Floor (Optional)
                </span>
              }
              name="yourFloor"
              className="!mb-0"
            >
              <Select
                placeholder="Select your floor"
                suffixIcon={<DownOutlined className="text-gray-700" />}
                className={`w-full ${selectSelectorClassName}`}
                classNames={{
                  popup: {
                    root: "property-category-dropdown",
                  },
                }}
                options={floorOptions}
                notFoundContent="Enter total floors first"
              />
            </Form.Item>
          </div>
        </div>

        <Form.Item
          label={fieldLabel("Road Plan")}
          name="roadPlan"
          className="!mb-0"
        >
          <ToggleGroup
            options={roadPlanOptions}
            onChange={handleRoadPlanChange}
          />
        </Form.Item>

        {isOnRoad && (
          <UnitField
            label="Road Length"
            valueName="roadLengthValue"
            unitName="roadLengthUnit"
            unitOptions={lengthUnitOptions}
            defaultUnit="ft"
          />
        )}

        {isInterior && (
          <>
            <Form.Item
              label={fieldLabel("Pathway Available")}
              name="pathwayAvailable"
              className="!mb-0"
            >
              <ToggleGroup options={yesNoOptions} />
            </Form.Item>

            {showPathwayDimension && (
              <>
                <p className="text-sm font-semibold text-gray-900 -mb-4">
                  Pathway Dimension
                </p>
                <UnitField
                  label="Length"
                  valueName="pathwayLengthValue"
                  unitName="pathwayLengthUnit"
                  unitOptions={lengthUnitOptions}
                  defaultUnit="ft"
                />
                <UnitField
                  label="Width"
                  valueName="pathwayWidthValue"
                  unitName="pathwayWidthUnit"
                  unitOptions={lengthUnitOptions}
                  defaultUnit="ft"
                />
              </>
            )}
          </>
        )}

        <Form.Item
          label={fieldLabel("Property Facing")}
          name="propertyFacing"
          className="!mb-0"
        >
          <Select
            placeholder="Select facing"
            suffixIcon={<DownOutlined className="text-gray-700" />}
            className={`w-full py-2.5! bg-[#f3f3f3]! ${selectSelectorClassName}`}
            classNames={{
              popup: {
                root: "property-category-dropdown",
              },
            }}
            options={facingOptions}
          />
        </Form.Item>

        <Form.Item
          label={fieldLabel("Availability Status ?")}
          name="availabilityStatus"
          className="!mb-0"
        >
          <ToggleGroup options={availabilityStatusOptions} />
        </Form.Item>

        <FormNavigationButtons
          // onPrevious={onPrevious}
          onNext={handleNext}
          // disableNext={isNextDisabled}
        />
      </Form>

      {/* Previous / Next navigation */}
      {/* <div className="grid grid-cols-2 sm:flex sm:justify-end gap-3 mt-8">
        <Button
          onClick={onPrevious}
          className="!rounded-lg !h-11 !font-medium !border-gray-300 !text-gray-700"
        >
          Previous
        </Button>
        <Button
          type="primary"
          onClick={onNext}
          className="!rounded-lg !h-11 !font-medium !bg-secondary !border-none"
        >
          Next
        </Button>
      </div> */}
    </div>
  );
};

export default CommercialPropertyDetailsForm;
