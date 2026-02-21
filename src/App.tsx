import { useState } from "react";
import "./App.css";
import { useJobApplications } from "./providers/jobsQueries";

function App() {
  const [error, setError] = useState<string | null>(null);

  const { jobs } = useJobApplications();

  return (
    <>
      <h1>Vite + React</h1>

      <div style={{ marginBottom: 16 }}>
        <strong>Jobs:</strong>{" "}
        {error
          ? `Error: ${error}`
          : jobs
            ? `${jobs.length} loaded`
            : "Loading..."}
      </div>

      {jobs && (
        <pre style={{ textAlign: "left", overflow: "auto", maxHeight: 300 }}>
          {JSON.stringify(jobs.slice(0, 2), null, 2)}
        </pre>
      )}

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
