import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Game from "./components/Game";

export default function App() {
  const [gameID, setGameID] = useState(1);

  // Assign gameID to 'key' attribute
  // of a <Game /> component and update its
  // state in order to re-render.
  const resetGame = () => {
    setGameID((gameID) => gameID + 1);
    console.log(`Game ID: ${gameID}. Play again!`);
  };

  return (
    <Game
      key={gameID}
      OnPlayAgain={resetGame}
      randomNumberLen={6}
      remainingSeconds={12}
    />
  );
}
