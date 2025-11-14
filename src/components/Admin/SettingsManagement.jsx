import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  UserGroupIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import Button from "../ui/Button";
import { Input } from "../ui/Input";
import Card, { CardContent, CardHeader, CardTitle } from "../ui/Card";
import Toast from "../ui/Toast";
import { useJsonData } from "../../hooks/useJsonData";
import Modal, { ModalFooter } from "../UI/Modal";
import FooterSettings from "../../pages/FooterSettings";
import AddAdminModal from "../AddAdminModal";

const SettingsManagement = () => {
  const [activeTab, setActiveTab] = useState("permissions");
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);

  const [permissionSettings, setPermissionSettings] = useState({
    roles: [
      {
        id: 1,
        name: "Administrator",
        permissions: ["read", "write", "delete", "manage_users"],
        users: 1,
      },
      { id: 2, name: "Editor", permissions: ["read", "write"], users: 3 },
      { id: 3, name: "Viewer", permissions: ["read"], users: 5 },
    ],
    defaultRole: "Viewer",
    requireApproval: true,
    sessionTimeout: 24,
  });

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [roleForm, setRoleForm] = useState({ name: "", permissions: [] });

  const availablePermissions = ["read", "write", "delete", "manage_users"];

  const openAddRole = () => {
    setEditingRoleId(null);
    setRoleForm({ name: "", permissions: [] });
    setIsRoleModalOpen(true);
  };

  const openEditRole = (role) => {
    setEditingRoleId(role.id);
    setRoleForm({ name: role.name, permissions: [...role.permissions] });
    setIsRoleModalOpen(true);
  };

  const closeRoleModal = () => {
    setIsRoleModalOpen(false);
    setEditingRoleId(null);
    setRoleForm({ name: "", permissions: [] });
  };

  const togglePermissionInForm = (perm) => {
    setRoleForm((prev) => {
      const has = prev.permissions.includes(perm);
      return {
        ...prev,
        permissions: has
          ? prev.permissions.filter((p) => p !== perm)
          : [...prev.permissions, perm],
      };
    });
  };

  const saveRoleFromForm = () => {
    if (!roleForm.name.trim()) {
      showToast("error", "Role name is required");
      return;
    }
    if (roleForm.permissions.length === 0) {
      showToast("error", "At least one permission is required");
      return;
    }

    setPermissionSettings((prev) => {
      const nextRoles = [...prev.roles];
      if (editingRoleId != null) {
        const idx = nextRoles.findIndex((r) => r.id === editingRoleId);
        if (idx >= 0) {
          nextRoles[idx] = {
            ...nextRoles[idx],
            name: roleForm.name,
            permissions: roleForm.permissions,
          };
        }
        showToast("success", "Role updated");
      } else {
        const maxId = Math.max(0, ...nextRoles.map((r) => r.id));
        nextRoles.push({
          id: maxId + 1,
          name: roleForm.name,
          permissions: roleForm.permissions,
          users: 0,
        });
        showToast("success", "Role added");
      }
      return { ...prev, roles: nextRoles };
    });

    setIsRoleModalOpen(false);
  };

  const { data: persistedSettings, updateData } = useJsonData("settings.json");

  useEffect(() => {
    if (persistedSettings && typeof persistedSettings === "object") {
      if (persistedSettings.permissionSettings) {
        setPermissionSettings((prev) => ({
          ...prev,
          ...persistedSettings.permissionSettings,
        }));
      }
    }
  }, [persistedSettings]);

  const saveAllSettings = async () => {
    if (!updateData) return false;
    const payload = {
      permissionSettings,
    };
    try {
      const ok = await updateData(payload, "settings.json");
      return ok;
    } catch {
      return false;
    }
  };

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 3000);
  };

  const handleSavePermissions = async () => {
    const ok = await saveAllSettings();
    showToast(
      ok ? "success" : "error",
      ok ? "Permission settings saved successfully" : "Failed to save settings"
    );
  };

  const handleAdminCreated = () => {
    showToast(
      "success",
      "Admin created successfully! Verification email sent."
    );
  };

  const renderPermissionSettings = () => (
    <div className="space-y-8">
      {/* User Roles & Permissions Section */}
      <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg">
                <ShieldCheckIcon className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-white text-xl font-bold">
                  User Roles & Permissions
                </CardTitle>
                <p className="text-gray-400 text-sm mt-1">
                  Manage user access levels and capabilities
                </p>
              </div>
            </div>
            <Button
              onClick={openAddRole}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-blue-500/25"
            >
              Add Role
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {permissionSettings.roles.map((role, roleIndex) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: roleIndex * 0.1 }}
                className="flex items-start justify-between p-5 bg-gradient-to-r from-white/5 to-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <ShieldCheckIcon className="h-5 w-5 text-blue-400" />
                        <h4 className="text-lg font-semibold text-white">
                          {role.name}
                        </h4>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="px-3 py-1 bg-blue-500/20 rounded-full border border-blue-400/30">
                          <div className="flex items-center space-x-2 text-sm text-blue-300">
                            <UserGroupIcon className="h-4 w-4" />
                            <span>
                              {role.users} user{role.users !== 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                        <div className="px-3 py-1 bg-purple-500/20 rounded-full border border-purple-400/30">
                          <div className="flex items-center space-x-2 text-sm text-purple-300">
                            <ShieldCheckIcon className="h-4 w-4" />
                            <span>
                              {role.permissions.length} permission
                              {role.permissions.length !== 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission, permIndex) => (
                      <motion.span
                        key={permission}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.2,
                          delay: permIndex * 0.05,
                        }}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 rounded-full border border-blue-400/30 hover:from-blue-500/30 hover:to-blue-600/30 transition-all duration-200"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                        {permission.replace("_", " ")}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditRole(role)}
                    className="text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 border border-transparent hover:border-blue-400/30 transition-all duration-200"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-400/30 transition-all duration-200"
                  >
                    Delete
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSavePermissions}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-blue-500/25 px-8 py-3"
        >
          Save Permission Settings
        </Button>
      </div>
    </div>
  );

  const tabs = [
    {
      id: "permissions",
      name: "Permissions",
      description: "User roles and access control",
      icon: UserGroupIcon,
    },
    {
      id: "footer",
      name: "Footer Settings",
      description: "Manage footer content and links",
      icon: Cog6ToothIcon,
    },
  ];

  return (
    <div className="min-h-screen text-white p-8" style={{ backgroundColor: "#001038" }}>
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold text-white">
              Settings Management
            </h1>
            <p className="text-gray-300 mt-2">
              Configure system preferences and access control
            </p>
          </div>

          {/* Add Admin Button (shown only on Permissions tab) */}
          {activeTab === "permissions" && (
            <Button
              onClick={() => setIsAddAdminModalOpen(true)}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-green-500/25 flex items-center gap-2"
            >
              <UserPlusIcon className="w-5 h-5" />
              Add Admin
            </Button>
          )}
        </motion.div>

        {/* Simple Horizontal Tabs */}
        <div className="flex gap-2 border-b border-white/10">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-6 py-3 font-medium transition-all duration-200 ${
                  isActive
                    ? "text-blue-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="[&_input]:bg-white/5 [&_input]:border-white/20 [&_input]:text-white [&_textarea]:bg-white/5 [&_textarea]:border-white/20 [&_textarea]:text-white">
            {activeTab === "permissions" && renderPermissionSettings()}
            {activeTab === "footer" && <FooterSettings />}
          </div>
        </motion.div>

        {toast.show && (
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast({ show: false, type: "", message: "" })}
          />
        )}
      </div>

      <Modal
        isOpen={isRoleModalOpen}
        onClose={closeRoleModal}
        title={editingRoleId != null ? "Edit Role" : "Add New Role"}
        className="border-white/20"
        style={{ backgroundColor: "#001038" }}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Role Name
            </label>
            <Input
              placeholder="Enter role name"
              value={roleForm.name}
              onChange={(e) =>
                setRoleForm((prev) => ({ ...prev, name: e.target.value }))
              }
              className="bg-white/5 border-white/20 text-white placeholder-gray-400"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              Permissions
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availablePermissions.map((perm) => {
                const checked = roleForm.permissions.includes(perm);
                return (
                  <motion.label
                    key={perm}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                      checked
                        ? "bg-blue-500/20 border-blue-400/50 text-blue-300"
                        : "bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/30"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={() => togglePermissionInForm(perm)}
                      />
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                          checked
                            ? "bg-blue-500 border-blue-500"
                            : "border-white/30 bg-transparent"
                        }`}
                      >
                        {checked && (
                          <motion.svg
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </motion.svg>
                        )}
                      </div>
                    </div>
                    <span className="capitalize font-medium">
                      {perm.replace("_", " ")}
                    </span>
                  </motion.label>
                );
              })}
            </div>
          </div>
        </div>

        <ModalFooter className="mt-8">
          <Button
            variant="ghost"
            onClick={closeRoleModal}
            className="text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20"
          >
            Cancel
          </Button>
          <Button
            onClick={saveRoleFromForm}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-blue-500/25"
          >
            {editingRoleId != null ? "Save Changes" : "Add Role"}
          </Button>
        </ModalFooter>
      </Modal>

      {/* Add Admin Modal */}
      <AddAdminModal
        isOpen={isAddAdminModalOpen}
        onClose={() => setIsAddAdminModalOpen(false)}
        onSuccess={handleAdminCreated}
      />
    </div>
  );
};

export default SettingsManagement;
