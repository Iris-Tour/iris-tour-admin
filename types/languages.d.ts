type LanguageType = {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
};

type GetAllLanguagesPromise = LanguageType[];

type StoreLanguageMutation = {
    title: string;
};

type StoreLanguagePromise = {
    message: string;
    language: LanguageType;
};

type UpdateLanguageMutation = {
    title: string;
};

type UpdateLanguagePromise = {
    message: string;
    language: LanguageType;
};

type DeleteLanguagePromise = {
    message: string;
};
