"use client";

import { useState } from "react";
import { Select, Button, Badge } from "antd";
import { options } from "@/constants/dropDownData";

const { Option } = Select;

const DropDownSelector = ({ selectedOptions, setSelectedOptions }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [availableOptions, setAvailableOptions] = useState(options);

  const handleAddNewSchema = () => {
    if (!selectedOption) {
      return;
    }

    setSelectedOptions([...selectedOptions, selectedOption]);

    const newAvailableOptions = availableOptions.filter(
      (option) => option.value !== selectedOption.value
    );
    setAvailableOptions(newAvailableOptions);

    setSelectedOption(null);
  };

  const handleSelectChange = (option, index) => {
    const newOption = {
      value: option.key,
      label: option.label,
    };

    setSelectedOptions((prevOptions) => {
      if (index >= 0 && index < prevOptions.length) {
        const updatedOptions = [...prevOptions];
        updatedOptions[index] = newOption;
        const newvalue = options.filter(
          (option) => !updatedOptions.some((sel) => sel.value === option.value)
        );
        setAvailableOptions(newvalue);
        return updatedOptions;
      } else {
        return prevOptions.concat(newOption);
      }
    });
  };

  const userTypes = ["First Name", "Last Name", "Gender", "Age"];

  return (
    <div className="mt-10">
      <div className={selectedOptions.length ? "dynamic-select-wrapper" : ""}>
        {selectedOptions.map((option, i) => (
          <div className="flex justify-between items-center my-5">
            <Badge
              color={userTypes.includes(option.label) ? "#5ddb78" : "#d24572"}
            />
            <Select
              key={i}
              value={option}
              onChange={(value) => handleSelectChange(value, i)}
              className="w-10/12 h-10"
              labelInValue
            >
              {availableOptions.map((option) => (
                <Option key={option.value} value={option.label}>
                  {option.label}
                </Option>
              ))}
            </Select>
            <div className="bg-[#f2fbf9] p-4 flex justify-center">
              <hr className="w-4 bg-[#657a93] h-1" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between items-center my-2">
          <Badge color="#e2e4e6" />
          <Select
            placeholder="Add schema to segment"
            value={selectedOption ? selectedOption.label : undefined}
            className="w-10/12 h-10"
            onChange={(value) =>
              setSelectedOption(
                availableOptions.find((option) => option.value === value)
              )
            }
          >
            {availableOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
          <div className="bg-[#f2fbf9] p-4 flex justify-center">
            <hr className="w-4 bg-[#657a93] h-1" />
          </div>
        </div>

        <Button className="schema-btn" type="link" onClick={handleAddNewSchema}>
          + Add new schema
        </Button>
      </div>
    </div>
  );
};

export default DropDownSelector;
