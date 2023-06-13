import { Route, Routes } from "react-router-dom";
// import { routes } from "../router";
import Rules from "../pages/rules/Rules";
import GameField from "../pages/game-field/GameField";
import Layout from "./Layout";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/" />
        <Route element={<Rules />} path="rules" />
        <Route path="*" element={<GameField />} />
      </Route>
    </Routes>
  );
}
