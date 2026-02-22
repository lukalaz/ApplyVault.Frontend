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
  FormControl,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ApplicationTableFeature from "./features/ApplicationTable";

// ✅ Flags as SVG components (consistent everywhere)
import { US, DE } from "country-flag-icons/react/3x2";

const drawerWidth = 240;
const languageStorageKey = "applyvault.language";

type LanguageCode = "en" | "de";

const Flag = ({ children }: { children: React.ReactNode }) => (
  <Box
    component="span"
    sx={{
      display: "inline-flex",
      alignItems: "center",
      mr: 1,
      "& svg": {
        width: 18,
        height: 12,
        borderRadius: "2px",
        display: "block",
      },
    }}
  >
    {children}
  </Box>
);

export default function App() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const { t, i18n } = useTranslation();

  const currentLanguage: LanguageCode = i18n.resolvedLanguage?.startsWith("de")
    ? "de"
    : "en";

  const handleLanguageChange = (event: SelectChangeEvent<LanguageCode>) => {
    const nextLanguage = event.target.value as LanguageCode;
    void i18n.changeLanguage(nextLanguage);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(languageStorageKey, nextLanguage);
    }
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
            onClick={() => setIsOpenDrawer((v) => !v)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            {t("app.title")}
          </Typography>

          <FormControl size="small" sx={{ minWidth: 132 }}>
            <Select
              value={currentLanguage}
              onChange={handleLanguageChange}
              aria-label={t("app.language.label")}
              renderValue={(value) => (
                <Box sx={{ display: "inline-flex", alignItems: "center" }}>
                  <Flag>
                    {value === "de" ? (
                      <DE title="Deutsch" />
                    ) : (
                      <US title="English" />
                    )}
                  </Flag>
                  {value === "de"
                    ? t("app.language.german")
                    : t("app.language.english")}
                </Box>
              )}
            >
              <MenuItem value="en">
                <Flag>
                  <US title="English" />
                </Flag>
                {t("app.language.english")}
              </MenuItem>

              <MenuItem value="de">
                <Flag>
                  <DE title="Deutsch" />
                </Flag>
                {t("app.language.german")}
              </MenuItem>
            </Select>
          </FormControl>
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
