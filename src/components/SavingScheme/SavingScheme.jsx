"use client";

import { Badge, Input } from "antd";
import "./savingScheme.css";
import DropdownSelector from "../DropDownSelector/DropDownSelector";

function SavingScheme({ setSegment, selectedOptions, setSelectedOptions }) {
  const CustomTraits = ({ type = "group" }) => {
    return (
      <div className="flex items-center ml-3">
        <Badge color={type === "user" ? "#5ddb78" : "#d24572"} />
        <span className="ml-1">
          {" "}
          {`- ${type === "user" ? "User" : "Group"} Traits`}
        </span>
      </div>
    );
  };

  const contentClass = "my-5";
  return (
    <div>
      <div>
        <p className={contentClass}>Enter the Name of the Segment</p>
        <Input
          className="segment-input"
          onChange={(e) => setSegment(e.target.value)}
          placeholder="Name of the segment"
        />
        <p className={contentClass}>
          To save your segment, you need to add the schemas to build the query
        </p>
      </div>

      <div className="flex justify-end my-4">
        {" "}
        <CustomTraits type="user" /> <CustomTraits />{" "}
      </div>
      <div>
        <DropdownSelector
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      </div>
    </div>
  );
}

export default SavingScheme;
