import {
  DocumentTextIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const PagesTable = ({
  pages,
  selectedIds,
  sortBy,
  sortDir,
  onToggleSelect,
  onToggleSelectAll,
  onSort,
  onView,
  onEdit,
  onDelete,
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const allSelected = pages.length > 0 && pages.every((p) => selectedIds.includes(p.id));

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-white/5 text-gray-300 border-b border-white/10">
          <tr>
            <th className="px-4 py-3 text-left w-10">
              <input
                type="checkbox"
                onChange={onToggleSelectAll}
                checked={allSelected}
                className="rounded border-white/30 bg-white/10 text-blue-400 focus:ring-blue-500"
              />
            </th>
            <th
              className="px-4 py-3 text-left cursor-pointer select-none"
              onClick={() => onSort("title")}
            >
              <div className="inline-flex items-center gap-1">
                <span className="text-white">Title</span>
                {sortBy === "title" && (
                  <span className="text-xs text-gray-400">
                    {sortDir === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </div>
            </th>
            <th
              className="px-4 py-3 text-left cursor-pointer select-none"
              onClick={() => onSort("slug")}
            >
              <span className="text-white">Slug</span>
              {sortBy === "slug" && (
                <span className="text-xs text-gray-400">
                  {sortDir === "asc" ? "▲" : "▼"}
                </span>
              )}
            </th>
            <th
              className="px-4 py-3 text-left cursor-pointer select-none"
              onClick={() => onSort("categoryName")}
            >
              <span className="text-white">Category</span>
              {sortBy === "categoryName" && (
                <span className="text-xs text-gray-400">
                  {sortDir === "asc" ? "▲" : "▼"}
                </span>
              )}
            </th>
            <th className="px-4 py-3 text-left text-white">Published</th>
            <th className="px-4 py-3 text-left text-white">Homepage</th>
            <th
              className="px-4 py-3 text-left cursor-pointer select-none"
              onClick={() => onSort("componentCount")}
            >
              <span className="text-white">Components</span>
              {sortBy === "componentCount" && (
                <span className="text-xs text-gray-400">
                  {sortDir === "asc" ? "▲" : "▼"}
                </span>
              )}
            </th>
            <th
              className="px-4 py-3 text-left cursor-pointer select-none"
              onClick={() => onSort("createdAt")}
            >
              <span className="text-white">Created</span>
              {sortBy === "createdAt" && (
                <span className="text-xs text-gray-400">
                  {sortDir === "asc" ? "▲" : "▼"}
                </span>
              )}
            </th>
            <th className="px-4 py-3 text-right text-white">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {pages.map((page) => (
            <tr key={page.id || page.slug} className="hover:bg-white/5">
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(page.id)}
                  onChange={() => onToggleSelect(page.id)}
                  className="rounded border-white/30 bg-white/10 text-blue-400 focus:ring-blue-500"
                />
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center gap-2 min-w-[12rem]">
                  <div className="w-7 h-7 rounded-md bg-white/10 border border-white/20 flex items-center justify-center">
                    <DocumentTextIcon className="h-4 w-4 text-white/90" />
                  </div>
                  <div className="truncate">
                    <div className="font-medium text-white truncate">
                      {page.title || page.slug}
                    </div>
                    <div className="text-xs text-gray-400 truncate">
                      ID: {page.id}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2 text-gray-300 font-mono">
                /{page.slug}
              </td>
              <td className="px-4 py-2 text-gray-300">
                {page.categoryName || "Uncategorized"}
              </td>
              <td className="px-4 py-2">
                {page.isPublished ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white border border-white/20">
                    Yes
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/5 text-gray-300 border border-white/10">
                    No
                  </span>
                )}
              </td>
              <td className="px-4 py-2">
                {page.isHomepage ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white border border-white/20">
                    Yes
                  </span>
                ) : (
                  <span className="text-xs text-gray-400">No</span>
                )}
              </td>
              <td className="px-4 py-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white border border-white/20">
                  {page.componentCount || 0}
                </span>
              </td>
              <td className="px-4 py-2 text-gray-300">
                {formatDate(page.createdAt)}
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onView(page)}
                    className="p-2 rounded-md border border-white/20 hover:bg-white/10 text-white"
                    title="View"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onEdit(page)}
                    className="p-2 rounded-md border border-white/20 hover:bg-white/10 text-white"
                    title="Edit"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(page)}
                    className="p-2 rounded-md border border-white/20 hover:bg-white/10 text-red-400"
                    title="Delete"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PagesTable;

