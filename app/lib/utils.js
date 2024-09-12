export const generatePagination = (currentPage, totalPages) => {
  const paginationLength = 7; // Total length of pagination array (including ellipses)
  const halfLength = Math.floor((paginationLength - 3) / 2); // Adjusted for first, last, and ellipses
  const range = [];

  // Always include the first page
  range.push(1);

  // Determine start and end of the middle range
  let start = Math.max(2, currentPage - halfLength);
  let end = Math.min(totalPages - 1, currentPage + halfLength);

  // Adjust range if near start or end
  if (currentPage <= halfLength + 2) {
    end = Math.min(totalPages - 1, paginationLength - 2);
  } else if (currentPage >= totalPages - halfLength - 1) {
    start = Math.max(2, totalPages - paginationLength + 3);
  }

  // Add middle range
  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  // Add ellipses if necessary
  if (start > 2) {
    range.splice(1, 0, "...");
  }
  if (end < totalPages - 1) {
    range.push("...");
  }

  // Always include the last page if there's more than one page
  if (totalPages > 1) {
    range.push(totalPages);
  }

  return range;
};
