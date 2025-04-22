import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyVouchers,
  clearVoucherStatus,
} from "../../Redux/Slice/voucherSlice"; // Thay bằng đường dẫn thực tế
import { useAppDispatch, useAppSelector } from "../../Redux/hook";

const PersonalVoucher = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { accessToken, isLoggedIn } = useAppSelector((state) => state.auth);
  const { myVouchers, loading, error } = useAppSelector(
    (state) => state?.voucher
  );
  const [activeTab, setActiveTab] = useState("unused");

  // Gọi API khi component mount
  useEffect(() => {
    if (isLoggedIn && accessToken) {
      dispatch(fetchMyVouchers());
    }
  }, [dispatch, isLoggedIn, accessToken]);

  // Xử lý thông báo lỗi
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearVoucherStatus());
    }
  }, [error, dispatch]);

  // Ẩn/hiện tabBar
  useLayoutEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
    return () => {
      navigation.getParent().setOptions({ tabBarStyle: { display: "flex" } });
    };
  }, [navigation]);

  const handleToVoucherDetail = (voucher) => {
    navigation.navigate("VoucherDetail", { voucher });
  };
  const handleToHome = (item) => {
    if (item.status === "unused") {
      // console.log("Current nav state: ", navigation.getState());
      navigation.reset({
        index: 0,
        routes: [{ name: "Profile" }],
      });
      navigation.navigate("Home");
    } else {
      console.log("Voucher đã dùng/đã hết hạn");
    }
  };

  const voucherData =
    activeTab === "unused"
      ? myVouchers?.unused
      : activeTab === "used"
      ? myVouchers?.used
      : myVouchers?.expired;

  const renderVoucher = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleToVoucherDetail(item)}
      style={[
        styles.voucherItem,
        activeTab === "expired" && styles.expiredVoucher,
      ]}
    >
      <View style={styles.iconContainer}>
        <View
          style={[
            styles.voucherIconContainer,
            { backgroundColor: item?.iconBackground },
          ]}
        >
          <Text style={styles.voucherIcon}>V</Text>
        </View>
      </View>
      <View style={styles.voucherContent}>
        <View style={styles.voucherContentLeft}>
          <Text style={styles.voucherTitle}>{item?.title}</Text>
          {item?.condition ? (
            <Text style={styles.voucherCondition}>{item?.condition}</Text>
          ) : null}
          <Text style={styles.voucherExpiry}>{item?.expiry}</Text>
          <View style={styles.voucherActions}>
            {/* <TouchableOpacity>
              <Text style={styles.conditionText}>Điều kiện</Text>
            </TouchableOpacity> */}
          </View>
        </View>
        <View style={styles.voucherContentRight}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              item?.status === "unused"
                ? styles.actionButtonUnused
                : styles.actionButtonUsed,
            ]}
            onPress={() => handleToHome(item)}
          >
            <Text style={styles.actionButtonText}>
              {item?.status === "unused"
                ? "Dùng ngay"
                : item?.status === "used"
                ? "Đã dùng"
                : "Hết hạn"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Lỗi: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {["unused", "used", "expired"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab === "unused"
                ? "Có thể sử dụng"
                : tab === "used"
                ? "Đã dùng"
                : "Đã hết hạn"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={voucherData}
        renderItem={renderVoucher}
        keyExtractor={(item) => item?.id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {activeTab === "unused"
                ? "Không có voucher nào có thể sử dụng."
                : activeTab === "used"
                ? "Không có voucher nào đã dùng."
                : "Không có voucher nào đã hết hạn."}
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default PersonalVoucher;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#007AFF",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  voucherItem: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden",
  },
  expiredVoucher: {
    opacity: 0.5,
  },
  iconContainer: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  voucherIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFF",
    borderStyle: "dashed",
  },
  voucherIcon: {
    fontSize: 30,
    color: "#FFF",
    fontWeight: "bold",
  },
  voucherContent: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 12,
    flexDirection: "row",
  },
  voucherContentLeft: {
    width: "70%",
  },
  voucherContentRight: {
    justifyContent: "center",
    alignItems: "center",
  },
  voucherTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 4,
  },
  voucherCondition: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  voucherExpiry: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  voucherActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  conditionText: {
    fontSize: 12,
    color: "#00A4E8",
    fontWeight: "500",
  },
  actionButton: {
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionButtonUnused: {
    backgroundColor: "#46BFE0",
  },
  actionButtonUsed: {
    backgroundColor: "#CCCCCC",
  },
  actionButtonText: {
    fontSize: 12,
    color: "#FFF",
    fontWeight: "bold",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
