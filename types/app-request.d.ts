import { Request } from "express";

declare interface protectedRequest extends Request {
    user?: any
}