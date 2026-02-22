import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DE, US } from "country-flag-icons/react/3x2";
import ApplicationTableFeature from "./features/ApplicationTable";

const drawerWidth = 240;
const languageStorageKey = "applyvault.language";

type LanguageCode = "en" | "de";

const Flag = ({
  language,
  title,
}: {
  language: LanguageCode;
  title: string;
}) => (
  <Box
    component="span"
    sx={{
      display: "inline-flex",
      alignItems: "center",
      "& svg": {
        width: 18,
        height: 12,
        borderRadius: "2px",
        display: "block",
      },
    }}
  >
    {language === "de" ? <DE title={title} /> : <US title={title} />}
  </Box>
);

export default function App() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState<null | HTMLElement>(
    null,
  );
  const { t, i18n } = useTranslation();

  const currentLanguage: LanguageCode = i18n.resolvedLanguage?.startsWith("de")
    ? "de"
    : "en";

  const handleLanguageChange = (nextLanguage: LanguageCode) => {
    void i18n.changeLanguage(nextLanguage);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(languageStorageKey, nextLanguage);
    }

    setLanguageMenuAnchor(null);
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
          <IconButton
            color="inherit"
            aria-label={t("app.language.label")}
            onClick={(event) => setLanguageMenuAnchor(event.currentTarget)}
          >
            <Flag
              language={currentLanguage}
              title={
                currentLanguage === "de"
                  ? t("app.language.german")
                  : t("app.language.english")
              }
            />
          </IconButton>
          <Menu
            anchorEl={languageMenuAnchor}
            open={Boolean(languageMenuAnchor)}
            onClose={() => setLanguageMenuAnchor(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem
              selected={currentLanguage === "en"}
              onClick={() => handleLanguageChange("en")}
            >
              <Box sx={{ display: "inline-flex", alignItems: "center", mr: 1 }}>
                <Flag language="en" title={t("app.language.english")} />
              </Box>
              {t("app.language.english")}
            </MenuItem>
            <MenuItem
              selected={currentLanguage === "de"}
              onClick={() => handleLanguageChange("de")}
            >
              <Box sx={{ display: "inline-flex", alignItems: "center", mr: 1 }}>
                <Flag language="de" title={t("app.language.german")} />
              </Box>
              {t("app.language.german")}
            </MenuItem>
          </Menu>
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
