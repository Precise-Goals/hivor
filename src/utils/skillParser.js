export const parseSkills = (text) => {
  if (typeof text !== "string") return [];
  return text
    .split(/\s+/)
    .filter((word) =>
      [
        "python",
        "java",
        "c++",
        "sql",
        "react",
        "node",
        "ml",
        "ai",
        "django",
      ].includes(word.toLowerCase())
    );
};
