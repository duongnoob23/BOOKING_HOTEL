import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome"; // Cần cài đặt thư viện này

const TermScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Icon name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Điều khoản & Điều kiện</Text>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.text}>
          <Text style={styles.sectionTitle}>Điều khoản và Điều kiện</Text>
          {"\n\n"}
          Bằng cách tải xuống hoặc sử dụng ứng dụng, bạn đồng ý với các điều
          khoản này – do đó, bạn nên đọc kỹ trước khi sử dụng ứng dụng. Bạn
          không được sao chép, chỉnh sửa ứng dụng, bất kỳ phần nào của ứng dụng
          hoặc nhãn hiệu của chúng tôi dưới bất kỳ hình thức nào. Bạn không được
          tìm cách trích xuất mã nguồn của ứng dụng, cũng như không được dịch
          ứng dụng sang các ngôn ngữ khác hoặc tạo ra các phiên bản phái sinh.
          Ứng dụng, cùng với tất cả các nhãn hiệu, bản quyền, quyền cơ sở dữ
          liệu và các quyền sở hữu trí tuệ khác liên quan đến ứng dụng, vẫn
          thuộc về .cam kết đảm bảo rằng ứng dụng hữu ích và hiệu quả nhất có
          thể. Vì lý do đó, chúng tôi có quyền thay đổi ứng dụng hoặc tính phí
          cho các dịch vụ của ứng dụng bất kỳ lúc nào và vì bất kỳ lý do gì.
          Chúng tôi sẽ không bao giờ tính phí bạn đối với ứng dụng hoặc các dịch
          vụ của ứng dụng mà không làm rõ chính xác những gì bạn phải trả tiền.
          {"\n\n"}
          Tại một số thời điểm, chúng tôi có thể muốn cập nhật ứng dụng. Ứng
          dụng hiện có sẵn trên iOS – yêu cầu hệ thống (và bất kỳ hệ thống bổ
          sung nào mà chúng tôi quyết định mở rộng tính khả dụng của ứng dụng)
          có thể thay đổi, và bạn sẽ cần tải xuống các bản cập nhật nếu muốn
          tiếp tục sử dụng ứng dụng. không hứa rằng ứng dụng sẽ luôn được cập
          nhật để phù hợp với bạn và/hoặc hoạt động với phiên bản iOS mà bạn đã
          cài đặt trên thiết bị của mình. Tuy nhiên, bạn cam kết luôn chấp nhận
          các bản cập nhật của ứng dụng khi được cung cấp. Chúng tôi cũng có thể
          ngừng cung cấp ứng dụng và chấm dứt quyền sử dụng ứng dụng bất kỳ lúc
          nào mà không cần thông báo trước. Trừ khi chúng tôi thông báo khác,
          khi chấm dứt: (a) Các quyền và giấy phép được cấp cho bạn theo các
          điều khoản này sẽ chấm dứt; (b) Bạn phải ngừng sử dụng ứng dụng và
          (nếu cần) xóa ứng dụng khỏi thiết bị của mình.
          {"\n\n"}
          <Text style={styles.sectionTitle}>
            Thay Đổi Điều Khoản & Điều Kiện
          </Text>
          {"\n\n"}
          Chúng tôi có thể cập nhật Điều Khoản & Điều Kiện theo thời gian. Do
          đó, bạn nên xem lại trang này định kỳ để biết bất kỳ thay đổi nào.
          Chúng tôi sẽ thông báo cho bạn về bất kỳ thay đổi nào bằng cách đăng
          Điều Khoản & Điều Kiện mới trên trang này. Những thay đổi này có hiệu
          lực ngay sau khi được đăng
          {"\n\n"}
          <Text style={styles.sectionTitle}>Liên Hệ Với Chúng Tôi</Text>
          {"\n\n"}
          Nếu bạn có bất kỳ câu hỏi hoặc đề xuất nào về Điều Khoản & Điều Kiện
          của chúng tôi, vui lòng liên hệ với chúng tôi qua số +225 3658959.
          {"\n\n"}
          {"\n\n"}
          {"\n\n"}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  backButton: {
    position: "absolute",
    left: 10,
    top: 13, // Căn giữa theo chiều dọc
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  content: {
    flex: 1,
    padding: 10,
  },
  text: {
    fontSize: 14,
    color: "black",
    textAlign: "justify",
    lineHeight: 20,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default TermScreen;
