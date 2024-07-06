export const useGetUserInfo = () => {
  const { userID, name, isAuth } =
    JSON.parse(localStorage.getItem("auth")) || {};
  return { userID, name, isAuth };
};
