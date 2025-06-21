export const baseUrl = () => {
  if (import.meta.env.PUBLIC_IS_TEST_BRANCH === true) {
    return "https://test-branch.cobra.monster/";
  } else if (import.meta.env.PROD === true) {
    return "https://cobra.monster/";
  } else {
    return "http://localhost:4321/";
  }
};
