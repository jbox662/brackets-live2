import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getData, postData } from "../../api/axios";
import { Form } from "../../components/PlayerRegistration/Form/Form";
import { RegistrationClosed } from "../../components/PlayerRegistration/RegistrationClosed";
import { SuccessfullFormSubmission } from "../../components/PlayerRegistration/SuccessfullFormSubmission";
import { FormErrorType, Player } from "../../types";
import "./PlayerRegistration.scss";

export const PlayerRegistration = () => {
  const [formData, setFormData] = useState<Player>({
    first_name: "",
    last_name: "",
    nick_name: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrorType>({
    first_name_error: "",
    last_name_error: "",
    nick_name_error: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [isRegistrationOpened, setIsRegistrationOpened] =
    useState<boolean>(false);

  const getRegistrationStatus = () => {
    getData("registration-status/")
      .then((response) => {
        console.log(
          "getRegistrationStatus response: ",
          response.data.results[0].status
        );
        setIsRegistrationOpened(response.data.results[0].status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRegistrationStatus();
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitButton = () => {
    console.log("POST params: ", formData);

    postData("create-player/", formData)
      .then((response) => {
        console.log(response);
        setIsFormSubmitted(true);
        setFormData({
          first_name: "",
          last_name: "",
          nick_name: "",
        });
      })
      .catch((error) => {
        console.log(error);
        setFormErrors({
          ...formErrors,
          first_name_error: formData.first_name ? "" : "Name cannot be empty",
          last_name_error: formData.last_name ? "" : "Surname cannot be empty",
          nick_name_error: formData.nick_name
            ? error.response.data.message
            : "Nickname cannot be empty",
        });
      });
  };

  return (
    <Box className="registration-container">
      {isRegistrationOpened ? (
        isFormSubmitted ? (
          <SuccessfullFormSubmission />
        ) : (
          <Form
            formErrors={formErrors}
            handleInput={handleInput}
            handleSubmitButton={handleSubmitButton}
          />
        )
      ) : (
        <RegistrationClosed />
      )}
    </Box>
  );
};
