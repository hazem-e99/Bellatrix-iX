// Authentication System Test Utilities
// This file contains helper functions for testing the authentication system

export const testAuthFlow = {
  // Test data for authentication
  testAdmin: {
    email: 'admin@bellatrix.com',
    password: 'Admin123!',
    firstName: 'Test',
    lastName: 'Admin',
    username: 'testadmin'
  },

  // Test API endpoints
  endpoints: {
    login: 'http://bellatrix.runasp.net/api/Authentication/Login',
    register: 'http://bellatrix.runasp.net/api/Authentication/Registration',
    verification: 'http://bellatrix.runasp.net/api/Authentication/Verification',
    forgotPassword: 'http://bellatrix.runasp.net/api/Authentication/Forgot-Password',
    resetPassword: 'http://bellatrix.runasp.net/api/Authentication/Reset-Password'
  },

  // Test authentication flow
  async testLogin() {
    try {
      const response = await fetch(this.endpoints.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrUserName: this.testAdmin.email,
          password: this.testAdmin.password,
          rememberMe: false
        })
      });

      const data = await response.json();
      console.log('Login Test Result:', data);
      return data;
    } catch (error) {
      console.error('Login Test Error:', error);
      return { success: false, error: error.message };
    }
  },

  // Test registration flow
  async testRegistration() {
    try {
      const response = await fetch(this.endpoints.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: this.testAdmin.firstName,
          lastName: this.testAdmin.lastName,
          email: this.testAdmin.email,
          username: this.testAdmin.username
        })
      });

      const data = await response.json();
      console.log('Registration Test Result:', data);
      return data;
    } catch (error) {
      console.error('Registration Test Error:', error);
      return { success: false, error: error.message };
    }
  },

  // Test forgot password flow
  async testForgotPassword() {
    try {
      const response = await fetch(this.endpoints.forgotPassword, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.testAdmin.email
        })
      });

      const data = await response.json();
      console.log('Forgot Password Test Result:', data);
      return data;
    } catch (error) {
      console.error('Forgot Password Test Error:', error);
      return { success: false, error: error.message };
    }
  },

  // Run all tests
  async runAllTests() {
    console.log('🧪 Starting Authentication System Tests...\n');
    
    console.log('1. Testing Registration...');
    const registrationResult = await this.testRegistration();
    
    console.log('\n2. Testing Login...');
    const loginResult = await this.testLogin();
    
    console.log('\n3. Testing Forgot Password...');
    const forgotPasswordResult = await this.testForgotPassword();
    
    console.log('\n📊 Test Results Summary:');
    console.log('Registration:', registrationResult.success ? '✅ PASS' : '❌ FAIL');
    console.log('Login:', loginResult.success ? '✅ PASS' : '❌ FAIL');
    console.log('Forgot Password:', forgotPasswordResult.success ? '✅ PASS' : '❌ FAIL');
    
    return {
      registration: registrationResult,
      login: loginResult,
      forgotPassword: forgotPasswordResult
    };
  }
};

// Export for use in browser console or testing
if (typeof window !== 'undefined') {
  window.testAuthFlow = testAuthFlow;
}

export default testAuthFlow;
