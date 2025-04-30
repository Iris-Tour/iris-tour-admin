"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { apiResendEmailVerification, apiVerifyUserEmail } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import SpinningCircle from "@/components/spinners/SpinningCircle";
import { ShieldXIcon, ShieldCheckIcon } from "lucide-react";
import Button2 from "@/components/buttons/Button2";

const VerifyEmailPage = () => {
    const { t } = useTranslation();
    const params = useParams();
    const router = useRouter();

    const [token, setToken] = useState("");
    const [isSuccess, setIsSuccess] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const tokenParam = params.token as string;

        if (!tokenParam) {
            router.push("/login");
            return;
        }

        if (typeof tokenParam !== "string" || tokenParam.length < 10) {
            toast.error(t("general-errors.networkError"));
            router.push("/login");
            return;
        }

        setToken(tokenParam);
    }, [params.token, router, t]);

    const verifyUserEmailMutation = useMutation({
        mutationFn: () => apiVerifyUserEmail(token),
        onSuccess: () => {
            setIsSuccess(true);
        },
        onError: () => {
            setIsSuccess(false);
        },
    });

    useEffect(() => {
        if (!token) return;
        const timeout = setTimeout(() => {
            verifyUserEmailMutation.mutate();
        }, 1000);

        return () => clearTimeout(timeout);
    }, [token]);

    return (
        <div className="flex justify-center items-center bg-background w-full h-full px-4">
            <div className="flex flex-col items-center sm:max-w-xl bg-white gap-5 p-5 rounded-xl shadow-lg">
                {isSuccess === undefined && (
                    <>
                        <SpinningCircle className="text-primary w-[clamp(10px,_10vw,_32px)] h-[clamp(10px,_10vw,_32px)]" />
                        <p className="text-[clamp(16px,_5vw,_20px)] text-center">
                            {t(
                                "verify-email.waiting-message",
                                "Veuillez patienter, nous activons votre compte."
                            )}
                        </p>
                    </>
                )}

                {isSuccess === true && (
                    <>
                        <ShieldCheckIcon className="text-green-600 w-[clamp(10px,_10vw,_32px)] h-[clamp(10px,_10vw,_32px)]" />
                        <p className="text-green-600 text-[clamp(16px,_5vw,_20px)] text-center">
                            {t(
                                "verify-email.success-messages.Email verification successful",
                                "Votre adresse e-mail a été vérifiée avec succès."
                            )}
                        </p>
                        <Button2 isLink href="/login" className="mt-4">
                            Se connecter
                        </Button2>
                    </>
                )}

                {isSuccess === false && (
                    <>
                        <ShieldXIcon className="text-destructive w-[clamp(10px,_10vw,_32px)] h-[clamp(10px,_10vw,_32px)]" />
                        <p className="text-destructive text-[clamp(16px,_5vw,_20px)] text-center text-pretty">
                            {t(
                                "verify-email.error-messages.Email verification failed",
                                "Échec de la vérification de l'e-mail. Redirection..."
                            )}
                        </p>
                        <Button2
                            isLink
                            href="/verify-email/resend-email-verification"
                            className="mt-4"
                        >
                            Renvoyer le lien par email
                        </Button2>
                    </>
                )}
            </div>
        </div>
    );
};

export default VerifyEmailPage;
