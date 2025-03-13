export const setFixtureStage = (stage: string) => {
  switch (stage) {
    case "G":
      return "Group";
    case "QF":
      return "Quarter-final";
    case "SF":
      return "Semi-final";
    case "3P":
      return "3rd Place";
    default:
      return "Final";
  }
};
