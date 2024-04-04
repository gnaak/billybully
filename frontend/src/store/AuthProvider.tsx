import React, { createContext, useContext, useState, ReactNode } from 'react';

// 인증 정보를 담을 Context 생성
interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  handleTokenExpiration: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 인증 정보를 제공하는 컴포넌트
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // 토큰이 만료되면 로그아웃
  const handleTokenExpiration = () => {
    setAccessToken(null);
    // 필요하다면 다른 로직 추가 가능
  };

  const authContextValue: AuthContextType = {
    accessToken,
    setAccessToken,
    handleTokenExpiration,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 커스텀 훅을 통해 인증 정보에 접근하는 함수
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
