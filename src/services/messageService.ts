import axios from 'axios';

const API_URL = 'http://localhost:3002';

export interface Message {
  id: number;
  title: string;
  content: string;
  date: string;
  isRead: boolean;
  type: 'alert' | 'notification';
  priority: 'high' | 'medium' | 'low';
}

export const getMessages = async (): Promise<Message[]> => {
  const response = await axios.get(`${API_URL}/messages`);
  return response.data;
};

export const markMessageAsRead = async (messageId: number): Promise<void> => {
  await axios.patch(`${API_URL}/messages/${messageId}`, { isRead: true });
};

export const markAllAsRead = async (type: 'alert' | 'notification'): Promise<void> => {
  const messages = await getMessages();
  const unreadMessages = messages.filter(m => m.type === type && !m.isRead);
  
  await Promise.all(
    unreadMessages.map(message => 
      axios.patch(`${API_URL}/messages/${message.id}`, { isRead: true })
    )
  );
}; 