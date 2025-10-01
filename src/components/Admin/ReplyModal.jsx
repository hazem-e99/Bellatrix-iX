import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  Divider,
  Avatar,
  Chip,
  IconButton,
  Alert,
  Card,
} from "@mui/material";
import {
  Close as CloseIcon,
  Send as SendIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Subject as SubjectIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const ReplyModal = ({ open, onClose, message, onSubmit }) => {
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    setReplyText("");
    setError("");
    onClose();
  };

  const handleSubmit = async () => {
    if (!replyText.trim()) {
      setError("Please enter a reply message");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await onSubmit({
        messageId: message.id,
        replyText: replyText.trim(),
        recipientEmail: message.email,
        recipientName: message.name,
      });
      
      setReplyText("");
      handleClose();
    } catch (err) {
      setError("Failed to send reply. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!message) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      fullScreen={window.innerWidth < 768}
      PaperProps={{
        sx: {
          background: 'linear-gradient(145deg, #1f2937 0%, #111827 100%)',
          border: '1px solid #374151',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)',
          backdropFilter: 'blur(16px)',
        },
      }}
    >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
        {/* Header */}
        <DialogTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-b border-gray-700 gap-4 sm:gap-0">
          <div className="flex items-center space-x-3">
            <motion.div 
              className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <SendIcon className="text-white text-xl" />
            </motion.div>
            <div>
              <Typography variant="h6" className="text-white font-bold">
                Reply to Message
              </Typography>
              <Typography variant="body2" className="text-gray-400">
                Send a response to {message.name || 'the sender'}
              </Typography>
            </div>
          </div>
          <IconButton
            onClick={handleClose}
            className="text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent className="p-4 sm:p-6">
          {/* Original Message */}
          <Box className="mb-6">
            <Typography variant="h6" className="text-white font-semibold mb-4">
              Original Message
            </Typography>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 rounded-xl p-4 shadow-lg">
              <div className="flex items-start space-x-3 mb-3">
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: '#3b82f6',
                    fontSize: '0.875rem',
                  }}
                >
                  {getInitials(message.name || 'U')}
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Typography variant="subtitle1" className="text-white font-medium">
                      {message.name || 'Unknown User'}
                    </Typography>
                    <Chip
                      label="Original"
                      size="small"
                      className="bg-gray-600 text-gray-300"
                    />
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
                </div>
              </div>

              {message.subject && (
                <div className="flex items-center space-x-1 mb-3">
                  <SubjectIcon fontSize="small" className="text-gray-400" />
                  <Typography variant="body2" className="text-gray-300 font-medium">
                    {message.subject}
                  </Typography>
                </div>
              )}

              <Typography variant="body2" className="text-gray-300 leading-relaxed">
                {message.message || 'No message content'}
              </Typography>
              </Card>
            </motion.div>
          </Box>

          <Divider className="border-gray-700 mb-6" />

          {/* Reply Form */}
          <Box>
            <Typography variant="h6" className="text-white font-semibold mb-4">
              Your Reply
            </Typography>
            
            {/* Recipient Info */}
            <motion.div 
              className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-600 rounded-lg p-4 mb-4 shadow-md"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center space-x-2 text-sm">
                <PersonIcon fontSize="small" className="text-gray-400" />
                <span className="text-gray-400">Replying to:</span>
                <span className="text-white font-medium">{message.name || 'Unknown User'}</span>
                <span className="text-gray-500">•</span>
                <EmailIcon fontSize="small" className="text-gray-400" />
                <span className="text-gray-300">{message.email || 'No email'}</span>
              </div>
            </motion.div>

            <TextField
              multiline
              rows={8}
              fullWidth
              placeholder="Type your reply here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(55, 65, 81, 0.5)',
                  color: 'white',
                  borderRadius: '12px',
                  border: '1px solid rgba(75, 85, 99, 0.5)',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid rgba(59, 130, 246, 0.5)',
                  },
                  '& textarea::placeholder': {
                    color: '#9ca3af',
                  },
                },
              }}
            />

            {error && (
              <Alert severity="error" className="mt-4">
                {error}
              </Alert>
            )}
          </Box>
        </DialogContent>

        {/* Actions */}
        <DialogActions className="p-4 sm:p-6 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between w-full gap-3 sm:gap-0">
            <Typography variant="body2" className="text-gray-400">
              This reply will be sent to {message.email || 'the sender'}
            </Typography>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <Button
                onClick={handleClose}
                className="text-gray-300 hover:text-white hover:bg-gray-700"
              >
                Cancel
              </Button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading || !replyText.trim()}
                  startIcon={loading ? null : <SendIcon />}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white disabled:bg-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                >
                  {loading ? 'Sending...' : 'Send Reply'}
                </Button>
              </motion.div>
            </div>
          </div>
        </DialogActions>
      </motion.div>
    </Dialog>
  );
};

export default ReplyModal;
