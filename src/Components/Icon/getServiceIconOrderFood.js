import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const getServiceIconOrderFood = (serviceType, size = 28, color = "#007AFF") => {
  let iconName = "";

  // Xác định tên biểu tượng dựa trên serviceType
  switch (serviceType) {
    case "AMENITY":
      iconName = "bed-outline";
      break;
    case "BREAKFAST":
      iconName = "cafe-outline";
      break;
    case "LUNCH":
      iconName = "fast-food-outline";
      break;
    case "DINNER":
      iconName = "restaurant-outline";
      break;
    case "BUFFET":
      iconName = "pizza-outline";
      break;
    case "SPA":
      iconName = "water-outline";
      break;
    case "TRANSPORT":
      iconName = "car-outline";
      break;
    case "ROOM":
      iconName = "home-outline";
      break;
    default:
      iconName = "help-outline";
      break;
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

export default getServiceIconOrderFood;
