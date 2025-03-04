import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { getMessages, markAllAsRead, markMessageAsRead, Message } from '../../services/messageService';
import styles from './MessagesScreen.module.css';

const MessagesScreen: React.FC = () => {
  const { setCurrentScreen } = useAppContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'alerts' | 'notifications'>('alerts');

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load messages. Please try again.');
      setLoading(false);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead(activeTab === 'alerts' ? 'alert' : 'notification');
      await loadMessages();
    } catch (err) {
      setError('Failed to mark messages as read. Please try again.');
    }
  };

  const handleMessageClick = async (messageId: number) => {
    try {
      await markMessageAsRead(messageId);
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, isRead: true } : msg
      ));
    } catch (err) {
      setError('Failed to mark message as read. Please try again.');
    }
  };

  const filteredMessages = messages.filter(msg => 
    activeTab === 'alerts' ? msg.type === 'alert' : msg.type === 'notification'
  );

  const unreadCount = (type: 'alert' | 'notification') => 
    messages.filter(msg => msg.type === type && !msg.isRead).length;

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading messages...</p>
      </div>
    );
  }

  return (
    <div className={styles.messagesScreen}>
      <div className={styles.header}>
        <button 
          className={styles.backButton}
          onClick={() => setCurrentScreen('dashboard')}
        >
          ← Back
        </button>
        <h2>Messages</h2>
      </div>

      <div className={styles.content}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'alerts' ? styles.active : ''}`}
            onClick={() => setActiveTab('alerts')}
          >
            Alerts
            {unreadCount('alert') > 0 && (
              <span className={styles.badge}>{unreadCount('alert')}</span>
            )}
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'notifications' ? styles.active : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
            {unreadCount('notification') > 0 && (
              <span className={styles.badge}>{unreadCount('notification')}</span>
            )}
          </button>
        </div>

        {error && (
          <div className={styles.error}>
            <p>{error}</p>
            <button onClick={loadMessages}>Retry</button>
          </div>
        )}

        {filteredMessages.length > 0 && (
          <div className={styles.actions}>
            <button 
              className={styles.markAllButton}
              onClick={handleMarkAllRead}
              disabled={!filteredMessages.some(msg => !msg.isRead)}
            >
              Mark all as read
            </button>
          </div>
        )}

        <div className={styles.messageList}>
          {filteredMessages.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No {activeTab} to display</p>
            </div>
          ) : (
            filteredMessages.map(message => (
              <div
                key={message.id}
                className={`${styles.messageCard} ${!message.isRead ? styles.unread : ''}`}
                onClick={() => handleMessageClick(message.id)}
              >
                <div className={styles.messageHeader}>
                  <h3>{message.title}</h3>
                  <span className={`${styles.priority} ${styles[message.priority]}`}>
                    {message.priority}
                  </span>
                </div>
                <p>{message.content}</p>
                <div className={styles.messageFooter}>
                  <span>{new Date(message.date).toLocaleString()}</span>
                  {!message.isRead && <span className={styles.unreadDot} />}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <img 
          src="/images/Fiserv_logo.svg.png" 
          alt="Fiserv" 
          className={styles.fiservLogo}
        />
        <p>Powered by Fiserv</p>
      </div>
    </div>
  );
};

export default MessagesScreen; 