# OrbitAgro — Frontend

Dashboard web para monitoramento de fazendas, frota e telemetria de sensores IoT.

## Requisitos

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/) 8+

## Instalação

```bash
pnpm install
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Modo mock: usa dados locais, sem chamadas à API real e sem autenticação Firebase
VITE_USE_MOCKS=true

# URL base da API (obrigatório quando VITE_USE_MOCKS=false)
VITE_API_BASE_URL=https://esor-gs-orbit-agro-service.onrender.com/api

# Token de autenticação da API (obrigatório quando VITE_USE_MOCKS=false)
VITE_API_TOKEN=

# Configuração do Firebase (obrigatório quando VITE_USE_MOCKS=false)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

> Com `VITE_USE_MOCKS=true`, o login é ignorado e a aplicação inicia autenticada com um usuário de desenvolvimento. Ideal para rodar localmente sem dependências externas.

## Executando

### Modo desenvolvimento

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Build de produção

```bash
pnpm build
```

Os arquivos compilados serão gerados na pasta `dist/`.

### Pré-visualizar o build

```bash
pnpm preview
```

### Lint

```bash
pnpm lint
```

## Estrutura principal

```
src/
├── components/       # Componentes reutilizáveis (mapa, gráficos, painel de frota…)
├── context/          # Contextos React (fazenda selecionada, telemetria, frota…)
├── data/             # Interfaces TypeScript e dados mock
├── pages/            # Páginas da aplicação
└── services/api/     # Camada de serviço (mock + integração real por recurso)
```

## Tecnologias

| Biblioteca | Uso |
|---|---|
| React 19 + TypeScript | Interface |
| Vite | Bundler |
| React Router 7 | Roteamento |
| React Leaflet | Mapa interativo |
| Recharts | Gráficos de telemetria |
| Firebase Auth | Autenticação |
| Biome | Lint e formatação |
