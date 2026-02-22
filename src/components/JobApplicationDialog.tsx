import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import type { CreateJobApplicationRequestDto } from "../types/jobApplication";
import {
  ApplicationStatus,
  APPLICATION_STATUS_OPTIONS,
} from "../types/jobApplication";

type JobApplicationDialogProps = {
  open: boolean;
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: (dto: CreateJobApplicationRequestDto) => void;
};

type JobApplicationFormState = {
  company: string;
  role: string;
  status: ApplicationStatus;
  dateApplied: string;
  isRemote: boolean;
  location: string;
};

const initialFormState: JobApplicationFormState = {
  company: "",
  role: "",
  status: ApplicationStatus.Planned,
  dateApplied: "",
  isRemote: false,
  location: "",
};

export default function JobApplicationDialog({
  open,
  isSubmitting = false,
  onClose,
  onSubmit,
}: JobApplicationDialogProps) {
  const [form, setForm] = useState<JobApplicationFormState>(initialFormState);

  useEffect(() => {
    if (!open) {
      setForm(initialFormState);
    }
  }, [open]);

  const isValid = useMemo(
    () => form.company.trim().length > 0 && form.role.trim().length > 0,
    [form.company, form.role],
  );

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) return;

    onSubmit({
      company: form.company.trim(),
      role: form.role.trim(),
      status: form.status,
      isRemote: form.isRemote,
      location: form.location.trim() || null,
      dateApplied: form.dateApplied || null,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={isSubmitting ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <form onSubmit={submit}>
        <DialogTitle>New Application</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Company"
              value={form.company}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, company: event.target.value }))
              }
              required
              autoFocus
            />
            <TextField
              label="Role"
              value={form.role}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, role: event.target.value }))
              }
              required
            />
            <TextField
              select
              label="Status"
              value={form.status}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  status: Number(event.target.value) as ApplicationStatus,
                }))
              }
            >
              {APPLICATION_STATUS_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Date Applied"
              type="date"
              value={form.dateApplied}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  dateApplied: event.target.value,
                }))
              }
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              label="Location"
              value={form.location}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, location: event.target.value }))
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.isRemote}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      isRemote: event.target.checked,
                    }))
                  }
                />
              }
              label="Remote"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
