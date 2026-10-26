import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Indu Housing Development – Trusted Homes in Chennai Since 2000",
    description:
        "Independent villas, individual houses & apartments across Chennai. 38 projects delivered with honest guidance at every step.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Onest:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <div style={{ width: "100%", minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", overflowX: "hidden" }}>
                    {children}
                </div>
            </body>
        </html>
    );
}
