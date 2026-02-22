import { api } from "../api/client";
import type {
  JobApplicationResponseDto,
  CreateJobApplicationRequestDto,
  UpdateJobApplicationRequestDto,
} from "../types/jobApplication";

export const getJobApplications = () =>
  api.get<JobApplicationResponseDto[]>("/api/job-applications");

export const createJobApplication = (dto: CreateJobApplicationRequestDto) =>
  api.post<JobApplicationResponseDto>("/api/job-applications", dto);

export const updateJobApplication = (
  id: string,
  dto: UpdateJobApplicationRequestDto,
) => api.put<JobApplicationResponseDto>(`/api/job-applications/${id}`, dto);

export const deleteJobApplication = (id: string) =>
  api.delete(`/api/job-applications/${id}`);
