import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import {AuthProvider} from "@/lib/auth/AuthContext";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
const montserrat = localFont({
  src: "./fonts/Montserrat/Montserrat-VariableFont_wght.ttf",
  variable: "--font-text",
  weight: "100 900",
});

const roboto = localFont({
  src: "./fonts/Roboto_serif/RobotoSerif-VariableFont_GRAD,opsz,wdth,wght.ttf",
  variable: "--font-title",
  weight: "100 900",
});

// const openSans = localFont({
//   src: "./fonts/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf",
//   variable: "--font-text",
//   weight: "300 800",
// });

export const metadata: Metadata = {
  title: "Devis Generator",
  description: "Générer et gérer vos devis clients",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${montserrat.variable} ${roboto.variable} antialiased dark`}
      >
          <AuthProvider>
              <SidebarProvider>
                  <AppSidebar />

                  <div className={"w-full min-h-80"}>
                      <SidebarTrigger />
                      {children}
                  </div>
              </SidebarProvider>
          </AuthProvider>
      </body>
    </html>
  );
}
