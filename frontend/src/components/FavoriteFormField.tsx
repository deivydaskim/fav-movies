import React from 'react';

interface FormFieldProps {
  label: string;
  type: 'text' | 'textarea' | 'date';
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-gray-700 headline-m">{label}</label>
      {type === 'textarea' ? (
        <textarea
          className="w-full rounded-md border-[1px] p-2 text-black body-2"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
        />
      ) : (
        <input
          className="w-full rounded-md border-[1px] p-2 text-black body-2"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
        />
      )}
    </div>
  );
};

export default FormField;
