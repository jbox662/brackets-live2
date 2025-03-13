type FAQ = {
  header: string;
  body: string;
  link?: string;
};

export const FAQ_DATA: FAQ[] = [
  {
    header: "What are the general principles of the tournament?",
    body: "The tournament will take place on 13.10.2023 at the Auditorium – GOP, Katowice Office from 15:00 – 19:30.",
  },
  {
    header: "Who can participate in the tournament?",
    body: "The tournament is only for ING Hubs Poland employees (Business Support Cluster).",
  },
  {
    header: "How can I register for the tournament?",
    body: "You can register for the tournament through a specific form provided by the organizers. Please note that your manager needs to approve your attendance if your schedule extends beyond 15:00.",
    link: 'http://localhost:5173/players-registration'
  },
  {
    header: "What is the format of the tournament?",
    body: "The tournament will be played in a 1 vs 1 system. It includes a group stage and a knockout stage.",
  },
  {
    header: "What are the game settings?",
    body: "Matches are played in FIFA 23, PlayStation 5 version. Half length varies depending on the tournament stage.",
  },
  {
    header: "What behaviors are prohibited?",
    body: "Prohibited behaviors include using cheating programs, intentionally disconnecting or restarting the console, time-wasting, throwing the game to your opponent, and exploiting game bugs.",
  },
  {
    header: "What happens if I violate the rules?",
    body: "Violation of the rules may result in a warning or disqualification from the Tournament at the discretion of the Organizer.",
  },
  {
    header: "Can I withdraw from the tournament?",
    body: "A participant may withdraw from participation in the Tournament at any time.",
  },
  {
    header: "What are the prizes for the tournament?",
    body: "The prize pool is 600 worksmile points, with 300 points for 1st place, 200 points for 2nd place, and 100 points for 3rd place.",
  },
  {
    header: "Can the rules of the tournament change?",
    body: "The Organizer of the competition reserves the right to make changes to these regulations.",
  },
  {
    header: "Where can I find more information about the teams in FIFA 23?",
    body: "For detailed information about the teams in FIFA 23, please refer to the FIFA Index website.",
    link: "https://www.fifaindex.com/teams/fifa23/"
  },
  {
    header: "What team selections are allowed in the tournament?",
    body: "Only League Teams and National Teams over 4 stars are allowed. World XI and Classic XI are not permitted.",
  },
];