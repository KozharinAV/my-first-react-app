import { Route, Routes } from "react-router-dom";
import Rules from "../pages/rules/Rules";
import GameField from "../pages/game-field/GameField";
import Layout from "./Layout";
import Options from "../pages/options/Options";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<GameField />} path="/" />
        <Route element={<Rules />} path="rules" />
        <Route element={<Options />} path="options" />
        <Route path="*" element={<GameField />} />
      </Route>
    </Routes>
  );
}
