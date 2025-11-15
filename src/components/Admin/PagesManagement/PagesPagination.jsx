import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const PagesPagination = ({
  currentPage,
  totalPages,
  startIndex,
  itemsPerPage,
  totalItems,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return (
    <div className="mt-4 flex items-center justify-between text-sm">
      <div className="text-gray-300">
        Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
        <span className="font-medium">{endIndex}</span> of{" "}
        <span className="font-medium">{totalItems}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-md border border-white/20 text-white disabled:opacity-50 disabled:text-gray-400"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) pageNum = i + 1;
          else if (currentPage <= 3) pageNum = i + 1;
          else if (currentPage >= totalPages - 2)
            pageNum = totalPages - 4 + i;
          else pageNum = currentPage - 2 + i;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-1 rounded-md border ${
                currentPage === pageNum
                  ? "bg-white/20 text-white border-white/30"
                  : "border-white/20 text-white/80"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md border border-white/20 text-white disabled:opacity-50 disabled:text-gray-400"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default PagesPagination;

