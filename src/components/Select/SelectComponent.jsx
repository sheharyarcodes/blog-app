import React, { useId, forwardRef } from "react";
import { Label } from "@/components/ui/label";

const SelectComponent = (
  { options, label, className, placeholder = "Select an option", ...props },
  ref
) => {
  const id = useId();

  return (
    <div>
      {label && <Label htmlFor={id}>{label}:</Label>}

      <select
        className="block border-2 cursor-pointer border-gray-300 px-4 py-2 rounded w-full"
        {...props}
        id={id}
        ref={ref}
      >
        {options?.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default forwardRef(SelectComponent);
