export const getRandomColor = () => {
  const color = ["#FFE4E6", "#CFFAFE"];

  return color[Math.floor(Math.random() * color.length)];
};
