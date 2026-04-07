// src/components/Reusable/ReusableForm.tsx
import { useFormik } from "formik";
import { useState, ReactNode, ReactElement } from "react";
import * as Yup from "yup";
import Colors from "./Colors";

// Types
export interface FieldOption {
  value: string;
  label: string;
}

export interface Field {
  name: string;
  type: "text" | "email" | "password" | "select" | "radio" | "checkbox" | "file";
  label: string;
  placeholder?: string;
  icon?: ReactElement;
  onIconClick?: () => void;
  options?: FieldOption[];
  accept?: string;
}

export interface ReusableFormProps {
  id: string;
  fields: Field[];
  onSubmit: (values: any, formikHelpers: any) => void;
  initialValues: Record<string, any>;
  validationSchema: Yup.ObjectSchema<any>;
  render?: (formik: ReturnType<typeof useFormik>) => ReactNode;
}

interface PreviewData {
  url: string;
  type: string;
}

interface PreviewsState {
  [key: string]: PreviewData;
}

interface FilesState {
  [key: string]: File;
}

const ReusableForm: React.FC<ReusableFormProps> = ({
  id,
  fields,
  onSubmit,
  initialValues,
  validationSchema,
  render
}) => {
  const [previews, setPreviews] = useState<PreviewsState>({});
  const [files, setFiles] = useState<FilesState>({});

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, formikHelpers) => {
      const hasFileField = fields.some((field) => field.type === "file");
      const finalValues = hasFileField ? { ...values, ...files } : values;
      onSubmit(finalValues, formikHelpers);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFiles((prev) => ({ ...prev, [fieldName]: file }));
    const url = URL.createObjectURL(file);
    setPreviews((prev) => ({ ...prev, [fieldName]: { url, type: file.type } }));
    formik.setFieldValue(fieldName, file.name);
  };

  const handleCheckboxChange = (fieldName: string, optionValue: string) => {
    const currentValues = formik.values[fieldName] || [];
    if (currentValues.includes(optionValue)) {
      formik.setFieldValue(
        fieldName,
        currentValues.filter((v: string) => v !== optionValue)
      );
    } else {
      formik.setFieldValue(fieldName, [...currentValues, optionValue]);
    }
  };

  const handleRadioChange = (fieldName: string, optionValue: string) => {
    formik.setFieldValue(fieldName, optionValue);
  };

  const getFieldError = (fieldName: string): string | undefined => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return formik.errors[fieldName] as string;
    }
    return undefined;
  };

  const inputStyles = {
    backgroundColor: Colors.lightGray,
    color: Colors.gray,
    borderColor: Colors.mediumGray,
  };

  const labelStyles = {
    color: Colors.smokyGray,
  };

  const errorStyles = {
    color: Colors.error,
  };

  return (
    <form id={id} onSubmit={formik.handleSubmit} className="space-y-4 w-full">
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label
            htmlFor={field.name}
            className="font-normal font-[sans-serif] text-base mb-1"
            style={labelStyles}
          >
            {field.label}
          </label>

          {/* Text, Email, Password Inputs */}
          {["text", "email", "password"].includes(field.type) && (
            <div className="relative flex items-center">
              <input
                id={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                {...formik.getFieldProps(field.name)}
                className="border p-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-deepTeal/50 transition-all"
                style={inputStyles}
              />
              {field.icon && (
                <button
                  type="button"
                  className="absolute right-3 cursor-pointer hover:opacity-70 transition"
                  onClick={field.onIconClick}
                  style={{ color: Colors.mediumGray }}
                >
                  {field.icon}
                </button>
              )}
            </div>
          )}

          {/* File Upload Input */}
          {field.type === "file" && (
            <div className="relative flex flex-col">
              <input
                id={field.name}
                type="file"
                accept={field.accept || "image/*,application/pdf"}
                onChange={(e) => handleFileChange(e, field.name)}
                className="border p-2 rounded-xl w-full cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-deepTeal file:text-white hover:file:bg-deepTeal/80 transition"
                style={inputStyles}
              />
              {previews[field.name] && (
                <div className="mt-3">
                  <p className="text-sm mb-1" style={{ color: Colors.smokyGray }}>
                    Preview
                  </p>
                  {previews[field.name].type === "application/pdf" ? (
                    <iframe
                      src={previews[field.name].url}
                      className="w-full h-64 border rounded-xl"
                      title="PDF Preview"
                    />
                  ) : (
                    <img
                      src={previews[field.name].url}
                      alt="Preview"
                      className="max-h-60 rounded-xl shadow object-cover"
                    />
                  )}
                </div>
              )}
            </div>
          )}

          {/* Dropdown (Select) */}
          {field.type === "select" && field.options && (
            <select
              id={field.name}
              {...formik.getFieldProps(field.name)}
              className="border p-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-deepTeal/50 transition-all cursor-pointer"
              style={inputStyles}
            >
              <option value="">Select {field.label}</option>
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}

          {/* Radio Buttons */}
          {field.type === "radio" && field.options && (
            <div className="flex flex-wrap gap-4">
              {field.options.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-2 cursor-pointer hover:opacity-70 transition"
                >
                  <input
                    type="radio"
                    name={field.name}
                    value={option.value}
                    checked={formik.values[field.name] === option.value}
                    onChange={() => handleRadioChange(field.name, option.value)}
                    className="w-4 h-4 accent-deepTeal"
                  />
                  <span className="text-sm" style={{ color: Colors.smokyGray }}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          )}

          {/* Checkboxes */}
          {field.type === "checkbox" && field.options && (
            <div className="flex flex-col gap-2">
              {field.options.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-2 cursor-pointer hover:opacity-70 transition"
                >
                  <input
                    type="checkbox"
                    name={field.name}
                    value={option.value}
                    checked={formik.values[field.name]?.includes(option.value) || false}
                    onChange={() => handleCheckboxChange(field.name, option.value)}
                    className="w-4 h-4 rounded accent-deepTeal"
                  />
                  <span className="text-sm" style={{ color: Colors.smokyGray }}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          )}

          {/* Form Validation Error Messages */}
          {getFieldError(field.name) && (
            <span className="text-red-500 text-sm mt-1 animate-fadeIn" style={errorStyles}>
              {getFieldError(field.name)}
            </span>
          )}
        </div>
      ))}

      {/* Render buttons or custom elements inside Formik */}
      {render && render(formik)}
    </form>
  );
};

export default ReusableForm;