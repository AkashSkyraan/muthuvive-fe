import React, { useState } from "react";
import { Form } from "antd";
import FormNavigationButtons from "../../fornNavButtons";
import { useNavigate } from "react-router-dom";

const roomCountOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4+", label: "4+" },
];

const availabilityOptions = [
  { value: "available", label: "Available" },
  { value: "not-available", label: "Not Available" },
];

// Dynamic data - replace with API response
const amenitiesOptions = [
  { value: "borewell-tank", label: "Borewell/Tank" },
  { value: "24x7-water", label: "24x7 Water" },
  { value: "swimming-pool", label: "Swimming Pool" },
  { value: "well", label: "Well" },
  { value: "rainwater-harvesting", label: "Rainwater Harvesting" },
  { value: "electricity", label: "Electricity" },
  { value: "garden", label: "Garden" },
  { value: "security-alarm", label: "Security / Firm Alarm" },
  { value: "power-backup", label: "Power Backup" },
  { value: "club-house", label: "Club House" },
  { value: "gymnasium", label: "Gymnasium" },
  { value: "childrens-play-area", label: "Children's Play Area" },
];

// Dynamic data - replace with API response
const propertyHighlightsOptions = [
  { value: "next-to-hospital", label: "Next to Hospital" },
  { value: "next-to-school", label: "Next to School" },
  { value: "next-to-college", label: "Next to College" },
  { value: "next-to-metro", label: "Next to Metro" },
  { value: "next-to-shopping-mall", label: "Next to Shopping Mall" },
  { value: "next-to-highway", label: "Next to Highway" },
  { value: "next-to-airport", label: "Next to Airport" },
  { value: "next-to-beach-lake", label: "Next to Beach / Lake" },
  { value: "next-to-park", label: "Next to Park" },
  { value: "next-to-temple", label: "Next to Temple" },
];

const VISIBLE_COUNT = 7;

// Single-select pill group (e.g. Number of Rooms, Lift, Washroom Available)
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

// Multi-select pill group that only shows the first VISIBLE_COUNT options
// until "View More" is clicked, then reveals the rest ("View Less" to collapse).
const ExpandableMultiSelect = ({ options, value = [], onChange }) => {
  const [expanded, setExpanded] = useState(false);

  const hasMore = options.length > VISIBLE_COUNT;
  const visibleOptions = expanded ? options : options.slice(0, VISIBLE_COUNT);

  const toggleOption = (optionValue) => {
    const isSelected = value.includes(optionValue);
    const nextValue = isSelected
      ? value.filter((item) => item !== optionValue)
      : [...value, optionValue];
    onChange?.(nextValue);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {visibleOptions.map((option) => {
        const isSelected = value.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => toggleOption(option.value)}
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

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="text-sm font-medium text-secondary shrink-0 cursor-pointer"
        >
          {expanded ? "View Less" : "View More"}
        </button>
      )}
    </div>
  );
};

const sectionLabel = (text) => (
  <span className="text-base font-semibold text-gray-900">{text}</span>
);

const CommercialPropertyFeaturesForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleNext = async () => {
    // const values = await form.validateFields();

    // setCategory(values.propertyCategory);
    navigate("/sell-property/media");
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
          label={sectionLabel("Number of Rooms")}
          name="numberOfRooms"
          className="!mb-0"
        >
          <ToggleGroup options={roomCountOptions} />
        </Form.Item>

        <Form.Item label={sectionLabel("Lift")} name="lift" className="!mb-0">
          <ToggleGroup options={availabilityOptions} />
        </Form.Item>

        <Form.Item
          label={sectionLabel("Washroom Available")}
          name="washroomAvailable"
          className="!mb-0"
        >
          <ToggleGroup options={availabilityOptions} />
        </Form.Item>

        <Form.Item
          label={sectionLabel("Amenities")}
          name="amenities"
          className="!mb-0"
        >
          <ExpandableMultiSelect options={amenitiesOptions} />
        </Form.Item>

        <Form.Item
          label={sectionLabel("Property Highlights")}
          name="propertyHighlights"
          className="!mb-0"
        >
          <ExpandableMultiSelect options={propertyHighlightsOptions} />
        </Form.Item>
        <FormNavigationButtons
          // onPrevious={onPrevious}
          onNext={handleNext}
          // disableNext={isNextDisabled}
        />
      </Form>
    </div>
  );
};

export default CommercialPropertyFeaturesForm;
