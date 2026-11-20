import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import PokedexPage from "./pages/PokedexPage";
import NotFoundPage from "./pages/NotFoundPage"
import NavigationBar from "./components/NavigationBar";
import RegisterPage from "./pages/RegisterPage";

export default function AppRoutes() {
    return(
        <>
            <NavigationBar/>

            <Routes>
                <Route index element={<HomePage />} />
                <Route path="pokedex" element={<PokedexPage />} />
                <Route path="/register" element={<RegisterPage/>} />
                <Route path = "/*" element={<NotFoundPage/>} />
            </Routes>
        </>
    )
}