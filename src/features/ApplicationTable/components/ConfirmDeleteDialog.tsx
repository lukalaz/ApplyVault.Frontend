import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import type { JobApplicationResponseDto } from "../types/jobApplication";

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
  const { t } = useTranslation();
  const label = job ? `${job.company} - ${job.role}` : t("common.empty");

  return (
    <Dialog
      open={open}
      onClose={isDeleting ? undefined : onCancel}
      aria-labelledby="confirm-delete-title"
      aria-describedby="confirm-delete-description"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="confirm-delete-title">
        {t("dialogs.confirmDelete.title")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-delete-description">
          {t("dialogs.confirmDelete.description", { label })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={isDeleting}>
          {t("common.cancel")}
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={onConfirm}
          disabled={isDeleting || !job}
        >
          {isDeleting ? t("common.deleting") : t("common.delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
