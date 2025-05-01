import { FileMetadata } from "@/hooks/use-file-upload";

export const rehydrateInitialFilesAsFiles = async (
    metadatas: FileMetadata[]
): Promise<File[]> => {
    return await Promise.all(
        metadatas.map(async (metadata) => {
            const response = await fetch(metadata.url);
            const blob = await response.blob();
            return new File([blob], metadata.name, {
                type: metadata.type,
                lastModified: Date.now(),
            });
        })
    );
};
