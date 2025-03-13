import { Box, Button } from "@mui/material";
import { useMemo, useState } from "react";
import { GeneralTournamentPrinciples } from "../../components/TournamentInfo/GeneralTournamentPrinciples";
import { GeneralTournamentRules } from "../../components/TournamentInfo/GeneralTournamentRules";
import { Prizes } from "../../components/TournamentInfo/Prizes";
import { TournamentStatute } from "../../components/TournamentInfo/TournamentStatute";
import "./TournamentInfo.scss";
import classNames from "classnames";

const INFO_BUTTONS = [
  { name: "General Principles", value: "general-principles" },
  { name: "Rules", value: "rules" },
  { name: "Statute", value: "statute" },
  { name: "Prizes", value: "prizes" },
];

export const TournamentInfo = () => {
  const [selectedButton, setSelectedButton] =
    useState<string>("general-principles");

  const displayedComponent = useMemo(() => {
    switch (selectedButton) {
      case "rules":
        return <GeneralTournamentRules />;
      case "statute":
        return <TournamentStatute />;
      case "prizes":
        return <Prizes />;
      default:
        return <GeneralTournamentPrinciples />;
    }
  }, [selectedButton]);

  return (
    <Box className="info-container">
      <Box className="info__btns-container">
        {INFO_BUTTONS.map(({ name, value }) => (
          <Button
            variant="outlined"
            key={`Selected - ${name}`}
            type="button"
            onClick={() => setSelectedButton(value)}
            className={classNames({
              active: value === selectedButton,
            })}
          >
            {name}
          </Button>
        ))}
      </Box>

      <Box className="info__content">{displayedComponent}</Box>
    </Box>
  );
};
