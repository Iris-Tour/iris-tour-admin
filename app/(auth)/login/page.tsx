"use client";

import { useTranslation } from "react-i18next";
import LoginForm from "@/components/forms/auth/LoginForm";
import Logo from "@/components/Logo";

const LoginPage = () => {
    const { t } = useTranslation();

    return (
        <div className="grid lg:grid-cols-2 w-full h-full">
            <div className="place-self-center flex flex-col max-w-[600px] gap-5 py-[50px] px-[50px]">
                <Logo />
                <div className="flex flex-col gap-2">
                    <h1 className="font-semibold text-[clamp(18px,_5vw,_38px)] leading-10">
                        {t("login.greeting")}
                    </h1>
                    <p>{t("login.description")}</p>
                </div>
                <LoginForm />
            </div>
            <div className="hidden lg:block bg-login-image h-full"></div>
        </div>
    );
};

export default LoginPage;
