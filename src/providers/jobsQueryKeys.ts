export const jobsQueryKeys = {
  all: ["jobApplications"] as const,
  byId: (id: string) => ["jobApplications", id] as const,
};
