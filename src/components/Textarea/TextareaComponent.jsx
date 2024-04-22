import React, { useId, forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";

const TextareaComponent = forwardRef(function TextareaComponent(
  { className = "", label, ...props },
  ref
) {
  const id = useId();

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Textarea className="resize-none h-80" id={id} ref={ref} {...props} />
    </div>
  );
});

export default TextareaComponent;
