import React, { useContext, useState } from "react";
import { Box, Button, Pagination } from "@mui/material";
import { GlobalContext } from "../globalContext";

const PaginatedList = () => {
  const { setPage, page, totalItems } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1);

  //   const totalItems = items.length;
  //   const totalPages = Math.ceil(totalItems / itemsPerPage);
  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          color="primary"
          count={Math.ceil(totalItems / 10)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </div>
  );
};

export default PaginatedList;
