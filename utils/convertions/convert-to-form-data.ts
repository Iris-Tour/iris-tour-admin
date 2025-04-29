export const convertToFormData = (data: any): FormData => {
    const formData = new FormData();

    // Append normal fields
    Object.entries(data).forEach(([key, value]) => {
        if (key === "mainImages") return; // handled separately

        if (value !== undefined && value !== null) {
            formData.append(key, String(value));
        }
    });

    // Append files
    if (data.mainImages) {
        data.mainImages.forEach((file: File) => {
            formData.append("mainImages[]", file); // use [] to support multiple files
        });
    }
    return formData;
};
