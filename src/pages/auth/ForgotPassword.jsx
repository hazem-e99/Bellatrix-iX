import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  // Countdown effect for auto-redirect
  useEffect(() => {
    if (isSubmitted && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isSubmitted && countdown === 0) {
      navigate('/auth/reset-password', { 
        state: { email: formData.email } 
      });
    }
  }, [isSubmitted, countdown, navigate, formData.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const result = await forgotPassword(formData.email);
      
      if (result.success) {
        setIsSubmitted(true);
        setCountdown(3); // Reset countdown
      }
    } catch (error) {
      console.error('Forgot password error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex">
        {/* Left Side - Logo Section (50%) */}
        <div className="hidden lg:flex lg:w-1/2 bg-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
            <img 
              src="/images/logoThree.png" 
              alt="Bellatrix Logo" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Right Side - Success Message (50%) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <img 
                src="/images/logoThree.png" 
                alt="Bellatrix Logo" 
                className="w-auto h-24 object-contain mx-auto mb-4"
              />
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
            <div className="text-center mb-6">
              <div className="inline-block p-3 rounded-2xl bg-green-50 mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Check Your Email
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                We've sent password reset instructions to
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900">{formData.email}</p>
              {countdown > 0 && (
                <p className="mt-3 text-sm text-blue-600">
                  Redirecting in {countdown} seconds...
                </p>
              )}
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-800">
                We've sent the verification code to your email. 
                The code will expire in 24 hours.
              </p>
            </div>

            <div className="space-y-3">
              <Link
                to="/auth/reset-password"
                state={{ email: formData.email }}
                className="w-full inline-flex justify-center items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Enter Verification Code and Reset Password
              </Link>
              
              <Link
                to="/auth/login"
                className="w-full inline-flex justify-center items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back to Sign In
              </Link>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Didn't receive the email?{' '}
                <button
                  type="button"
                  className="font-medium text-blue-600 hover:text-blue-500"
                  onClick={() => setIsSubmitted(false)}
                >
                  Try Again
                </button>
              </p>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              © 2024 Bellatrix. All rights reserved
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Logo Section (50%) */}
      <div className="hidden lg:flex lg:w-1/2 bg-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          <img 
            src="/images/logoThree.png" 
            alt="Bellatrix Logo" 
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Right Side - Forgot Password Form (50%) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <img 
              src="/images/logoThree.png" 
              alt="Bellatrix Logo" 
              className="w-auto h-24 object-contain mx-auto mb-4"
            />
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
          <div className="text-center mb-10">
            <div className="inline-block p-3 rounded-2xl bg-blue-50 mb-4">
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Forgot Password?
            </h2>
            <p className="text-sm text-gray-500">
              Enter your email and we'll send you reset instructions
            </p>
          </div>
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`block w-full px-3 py-2 border ${
                  errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                } rounded-md shadow-sm focus:outline-none focus:ring-2`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                We'll send you a secure link to reset your password. 
                Make sure to use the same email used for registration.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <LoadingSpinner size="sm" />
              ) : (
                'Send Reset Link'
              )}
            </button>

            <div className="text-center">
              <Link
                to="/auth/login"
                className="inline-block px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                Back to Sign In
              </Link>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            © 2024 Bellatrix. All rights reserved
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
