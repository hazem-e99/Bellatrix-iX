import { create } from "zustand";
import api from "../lib/api";
import { toast } from "react-hot-toast";

// ============================================================================
// Initial State
// ============================================================================

const initialState = {
  settings: [],
  loading: false,
  error: null,
  lastFetchTime: null,
};

// ============================================================================
// Zustand Store
// ============================================================================

export const useSettingsStore = create((set, get) => ({
  ...initialState,

  // ========================================================================
  // Fetch All Settings (Admin - requires auth)
  // ========================================================================
  fetchSettings: async () => {
    set({ loading: true, error: null });
    console.log("📥 Fetching all settings...");

    try {
      const response = await api.get("/Settings");
      const settings = response.data || [];
      console.log(`✅ Fetched ${settings.length} settings`);

      set({
        settings,
        loading: false,
        lastFetchTime: Date.now(),
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch settings";
      console.error("❌ Error fetching settings:", errorMessage);

      set({
        error: errorMessage,
        loading: false,
      });

      toast.error("Failed to load settings");
    }
  },

  // ========================================================================
  // Fetch Public Settings (No auth required)
  // ========================================================================
  fetchPublicSettings: async () => {
    set({ loading: true, error: null });
    console.log("📥 Fetching public settings...");

    try {
      const response = await api.get("/Settings/public");
      const settings = response.data || [];
      console.log(`✅ Fetched ${settings.length} public settings`);

      set({
        settings,
        loading: false,
        lastFetchTime: Date.now(),
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch public settings";
      console.error("❌ Error fetching public settings:", errorMessage);

      set({
        error: errorMessage,
        loading: false,
      });

      toast.error("Failed to load settings");
    }
  },

  // ========================================================================
  // Fetch Settings by Category
  // ========================================================================
  fetchSettingsByCategory: async (category) => {
    set({ loading: true, error: null });
    console.log(`📥 Fetching settings for category: ${category}...`);

    try {
      const response = await api.get(`/Settings/category/${category}`);
      const settings = response.data || [];
      console.log(
        `✅ Fetched ${settings.length} settings for category: ${category}`
      );

      set({
        settings,
        loading: false,
        lastFetchTime: Date.now(),
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        `Failed to fetch ${category} settings`;
      console.error("❌ Error fetching category settings:", errorMessage);

      set({
        error: errorMessage,
        loading: false,
      });

      toast.error(`Failed to load ${category} settings`);
    }
  },

  // ========================================================================
  // Get Setting by Key (from current state)
  // ========================================================================
  getSettingByKey: (key) => {
    return get().settings.find((s) => s.key === key);
  },

  // ========================================================================
  // Save Settings (Smart Create/Update Logic)
  // ========================================================================
  saveSettings: async (updatedSettings) => {
    set({ loading: true, error: null });
    console.log(`💾 Saving ${updatedSettings.length} settings...`);

    const currentSettings = get().settings;
    const settingsToUpdate = [];
    const settingsToCreate = [];

    // Separate updates from creates
    updatedSettings.forEach((setting) => {
      const existing = currentSettings.find((s) => s.key === setting.key);

      if (existing) {
        // Skip if value hasn't changed
        if (existing.value === setting.value) {
          console.log(`⏭️ Skipping ${setting.key} - value unchanged`);
          return;
        }

        console.log(
          `📝 Marking ${setting.key} for UPDATE (ID: ${existing.id})`
        );
        settingsToUpdate.push({
          id: existing.id,
          key: setting.key,
          value: setting.value,
          description: setting.description || existing.description || "",
          category: setting.category || existing.category || "",
          isPublic: setting.isPublic ?? existing.isPublic,
          dataType: setting.dataType || existing.dataType || "string",
        });
      } else {
        // Only create if value is not empty
        if (setting.value && setting.value.trim()) {
          console.log(`➕ Marking ${setting.key} for CREATE`);
          settingsToCreate.push(setting);
        }
      }
    });

    console.log(
      `\n📊 Summary: ${settingsToUpdate.length} to update, ${settingsToCreate.length} to create\n`
    );

    let successCount = 0;
    let failCount = 0;

    try {
      // ========== Bulk Update Existing Settings ==========
      if (settingsToUpdate.length > 0) {
        console.log("🔄 Bulk updating existing settings:", settingsToUpdate);

        try {
          await api.put("/Settings/bulk", settingsToUpdate);
          successCount += settingsToUpdate.length;
          console.log(
            `✅ Successfully bulk updated ${settingsToUpdate.length} settings`
          );
        } catch (bulkError) {
          console.error("❌ Bulk update failed:", bulkError);
          failCount += settingsToUpdate.length;
          throw bulkError;
        }
      }

      // ========== Create New Settings ==========
      if (settingsToCreate.length > 0) {
        console.log("➕ Creating new settings:", settingsToCreate);

        const createResults = await Promise.allSettled(
          settingsToCreate.map(async (setting) => {
            try {
              console.log(`📤 POST /Settings for ${setting.key}`);
              const newSetting = await api.post("/Settings", setting);
              console.log(`✅ Created: ${setting.key}`);
              successCount++;
              return newSetting.data;
            } catch (createError) {
              const errorMessage = createError.response?.data?.message || "";

              // If key already exists, try bulk update
              if (errorMessage.includes("Setting key already exists")) {
                console.log(
                  `🔄 Key ${setting.key} exists, trying bulk update...`
                );

                try {
                  // Fetch the existing setting to get its ID
                  const existingSetting = await api.get(
                    `/Settings/key/${setting.key}`
                  );
                  const existingId = existingSetting.data.id;

                    // Perform bulk update
                    await api.put("/Settings/bulk", [
                      {
                        id: existingId,
                        key: setting.key,
                        value: setting.value,
                        description: setting.description || "",
                        category: setting.category || "footer",
                        isPublic: setting.isPublic ?? true,
                        dataType: setting.dataType || "string",
                      },
                    ]);

                    console.log(
                      `✅ Auto-updated existing setting: ${setting.key}`
                    );
                    successCount++;
                    return;
                  }
                } catch (updateError) {
                  console.error(
                    `❌ Failed to auto-update ${setting.key}:`,
                    updateError
                  );
                  failCount++;
                  throw updateError;
                }
              } else {
                console.error(
                  `❌ Failed to create ${setting.key}:`,
                  createError
                );
                failCount++;
                throw createError;
              }
            }
          })
        );

        // Count create failures
        const createFailures = createResults.filter(
          (r) => r.status === "rejected"
        ).length;
        if (createFailures > 0) {
          failCount += createFailures;
        }
      }

      // ========== Show Appropriate Toast Message ==========
      if (successCount > 0 && failCount === 0) {
        if (settingsToUpdate.length > 0 && settingsToCreate.length === 0) {
          toast.success("Footer settings updated successfully");
        } else if (
          settingsToCreate.length > 0 &&
          settingsToUpdate.length === 0
        ) {
          toast.success("Footer settings saved successfully");
        } else {
          toast.success("Footer settings saved and updated successfully");
        }
      } else if (successCount > 0 && failCount > 0) {
        toast.success(`${successCount} settings saved, ${failCount} failed`);
      } else if (failCount > 0) {
        toast.error("Failed to save footer settings. Please try again.");
      } else {
        toast.success("Footer settings processed successfully");
      }

      // ========== Refetch to update state ==========
      console.log("🔄 Refetching settings...");
      await get().fetchSettingsByCategory(
        updatedSettings[0]?.category || "footer"
      );

      set({ loading: false });
      return successCount > 0;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to save settings";
      console.error("❌ Error saving settings:", errorMessage);

      set({
        error: errorMessage,
        loading: false,
      });

      toast.error("Failed to save footer settings. Please try again.");

      return false;
    }
  },

  // ========================================================================
  // Create Single Setting
  // ========================================================================
  createSetting: async (setting) => {
    console.log(`➕ Creating setting: ${setting.key}`);

    try {
      const response = await api.post("/Settings", setting);
      const newSetting = response.data;
      console.log(`✅ Created setting: ${setting.key}`);

      // Update local state
      set((state) => ({
        settings: [...state.settings, newSetting],
      }));

      toast.success("Setting saved successfully");
      return newSetting;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "";

      // Auto-handle "key already exists" error
      if (errorMessage.includes("Setting key already exists")) {
        console.log(`🔄 Key ${setting.key} exists, trying bulk update...`);

        try {
          // Fetch existing to get ID
          const existingResponse = await api.get(
            `/Settings/key/${setting.key}`
          );
          const existing = existingResponse.data;

          // Use bulk update
          await api.put("/Settings/bulk", [
            {
              id: existing.id,
              key: setting.key,
              value: setting.value,
              description: setting.description || existing.description,
              category: setting.category || existing.category,
              isPublic: setting.isPublic ?? existing.isPublic,
              dataType: setting.dataType || existing.dataType,
            },
          ]);

          console.log(`✅ Auto-updated existing setting: ${setting.key}`);

          // Update local state
          set((state) => ({
            settings: state.settings.map((s) =>
              s.key === setting.key
                ? {
                    ...s,
                    value: setting.value,
                    updatedAt: new Date().toISOString(),
                  }
                : s
            ),
          }));

          toast.success("Existing setting updated successfully");
          return existing;
        } catch (updateError) {
          console.error(
            `❌ Failed to auto-update ${setting.key}:`,
            updateError
          );
          toast.error("Failed to update setting. Please try again.");
          return null;
        }
      }

      console.error(`❌ Failed to create setting:`, error);
      toast.error("Failed to save setting. Please try again.");
      return null;
    }
  },

  // ========================================================================
  // Update Single Setting
  // ========================================================================
  updateSetting: async (id, setting) => {
    console.log(`📝 Updating setting ID: ${id}`);

    try {
      await api.put("/Settings", setting);
      console.log(`✅ Updated setting ID: ${id}`);

      // Update local state
      set((state) => ({
        settings: state.settings.map((s) =>
          s.id === id
            ? { ...s, ...setting, updatedAt: new Date().toISOString() }
            : s
        ),
      }));

      return true;
    } catch (error) {
      console.error(`❌ Failed to update setting:`, error);
      return false;
    }
  },

  // ========================================================================
  // Bulk Update Settings
  // ========================================================================
  bulkUpdateSettings: async (settings) => {
    console.log(`🔄 Bulk updating ${settings.length} settings...`);

    try {
      await api.put("/Settings/bulk", settings);
      console.log(`✅ Bulk updated ${settings.length} settings`);

      // Update local state
      set((state) => ({
        settings: state.settings.map((s) => {
          const updated = settings.find((u) => u.id === s.id);
          return updated
            ? { ...s, ...updated, updatedAt: new Date().toISOString() }
            : s;
        }),
      }));

      return true;
    } catch (error) {
      console.error(`❌ Bulk update failed:`, error);
      return false;
    }
  },

  // ========================================================================
  // Delete Setting
  // ========================================================================
  deleteSetting: async (id) => {
    console.log(`🗑️ Deleting setting ID: ${id}`);

    try {
      await api.delete(`/Settings/${id}`);
      console.log(`✅ Deleted setting ID: ${id}`);

      // Remove from local state
      set((state) => ({
        settings: state.settings.filter((s) => s.id !== id),
      }));

      toast.success("Setting deleted successfully");
      return true;
    } catch (error) {
      console.error(`❌ Failed to delete setting:`, error);
      toast.error("Failed to delete setting");
      return false;
    }
  },

  // ========================================================================
  // Reset Store
  // ========================================================================
  resetStore: () => {
    console.log("🔄 Resetting settings store...");
    set(initialState);
  },
}));

// ============================================================================
// Utility Hooks
// ============================================================================

/**
 * Hook to get settings as a key-value map
 */
export const useSettingsMap = () => {
  const settings = useSettingsStore((s) => s.settings);

  return settings.reduce((map, setting) => {
    map[setting.key] = setting.value;
    return map;
  }, {});
};

/**
 * Hook to get a specific setting by key
 */
export const useSetting = (key) => {
  return useSettingsStore((s) =>
    s.settings.find((setting) => setting.key === key)
  );
};

/**
 * Hook to get settings by category
 */
export const useSettingsByCategory = (category) => {
  return useSettingsStore((s) =>
    s.settings.filter((setting) => setting.category === category)
  );
};
