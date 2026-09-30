import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ROLE_KEY = '@dris_user_role';

const RoleContext = createContext();

export const useRole = () => useContext(RoleContext);

export const ROLES = {
  CITIZEN: 'citizen',
  TEAM: 'team',
};

export const RoleProvider = ({ children }) => {
  const [role, setRoleState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(ROLE_KEY)
      .then((stored) => {
        if (stored) setRoleState(stored);
      })
      .finally(() => setLoading(false));
  }, []);

  const setRole = async (newRole) => {
    await AsyncStorage.setItem(ROLE_KEY, newRole);
    setRoleState(newRole);
  };

  const clearRole = async () => {
    await AsyncStorage.removeItem(ROLE_KEY);
    setRoleState(null);
  };

  return (
    <RoleContext.Provider value={{ role, setRole, clearRole, loading }}>
      {children}
    </RoleContext.Provider>
  );
};
