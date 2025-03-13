import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Box, TextField } from "@mui/material";
import classNames from "classnames";

type InputProps = {
  name: string;
  label: string;
  error: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const PlayerRegistrationInput = ({
  name,
  label,
  error,
  handleInput,
}: InputProps) => {
  return (
    <Box className="input-container">
      <TextField
        fullWidth
        label={label}
        type="text"
        name={name}
        className="input"
        error={Boolean(error)}
        onChange={handleInput}
      />
      {error && (
        <>
          <HighlightOffIcon />
          <span className={classNames({ "text-error": error })}>{error}</span>
        </>
      )}
    </Box>
  );
};
