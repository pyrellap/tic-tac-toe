// TIC TAC TOE GAME
import { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";

type GamePlay = "not-played" | "X" | "O";

const GAME_BOARD: GamePlay[][] = [
  ["not-played", "not-played", "not-played"],
  ["not-played", "not-played", "not-played"],
  ["not-played", "not-played", "not-played"],
];

type CellProps = {
  cell: GamePlay;
  onPress: () => void;
};

const Cell = ({ cell, onPress }: CellProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      width: 100,
      height: 100,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#6699cc",
    }}
  >
    <Text
      style={{
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: 80,
      }}
    >
      {cell === "not-played" ? "" : cell}
    </Text>
  </TouchableOpacity>
);

const checkWinner = () => {
  for (let i = 0; i < 3; i++) {
    if (
      GAME_BOARD[i][0] === GAME_BOARD[i][1] &&
      GAME_BOARD[i][1] === GAME_BOARD[i][2] &&
      GAME_BOARD[i][0] !== "not-played"
    ) {
      return GAME_BOARD[i][0];
    }
    if (
      GAME_BOARD[0][i] === GAME_BOARD[1][i] &&
      GAME_BOARD[1][i] === GAME_BOARD[2][i] &&
      GAME_BOARD[0][i] !== "not-played"
    ) {
      return GAME_BOARD[0][i];
    }
  }
  if (
    GAME_BOARD[0][0] === GAME_BOARD[1][1] &&
    GAME_BOARD[1][1] === GAME_BOARD[2][2] &&
    GAME_BOARD[0][0] !== "not-played"
  ) {
    return GAME_BOARD[0][0];
  }
  if (
    GAME_BOARD[0][2] === GAME_BOARD[1][1] &&
    GAME_BOARD[1][1] === GAME_BOARD[2][0] &&
    GAME_BOARD[0][2] !== "not-played"
  ) {
    return GAME_BOARD[0][2];
  }

  // Check for a draw
  const isDraw = GAME_BOARD.every((row) =>
    row.every((cell) => cell !== "not-played")
  );
  if (isDraw) {
    return "draw";
  }
  return null;
};

const clearBoard = () => {
  GAME_BOARD.forEach((row, rowIndex) => {
    row.forEach((_, cellIndex) => {
      GAME_BOARD[rowIndex][cellIndex] = "not-played";
    });
  });
};

export default function Index() {
  const [isCrossTurn, setIsCrossTurn] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    const winner = checkWinner();
    if (winner) {
      clearBoard();
      setIsCrossTurn(true);
      if (winner === "draw") {
        setWinner("It's a draw");
      } else {
        setWinner(`${winner} wins`);
      }
    }
  }, [isCrossTurn]);

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        flex: 1,
        backgroundColor: "#95b8d1",
      }}
    >
      {GAME_BOARD.map((row, rowIndex) => (
        <View style={{ flexDirection: "row", gap: 20 }} key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <Cell
              key={cellIndex}
              cell={cell}
              onPress={() => {
                if (cell === "not-played") {
                  GAME_BOARD[rowIndex][cellIndex] = isCrossTurn ? "X" : "O";
                  setIsCrossTurn((prev) => !prev);
                }
              }}
            />
          ))}
        </View>
      ))}
      <Modal
        visible={!!winner}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setWinner(null)}
      >
        <Pressable
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setWinner(null)}
        >
          <View style={styles.modalView}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                textAlign: "center",
                color: "#6699cc",
              }}
            >
              {winner}
            </Text>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
