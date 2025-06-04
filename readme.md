# WPP Bot

WPP Bot is a simple experiment that integrates the [WPPConnect](https://github.com/wppconnect-team/wppconnect) library with a small Fastify server written in TypeScript using the Bun runtime.

## Main characteristics

- **Bun + TypeScript** – all code is compiled and executed using Bun.
- **Fastify HTTP API** – exposes endpoints to start a WhatsApp session and retrieve the QR code for pairing.
- **WPPConnect adapter** – manages WhatsApp clients, sessions and message handling.
- **OpenRouter AI integration** – messages received by the bot are sent to OpenRouter to classify the user intent.
- **Domain driven approach** – the `core` folder contains entities and value objects representing domain concepts such as `Usuario`, `EnderecoVO`, `NomeVO` and others.
- **Drizzle ORM** – database access is done using Drizzle with PostgreSQL; schemas live in `src/infrastructure/database/schema`.
- **Seed script** – `seed.ts` populates the database with a test company and menu items.
- **Automated tests** – several unit tests exist under `src/__tests__` and can be run with `bun test`.

## Development

Install dependencies:

```bash
bun install
```

Run tests:

```bash
bun test
```

Start the local server:

```bash
bun run index.ts
```

This will start Fastify on port `3001`. Endpoints:

- `POST /wpp/:empresaId/start` – starts a WhatsApp session.
- `GET /wpp/:empresaId/qr` – returns the QR code string if available.

## Environment variables

The application requires a few environment variables which are validated on start:

- `OPENROUTER_API_KEY` – API key for OpenRouter.
- `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD` – PostgreSQL connection details.

These are used by `src/config/EnvConfig.ts` and `drizzle.config.ts`.

## Prompt used for the AI

The prompt at `src/infrastructure/ia/prompt/prompt.json` instructs the language model to classify messages into intents such as `fazer_pedido` or `consultar_promocao`. Only a JSON object describing the intent is returned, which is then consumed by the bot.

## Database schema

Tables for companies, menus, clients and orders are defined using Drizzle ORM and can be found in the `src/infrastructure/database/schema` directory. Migrations are generated with `drizzle-kit` via:

```bash
bunx drizzle-kit generate
bunx drizzle-kit migrate
```

## Seeding sample data

Running `bun run seed.ts` inserts a basic company and some menu items into the database.

## Conclusion

This project showcases how to build a small WhatsApp bot using Bun, Fastify and WPPConnect while keeping the domain logic isolated and tested. It also demonstrates how to leverage a hosted AI service to interpret free text messages sent by users.
