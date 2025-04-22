import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { API_BASE_URL } from '../Constant/Constant'
export const useWebSocket = (userId, onMessageReceived) => {
    useEffect(() => {
        // Tạo SockJS client
        const socket = new SockJS(`${API_BASE_URL}/ws`); // dùng IP thật thay cho localhost
        const client = new Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log('STOMP DEBUG', str),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        console.log('WebSocket client created:', userId);

        client.onConnect = () => {
            console.log('✅ STOMP connected');
            client.subscribe(`/topic/notifications/${userId}`, (message) => {
                const notification = JSON.parse(message.body);
                console.log('📩 Received message:', notification);
                onMessageReceived(notification);
            });
        };

        client.onStompError = (frame) => {
            console.error('❌ STOMP error:', frame);
        };

        client.activate();

        return () => {
            client.deactivate();
        };
    }, [userId, onMessageReceived]);
};
