import { Box, Button, TextField } from "@mui/material";
import classNames from "classnames";

type FeedbackProps = {
  rateNumber: number;
  comment: string;
  numberOfWordsInTextarea: number;
  handleRateButton: (value: number) => void;
  handleComment: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: () => void;
};

export const FeedbackForm = ({
  rateNumber,
  comment,
  numberOfWordsInTextarea,
  handleRateButton,
  handleComment,
  handleSubmit,
}: FeedbackProps) => {
  return (
    <>
      <p className="feedback__header">Share Review</p>

      <h2>How was your experience?</h2>

      <p className="feedback__description">
        Your review will help us to improve the application and make it user
        friendly for more users.
      </p>

      <Box className="feedback__btns">
        {[1, 2, 3, 4, 5].map((value) => (
          <Button
            key={`Rate - ${value}`}
            variant="outlined"
            onClick={() => handleRateButton(value)}
            className={`feedback__button ${
              value === rateNumber ? "active" : ""
            }`}
          >
            {value}
          </Button>
        ))}
      </Box>

      <Box my={2}>
        <TextField
          error={numberOfWordsInTextarea > 500}
          fullWidth
          multiline
          variant="outlined"
          name="comment"
          value={comment}
          onChange={handleComment}
          placeholder="Share feedback..."
          className="feedback__textarea"
        />

        <Box className="feedback__textarea-info">
          {numberOfWordsInTextarea > 500 ? (
            <span className="feedback__error-msg">
              Too many letters: {numberOfWordsInTextarea - 500}
            </span>
          ) : null}
          <span>
            <strong
              className={classNames({
                "feedback__error-msg": numberOfWordsInTextarea > 500,
              })}
            >
              {numberOfWordsInTextarea}
            </strong>
            /500
          </span>
        </Box>
      </Box>

      <Box>
        <Button
          type="button"
          variant="contained"
          onClick={handleSubmit}
          className="feedback__submit-button"
          disabled={!rateNumber || !comment || numberOfWordsInTextarea > 500}
        >
          Submit Review
        </Button>
      </Box>
    </>
  );
};
