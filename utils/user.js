export const exclude = (user, keys = ["salt", "password"]) => {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  );
};
