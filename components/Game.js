import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import RandomNumber from "./RandomNumber";
import { useCallback, useEffect, useState } from "react";

export default function Game(props) {
  // Generate array of random number with
  // the length base on props(randomNumberLen).
  const generatedRandomNumbers = Array.from({
    length: props.randomNumberLen,
  }).map(() => 1 + Math.floor(10 * Math.random()));

  // Copy the generated random number into a state,
  // to prevent change of value upon state update.
  const [randomNumbers, setRandomNumbers] = useState(generatedRandomNumbers);

  // Accumulate numbers inside the randomNumbers
  // array then set as a target sum.
  const targetSum = randomNumbers
    .slice(0, props.randomNumberLen - 2)
    .reduce((acc, curr) => acc + curr, 0);

  const [selectedIDs, setSelectedIDs] = useState([]);

  // Check the selected number if exist
  // so we can set a disabled effect style
  // on the element.
  const isNumberSelected = (numberIndex) => {
    // Call gameStatus here to show current sum.
    return selectedIDs.indexOf(numberIndex) >= 0;
  };

  // Select a number and add the ID attribute to the
  // state -> selectIDs array.
  const selectNumber = (numberIndex) => {
    setSelectedIDs([...selectedIDs, numberIndex]);
  };

  // A state that holds the time (seconds)
  // of the game.
  const [secondsLeft, setSecondsLeft] = useState(props.remainingSeconds);

  // Indicate status each time the player press
  // the button. Set initial sum to '0'.
  const gameStatus = () => {
    const sumSelectedNumbers = selectedIDs.reduce((acc, curr) => {
      return acc + randomNumbers[curr];
    }, 0);

    if (secondsLeft === 0) return ["Lost", "YOU LOSE!"];
    if (sumSelectedNumbers < targetSum) return ["Play", "PLAYING..."];
    if (sumSelectedNumbers > targetSum) return ["Lost", "YOU LOSE!"];
    if (sumSelectedNumbers === targetSum) return ["Win", "YOU WIN!!!"];
  };

  // Assign the function to a variable,
  // to avoid writing parenthesis ().
  const gameStat = gameStatus();

  // Display seconds left upon load.
  // Create a variable or ID that holds the setInverval function,
  // to call it later on clearInterval. Use useCallback Hook to
  // to cache or memoized and preventing recreation of function/callback.
  const decrementSeconds = useCallback(() => {
    setSecondsLeft((secondsLeft) => secondsLeft - 1);
  });

  useEffect(() => {
    const intervalID = setInterval(decrementSeconds, 1000);

    // Stop the timer when the
    // answer is correct and game
    // over when the time is up!
    if (gameStat[0] !== "Play" || secondsLeft <= 0) {
      clearInterval(intervalID);

      return;
    }

    return () => clearInterval(intervalID);
  }, [decrementSeconds, secondsLeft]);

  return (
    <View style={styles.container}>
      <Text style={[styles.targetSum, styles[`gameStatus_${gameStat[0]}`]]}>
        {targetSum}
      </Text>
      <View style={styles.randomContainer}>
        {randomNumbers.map((rn, index) => (
          <RandomNumber
            key={index}
            id={index}
            randomNumber={rn}
            isDisabled={isNumberSelected(index) || gameStat[1] !== "PLAYING..."}
            onPress={selectNumber}
          />
        ))}
      </View>
      <Text style={styles.gameStatus}>
        {secondsLeft > 0 && gameStat[0] === "Play" ? secondsLeft : gameStat[1]}
      </Text>
      {gameStat[0] !== "Play" && (
        <Button
          title="Play Again?"
          style={styles.buttonPlayAgain}
          onPress={props.OnPlayAgain}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
  },
  targetSum: {
    fontSize: 50,
    backgroundColor: "#bbb",
    margin: 50,
    textAlign: "center",
  },
  randomContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  random: {
    backgroundColor: "#999",
    width: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: "center",
  },
  gameStatus: {
    flex: 1,
    flexDirection: "row",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  gameStatus_Lost: {
    backgroundColor: "red",
  },
  gameStatus_Win: {
    backgroundColor: "green",
    color: "#fff",
  },
  buttonPlayAgain: {
    //fontSize: 50,
  },
});
