import React, { useState, useEffect,useCallback  } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { useWebSocket } from '../../hooks/useWebSocket';
import { fetchNotifications } from "../../Redux/apiQuan";
import NotificationItem from '../../Components/Notification/NotificationItem';
//import styles from '../styles/notificationStyles';

const NotificationScreen = () => {
  const { userId } = 4;
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách thông báo từ API
  const fetchNotificationsData = async () => {
    try {
      const response = await fetchNotifications();
      console.log('Thông báo:', response.data);
      setNotifications(response.data);
    } catch (error) {
      console.error('Không thể tải thông báo:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Lắng nghe notification từ Expo (push/local)
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      const { title, body } = notification.request.content;
      const newNoti = {
        id: Date.now(),
        title,
        message: body,
        createdAt: new Date().toISOString(),
      };
      setNotifications((prev) => [newNoti, ...prev]);
    });

    const responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification response:', response);
    });

    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  }, []);

  // Nhận dữ liệu từ WebSocket và hiển thị banner
  useWebSocket(userId, (notification) => {
    const newNoti = {
      id: Date.now(),
      ...notification,
      createdAt: new Date().toISOString(),
    };

    setNotifications((prev) => [newNoti, ...prev]);

    Notifications.scheduleNotificationAsync({
      content: {
        title: notification.title,
        body: notification.message,
      },
      trigger: null, // gửi ngay lập tức
    });
  });

  // Gọi API khi màn hình được mount
  useFocusEffect(
    useCallback(() => {
      fetchNotificationsData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách thông báo</Text>
      {loading ? (
        <Text>Đang tải...</Text>
      ) : !notifications || notifications.length === 0 ? (
        <Text>Không có thông báo nào.</Text>
      ) : (
        <FlatList
          data={notifications}
          renderItem={({ item }) => <NotificationItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
        />
      )}
    </View>
  );
};

export default NotificationScreen;
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  notificationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  unread: {
    backgroundColor: '#d0ebff', // Màu cho thông báo chưa đọc
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  message: { fontSize: 14, color: '#333' },
  date: { fontSize: 12, color: '#666' },
});