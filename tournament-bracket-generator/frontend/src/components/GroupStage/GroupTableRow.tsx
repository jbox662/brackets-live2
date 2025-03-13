import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import { TableCell, TableRow } from "@mui/material";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { Groups } from "../../types";

type GroupTableRowProps = {
  position: number;
  group: Groups;
};

export const GroupTableRow = ({ position, group }: GroupTableRowProps) => {
  const {
    player,
    matches_played,
    wins,
    draws,
    loses,
    goals_for,
    goals_against,
    goals_difference,
    points,
    qualified,
  } = Object.values(group)[0];

  return (
    <TableRow
      className={classNames("table-row", {
        qualified: qualified,
      })}
    >
      <TableCell>{position}</TableCell>
      <TableCell>
        <Link to={`/player-details/${player.id}`} className="table-row__player">
          {player.first_name} {player.last_name}
        </Link>
      </TableCell>
      <TableCell>{matches_played}</TableCell>
      <TableCell>{wins}</TableCell>
      <TableCell>{draws}</TableCell>
      <TableCell>{loses}</TableCell>
      <TableCell>{goals_for}</TableCell>
      <TableCell>{goals_against}</TableCell>
      <TableCell>{goals_difference}</TableCell>
      <TableCell>
        <strong>{points}</strong>
      </TableCell>
      <TableCell>
        {qualified ? (
          <CheckCircleIcon className="icon-yes" />
        ) : (
          <DoNotDisturbOnIcon className="icon-no" />
        )}
      </TableCell>
    </TableRow>
  );
};
