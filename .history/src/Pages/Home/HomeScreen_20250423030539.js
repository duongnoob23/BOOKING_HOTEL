import React, { cloneElement, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  Button,
  Modal,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { FlatList } from "react-native";
import { API_BASE_URL } from "../../Constant/Constant";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import {
  fetchAmenityList,
  fetchHotelById,
  fetchHotelByLocation,
  fetchHotelList,
  fetchLocationList,
  fetchServiceList,
  updateTempFilter,
  applyFilter,
} from "../../Redux/Slice/hotelSlice";
import ModalLocationList from "../../Components/Modal/Home/ModalLocationList";
import cloneDeep from "lodash/cloneDeep";
import { Picker } from "@react-native-picker/picker";
import ModalCheckIn from "../../Components/Modal/Home/ModalCheckIn";
import ModalCheckOut from "../../Components/Modal/Home/ModalCheckOut";
import ModalGuestsAndRooms from "../../Components/Modal/Home/ModalGuestsAndRooms";
import { skeletonLoading } from "../../Redux/Slice/hotelSlice";
import { updateFilter } from "../../Redux/Slice/hotelSlice";
import { fetchListService } from "../../Redux/Slice/serviceSlice";
import { fetchUserInfo } from "../../Redux/Slice/authSlice";
import ReusableModal from "../../Components/Modal/FlexibleModal/ReusableModal";
import ModalBookingCancelled from "../../Components/Modal/Booking/ModalBookingCancelled";

const HomeScreen = ({ navigation }) => {
  const {
    hotelHistorySearch,
    hotelList,
    locationList,
    hotelDetail,
    hotelByLocation,
    loading,
    error,
    inforFilter,
  } = useAppSelector((state) => state.hotel);

  const { infoUser } = useAppSelector((state) => state.auth);

  const [open, setOpen] = useState({
    Modal_1: false,
    Modal_CheckIn: false,
    Modal_CheckOut: false,
    Modal_GuestsAndRooms: false,
  });

  const [modalPosition, setModalPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const [modalVisible, setModalVisible] = useState(true);
  const [modalType, setModalType] = useState("error");

  const continueSearch = hotelHistorySearch;

  const [selectDay, setSelectDay] = useState({
    day: 4,
    month: 4,
    year: 2025,
  });

  const dispatch = useAppDispatch();

  // Hiển thị lỗi từ Redux
  useEffect(() => {
    if (error) {
      console.error("Redux error:", error);
      Alert.alert("Lỗi", error);
    }
  }, [error]);

  // Gọi các API riêng lẻ với try-catch
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchServiceList()).unwrap();
        console.log("Fetched service list successfully");
      } catch (err) {
        console.error("Error fetching service list:", err);
        Alert.alert("Lỗi", "Không thể tải danh sách dịch vụ");
      }

      try {
        await dispatch(fetchAmenityList()).unwrap();
        console.log("Fetched amenity list successfully");
      } catch (err) {
        console.error("Error fetching amenity list:", err);
        Alert.alert("Lỗi", "Không thể tải danh sách tiện nghi");
      }

      try {
        await dispatch(fetchHotelList()).unwrap();
        console.log("Fetched hotel list successfully");
      } catch (err) {
        console.error("Error fetching hotel list:", err);
        Alert.alert("Lỗi", "Không thể tải danh sách khách sạn");
      }

      try {
        await dispatch(fetchLocationList()).unwrap();
        console.log("Fetched location list successfully");
      } catch (err) {
        console.error("Error fetching location list:", err);
        Alert.alert("Lỗi", "Không thể tải danh sách địa điểm");
      }
    };

    fetchData();
  }, [dispatch]);

  const handleToHotelDetails = async (item) => {
    try {
      if (!item?.hotelId) {
        throw new Error("Không tìm thấy ID khách sạn");
      }
      console.log("Fetching hotel details for ID:", item.hotelId);
      await dispatch(fetchHotelById(item.hotelId)).unwrap();
      navigation.navigate("HotelDetails", { item });
    } catch (err) {
      console.error("Error fetching hotel details:", err);
      Alert.alert("Lỗi", err.message || "Không thể lấy chi tiết khách sạn");
    }
  };

  const HotelRequestList = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.dealItem}
        onPress={() => handleToHotelDetails(item)}
      >
        <View style={styles.dealImage}>
          {item?.imageUrl && (
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
          )}
        </View>
        <View style={styles.dealDetails}>
          {item?.hotelName && (
            <Text style={styles.dealName}>{item.hotelName}</Text>
          )}
          <View style={styles.dealReviews}>
            <Icon
              style={styles.iconStart}
              name="star"
              size={24}
              color="#EBA731"
            />
            {item?.hotelRating && (
              <Text style={styles.dealPoint}>{item.hotelRating}</Text>
            )}
            {item?.sumReview && (
              <Text style={styles.dealReviewsText}>
                Đánh giá ({item.sumReview})
              </Text>
            )}
          </View>
          {item?.promotionName && (
            <Text style={styles.dealDesc}>{item.promotionName}</Text>
          )}
          <View style={styles.dealFooter}>
            <Text style={styles.dealSale}>Giảm 25%</Text>
            {item?.price && <Text style={styles.dealPrice}>{item.price}</Text>}
            <TouchableOpacity>
              <Text style={styles.dealBooking}>Đặt ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const inputContainerRef = useRef(null);

  const handleOpenModal = (name) => {
    try {
      const open_ = cloneDeep(open);
      open_[name] = true;
      setOpen(open_);

      if (inputContainerRef.current) {
        inputContainerRef.current.measure((fx, fy, width, height, px, py) => {
          setModalPosition({ top: py + 2 * height, left: 0, width: "100%" });
        });
      }
    } catch (err) {
      console.error("Error opening modal:", err);
      Alert.alert("Lỗi", "Không thể mở modal");
    }
  };

  const handleCloseModal = (name) => {
    try {
      const open_ = cloneDeep(open);
      open_[name] = false;
      setOpen(open_);
    } catch (err) {
      console.error("Error closing modal:", err);
      Alert.alert("Lỗi", "Không thể đóng modal");
    }
  };

  const WidthtwoRowScrollView =
    210 * Math.ceil((continueSearch?.length || 0) / 2);

  const handleModalCheck = (name, value) => {
    try {
      const open_ = cloneDeep(open);
      open_[name] = value;

      if (name === "Modal_CheckIn" || name === "Modal_CheckOut") {
        const day =
          inforFilter?.[name === "Modal_CheckIn" ? "checkin" : "checkout"];
        if (day && typeof day === "string" && day.includes("-")) {
          const parts = day.split("-");
          if (parts.length === 3) {
            setSelectDay({
              day: +parts[2],
              month: +parts[1],
              year: +parts[0],
            });
          } else {
            throw new Error("Định dạng ngày không hợp lệ");
          }
        }
      }

      setOpen(open_);
    } catch (err) {
      console.error("Error handling modal check:", err);
      Alert.alert("Lỗi", err.message || "Không thể xử lý modal");
    }
  };

  const formatToYYYYMMDD = (date) => {
    try {
      if (!(date instanceof Date) || isNaN(date)) {
        throw new Error("Ngày không hợp lệ");
      }
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    } catch (err) {
      console.error("Error formatting date:", err);
      Alert.alert("Lỗi", "Không thể định dạng ngày tháng");
      return "";
    }
  };

  const handleConfirmDate = (name) => {
    try {
      const formattedDate = `${selectDay.year}-${String(
        selectDay.month
      ).padStart(2, "0")}-${String(selectDay.day).padStart(2, "0")}`;

      if (name === "checkin") {
        const today = new Date();
        const dateToday = formatToYYYYMMDD(today);
        const date1 = new Date(dateToday);
        const date2 = new Date(formattedDate);
        if (date2 < date1) {
          Alert.alert("Ngày CheckIn phải lớn hơn ngày hiện tại");
          return;
        }
      } else if (inforFilter?.checkin) {
        const date1 = new Date(inforFilter.checkin);
        const date2 = new Date(formattedDate);
        if (isNaN(date1) || isNaN(date2)) {
          throw new Error("Ngày không hợp lệ");
        }
        if (date2 <= date1) {
          Alert.alert("Ngày CheckOut phải lớn hơn ngày CheckIn");
          return;
        }
      } else {
        throw new Error("Ngày check-in không tồn tại");
      }

      dispatch(updateFilter({ ...inforFilter, [name]: formattedDate }));
      const nameModal = name === "checkin" ? "Modal_CheckIn" : "Modal_CheckOut";
      handleModalCheck(nameModal, false);
    } catch (err) {
      console.error("Error confirming date:", err);
      Alert.alert("Lỗi", err.message || "Không thể xác nhận ngày tháng");
    }
  };

  const handleFilterHotel = async () => {
    try {
      dispatch(skeletonLoading());
      console.log("Fetching hotels by location with filter:", inforFilter);
      await dispatch(fetchHotelByLocation(inforFilter)).unwrap();
      navigation.navigate("ListHotelLocation");
    } catch (err) {
      console.error("Error filtering hotels:", err);
      Alert.alert("Lỗi", err.message || "Không thể lọc khách sạn");
    }
  };

  const handleToInfoConfirm = () => {
    try {
      navigation.navigate("TestModal");
    } catch (err) {
      console.error("Error navigating to TestModal:", err);
      Alert.alert("Lỗi", "Không thể điều hướng đến TestModal");
    }
  };

  const handleContinueSearch = async (item) => {
    try {
      if (!item?.locationId) {
        throw new Error("Không tìm thấy ID địa điểm");
      }
      const inforFilter_ = {
        locationId: item.locationId,
        checkin: item?.checkIn,
        checkout: item?.checkOut,
        adults: item?.adults,
        children: item?.children,
        amenityIds: [],
        serviceIds: [],
        sortById: 1,
      };
      dispatch(skeletonLoading());
      console.log("Continuing search with filter:", inforFilter_);
      await dispatch(fetchHotelByLocation(inforFilter_)).unwrap();
      navigation.navigate("ListHotelLocation");
    } catch (err) {
      console.error("Error continuing search:", err);
      Alert.alert("Lỗi", err.message || "Không thể tiếp tục tìm kiếm");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tìm Phòng</Text>
        <TouchableOpacity onPress={handleToInfoConfirm}>
          <Icon name="filter" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.body} scrollEnabled={!open.Modal_1}>
        <View style={styles.hotelLabelContainer}>
          <Text style={styles.hotelLabel}>Khách Sạn</Text>
        </View>
        <TouchableOpacity
          style={styles.inputContainer}
          ref={inputContainerRef}
          onPress={() => handleOpenModal("Modal_1")}
        >
          <Icon name="map-marker" size={24} color="#0090FF" />
          <Text style={styles.inputText}>
            {inforFilter?.locationId &&
            inforFilter.locationId !== "0" &&
            locationList?.length > 0
              ? locationList.find(
                  (item) => item?.id?.toString() === inforFilter.locationId
                )?.name
              : "Bạn muốn ở đâu"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => handleModalCheck("Modal_CheckIn", true)}
        >
          <Icon name="calendar" size={24} color="#0090FF" />
          {inforFilter?.checkin && (
            <Text style={styles.inputText}>{inforFilter.checkin}</Text>
          )}
          <Icon
            name="angle-down"
            size={20}
            color="#0090FF"
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => handleModalCheck("Modal_CheckOut", true)}
        >
          <Icon name="calendar" size={24} color="#0090FF" />
          {inforFilter?.checkout && (
            <Text style={styles.inputText}>{inforFilter.checkout}</Text>
          )}
          <Icon
            name="angle-down"
            size={20}
            color="#0090FF"
            style={styles.arrowIcon}
          />
        </TouchableOpacity>

        <ModalCheckIn
          visible={open.Modal_CheckIn}
          onClose={handleModalCheck}
          selectDay={selectDay}
          setSelectDay={setSelectDay}
          confirm={handleConfirmDate}
        />
        <ModalCheckOut
          visible={open.Modal_CheckOut}
          onClose={handleModalCheck}
          selectDay={selectDay}
          setSelectDay={setSelectDay}
          confirm={handleConfirmDate}
        />
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => handleModalCheck("Modal_GuestsAndRooms", true)}
        >
          <Icon name="building" size={24} color="#0090FF" />
          {inforFilter?.adults &&
            inforFilter?.children &&
            inforFilter?.roomNumber && (
              <Text style={styles.inputText}>
                {inforFilter.adults} Người lớn, {inforFilter.children} Trẻ em,{" "}
                {inforFilter.roomNumber} Phòng
              </Text>
            )}
          <Icon
            name="angle-down"
            size={20}
            color="#0090FF"
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <ModalGuestsAndRooms
          visible={open.Modal_GuestsAndRooms}
          onClose={handleModalCheck}
        />
        <TouchableOpacity style={styles.newButton} onPress={handleFilterHotel}>
          <Text style={styles.newButtonText}>Tìm kiếm</Text>
        </TouchableOpacity>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>TIẾP TỤC TÌM KIẾM CỦA BẠN</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>XEM TẤT CẢ</Text>
            </TouchableOpacity>
          </View>
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={[
                  styles.twoRowScrollView,
                  { width: WidthtwoRowScrollView },
                ]}
              >
                {continueSearch?.length > 0 &&
                  continueSearch.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => handleContinueSearch(item)}
                      key={index}
                      style={styles.recentSearchItem}
                    >
                      {item?.image && (
                        <Image
                          source={{ uri: item.image }}
                          style={styles.recentSearchImage}
                        />
                      )}
                      <View style={styles.recentSearchDetails}>
                        {item?.location && (
                          <Text style={styles.recentSearchText}>
                            {item.location}
                          </Text>
                        )}
                        {item?.checkIn &&
                          item?.checkOut &&
                          item?.adults &&
                          item?.children && (
                            <Text style={styles.recentSearchSubText}>
                              Từ {item.checkIn} đến {item.checkOut},{" "}
                              {item.adults} Người lớn, {item.children} Trẻ em
                            </Text>
                          )}
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>
            </ScrollView>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>ƯU ĐÃI CUỐI TUẦN</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>XEM TẤT CẢ</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {hotelList?.length > 0 &&
              hotelList.map((item, index) => (
                <HotelRequestList key={index} item={item} />
              ))}
          </ScrollView>
        </View>
        <View style={styles.lastSection}></View>
        {open.Modal_1 && (
          <ModalLocationList
            position={modalPosition}
            onClose={() => handleCloseModal("Modal_1")}
            onSelect={(locationId) =>
              dispatch(updateFilter({ ...inforFilter, locationId }))
            }
          />
        )}
        <View>
          <Text>{"\n\n"}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

// const styles = StyleSheet.create({});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#E0E0E0",
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    color: "#000000",
  },
  body: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  hotelLabelContainer: {
    backgroundColor: "#0090FF",
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 10,
  },
  hotelLabel: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    position: "relative",
    // borderWidth: 1,
    // borderColor: "#E0E0E0",
    // borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginTop: 8,
  },
  inputText: {
    flex: 1,
    marginLeft: 15,
    color: "black",
    fontWeight: "400",
    fontSize: 18,
  },
  arrowIcon: {
    marginLeft: 10,
  },
  newButton: {
    backgroundColor: "#00F598",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },

  newButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: 400,
  },
  searchButton: {
    backgroundColor: "black",
  },
  section: {
    marginTop: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "gray",
    textTransform: "uppercase",
  },
  viewAllText: {
    fontSize: 14,
    color: "#007AFF",
  },
  twoRowScrollView: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  recentSearchItem: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    alignItems: "center",
    width: 250,
    height: 70,
    marginBottom: 10,
  },
  recentSearchImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  recentSearchDetails: {
    marginLeft: 10,
    flex: 1,
  },
  recentSearchText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
  },
  recentSearchSubText: {
    fontSize: 10,
    color: "#666666",
    marginTop: 2,
  },
  dealItem: {
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginRight: 10,
    width: 250,
    backgroundColor: "#EFEFEF",
  },
  dealImage: {
    width: 250,
    height: 150,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 240,
    height: 140,
    borderRadius: 5,
  },
  dealDetails: {
    marginLeft: 8,
    marginRight: 10,
    width: "100%",
  },
  dealName: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 5,
    marginBottom: 5,
    color: "black",
  },
  dealReviews: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 5,
  },
  iconStart: {
    marginRight: 10,
  },
  dealPoint: {
    color: "red",
    fontWeight: "400",
    marginRight: 10,
    fontSize: 12,
  },

  dealReact: {
    fontSize: 12,
  },
  dealReviewsText: {
    fontSize: 12,
  },
  dealLocation: {
    color: "black",
    marginRight: 12,
  },
  dealLocationName: {
    fontSize: 12,
  },
  dealFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 10,
  },
  dealSale: {
    color: "#EBA731",
    fontWeight: "bold",
    fontSize: 14,
  },
  dealPrice: {
    fontWeight: "600",
    fontSize: 14,
  },
  dealDesc: {
    fontSize: 12,
    fontWeight: 400,
    marginBottom: 5,
  },
  dealBooking: {
    fontSize: 14,
    fontWeight: 400,
    borderRadius: 10,
    backgroundColor: "#00F598",
    color: "white",
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  dealText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 5,
    textAlign: "center",
  },
  searchButton: {
    marginVertical: 15,
    borderRadius: 8,
    overflow: "hidden", // Đảm bảo gradient không bị cắt bởi borderRadius
  },
  gradientButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  searchButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    // flex: 1,
    // backgroundColor: "rgba(0, 0, 0, 0.5)", // Nền mờ
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    maxHeight: "800",
  },
  modalContent: {
    backgroundColor: "white",
    width: "80%",
    borderRadius: 10,
    padding: 20,
    maxHeight: "60%", // Giới hạn chiều cao của modal
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  locationText: {
    fontSize: 16,
    marginLeft: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#0090FF",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  datePickerContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "90%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  picker: {
    flex: 1,
    height: 150,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#0090FF",
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  lastSection: {
    // marginBottom: 20,
    // paddingBottom: 50,
  },
});

//  const getData = async () => {
//    try {
//      const response = await fetch(`${API_BASE_URL}/api/hotel/home`, {
//        method: "GET",
//        headers: {
//          "Content-Type": "application/json",
//        },
//      });
//      if (response) {
//        const data = await response.json();
//        // console.log("Dữ liệu từ API:", data);
//        // console.log(data.data[0].hotelRequestList);
//        setHotelRequestList(data.data[0].hotelRequestList);
//      } else {
//      }
//    } catch (error) {
//      console.error("Lỗi khi gọi API:", error);
//    }
//  };

{
  /* <Modal
            animationType="slide"
            transparent={true}
            visible={open.Modal_1}
            onRequestClose={() => handleCloseModal("Modal_1")} 
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Chọn địa điểm</Text>

                <FlatList
                  data={locations}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.locationItem}
                      onPress={() => {
                      
                        setInforFilter({
                          ...inforFilter,
                          locationId: item.id.toString(),
                        });
                        handleCloseModal("Modal_1");
                      }}
                    >
                      <Icon name="map-marker" size={24} color="#0090FF" />
                      <Text style={styles.locationText}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => handleCloseModal("Modal_1")}
                >
                  <Text style={styles.closeButtonText}>Đóng</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal> */
}

{
  /* {open.Modal_1 && (
          <TouchableWithoutFeedback onPress={() => handleCloseModal("Modal_1")}>
            <View style={styles.overlay}>
              <TouchableWithoutFeedback>
                <ModalLocationList
                  onClose={() => handleCloseModal("Modal_1")}
                  onSelect={(locationId) =>
                    setInforFilter({ ...inforFilter, locationId })
                  }
                />
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        )} */
}
