export default class EnvConfig {
  static get OPENROUTER_API_KEY(): string {
    return process.env.OPENROUTER_API_KEY ?? '';
  }

  static get POSTGRES_HOST(): string {
    return process.env.POSTGRES_HOST ?? 'localhost';
  }

  static get POSTGRES_PORT(): number {
    return parseInt(process.env.POSTGRES_PORT || '5432', 10);
  }

  static get POSTGRES_DB(): string {
    return process.env.POSTGRES_DB ?? '';
  }

  static get POSTGRES_USER(): string {
    return process.env.POSTGRES_USER ?? '';
  }

  static get POSTGRES_PASSWORD(): string {
    return process.env.POSTGRES_PASSWORD ?? '';
  }

  static getPostgresConnectionString(): string {
    return `postgresql://${this.POSTGRES_USER}:${this.POSTGRES_PASSWORD}@${this.POSTGRES_HOST}:${this.POSTGRES_PORT}/${this.POSTGRES_DB}`;
  }

  static ensureAll(): void {
    if (!this.OPENROUTER_API_KEY) throw new Error('OPENROUTER_API_KEY is not set');
    if (!this.POSTGRES_DB) throw new Error('POSTGRES_DB is not set');
    if (!this.POSTGRES_USER) throw new Error('POSTGRES_USER is not set');
    if (!this.POSTGRES_PASSWORD) throw new Error('POSTGRES_PASSWORD is not set');
  }
}
