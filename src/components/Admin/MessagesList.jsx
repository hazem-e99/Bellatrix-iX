import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  IconButton,
  Avatar,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  Reply as ReplyIcon,
  Delete as DeleteIcon,
  MarkEmailRead as MarkReadIcon,
  MarkEmailUnread as MarkUnreadIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  Subject as SubjectIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const MessagesList = ({ messages, onReply, onMarkStatus, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString();
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getMessagePreview = (message) => {
    return message.length > 150 ? message.substring(0, 150) + '...' : message;
  };

  if (messages.length === 0) {
    return (
      <Card className="bg-gray-800 border border-gray-700 rounded-2xl">
        <CardContent className="p-12 text-center">
          <EmailIcon className="text-gray-500 text-6xl mx-auto mb-4" />
          <Typography variant="h6" className="text-gray-400 mb-2">
            No messages found
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            There are no messages matching your current filters.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ y: -4 }}
        >
          <Card 
            className={`group border rounded-2xl transition-all duration-300 hover:shadow-2xl cursor-pointer ${
              message.isReplied 
                ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-gray-600 hover:shadow-gray-900/20' 
                : 'bg-gradient-to-br from-gray-800 to-gray-900 border-blue-500 shadow-blue-500/10 hover:border-blue-400 hover:shadow-blue-500/30'
            }`}
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-4 sm:gap-0">
                {/* Message Header */}
                <div className="flex items-start space-x-3 sm:space-x-4 flex-1 w-full">
                  <Avatar
                    sx={{
                      width: 52,
                      height: 52,
                      bgcolor: message.isReplied ? '#6b7280' : '#3b82f6',
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      boxShadow: message.isReplied ? '0 4px 12px rgba(107, 114, 128, 0.3)' : '0 4px 12px rgba(59, 130, 246, 0.4)',
                      transition: 'all 0.3s ease',
                    }}
                    className="group-hover:scale-110 transition-transform duration-300"
                  >
                    {getInitials(message.name || 'U')}
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <Typography 
                        variant="h6" 
                        className={`font-semibold group-hover:text-blue-300 transition-colors duration-300 ${
                          message.isReplied ? 'text-gray-300' : 'text-white'
                        }`}
                      >
                        {message.name || 'Unknown User'}
                      </Typography>
                      {!message.isReplied && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        >
                          <Chip
                            label="New"
                            size="small"
                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs shadow-lg"
                          />
                        </motion.div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                      <div className="flex items-center space-x-1">
                        <EmailIcon fontSize="small" />
                        <span>{message.email || 'No email'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ScheduleIcon fontSize="small" />
                        <span>{formatDate(message.createdAt || message.date)}</span>
                      </div>
                    </div>
                    
                    {message.subject && (
                      <div className="flex items-center space-x-1 mb-2">
                        <SubjectIcon fontSize="small" className="text-gray-400" />
                        <Typography variant="body1" className="text-gray-300 font-medium">
                          {message.subject}
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>

                {/* Message Status Badge */}
                <div className="flex-shrink-0">
                  <Chip
                    label={message.isReplied ? 'Replied' : 'Unread'}
                    size="small"
                    className={
                      message.isReplied 
                        ? 'bg-green-600 text-white' 
                        : 'bg-orange-600 text-white'
                    }
                  />
                </div>
              </div>

              {/* Message Content */}
              <Box className="mb-4">
                <Typography 
                  variant="body2" 
                  className={`leading-relaxed ${
                    message.isReplied ? 'text-gray-400' : 'text-gray-300'
                  }`}
                >
                  {getMessagePreview(message.message || 'No message content')}
                </Typography>
              </Box>

              <Divider className="border-gray-700 mb-4" />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
              <div className="flex items-center space-x-2 justify-center sm:justify-start">
                <Tooltip title="Reply to message">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<ReplyIcon />}
                      onClick={() => onReply(message)}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                    >
                      Reply
                    </Button>
                  </motion.div>
                </Tooltip>
                  
                <Tooltip title={message.isReplied ? "Mark as unread" : "Mark as read"}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => onMarkStatus(message.id, message.isReplied)}
                      className="text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-xl transition-all duration-300"
                    >
                      {message.isReplied ? <MarkUnreadIcon /> : <MarkReadIcon />}
                    </IconButton>
                  </motion.div>
                </Tooltip>
                </div>

                <Tooltip title="Delete message">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => onDelete(message.id)}
                      className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </motion.div>
                </Tooltip>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default MessagesList;
