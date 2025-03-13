# Tournament Bracket Generator

## Flow

- UX/UI
- Backend (Django)
- Frontend (React + GraphQL)
- Docker
- Tests

## App Steps

1. Add limitations when assigning players to Groups [Available players, groups]

2. Let users reverse their submit response (in the case they want to resign from participation)
   Idea 1: Another endpoint to send email to cancel registration
   Idea 2: Generate a unique URL for each registration (when clicked, user is deleted immediately)
   [Frontend] [Backend]
3. **Final Standings Display**: Display the final standings in a visually appealing way, possibly using graphics or animations to highlight the top three players. [Frontend] [Backend]

---

**Please note that this will only hide the “Add” button. Users will still be able to add new GroupStage instances by other means (for example, by manually entering the URL for the add page). If you want to completely prevent new GroupStage instances from being created, you’ll need to also override the save_model method to prevent saving when there are 16 or more GroupStage instances.**

---

4. Knockout Stage!
5. What about manually created instances?
6. When two or more players have the same stats in the group after 3 matches they have to play extra match, so you have to add an option to create Fixture with name Extra to specify that this is something extraordinary - consider if the values in the GroupStage should be updated automatically.

7. Exceptions in Django! [Backend Refactor]
8. Clean TS interface and types through whole project!

9. Add option to generate professional report with statistics etc.,
10. Send email with confirmation that user was successfully registered
11. **Data Export**: The ability to export player data to common formats like Excel or PDF.
12. Try to generate Excel file based on the whole Tournament
13. Translations

**IDEAS**

---

**TECH STACK**

17. Swagger
18. Add GraphQL [Frontend]
19. What about Docker?! [DevOps]
20. Tests [Backend] [Frontend]
21. Storybook
22. What other tools can I add to my APP?!
23. Redis?
24. React Hook Form for forms
25. Different requests library than AXIOS
26. Code documentation

---

**Future improvements ideas:**

- **User Verification**: When a user signs up, a verification email should be sent. Once the user verifies their account, they should be forwarded to finish setting up their account. The user should be able to set their full name and password. Remember to inform the user to check their inbox to log in.
- **Ongoing Tournaments**: A list or grid of tournaments that are currently in progress. Clicking on a tournament could take the user to a detailed view of that tournament's bracket.
- **Upcoming Matches**: A schedule of the user's upcoming matches in all ongoing tournaments.
- **Past Results**: A history of the user's past tournaments, including the final standings and brackets.
- **Account Management**: Options for the user to update their profile information, change their password, or log out.
- **Role-Based Access Control**: Different users should have different permissions. For example, tournament owners should be able to edit and delete tournaments, while players should only be able to view and register for tournaments.
- **Tournament Promotion**: Consider adding features to help users promote their tournaments, such as social media integration or promotional materials.
- **Match Scheduling**: Depending on the type of tournament, you might need to implement a feature for scheduling matches. This could include date, time, and location details for each match.
- **Notifications**: Consider implementing a notification system to keep users informed about upcoming matches, tournament results, and other important updates.
- **Link or QR Code to registration page**: When the owner of the tournament start registration, they should be able to send a link or QR code in a promotional post, and users can fill in the form.
- **Blog** - Consider to implement something like blog posts on the main page of the tournament
