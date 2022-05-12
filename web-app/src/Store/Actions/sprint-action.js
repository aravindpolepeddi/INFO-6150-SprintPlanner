export const SprintActionType = {
  GET_SPRINT: "{Sprint} Get sprint action",
  SET_SPRINT: "{Sprint} Set sprint action",
};

export const getSprint = () => {
  return {
    type: SprintActionType.GET_SPRINT,
  };
};

export const setSprint = () => {
  return {
    type: SprintActionType.SET_SPRINT,
  };
};
