import React, { useLayoutEffect, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Color from "color";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSystemVouchers,
  fetchRanks,
  saveVoucher,
  fetchMyVouchers,
  clearVoucherStatus,
} from "../../Redux/Slice/voucherSlice";

const RewardMember = ({ navigation }) => {
  const dispatch = useDispatch();
  const { accessToken, isLoggedIn } = useSelector((state) => state.auth);
  const {
    systemVouchers,
    myVouchers,
    ranks,
    user,
    loading,
    error,
    successSave,
  } = useSelector((state) => state.voucher);
  const [activeTab, setActiveTab] = useState("Overview");

  // Gọi API khi component mount
  useEffect(() => {
    if (isLoggedIn && accessToken) {
      dispatch(fetchSystemVouchers());
      dispatch(fetchMyVouchers());
      dispatch(fetchRanks());
    }
  }, [dispatch, isLoggedIn, accessToken]);

  // Xử lý thông báo khi lưu voucher
  useEffect(() => {
    if (successSave) {
      alert(successSave); // Có thể thay bằng ToastAndroid hoặc thư viện khác
      dispatch(clearVoucherStatus());
    }
    if (error) {
      alert(error);
      dispatch(clearVoucherStatus());
    }
  }, [successSave, error, dispatch]);

  // Ẩn/hiện tabBar
  useLayoutEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
    return () => {
      navigation.getParent().setOptions({ tabBarStyle: { display: "flex" } });
    };
  }, [navigation]);

  // Tính toán userRank
  const userRank = useMemo(
    () =>
      [...ranks]
        .reverse()
        .find(
          (rank) =>
            user.Orders >= rank.minOrders && user.Spend >= rank.minSpending
        ) ||
      ranks[0] || {
        name: "Đồng",
        color: "#d3a652",
        minOrders: 0,
        minSpending: 0,
      },
    [ranks, user]
  );

  const currentRankIndex = ranks.findIndex(
    (rank) => rank.name === userRank.name
  );

  const nextRank = ranks[currentRankIndex + 1];
  let progressOrders = 100;
  let progressSpend = 100;
  if (nextRank) {
    progressOrders = Math.min((user.Orders / nextRank.minOrders) * 100, 100);
    progressSpend = Math.min((user.Spend / nextRank.minSpending) * 100, 100);
  }

  // Tạo danh sách ID của myVouchers để kiểm tra
  const myVouchersIds = useMemo(() => {
    return [
      ...myVouchers?.unused,
      ...myVouchers?.used,
      ...myVouchers?.expired,
    ].map((voucher) => voucher.id);
  }, [myVouchers]);

  const handleToVoucherDetail = (voucher) => {
    navigation.navigate("VoucherDetail", { voucher });
  };

  const handleSaveVoucher = (voucherId) => {
    dispatch(saveVoucher(voucherId));
  };

  const renderRank = ({ item }) => (
    <View
      style={[
        styles.rankItem,
        { borderColor: item.color },
        userRank.name === item.name && styles.currentRank,
      ]}
    >
      <Text style={[styles.rankName, { color: item.color }]}>{item.name}</Text>
      <Text style={styles.rankCondition}>
        {`Đặt thành công ≥ ${
          item.minOrders
        } | Chi tiêu ≥ ${item.minSpending.toLocaleString()} VND`}
      </Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const renderVoucher = ({ item }) => {
    const isSaved = myVouchersIds.includes(String(item.id)); // Kiểm tra coupon đã lưu

    return (
      <TouchableOpacity
        style={styles.voucherItem}
        onPress={() => handleToVoucherDetail(item)}
      >
        <View style={styles.iconContainer}>
          <View
            style={[
              styles.voucherIconContainer,
              { backgroundColor: item.iconBackground || "#ccc" },
            ]}
          >
            <Text style={styles.voucherIcon}>S</Text>
          </View>
        </View>
        <View style={styles.voucherContent}>
          <View style={styles.voucherContentLeft}>
            <Text style={styles.voucherTitle}>{item.description}</Text>
            <Text style={styles.voucherExpiry}>{item.code}</Text>
            <Text style={styles.voucherExpiry}>{item.expirationDate}</Text>
          </View>
          <View style={styles.voucherContentRight}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                isSaved ? styles.actionButtonSaved : styles.actionButtonNormal,
              ]}
              onPress={() => !isSaved && handleSaveVoucher(item.id)}
              disabled={isSaved}
            >
              <Text style={styles.actionButtonText}>
                {isSaved ? "Đã lưu" : "Lưu"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderOverview = () => (
    <View style={styles.overviewContainer}>
      <View
        style={[
          styles.pointsCard,
          { backgroundColor: Color(userRank.color).hex() },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center -between",
          }}
        >
          <Text style={styles.pointsLabel}>Thứ hạng</Text>
          <Text
            style={[
              styles.pointsRank,
              { backgroundColor: Color(userRank.color).lighten(0.1).hex() },
            ]}
          >
            {userRank.name}
          </Text>
        </View>

        <View style={styles.progressRow}>
          <View style={styles.progressBox}>
            <Text style={styles.progressTitle}>Đặt thành công</Text>
            <Text style={styles.progressStatus}>
              {user.Orders}/{nextRank?.minOrders || user.Orders}
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${progressOrders}%`,
                    backgroundColor: Color(userRank.color).lighten(0.5).hex(),
                  },
                ]}
              />
            </View>
          </View>

          <View style={styles.progressBox}>
            <Text style={styles.progressTitle}>Chi tiêu</Text>
            <Text style={styles.progressStatus}>
              {user.Spend.toLocaleString()} /
              {nextRank?.minSpending.toLocaleString() ||
                user.Spend.toLocaleString()}
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${progressSpend}%`,
                    backgroundColor: Color(userRank.color).lighten(0.5).hex(),
                  },
                ]}
              />
            </View>
          </View>
        </View>

        <Text style={styles.updateNote}>
          Thứ hạng sẽ được cập nhật lại sau 30.06.2025
        </Text>
      </View>

      <View style={styles.voucherSection}>
        <Text style={styles.sectionTitle}>Ưu đãi từ hệ thống</Text>
        <FlatList
          data={systemVouchers && systemVouchers}
          renderItem={renderVoucher}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.voucherList}
        />
      </View>
    </View>
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
        {["Overview", "Rating"].map((tab) => (
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
              {tab === "Overview" ? "Tổng quan" : "Xếp hạng"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === "Overview" && renderOverview()}

      {activeTab === "Rating" && (
        <View style={styles.ranksContainer}>
          <FlatList
            data={ranks}
            renderItem={renderRank}
            keyExtractor={(item) => item.name}
            contentContainerStyle={styles.ranksList}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  userInfo: {
    padding: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  tabContainer: {
    flexDirection: "row",
    margin: 16,
    marginBottom: 0,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#DDD",
  },
  activeTab: {
    borderBottomColor: "#007AFF",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  overviewContainer: {
    flex: 1,
  },
  pointsCard: {
    padding: 16,
    borderRadius: 12,
    margin: 16,
    marginBottom: 8,
  },
  pointsLabel: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  pointsRank: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    color: "#fff",
    fontWeight: "600",
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  progressBox: {
    width: "48%",
  },
  progressTitle: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
  },
  progressStatus: {
    color: "#fff",
    fontSize: 12,
    marginBottom: 6,
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  updateNote: {
    marginTop: 12,
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
  voucherSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  voucherList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  voucherItem: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginVertical: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden",
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
  voucherExpiry: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  actionButton: {
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionButtonNormal: {
    backgroundColor: "#EE4D2D",
  },
  actionButtonSaved: {
    backgroundColor: "#CCCCCC",
  },
  actionButtonText: {
    fontSize: 12,
    color: "#FFF",
    fontWeight: "bold",
  },
  ranksContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  ranksList: {
    paddingBottom: 16,
  },
  rankItem: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  currentRank: {
    backgroundColor: "#F0F0F0",
  },
  rankName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  rankCondition: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  description: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
});

export default RewardMember;
