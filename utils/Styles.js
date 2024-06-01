import { StyleSheet } from 'react-native';

const gameScreenStyles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: '#474747',
    flex: 1,
    display: "flex",
    padding: 20,
    flexWrap: "wrap",
    flexDirection: "column",
    gap: 16
  },
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  columnHeadingsContainer: {

  },
  columnHeading: {
    color: "white"
  },
  playersContainer: {
    display: "flex",
    rowGap: 16
  },
  player: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 8,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "red",
    padding: 8,
  },
  playerName: {
    color: "white",
    flex: 3
  },
  playerScore: {
    backgroundColor: "#848484",
    flex: 1
  },
});

  export { gameScreenStyles };