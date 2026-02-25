import { api } from "../../../common/api/client";

export const getHealth = () => api.get("/health");
