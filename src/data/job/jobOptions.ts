import type { Job } from "@/types/characterTypes";
import { JOB_METADATA } from "./jobMetadata";

export const JOB_OPTIONS = [
    { value: "", label: "-- 직업을 선택하세요 --" },
    ...Object.entries(JOB_METADATA).map(([value, { label }]) => ({
        value: value as Job,
        label,
    })),
];
