// ...imports and top-level code remain unchanged...
import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import toast from "react-hot-toast";

const API_BASE = "http://bellatrix.runasp.net/api/Categories";
const NAVBAR_API = "http://bellatrix.runasp.net/api/Categories/navbar";

function CategoriesManagement() {
  // Delete state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  // Search state
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  // Debounce search
  useEffect(() => {
    if (search.trim() === "") {
      fetchCategories();
      return;
    }
    const handler = setTimeout(async () => {
      setSearching(true);
      try {
        const token = localStorage.getItem("adminToken");
        const res = await fetch(
          `http://bellatrix.runasp.net/api/Categories/search?keyword=${encodeURIComponent(
            search
          )}`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );
        const data = await res.json();
        let cats = [];
        if (Array.isArray(data)) {
          cats = data;
        } else if (Array.isArray(data.data)) {
          cats = data.data;
        } else if (Array.isArray(data.result)) {
          cats = data.result;
        }
        setCategories(cats);
      } catch {
        setCategories([]);
      } finally {
        setSearching(false);
      }
    }, 400);
    return () => clearTimeout(handler);
    // eslint-disable-next-line
  }, [search]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    name: "",
    description: "",
    sortOrder: 0,
  });
  const [saving, setSaving] = useState(false);
  // Edit state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    sortOrder: 0,
  });
  const [editLoading, setEditLoading] = useState(false);

  // Fetch all categories
  // Fetch all categories

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(NAVBAR_API);
      const data = await res.json();
      let cats = [];
      if (Array.isArray(data)) {
        cats = data;
      } else if (Array.isArray(data.data)) {
        cats = data.data;
      } else if (Array.isArray(data.result)) {
        cats = data.result;
      }
      setCategories(cats);
    } catch {
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Check if category name already exists
  const isCategoryNameExists = (name) => {
    return categories.some(cat => 
      cat.name.toLowerCase().trim() === name.toLowerCase().trim()
    );
  };

  // Add Category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    
    // Validate category name
    if (!addForm.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    // Check for duplicate name
    if (isCategoryNameExists(addForm.name)) {
      toast.error(`Category "${addForm.name}" already exists. Please choose a different name.`);
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          ...addForm,
          name: addForm.name.trim() // Trim whitespace
        }),
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        toast.success("Category added successfully");
        setShowAddModal(false);
        setAddForm({ name: "", description: "", sortOrder: 0 });
        fetchCategories();
      } else {
        // Handle specific error cases
        if (data.message && data.message.includes("duplicate")) {
          toast.error(`Category "${addForm.name}" already exists. Please choose a different name.`);
        } else if (data.message && data.message.includes("unique")) {
          toast.error(`Category "${addForm.name}" already exists. Please choose a different name.`);
        } else {
          toast.error(data.message || "An error occurred while adding the category");
        }
      }
    } catch (error) {
      console.error("Add category error:", error);
      toast.error("Failed to add category. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-[var(--color-primary-light)]">
            Categories Management
          </h2>
          <input
            type="text"
            className="mt-1 w-full sm:w-64 border border-gray-300 rounded px-3 py-2 text-sm text-black bg-white placeholder-gray-500"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={loading || searching}
          />
        </div>
        <button
          className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500 h-10 px-4 py-2"
          onClick={() => setShowAddModal(true)}
        >
          + Add New Category
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-200 bg-[var(--color-brand-dark-navy)] rounded-2xl shadow-xl">
          <thead className="text-xs uppercase bg-[var(--color-brand-variant)] text-[var(--color-primary-light)]">
            <tr>
              <th className="px-6 py-4 rounded-tl-2xl">ID</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Sort Order</th>
              <th className="px-6 py-4 rounded-tr-2xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading || searching ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-lg text-gray-400"
                >
                  Loading...
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-lg text-gray-400"
                >
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((cat, idx) => (
                <tr
                  key={cat.id}
                  className={`transition-colors duration-150 ${
                    idx % 2 === 0
                      ? "bg-[var(--color-brand-dark-navy)]"
                      : "bg-[var(--color-brand-variant)]/40"
                  } hover:bg-[var(--color-primary)]/10 border-b border-[var(--color-white-10)]`}
                >
                  <td className="px-6 py-4 font-semibold text-[var(--color-primary-light)]">
                    {cat.id}
                  </td>
                  <td className="px-6 py-4 text-white">{cat.name}</td>
                  <td className="px-6 py-4 text-gray-300">{cat.description}</td>
                  <td className="px-6 py-4 text-white">{cat.sortOrder}</td>
                
                  <td className="px-6 py-4 space-x-2">
                    <button
                      className="inline-block px-3 py-1 rounded-lg bg-[var(--color-primary)] text-white font-medium shadow hover:bg-[var(--color-primary-light)] transition"
                      onClick={async () => {
                        setEditId(cat.id);
                        setShowEditModal(true);
                        setEditLoading(true);
                        try {
                          const token = localStorage.getItem("adminToken");
                          const res = await fetch(`${API_BASE}/${cat.id}`, {
                            headers: {
                              "Content-Type": "application/json",
                              ...(token
                                ? { Authorization: `Bearer ${token}` }
                                : {}),
                            },
                          });
                          const data = await res.json();
                          if (data && data.data) {
                            setEditForm({
                              name: data.data.name || "",
                              description: data.data.description || "",
                              sortOrder: data.data.sortOrder || 0,
                            });
                          }
                        } catch {
                          toast.error("Failed to load category data");
                          setShowEditModal(false);
                        } finally {
                          setEditLoading(false);
                        }
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="inline-block px-3 py-1 rounded-lg bg-red-600 text-white font-medium shadow hover:bg-red-700 transition"
                      onClick={() => {
                        setDeleteId(cat.id);
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </button>
                    {/* Delete Category Modal */}
                    <Modal
                      isOpen={showDeleteModal}
                      onClose={() => setShowDeleteModal(false)}
                      title="Delete Category"
                    >
                      <div className="p-4">
                        <p className="mb-4 text-lg">
                          Are you sure you want to delete this category?
                        </p>
                        <div className="flex justify-end space-x-2">
                          <button
                            className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded"
                            onClick={() => setShowDeleteModal(false)}
                            disabled={deleting}
                          >
                            Cancel
                          </button>
                          <button
                            className="bg-red-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-red-700 transition"
                            onClick={async () => {
                              setDeleting(true);
                              try {
                                const token = localStorage.getItem(
                                  "adminToken"
                                );
                                const res = await fetch(
                                  `${API_BASE}/${deleteId}`,
                                  {
                                    method: "DELETE",
                                    headers: {
                                      "Content-Type": "application/json",
                                      ...(token
                                        ? { Authorization: `Bearer ${token}` }
                                        : {}),
                                    },
                                  }
                                );
                                const data = await res.json();
                                if (data.success) {
                                  toast.success(
                                    "Category deleted successfully"
                                  );
                                  setShowDeleteModal(false);
                                  setDeleteId(null);
                                  fetchCategories();
                                } else {
                                  toast.error(
                                    data.message ||
                                      "An error occurred while deleting"
                                  );
                                }
                              } catch {
                                toast.error("Failed to delete category");
                              } finally {
                                setDeleting(false);
                              }
                            }}
                            disabled={deleting}
                          >
                            {deleting ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </div>
                    </Modal>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Category Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Category"
      >
        <form onSubmit={handleAddCategory} className="space-y-4 p-2">
          <input
            className="w-full border p-2 rounded text-black"
            placeholder="Name"
            value={addForm.name}
            onChange={(e) =>
              setAddForm((f) => ({ ...f, name: e.target.value }))
            }
            required
          />
          <input
            className="w-full border p-2 rounded text-black"
            placeholder="Description"
            value={addForm.description}
            onChange={(e) =>
              setAddForm((f) => ({ ...f, description: e.target.value }))
            }
          />
          <input
            className="w-full border p-2 rounded text-black"
            placeholder="Sort Order"
            type="number"
            value={addForm.sortOrder}
            onChange={(e) =>
              setAddForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))
            }
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded"
              onClick={() => setShowAddModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-green-700 transition"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Category"
      >
        {editLoading ? (
          <div className="p-4 text-center text-gray-400">Loading...</div>
        ) : (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              
              // Validate category name
              if (!editForm.name.trim()) {
                toast.error("Category name is required");
                return;
              }

              // Check for duplicate name (excluding current category)
              const otherCategories = categories.filter(cat => cat.id !== editId);
              if (otherCategories.some(cat => 
                cat.name.toLowerCase().trim() === editForm.name.toLowerCase().trim()
              )) {
                toast.error(`Category "${editForm.name}" already exists. Please choose a different name.`);
                return;
              }

              setSaving(true);
              try {
                const token = localStorage.getItem("adminToken");
                const res = await fetch(API_BASE, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                  },
                  body: JSON.stringify({
                    id: editId,
                    ...editForm,
                    name: editForm.name.trim() // Trim whitespace
                  }),
                });
                
                const data = await res.json();
                
                if (res.ok && data.success) {
                  toast.success("Category updated successfully");
                  setShowEditModal(false);
                  fetchCategories();
                } else {
                  // Handle specific error cases
                  if (data.message && data.message.includes("duplicate")) {
                    toast.error(`Category "${editForm.name}" already exists. Please choose a different name.`);
                  } else if (data.message && data.message.includes("unique")) {
                    toast.error(`Category "${editForm.name}" already exists. Please choose a different name.`);
                  } else {
                    toast.error(data.message || "An error occurred while updating the category");
                  }
                }
              } catch (error) {
                console.error("Update category error:", error);
                toast.error("Failed to update category. Please try again.");
              } finally {
                setSaving(false);
              }
            }}
            className="space-y-4 p-2"
          >
            <input
              className="w-full border p-2 rounded text-black"
              placeholder="Name"
              value={editForm.name}
              onChange={(e) =>
                setEditForm((f) => ({ ...f, name: e.target.value }))
              }
              required
            />
            <input
              className="w-full border p-2 rounded text-black"
              placeholder="Description"
              value={editForm.description}
              onChange={(e) =>
                setEditForm((f) => ({ ...f, description: e.target.value }))
              }
            />
            <input
              className="w-full border p-2 rounded text-black"
              placeholder="Sort Order"
              type="number"
              value={editForm.sortOrder}
              onChange={(e) =>
                setEditForm((f) => ({
                  ...f,
                  sortOrder: Number(e.target.value),
                }))
              }
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-green-700 transition"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}

export default CategoriesManagement;
