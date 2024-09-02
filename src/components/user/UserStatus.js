import React, { useEffect, useState } from 'react';
import { getUserLoginStatus } from '../../services/api';

const UserStatus = ({ username }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (username) {
      const checkUserStatus = async () => {
        try {
          const response = await getUserLoginStatus(username);
          if (response.data === 1) {  
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error('Error checking user status:', error);
          setIsLoggedIn(false);
        }
      };
  
      checkUserStatus();
    }
  }, [username]);

  return (
    <div>
      {isLoggedIn ? (
        <p>Welcome, {username}! You are logged in.</p>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};

export default UserStatus;
