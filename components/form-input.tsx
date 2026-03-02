"use client";

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  type?: string;
  icon: LucideIcon;
  rightElement?: React.ReactNode;
  className?: string;
}

export function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  icon: Icon,
  rightElement,
  className,
}: FormInputProps<T>) {
  return (
    <div className="space-y-1">
      <Label className="text-[#c9a84c] tracking-widest uppercase text-[10px]">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <div className="relative">
              <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a8272]" />
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                className={`border-[#2a2520]  text-primary bg-[#121212] pl-10 pr-10 focus:border-[#c9a84c] ${
                  error ? "border-red-500 focus:border-red-500" : ""
                } ${className}`}
              />
              {rightElement && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {rightElement}
                </div>
              )}
            </div>
            {error && (
              <p className="text-[10px] text-red-500 mt-1">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
}
