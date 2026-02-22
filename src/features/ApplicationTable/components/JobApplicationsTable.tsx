import { useCallback, useMemo } from "react";
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
import { useTranslation } from "react-i18next";
import { useJobApplications } from "../providers/jobsQueries";
import {
  ApplicationStatus,
  type JobApplicationResponseDto,
} from "../../../types/jobApplication";

type JobApplicationsTableProps = {
  onNewClick?: () => void;
  onEditClick?: (job: JobApplicationResponseDto) => void;
  onDeleteClick?: (job: JobApplicationResponseDto) => void;
};

const tableFontFamily =
  '"Poppins", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

const getStatusTranslationKey = (status: ApplicationStatus) => {
  switch (status) {
    case ApplicationStatus.Planned:
      return "status.planned";
    case ApplicationStatus.Applied:
      return "status.applied";
    case ApplicationStatus.Interviewing:
      return "status.interviewing";
    case ApplicationStatus.Offer:
      return "status.offer";
    case ApplicationStatus.Rejected:
      return "status.rejected";
    case ApplicationStatus.Accepted:
      return "status.accepted";
    default:
      return "status.unknown";
  }
};

export default function JobApplicationsTable({
  onNewClick,
  onEditClick,
  onDeleteClick,
}: JobApplicationsTableProps) {
  const { jobs, isLoadingJobs, errorJobs } = useJobApplications();
  const { t } = useTranslation();

  const formatDateValue = useCallback(
    (value: string | null) => {
      if (!value) return t("common.empty");
      return value.slice(0, 10);
    },
    [t],
  );

  const formatTextValue = useCallback(
    (value: string | null | undefined) => {
      if (!value) return t("common.empty");
      const trimmed = value.trim();
      return trimmed.length > 0 ? trimmed : t("common.empty");
    },
    [t],
  );

  const columns = useMemo<MRT_ColumnDef<JobApplicationResponseDto>[]>(
    () => [
      { accessorKey: "company", header: t("table.headers.company") },
      { accessorKey: "role", header: t("table.headers.role") },
      { accessorKey: "location", header: t("table.headers.location") },
      {
        accessorKey: "isRemote",
        header: t("table.headers.remote"),
        Cell: ({ cell }) =>
          cell.getValue<boolean>() ? t("common.yes") : t("common.no"),
        size: 60,
      },
      {
        accessorKey: "referral",
        header: t("table.headers.referral"),
        Cell: ({ cell }) => formatTextValue(cell.getValue<string>()),
      },
      {
        accessorKey: "contactPerson",
        header: t("table.headers.contactPerson"),
        Cell: ({ cell }) => formatTextValue(cell.getValue<string>()),
      },
      {
        accessorKey: "dateApplied",
        header: t("table.headers.dateApplied"),
        Cell: ({ cell }) => formatDateValue(cell.getValue<string | null>()),
      },
      {
        accessorKey: "status",
        header: t("table.headers.status"),
        Cell: ({ cell }) =>
          t(getStatusTranslationKey(cell.getValue<ApplicationStatus>())),
      },
      {
        accessorKey: "compensationRange",
        header: t("table.headers.compensation"),
        Cell: ({ cell }) => formatTextValue(cell.getValue<string>()),
      },
      {
        accessorKey: "lastTouch",
        header: t("table.headers.lastTouch"),
        Cell: ({ cell }) => formatDateValue(cell.getValue<string | null>()),
      },
      {
        accessorKey: "nextAction",
        header: t("table.headers.nextAction"),
        Cell: ({ cell }) => formatTextValue(cell.getValue<string>()),
      },
      {
        accessorKey: "nextActionDate",
        header: t("table.headers.nextActionDate"),
        Cell: ({ cell }) => formatDateValue(cell.getValue<string | null>()),
      },
      {
        accessorKey: "notes",
        header: t("table.headers.notes"),
        Cell: ({ cell }) => formatTextValue(cell.getValue<string>()),
      },
      {
        accessorKey: "link",
        header: t("table.headers.link"),
        Cell: ({ cell }) => {
          const value = cell.getValue<string>();
          const text = formatTextValue(value);
          if (text === t("common.empty")) return text;

          return (
            <Link href={value} target="_blank" rel="noreferrer">
              {t("common.open")}
            </Link>
          );
        },
      },
    ],
    [formatDateValue, formatTextValue, t],
  );

  if (isLoadingJobs) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 4 }}>
        <CircularProgress size={22} />
        <span>{t("common.loading")}</span>
      </Box>
    );
  }

  if (errorJobs) {
    return (
      <Alert severity="error">
        {(errorJobs as Error).message || t("errors.loadApplications")}
      </Alert>
    );
  }

  return (
    <MaterialReactTable
      columns={columns}
      data={jobs}
      renderTopToolbarCustomActions={() => (
        <>
          <Box>
            <Typography variant="subtitle1">{t("table.title")}</Typography>
          </Box>
          <Button
            variant="contained"
            size="small"
            onClick={onNewClick}
            sx={{ ml: "auto", paddingX: 0 }}
          >
            {t("table.new")}
          </Button>
        </>
      )}
      enableRowActions
      renderRowActions={({ row }) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Tooltip title={t("table.actions.edit")}>
            <IconButton
              size="small"
              aria-label={t("table.actions.editAria")}
              onClick={() => onEditClick?.(row.original)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("table.actions.delete")}>
            <IconButton
              size="small"
              color="error"
              aria-label={t("table.actions.deleteAria")}
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
      muiTablePaperProps={{ sx: { width: "100%", fontFamily: tableFontFamily } }}
      muiTopToolbarProps={{ sx: { fontFamily: tableFontFamily } }}
      muiTableHeadCellProps={{ sx: { fontFamily: tableFontFamily } }}
      muiTableBodyCellProps={{ sx: { fontFamily: tableFontFamily } }}
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
