"use client";

import { NumericFormat, NumericFormatProps } from "react-number-format";
import { Input } from "@/components/ui/input";
import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode, ComponentType } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

interface InputAffix {
    inputSuffix?: string | ReactNode;
    inputPrefix?: string | ReactNode;
}

interface NumberInputProps
    extends Omit<InputProps, "prefix" | "suffix">,
        InputAffix {}

type NumberFormatInputProps = Omit<NumericFormatProps, "form"> & InputAffix;

type NumericInputProps = NumberInputProps & NumberFormatInputProps;

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
    ({ inputSuffix, inputPrefix, className, ...props }, ref) => {
        return (
            <div className="relative flex items-center w-full">
                {inputPrefix && (
                    <span className="absolute left-3 text-[clamp(14px,_2vw,_16px)] text-muted-foreground">
                        {inputPrefix}
                    </span>
                )}
                <Input
                    ref={ref}
                    {...props}
                    className={`text-[clamp(14px,_2vw,_16px)] bg-white py-6 px-5 ${
                        inputPrefix && "pl-14 pr-5"
                    } ${inputSuffix && "pl-5 pr-14"} ${
                        inputPrefix && inputSuffix && "px-14"
                    } ${className}`}
                />
                {inputSuffix && (
                    <span className="absolute right-3 text-[clamp(14px,_2vw,_16px)] text-muted-foreground">
                        {inputSuffix}
                    </span>
                )}
            </div>
        );
    }
);

NumberInput.displayName = "NumberInput";

const NumberFormatInput = forwardRef<HTMLInputElement, NumberFormatInputProps>(
    ({ onValueChange, ...rest }, ref) => {
        return (
            <NumericFormat
                customInput={NumberInput as ComponentType}
                onValueChange={onValueChange}
                getInputRef={ref}
                {...rest}
            />
        );
    }
);

NumberFormatInput.displayName = "NumberFormatInput";

const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
    ({ inputSuffix, inputPrefix, onValueChange, ...rest }, ref) => {
        return (
            <NumberFormatInput
                inputPrefix={inputPrefix}
                inputSuffix={inputSuffix}
                onValueChange={onValueChange}
                ref={ref}
                {...rest}
            />
        );
    }
);

NumericInput.displayName = "NumericInput";

export default NumericInput;
