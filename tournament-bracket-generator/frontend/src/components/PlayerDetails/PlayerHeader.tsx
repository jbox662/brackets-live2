import PersonIcon from "@mui/icons-material/Person";
import { Box, Button } from "@mui/material";

export const PlayerHeader = () => {
  return (
    <Box className="player-details__header">
      <Box className="header-container">
        <Box className="header__icon">
          <PersonIcon />
        </Box>

        <Box>
          <p className="header__item-title">
            <strong>John Doe</strong>
          </p>

          <p className="header__item-value">
            <strong>Doey1</strong>
          </p>
        </Box>
      </Box>

      <Button variant="outlined">Compare</Button>
    </Box>
  );
};
