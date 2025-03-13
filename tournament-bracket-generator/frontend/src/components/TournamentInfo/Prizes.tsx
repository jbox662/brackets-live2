// It is worth to make a cool design to display prizes (Triangle, like 3rd, 1st, 2nd)
export const Prizes = () => {
  return (
    <>
      <p>
        The total prize pool for this tournament is 600 Worksmile points, which
        will be distributed among the top three players.
      </p>

      <p>Here's how the points will be awarded:</p>
      <ul>
        <li>
          <strong>
            1<sup>st</sup> Place:
          </strong>{" "}
          The champion of the tournament will receive 300 points.
        </li>
        <li>
          <strong>
            2<sup>nd</sup> Place:
          </strong>{" "}
          The runner-up will receive 200 points.
        </li>
        <li>
          <strong>
            3<sup>rd</sup> Place:
          </strong>{" "}
          The player who secures the third place will receive 100 points.
        </li>
      </ul>
      <p>Stay tuned for more details on the exact distribution of points.</p>
      <p>
        <strong>Good luck to all participants!</strong>
      </p>
    </>
  );
};
