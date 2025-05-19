import type { RouteObject } from "react-router-dom";
import GameIntro from "@/components/Intro/GameIntro";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import CharacterCreate from "@/components/CharacterCreate";
import CharacterIntro from "@/components/Intro/CharacterIntro";
import Main from "@/components/Main";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <GameIntro></GameIntro>,
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
        path: "/character-intro",
        element: <CharacterIntro></CharacterIntro>,
    },
    {
        path: "/main",
        element: <Main></Main>,
    },
];

export default routes;
