import { describe, expect, it, beforeEach, afterEach } from 'bun:test';
import EnvConfig from '@/config/EnvConfig';

describe('EnvConfig', () => {
  const originalEnv: Record<string, string | undefined> = {};

  beforeEach(() => {
    originalEnv.OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    originalEnv.POSTGRES_HOST = process.env.POSTGRES_HOST;
    originalEnv.POSTGRES_PORT = process.env.POSTGRES_PORT;
    originalEnv.POSTGRES_DB = process.env.POSTGRES_DB;
    originalEnv.POSTGRES_USER = process.env.POSTGRES_USER;
    originalEnv.POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;

    process.env.OPENROUTER_API_KEY = 'test-api-key';
    process.env.POSTGRES_HOST = 'localhost';
    process.env.POSTGRES_PORT = '5432';
    process.env.POSTGRES_DB = 'testdb';
    process.env.POSTGRES_USER = 'testuser';
    process.env.POSTGRES_PASSWORD = 'testpass';
  });

  afterEach(() => {
    if (originalEnv.OPENROUTER_API_KEY === undefined) delete process.env.OPENROUTER_API_KEY; else process.env.OPENROUTER_API_KEY = originalEnv.OPENROUTER_API_KEY;
    if (originalEnv.POSTGRES_HOST === undefined) delete process.env.POSTGRES_HOST; else process.env.POSTGRES_HOST = originalEnv.POSTGRES_HOST;
    if (originalEnv.POSTGRES_PORT === undefined) delete process.env.POSTGRES_PORT; else process.env.POSTGRES_PORT = originalEnv.POSTGRES_PORT;
    if (originalEnv.POSTGRES_DB === undefined) delete process.env.POSTGRES_DB; else process.env.POSTGRES_DB = originalEnv.POSTGRES_DB;
    if (originalEnv.POSTGRES_USER === undefined) delete process.env.POSTGRES_USER; else process.env.POSTGRES_USER = originalEnv.POSTGRES_USER;
    if (originalEnv.POSTGRES_PASSWORD === undefined) delete process.env.POSTGRES_PASSWORD; else process.env.POSTGRES_PASSWORD = originalEnv.POSTGRES_PASSWORD;
  });

  it('should read the correct values from process.env', () => {
    expect(EnvConfig.OPENROUTER_API_KEY).toBe('test-api-key');
    expect(EnvConfig.POSTGRES_HOST).toBe('localhost');
    expect(EnvConfig.POSTGRES_PORT).toBe(5432);
    expect(EnvConfig.POSTGRES_DB).toBe('testdb');
    expect(EnvConfig.POSTGRES_USER).toBe('testuser');
    expect(EnvConfig.POSTGRES_PASSWORD).toBe('testpass');
  });

  it('should generate correct PostgreSQL connection string', () => {
    const expected = 'postgresql://testuser:testpass@localhost:5432/testdb';
    expect(EnvConfig.getPostgresConnectionString()).toBe(expected);
  });

  it('should not throw when all required env vars are set', () => {
    expect(() => EnvConfig.ensureAll()).not.toThrow();
  });

  it('should throw error when OPENROUTER_API_KEY is missing', () => {
    delete process.env.OPENROUTER_API_KEY;
    expect(() => EnvConfig.ensureAll()).toThrow('OPENROUTER_API_KEY is not set');
  });

  it('should throw error when POSTGRES_DB is missing', () => {
    delete process.env.POSTGRES_DB;
    expect(() => EnvConfig.ensureAll()).toThrow('POSTGRES_DB is not set');
  });

  it('should throw error when POSTGRES_USER is missing', () => {
    delete process.env.POSTGRES_USER;
    expect(() => EnvConfig.ensureAll()).toThrow('POSTGRES_USER is not set');
  });

  it('should throw error when POSTGRES_PASSWORD is missing', () => {
    delete process.env.POSTGRES_PASSWORD;
    expect(() => EnvConfig.ensureAll()).toThrow('POSTGRES_PASSWORD is not set');
  });
});
