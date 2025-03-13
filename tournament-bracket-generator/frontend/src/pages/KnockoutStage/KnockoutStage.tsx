import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getData } from "../../api/axios";
import { Fixture } from "../../components/Fixture/Fixture";
import { FixtureDTO } from "../../types";
import "./KnockoutStage.scss";

type KnockoutStageProps = {
  fixtures: FixtureDTO[];
};

export const Stage = ({ fixtures }: KnockoutStageProps) => {
  return (
    <Box className="fixture-container">
      {fixtures.map(
        (
          {
            player,
            opponent,
            player_goals_1st_leg,
            player_goals_2nd_leg,
            opponent_goals_1st_leg,
            opponent_goals_2nd_leg,
            stage,
            status,
            match_number,
          },
          index
        ) => (
          <Fixture
            // key={match_number}
            key={index}
            player={player}
            opponent={opponent}
            player_goals_1st_leg={player_goals_1st_leg}
            player_goals_2nd_leg={player_goals_2nd_leg}
            opponent_goals_1st_leg={opponent_goals_1st_leg}
            opponent_goals_2nd_leg={opponent_goals_2nd_leg}
            stage={stage}
            status={status}
            match_number={match_number}
          />
        )
      )}
    </Box>
  );
};

export const KnockoutStage = () => {
  const [quarterFinals, setQuarterFinals] = useState<FixtureDTO[]>([]);
  const [semiFinals, setSemiFinals] = useState<FixtureDTO[]>([]);
  const [finals, setFinals] = useState<FixtureDTO[]>([]);

  const getFixtures = () => {
    getData("/fixtures").then((response) => {
      console.log(response.data.results);
      const { results } = response.data;

      setQuarterFinals(
        results.filter(({ stage }: FixtureDTO) => stage === "QF")
      );
      setSemiFinals(results.filter(({ stage }: FixtureDTO) => stage === "SF"));
      setFinals(
        results.filter(
          ({ stage }: FixtureDTO) => stage === "3P" || stage === "F"
        )
      );
    });
  };

  useEffect(() => {
    getFixtures();
  }, []);

  return (
    <Box className="knockout-container">
      <Box className="stage column1">
        <Box className="header">Quarterfinals</Box>
        <Box className="fixtures-container">
          <Stage fixtures={quarterFinals} />
        </Box>
      </Box>

      <Box className="stage column2">
        <Box className="header">Semifinals</Box>
        <Box className="fixtures-container">
          <Stage fixtures={semiFinals} />
        </Box>
      </Box>

      <Box className="stage column3">
        <Box className="header">Finals</Box>
        <Box className="fixtures-container">
          <Stage fixtures={finals} />
        </Box>
      </Box>
    </Box>
  );
};
