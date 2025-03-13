import { Box } from "@mui/material";
import { useState } from "react";
import { postData } from "../../api/axios";
import { FeedbackForm } from "../../components/Feedback/FeedbackForm";
import { SubmittedFeedback } from "../../components/Feedback/SubmittedFeedback";
import "./Feedback.scss";

export const Feedback = () => {
  const [rateNumber, setRateNumber] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [numberOfWordsInTextarea, setIsNumberOfWordsInTextarea] =
    useState<number>(0);
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] =
    useState<boolean>(false);

  const handleRateButton = (value: number) => {
    setRateNumber(value);
  };

  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setComment(value);
    setIsNumberOfWordsInTextarea(value.length);
  };

  const handleSubmit = () => {
    postData("feedback/", {
      rate: rateNumber,
      comment,
    }).then((response) => {
      console.log(response);
    });

    setIsFeedbackSubmitted(true);
  };

  return (
    <Box className="feedback-container">
      {isFeedbackSubmitted ? (
        <SubmittedFeedback rateNumber={rateNumber} />
      ) : (
        <FeedbackForm
          rateNumber={rateNumber}
          comment={comment}
          numberOfWordsInTextarea={numberOfWordsInTextarea}
          handleRateButton={handleRateButton}
          handleComment={handleComment}
          handleSubmit={handleSubmit}
        />
      )}
    </Box>
  );
};
