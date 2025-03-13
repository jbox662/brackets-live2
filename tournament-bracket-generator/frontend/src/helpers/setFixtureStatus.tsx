export const setFixtureStatus = (status: string) => {
  switch (status) {
    case "NS":
      return "Not Started";
    case "IP":
      return "In Progress";
    default:
      return "Completed";
  }
};
