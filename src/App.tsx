import { Container, Typography, Box } from "@mui/material";
import JobApplicationsTable from "./components/JobApplicationsTable";

export default function App() {
  return (
    <Container sx={{ py: 3 }}>
      <Box sx={{ display: "flex", alignItems: "baseline", mb: 2 }}>
        <Typography variant="h4">ApplyVault</Typography>
      </Box>

      <JobApplicationsTable />
    </Container>
  );
}
