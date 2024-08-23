import React from 'react';

interface FormFieldProps {
  label: string;
  type: 'text' | 'textarea' | 'date';
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      <label className="text-gray-700 headline-m block">{label}</label>
      {type === 'textarea' ? (
        <textarea
          className="body-2 text-black p-2 w-full border-[1px] rounded-md"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
        />
      ) : (
        <input
          className="body-2 text-black p-2 w-full border-[1px] rounded-md"
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
