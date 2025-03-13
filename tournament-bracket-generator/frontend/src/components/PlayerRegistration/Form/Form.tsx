import { Box, Button } from "@mui/material";
import { FormErrorType } from "../../../types";
import { PlayerRegistrationInput } from "./PlayerRegistrationInput/PlayerRegistrationInput";

type FormProps = {
  formErrors: FormErrorType;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitButton: () => void;
};

export const Form = ({
  formErrors,
  handleInput,
  handleSubmitButton,
}: FormProps) => {
  return (
    <>
      <h2 className="registration__title">
        Step into the Arena: <br />
        Sign Up for the Ultimate Gaming Showdown!
      </h2>

      <Box className="registration__inputs-container">
        <PlayerRegistrationInput
          name="first_name"
          label="Name"
          error={formErrors.first_name_error}
          handleInput={handleInput}
        />

        <PlayerRegistrationInput
          name="last_name"
          label="Surname"
          error={formErrors.last_name_error}
          handleInput={handleInput}
        />

        <PlayerRegistrationInput
          name="nick_name"
          label="Nickname"
          error={formErrors.nick_name_error}
          handleInput={handleInput}
        />

        <Button
          variant="contained"
          type="button"
          onClick={handleSubmitButton}
          className="registration__submit-button"
        >
          Submit
        </Button>
      </Box>
    </>
  );
};
