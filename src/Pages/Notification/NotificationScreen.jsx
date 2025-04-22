import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { useAppDispatch, useAppSelector } from '../../Redux/hook';
import { useWebSocket } from '../../hooks/useWebSocket';
import {
  addNotification,
  fetchListNotification,
  markNotificationAsRead,
} from '../../Redux/Slice/notificationSlice';
import { API_BASE_URL } from '../../Constant/Constant';
import axios from 'axios'; // Giả sử bạn dùng axios để gọi API

const NotificationsScreen = () => {
  const dispatch = useAppDispatch();
  const { accessToken, isLoggedIn, userId } = useAppSelector((state) => state.auth);
  const { listNotification } = useAppSelector((state) => state.notification);

  // Map loại thông báo với icon và màu sắc
  const getNotificationIcon = (type) => {
    switch (type?.toUpperCase()) {
      case 'BOOKING':
        return { icon: 'checkmark-circle', color: '#2563EB' };
      default:
        return { icon: 'notifications', color: '#6B7280' };
    }
  };

  // Lắng nghe notification từ hệ thống (expo-notifications)
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        const { title, body, data } = notification.request.content;

        const newNoti = {
          id: Date.now(),
          title,
          message: body,
          type: data?.type || 'SYSTEM',
          createdAt: data?.created_at || new Date().toISOString(),
          isRead: false, // Mặc định là chưa đọc
        };

        console.log('📩 Notification received:', newNoti);
        dispatch(addNotification(newNoti));
      }
    );

    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('Notification response:', response);
      });

    dispatch(fetchListNotification());

    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  }, [dispatch]);

  // Lắng nghe từ WebSocket
  useWebSocket(userId, (notification) => {
    console.log('🌐 WebSocket nhận notification: ', notification);

    const newNoti = {
      id: notification.id || Date.now(),
      title: notification.title,
      message: notification.message,
      type: notification.type || 'SYSTEM',
      createdAt: notification.createdAt || new Date().toISOString(),
      isRead: notification.isRead || false,
    };

    dispatch(addNotification(newNoti));

    Notifications.scheduleNotificationAsync({
      content: {
        title: newNoti.title,
        body: newNoti.message,
        data: {
          type: newNoti.type,
          created_at: newNoti.createdAt,
          isRead: newNoti.isRead,
        },
      },
      trigger: null, // gửi ngay lập tức
    });
  });

  // Hàm gọi API để đánh dấu thông báo là đã đọc
  const markAsRead = async (notificationId) => {
    console.log('Đánh dấu thông báo là đã đọc:', notificationId);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/notifications/${notificationId}/read`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        }
      );
      console.log('API response:', response.data);
      // Kiểm tra phản hồi API
      if (response.data === true) {
        dispatch(fetchListNotification()); // Cập nhật Redux store nếu thành công
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
      // Có thể hiển thị thông báo lỗi cho người dùng
    }
  };

  // Xử lý khi nhấp vào thông báo
  const handleNotificationPress = (notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
  };

  const parseLocalDateTimeArray = (arr) => {
    if (!Array.isArray(arr) || arr.length < 6) return new Date(); // fallback
    const [year, month, day, hour, minute, second] = arr;
    return new Date(year, month - 1, day, hour, minute, second); // month - 1 vì JS tính từ 0
  };

  // Render từng thông báo
  const renderNotification = ({ item }) => {
    const { icon, color } = getNotificationIcon(item?.type);
    const isRead = item?.isRead || false;

    return (
      <TouchableOpacity
        style={[
          styles.notificationCard,
          { backgroundColor: isRead ? '#FFFFFF' : '#F0F7FF' },
        ]}
        activeOpacity={0.7}
        onPress={() => handleNotificationPress(item)}
      >
        <View style={styles.notificationIconContainer}>
          <Ionicons name={icon} size={36} color={color} />
        </View>
        <View style={styles.notificationContent}>
          <View style={styles.titleContainer}>
            {item?.title && (
              <Text style={styles.notificationTitle}>{item.title}</Text>
            )}
            {!isRead && <View style={styles.unreadDot} >{item.isRead}</View>}
          </View>
          {item?.message && (
            <Text style={styles.notificationMessage}>{item.message}</Text>
          )}
          {item?.createdAt && (
            <Text style={styles.notificationTime}>
              {parseLocalDateTimeArray(item.createdAt).toLocaleString('vi-VN', {
                dateStyle: 'short',
                timeStyle: 'short',
              })}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  // Giao diện khi chưa đăng nhập
  if (!accessToken || !isLoggedIn) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="log-in-outline" size={48} color="#6B7280" />
        <Text style={styles.emptyText}>
          Vui lòng đăng nhập để xem thông báo
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {listNotification?.length > 0 ? (
        <FlatList
          data={listNotification}
          renderItem={renderNotification}
          keyExtractor={(item) => item?.id?.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="notifications-off-outline"
            size={48}
            color="#6B7280"
          />
          <Text style={styles.emptyText}>Bạn chưa có thông báo nào</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  notificationIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: '#F59E0B',
    marginTop: 4,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563EB',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 12,
  },
});

export default NotificationsScreen;