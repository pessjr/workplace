import React from "react";
import moment from "moment";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { DataGrid, GridColumns, GridEventListener } from "@mui/x-data-grid";

export interface AddButton {
  onClick(): void;
  title: string;
}

export interface Listing {
  rows: any[];
  columns: GridColumns<any>;
  onRowClick: GridEventListener<"rowClick">;
  isLoading?: boolean;
  addButton?: AddButton | null;
}

export const Listing = ({
  rows,
  columns,
  onRowClick,
  isLoading = false,
  addButton,
}: Listing) => {
  return (
    <>
      {!!addButton && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            mt: 4,
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={addButton?.onClick}
          >
            {addButton?.title}
            <AddIcon sx={{ ml: 1 }} />
          </Button>
        </Box>
      )}
      <DataGrid
        loading={isLoading}
        sx={{ my: 4 }}
        autoHeight
        rows={rows}
        onRowClick={onRowClick}
        hideFooter
        hideFooterPagination
        hideFooterSelectedRowCount
        columns={columns}
      />
    </>
  );
};
