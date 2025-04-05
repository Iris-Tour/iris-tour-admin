"use client";

import { useTranslation } from "react-i18next";
import LoginForm from "@/components/forms/LoginForm";
import Logo from "@/components/Logo";
import ResetPasswordOtpForm from "@/components/forms/ResetPasswordOtpForm";

const LoginPage = () => {
    const { t } = useTranslation();

    return (
        <div className="grid lg:grid-cols-2 w-full h-full">
            <div className="place-self-center flex flex-col max-w-[600px] gap-5 py-[50px] px-[50px]">
                <Logo />
                <div>
                    <h1 className="font-semibold text-[clamp(18px,_5vw,_38px)]">
                        {t("reset-password.otp-form.heading")}
                    </h1>
                    <p>{t("reset-password.otp-form.description")}</p>
                </div>
                <ResetPasswordOtpForm />
            </div>
            <div className="hidden lg:block bg-login-image h-full"></div>
        </div>
    );
};

export default LoginPage;
