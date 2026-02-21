export type ApplicationStatus =
  | "Planned"
  | "Applied"
  | "Interviewing"
  | "Offer"
  | "Rejected"
  | "Accepted";

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
