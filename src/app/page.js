"use client";

import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import SavingScheme from "@/components/SavingScheme/SavingScheme";
import "./globals.css";

export default function Home() {
  const [messageApi, contextHolder] = notification.useNotification();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [segment, setSegment] = useState("");
  const drawerStyles = {
    header: {
      background: "#39aebc",
      borderBottom: "1px solid #ccc",
    },
  };

  const sendSchemeData = async () => {
    const payload = {
      segment_name: segment,
      schema: selectedOptions.map((item) => {
        return {
          [item.value]: item.label,
        };
      }),
    };
    try {
      const response = await fetch("/api/save-segment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payload }),
      });
      const data = await response.json();
      setSelectedOptions([]);
      setSegment("");
      setOpen(false);
      messageApi.success({
        message: data?.msg,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const saveSegment = () => {
    if (segment && selectedOptions.length) {
      sendSchemeData();
    } else {
      messageApi.warning({
        message: `Please add a name & schema for this segment!`,
      });
    }
  };

  const Footer = () => {
    return (
      <div className="h-16 flex items-center bg-[#f6f6f6]">
        <button
          type="button"
          className="mx-5 save-btn btn"
          onClick={saveSegment}
        >
          Save the Segment
        </button>
        <button
          type="button"
          className="cancel-btn btn"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
      </div>
    );
  };

  const Title = () => {
    return (
      <div className=" h-12 flex items-center">
        <h2 className="text-white font-semibold text-2xl"> Saving Segment</h2>
      </div>
    );
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {contextHolder}
      <Button onClick={() => setOpen(true)}>Save Segment</Button>
      <Drawer
        styles={drawerStyles}
        title={<Title />}
        width={500}
        closeIcon={<LeftOutlined style={{ color: "#fff", marginTop: "5px" }} />}
        onClose={() => setOpen(false)}
        open={open}
        footer={<Footer />}
      >
        <SavingScheme
          setSegment={setSegment}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      </Drawer>
    </div>
  );
}
