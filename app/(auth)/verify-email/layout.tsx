import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Activation de compte",
    description: "Generated by create next app",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
