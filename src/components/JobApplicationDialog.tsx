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
import type {
  CreateJobApplicationRequestDto,
  JobApplicationResponseDto,
} from "../types/jobApplication";
import {
  ApplicationStatus,
  APPLICATION_STATUS_OPTIONS,
} from "../types/jobApplication";

type JobApplicationDialogProps = {
  open: boolean;
  isSubmitting?: boolean;
  mode?: "create" | "edit";
  initialValues?: JobApplicationResponseDto | null;
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
  referral: string;
  contactPerson: string;
  compensationRange: string;
  lastTouch: string;
  nextAction: string;
  nextActionDate: string;
  notes: string;
  link: string;
};

const initialFormState: JobApplicationFormState = {
  company: "",
  role: "",
  status: ApplicationStatus.Planned,
  dateApplied: "",
  isRemote: false,
  location: "",
  referral: "",
  contactPerson: "",
  compensationRange: "",
  lastTouch: "",
  nextAction: "",
  nextActionDate: "",
  notes: "",
  link: "",
};

const toDateInputValue = (value: string | null | undefined) => {
  if (!value) return "";
  return value.slice(0, 10);
};

export default function JobApplicationDialog({
  open,
  isSubmitting = false,
  mode = "create",
  initialValues,
  onClose,
  onSubmit,
}: JobApplicationDialogProps) {
  const [form, setForm] = useState<JobApplicationFormState>(initialFormState);

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialValues) {
      setForm({
        company: initialValues.company ?? "",
        role: initialValues.role ?? "",
        status: initialValues.status,
        dateApplied: toDateInputValue(initialValues.dateApplied),
        isRemote: initialValues.isRemote,
        location: initialValues.location ?? "",
        referral: initialValues.referral ?? "",
        contactPerson: initialValues.contactPerson ?? "",
        compensationRange: initialValues.compensationRange ?? "",
        lastTouch: toDateInputValue(initialValues.lastTouch),
        nextAction: initialValues.nextAction ?? "",
        nextActionDate: toDateInputValue(initialValues.nextActionDate),
        notes: initialValues.notes ?? "",
        link: initialValues.link ?? "",
      });
      return;
    }

    setForm(initialFormState);
  }, [open, mode, initialValues]);

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
      referral: form.referral.trim() || null,
      contactPerson: form.contactPerson.trim() || null,
      compensationRange: form.compensationRange.trim() || null,
      lastTouch: form.lastTouch || null,
      nextAction: form.nextAction.trim() || null,
      nextActionDate: form.nextActionDate || null,
      notes: form.notes.trim() || null,
      link: form.link.trim() || null,
    });
  };

  const dialogTitle = mode === "edit" ? "Edit Application" : "New Application";
  const submitLabel = mode === "edit" ? "Save" : "Create";

  return (
    <Dialog
      open={open}
      onClose={isSubmitting ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <form onSubmit={submit}>
        <DialogTitle>{dialogTitle}</DialogTitle>
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
            <TextField
              label="Referral"
              value={form.referral}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, referral: event.target.value }))
              }
            />
            <TextField
              label="Contact Person"
              value={form.contactPerson}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, contactPerson: event.target.value }))
              }
            />
            <TextField
              label="Compensation Range"
              value={form.compensationRange}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, compensationRange: event.target.value }))
              }
            />
            <TextField
              label="Last Touch"
              type="date"
              value={form.lastTouch}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, lastTouch: event.target.value }))
              }
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              label="Next Action"
              value={form.nextAction}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, nextAction: event.target.value }))
              }
            />
            <TextField
              label="Next Action Date"
              type="date"
              value={form.nextActionDate}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, nextActionDate: event.target.value }))
              }
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              label="Link"
              value={form.link}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, link: event.target.value }))
              }
            />
            <TextField
              label="Notes"
              value={form.notes}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, notes: event.target.value }))
              }
              multiline
              minRows={3}
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
            {isSubmitting ? "Saving..." : submitLabel}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
