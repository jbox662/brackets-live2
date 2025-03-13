import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";

export const SuccessfullFormSubmission = () => {
  return (
    <>
      <Box className="registration__done-icon">
        <DoneIcon />
      </Box>

      <h2 className="registration__title">Thank you for submitting!</h2>
      <p className="registration__description">
        You have successfully submitted. We will let you know when we launch.
      </p>

      <Link to={"/"}>
        <Button variant="contained" className="registration__home-button">
          Done
        </Button>
      </Link>
    </>
  );
};
