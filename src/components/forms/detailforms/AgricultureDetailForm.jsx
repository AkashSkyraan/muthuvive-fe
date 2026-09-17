import React from "react";
import { Form, Input, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import FormNavigationButtons from "../../fornNavButtons";
import { useNavigate } from "react-router-dom";

const roadPlanOptions = [
  { value: "on-road", label: "On road" },
  { value: "interior", label: "Interior" },
];

const yesNoOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const wellOptions = [
  { value: "not-available", label: "Not-Available" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3+", label: "3+" },
];

const electricityOptions = [
  { value: "not-available", label: "Not-Available" },
  { value: "individual", label: "Individual Electricity" },
  { value: "common", label: "Common Electricity" },
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

const constructionTypeOptions = [
  { value: "shed", label: "Shed" },
  { value: "commercial-building", label: "Commercial Building" },
  { value: "home", label: "Home" },
  { value: "others", label: "Others" },
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

// A value input + unit dropdown combined into one bordered box
// (e.g. "200" + "Ft"), matching the Pathway Dimension / Property Area look.
const UnitField = ({
  label,
  valueName,
  unitName,
  unitOptions,
  defaultUnit,
}) => (
  <div>
    <p className="text-base text-start font-semibold text-gray-900 mb-2">
      {label}
    </p>
    <div className="flex items-stretch rounded-xl bg-[#f3f3f3] overflow-hidden border-2 border-gray-200">
      <Form.Item name={valueName} noStyle>
        <Input
          placeholder="200"
          variant="outlined"
          className={`flex-1 ${inputClassName}`}
        />
      </Form.Item>
      <div className="w-px h-6 self-center !bg-gray-500 shrink-0" />
      <Form.Item name={unitName} noStyle initialValue={defaultUnit}>
        <Select
          variant="borderless"
          suffixIcon={<DownOutlined className="!text-gray-500 text-sm" />}
          className="!w-24 shrink-0 !h-auto small-unit-select"
          options={unitOptions}
        />
      </Form.Item>
    </div>
  </div>
);

const fieldLabel = (text) => (
  <span className="text-base font-semibold text-gray-900">{text}</span>
);

const PropertyDetailsForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const roadPlan = Form.useWatch("roadPlan", form);
  const pathwayAvailable = Form.useWatch("pathwayAvailable", form);
  const electricityAvailable = Form.useWatch("electricityAvailable", form);
  const constructionDone = Form.useWatch("constructionDone", form);
  const constructionType = Form.useWatch("constructionType", form);

  const isOnRoad = roadPlan === "on-road";
  const isInterior = roadPlan === "interior";
  const showPathwayDimension = isInterior && pathwayAvailable === "yes";
  const showHorsepower =
    electricityAvailable && electricityAvailable !== "not-available";
  const showConstructionType = constructionDone === "yes";
  const showOthersDescription = constructionType === "others";

  const handleRoadPlanChange = (value) => {
    form.setFieldsValue({
      roadPlan: value,
      pathwayAvailable: undefined,
      pathwayLengthValue: undefined,
      pathwayWidthValue: undefined,
      roadLengthValue: undefined,
    });
  };

  const handleElectricityChange = (value) => {
    form.setFieldsValue({
      electricityAvailable: value,
      horsepower:
        value === "not-available"
          ? undefined
          : form.getFieldValue("horsepower"),
    });
  };

  const handleConstructionDoneChange = (value) => {
    form.setFieldsValue({
      constructionDone: value,
      constructionType:
        value === "yes" ? form.getFieldValue("constructionType") : undefined,
      othersDescription:
        value === "yes" ? form.getFieldValue("othersDescription") : undefined,
    });
  };

  const handleConstructionTypeChange = (value) => {
    form.setFieldsValue({
      constructionType: value,
      othersDescription:
        value === "others"
          ? form.getFieldValue("othersDescription")
          : undefined,
    });
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
            className="!rounded-xl bg-[#f3f3f3]! !px-5 !py-3 !text-sm"
          />
        </Form.Item>

        <UnitField
          label="Property Area"
          valueName="propertyAreaValue"
          unitName="propertyAreaUnit"
          unitOptions={areaUnitOptions}
          defaultUnit="acres"
          className="text-start!"
          style={{
            backgroundColor: "#FFFFFF",
          }}
        />

        <Form.Item
          label={fieldLabel("Road Plan")}
          name="roadPlan"
          className="!mb-0"
        >
          <ToggleGroup
            options={roadPlanOptions}
            onChange={handleRoadPlanChange}
            className=""
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
                <p className="text-base font-semibold text-gray-900 -mb-4">
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
          label={fieldLabel("Common well Available ?")}
          name="commonWellAvailable"
          className="!mb-0"
        >
          <ToggleGroup options={wellOptions} />
        </Form.Item>

        <Form.Item
          label={fieldLabel("Individual well Available ?")}
          name="individualWellAvailable"
          className="!mb-0"
        >
          <ToggleGroup options={wellOptions} />
        </Form.Item>

        <Form.Item
          label={fieldLabel("Electricity Available ?")}
          name="electricityAvailable"
          className="!mb-0"
        >
          <ToggleGroup
            options={electricityOptions}
            onChange={handleElectricityChange}
          />
        </Form.Item>

        {showHorsepower && (
          <Form.Item
            label={
              <span className="text-sm text-gray-900">
                <span className="font-semibold">(HP)</span> Horsepower
              </span>
            }
            name="horsepower"
            className="!mb-0"
          >
            <Input
              placeholder="200"
              className="!rounded-xl !bg-gray-100 !border-gray-200 !px-5 !py-3 !text-sm"
            />
          </Form.Item>
        )}

        <Form.Item
          label={fieldLabel("Property Facing")}
          name="propertyFacing"
          className="mb-0!"
        >
          <Select
            placeholder="Select facing"
            suffixIcon={<DownOutlined className="text-black!" />}
            className="w-full py-2.5!
             [&_.ant-select-selector]:!rounded-xl 
             [&_.ant-select-selector]:!border-gray-200 
             [&_.ant-select-selector]:!px-5 
             [&_.ant-select-selector]:!h-12 
             [&_.ant-select-selection-item]:!leading-[48px] 
             [&_.ant-select-selection-placeholder]:!leading-[48px]"
            classNames={{
              popup: {
                root: "property-category-dropdown",
              },
            }}
            style={{
              backgroundColor: "#f3f3f3",
            }}
            options={facingOptions}
          />
        </Form.Item>

        <Form.Item
          label={fieldLabel("Any Construction done on this property ?")}
          name="constructionDone"
          className="mb-0!"
        >
          <ToggleGroup
            options={yesNoOptions}
            onChange={handleConstructionDoneChange}
          />
        </Form.Item>

        {showConstructionType && (
          <Form.Item
            label={fieldLabel("What type of construction has been done ?")}
            name="constructionType"
            className="!mb-0"
          >
            <ToggleGroup
              options={constructionTypeOptions}
              onChange={handleConstructionTypeChange}
            />
          </Form.Item>
        )}

        {showOthersDescription && (
          <Form.Item
            label={fieldLabel("Please describe the construction")}
            name="othersDescription"
            className="!mb-0"
          >
            <Input.TextArea
              placeholder="Describe the construction here..."
              maxLength={500}
              showCount
              rows={4}
              className="!rounded-xl !bg-[#f3f3f3] !border-gray-200 !px-5 !py-3 !text-sm"
            />
          </Form.Item>
        )}
        <FormNavigationButtons
          // onPrevious={onPrevious}
          onNext={handleNext}
          // disableNext={isNextDisabled}
        />
      </Form>
    </div>
  );
};

export default PropertyDetailsForm;
