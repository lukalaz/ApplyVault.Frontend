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
import { useCreateJobApplication } from "./providers/jobsQueries";
import type { CreateJobApplicationRequestDto } from "./types/jobApplication";

const drawerWidth = 240;

export default function App() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const createMutation = useCreateJobApplication(() =>
    setIsCreateDialogOpen(false),
  );

  const handleCreate = (dto: CreateJobApplicationRequestDto) => {
    createMutation.mutate(dto);
  };

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
            onClick={() => setIsOpenDrawer(!isOpenDrawer)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            ApplyVault
          </Typography>
          <Button color="inherit" onClick={() => setIsCreateDialogOpen(true)}>
            New
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        open={isOpenDrawer}
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
          {createMutation.error ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {(createMutation.error as Error).message ||
                "Failed to create application."}
            </Alert>
          ) : null}
          <Paper elevation={1} sx={{ p: 2 }}>
            <JobApplicationsTable
              onNewClick={() => setIsCreateDialogOpen(true)}
            />
          </Paper>
        </Container>
      </Box>

      <JobApplicationDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreate}
        isSubmitting={createMutation.isPending}
      />
    </Box>
  );
}
