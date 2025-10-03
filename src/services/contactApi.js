import axios from 'axios';

// Create axios instance with base URL
const contactApi = axios.create({
  baseURL: 'http://bellatrix.runasp.net/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Industry mapping based on the API specification
export const INDUSTRY_OPTIONS = [
  { value: 0, label: 'Select Industry' },
  { value: 1, label: 'Manufacturing' },
  { value: 2, label: 'Retail & E-commerce' },
  { value: 3, label: 'Healthcare' },
  { value: 4, label: 'Finance & Banking' },
  { value: 5, label: 'Technology' },
  { value: 6, label: 'Professional Services' },
  { value: 7, label: 'Non-Profit' },
  { value: 8, label: 'Other' },
];

// Country mapping with key countries
export const COUNTRY_OPTIONS = [
  { value: 0, label: 'Select Country' },
  { value: 65, label: 'Egypt (مصر)' },
  { value: 190, label: 'United Arab Emirates (الإمارات)' },
  { value: 191, label: 'United Kingdom (بريطانيا)' },
  { value: 192, label: 'United States (أمريكا)' },
  { value: 1, label: 'Canada' },
  { value: 2, label: 'Australia' },
  { value: 3, label: 'Germany' },
  { value: 4, label: 'France' },
  { value: 5, label: 'Saudi Arabia' },
  { value: 6, label: 'Other' },
];

// Submit contact message
export const submitContactMessage = async (formData) => {
  try {
    console.log('📤 [CONTACT API] Submitting contact message:', formData);
    
    const response = await contactApi.post('/api/ContactMessages/submit', {
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber || null,
      companyName: formData.companyName || null,
      industry: parseInt(formData.industry),
      country: parseInt(formData.country),
      message: formData.message,
    });

    console.log('✅ [CONTACT API] Contact message submitted successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ [CONTACT API] Error submitting contact message:', error);
    
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const errorMessage = error.response.data?.message || 
                          error.response.data?.error || 
                          'فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى.';
      throw new Error(errorMessage);
    } else if (error.request) {
      // Network error
      throw new Error('خطأ في الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت.');
    } else {
      // Other error
      throw new Error('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
    }
  }
};

// Get contact messages (for admin use)
export const getContactMessages = async (params = {}) => {
  try {
    const response = await contactApi.get('/api/ContactMessages', { params });
    return response.data;
  } catch (error) {
    console.error('❌ [CONTACT API] Error fetching contact messages:', error);
    throw error;
  }
};

// Get contact message by ID
export const getContactMessage = async (id) => {
  try {
    const response = await contactApi.get(`/api/ContactMessages/${id}`);
    return response.data;
  } catch (error) {
    console.error('❌ [CONTACT API] Error fetching contact message:', error);
    throw error;
  }
};

// Mark message as replied
export const markAsReplied = async (id) => {
  try {
    const response = await contactApi.patch(`/api/ContactMessages/${id}/mark-replied`);
    return response.data;
  } catch (error) {
    console.error('❌ [CONTACT API] Error marking message as replied:', error);
    throw error;
  }
};

// Mark message as unreplied
export const markAsUnreplied = async (id) => {
  try {
    const response = await contactApi.patch(`/api/ContactMessages/${id}/mark-unreplied`);
    return response.data;
  } catch (error) {
    console.error('❌ [CONTACT API] Error marking message as unreplied:', error);
    throw error;
  }
};

// Delete contact message
export const deleteContactMessage = async (id) => {
  try {
    const response = await contactApi.delete(`/api/ContactMessages/${id}`);
    return response.data;
  } catch (error) {
    console.error('❌ [CONTACT API] Error deleting contact message:', error);
    throw error;
  }
};

// Search contact messages
export const searchContactMessages = async (searchTerm) => {
  try {
    const response = await contactApi.get('/api/ContactMessages/search', {
      params: { searchTerm }
    });
    return response.data;
  } catch (error) {
    console.error('❌ [CONTACT API] Error searching contact messages:', error);
    throw error;
  }
};

// Get contact message statistics
export const getContactStats = async () => {
  try {
    const response = await contactApi.get('/api/ContactMessages/stats');
    return response.data;
  } catch (error) {
    console.error('❌ [CONTACT API] Error fetching contact stats:', error);
    throw error;
  }
};

// Get recent contact messages
export const getRecentContactMessages = async (count = 5) => {
  try {
    const response = await contactApi.get('/api/ContactMessages/recent', {
      params: { count }
    });
    return response.data;
  } catch (error) {
    console.error('❌ [CONTACT API] Error fetching recent contact messages:', error);
    throw error;
  }
};

export default contactApi;
