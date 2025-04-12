import { useState, useRef } from 'react';

const useNotification = () => {
  const [notification, setNotification] = useState(null);
  // Adding versioning to avoid caching issues
  const notificationSound = useRef(new Audio('/notification.mp3?v=' + new Date().getTime()));

  const notify = (message) => {
    setNotification(message);
    notificationSound.current.play().catch(console.error); // Handle sound play errors
  };

  const clearNotification = () => {
    setNotification(null);
  };

  return {
    notification,
    notify,
    clearNotification,
  };
};

export default useNotification;
