import React, { createContext, useCallback, useState, useContext } from 'react';

interface AuthState {
  isLogged: boolean;
}

interface AuthContextData {
  isLogged: boolean;
  signIn(): void;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const isLogged = localStorage.getItem('@Devtech:isLogged');

    if (isLogged) {
      return JSON.parse(isLogged);
    }

    return {} as AuthState;
  });

  const signIn = useCallback(() => {
    localStorage.setItem(
      '@Devtech:isLogged',
      JSON.stringify({ isLogged: true }),
    );

    setData({ isLogged: true });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Devtech:isLogged');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged: data.isLogged, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
