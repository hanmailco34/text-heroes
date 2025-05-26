import type { RouteObject } from "react-router-dom";
import IntroPage from "@/pages/Intro";
import LoginPage from "@/pages/Login";
import SignupPage from "@/pages/Signup";
import CharacterCreationPage from "@/pages/CharacterCreation";
//import CharacterCreate from "@/components/CharacterCreate";
import Main from "@/components/Main";
import MainLayout from "@/components/layout/Main";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <IntroPage></IntroPage>,
    },
    {
        path: "/login",
        element: (
            <MainLayout>
                <LoginPage></LoginPage>
            </MainLayout>
        ),
    },
    {
        path: "/signup",
        element: (
            <MainLayout>
                <SignupPage></SignupPage>
            </MainLayout>
        ),
    },
    {
        path: "/character-creation",
        element: (
            <MainLayout>
                <CharacterCreationPage></CharacterCreationPage>
            </MainLayout>
        ),
    },
    {
        path: "/main",
        element: <Main></Main>,
    },
];

export default routes;
