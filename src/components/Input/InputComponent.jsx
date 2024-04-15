import React, { useId, forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const InputComponent = forwardRef(function InputComponent(
  { type = "text", className = "", label = "label", ...props },
  ref
) {
  const id = useId();

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} ref={ref} type={type} {...props} />
    </div>
  );
});

export default InputComponent;
