type SubmittedFeedbackProps = {
  rateNumber: number;
};

export const SubmittedFeedback = ({ rateNumber }: SubmittedFeedbackProps) => {
  return (
    <>
      <p className="feedback__paragraph">
        You selected <strong>{rateNumber}</strong> out 5
      </p>

      <p className="feedback__paragraph">Thanks for your feedback!</p>

      <p className="feedback__paragraph">
        We appreciate you taking the time to give a rating. If you ever need
        more support, don't hesitate to get in touch.
      </p>
    </>
  );
};
