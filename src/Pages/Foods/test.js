// // {
// //   loadingService: false,
// //   error: null,
// //   serviceList: {
// //     BREAKFAST: [
// //       {
// //         id: 29,
// //         name: "Bánh mì trứng",
// //         description: "Bánh mì giòn rụm...",
// //         image: "https://example.com/images/banh-mi-trung.jpg",
// //         price: 20000,
// //         serviceType: "BREAKFAST",
// //         roomChoseServiceList: [
// //           { roomId: 3, roomName: "Phòng Deluxe nhỏ" },
// //           ...
// //         ]
// //       },
// //       ...
// //     ],
// //     LUNCH: [],
// //     ...
// //   },
// //   categories: [
// //     { id: 1, name: "BREAKFAST" },
// //     ...
// //   ]
// // }

// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   navigation,
//   ScrollView,
//   FlatList,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons"; // Để hiển thị icon ngôi sao (rating)

// // Component chính
// const FoodCart = ({ navigation }) => {
//   const FoodList = [
//     {
//       id: 1,
//       name: "Bagels with turkey and bacon",
//       url: "https://media.istockphoto.com/id/2061716709/fr/photo/burger-de-c%C3%B4tes-grill%C3%A9es.webp?a=1&b=1&s=612x612&w=0&k=20&c=PvlYSm7Q_q7ro2i7tMJ4lnjELvPeBKnWIyzvOObmkEQ=",
//       price: "10.000",
//       quantity: "1",
//     },
//     {
//       id: 2,
//       name: "Sandwich",
//       url: "https://media.istockphoto.com/id/2061716709/fr/photo/burger-de-c%C3%B4tes-grill%C3%A9es.webp?a=1&b=1&s=612x612&w=0&k=20&c=PvlYSm7Q_q7ro2i7tMJ4lnjELvPeBKnWIyzvOObmkEQ=",
//       price: "10.000",
//       quantity: "1",
//     },
//     {
//       id: 3,
//       name: "Sandwich",
//       url: "https://media.istockphoto.com/id/2061716709/fr/photo/burger-de-c%C3%B4tes-grill%C3%A9es.webp?a=1&b=1&s=612x612&w=0&k=20&c=PvlYSm7Q_q7ro2i7tMJ4lnjELvPeBKnWIyzvOObmkEQ=",
//       price: "10.000",
//       quantity: "1",
//     },
//     {
//       id: 4,
//       name: "Sandwich",
//       url: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
//       price: "10.000",
//       quantity: "1",
//     },
//   ];

//   const handleToOrderFood = () => {
//     navigation.navigate("OrderFood");
//   };

//   const handleToOrderPayment = () => {
//     navigation.navigate("OrderPayment");
//   };
//   const handleToSuccessPayment = () => {
//     navigation.navigate("SuccessPayment");
//   };
//   const renderListFood = ({ item }) => {
//     return (
//       <View style={styles.foodCart__item}>
//         <Image
//           source={{
//             uri: `${item.url}`,
//           }} // Thay bằng URL hình ảnh thực tế
//           style={styles.foodCart__itemImage}
//         />
//         <View style={styles.foodCart__itemDetails}>
//           <Text style={styles.foodCart__itemName}>{item.name}</Text>
//           <Text style={styles.foodCart__itemPrice}>{item.price}</Text>
//         </View>
//         <View style={styles.foodCart__itemQuantity}>
//           <TouchableOpacity style={styles.foodCart__itemButton}>
//             <Text style={styles.foodCart__itemButtonText}>−</Text>
//           </TouchableOpacity>
//           <Text style={styles.foodCart__itemQuantityText}>{item.quantity}</Text>
//           <TouchableOpacity style={styles.foodCart__itemButton}>
//             <Text style={styles.foodCart__itemButtonText}>+</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };
//   return (
//     <View style={styles.foodCart}>
//       {/* Header */}
//       <View style={styles.foodCart__header}>
//         <TouchableOpacity>
//           <Text style={styles.foodCart__headerBack}>
//             <Ionicons
//               style={styles.iconChevron}
//               name="chevron-back-outline"
//               size={36}
//               color="black"
//               onPress={() => handleToOrderFood()}
//             />
//           </Text>
//         </TouchableOpacity>
//         <Text style={styles.foodCart__headerTitle}>Giỏ Hàng</Text>
//       </View>

//       {/* Summary Line */}
//       <View style={styles.foodCart__summary}>
//         <Text style={styles.foodCart__summaryItems}>2 sản phẩm</Text>
//         <Text style={styles.foodCart__summaryTotal}>Tổng: 12.000</Text>
//       </View>

//       {/* Danh sách món ăn */}

//       <FlatList
//         data={FoodList}
//         renderItem={renderListFood}
//         keyExtractor={(item) => item.id}
//         style={styles.foodCart__items}
//         //   showsHorizontalScrollIndicator={false}
//         showsVerticalScrollIndicator={false}
//       />

//       {/* Select Time */}
//       <View style={styles.foodCart__selectTime}>
//         <Text style={styles.foodCart__selectTimeLabel}>Chọn thời gian</Text>
//         <Text style={styles.foodCart__selectTimeValue}>00:00:00</Text>
//         <Text style={styles.foodCart__selectTimeArrow}>▼</Text>
//       </View>

//       {/* Order Summary */}
//       <View style={styles.foodCart__orderSummary}>
//         <Text style={styles.foodCart__orderSummaryTitle}>TÓM TẮT ĐƠN HÀNG</Text>
//         <View style={styles.foodCart__orderSummaryItem}>
//           <Text style={styles.foodCart__orderSummaryItemName}>
//             Bagels with turkey and bacon
//           </Text>
//           <Text style={styles.foodCart__orderSummaryItemPrice}>10.000</Text>
//         </View>
//         <View style={styles.foodCart__orderSummaryItem}>
//           <Text style={styles.foodCart__orderSummaryItemName}>Sandwich</Text>
//           <Text style={styles.foodCart__orderSummaryItemPrice}>5.000</Text>
//         </View>
//         <View style={styles.foodCart__orderSummaryItem}>
//           <Text style={styles.foodCart__orderSummaryItemName}>Tạm tính </Text>
//           <Text style={styles.foodCart__orderSummaryItemPrice}>15.000 </Text>
//         </View>
//         <View style={styles.foodCart__orderSummaryItem}>
//           <Text style={styles.foodCart__orderSummaryItemName}>
//             Phí dịch vụ{" "}
//           </Text>
//           <Text style={styles.foodCart__orderSummaryItemPrice}>2.000 </Text>
//         </View>
//         <View style={styles.foodCart__orderSummaryItem}>
//           <Text style={styles.foodCart__orderSummaryItemName__total}>
//             TỔNG TIỀN
//           </Text>
//           <Text style={styles.foodCart__orderSummaryItemPrice__total}>$17</Text>
//         </View>
//       </View>

//       {/* Nút Proceed to Payment */}
//       <TouchableOpacity
//         style={styles.foodCart__proceedButton}
//         onPress={() => handleToOrderPayment()}
//         //   onPress={() => handleToSuccessPayment()}
//       >
//         <Text style={styles.foodCart__proceedButtonText}>THANH TOÁN</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
// export default FoodCart;

// // Styles
// const styles = StyleSheet.create({
//   foodCart: {
//     flex: 1,
//     backgroundColor: "#F5F5F5",
//     paddingHorizontal: 20,
//     flexDirection: "column",
//   },
//   foodCart__header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 40,
//     marginBottom: 10,
//   },
//   foodCart__headerBack: {
//     fontSize: 24,
//     color: "#00F598",
//     marginRight: 10,
//   },
//   foodCart__headerTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#000000",
//   },
//   foodCart__summary: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//     backgroundColor: "#EFF3F5",
//     //     paddingHorizontal: 10,
//     paddingVertical: 20,
//   },
//   foodCart__summaryItems: {
//     fontSize: 14,
//     color: "#666666",
//   },
//   foodCart__summaryTotal: {
//     fontSize: 14,
//     color: "#000000",
//   },
//   foodCart__items: {
//     marginBottom: 20,
//   },
//   foodCart__item: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//     marginBottom: 15,
//     borderBottomColor: "#9EB6C5",
//     borderBottomWidth: 1,
//     justifyContent: "flex-end",
//     //     paddingHorizontal: 10,
//     paddingVertical: 20,
//   },
//   foodCart__itemImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 10,
//     marginRight: 10,
//   },
//   foodCart__itemDetails: {
//     flex: 1,
//   },
//   foodCart__itemName: {
//     fontSize: 16,
//     fontWeight: "400",
//     color: "#000000",
//     lineHeight: 24,
//   },
//   foodCart__itemPrice: {
//     fontSize: 14,
//     color: "#000000",
//     lineHeight: 21,
//     fontWeight: "bold",
//   },
//   foodCart__itemQuantity: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   foodCart__itemButton: {
//     width: 25,
//     height: 25,
//     backgroundColor: "#00F598",
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//     marginHorizontal: 5,
//   },
//   foodCart__itemButtonText: {
//     fontSize: 16,
//     color: "#FFFFFF",
//   },
//   foodCart__itemQuantityText: {
//     fontSize: 16,
//     color: "#000000",
//   },
//   foodCart__selectTime: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#CCCCCC",
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 20,
//   },
//   foodCart__selectTimeLabel: {
//     fontSize: 14,
//     color: "#666666",
//   },
//   foodCart__selectTimeValue: {
//     fontSize: 14,
//     color: "#000000",
//   },
//   foodCart__selectTimeArrow: {
//     fontSize: 14,
//     color: "#666666",
//   },
//   foodCart__orderSummary: {
//     marginBottom: 20,
//   },
//   foodCart__orderSummaryTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#000000",
//     marginBottom: 10,
//   },
//   foodCart__orderSummaryItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   foodCart__orderSummaryItemName: {
//     fontSize: 14,
//     color: "#000000",
//     lineHeight: 21,
//   },
//   foodCart__orderSummaryItemName__total: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#000000",
//     lineHeight: 21,
//   },
//   foodCart__orderSummaryItemPrice: {
//     fontSize: 14,
//     color: "#000000",
//     lineHeight: 21,
//   },
//   foodCart__orderSummaryItemPrice__total: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#000000",
//     lineHeight: 21,
//   },
//   foodCart__proceedButton: {
//     backgroundColor: "#00F598",
//     borderRadius: 10,
//     paddingVertical: 15,
//     alignItems: "center",
//     marginVertical: 20,
//     marginTop: "auto",
//   },
//   foodCart__proceedButtonText: {
//     fontSize: 16,
//     fontWeight: "400",
//     color: "#FFFFFF",
//   },
// });

const test = [
  {
    bookingRoomResponseList: [
      {
        roomId: 1,
        roomName: "Phòng Deluxe Gia đình",
        quantity: 3,
        time: null,
        note: "",
      },
      {
        roomId: 1,
        roomName: "Phòng Deluxe Gia đình",
        quantity: 2,
        time: null,
        note: "",
      },
    ],
    serviceId: 29,
    serviceName: "Bánh mì trứng",
  },
  {
    bookingRoomResponseList: [[Object], [Object]],
    serviceId: 30,
    serviceName: "Phở bò",
  },
];
