import { v4 as uuidv4 } from 'uuid';

/**
 * Generate a new UUID
 */
export const generateUuid = (): string => {
  return uuidv4();
};
