import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BỜ KINH — Gìn giữ bản sắc, nâng tầm thương hiệu",
  description:
    "BỜ KINH là startup branding và MarTech giúp SMEs địa phương chuyển hóa giá trị văn hóa thành giá trị thương mại trong thời đại số.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        {/* Google Fonts: Cormorant Garamond, Montserrat, Raleway */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Montserrat:wght@300;400;500;600&family=Raleway:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
