import { useAppSelector } from "../../hooks/redux";

export default function GameField() {
  const {} = useAppSelector((state) => state.gameReducer);
  return <div>GameField</div>;
}
