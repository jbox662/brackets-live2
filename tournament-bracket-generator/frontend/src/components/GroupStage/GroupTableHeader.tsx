import { TableCell, TableHead, TableRow } from "@mui/material";

const TABLE_HEADERS = [
  { name: "Pos." },
  { name: "Player" },
  { name: "Pld" },
  { name: "W" },
  { name: "D" },
  { name: "L" },
  { name: "GF" },
  { name: "GA" },
  { name: "GD" },
  { name: "Pts" },
  { name: "Qualified" },
];

export const GroupTableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        {TABLE_HEADERS.map(({ name }) => (
          <TableCell key={name}>
            <strong>{name}</strong>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
