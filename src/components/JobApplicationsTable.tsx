import { useMemo } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useJobApplications } from "../providers/jobsQueries";
import type {
  ApplicationStatus,
  JobApplicationResponseDto,
} from "../types/jobApplication";
import { getApplicationStatusLabel } from "../types/jobApplication";

type JobApplicationsTableProps = {
  onNewClick?: () => void;
  onEditClick?: (job: JobApplicationResponseDto) => void;
};

export default function JobApplicationsTable({
  onNewClick,
  onEditClick,
}: JobApplicationsTableProps) {
  const { jobs, isLoadingJobs, errorJobs } = useJobApplications();

  const columns = useMemo<MRT_ColumnDef<JobApplicationResponseDto>[]>(
    () => [
      { accessorKey: "company", header: "Company" },
      { accessorKey: "role", header: "Role" },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) =>
          getApplicationStatusLabel(cell.getValue<ApplicationStatus>()),
      },
      { accessorKey: "location", header: "Location" },
      {
        accessorKey: "isRemote",
        header: "Remote",
        Cell: ({ cell }) => (cell.getValue<boolean>() ? "Yes" : "No"),
        size: 60,
      },
      { accessorKey: "lastTouch", header: "Last Touch" },
      { accessorKey: "nextAction", header: "Next Action" },
    ],
    [],
  );

  if (isLoadingJobs) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 4 }}>
        <CircularProgress size={22} />
        <span>Loading...</span>
      </Box>
    );
  }

  if (errorJobs) {
    return (
      <Alert severity="error">
        {(errorJobs as Error).message || "Failed to load job applications."}
      </Alert>
    );
  }

  return (
    <MaterialReactTable
      columns={columns}
      data={jobs}
      renderTopToolbarCustomActions={() => (
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography variant="subtitle1">Applications</Typography>
          <Button variant="contained" size="small" onClick={onNewClick}>
            New
          </Button>
        </Box>
      )}
      enableRowActions
      renderRowActions={({ row }) => (
        <Tooltip title="Edit">
          <IconButton size="small" onClick={() => onEditClick?.(row.original)}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
      enableColumnFilters
      enableSorting
      enablePagination
      enableDensityToggle={false}
      enableFullScreenToggle={false}
      enableHiding={false}
      initialState={{
        density: "compact",
        pagination: { pageIndex: 0, pageSize: 20 },
      }}
      muiTableContainerProps={{ sx: { maxHeight: "70vh" } }}
      enableStickyHeader
    />
  );
}
