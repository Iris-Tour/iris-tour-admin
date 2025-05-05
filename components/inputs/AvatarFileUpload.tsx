"use client";

import { CircleUserRoundIcon, XIcon } from "lucide-react";
import { useEffect } from "react";

import {
    useFileUpload,
    FileWithPreview,
    FileMetadata,
} from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";

interface AvatarFileUploadProps {
    accept?: string;
    onFilesChange?: (files: File[]) => void;
    initialFiles?: FileMetadata[];
}

export default function AvatarFileUpload({
    onFilesChange,
    initialFiles,
    accept,
}: AvatarFileUploadProps) {
    const maxSizeMB = 10;
    const maxSize = maxSizeMB * 1024 * 1024;

    const [
        { files, isDragging, errors },
        {
            removeFile,
            openFileDialog,
            getInputProps,
            handleDragEnter,
            handleDragLeave,
            handleDragOver,
            handleDrop,
            getRealFiles,
            validateFile,
            setState,
        },
    ] = useFileUpload({
        accept: accept || "image/*",
        maxSize,
        multiple: false,
        initialFiles,
    });

    // Hydrate initial files
    useEffect(() => {
        const hydrateInitialFiles = async () => {
            if (!initialFiles || initialFiles.length === 0) return;

            const realFiles = await getRealFiles();
            const validFiles: FileWithPreview[] = [];

            realFiles.forEach((file, index) => {
                const error = validateFile(file);
                if (!error) {
                    const metadata = initialFiles[index];
                    validFiles.push({
                        file,
                        id: metadata?.id ?? `${file.name}-${Date.now()}`,
                        preview: metadata?.url ?? URL.createObjectURL(file),
                    });
                }
            });

            setState((prev) => ({
                ...prev,
                files: validFiles,
                errors: [],
            }));

            onFilesChange?.(validFiles.map((f) => f.file as File));
        };

        hydrateInitialFiles();
    }, []);

    // Handle file changes
    useEffect(() => {
        const handler = setTimeout(() => {
            onFilesChange?.(files.map((f) => f.file as File));
        }, 100);

        return () => clearTimeout(handler);
    }, [files, onFilesChange]);

    const previewUrl = files[0]?.preview || null;

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative inline-flex">
                {/* Drop area */}
                <div
                    className="border-input bg-white hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex size-25 items-center justify-center overflow-hidden rounded-full border border-dashed transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:ring-[3px]"
                    role="button"
                    onClick={openFileDialog}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    data-dragging={isDragging || undefined}
                    aria-label={previewUrl ? "Change image" : "Upload image"}
                >
                    {previewUrl ? (
                        <img
                            className="size-full object-cover"
                            src={previewUrl}
                            alt={files[0]?.file?.name || "Uploaded image"}
                            width={64}
                            height={64}
                            style={{ objectFit: "cover" }}
                        />
                    ) : (
                        <div aria-hidden="true">
                            <CircleUserRoundIcon className="size-6 opacity-60" />
                        </div>
                    )}
                </div>
                {previewUrl && (
                    <Button
                        type="button"
                        onClick={() => {
                            removeFile(files[0]?.id);
                            setState((prev) => ({
                                ...prev,
                                files: [],
                            }));
                        }}
                        size="icon"
                        className="border-background focus-visible:border-background absolute -top-1 -right-1 size-6 rounded-full border-2 shadow-none"
                        aria-label="Remove image"
                    >
                        <XIcon className="size-3.5" />
                    </Button>
                )}
                <input
                    {...getInputProps()}
                    className="sr-only"
                    aria-label="Upload image file"
                />
            </div>
            {errors.length > 0 && (
                <div
                    className="text-destructive flex items-center gap-1 text-sm"
                    role="alert"
                >
                    <span>{errors[0]}</span>
                </div>
            )}
        </div>
    );
}
