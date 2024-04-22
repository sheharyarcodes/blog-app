import React, { useId, forwardRef } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const SelectComponent = React.forwardRef(function SelectComponent(
  { options, label, className, placeholder = "Select an option", ...props },
  ref
) {
  const id = useId();
  // ref={ref}

  return (
    <div>
      {label && <Label htmlFor={id}>{label}:</Label>}

      <Select id={id} {...props}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent ref={ref}>
          <SelectGroup>
            {label && <SelectLabel>{label}</SelectLabel>}
            {options?.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
});

export default SelectComponent;
