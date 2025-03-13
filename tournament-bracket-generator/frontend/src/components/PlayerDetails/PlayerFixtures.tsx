import CircleIcon from "@mui/icons-material/Circle";
import { Box } from "@mui/material";

export const PlayerFixtures = () => {
  return (
    <Box className="player-details__fixtures">
      <Box className="stats__item">
        <p className="stats__item-key">Last Fixtures</p>

        <Box className="fixture-box">
          <Box>
            <p>
              <span className="stats__item-key">Stage:</span>{" "}
              <strong>Group</strong>
            </p>
          </Box>

          <Box className="fixture-box__score">
            <p className="fixture-box__player">
              John Doe <span>3</span>
            </p>
            <p className="delimeter">-</p>
            <p className="fixture-box__player">
              <span>0</span> Bob Johnson
            </p>
          </Box>

          <CircleIcon className="win" />
        </Box>
      </Box>
    </Box>
  );
};
