import { Link } from "react-router-dom";

export const GeneralTournamentPrinciples = () => {
  return (
    <>
      <p>
        We're excited to have you participate in our upcoming event. Here are
        some general principles to guide you:
      </p>

      <ul>
        <li>
          <strong>Tournament Date:</strong> The tournament will take place on
          13.10.2023.
        </li>
        <li>
          <strong>Location:</strong> Join us at the Auditorium - GOP, Katowice
          Office.
        </li>
        <li>
          <strong>Time:</strong> The event will run from 15:00 to 19:30.
        </li>
        <li>
          <strong>Participants:</strong> We're expecting 16 players to join us.
        </li>
        <li>
          <strong>Eligibility:</strong> Please note that this tournament is only
          for ING Hubs Poland employees (Business Support Cluster).
        </li>
        <li>
          <strong>Refreshments:</strong> Don't worry about going hungry or
          thirsty - snacks and drinks are included!
        </li>
        <li>
          <strong>Registration:</strong> Please register via our online form [
          <Link to="/players-registration">REGISTRATION</Link>].
        </li>
        <li>
          <strong>Manager Approval:</strong> If your schedule extends beyond
          15:00, please ensure that your manager approves your attendance.
        </li>
      </ul>

      <h3>We're looking forward to seeing you there!</h3>
    </>
  );
};
