import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useHealth } from "./providers/warmupQueries";
import App from "../../App";

export default function BackendWarmupGate() {
  const { t } = useTranslation();

  const { isSuccess, isFetching, failureCount, error } = useHealth(true);

  if (isSuccess) return <App />;

  const errorText =
    error instanceof Error
      ? error.message
      : error
        ? t("warmup.errorFallback")
        : null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        px: 2,
      }}
      role="status"
      aria-live="polite"
    >
      <Box sx={{ width: "100%", maxWidth: 520, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h5" sx={{ mt: 2, fontWeight: 700 }}>
          {t("warmup.title")}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, opacity: 0.8 }}>
          {t("warmup.description")}
        </Typography>

        <Typography variant="body2" sx={{ mt: 2, opacity: 0.7 }}>
          {isFetching ? t("warmup.pinging") : t("warmup.waiting")}
          {" • "}
          {t("warmup.attempt")}: {failureCount + 1}
          {errorText ? ` • ${errorText}` : ""}
        </Typography>

        <Box sx={{ mt: 3, display: "flex", gap: 1, justifyContent: "center" }}>
          <Button variant="outlined" onClick={() => window.location.reload()}>
            {t("warmup.reload")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
