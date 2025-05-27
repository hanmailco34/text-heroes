import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoutesConfig from "./routes";

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {RoutesConfig.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={route.element}
                    />
                ))}
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
