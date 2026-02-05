import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Pagination
 *
 * A controlled pagination component that renders:
 * - Previous / Next navigation buttons
 * - A sliding window of page numbers centered around the current page
 * - Ellipsis (...) when pages are skipped
 * - First and last page shortcuts when needed
 *
 * The component does NOT manage state internally.
 * All navigation logic is delegated to the parent via `onPageChange`.
 *
 * @param {number} currentPage - The currently active page (1-based index)
 * @param {number} totalPages - Total number of available pages
 * @param {(page: number) => void} onPageChange - Callback fired when a page is selected
 * @param {boolean} hasNextPage - Whether navigating forward is allowed
 * @param {boolean} hasPreviousPage - Whether navigating backward is allowed
 */
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPreviousPage
}) => {
  /**
   * Holds the list of page numbers that will be rendered
   * between startPage and endPage.
   */
  const pages = [];

  /**
   * Maximum number of visible page buttons.
   * This keeps the pagination compact and prevents UI overflow.
   */
  const maxPagesToShow = 5;

  /**
   * Calculate the first page in the visible range.
   *
   * The goal is to keep the current page roughly centered
   * within the pagination window.
   *
   * Example:
   * - currentPage = 6
   * - maxPagesToShow = 9
   * - startPage = 6 - 4 = 2
   *
   * Math.max ensures we never start below page 1.
   */
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));

  /**
   * Calculate the last page in the visible range.
   *
   * We cap it at totalPages to avoid rendering
   * page numbers that don't exist.
   */
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  /**
   * If we reached the end of the page list and
   * the visible range is smaller than maxPagesToShow,
   * shift the window back so we still render
   * the maximum number of pages when possible.
   */
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  /**
   * Populate the pages array with the final
   * calculated page range.
   */
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
      <div className="flex items-center gap-2">
        {/* Previous Page Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPreviousPage}
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        {/* Page Numbers (hidden on small screens) */}
        <div className="hidden sm:flex gap-1">
          {/* First page shortcut + leading ellipsis */}
          {startPage > 1 && (
            <>
              <button
                onClick={() => onPageChange(1)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                1
              </button>

              {startPage > 2 && (
                <span className="px-2 py-1 text-gray-500">...</span>
              )}
            </>
          )}

          {/* Visible page range */}
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 border rounded-lg text-sm font-medium ${
                page === currentPage
                  ? "bg-primary-600 text-white border-primary-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Trailing ellipsis + last page shortcut */}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="px-2 py-1 text-gray-500">...</span>
              )}

              <button
                onClick={() => onPageChange(totalPages)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* Next Page Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Page summary */}
      <div className="text-sm text-gray-700">
        Page <span className="font-medium">{currentPage}</span> of{" "}
        <span className="font-medium">{totalPages}</span>
      </div>
    </div>
  );
};

export default Pagination;
