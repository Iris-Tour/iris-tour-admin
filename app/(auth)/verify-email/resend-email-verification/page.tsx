"use client";

import { useTranslation } from "react-i18next";
import Logo from "@/components/Logo";
import ResendEmailVerificationForm from "@/components/forms/auth/ResendEmailVerificationForm";

const ResetPasswordPage = () => {
    const { t } = useTranslation();

    return (
        <div className="grid lg:grid-cols-2 w-full h-full">
            <div className="place-self-center flex flex-col max-w-[600px] gap-5 py-[50px] px-[50px]">
                <Logo />
                <div className="flex flex-col gap-2">
                    <h1 className="font-semibold text-[clamp(18px,_5vw,_38px)] leading-10">
                        {t("verify-email.resend-email-verification.heading")}
                    </h1>
                    <p>
                        {t(
                            "verify-email.resend-email-verification.description"
                        )}
                    </p>
                </div>
                <ResendEmailVerificationForm />
            </div>
            <div className="hidden lg:block bg-login-image h-full"></div>
        </div>
    );
};

export default ResetPasswordPage;
