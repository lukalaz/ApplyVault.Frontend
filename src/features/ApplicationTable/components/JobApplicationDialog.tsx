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
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import type {
  CreateJobApplicationRequestDto,
  JobApplicationResponseDto,
} from "../../../types/jobApplication";
import { ApplicationStatus } from "../../../types/jobApplication";

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

const statusValues: ApplicationStatus[] = [
  ApplicationStatus.Planned,
  ApplicationStatus.Applied,
  ApplicationStatus.Interviewing,
  ApplicationStatus.Offer,
  ApplicationStatus.Rejected,
  ApplicationStatus.Accepted,
];

const getStatusTranslationKey = (status: ApplicationStatus) => {
  switch (status) {
    case ApplicationStatus.Planned:
      return "status.planned";
    case ApplicationStatus.Applied:
      return "status.applied";
    case ApplicationStatus.Interviewing:
      return "status.interviewing";
    case ApplicationStatus.Offer:
      return "status.offer";
    case ApplicationStatus.Rejected:
      return "status.rejected";
    case ApplicationStatus.Accepted:
      return "status.accepted";
    default:
      return "status.unknown";
  }
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
  const { t } = useTranslation();

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

  const dialogTitle =
    mode === "edit" ? t("dialogs.application.titleEdit") : t("dialogs.application.titleCreate");
  const submitLabel = mode === "edit" ? t("common.save") : t("common.create");

  return (
    <Dialog
      open={open}
      onClose={isSubmitting ? undefined : onClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="job-application-dialog-title"
      aria-describedby="job-application-dialog-description"
    >
      <form onSubmit={submit} aria-busy={isSubmitting}>
        <DialogTitle id="job-application-dialog-title">
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <Typography
            id="job-application-dialog-description"
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            {t("dialogs.application.description")}
          </Typography>
          <Stack spacing={2}>
            <TextField
              label={t("dialogs.application.labels.company")}
              value={form.company}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, company: event.target.value }))
              }
              required
              autoFocus
              slotProps={{ htmlInput: { "aria-label": t("dialogs.application.labels.company") } }}
            />
            <TextField
              label={t("dialogs.application.labels.role")}
              value={form.role}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, role: event.target.value }))
              }
              required
              slotProps={{ htmlInput: { "aria-label": t("dialogs.application.labels.role") } }}
            />
            <TextField
              select
              label={t("dialogs.application.labels.status")}
              value={form.status}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  status: Number(event.target.value) as ApplicationStatus,
                }))
              }
              slotProps={{ htmlInput: { "aria-label": t("dialogs.application.labels.status") } }}
            >
              {statusValues.map((value) => (
                <MenuItem key={value} value={value}>
                  {t(getStatusTranslationKey(value))}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label={t("dialogs.application.labels.dateApplied")}
              type="date"
              value={form.dateApplied}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  dateApplied: event.target.value,
                }))
              }
              slotProps={{
                inputLabel: { shrink: true },
                htmlInput: { "aria-label": t("dialogs.application.labels.dateApplied") },
              }}
            />
            <TextField
              label={t("dialogs.application.labels.location")}
              value={form.location}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, location: event.target.value }))
              }
              slotProps={{ htmlInput: { "aria-label": t("dialogs.application.labels.location") } }}
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
                  slotProps={{ input: { "aria-label": t("dialogs.application.labels.remote") } }}
                />
              }
              label={t("dialogs.application.labels.remote")}
            />
            <TextField
              label={t("dialogs.application.labels.referral")}
              value={form.referral}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, referral: event.target.value }))
              }
              slotProps={{ htmlInput: { "aria-label": t("dialogs.application.labels.referral") } }}
            />
            <TextField
              label={t("dialogs.application.labels.contactPerson")}
              value={form.contactPerson}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  contactPerson: event.target.value,
                }))
              }
              slotProps={{ htmlInput: { "aria-label": t("dialogs.application.labels.contactPerson") } }}
            />
            <TextField
              label={t("dialogs.application.labels.compensationRange")}
              value={form.compensationRange}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  compensationRange: event.target.value,
                }))
              }
              slotProps={{
                htmlInput: { "aria-label": t("dialogs.application.labels.compensationRange") },
              }}
            />
            <TextField
              label={t("dialogs.application.labels.lastTouch")}
              type="date"
              value={form.lastTouch}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, lastTouch: event.target.value }))
              }
              slotProps={{
                inputLabel: { shrink: true },
                htmlInput: { "aria-label": t("dialogs.application.labels.lastTouch") },
              }}
            />
            <TextField
              label={t("dialogs.application.labels.nextAction")}
              value={form.nextAction}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, nextAction: event.target.value }))
              }
              slotProps={{ htmlInput: { "aria-label": t("dialogs.application.labels.nextAction") } }}
            />
            <TextField
              label={t("dialogs.application.labels.nextActionDate")}
              type="date"
              value={form.nextActionDate}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  nextActionDate: event.target.value,
                }))
              }
              slotProps={{
                inputLabel: { shrink: true },
                htmlInput: { "aria-label": t("dialogs.application.labels.nextActionDate") },
              }}
            />
            <TextField
              label={t("dialogs.application.labels.link")}
              value={form.link}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, link: event.target.value }))
              }
              slotProps={{ htmlInput: { "aria-label": t("dialogs.application.labels.link") } }}
            />
            <TextField
              label={t("dialogs.application.labels.notes")}
              value={form.notes}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, notes: event.target.value }))
              }
              multiline
              minRows={3}
              slotProps={{ htmlInput: { "aria-label": t("dialogs.application.labels.notes") } }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            {t("common.cancel")}
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? t("dialogs.application.saving") : submitLabel}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
