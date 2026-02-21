import { api } from "../api/client";
import type {
  JobApplicationResponseDto,
  CreateJobApplicationRequestDto,
  UpdateJobApplicationRequestDto,
} from "../types/jobApplication";

export const getJobApplications = () =>
  api.get("/api/job-applications") as Promise<JobApplicationResponseDto[]>;
export const createJobApplication = (dto: CreateJobApplicationRequestDto) =>
  api.post("/api/job-applications", dto);
export const updateJobApplication = (
  id: string,
  dto: UpdateJobApplicationRequestDto,
) => api.put(`/api/job-applications/${id}`, dto);
export const deleteJobApplication = (id: string) =>
  api.delete(`/api/job-applications/${id}`);
