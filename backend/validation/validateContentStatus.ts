import { ContentStatus } from "../enums/ContentStatus.enum";

export function validateContentStatus(value: string): boolean {
    return Object.values(ContentStatus).includes(value as ContentStatus);
  }