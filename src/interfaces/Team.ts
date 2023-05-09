export interface Team {
  points: number;
  crosses: number;
  currentPlayer: {
    buzzering: string;
    guessing: string
  };
  players: string[];
}
