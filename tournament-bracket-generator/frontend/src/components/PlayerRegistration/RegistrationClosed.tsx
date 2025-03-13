import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const RegistrationClosed = () => {
  return (
    <>
      <h2 className="registration__title">
        Registration for this tournament is closed. Stay tuned for the next one!
      </h2>

      <Link to={"/"}>
        <Button variant="contained" className="registration__home-button">
          Back Home
        </Button>
      </Link>
    </>
  );
};
