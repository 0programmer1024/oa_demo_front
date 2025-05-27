import {axiosDelete, get, post, put} from "./http";

// 登录接口
export const login = (p) => post("/user/login", p);

export const queryInterviewers = (p) => get("/user/interviewer/all", p);

export const pageInterviewers = (p) => get("/user/interviewer/page", p);

export const updateInterviewer = (p) => put("/user/interviewer", p);

export const addInterviewer = (p) => post("/user/interviewer", p);

export const delInterviewer = (id) => axiosDelete("/user/interviewer/", {}, id);
