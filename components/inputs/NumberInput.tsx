"use client";

import { NumericFormat, NumericFormatProps } from "react-number-format";
import { Input } from "@/components/ui/input";
import type { InputProps } from "@/components/ui/input";
import type { ReactNode, ComponentType } from "react";

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
                <span className="absolute left-3 text-sm text-muted-foreground">
                    {inputPrefix}
                </span>
            )}
            <Input
                {...props}
                className={`pl-${inputPrefix ? "7" : "3"} pr-${
                    inputSuffix ? "7" : "3"
                } ${className}`}
            />
            {inputSuffix && (
                <span className="absolute right-3 text-sm text-muted-foreground">
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
            {...rest}
        />
    );
};

export default NumericInput;
