# Admin Authentication System

A comprehensive React + TailwindCSS authentication system built for the Bellatrix Admin Dashboard. This system provides secure admin-only access with role-based authorization.

## 🚀 Features

### Authentication Pages
- **Admin Login** (`/auth/login`) - Secure login with email/password
- **Admin Registration** (`/auth/register`) - New admin account creation
- **Email Verification** (`/auth/verification`) - OTP/code verification
- **Forgot Password** (`/auth/forgot-password`) - Password reset request
- **Reset Password** (`/auth/reset-password`) - New password creation

### Security Features
- **Role-based Access Control** - Only Admin users can access the dashboard
- **JWT Token Management** - Secure token storage and automatic refresh
- **Protected Routes** - Admin routes are protected and require authentication
- **Form Validation** - Client-side validation with error messages
- **Loading States** - User feedback during API calls
- **Toast Notifications** - Success/error messages using react-hot-toast

## 🏗️ Project Structure

```
src/
├── services/
│   └── authApi.js              # Axios API service for authentication
├── hooks/
│   └── useAuth.js              # Custom authentication hook with context
├── components/
│   ├── ProtectedRoute.jsx      # Route protection component
│   ├── ui/
│   │   └── LoadingSpinner.jsx  # Reusable loading spinner
│   └── Admin/
│       └── AuthDashboard.jsx   # Test dashboard for auth verification
├── pages/auth/
│   ├── Login.jsx               # Admin login page
│   ├── Register.jsx            # Admin registration page
│   ├── Verification.jsx        # Email verification page
│   ├── ForgotPassword.jsx      # Forgot password page
│   └── ResetPassword.jsx       # Reset password page
└── routes/
    └── AuthRoutes.jsx          # Authentication route configuration
```

## 🔧 API Integration

### Base URL
```
http://bellatrix.runasp.net/
```

### Authentication Endpoints

| Endpoint | Method | Description | Request Body |
|----------|--------|-------------|--------------|
| `/api/Authentication/Login` | POST | Admin login | `{ emailOrUserName, password, rememberMe }` |
| `/api/Authentication/Registration` | POST | Admin registration | `{ firstName, lastName, email, username }` |
| `/api/Authentication/Verification` | POST | Email verification | `{ email, verificationCode }` |
| `/api/Authentication/Forgot-Password` | POST | Password reset request | `{ email }` |
| `/api/Authentication/Reset-Password` | POST | Password reset | `{ email, resetToken, newPassword, confirmPassword }` |

### Response Types

#### LoginViewModelApiResponse
```json
{
  "data": {
    "id": 1,
    "token": "jwt_token_here",
    "userName": "admin_user",
    "email": "admin@example.com",
    "fullName": "Admin User",
    "role": "Admin"
  },
  "success": true,
  "message": "Login successful",
  "count": 1
}
```

#### BooleanApiResponse
```json
{
  "data": true,
  "success": true,
  "message": "Operation successful",
  "count": 1
}
```

## 🎨 UI/UX Features

### Design System
- **Modern Clean UI** - Built with TailwindCSS
- **Responsive Design** - Mobile-first approach
- **Form Validation** - Real-time validation with error messages
- **Loading States** - Spinner indicators during API calls
- **Toast Notifications** - Success/error feedback
- **Password Visibility Toggle** - Show/hide password functionality

### Color Scheme
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Error**: Red (#EF4444)
- **Warning**: Yellow (#F59E0B)
- **Background**: Gray (#F9FAFB)

## 🔐 Security Implementation

### Role-Based Access Control
```javascript
// Only Admin users can access protected routes
if (user.role !== 'Admin') {
  // Redirect to access denied page
  return <AccessDenied />;
}
```

### Token Management
- JWT tokens stored in localStorage
- Automatic token attachment to API requests
- Token expiration handling with automatic logout
- Secure token cleanup on logout

### Route Protection
```javascript
// Protected route wrapper
<ProtectedRoute>
  <AdminComponent />
</ProtectedRoute>
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install react-hot-toast
```

### 2. Environment Setup
The system is configured to use the production API:
```
Base URL: http://bellatrix.runasp.net/
```

### 3. Access Authentication Pages
- **Login**: `http://localhost:3000/auth/login`
- **Register**: `http://localhost:3000/auth/register`
- **Forgot Password**: `http://localhost:3000/auth/forgot-password`

### 4. Test Admin Dashboard
- **Auth Dashboard**: `http://localhost:3000/admin/auth-dashboard`
- **Main Dashboard**: `http://localhost:3000/admin/dashboard`

## 📱 Usage Examples

### Login Flow
1. Navigate to `/auth/login`
2. Enter admin email and password
3. System validates credentials
4. On success, redirects to `/admin/dashboard`
5. JWT token stored for future requests

### Registration Flow
1. Navigate to `/auth/register`
2. Fill in admin details
3. Submit registration
4. Redirected to verification page
5. Enter verification code from email
6. Account activated, redirect to login

### Password Reset Flow
1. Navigate to `/auth/forgot-password`
2. Enter email address
3. Check email for reset link
4. Click link to go to reset page
5. Enter new password
6. Redirect to login with new credentials

## 🔧 Customization

### Styling
All components use TailwindCSS classes and can be easily customized:
```javascript
// Example: Custom button styling
<button className="bg-custom-blue hover:bg-custom-blue-dark text-white px-4 py-2 rounded">
  Custom Button
</button>
```

### API Configuration
Update the base URL in `src/services/authApi.js`:
```javascript
const authApi = axios.create({
  baseURL: 'YOUR_API_BASE_URL',
  // ... other config
});
```

### Toast Notifications
Customize toast appearance in `src/App.jsx`:
```javascript
<Toaster 
  position="top-right"
  toastOptions={{
    duration: 4000,
    // ... custom styling
  }}
/>
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Login with valid admin credentials
- [ ] Login with invalid credentials (should show error)
- [ ] Registration flow completion
- [ ] Email verification process
- [ ] Forgot password flow
- [ ] Reset password flow
- [ ] Protected route access (should redirect if not authenticated)
- [ ] Non-admin user access (should be denied)
- [ ] Logout functionality
- [ ] Token expiration handling

### Test Admin Credentials
Use the API endpoints to create test admin accounts or contact the system administrator for test credentials.

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure the API server allows requests from your domain
   - Check if the API base URL is correct

2. **Token Expiration**
   - Tokens are automatically refreshed
   - Users are redirected to login on token expiration

3. **Role Access Denied**
   - Only users with `role: "Admin"` can access admin routes
   - Check user data in localStorage for role verification

4. **Form Validation Errors**
   - All forms have client-side validation
   - Check error messages for specific field requirements

## 📄 License

This authentication system is part of the Bellatrix project and follows the same licensing terms.

## 🤝 Contributing

When contributing to the authentication system:
1. Follow the existing code structure
2. Maintain security best practices
3. Add proper error handling
4. Include form validation
5. Test all authentication flows

## 📞 Support

For issues or questions regarding the authentication system:
1. Check the troubleshooting section
2. Review the API documentation
3. Contact the development team

---

**Note**: This authentication system is specifically designed for admin users only. Regular users should not have access to these authentication pages or the admin dashboard.
