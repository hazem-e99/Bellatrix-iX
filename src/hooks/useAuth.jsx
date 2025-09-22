import { useState, useEffect, createContext, useContext } from 'react';
import { authService } from '../services/authApi';
import { toast } from 'react-hot-toast';

// Create Auth Context
const AuthContext = createContext();

// Decode JWT payload safely without extra deps
function decodeJwtPayload(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

function deriveRoleFromToken(token) {
  const payload = decodeJwtPayload(token);
  if (!payload) return null;
  // Common role claim keys
  const roleKeys = [
    'role',
    'roles',
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/roles',
  ];
  for (const key of roleKeys) {
    const value = payload[key];
    if (!value) continue;
    if (typeof value === 'string') return value;
    if (Array.isArray(value) && value.length) return value[0];
  }
  return null;
}

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('adminToken');
        const userData = localStorage.getItem('adminUser');
        
        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          const tokenRole = deriveRoleFromToken(token);
          const role = parsedUser.role || tokenRole || 'Admin'; // Default to Admin
          
          // Allow access if we have a valid token
          setUser({ ...parsedUser, role, token });
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authService.login(credentials);
      
      if (response.success && response.data) {
        const userData = response.data;
        const token = userData.token;
        
        if (!token) {
          toast.error('Login failed: No token received');
          return { success: false, message: 'No token received' };
        }

        // Try to get role from JWT token
        const derivedRole = deriveRoleFromToken(token);
        console.log('Login Debug:', { 
          userData, 
          token: token.substring(0, 50) + '...', 
          derivedRole 
        });
        
        // For now, allow login if token exists and assume admin role
        // You can add more specific role validation based on your JWT claims
        const role = derivedRole || 'Admin'; // Default to Admin if no role found in token
        
        const normalizedUser = { 
          ...userData, 
          role,
          token 
        };
        
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(normalizedUser));
        setUser(normalizedUser);
        setIsAuthenticated(true);
        toast.success('Login successful!');
        return { success: true, data: normalizedUser };
      } else {
        toast.error(response.message || 'Login failed');
        return { success: false, message: response.message || 'Login failed' };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
      
      if (response.success) {
        toast.success('Registration successful! Please verify your email.');
        return { success: true, message: response.message };
      } else {
        toast.error(response.message || 'Registration failed');
        return { success: false, message: response.message || 'Registration failed' };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Verification function
  const verify = async (verificationData) => {
    try {
      setLoading(true);
      const response = await authService.verify(verificationData);
      
      if (response.success) {
        toast.success('Email verified successfully!');
        return { success: true, message: response.message };
      } else {
        toast.error(response.message || 'Verification failed');
        return { success: false, message: response.message || 'Verification failed' };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Verification failed. Please try again.';
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password function
  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      const response = await authService.forgotPassword(email);
      
      if (response.success) {
        toast.success('Password reset instructions sent to your email!');
        return { success: true, message: response.message };
      } else {
        toast.error(response.message || 'Failed to send reset instructions');
        return { success: false, message: response.message || 'Failed to send reset instructions' };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to send reset instructions. Please try again.';
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Reset Password function
  const resetPassword = async (resetData) => {
    try {
      setLoading(true);
      const response = await authService.resetPassword(resetData);
      
      if (response.success) {
        toast.success('Password reset successfully!');
        return { success: true, message: response.message };
      } else {
        toast.error(response.message || 'Password reset failed');
        return { success: false, message: response.message || 'Password reset failed' };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Password reset failed. Please try again.';
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    verify,
    forgotPassword,
    resetPassword,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
