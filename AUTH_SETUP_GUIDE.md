# Admin Authentication System - Quick Setup Guide

## 🚀 Quick Start

### 1. Install Required Dependencies
```bash
npm install react-hot-toast
```

### 2. Verify File Structure
Ensure all authentication files are in place:
```
src/
├── services/authApi.js
├── hooks/useAuth.js
├── components/ProtectedRoute.jsx
├── components/ui/LoadingSpinner.jsx
├── components/Admin/AuthDashboard.jsx
├── pages/auth/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Verification.jsx
│   ├── ForgotPassword.jsx
│   └── ResetPassword.jsx
├── routes/AuthRoutes.jsx
└── utils/authTest.js
```

### 3. Start the Development Server
```bash
npm run dev
```

### 4. Test the Authentication System

#### Access Authentication Pages:
- **Login**: http://localhost:3000/auth/login
- **Register**: http://localhost:3000/auth/register
- **Forgot Password**: http://localhost:3000/auth/forgot-password

#### Test Admin Dashboard:
- **Auth Dashboard**: http://localhost:3000/admin/auth-dashboard
- **Main Dashboard**: http://localhost:3000/admin/dashboard

## 🔧 Configuration

### API Base URL
The system is configured to use:
```
http://bellatrix.runasp.net/
```

To change this, update `src/services/authApi.js`:
```javascript
const authApi = axios.create({
  baseURL: 'YOUR_NEW_API_URL',
  // ...
});
```

### Authentication Flow
1. **Login** → Validates admin credentials
2. **Role Check** → Ensures user role is "Admin"
3. **Token Storage** → Stores JWT in localStorage
4. **Route Protection** → Protects admin routes
5. **Auto Logout** → Handles token expiration

## 🧪 Testing

### Manual Testing
1. Try accessing `/admin/dashboard` without login (should redirect to `/auth/login`)
2. Register a new admin account
3. Verify email (if verification is required)
4. Login with admin credentials
5. Access protected admin routes
6. Test logout functionality

### Browser Console Testing
Open browser console and run:
```javascript
// Import test utilities
import { testAuthFlow } from './src/utils/authTest.js';

// Run all tests
testAuthFlow.runAllTests();
```

## 🔐 Security Features

### Role-Based Access
- Only users with `role: "Admin"` can access admin dashboard
- Non-admin users are blocked with access denied message
- Automatic redirect to login for unauthenticated users

### Token Management
- JWT tokens stored securely in localStorage
- Automatic token attachment to API requests
- Token expiration handling with auto-logout
- Secure cleanup on logout

### Form Validation
- Client-side validation for all forms
- Real-time error messages
- Password strength requirements
- Email format validation

## 🎨 UI Features

### Modern Design
- Clean, professional interface
- Responsive design for all devices
- TailwindCSS styling
- Loading states and animations
- Toast notifications for feedback

### User Experience
- Intuitive form layouts
- Clear error messages
- Success confirmations
- Password visibility toggles
- Remember me functionality

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   ```
   Solution: Ensure API server allows your domain
   ```

2. **Token Not Working**
   ```
   Solution: Check localStorage for 'adminToken' and 'adminUser'
   ```

3. **Role Access Denied**
   ```
   Solution: Verify user role is "Admin" in API response
   ```

4. **Forms Not Submitting**
   ```
   Solution: Check browser console for validation errors
   ```

### Debug Mode
Enable debug logging by adding to `src/hooks/useAuth.js`:
```javascript
console.log('Auth Debug:', { user, isAuthenticated, loading });
```

## 📱 Mobile Testing

Test on mobile devices:
1. Open browser developer tools
2. Toggle device toolbar
3. Select mobile device
4. Test all authentication pages
5. Verify responsive design

## 🚀 Production Deployment

### Environment Variables
Create `.env` file:
```
REACT_APP_API_BASE_URL=http://bellatrix.runasp.net/
REACT_APP_APP_NAME=Bellatrix Admin
```

### Build for Production
```bash
npm run build
```

### Security Checklist
- [ ] HTTPS enabled
- [ ] Secure token storage
- [ ] CORS properly configured
- [ ] API endpoints secured
- [ ] Role validation on server-side
- [ ] Input sanitization
- [ ] Error handling

## 📞 Support

### Getting Help
1. Check this setup guide
2. Review the main README
3. Check browser console for errors
4. Verify API connectivity
5. Contact development team

### Common Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Check for vulnerabilities
npm audit
```

---

**🎉 Your Admin Authentication System is Ready!**

The system provides secure, role-based access control for your Bellatrix Admin Dashboard. All authentication flows are fully functional and ready for production use.
