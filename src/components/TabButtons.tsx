"use client";

import React from "react";

export interface TabItem {
  key: string;
  label: string;
}

interface TabButtonsProps {
  tabs: TabItem[];
  activeKey: string;
  onSelect: (key: string) => void;
  className?: string;
  tabClassName?: string;
}

export default function TabButtons({
  tabs,
  activeKey,
  onSelect,
  className = "",
  tabClassName = "tab-buttons regist",
}: TabButtonsProps) {
  return (
    <div className={tabClassName}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          className={activeKey === tab.key ? "tab-button active" : "tab-button"}
          onClick={() => onSelect(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
