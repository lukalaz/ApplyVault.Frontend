import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createJobApplication,
  deleteJobApplication,
  getJobApplicationById,
  getJobApplications,
  updateJobApplication,
} from "./jobsApi";
import { jobsQueryKeys } from "./jobsQueryKeys";
import type {
  CreateJobApplicationRequestDto,
  UpdateJobApplicationRequestDto,
} from "../types/jobApplication";

export function useJobApplications() {
  return useQuery({
    queryKey: jobsQueryKeys.all,
    queryFn: ({ signal }) => getJobApplications(signal),
  });
}

export function useJobApplication(id: string | undefined) {
  return useQuery({
    queryKey: id ? jobsQueryKeys.byId(id) : jobsQueryKeys.byId(""),
    queryFn: ({ signal }) => getJobApplicationById(id!, signal),
    enabled: !!id,
  });
}

export function useCreateJobApplication(onSuccess?: () => void) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateJobApplicationRequestDto) =>
      createJobApplication(dto),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: jobsQueryKeys.all });
      onSuccess?.();
    },
  });
}

export function useUpdateJobApplication(id: string, onSuccess?: () => void) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (dto: UpdateJobApplicationRequestDto) =>
      updateJobApplication(id, dto),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: jobsQueryKeys.all });
      await qc.invalidateQueries({ queryKey: jobsQueryKeys.byId(id) });
      onSuccess?.();
    },
  });
}

export function useDeleteJobApplication(onSuccess?: () => void) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteJobApplication(id),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: jobsQueryKeys.all });
      onSuccess?.();
    },
  });
}
