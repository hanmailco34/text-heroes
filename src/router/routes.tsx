import type { RouteObject } from "react-router-dom";
import Intro from "@/components/Intro";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import CharacterCreate from "@/components/CharacterCreate";
import Main from "@/components/Main";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Intro></Intro>,
    },
    {
        path: "/login",
        element: <Login></Login>,
    },
    {
        path: "/signup",
        element: <SignUp></SignUp>,
    },
    {
        path: "/character-create",
        element: <CharacterCreate></CharacterCreate>,
    },
    {
        path: "/main",
        element: <Main></Main>,
    },
];

export default routes;
