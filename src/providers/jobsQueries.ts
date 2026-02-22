import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createJobApplication,
  deleteJobApplication,
  getJobApplications,
  updateJobApplication,
} from "./jobsApi";
import { jobsQueryKeys } from "./jobsQueryKeys";
import type {
  JobApplicationResponseDto,
  CreateJobApplicationRequestDto,
  UpdateJobApplicationRequestDto,
} from "../types/jobApplication";

type UpdateJobApplicationMutationInput = {
  id: string;
  dto: UpdateJobApplicationRequestDto;
};

export const useJobApplications = () => {
  const {
    isLoading: isLoadingJobs,
    error: errorJobs,
    data: jobsRaw,
  } = useQuery({
    queryKey: jobsQueryKeys.all,
    queryFn: () => getJobApplications(),
  });

  const jobs = useMemo<JobApplicationResponseDto[]>(() => {
    return jobsRaw ?? [];
  }, [jobsRaw]);

  return { isLoadingJobs, errorJobs, jobs };
};

export const useCreateJobApplication = (
  successCallback?: (created: JobApplicationResponseDto) => void,
) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateJobApplicationRequestDto) =>
      createJobApplication(dto),
    onSuccess: async (created) => {
      await qc.invalidateQueries({ queryKey: jobsQueryKeys.all });
      successCallback?.(created);
    },
  });
};

export const useUpdateJobApplication = (
  successCallback?: (updated: JobApplicationResponseDto) => void,
) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: UpdateJobApplicationMutationInput) =>
      updateJobApplication(id, dto),
    onSuccess: async (updated, variables) => {
      await qc.invalidateQueries({ queryKey: jobsQueryKeys.all });
      await qc.invalidateQueries({ queryKey: jobsQueryKeys.byId(variables.id) });
      successCallback?.(updated);
    },
  });
};

export const useDeleteJobApplication = (successCallback?: () => void) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteJobApplication(id),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: jobsQueryKeys.all });
      successCallback?.();
    },
  });
};
