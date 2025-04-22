import React from 'react';
import { View, Text ,StyleSheet} from 'react-native';
//import styles from '../styles/notificationStyles'; // Tách styles để tái sử dụng

const formatDate = (dateArray) => {
    console.log('dateArray', dateArray);
    const date = new Date(
        dateArray[0],
        dateArray[1] - 1,
        dateArray[2],
        dateArray[3],
        dateArray[4],
        dateArray[5]
    );

    const pad = (n) => n.toString().padStart(2, '0');

    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};
const NotificationItem = ({ item }) => (
    <View style={[styles.notificationItem, !item.isRead && styles.unread]}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
    </View>
);

export default React.memo(NotificationItem);
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