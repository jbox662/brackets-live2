import { Box, Button } from "@mui/material";
import classNames from "classnames";
import { FilterButtons } from "../../types";

type FixtureFiltersProps = {
  stage: string;
  filterFixturesByStage: (stage: string) => void;
};

const FILTER_BUTTONS: FilterButtons[] = [
  { name: "All", value: "" },
  { name: "Group", value: "G" },
  { name: "Quarter-finals", value: "QF" },
  { name: "Semi-finals", value: "SF" },
  { name: "3rd place", value: "3P" },
  { name: "Final", value: "F" },
];

export const FixtureFilters = ({
  stage,
  filterFixturesByStage,
}: FixtureFiltersProps) => {
  return (
    <Box className="fixture-filters">
      {FILTER_BUTTONS.map(({ name, value }) => (
        <Button
          variant="outlined"
          key={`Filter type - ${name}`}
          type="button"
          className={classNames("button", {
            active: stage === value,
          })}
          onClick={() => filterFixturesByStage(value)}
        >
          {name}
        </Button>
      ))}
    </Box>
  );
};
