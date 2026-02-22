export enum ApplicationStatus {
  Planned = 0,
  Applied = 1,
  Interviewing = 2,
  Offer = 3,
  Rejected = 4,
  Accepted = 5,
}

export const APPLICATION_STATUS_OPTIONS = [
  { value: ApplicationStatus.Planned, label: "Planned" },
  { value: ApplicationStatus.Applied, label: "Applied" },
  { value: ApplicationStatus.Interviewing, label: "Interviewing" },
  { value: ApplicationStatus.Offer, label: "Offer" },
  { value: ApplicationStatus.Rejected, label: "Rejected" },
  { value: ApplicationStatus.Accepted, label: "Accepted" },
] as const;

export const getApplicationStatusLabel = (status: ApplicationStatus) =>
  ApplicationStatus[status] ?? "Unknown";

export type JobApplicationResponseDto = {
  id: string;
  company: string;
  role: string;
  location: string;
  isRemote: boolean;
  referral: string;
  contactPerson: string;
  dateApplied: string | null;
  status: ApplicationStatus;
  compensationRange: string;
  lastTouch: string | null;
  nextAction: string;
  nextActionDate: string | null;
  notes: string;
  link: string;
};

export type CreateJobApplicationRequestDto = {
  company: string;
  role: string;
  location?: string | null;
  isRemote: boolean;
  referral?: string | null;
  contactPerson?: string | null;
  dateApplied?: string | null;
  status: ApplicationStatus;
  compensationRange?: string | null;
  lastTouch?: string | null;
  nextAction?: string | null;
  nextActionDate?: string | null;
  notes?: string | null;
  link?: string | null;
};

export type UpdateJobApplicationRequestDto = CreateJobApplicationRequestDto;
