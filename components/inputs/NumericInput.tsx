"use client";

import { NumericFormat, NumericFormatProps } from "react-number-format";
import { Input } from "@/components/ui/input";
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

const NumberInput = ({
    inputSuffix,
    inputPrefix,
    className,
    ...props
}: NumberInputProps) => {
    return (
        <div className="relative flex items-center">
            {inputPrefix && (
                <span className="absolute left-3 text-[clamp(14px,_2vw,_16px)] text-muted-foreground">
                    {inputPrefix}
                </span>
            )}
            <Input
                {...props}
                className={`text-[clamp(14px,_2vw,_16px)] py-6 px-5 ${
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
};

const NumberFormatInput = ({
    onValueChange,
    ...rest
}: NumberFormatInputProps) => {
    return (
        <NumericFormat
            customInput={NumberInput as ComponentType}
            onValueChange={onValueChange}
            {...rest}
        />
    );
};

const NumericInput = ({
    inputSuffix,
    inputPrefix,
    onValueChange,
    ...rest
}: NumericInputProps) => {
    return (
        <NumberFormatInput
            inputPrefix={inputPrefix}
            inputSuffix={inputSuffix}
            onValueChange={onValueChange}
            className="bg-white"
            {...rest}
        />
    );
};

export default NumericInput;
