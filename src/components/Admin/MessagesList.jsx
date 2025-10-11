import React from "react";
import {
  PencilIcon,
  TrashIcon,
  EnvelopeIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import Button from "../ui/Button";
import Card, { CardContent } from "../ui/Card";
import { motion } from "framer-motion";
// Ensure linter recognizes usage in JSX by keeping a top-level reference
const MOTION_REF = motion;

const MessagesList = ({ messages, onMarkStatus, onDelete }) => {
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
      <Card className="bg-white/10 border border-white/20 shadow">
        <CardContent className="p-12 text-center">
          <EnvelopeIcon className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-400 mb-2">
            No messages found
          </h3>
          <p className="text-gray-500">
            There are no messages matching your current filters.
          </p>
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
                ? 'bg-white/10 border-white/20 hover:border-white/30 hover:shadow-white/10' 
                : 'bg-white/10 border-blue-500/50 shadow-blue-500/10 hover:border-blue-400 hover:shadow-blue-500/20'
            }`}
          >
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-4 sm:gap-0">
                {/* Message Header */}
                <div className="flex items-start space-x-4 flex-1 w-full">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-300 group-hover:scale-110 ${
                    message.isReplied ? 'bg-gray-600' : 'bg-blue-600'
                  }`}>
                    {getInitials((message.fullName || message.name || 'U').trim())}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className={`font-semibold group-hover:text-blue-300 transition-colors duration-300 ${
                        message.isReplied ? 'text-gray-300' : 'text-white'
                      }`}>
                        {message.fullName || message.name || 'Unknown User'}
                      </h3>
                      {!message.isReplied && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        >
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                            New
                          </span>
                        </motion.div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                      <div className="flex items-center space-x-1">
                        <EnvelopeIcon className="h-4 w-4" />
                        <span>{message.email || 'No email'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{formatDate(message.submittedAt || message.createdAt || message.date)}</span>
                      </div>
                    </div>
                    
                    {message.subject && (
                      <div className="flex items-center space-x-1 mb-2">
                        <span className="text-gray-400 text-sm font-medium">
                          {message.subject}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Message Status Badge */}
                <div className="flex-shrink-0">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    message.isReplied 
                      ? 'bg-green-600 text-white' 
                      : 'bg-orange-600 text-white'
                  }`}>
                    {message.isReplied ? 'Read' : 'Unread'}
                  </span>
                </div>
              </div>

              {/* Message Content */}
              <div className="mb-4">
                <p className={`leading-relaxed ${
                  message.isReplied ? 'text-gray-400' : 'text-gray-300'
                }`}>
                  {getMessagePreview(message.message || 'No message content')}
                </p>
              </div>

              <div className="border-t border-white/10 pt-4">
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
                  <div className="flex items-center space-x-2 justify-center sm:justify-start">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        icon={<PencilIcon className="h-4 w-4" />}
                        onClick={() => onMarkStatus(message.id, message.isReplied)}
                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                      >
                        {message.isReplied ? 'Unread' : 'Read'}
                      </Button>
                    </motion.div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      icon={<TrashIcon className="h-4 w-4" />}
                      onClick={() => onDelete(message.id)}
                      className="bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-300"
                    >
                      Delete
                    </Button>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default MessagesList;
