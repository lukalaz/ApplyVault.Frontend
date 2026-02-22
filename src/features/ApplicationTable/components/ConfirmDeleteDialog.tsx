import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import type { JobApplicationResponseDto } from "../../../types/jobApplication";

type ConfirmDeleteDialogProps = {
  open: boolean;
  job: JobApplicationResponseDto | null;
  isDeleting?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmDeleteDialog({
  open,
  job,
  isDeleting = false,
  onCancel,
  onConfirm,
}: ConfirmDeleteDialogProps) {
  const label = job ? `${job.company} - ${job.role}` : "this application";

  return (
    <Dialog
      open={open}
      onClose={isDeleting ? undefined : onCancel}
      aria-labelledby="confirm-delete-title"
      aria-describedby="confirm-delete-description"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="confirm-delete-title">Delete Application</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-delete-description">
          Are you sure you want to delete {label}? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={isDeleting}>
          Cancel
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={onConfirm}
          disabled={isDeleting || !job}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
