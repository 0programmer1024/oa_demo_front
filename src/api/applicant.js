import {axiosDelete, get, post, put} from "@/api/http";

export const applicantPage = (p) => get("/applicant/page", p);

export const applicantAdd = (p) => post("/applicant", p);

export const applicantUpdate = (p) => put("/applicant", p);

export const applicantDelete = (p) => axiosDelete ("/applicant/", {} ,p);
