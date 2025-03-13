import { Box } from "@mui/material";
import classNames from "classnames";
import { setFixtureStage } from "../../helpers/setFixtureStage";
import { setFixtureStatus } from "../../helpers/setFixtureStatus";
import { FixtureDTO } from "../../types";

export const Fixture = ({
  player,
  opponent,
  player_goals_1st_leg,
  player_goals_2nd_leg,
  opponent_goals_1st_leg,
  opponent_goals_2nd_leg,
  stage,
  status,
  match_number,
}: FixtureDTO) => {
  return (
    <Box className="fixture">
      <Box className="fixture__header">
        <p className="item">
          <span className="item__name">Fixture:</span>{" "}
          <strong>{match_number}</strong>
        </p>
        <p className="item">
          <span className="item__name">Stage:</span>{" "}
          <strong>{setFixtureStage(stage)}</strong>
        </p>
      </Box>

      <Box className="fixture__score">
        <Box
          className={classNames("player", {
            active:
              player_goals_1st_leg + player_goals_2nd_leg >
              opponent_goals_1st_leg + opponent_goals_2nd_leg,
          })}
        >
          <p className="player__name">{player}</p>
          <p className="player__goals-1st">{player_goals_1st_leg}</p>
          {player_goals_2nd_leg !== null && (
            <p className="player__goals-2nd">({player_goals_2nd_leg})</p>
          )}
        </Box>

        <Box
          className={classNames("player", {
            active:
              player_goals_1st_leg + player_goals_2nd_leg <
              opponent_goals_1st_leg + opponent_goals_2nd_leg,
          })}
        >
          <p className="player__name">{opponent}</p>
          <p className="player__goals-1st">{opponent_goals_1st_leg}</p>
          {player_goals_2nd_leg !== null && (
            <p className="player__goals-2nd">({opponent_goals_2nd_leg})</p>
          )}
        </Box>
      </Box>

      <Box className="fixture__status">
        <p className="item">
          <span className="item__name">Status:</span>{" "}
          <strong>{setFixtureStatus(status)}</strong>
        </p>
      </Box>
    </Box>
  );
};
