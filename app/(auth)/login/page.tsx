"use client";

import { useTranslation } from "react-i18next";
import LoginForm from "@/components/forms/loginForm";

const LoginPage = () => {
    const { t } = useTranslation();

    return (
        <div className="grid lg:grid-cols-2 w-full h-full">
            <div className="place-self-center flex flex-col max-w-[600px] gap-5 py-[50px] lg:py-[100px] px-[50px] lg:px-[100px]">
                <div className="font-bold text-[clamp(24px,_8vw,_57px)]">
                    <span className="text-primary-color">Lo</span>
                    <span className="text-secondary-color">go</span>
                </div>
                <div>
                    <h1 className="font-semibold text-[clamp(18px,_5vw,_38px)]">
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
