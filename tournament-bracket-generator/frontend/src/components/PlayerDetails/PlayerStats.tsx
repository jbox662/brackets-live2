import { Box, Button } from "@mui/material";

type PlayerStatItemProps = {
  title: string;
  value: number | string;
};

const PlayerStatItem = ({ title, value }: PlayerStatItemProps) => {
  return (
    <Box className="stats__item">
      <p className="stats__item-key">{title}</p>
      <p className="stats__item-value">
        <strong>{value}</strong>
      </p>
    </Box>
  );
};

export const PlayerStats = () => {
  return (
    <Box className="player-details__stats">
      <Button variant="outlined" className="stats__button">
        Overview
      </Button>

      <Box className="stats__first-box">
        <PlayerStatItem title="Matches Played" value={0} />
      </Box>

      <Box className="stats__second-box">
        <PlayerStatItem title="Wins" value={0} />
        <PlayerStatItem title="Draws" value={0} />
        <PlayerStatItem title="Loses" value={0} />
      </Box>

      <Box className="stats__third-box">
        <PlayerStatItem title="Goals For" value={0} />
        <PlayerStatItem title="Goals Against" value={0} />
        <PlayerStatItem title="Goals Difference" value={0} />
      </Box>

      <Box className="stats__fourth-box">
        <PlayerStatItem title="Current Stage" value="Group" />
      </Box>
    </Box>
  );
};
