import { useMemo } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useJobApplications } from "../providers/jobsQueries";
import type {
  ApplicationStatus,
  JobApplicationResponseDto,
} from "../types/jobApplication";
import { getApplicationStatusLabel } from "../types/jobApplication";

type JobApplicationsTableProps = {
  onNewClick?: () => void;
  onEditClick?: (job: JobApplicationResponseDto) => void;
  onDeleteClick?: (job: JobApplicationResponseDto) => void;
};

const formatDateValue = (value: string | null) => {
  if (!value) return "-";
  return value.slice(0, 10);
};

const formatTextValue = (value: string | null | undefined) => {
  if (!value) return "-";
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : "-";
};

export default function JobApplicationsTable({
  onNewClick,
  onEditClick,
  onDeleteClick,
}: JobApplicationsTableProps) {
  const { jobs, isLoadingJobs, errorJobs } = useJobApplications();

  const columns = useMemo<MRT_ColumnDef<JobApplicationResponseDto>[]>(
    () => [
      { accessorKey: "company", header: "Company" },
      { accessorKey: "role", header: "Role" },
      { accessorKey: "location", header: "Location" },
      {
        accessorKey: "isRemote",
        header: "Remote",
        Cell: ({ cell }) => (cell.getValue<boolean>() ? "Yes" : "No"),
        size: 60,
      },
      {
        accessorKey: "referral",
        header: "Referral",
        Cell: ({ cell }) => formatTextValue(cell.getValue<string>()),
      },
      {
        accessorKey: "contactPerson",
        header: "Contact Person",
        Cell: ({ cell }) => formatTextValue(cell.getValue<string>()),
      },
      {
        accessorKey: "dateApplied",
        header: "Date Applied",
        Cell: ({ cell }) => formatDateValue(cell.getValue<string | null>()),
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) =>
          getApplicationStatusLabel(cell.getValue<ApplicationStatus>()),
      },
      {
        accessorKey: "compensationRange",
        header: "Compensation",
        Cell: ({ cell }) => formatTextValue(cell.getValue<string>()),
      },
      {
        accessorKey: "lastTouch",
        header: "Last Touch",
        Cell: ({ cell }) => formatDateValue(cell.getValue<string | null>()),
      },
      {
        accessorKey: "nextAction",
        header: "Next Action",
        Cell: ({ cell }) => formatTextValue(cell.getValue<string>()),
      },
      {
        accessorKey: "nextActionDate",
        header: "Next Action Date",
        Cell: ({ cell }) => formatDateValue(cell.getValue<string | null>()),
      },
      {
        accessorKey: "notes",
        header: "Notes",
        Cell: ({ cell }) => formatTextValue(cell.getValue<string>()),
      },
      {
        accessorKey: "link",
        header: "Link",
        Cell: ({ cell }) => {
          const value = cell.getValue<string>();
          const text = formatTextValue(value);
          if (text === "-") return text;

          return (
            <Link href={value} target="_blank" rel="noreferrer">
              Open
            </Link>
          );
        },
      },
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              aria-label="Edit application"
              onClick={() => onEditClick?.(row.original)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              aria-label="Delete application"
              onClick={() => onDeleteClick?.(row.original)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      enableSorting={false}
      enableDensityToggle={false}
      enableFullScreenToggle={false}
      enableColumnActions={false}
      enableHiding={false}
      initialState={{
        density: "compact",
        pagination: { pageIndex: 0, pageSize: 20 },
      }}
      muiTablePaperProps={{ sx: { width: "100%" } }}
      muiTableContainerProps={{
        sx: {
          maxHeight: "70vh",
          width: "100%",
          overflowX: "auto",
          overflowY: "auto",
        },
      }}
      enableStickyHeader
    />
  );
}
