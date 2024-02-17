import { z } from "zod";
export const jobValidationSchema = z
    .object({
        id: z.string().optional(),
        title: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Description is required"),
        company: z.string().min(1, "Company is required"),
        location: z.string().min(1, "Location is required"),
        type: z.string().min(1, "Type is required"),
        level: z.string().min(1, "Level is required"),
        applyMethod: z.string().min(1, "Apply method is required"),
        url: z.string().min(1, "Url is required"),
        applyEmail: z.string().optional(),
        status: z.string().min(1, "Status is required"),
        applyUrl: z.string().url("Invalid URL"),
        salary: z.number().optional(),
    })
    .refine((data) => {
        if (data.applyMethod === "email" && !data.applyEmail) {
            return false;
        }
        if (data.applyMethod === "link" && !data.applyUrl) {
            return false;
        }
        return true;
    });

export const jobSearchParamsSchema = z.object({
    search: z.string().optional(),
    status: z.string().optional(),
    type: z.string().optional(),
    level: z.string().optional(),
    applyMethod: z.string().optional(),
    minSalary: z.number().optional(),
    maxSalary: z.number().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
    sort: z.string().optional(),
});
