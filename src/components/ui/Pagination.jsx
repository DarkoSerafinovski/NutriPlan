import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxButtons = 5;
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + maxButtons - 1, totalPages);

    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(endPage - maxButtons + 1, 1);
    }

    if (startPage > 1) pages.push(1);
    if (startPage > 2) pages.push("...");

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) pages.push("...");
    if (endPage < totalPages) pages.push(totalPages);

    return pages;
  };

  const pages = getPageNumbers();

  const btnBase =
    "w-10 h-10 flex items-center justify-center rounded-xl font-semibold transition-all duration-200 shadow-sm border";
  const btnActive = "bg-green-600 text-white border-green-600 shadow-green-200";
  const btnInactive =
    "bg-white text-gray-600 border-gray-100 hover:border-green-300 hover:text-green-600";
  const btnDisabled =
    "bg-gray-50 text-gray-300 border-gray-50 cursor-not-allowed";

  return (
    <nav className="flex items-center justify-center gap-2 py-4">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`${btnBase} ${
          currentPage === 1 ? btnDisabled : btnInactive
        }`}
        aria-label="Previous page"
      >
        <span className="text-lg">←</span>
      </button>

      <div className="flex items-center gap-2">
        {pages.map((page, index) =>
          page === "..." ? (
            <span
              key={`dots-${index}`}
              className="px-2 text-gray-400 font-bold"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`${btnBase} ${
                page === currentPage ? btnActive : btnInactive
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`${btnBase} ${
          currentPage === totalPages ? btnDisabled : btnInactive
        }`}
        aria-label="Next page"
      >
        <span className="text-lg">→</span>
      </button>
    </nav>
  );
}
