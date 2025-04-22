import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getReviewDetails } from "../../Redux/Slice/hotelSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";

const AllComments = ({ navigation, route }) => {
  const { comments } = route.params;
  const dispatch = useAppDispatch();

  const handleToRateDetails = (item) => {
    console.log(item.reviewId);
    dispatch(getReviewDetails(item.reviewId));
    navigation.navigate("RateDetails", { name: item.username });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tất cả nhận xét</Text>
      </View>

      <ScrollView style={styles.commentsContainer}>
        {comments.length > 0 ? (
          comments.map((item, index) => (
            <TouchableOpacity
              onPress={() => handleToRateDetails(item)}
              key={item.reviewId}
              style={styles.commentItem}
            >
              <Image
                source={{ uri: `${item.urlAvatar}` }}
                style={styles.commentAvatar}
              />
              <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentUser}>{item.username}</Text>
                  <Text style={styles.commentScore}>{item.rating}/5</Text>
                </View>
                <Text style={styles.commentText}>{item.comment}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noCommentsText}>Chưa có nhận xét nào.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 15,
  },
  commentsContainer: {
    padding: 15,
  },
  commentItem: {
    flexDirection: "row",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  commentUser: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  commentScore: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  commentText: {
    fontSize: 14,
    color: "#666",
  },
  noCommentsText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});

export default AllComments;
