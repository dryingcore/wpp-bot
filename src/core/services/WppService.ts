import type { IWppClient } from '@/core/interfaces/IWppClient';

export default class WppService {
  constructor(private readonly wppClient: IWppClient) {}

  async iniciarSessao(empresaId: string): Promise<void> {
    await this.wppClient.startSession(empresaId);
  }

  getQrCode(empresaId: string): string | null {
    return this.wppClient.getQrCode(empresaId);
  }

  isAutenticado(empresaId: string): boolean {
    return this.wppClient.isSessionReady(empresaId);
  }

  getCliente(empresaId: string) {
    return this.wppClient.getClient(empresaId);
  }
}
