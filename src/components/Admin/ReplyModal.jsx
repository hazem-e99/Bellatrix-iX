import React, { useState } from "react";
import Modal, { ModalFooter } from "../ui/Modal";
import { Input } from "../ui/Input";
import Button from "../ui/Button";
import { EnvelopeIcon, UserIcon } from "@heroicons/react/24/outline";

const ReplyModal = ({ open, onClose, message, onSubmit }) => {
  const [replyData, setReplyData] = useState({
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!replyData.subject.trim() || !replyData.message.trim()) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit(replyData);
      setReplyData({ subject: "", message: "" });
    } catch (error) {
      console.error("Error sending reply:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setReplyData({ subject: "", message: "" });
    onClose();
  };

  if (!message) return null;

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      title="Reply to Message"
      size="lg"
    >
      <div className="p-6">
        {/* Original Message Info */}
        <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {message.name ? message.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h4 className="text-white font-medium">{message.name || 'Unknown User'}</h4>
              <p className="text-gray-400 text-sm">{message.email || 'No email'}</p>
            </div>
          </div>
          {message.subject && (
            <p className="text-gray-300 text-sm mb-2">
              <strong>Subject:</strong> {message.subject}
            </p>
          )}
          <p className="text-gray-300 text-sm">
            <strong>Message:</strong> {message.message || 'No message content'}
          </p>
        </div>

        {/* Reply Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Reply Subject
            </label>
            <Input
              type="text"
              value={replyData.subject}
              onChange={(e) => setReplyData({ ...replyData, subject: e.target.value })}
              placeholder="Enter reply subject..."
              className="bg-white/5 border-white/20 text-white placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Reply Message
            </label>
            <textarea
              value={replyData.message}
              onChange={(e) => setReplyData({ ...replyData, message: e.target.value })}
              placeholder="Enter your reply message..."
              rows={6}
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>
        </form>
      </div>

      <ModalFooter>
        <Button
          onClick={handleClose}
          className="bg-gray-600 hover:bg-gray-700 text-white"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={loading || !replyData.subject.trim() || !replyData.message.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? "Sending..." : "Send Reply"}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ReplyModal;
