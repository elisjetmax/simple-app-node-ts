export interface IOtp {
  id?: string;
  value: string;
  type: string;
  isActive: boolean;
  expiresIn: number;
  isProcessed?: boolean;
  processedAt?: Date;
  userId: string;
  channel: string;
}
