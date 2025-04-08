"use client";

// react-i18next provider
import I18nProvider from "./I18nProvider";
import TanstackProvider from "./TanstackProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <I18nProvider>
                <TanstackProvider>{children}</TanstackProvider>
            </I18nProvider>
        </>
    );
};

// tanstack provider

export default Providers;
