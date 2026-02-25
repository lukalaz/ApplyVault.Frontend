import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import i18n from "./common/i18n/i18n";
import "./index.css";
import { appTheme } from "./common/theme/appTheme";
import BackendWarmupGate from "./features/WarmupGate/WarmupGateFeature";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          <BackendWarmupGate />
        </ThemeProvider>
      </QueryClientProvider>
    </I18nextProvider>
  </React.StrictMode>,
);
