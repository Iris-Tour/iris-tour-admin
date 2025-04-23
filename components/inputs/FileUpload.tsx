"use client";

import React, { useState, useRef, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import Input1 from "@/components/inputs/Input1";

interface FileUploadProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
    accept?: string;
    multiple?: boolean;
    onFilesChange?: (files: File[]) => void;
    validate?: (files: File[]) => string | null;
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
    (
        {
            accept = ".jpg,.jpeg,.png",
            multiple = true,
            onFilesChange,
            validate,
            ...props
        },
        ref
    ) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const [files, setFiles] = useState<File[]>([]);
        const [error, setError] = useState<string | null>(null);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const selected = Array.from(e.target.files || []);
            if (validate) {
                const validationError = validate(selected);
                if (validationError) {
                    setError(validationError);
                    setFiles([]);
                    onFilesChange?.([]);
                    return;
                }
            }
            setFiles(selected);
            setError(null);
            onFilesChange?.(selected);
        };

        const clearFiles = () => {
            setFiles([]);
            setError(null);
            onFilesChange?.([]);

            const fileInput =
                inputRef.current ||
                (ref as React.RefObject<HTMLInputElement>)?.current;
            if (fileInput) {
                fileInput.value = "";
            }
        };

        return (
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <Input1
                        ref={(node) => {
                            if (typeof ref === "function") {
                                ref(node);
                            } else if (ref) {
                                (
                                    ref as React.MutableRefObject<HTMLInputElement | null>
                                ).current = node;
                            }
                            inputRef.current = node;
                        }}
                        id="file-upload"
                        type="file"
                        accept={accept}
                        multiple={multiple}
                        onChange={handleChange}
                        className="px-5 py-1 cursor-pointer"
                        {...props} // value is intentionally excluded via Omit<>
                    />
                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <Button
                        variant="outline"
                        type="button"
                        onClick={clearFiles}
                        disabled={files.length === 0}
                    >
                        Vider
                    </Button>
                </div>
                {files.length > 0 && (
                    <div className="space-y-1 text-sm text-foreground">
                        <p className="font-medium">Fichiers sélectionnés :</p>
                        <ul className="list-disc list-inside">
                            {files.map((file, idx) => (
                                <li key={idx}>{file.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    }
);

FileUpload.displayName = "FileUpload";

export default FileUpload;
