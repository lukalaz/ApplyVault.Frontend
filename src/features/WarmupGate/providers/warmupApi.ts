import { api } from "../../../common/api/client";

export const getHealth = async () => {
  await api.getRaw("/health");
  return true as const;
};
