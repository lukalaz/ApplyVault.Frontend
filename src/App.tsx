import { useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Container,
  Button,
  Paper,
  Alert,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import JobApplicationsTable from "./components/JobApplicationsTable";
import JobApplicationDialog from "./components/JobApplicationDialog";
import ConfirmDeleteDialog from "./components/ConfirmDeleteDialog";
import {
  useCreateJobApplication,
  useDeleteJobApplication,
  useUpdateJobApplication,
} from "./providers/jobsQueries";
import type {
  CreateJobApplicationRequestDto,
  JobApplicationResponseDto,
} from "./types/jobApplication";

const drawerWidth = 240;

export default function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobApplicationResponseDto | null>(
    null,
  );
  const [deletingJob, setDeletingJob] = useState<JobApplicationResponseDto | null>(
    null,
  );
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const createMutation = useCreateJobApplication(() => {
    setIsDialogOpen(false);
    setEditingJob(null);
  });

  const updateMutation = useUpdateJobApplication(() => {
    setIsDialogOpen(false);
    setEditingJob(null);
  });

  const deleteMutation = useDeleteJobApplication(() => {
    setDeletingJob(null);
  });

  const openCreateDialog = () => {
    setEditingJob(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (job: JobApplicationResponseDto) => {
    setEditingJob(job);
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (job: JobApplicationResponseDto) => {
    setDeletingJob(job);
  };

  const closeDialog = () => {
    if (createMutation.isPending || updateMutation.isPending) return;
    setIsDialogOpen(false);
    setEditingJob(null);
  };

  const closeDeleteDialog = () => {
    if (deleteMutation.isPending) return;
    setDeletingJob(null);
  };

  const handleSubmit = (dto: CreateJobApplicationRequestDto) => {
    if (editingJob) {
      updateMutation.mutate({ id: editingJob.id, dto });
      return;
    }

    createMutation.mutate(dto);
  };

  const handleDeleteConfirm = () => {
    if (!deletingJob) return;
    deleteMutation.mutate(deletingJob.id);
  };

  const saveError = (editingJob ? updateMutation.error : createMutation.error) ?? null;
  const deleteError = deleteMutation.error ?? null;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            sx={{ mr: 2 }}
            aria-label="menu"
            onClick={() => setIsOpenDrawer((v) => !v)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            ApplyVault
          </Typography>
          <Button color="inherit" onClick={openCreateDialog}>
            New
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        open={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        variant="temporary"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          {[
            { text: "All Applications", icon: <InboxIcon /> },
            { text: "Saved Searches", icon: <MailIcon /> },
            { text: "Settings", icon: <InboxIcon /> },
          ].map((item) => (
            <ListItemButton key={item.text}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container maxWidth={false} sx={{ px: 0 }}>
          {saveError ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {(saveError as Error).message || "Failed to save application."}
            </Alert>
          ) : null}
          {deleteError ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {(deleteError as Error).message || "Failed to delete application."}
            </Alert>
          ) : null}
          <Paper elevation={1} sx={{ p: 2 }}>
            <JobApplicationsTable
              onNewClick={openCreateDialog}
              onEditClick={openEditDialog}
              onDeleteClick={openDeleteDialog}
            />
          </Paper>
        </Container>
      </Box>

      <JobApplicationDialog
        open={isDialogOpen}
        onClose={closeDialog}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        mode={editingJob ? "edit" : "create"}
        initialValues={editingJob}
      />

      <ConfirmDeleteDialog
        open={Boolean(deletingJob)}
        job={deletingJob}
        isDeleting={deleteMutation.isPending}
        onCancel={closeDeleteDialog}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
}
