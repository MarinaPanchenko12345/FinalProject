const getColor = (color) => {
  switch (color.toLowerCase()) {
    case "red":
      return "color-circle-lille red";
    case "green":
      
      return "color-circle green";
    case "blue":
      return "color-circle blue";
    case "black":
      return "color-circle black";
    case "white":
      return "color-circle white";
    case "yellow":
      return "color-circle yellow";
    case "orange":
      return "color-circle orange";
    case "purple":
      return "color-circle purple";
    case "pink":
      return "color-circle pink";
    case "metallic":
      return "color-circle metallic";
    default:
      return "color-circle"; 
  }
};
export default getColor;
