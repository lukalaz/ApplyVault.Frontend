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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ApplicationTableFeature from "./features/ApplicationTable";

const drawerWidth = 240;

export default function App() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const { t } = useTranslation();

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
            {t("app.title")}
          </Typography>
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
            { text: t("app.nav.allApplications"), icon: <InboxIcon /> },
            { text: t("app.nav.savedSearches"), icon: <MailIcon /> },
            { text: t("app.nav.settings"), icon: <InboxIcon /> },
          ].map((item) => (
            <ListItemButton key={item.text}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, minWidth: 0, p: 3 }}>
        <Toolbar />
        <Container maxWidth={false} sx={{ px: 0 }}>
          <ApplicationTableFeature />
        </Container>
      </Box>
    </Box>
  );
}
