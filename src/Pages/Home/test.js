// {"hotelId": 1,
//  "hotelLocation": "Đà Nẵng",
//  "hotelName": "Heden Golf",
//  "hotelRating": 3.9,
//  imageUrl": "https://res.cloudinary.com/dt7eo0hbq/image/upload/v1729241122/Room/nipyn0qgyoyhtgkadlyi.jpg",
//  "price": 800000,
//  "promotionName": "Ưu đãi đầu năm 2025",
//  "sumReview": 85},

//  import React, { useEffect, useState, useRef } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   SafeAreaView,
//   Image,
//   Modal,
//   Alert,
// } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
// import { Picker } from "@react-native-picker/picker"; // Sử dụng Picker thay thế DateTimePicker
// import { API_BASE_URL } from "../../Constant/Constant";
// import { useAppDispatch, useAppSelector } from "../../Redux/hook";
// import { fetchHotelList, fetchLocationList } from "../../Redux/Slice/hotelSlice";
// import ModalLocationList from "../../Components/Modal/ModalLocationList";
// import cloneDeep from "lodash/cloneDeep";

// const HomeScreen = ({ navigation }) => {
//   const continueSearch = [
//     {
//       id: "1",
//       name: "Heden Golf",
//       image:
//         "https://media.istockphoto.com/id/2148367059/fr/photo/la-ligne-dhorizon-c%C3%B4ti%C3%A8re-de-dakar-s%C3%A9n%C3%A9gal-afrique-de-louest.webp?a=1&b=1&s=612x612&w=0&k=20&c=gAwIfTVBEupXPG_K5DoK1k4kpJ_m7SkDF_UlkLrIcGk=",
//       details: " 23-26 Tháng 8, 6-7 Người lớn, 1 trẻ em",
//     },
//     {
//       id: "2",
//       name: "Onomo",
//       image:
//         "https://media.istockphoto.com/id/2148367059/fr/photo/la-ligne-dhorizon-c%C3%B4ti%C3%A8re-de-dakar-s%C3%A9n%C3%A9gal-afrique-de-louest.webp?a=1&b=1&s=612x612&w=0&k=20&c=gAwIfTVBEupXPG_K5DoK1k4kpJ_m7SkDF_UlkLrIcGk=",
//       details: " 23-26 Tháng 8, 6-7 Người lớn, 1 trẻ em",
//     },
//     {
//       id: "3",
//       name: "Adagio",
//       image:
//         "https://media.istockphoto.com/id/2148367059/fr/photo/la-ligne-dhorizon-c%C3%B4ti%C3%A8re-de-dakar-s%C3%A9n%C3%A9gal-afrique-de-louest.webp?a=1&b=1&s=612x612&w=0&k=20&c=gAwIfTVBEupXPG_K5DoK1k4kpJ_m7SkDF_UlkLrIcGk=",
//       details: " 23-26 Tháng 8, 6-7 Người lớn, 1 trẻ em",
//     },
//     {
//       id: "4",
//       name: "Sofitel",
//       image:
//         "https://media.istockphoto.com/id/2148367059/fr/photo/la-ligne-dhorizon-c%C3%B4ti%C3%A8re-de-dakar-s%C3%A9n%C3%A9gal-afrique-de-louest.webp?a=1&b=1&s=612x612&w=0&k=20&c=gAwIfTVBEupXPG_K5DoK1k4kpJ_m7SkDF_UlkLrIcGk=",
//       details: " 23-26 Tháng 8, 6-7 Người lớn, 1 trẻ em",
//     },
//     {
//       id: "5",
//       name: "Sofitel",
//       image:
//         "https://media.istockphoto.com/id/2148367059/fr/photo/la-ligne-dhorizon-c%C3%B4ti%C3%A8re-de-dakar-s%C3%A9n%C3%A9gal-afrique-de-louest.webp?a=1&b=1&s=612x612&w=0&k=20&c=gAwIfTVBEupXPG_K5DoK1k4kpJ_m7SkDF_UlkLrIcGk=",
//       details: " 23-26 Tháng 8, 6-7 Người lớn, 1 trẻ em",
//     },
//   ];

//   const { hotelList, locationList, hotelDetail, loading, error } =
//     useAppSelector((state) => state.hotel);

//   const [open, setOpen] = useState({
//     Modal_1: false,
//     Modal_2: false,
//   });

//   const [modalPosition, setModalPosition] = useState({
//     top: 0,
//     left: 0,
//     width: 0,
//   });

//   const [inforFilter, setInforFilter] = useState({
//     locationId: "0",
//     checkin: "2025-04-04",
//     checkout: "2025-04-04",
//     adults: 0,
//     children: 0,
//     roomNumber: 0,
//     amenityIds: [],
//     serviceIds: [],
//   });

//   // State để quản lý modal chọn ngày
//   const [showDatePicker, setShowDatePicker] = useState({
//     checkin: false,
//     checkout: false,
//   });

//   // State để lưu giá trị tạm thời của ngày, tháng, năm khi chọn
//   const [tempDate, setTempDate] = useState({
//     day: 4,
//     month: 4, // Tháng bắt đầu từ 1 (1-12)
//     year: 2025,
//   });

//   const dispatch = useAppDispatch();
//   useEffect(() => {
//     dispatch(fetchHotelList());
//     dispatch(fetchLocationList());
//   }, [dispatch]);

//   const HotelRequestList = ({ item }) => {
//     return (
//       <TouchableOpacity
//         style={styles.dealItem}
//         onPress={() => navigation.navigate("HotelDetails", { item })}
//       >
//         <View style={styles.dealImage}>
//           <Image
//             source={{
//               uri: `${item.imageUrl}`,
//             }}
//             style={styles.image}
//           />
//         </View>
//         <View style={styles.dealDetails}>
//           <Text style={styles.dealName}>{item.hotelName}</Text>
//           <View style={styles.dealReviews}>
//             <Icon
//               style={styles.iconStart}
//               name="star"
//               size={24}
//               color="#EBA731"
//             />
//             <Text style={styles.dealPoint}>{item.hotelRating} </Text>
//             <Text style={styles.dealReviewsText}>
//               Đánh giá ({item.sumReview}){" "}
//             </Text>
//           </View>
//           <Text style={styles.dealDesc}>{item.promotionName}</Text>
//           <View style={styles.dealFooter}>
//             <Text style={styles.dealSale}>Giảm 25%</Text>
//             <Text style={styles.dealPrice}> {item.price}</Text>
//             <TouchableOpacity>
//               <Text style={styles.dealBooking}>Đặt ngay </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const handleFilterHotel = () => {};

//   const inputContainerRef = useRef(null);
//   const handleOpenModal = (name) => {
//     const open_ = cloneDeep(open);
//     open_[name] = true;
//     setOpen(open_);

//     if (inputContainerRef.current) {
//       inputContainerRef.current.measure((fx, fy, width, height, px, py) => {
//         setModalPosition({ top: px + 2 * height, left: 0, width: "100%" });
//       });
//     }
//   };

//   const handleCloseModal = (name) => {
//     const open_ = cloneDeep(open);
//     open_[name] = false;
//     setOpen(open_);
//   };

//   // Hàm định dạng ngày thành chuỗi "DD/MM/YYYY"
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   // Hàm tạo mảng các ngày, tháng, năm cho Picker
//   const days = Array.from({ length: 31 }, (_, i) => i + 1);
//   const months = Array.from({ length: 12 }, (_, i) => i + 1);
//   const years = Array.from({ length: 10 }, (_, i) => 2025 + i); // Từ 2025 đến 2034

//   // Hàm mở modal chọn ngày và khởi tạo giá trị ban đầu
//   const openDatePicker = (type) => {
//     const date = new Date(type === "checkin" ? inforFilter.checkin : inforFilter.checkout);
//     setTempDate({
//       day: date.getDate(),
//       month: date.getMonth() + 1, // Tháng bắt đầu từ 1
//       year: date.getFullYear(),
//     });
//     setShowDatePicker({
//       ...showDatePicker,
//       [type]: true,
//     });
//   };

//   // Hàm xác nhận ngày đã chọn
//   const confirmDate = (type) => {
//     const selectedDate = new Date(tempDate.year, tempDate.month - 1, tempDate.day);
//     const currentDate = new Date("2025-04-05"); // Ngày hiện tại (05/04/2025)

//     if (type === "checkin") {
//       // Validate: Ngày nhận phòng phải lớn hơn hoặc bằng ngày hiện tại
//       if (selectedDate < currentDate) {
//         Alert.alert(
//           "Lỗi",
//           "Ngày nhận phòng phải lớn hơn hoặc bằng ngày hiện tại (05/04/2025)."
//         );
//         return;
//       }

//       // Cập nhật ngày nhận phòng
//       setInforFilter({
//         ...inforFilter,
//         checkin: selectedDate.toISOString().split("T")[0],
//       });

//       // Validate: Nếu đã có ngày trả phòng, kiểm tra xem ngày trả phòng có hợp lệ không
//       const checkoutDate = new Date(inforFilter.checkout);
//       if (selectedDate >= checkoutDate) {
//         Alert.alert(
//           "Lỗi",
//           "Ngày trả phòng phải lớn hơn ngày nhận phòng. Vui lòng chọn lại ngày trả phòng."
//         );
//         setInforFilter({
//           ...inforFilter,
//           checkin: selectedDate.toISOString().split("T")[0],
//           checkout: selectedDate.toISOString().split("T")[0], // Reset ngày trả phòng
//         });
//       }
//     } else {
//       // Validate: Ngày trả phòng phải lớn hơn ngày nhận phòng
//       const checkinDate = new Date(inforFilter.checkin);
//       if (selectedDate <= checkinDate) {
//         Alert.alert("Lỗi", "Ngày trả phòng phải lớn hơn ngày nhận phòng.");
//         return;
//       }

//       // Cập nhật ngày trả phòng
//       setInforFilter({
//         ...inforFilter,
//         checkout: selectedDate.toISOString().split("T")[0],
//       });
//     }

//     // Đóng modal
//     setShowDatePicker({
//       ...showDatePicker,
//       [type]: false,
//     });
//   };

//   const WidthtwoRowScrollView = 210 * Math.ceil(continueSearch.length / 2);

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.title}>Tìm Phòng</Text>
//         <TouchableOpacity>
//           <Icon name="filter" size={24} color="#007AFF" />
//         </TouchableOpacity>
//       </View>

//       {/* Body */}
//       <ScrollView style={styles.body} scrollEnabled={!open.Modal_1}>
//         {/* "Khách Sạn" Text */}
//         <View style={styles.hotelLabelContainer}>
//           <Text style={styles.hotelLabel}>Khách Sạn</Text>
//         </View>

//         {/* Input Fields */}
//         <TouchableOpacity
//           style={styles.inputContainer}
//           ref={inputContainerRef}
//           onPress={() => handleOpenModal("Modal_1")}
//         >
//           <Icon name="map-marker" size={24} color="#0090FF" />
//           <Text style={styles.inputText}>
//             {inforFilter.locationId !== "0"
//               ? locationList?.find(
//                   (item) => item.id.toString() === inforFilter.locationId
//                 )?.name || "Bạn muốn ở đâu"
//               : "Bạn muốn ở đâu"}
//           </Text>
//         </TouchableOpacity>

//         {/* Ngày nhận phòng */}
//         <TouchableOpacity
//           style={styles.inputContainer}
//           onPress={() => openDatePicker("checkin")}
//         >
//           <Icon name="calendar" size={24} color="#0090FF" />
//           <Text style={styles.inputText}>
//             {formatDate(inforFilter.checkin)}
//           </Text>
//           <Icon
//             name="angle-down"
//             size={20}
//             color="#0090FF"
//             style={styles.arrowIcon}
//           />
//         </TouchableOpacity>

//         {/* Ngày trả phòng */}
//         <TouchableOpacity
//           style={styles.inputContainer}
//           onPress={() => openDatePicker("checkout")}
//         >
//           <Icon name="calendar" size={24} color="#0090FF" />
//           <Text style={styles.inputText}>
//             {formatDate(inforFilter.checkout)}
//           </Text>
//           <Icon
//             name="angle-down"
//             size={20}
//             color="#0090FF"
//             style={styles.arrowIcon}
//           />
//         </TouchableOpacity>

//         {/* Modal chọn ngày nhận phòng */}
//         <Modal
//           visible={showDatePicker.checkin}
//           transparent={true}
//           animationType="slide"
//           onRequestClose={() =>
//             setShowDatePicker({ ...showDatePicker, checkin: false })
//           }
//         >
//           <View style={styles.modalOverlay}>
//             <View style={styles.datePickerContainer}>
//               <Text style={styles.modalTitle}>Chọn ngày nhận phòng</Text>
//               <View style={styles.pickerContainer}>
//                 <Picker
//                   style={styles.picker}
//                   selectedValue={tempDate.day}
//                   onValueChange={(value) =>
//                     setTempDate({ ...tempDate, day: value })
//                   }
//                 >
//                   {days.map((day) => (
//                     <Picker.Item key={day} label={`${day}`} value={day} />
//                   ))}
//                 </Picker>
//                 <Picker
//                   style={styles.picker}
//                   selectedValue={tempDate.month}
//                   onValueChange={(value) =>
//                     setTempDate({ ...tempDate, month: value })
//                   }
//                 >
//                   {months.map((month) => (
//                     <Picker.Item key={month} label={`${month}`} value={month} />
//                   ))}
//                 </Picker>
//                 <Picker
//                   style={styles.picker}
//                   selectedValue={tempDate.year}
//                   onValueChange={(value) =>
//                     setTempDate({ ...tempDate, year: value })
//                   }
//                 >
//                   {years.map((year) => (
//                     <Picker.Item key={year} label={`${year}`} value={year} />
//                   ))}
//                 </Picker>
//               </View>
//               <View style={styles.modalButtons}>
//                 <TouchableOpacity
//                   style={styles.modalButton}
//                   onPress={() =>
//                     setShowDatePicker({ ...showDatePicker, checkin: false })
//                   }
//                 >
//                   <Text style={styles.modalButtonText}>Hủy</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[styles.modalButton, styles.confirmButton]}
//                   onPress={() => confirmDate("checkin")}
//                 >
//                   <Text style={styles.modalButtonText}>Xác nhận</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </Modal>

//         {/* Modal chọn ngày trả phòng */}
//         <Modal
//           visible={showDatePicker.checkout}
//           transparent={true}
//           animationType="slide"
//           onRequestClose={() =>
//             setShowDatePicker({ ...showDatePicker, checkout: false })
//           }
//         >
//           <View style={styles.modalOverlay}>
//             <View style={styles.datePickerContainer}>
//               <Text style={styles.modalTitle}>Chọn ngày trả phòng</Text>
//               <View style={styles.pickerContainer}>
//                 <Picker
//                   style={styles.picker}
//                   selectedValue={tempDate.day}
//                   onValueChange={(value) =>
//                     setTempDate({ ...tempDate, day: value })
//                   }
//                 >
//                   {days.map((day) => (
//                     <Picker.Item key={day} label={`${day}`} value={day} />
//                   ))}
//                 </Picker>
//                 <Picker
//                   style={styles.picker}
//                   selectedValue={tempDate.month}
//                   onValueChange={(value) =>
//                     setTempDate({ ...tempDate, month: value })
//                   }
//                 >
//                   {months.map((month) => (
//                     <Picker.Item key={month} label={`${month}`} value={month} />
//                   ))}
//                 </Picker>
//                 <Picker
//                   style={styles.picker}
//                   selectedValue={tempDate.year}
//                   onValueChange={(value) =>
//                     setTempDate({ ...tempDate, year: value })
//                   }
//                 >
//                   {years.map((year) => (
//                     <Picker.Item key={year} label={`${year}`} value={year} />
//                   ))}
//                 </Picker>
//               </View>
//               <View style={styles.modalButtons}>
//                 <TouchableOpacity
//                   style={styles.modalButton}
//                   onPress={() =>
//                     setShowDatePicker({ ...showDatePicker, checkout: false })
//                   }
//                 >
//                   <Text style={styles.modalButtonText}>Hủy</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[styles.modalButton, styles.confirmButton]}
//                   onPress={() => confirmDate("checkout")}
//                 >
//                   <Text style={styles.modalButtonText}>Xác nhận</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </Modal>

//         <View style={styles.inputContainer}>
//           <Icon name="building" size={24} color="#0090FF" />
//           <Text style={styles.inputText}>0 Người lớn, 0 Trẻ em, 0 Phòng</Text>
//           <Icon
//             name="angle-down"
//             size={20}
//             color="#0090FF"
//             style={styles.arrowIcon}
//           />
//         </View>

//         <TouchableOpacity
//           style={styles.newButton}
//           onPress={() => handleFilterHotel()}
//         >
//           <Text style={styles.newButtonText}> Tìm kiếm </Text>
//         </TouchableOpacity>

//         {/* Recent Searches Section */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>TIẾP TỤC TÌM KIẾM CỦA BẠN</Text>
//             <TouchableOpacity>
//               <Text style={styles.viewAllText}>XEM TẤT CẢ</Text>
//             </TouchableOpacity>
//           </View>
//           <View>
//             <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//               <View
//                 style={[
//                   styles.twoRowScrollView,
//                   { width: WidthtwoRowScrollView },
//                 ]}
//               >
//                 {continueSearch?.map((item, index) => (
//                   <View key={index} style={styles.recentSearchItem}>
//                     <Image
//                       source={{ uri: `${item.image}` }}
//                       style={styles.recentSearchImage}
//                     />
//                     <View style={styles.recentSearchDetails}>
//                       <Text style={styles.recentSearchText}>{item.name}</Text>
//                       <Text style={styles.recentSearchSubText}>
//                         {item.details}
//                       </Text>
//                     </View>
//                   </View>
//                 ))}
//               </View>
//             </ScrollView>
//           </View>
//         </View>

//         {/* Weekend Deals Section */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>ƯU ĐÃI CUỐI TUẦN</Text>
//             <TouchableOpacity>
//               <Text style={styles.viewAllText}>XEM TẤT CẢ</Text>
//             </TouchableOpacity>
//           </View>
//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//             {hotelList &&
//               hotelList.map((item, index) => (
//                 <HotelRequestList key={index} item={item} />
//               ))}
//           </ScrollView>
//         </View>

//         {open.Modal_1 && (
//           <ModalLocationList
//             position={modalPosition}
//             onClose={() => handleCloseModal("Modal_1")}
//             onSelect={(locationId) =>
//               setInforFilter({ ...inforFilter, locationId })
//             }
//           />
//         )}

//         <View>
//           <Text>{"\n\n"}</Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default HomeScreen;

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 15,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   body: {
//     flex: 1,
//   },
//   hotelLabelContainer: {
//     paddingHorizontal: 15,
//     marginTop: 10,
//   },
//   hotelLabel: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//     borderRadius: 10,
//     padding: 15,
//     marginHorizontal: 15,
//     marginVertical: 5,
//   },
//   inputText: {
//     flex: 1,
//     marginLeft: 10,
//     fontSize: 16,
//     color: "#333",
//   },
//   arrowIcon: {
//     marginLeft: 10,
//   },
//   newButton: {
//     backgroundColor: "#0090FF",
//     borderRadius: 10,
//     padding: 15,
//     marginHorizontal: 15,
//     marginVertical: 10,
//     alignItems: "center",
//   },
//   newButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   section: {
//     marginTop: 20,
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 15,
//     marginBottom: 10,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   viewAllText: {
//     color: "#0090FF",
//     fontSize: 14,
//   },
//   twoRowScrollView: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
//   recentSearchItem: {
//     width: 200,
//     marginHorizontal: 5,
//     marginVertical: 5,
//     borderRadius: 10,
//     backgroundColor: "#f5f5f5",
//   },
//   recentSearchImage: {
//     width: "100%",
//     height: 100,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
//   recentSearchDetails: {
//     padding: 10,
//   },
//   recentSearchText: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   recentSearchSubText: {
//     fontSize: 14,
//     color: "#666",
//   },
//   dealItem: {
//     width: 250,
//     marginHorizontal: 5,
//     borderRadius: 10,
//     backgroundColor: "#fff",
//     elevation: 3,
//   },
//   dealImage: {
//     width: "100%",
//     height: 150,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
//   dealDetails: {
//     padding: 10,
//   },
//   dealName: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   dealReviews: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 5,
//   },
//   iconStart: {
//     marginRight: 5,
//   },
//   dealPoint: {
//     fontSize: 14,
//     fontWeight: "bold",
//     marginRight: 5,
//   },
//   dealReviewsText: {
//     fontSize: 14,
//     color: "#666",
//   },
//   dealDesc: {
//     fontSize: 14,
//     color: "#666",
//   },
//   dealFooter: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 10,
//   },
//   dealSale: {
//     backgroundColor: "#FF6347",
//     color: "#fff",
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   dealPrice: {
//     fontSize: 16,
//     fontWeight: "bold",
//     flex: 1,
//   },
//   dealBooking: {
//     color: "#0090FF",
//     fontSize: 14,
//     fontWeight: "bold",
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   datePickerContainer: {
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 20,
//     width: "90%",
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 15,
//     textAlign: "center",
//   },
//   pickerContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   picker: {
//     flex: 1,
//     height: 150,
//   },
//   modalButtons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
//   modalButton: {
//     backgroundColor: "#f5f5f5",
//     padding: 10,
//     borderRadius: 5,
//     flex: 1,
//     marginHorizontal: 5,
//     alignItems: "center",
//   },
//   confirmButton: {
//     backgroundColor: "#0090FF",
//   },
//   modalButtonText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//   },
// });

const test = {
  statusCode: 200,
  message: "Home page successfully",
  data: [
    {
      historySearchList: [
        {
          locationId: 1,
          location: "Đà Nẵng",
          checkIn: "2025-04-18",
          checkOut: "2025-04-18",
          adults: 1,
          children: 0,
          rooms: 1,
        },
      ],
      hotelRequestList: [
        {
          hotelId: 1,
          hotelName: "Heden Golf",
          hotelLocation: "Đà Nẵng",
          hotelRating: 3.9,
          imageUrl:
            "https://res.cloudinary.com/dt7eo0hbq/image/upload/v1729242714/Room/luanwjwaiavziqz94mqu.jpg",
          sumReview: 85,
          promotionName: "Ưu đãi đầu năm 2025",
          price: 800000.0,
        },
        {
          hotelId: 2,
          hotelName: "Onomo",
          hotelLocation: "Đà Nẵng",
          hotelRating: 4.3,
          imageUrl:
            "https://res.cloudinary.com/dt7eo0hbq/image/upload/v1729241122/Room/nipyn0qgyoyhtgkadlyi.jpg",
          sumReview: 150,
          promotionName: "Ưu đãi đầu năm 2025",
          price: 950000.0,
        },
      ],
    },
  ],
};
