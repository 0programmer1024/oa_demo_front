import { get, post, put } from "./http";

export const download = (p) => get("/common/download", p);

