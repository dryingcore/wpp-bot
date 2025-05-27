export interface IWppClient {
  startSession(sessionId: string): Promise<void>;
  getQrCode(sessionId: string): string | null;
  isSessionReady(sessionId: string): boolean;
  getClient(sessionId: string): unknown;
}
