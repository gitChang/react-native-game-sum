import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function RandomNumber(props) {
  // Create an array of selected numbers.
  // Handle press event on selected number
  // to push inside the array.
  const handlePress = () => {
    if (props.isDisabled) return;
    // Note: Do not use 'key', use 'id' instead.
    // React do not consider 'key' as a 'prop'.
    props.onPress(props.id);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text
        style={[styles.random, props.isDisabled && styles.selected]}
        key={props.index}
      >
        {props.randomNumber}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  random: {
    backgroundColor: "#999",
    width: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: "center",
  },

  selected: {
    opacity: 0.3,
  },
});
