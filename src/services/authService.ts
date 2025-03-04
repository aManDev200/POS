interface User {
  id: number;
  username: string;
  name: string;
  merchantId: string;
  storeLocation: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  user?: User;
  error?: string;
}

const API_URL = 'http://localhost:3002'; // Updated JSON Server URL

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    // Get users from JSON server
    const response = await fetch(`${API_URL}/users`);
    const users = await response.json();

    // Find user with matching credentials
    const user = users.find(
      (u: User & { password: string }) =>
        u.username === credentials.username && u.password === credentials.password
    );

    if (user) {
      // Remove password from user object before returning
      const { password, ...userWithoutPassword } = user;
      return {
        success: true,
        user: userWithoutPassword,
      };
    }

    return {
      success: false,
      error: 'Invalid username or password',
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: 'Failed to connect to server',
    };
  }
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const setCurrentUser = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const logout = (): void => {
  localStorage.removeItem('user');
}; 