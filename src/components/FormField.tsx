"use client";

import React from "react";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  autoComplete?: string;
  name?: string;
  maxLength?: number;
  as?: "input" | "select" | "textarea";
  children?: React.ReactNode;
  rightElement?: React.ReactNode;
  className?: string;
}

export default function FormField({
  id,
  label,
  required,
  type = "text",
  placeholder,
  value,
  onChange,
  autoComplete,
  name,
  maxLength,
  as = "input",
  children,
  rightElement,
  className = "",
}: FormFieldProps) {
  const labelContent = (
    <>
      {label}
      {required && <sup>*</sup>}
    </>
  );

  const wrapperClass = rightElement ? "form-group password-wrapper" : "form-group";
  const groupClass = className ? `${wrapperClass} ${className}` : wrapperClass;

  return (
    <div className={groupClass}>
      <label htmlFor={id}>{labelContent}</label>
      {as === "select" ? (
        <select
          id={id}
          name={name ?? id}
          className="form-control custom-dropdown"
          value={value}
          onChange={onChange as (e: React.ChangeEvent<HTMLSelectElement>) => void}
        >
          {children}
        </select>
      ) : as === "textarea" ? (
        <textarea
          id={id}
          name={name ?? id}
          placeholder={placeholder}
          value={value}
          onChange={onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
          autoComplete={autoComplete}
          className="form-control"
        />
      ) : (
        <>
          <input
            id={id}
            name={name ?? id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
            autoComplete={autoComplete}
            maxLength={maxLength}
            className="form-control"
          />
          {rightElement}
        </>
      )}
    </div>
  );
}
