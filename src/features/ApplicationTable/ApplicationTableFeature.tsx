import { useState } from "react";
import { Alert, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  useCreateJobApplication,
  useDeleteJobApplication,
  useUpdateJobApplication,
} from "./providers/jobsQueries";
import type {
  CreateJobApplicationRequestDto,
  JobApplicationResponseDto,
} from "../../types/jobApplication";
import ConfirmDeleteDialog from "./components/ConfirmDeleteDialog";
import JobApplicationDialog from "./components/JobApplicationDialog";
import JobApplicationsTable from "./components/JobApplicationsTable";

export default function ApplicationTableFeature() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobApplicationResponseDto | null>(
    null,
  );
  const [deletingJob, setDeletingJob] = useState<JobApplicationResponseDto | null>(
    null,
  );
  const { t } = useTranslation();

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

  const saveError =
    (editingJob ? updateMutation.error : createMutation.error) ?? null;
  const deleteError = deleteMutation.error ?? null;

  return (
    <>
      {saveError ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {(saveError as Error).message || t("errors.saveApplication")}
        </Alert>
      ) : null}
      {deleteError ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {(deleteError as Error).message || t("errors.deleteApplication")}
        </Alert>
      ) : null}

      <Paper elevation={1} sx={{ p: 2, width: "100%", overflow: "hidden" }}>
        <JobApplicationsTable
          onNewClick={() => {
            setEditingJob(null);
            setIsDialogOpen(true);
          }}
          onEditClick={(job) => {
            setEditingJob(job);
            setIsDialogOpen(true);
          }}
          onDeleteClick={(job) => {
            setDeletingJob(job);
          }}
        />
      </Paper>

      <JobApplicationDialog
        open={isDialogOpen}
        onClose={() => {
          if (createMutation.isPending || updateMutation.isPending) return;
          setIsDialogOpen(false);
          setEditingJob(null);
        }}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        mode={editingJob ? "edit" : "create"}
        initialValues={editingJob}
      />

      <ConfirmDeleteDialog
        open={Boolean(deletingJob)}
        job={deletingJob}
        isDeleting={deleteMutation.isPending}
        onCancel={() => {
          if (deleteMutation.isPending) return;
          setDeletingJob(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
