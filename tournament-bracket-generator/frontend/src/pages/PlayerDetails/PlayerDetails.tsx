import { Box } from "@mui/material";
import { PlayerFixtures } from "../../components/PlayerDetails/PlayerFixtures";
import { PlayerHeader } from "../../components/PlayerDetails/PlayerHeader";
import { PlayerStats } from "../../components/PlayerDetails/PlayerStats";
import "./PlayerDetails.scss";

export const PlayerDetails = () => {
  return (
    <Box className="player-details-container">
      <PlayerHeader />
      <PlayerStats />
      <PlayerFixtures />
    </Box>
  );
};
