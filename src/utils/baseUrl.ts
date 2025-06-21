export const baseUrl = () => {
  const test = import.meta.env.PUBLIC_IS_TEST_BRANCH;
  const prod = import.meta.env.PROD;
  if (test) {
    return "https://test-branch.cobra.monster/";
  } else if (prod) {
    return "https://cobra.monster/";
  } else {
    return "http://localhost:4321/";
  }
};
