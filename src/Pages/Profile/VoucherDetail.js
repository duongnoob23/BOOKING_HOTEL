import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const FAKE_VOUCHERS = [
  {
    id: "1",
    code: "SUMMER25",
    type: "PERCENTAGE",
    expiry: "2025-04-30 17:40:08",
    quantity: 100,
    isActive: true,
    discountValue: 25.0,
    minOrderValue: 2000000.0,
    createdAt: "2025-04-04 17:40:54",
    maxDiscount: 50000,
    description: "Giảm giá 25% với những hóa đơn trên 2 triệu đồng",
    rank: null,
  },
  {
    id: "2",
    code: "WELCOME100",
    type: "FIXED",
    expiry: "2025-04-27 17:42:36",
    quantity: 100,
    isActive: true,
    discountValue: 100000.0,
    minOrderValue: 0.0,
    createdAt: "2025-04-04 17:43:01",
    maxDiscount: 0,
    description: "Giảm ngay 100.000đ với hóa đơn đầu tiên",
    rank: null,
  },
  {
    id: "3",
    code: "DONG10P",
    type: "PERCENTAGE",
    expiry: "2025-12-31 00:00:00",
    quantity: 100,
    isActive: true,
    discountValue: 10.0,
    minOrderValue: 300000.0,
    createdAt: "2025-04-19 00:00:00",
    maxDiscount: 0,
    description: "Giảm 10% cho đơn đầu tiên - hạng Đồng",
    rank: "Đồng",
  },
];

const VoucherDetail = ({ navigation }) => {
  const voucher = FAKE_VOUCHERS[0]; // Sử dụng voucher đầu tiên trong danh sách giả

  const applicableProducts =
    "Áp dụng trên app cho một số sản phẩm tham gia chương trình. Không áp dụng cho sim, thẻ cao, e-voucher, sữa cho bé dưới 2 tuổi.";
  const paymentMethods = "Tất cả các hình thức thanh toán";
  const shippingUnits =
    "Giao Hàng Nhanh, VNPost Tiết Kiệm, Viettel Post, Giao Hàng Tiết Kiệm, VNPost Nhanh, J&T Express, GrabExpress, Standard Express - LWE, Standard Express - DoorA, Standard Express, Shopee Express, NowShip, Ninja Van, BEST Express - Korea, Standard Express, Hoá Tốc, Nhanh, Tiết kiệm";

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.limitedLabel}>
            <Text style={styles.limitedLabelText}>SỐ LƯỢNG CÓ HẠN</Text>
          </View>
          <View style={styles.iconContainer}>
            <View style={styles.voucherIconContainer}>
              <Text style={styles.voucherIcon}>S</Text>
            </View>
          </View>
          <Text style={styles.title}>
            {voucher.type === "PERCENTAGE"
              ? `Giảm ${voucher.discountValue}% ${
                  voucher.maxDiscount > 0
                    ? `Tối đa ${voucher.maxDiscount.toLocaleString()} VNĐ`
                    : ""
                }`
              : `Giảm ${voucher.discountValue.toLocaleString()} VNĐ`}{" "}
            {voucher.minOrderValue > 0
              ? `Đơn tối thiểu ${voucher.minOrderValue.toLocaleString()} VNĐ`
              : ""}
          </Text>
          <Text style={styles.expiry}>
            Có Hiệu Lực Từ:{" "}
            {new Date(voucher.createdAt).toLocaleString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sản Phẩm</Text>
          <Text style={styles.sectionContent}>{applicableProducts}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thanh Toán</Text>
          <Text style={styles.sectionContent}>{paymentMethods}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Đơn vị vận chuyển</Text>
          <Text style={styles.sectionContent}>{shippingUnits}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Xem chi tiết</Text>
          <Text style={styles.sectionContent}>
            Nhập mã {voucher.code} để được{" "}
            {voucher.type === "PERCENTAGE"
              ? `giảm ${voucher.discountValue}%`
              : `giảm ${voucher.discountValue.toLocaleString()} VNĐ`}{" "}
            {voucher.maxDiscount > 0
              ? `tối đa ${voucher.maxDiscount.toLocaleString()} xu`
              : ""}{" "}
            cho đơn{" "}
            {voucher.minOrderValue > 0
              ? `${voucher.minOrderValue.toLocaleString()} VNĐ`
              : "bất kỳ"}
            . HSD:{" "}
            {new Date(voucher.expiry).toLocaleString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
            . SỐ LƯỢNG CÓ HẠN.
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.agreeButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.agreeButtonText}>ĐỒNG Ý</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VoucherDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  header: {
    marginBottom: 16,
  },
  limitedLabel: {
    backgroundColor: "#FF6200",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  limitedLabelText: {
    fontSize: 10,
    color: "#FFD700",
    fontWeight: "bold",
  },
  iconContainer: {
    width: 80,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#FFF",
    marginVertical: 8,
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
    backgroundColor: "#FF6200",
  },
  voucherIcon: {
    fontSize: 30,
    color: "#FFF",
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  expiry: {
    fontSize: 12,
    color: "#FF0000",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  sectionContent: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  agreeButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#EE4D2D",
    paddingVertical: 16,
    alignItems: "center",
  },
  agreeButtonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
});
