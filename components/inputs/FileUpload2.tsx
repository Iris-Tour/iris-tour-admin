"use client";

import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";

import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import { FC, useEffect } from "react";
import Image from "next/image";

interface FileUploadProps {
    accept?: string;
    multiple?: boolean;
    onFilesChange?: (files: File[]) => void;
}

const FileUpload2: FC<FileUploadProps> = ({
    accept,
    multiple,
    onFilesChange,
}) => {
    const maxSizeMB = 10;
    const maxSize = maxSizeMB * 1024 * 1024; // 5MB default
    const maxFiles = 6;

    const [
        { files, isDragging, errors },
        {
            handleDragEnter,
            handleDragLeave,
            handleDragOver,
            handleDrop,
            handleFileChange,
            openFileDialog,
            removeFile,
            getInputProps,
        },
    ] = useFileUpload({
        accept:
            accept ?? "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
        maxSize,
        multiple: multiple ?? true,
        maxFiles,
    });

    // ✅ Notify parent component when files change
    useEffect(() => {
        const handler = setTimeout(() => {
            if (onFilesChange) {
                onFilesChange(files.map((f) => f.file as File));
            }
        }, 100); // Delay 100ms

        return () => clearTimeout(handler);
    }, [files, onFilesChange]);

    return (
        <div className="flex flex-col gap-2">
            {/* Drop area */}
            <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                data-dragging={isDragging || undefined}
                data-files={files.length > 0 || undefined}
                className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center bg-white overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
            >
                <input
                    {...getInputProps()}
                    className="sr-only"
                    aria-label="Upload image file"
                />
                {files.length > 0 ? (
                    <div className="flex w-full flex-col gap-3">
                        <div className="flex items-center justify-between gap-2">
                            <h3 className="truncate text-sm font-medium">
                                Fichiers téléversés ({files.length})
                            </h3>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={openFileDialog}
                                className="cursor-pointer"
                                disabled={files.length >= maxFiles}
                            >
                                <UploadIcon
                                    className="-ms-0.5 size-3.5 opacity-60"
                                    aria-hidden="true"
                                />
                                Ajouter plus
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                            {files.map((file) => (
                                <div
                                    key={file.id}
                                    className="bg-accent relative aspect-square rounded-md"
                                >
                                    <Image
                                        src={file.preview}
                                        alt={file.file.name}
                                        className="size-full rounded-[inherit] object-cover"
                                        fill
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => removeFile(file.id)}
                                        size="icon"
                                        className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
                                        aria-label="Remove image"
                                    >
                                        <XIcon className="size-3.5" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                        <div
                            className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                            aria-hidden="true"
                        >
                            <ImageIcon className="size-4 opacity-60" />
                        </div>
                        <p className="mb-1.5 text-sm font-medium">
                            Déposez vos images ici
                        </p>
                        <p className="text-muted-foreground text-xs">
                            PNG, JPG ou JPEG (max. {maxSizeMB}MB)
                        </p>
                        <Button
                            type="button"
                            variant="outline"
                            className="mt-4 cursor-pointer"
                            onClick={openFileDialog}
                        >
                            <UploadIcon
                                className="-ms-1 opacity-60"
                                aria-hidden="true"
                            />
                            Sélectionnez des images
                        </Button>
                    </div>
                )}
            </div>

            {errors.length > 0 && (
                <div
                    className="text-destructive flex items-center gap-1 text-sm"
                    role="alert"
                >
                    <AlertCircleIcon className="size-3 shrink-0" />
                    <span>{errors[0]}</span>
                </div>
            )}

            {/* <p
                aria-live="polite"
                role="region"
                className="text-muted-foreground mt-2 text-center text-xs"
            >
                Multiple image uploader w/ image grid ∙{" "}
                <a
                    href="https://github.com/origin-space/originui/tree/main/docs/use-file-upload.md"
                    className="hover:text-foreground underline"
                >
                    API
                </a>
            </p> */}
        </div>
    );
};

export default FileUpload2;
