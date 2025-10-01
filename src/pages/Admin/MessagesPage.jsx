import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  Avatar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextareaAutosize,
  Snackbar,
} from "@mui/material";
import {
  Search as SearchIcon,
  Reply as ReplyIcon,
  Delete as DeleteIcon,
  MarkEmailRead as MarkReadIcon,
  MarkEmailUnread as MarkUnreadIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import MessagesList from "../../components/Admin/MessagesList";
import ReplyModal from "../../components/Admin/ReplyModal";
import { 
  getContactMessages, 
  markMessageAsReplied, 
  markMessageAsUnreplied, 
  deleteContactMessage,
  sendReply 
} from "../../lib/contactMessagesAPI";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, unread, read
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: "", type: "success" });

  // Fetch messages from API
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await getContactMessages();
      
      if (response.success) {
        setMessages(response.data || []);
        setFilteredMessages(response.data || []);
      } else {
        setError(response.message || "Failed to fetch messages");
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Failed to fetch messages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter messages based on search and status
  const filterMessages = () => {
    let filtered = messages;

    // Filter by status
    if (filterStatus === "unread") {
      filtered = filtered.filter(msg => !msg.isReplied);
    } else if (filterStatus === "read") {
      filtered = filtered.filter(msg => msg.isReplied);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(msg =>
        msg.name?.toLowerCase().includes(query) ||
        msg.email?.toLowerCase().includes(query) ||
        msg.subject?.toLowerCase().includes(query) ||
        msg.message?.toLowerCase().includes(query)
      );
    }

    setFilteredMessages(filtered);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle filter status change
  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  // Handle reply button click
  const handleReply = (message) => {
    setSelectedMessage(message);
    setReplyModalOpen(true);
  };

  // Handle mark as read/unread
  const handleMarkStatus = async (messageId, isReplied) => {
    try {
      const response = isReplied ? 
        await markMessageAsUnreplied(messageId) : 
        await markMessageAsReplied(messageId);
      
      if (response.success) {
        // Update the message in the list
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, isReplied: !isReplied } : msg
        ));
        setNotification({
          open: true,
          message: isReplied ? "Message marked as unread" : "Message marked as read",
          type: "success"
        });
      } else {
        setNotification({
          open: true,
          message: response.message || "Failed to update message status",
          type: "error"
        });
      }
    } catch (err) {
      console.error("Error updating message status:", err);
      setNotification({
        open: true,
        message: "Failed to update message status",
        type: "error"
      });
    }
  };

  // Handle delete message
  const handleDelete = async (messageId) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        const response = await deleteContactMessage(messageId);
        
        if (response.success) {
          setMessages(prev => prev.filter(msg => msg.id !== messageId));
          setNotification({
            open: true,
            message: "Message deleted successfully",
            type: "success"
          });
        } else {
          setNotification({
            open: true,
            message: response.message || "Failed to delete message",
            type: "error"
          });
        }
      } catch (err) {
        console.error("Error deleting message:", err);
        setNotification({
          open: true,
          message: "Failed to delete message",
          type: "error"
        });
      }
    }
  };

  // Handle reply submission
  const handleReplySubmit = async (replyData) => {
    try {
      const response = await sendReply(selectedMessage.id, replyData);
      
      if (response.success) {
        // Update the message in the list
        setMessages(prev => prev.map(msg => 
          msg.id === selectedMessage.id ? { ...msg, isReplied: true } : msg
        ));
        
        setReplyModalOpen(false);
        setSelectedMessage(null);
        setNotification({
          open: true,
          message: "Reply sent successfully",
          type: "success"
        });
      } else {
        setNotification({
          open: true,
          message: response.message || "Failed to send reply",
          type: "error"
        });
      }
    } catch (err) {
      console.error("Error sending reply:", err);
      setNotification({
        open: true,
        message: "Failed to send reply",
        type: "error"
      });
    }
  };

  // Load messages on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  // Filter messages when search query or filter status changes
  useEffect(() => {
    filterMessages();
  }, [searchQuery, filterStatus, messages]);

  // Get stats for dashboard
  const stats = {
    total: messages.length,
    unread: messages.filter(msg => !msg.isReplied).length,
    read: messages.filter(msg => msg.isReplied).length,
  };

  if (loading) {
    return (
      <Box className="flex items-center justify-center min-h-screen">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#001038' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="p-3 sm:p-6 lg:p-8 xl:p-10"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
            <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg">
              <EmailIcon className="text-white text-xl sm:text-2xl" />
            </div>
            <div>
              <Typography variant="h4" className="text-white font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent text-2xl sm:text-3xl lg:text-4xl">
                Messages
              </Typography>
              <Typography variant="body1" className="text-gray-400 text-sm sm:text-base">
                Manage contact form messages and replies
              </Typography>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <Grid container spacing={3} className="mb-8">
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Typography variant="h4" className="text-white font-bold">
                      {stats.total}
                    </Typography>
                    <Typography variant="body2" className="text-gray-400">
                      Total Messages
                    </Typography>
                  </div>
                  <EmailIcon className="text-blue-400 text-3xl" />
                </div>
              </CardContent>
              </Card>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Typography variant="h4" className="text-white font-bold">
                      {stats.unread}
                    </Typography>
                    <Typography variant="body2" className="text-gray-400">
                      Unread Messages
                    </Typography>
                  </div>
                  <MarkUnreadIcon className="text-orange-400 text-3xl" />
                </div>
              </CardContent>
              </Card>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Typography variant="h4" className="text-white font-bold">
                      {stats.read}
                    </Typography>
                    <Typography variant="body2" className="text-gray-400">
                      Replied Messages
                    </Typography>
                  </div>
                  <MarkReadIcon className="text-green-400 text-3xl" />
                </div>
              </CardContent>
              </Card>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Typography variant="h4" className="text-white font-bold">
                      {stats.unread > 0 ? `${((stats.read / stats.total) * 100).toFixed(0)}%` : '100%'}
                    </Typography>
                    <Typography variant="body2" className="text-gray-400">
                      Response Rate
                    </Typography>
                  </div>
                  <ScheduleIcon className="text-purple-400 text-3xl" />
                </div>
              </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-2xl mb-6 shadow-xl backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-stretch lg:items-center justify-between">
              {/* Search */}
              <TextField
                size="small"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
                className="flex-1 w-full lg:max-w-md"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(55, 65, 81, 0.5)",
                    color: "white",
                    borderRadius: "12px",
                    border: "1px solid rgba(75, 85, 99, 0.5)",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid rgba(59, 130, 246, 0.5)",
                    },
                    "& input::placeholder": {
                      color: "#9ca3af",
                    },
                  },
                }}
              />

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2 justify-center lg:justify-start">
                <FilterIcon className="text-gray-400" />
                <Chip
                  label="All"
                  onClick={() => handleFilterChange("all")}
                  color={filterStatus === "all" ? "primary" : "default"}
                  className={filterStatus === "all" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}
                />
                <Chip
                  label="Unread"
                  onClick={() => handleFilterChange("unread")}
                  color={filterStatus === "unread" ? "primary" : "default"}
                  className={filterStatus === "unread" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}
                />
                <Chip
                  label="Replied"
                  onClick={() => handleFilterChange("read")}
                  color={filterStatus === "read" ? "primary" : "default"}
                  className={filterStatus === "read" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}
                />
              </div>

              {/* Refresh Button */}
              <IconButton
                onClick={fetchMessages}
                className="text-gray-300 hover:text-white hover:bg-gray-700"
              >
                <RefreshIcon />
              </IconButton>
            </div>
          </CardContent>
          </Card>
        </motion.div>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" className="mb-6">
            {error}
          </Alert>
        )}

        {/* Messages List */}
        <MessagesList
          messages={filteredMessages}
          onReply={handleReply}
          onMarkStatus={handleMarkStatus}
          onDelete={handleDelete}
        />

        {/* Reply Modal */}
        <ReplyModal
          open={replyModalOpen}
          onClose={() => setReplyModalOpen(false)}
          message={selectedMessage}
          onSubmit={handleReplySubmit}
        />

        {/* Notification Snackbar */}
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={() => setNotification({ ...notification, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={() => setNotification({ ...notification, open: false })} 
            severity={notification.type}
            className="bg-gray-800 text-white border border-gray-600"
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </motion.div>
    </div>
  );
};

export default MessagesPage;
