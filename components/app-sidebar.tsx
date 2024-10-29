"use client"
import {
    Book,
    Building2,
    CircleUserRound,
    FilePenLine,
    Home,
    ReceiptEuro,
    Scale, Scroll, ShoppingBasket, UserCog,
    UsersRound
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTriggerClose,
} from "@/components/ui/sidebar"
import {useIsMobile} from "@/hooks/use-mobile";
import {Button} from "@/components/ui/button";
import {usePathname, useRouter} from "next/navigation";
import {useAuth} from "@/lib/auth/AuthContext";

const itemsDynamics = [
    {
        title: "Accueil",
        url: "/",
        icon: Home,
    },
    {
        title: "Devis",
        url: "/devis",
        icon: ReceiptEuro,
    },
    {
        title: "Clients",
        url: "/clients",
        icon: UsersRound,
    },
    {
        title: "Entreprises",
        url: "/entreprises",
        icon: Building2,
    },
    {
        title: "Adresses",
        url: "/adresses",
        icon: Book,
    },
    {
        title: "Produits",
        url: "/produits",
        icon: ShoppingBasket,
    },
    {
        title: "Prestations",
        url: "/prestations",
        icon: Scroll,
    },
    {
        title: "Utilisateur/Dashboard",
        url: "/dashboard",
        icon: UserCog,
    },
]

const itemsFixed = [
    {
        title: "CGU",
        url: "/cgu",
        icon: Scale,
    },
    {
        title: "Contact",
        url: "/contact",
        icon: FilePenLine,
    },
    // {
    //     title: "Connexion",
    //     url: "/login",
    //     icon: CircleUserRound,
    // },
]

export function AppSidebar() {
    const { isAuthenticated, logout } = useAuth();
    const isMobile = useIsMobile()
    const router = useRouter();
    const matcher= ['/devis', '/clients', '/entreprises', '/adresses', '/elements', '/prestations', '/dashboard']
    const pathname = usePathname()

    function handleLogout() {
        logout()

        if (matcher.includes(pathname)) {
            router.push('/');
        }
    }

    // Filtrer les items dynamiques pour ne garder que l'accueil si non authentifié
    const visibleItems = isAuthenticated
        ? itemsDynamics
        : itemsDynamics.filter(item => item.title === "Accueil");

    return (
        <Sidebar>
            <SidebarContent className={"h-full flex flex-col justify-between"}>

                <SidebarGroup>
                    <div className={"absolute top-4 right-4"}>
                        {isMobile && <SidebarTriggerClose />}
                    </div>
                    <SidebarGroupLabel className={"text-2xl mt-9"}>Devis Generator</SidebarGroupLabel>
                    <SidebarGroupContent className={"mt-4 "}>
                        <SidebarMenu>
                            {visibleItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild className={"my-2"}>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup className={"mb-8"}>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {itemsFixed.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild className={"my-2"}>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>

                        {isAuthenticated ? (
                            <Button variant="destructive" onClick={handleLogout}>
                                <CircleUserRound />
                                <span>{"Se déconnecter"}</span>
                            </Button>
                        ) : (
                            <Button>
                                <CircleUserRound />
                                <a href={"/login"}>
                                    <span>{"Se connecter"}</span>
                                </a>
                            </Button>
                        )}

                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>
        </Sidebar>
    )
}
