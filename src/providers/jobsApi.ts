import type {
  CreateJobApplicationRequestDto,
  JobApplicationResponseDto,
  UpdateJobApplicationRequestDto,
} from "../types/jobApplication";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

async function ensureOk(res: Response) {
  if (res.ok) return;
  const text = await res.text().catch(() => "");
  throw new Error(text || `Request failed (${res.status})`);
}

export async function getJobApplications(signal?: AbortSignal) {
  const res = await fetch(`${BASE_URL}/api/job-applications`, { signal });
  await ensureOk(res);
  return (await res.json()) as JobApplicationResponseDto[];
}

export async function getJobApplicationById(id: string, signal?: AbortSignal) {
  const res = await fetch(`${BASE_URL}/api/job-applications/${id}`, { signal });
  await ensureOk(res);
  return (await res.json()) as JobApplicationResponseDto;
}

export async function createJobApplication(
  dto: CreateJobApplicationRequestDto,
) {
  const res = await fetch(`${BASE_URL}/api/job-applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  await ensureOk(res);
  return (await res.json()) as JobApplicationResponseDto;
}

export async function updateJobApplication(
  id: string,
  dto: UpdateJobApplicationRequestDto,
) {
  const res = await fetch(`${BASE_URL}/api/job-applications/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  await ensureOk(res);
  return (await res.json()) as JobApplicationResponseDto;
}

export async function deleteJobApplication(id: string) {
  const res = await fetch(`${BASE_URL}/api/job-applications/${id}`, {
    method: "DELETE",
  });
  await ensureOk(res);
  return true;
}
