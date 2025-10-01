# Messages Page Feature

## Overview
The Messages Page is a comprehensive admin dashboard feature for managing contact form messages. It provides a modern, intuitive interface for viewing, replying to, and managing all contact messages submitted through the website.

## Features

### 🎨 Design & UI
- **Modern Dark Theme**: Consistent with the main website design using dark backgrounds (#001038, #1f2937) with blue accent colors
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Card-based Design**: Clean card layout for message display with hover effects
- **Smooth Animations**: Framer Motion animations for better user experience
- **Statistics Dashboard**: Visual metrics showing message counts and response rates

### 📋 Message Management
- **Message List**: Display all contact messages in a clean, organized format
- **Search & Filter**: Real-time search by name, email, subject, or message content
- **Status Filtering**: Filter by All, Unread, or Replied messages
- **Message Details**: Show sender name, email, subject, message content, and timestamp
- **Message Actions**: Reply, mark as read/unread, and delete messages

### 💬 Reply System
- **Reply Modal**: Beautiful modal popup for composing replies
- **Original Message Context**: Shows the original message when replying
- **Recipient Information**: Displays sender details for context
- **Reply Status**: Automatically marks messages as replied after sending

### 🔔 Notifications
- **Real-time Notifications**: Toast notifications for new messages
- **Notification Counter**: Badge showing unread message count in sidebar
- **Message Alerts**: Elegant popup notifications with message preview
- **Auto-dismiss**: Notifications automatically dismiss after a few seconds

### 📊 Analytics
- **Message Statistics**: Total messages, unread count, replied count
- **Response Rate**: Percentage of messages that have been replied to
- **Time-based Metrics**: Messages by day, week, month (when available from API)

## File Structure

```
src/
├── pages/Admin/
│   └── MessagesPage.jsx           # Main messages page component
├── components/Admin/
│   ├── MessagesList.jsx          # Message list display component
│   ├── ReplyModal.jsx            # Reply modal component
│   └── MessageNotification.jsx   # Notification components
├── hooks/
│   └── useMessageNotifications.js # Hook for managing notifications
├── lib/
│   └── contactMessagesAPI.js     # API service for contact messages
└── routes/
    └── App.jsx                   # Updated with messages route
```

## API Integration

The Messages Page integrates with the following backend endpoints:

### Contact Messages Endpoints
- `GET /api/ContactMessages` - List all messages
- `GET /api/ContactMessages/{id}` - Get specific message
- `GET /api/ContactMessages/search` - Search messages
- `GET /api/ContactMessages/recent` - Get recent messages
- `GET /api/ContactMessages/stats` - Get message statistics
- `POST /api/ContactMessages/{id}/mark-replied` - Mark as replied
- `POST /api/ContactMessages/{id}/mark-unreplied` - Mark as unread
- `DELETE /api/ContactMessages/{id}` - Delete message
- `POST /api/ContactMessages/submit` - Submit new message

## Usage

### Accessing the Messages Page
1. Log in to the admin dashboard
2. Click on "Messages" in the sidebar navigation
3. Or navigate directly to `/admin/messages`

### Managing Messages
1. **View Messages**: All messages are displayed in cards with sender information
2. **Search**: Use the search bar to find specific messages
3. **Filter**: Use the filter chips to show All, Unread, or Replied messages
4. **Reply**: Click the "Reply" button to open the reply modal
5. **Mark Status**: Use the read/unread button to change message status
6. **Delete**: Click the delete button to remove messages (with confirmation)

### Replying to Messages
1. Click "Reply" on any message
2. The reply modal opens showing the original message
3. Type your reply in the text area
4. Click "Send Reply" to send the response
5. The message is automatically marked as replied

## Configuration

### Notification Settings
Notifications are automatically enabled and can be configured in the `useMessageNotifications` hook:

```javascript
// Polling interval for new messages (default: 30 seconds)
const { notifications, unreadCount } = useMessageNotifications();
```

### API Configuration
The API endpoints are configured in `src/lib/contactMessagesAPI.js` and use the base URL from `src/lib/api.js`.

## Styling

The Messages Page uses Tailwind CSS classes and Material-UI components with a custom dark theme:

- **Background**: `#001038` (main background)
- **Cards**: `#1f2937` (card backgrounds)
- **Borders**: `#374151` (subtle borders)
- **Accent**: `#3b82f6` (blue accent color)
- **Text**: White and gray variants for readability

## Dependencies

- React 18+
- React Router DOM
- Material-UI (MUI)
- Framer Motion
- Axios
- Tailwind CSS

## Future Enhancements

Potential future improvements:
- Email template system for replies
- Bulk message actions
- Message export functionality
- Advanced filtering options
- Message threading
- Auto-reply system
- Message analytics dashboard
- Email integration for sending replies

## Support

For issues or questions about the Messages Page feature, please refer to the main project documentation or contact the development team.
