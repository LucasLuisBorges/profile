import type { Accent, L } from "./site";

type List = { pt: string[]; en: string[] };

export type Project = {
  slug: string;
  title: string | L;
  client: string | L;
  year: string;
  role: string | L;
  accent: Accent;
  featured?: boolean;
  /** Older client work: listed compactly under "Archive". */
  archived?: boolean;
  tagline: L;
  summary: L;
  highlights: List;
  metrics?: { value: string | L; label: L }[];
  stack: string[];
  /** Screenshots under /public. Projects without them render `flow` instead. */
  images?: string[];
  flow?: List;
  url?: string;
  team?: { name: string; github?: string }[];
};

const aguiar = { name: "Lucas Aguiar", github: "https://github.com/laguiarx" };

export const projects: Project[] = [
  {
    slug: "aura",
    title: "Aura",
    client: "Cadmus",
    year: "2026",
    role: { pt: "Líder da reescrita · Senior AI Engineer", en: "Rewrite lead · Senior AI Engineer" },
    accent: "lime",
    featured: true,
    tagline: {
      pt: "AMS autônomo: agentes de IA que leem incidentes de produção e abrem o PR da correção.",
      en: "Autonomous AMS: AI agents that read production incidents and open the fix PR.",
    },
    summary: {
      pt: "O Aura observa os logs de produção, agrupa erros em incidentes e deixa um LLM classificar cada um. Daí em diante, um grafo em LangGraph.js orquestra um agente Codex/Claude dentro de um container Docker efêmero: ele corrige o código, revisa o próprio trabalho e abre um Draft PR no repositório do cliente. Conduzi a reescrita da plataforma de .NET para um monorepo TypeScript e escrevi cerca de 75% dos commits da V2.",
      en: "Aura watches production logs, groups errors into incidents and lets an LLM classify each one. From there, a LangGraph.js graph orchestrates a Codex/Claude agent inside an ephemeral Docker container: it fixes the code, reviews its own work and opens a Draft PR on the client's repository. I led the platform's rewrite from .NET to a TypeScript monorepo and authored about 75% of V2 commits.",
    },
    highlights: {
      pt: [
        "Pipeline de agentes ponta a ponta: logs → incidentes → triagem por LLM → LangGraph.js → agente em Docker efêmero → Draft PR.",
        "Integração com GitHub, GitLab e Azure DevOps com credenciais cifradas (AES-256-GCM), rotação por tenant e trilha de auditoria.",
        "Respostas automáticas a comentários de code review nos PRs via webhooks.",
        "Guardrails e governança: mascaramento de segredos e dados pessoais, bloqueio de credenciais, proteção SSRF, rate limiting e cotas de custo de IA atômicas por workspace e projeto.",
        "Fluxo de Demandas (escopo, estimativa, planejamento com Codex e implementação), skills de projeto injetadas no prompt via RAG e roteamento de auto-fix entre projetos do mesmo grupo.",
        "Homologação com 991/991 testes e 23 testes de integração do runner em Docker, encontrando 5 problemas graves antes do release.",
      ],
      en: [
        "End-to-end agent pipeline: logs → incidents → LLM triage → LangGraph.js → agent in an ephemeral Docker container → Draft PR.",
        "GitHub, GitLab and Azure DevOps integrations with encrypted credentials (AES-256-GCM), per-tenant rotation and an audit trail.",
        "Automated replies to code review comments on PRs via webhooks.",
        "Guardrails and governance: secret and PII masking in agent logs, credential blocking, SSRF protection, rate limiting and atomic AI cost quotas per workspace and project.",
        "Demands flow (scope, estimate, Codex planning and implementation), project skills injected into prompts via RAG, and auto-fix routing across projects in the same group.",
        "Release sign-off with 991/991 tests and 23 Docker runner integration tests, catching 5 critical issues before the client release.",
      ],
    },
    metrics: [
      { value: "~75%", label: { pt: "dos commits da V2", en: "of V2 commits" } },
      { value: "991/991", label: { pt: "testes verdes", en: "green tests" } },
      { value: "5", label: { pt: "falhas graves pegas antes do cliente", en: "critical issues caught pre-release" } },
    ],
    stack: ["Bun", "React 19", "Hono", "oRPC", "Drizzle", "PostgreSQL", "pgvector", "Redis Streams", "LangGraph.js", "Docker"],
    flow: {
      pt: ["Logs de produção", "Incidentes", "Triagem por LLM", "LangGraph.js", "Agente em Docker", "Draft PR"],
      en: ["Production logs", "Incidents", "LLM triage", "LangGraph.js", "Agent in Docker", "Draft PR"],
    },
    url: "https://aura-v2.cadmus.com.br/",
  },
  {
    slug: "elencar",
    title: "Elencar",
    client: { pt: "Produto próprio", en: "Own product" },
    year: "2026",
    role: { pt: "Co-criador · Full Stack & IA", en: "Co-creator · Full Stack & AI" },
    accent: "cyan",
    featured: true,
    tagline: {
      pt: "SaaS para organizadores de feiras: inscrições, curadoria com IA, Pix e um servidor MCP para Claude e ChatGPT.",
      en: "SaaS for fair organizers: applications, AI curation, Pix payments and an MCP server for Claude and ChatGPT.",
    },
    summary: {
      pt: "O Elencar tira a seleção de expositores da planilha. O organizador recebe inscrições (ou importa do Google Forms e de CSV), avalia com a equipe, publica o resultado, acompanha confirmações e cobra por Pix com split de marketplace. Um agente de curadoria sugere aprovar, pôr em espera ou recusar cada inscrição, e um servidor MCP próprio deixa o organizador operar tudo de dentro do Claude ou do ChatGPT.",
      en: "Elencar takes vendor selection out of spreadsheets. Organizers receive applications (or import them from Google Forms and CSV), review them with their team, publish results, track confirmations and charge vendors by Pix with a marketplace split. A curation agent suggests approving, waitlisting or rejecting each application, and a custom MCP server lets organizers run everything from inside Claude or ChatGPT.",
    },
    highlights: {
      pt: [
        "Servidor MCP com OAuth próprio (registro dinâmico de clientes, RFC 9728): 47 ferramentas, 9 delas com cards interativos dentro do chat (MCP Apps).",
        "Ações que enviam algo exigem confirmação: o assistente repete a chamada com um código de uso único válido por 5 minutos.",
        "Agente de curadoria na OpenAI Responses API com saída em JSON Schema estrito, dados pessoais removidos antes do envio e defesas contra prompt injection.",
        "Regras duras antes da IA: validação de CNPJ/MEI e compatibilidade de CNAE com dados da Receita Federal.",
        "Pix com split de marketplace via Mercado Pago, conectado por organização e validado com pagamento real.",
        "WhatsApp Cloud API, notificações em tempo real (SSE), fila de jobs durável, trilha de auditoria e interface em português, espanhol e inglês.",
        "Gates de qualidade: checker de arquitetura, testes de mutação e 1.146 testes unitários + 53 de integração com PostgreSQL.",
      ],
      en: [
        "MCP server with its own OAuth (dynamic client registration, RFC 9728): 47 tools, 9 of them rendering interactive cards inside the chat (MCP Apps).",
        "Anything that sends requires confirmation: the assistant repeats the call with a single-use code valid for 5 minutes.",
        "Curation agent on the OpenAI Responses API with strict JSON Schema output, personal data stripped before sending and prompt-injection defences.",
        "Hard rules run before the AI: CNPJ/MEI checks and CNAE compatibility using Brazilian federal revenue data.",
        "Pix with a marketplace split via Mercado Pago, connected per organization and proven with a real payment.",
        "WhatsApp Cloud API, realtime notifications (SSE), a durable job queue, an audit trail and a UI in Portuguese, Spanish and English.",
        "Quality gates: an architecture checker, mutation testing and 1,146 unit tests + 53 PostgreSQL integration tests.",
      ],
    },
    metrics: [
      { value: "47", label: { pt: "ferramentas MCP para Claude e ChatGPT", en: "MCP tools for Claude and ChatGPT" } },
      { value: { pt: "1.146", en: "1,146" }, label: { pt: "testes unitários", en: "unit tests" } },
      { value: "Pix", label: { pt: "com split de marketplace", en: "with marketplace split" } },
    ],
    stack: ["Bun", "Hono", "tRPC", "React", "TanStack", "Prisma", "PostgreSQL", "Better Auth", "OpenAI", "MCP", "Mercado Pago", "Docker"],
    images: ["/images/elencar/home.webp"],
    flow: {
      pt: ["Inscrição", "Regras (CNPJ/CNAE)", "Curadoria com IA", "Decisão da equipe", "Resultado + Pix"],
      en: ["Application", "Rules (CNPJ/CNAE)", "AI curation", "Team decision", "Result + Pix"],
    },
    url: "https://elencar.com.br/",
    team: [aguiar],
  },
  {
    slug: "patie",
    title: "Patiê",
    client: { pt: "Produto próprio", en: "Own product" },
    year: "2025 → 2026",
    role: { pt: "Criador · Full Stack & IA", en: "Creator · Full Stack & AI" },
    accent: "orange",
    featured: true,
    tagline: {
      pt: "Marketplace de pet shops com vitrine, agendamento, painel da loja, admin e app — pagamento dividido e IA no catálogo.",
      en: "A pet-shop marketplace with storefront, bookings, store dashboard, admin and app — split payments and AI in the catalog.",
    },
    summary: {
      pt: "O “iFood dos pets”: o tutor compra produtos e agenda banho e serviços, cada pet shop tem seu painel e o time da plataforma opera um console admin. São cinco frentes — API, vitrine, painel da loja, admin e app mobile — e escrevi cerca de 1.560 dos ~1.700 commits.",
      en: "An “iFood for pets”: owners buy products and book grooming and services, every pet shop gets its own dashboard and the platform team runs an admin console. Five fronts — API, storefront, store dashboard, admin and mobile app — and I wrote about 1,560 of the ~1,700 commits.",
    },
    highlights: {
      pt: [
        "Split de pagamentos no Mercado Pago: contas de vendedor conectadas por OAuth, tokens cifrados, webhooks assinados, assinaturas e livro-razão financeiro — validado com dinheiro real.",
        "IA no catálogo: sugestão de taxonomia na importação de produtos e validação de sugestões com OpenAI.",
        "Nota fiscal brasileira: NF-e e NFS-e com assinatura de XML e integração com o Tiny ERP.",
        "Observabilidade completa: OpenTelemetry, Prometheus, Grafana, Loki, Tempo, Alertmanager e Metabase.",
        "API em Bun + Hono com OpenAPI, 80 modelos Prisma, 103 migrations e tempo real com Socket.IO.",
        "Auditoria pré-lançamento com 51 agentes de IA e um revisor cético checando cada achado crítico.",
      ],
      en: [
        "Mercado Pago split payments: seller accounts connected via OAuth, encrypted tokens, signed webhooks, subscriptions and a financial ledger — proven with real money.",
        "AI in the catalog: taxonomy suggestions on product import and OpenAI-validated catalog suggestions.",
        "Brazilian invoicing: NF-e and NFS-e with XML signing and a Tiny ERP integration.",
        "Full observability: OpenTelemetry, Prometheus, Grafana, Loki, Tempo, Alertmanager and Metabase.",
        "Bun + Hono API with OpenAPI, 80 Prisma models, 103 migrations and realtime via Socket.IO.",
        "Pre-launch audit by 51 AI agents, with a skeptic reviewer checking every critical finding.",
      ],
    },
    metrics: [
      { value: "5", label: { pt: "apps: API, vitrine, painel, admin e mobile", en: "apps: API, storefront, dashboard, admin, mobile" } },
      { value: "80", label: { pt: "modelos de dados", en: "data models" } },
      { value: "51", label: { pt: "agentes de IA na auditoria", en: "AI agents in the audit" } },
    ],
    stack: ["Bun", "Hono", "Prisma", "PostgreSQL", "Redis", "Socket.IO", "React 19", "Next.js 16", "Expo", "Better Auth", "OpenAI", "Mercado Pago", "OpenTelemetry", "Terraform"],
    images: ["/images/patie/home.webp"],
    flow: {
      pt: ["Tutor", "Vitrine", "Pagamento com split", "Pet shop", "Nota fiscal"],
      en: ["Pet owner", "Storefront", "Split payment", "Pet shop", "Invoice"],
    },
    url: "https://patie.com.br/",
    team: [{ name: "Nicollas Mirapalheta" }, { name: "Bryan Fardin" }],
  },
  {
    slug: "hades",
    title: "Hades",
    client: { pt: "Produto próprio", en: "Own product" },
    year: "2026",
    role: { pt: "Co-criador · Full Stack & IA", en: "Co-creator · Full Stack & AI" },
    accent: "violet",
    featured: true,
    tagline: {
      pt: "Gestão para prestadores de serviço — leads, orçamentos, obras, horas, finanças e marketing — com um agente de IA que consulta o workspace.",
      en: "Operations for service businesses — leads, estimates, jobs, timesheets, finance and marketing — with an AI agent that queries the workspace.",
    },
    summary: {
      pt: "Workspace multi-tenant para empresas de encanamento, reforma, pintura e paisagismo: leads, orçamentos com templates, projetos, apontamento de horas, biblioteca de materiais, finanças e automações de marketing. O Ask AI é um agente com tool calling que responde perguntas sobre o próprio workspace usando os mesmos serviços — e as mesmas permissões — de quem pergunta.",
      en: "A multi-tenant workspace for plumbing, remodeling, painting and landscaping businesses: leads, templated estimates, projects, timesheets, a materials library, finance and marketing automations. Ask AI is a tool-calling agent that answers questions about the workspace through the same services — and the same permissions — as the person asking.",
    },
    highlights: {
      pt: [
        "Ask AI: até 6 rodadas de ferramentas, contabilização de tokens, cota por workspace e dados redigidos antes de chegar ao modelo.",
        "Cada ferramenta do agente chama um serviço existente com os IDs de quem pergunta, então as regras de acesso valem também para a IA.",
        "Workspaces multi-tenant com papéis, convites, 2FA e audit log.",
        "Automações de marketing por e-mail e SMS (Twilio) com descadastro.",
        "CI com Playwright em desktop e mobile contra um PostgreSQL descartável em Docker, e gate de complexidade no código.",
      ],
      en: [
        "Ask AI: up to 6 tool rounds, token accounting, per-workspace quota and data redacted before it reaches the model.",
        "Every agent tool calls an existing service with the asker's own IDs, so access rules apply to the AI too.",
        "Multi-tenant workspaces with roles, invites, 2FA and audit logging.",
        "Email and SMS (Twilio) marketing automations with unsubscribe handling.",
        "CI with Playwright on desktop and mobile against a throwaway PostgreSQL in Docker, plus a code complexity gate.",
      ],
    },
    metrics: [
      { value: "6", label: { pt: "rodadas de ferramentas por pergunta", en: "tool rounds per question" } },
      { value: "2FA", label: { pt: "+ papéis e audit log", en: "+ roles and audit log" } },
      { value: "E2E", label: { pt: "Playwright em desktop e mobile", en: "Playwright on desktop and mobile" } },
    ],
    stack: ["Bun", "Hono", "oRPC", "React", "TanStack Router", "Drizzle", "PostgreSQL", "Better Auth", "Turborepo", "Twilio", "Playwright"],
    images: ["/images/hades/home.webp"],
    flow: {
      pt: ["Pergunta", "Ask AI", "Ferramentas = serviços", "Permissões do usuário", "Resposta"],
      en: ["Question", "Ask AI", "Tools = services", "User permissions", "Answer"],
    },
    url: "https://hades.lunger.com.br/",
    team: [aguiar],
  },
  {
    slug: "ai-hub",
    title: "AI Hub",
    client: "Cadmus",
    year: "2026",
    role: "Senior AI Engineer",
    accent: "pink",
    tagline: {
      pt: "Workspace corporativo multi-tenant para agentes de IA e RAG.",
      en: "Multi-tenant corporate workspace for AI agents and RAG.",
    },
    summary: {
      pt: "Plataforma construída sobre o OpenWebUI para empresas operarem agentes e bases de conhecimento com controle de acesso, custo e licença. Implementei a camada multi-tenant, um RBAC de 6 papéis, um construtor visual de agentes autônomos no estilo n8n e os painéis de uso de IA e licenças.",
      en: "A platform built on top of OpenWebUI that lets companies run agents and knowledge bases with access, cost and license control. I implemented the multi-tenant layer, a 6-role RBAC, an n8n-style visual builder for autonomous agents, and the AI usage and license dashboards.",
    },
    highlights: {
      pt: [
        "Multi-tenancy com isolamento por organização e RBAC de 6 papéis.",
        "Construtor visual de agentes autônomos no estilo n8n.",
        "Painéis de uso de IA e de licenças para gestores acompanharem custo e adoção.",
        "Infraestrutura como código com Terraform sobre DynamoDB e Fastify.",
      ],
      en: [
        "Multi-tenancy with per-organization isolation and a 6-role RBAC.",
        "n8n-style visual builder for autonomous agents.",
        "AI usage and license dashboards so managers can track cost and adoption.",
        "Infrastructure as code with Terraform over DynamoDB and Fastify.",
      ],
    },
    metrics: [
      { value: "6", label: { pt: "papéis de RBAC", en: "RBAC roles" } },
    ],
    stack: ["React", "Fastify", "DynamoDB", "Terraform", "OpenWebUI", "RAG"],
    flow: {
      pt: ["Tenant", "RBAC de 6 papéis", "Construtor visual", "Agentes + RAG", "Uso & licenças"],
      en: ["Tenant", "6-role RBAC", "Visual builder", "Agents + RAG", "Usage & licenses"],
    },
    url: "https://aihub.cadmus.com.br/",
  },
  {
    slug: "observatorio-sebrae",
    title: "Observatório Sebrae Startups",
    client: "Sebrae",
    year: "2023 → 2025",
    role: "Full Stack Developer",
    accent: "cyan",
    tagline: {
      pt: "Inteligência de mercado sobre 20 mil+ startups brasileiras, em três idiomas.",
      en: "Market intelligence on 20K+ Brazilian startups, in three languages.",
    },
    summary: {
      pt: "Plataforma analítica que transforma a base de startups do Sebrae em mapas, rankings e indicadores comparáveis por cidade e estado. A V1 estreou no Startup Summit 2023 segurando mais de 10 mil acessos simultâneos; a V2, em 2025, passou a processar os dados via BigQuery e ganhou mapas geoespaciais, filtros avançados e internacionalização PT/EN/ES com next-intl.",
      en: "An analytics platform that turns Sebrae's startup database into maps, rankings and indicators comparable by city and state. V1 launched at Startup Summit 2023 handling more than 10K concurrent visitors; V2 (2025) moved the data to BigQuery and added geospatial maps, advanced filters and PT/EN/ES internationalization with next-intl.",
    },
    highlights: {
      pt: [
        "Processamento de 20K+ startups via BigQuery.",
        "Mapas geoespaciais, treemaps e um radar de legislação com tabelas filtráveis.",
        "Nova página de indicadores comparando startups por cidade e estado.",
        "Internacionalização PT/EN/ES com next-intl.",
        "V1 entregue em 3 semanas, do zero ao deploy, e lançada para 10K+ acessos simultâneos.",
      ],
      en: [
        "20K+ startups processed through BigQuery.",
        "Geospatial maps, treemaps and a legislation radar with filterable tables.",
        "New indicators page comparing startups by city and state.",
        "PT/EN/ES internationalization with next-intl.",
        "V1 shipped in 3 weeks from scratch to deploy, launched to 10K+ concurrent visitors.",
      ],
    },
    metrics: [
      { value: "20K+", label: { pt: "startups analisadas", en: "startups analyzed" } },
      { value: "10K+", label: { pt: "acessos simultâneos no lançamento", en: "concurrent visitors at launch" } },
      { value: "3", label: { pt: "idiomas", en: "languages" } },
    ],
    stack: ["Next.js", "TypeScript", "BigQuery", "next-intl", "Tailwind CSS", "shadcn/ui"],
    images: [
      "/images/novo-observatorio-sebrae/home.webp",
      "/images/novo-observatorio-sebrae/indicadores.webp",
      "/images/novo-observatorio-sebrae/estudos.webp",
      "/images/observatorio-sebrae/oportunidades.webp",
      "/images/observatorio-sebrae/legislacao.webp",
    ],
    url: "https://observatorio.sebraestartups.com.br/",
    team: [aguiar],
  },
  {
    slug: "aeb",
    title: { pt: "Agência Espacial Brasileira", en: "Brazilian Space Agency" },
    client: "AEB",
    year: "2024",
    role: "Full Stack Developer",
    accent: "orange",
    archived: true,
    tagline: {
      pt: "Todo o BI corporativo da Agência Espacial Brasileira em uma plataforma.",
      en: "The Brazilian Space Agency's entire corporate BI in one platform.",
    },
    summary: {
      pt: "Duas entregas para a AEB. Uma plataforma interna que centraliza todos os painéis de BI, com login via Azure AD (SSO), dashboards hierárquicos, RBAC granular com permissões de leitura e escrita e trilha de auditoria administrativa. E uma landing page pública para divulgar os painéis abertos, entregue em uma semana.",
      en: "Two deliveries for AEB. An internal platform that centralizes every BI dashboard, with Azure AD single sign-on, hierarchical dashboards, granular read/write RBAC and an administrative audit trail. And a public landing page to showcase the open dashboards, shipped in one week.",
    },
    highlights: {
      pt: [
        "SSO corporativo com Azure AD.",
        "Dashboards organizados em hierarquia, do órgão ao painel.",
        "RBAC granular com permissões de leitura e escrita por cargo.",
        "Trilhas de auditoria administrativa.",
        "Landing page pública entregue em 1 semana.",
      ],
      en: [
        "Corporate SSO with Azure AD.",
        "Dashboards organized in a hierarchy, from department down to panel.",
        "Granular RBAC with read and write permissions per role.",
        "Administrative audit trails.",
        "Public landing page shipped in 1 week.",
      ],
    },
    metrics: [
      { value: "1", label: { pt: "plataforma para todo o BI", en: "platform for all BI" } },
      { value: "SSO", label: { pt: "via Azure AD", en: "via Azure AD" } },
      { value: "1 sem", label: { pt: "para a landing pública", en: "for the public landing" } },
    ],
    stack: ["Next.js", "TypeScript", "React Query", "Azure AD", "Tailwind CSS", "shadcn/ui"],
    images: ["/images/aeb-langing-page/hero.webp", "/images/aeb-langing-page/panels.webp"],
    url: "https://lp-aeb.vercel.app/",
    team: [aguiar],
  },
  {
    slug: "credit-platform",
    title: { pt: "Plataforma de Crédito", en: "Credit Platform" },
    client: "Cadmus",
    year: "2026",
    role: "Full Stack Developer",
    accent: "orange",
    tagline: {
      pt: "Concessão de crédito de ponta a ponta com QiTech, Wellhub e validação facial.",
      en: "End-to-end credit approval with QiTech, Wellhub and facial verification.",
    },
    summary: {
      pt: "Fluxo completo de crédito — cadastro, análise, parceiros, sessões e controle de status — integrado diretamente a QiTech e Wellhub. Inclui validação de identidade com reconhecimento facial e leitura de documentos, e serviços Backend for Frontend em Rust orquestrando as APIs.",
      en: "A complete credit flow — signup, credit analysis, partners, sessions and status control — integrated directly with QiTech and Wellhub. It includes identity verification with facial recognition and document reading, plus Rust Backend-for-Frontend services orchestrating the APIs.",
    },
    highlights: {
      pt: [
        "Integrações diretas com QiTech e Wellhub.",
        "Reconhecimento facial e leitura de documentos no processo de aprovação.",
        "Serviços Backend for Frontend em Rust para orquestrar APIs.",
        "Cobertura com testes automatizados em Jest.",
      ],
      en: [
        "Direct integrations with QiTech and Wellhub.",
        "Facial recognition and document reading in the approval process.",
        "Rust Backend-for-Frontend services orchestrating APIs.",
        "Covered with automated Jest tests.",
      ],
    },
    stack: ["React", "Next.js", "NestJS", "Rust", "PostgreSQL", "TypeScript", "Jest"],
    flow: {
      pt: ["Cadastro", "Validação facial", "Leitura de documentos", "Análise de crédito", "QiTech", "Aprovação"],
      en: ["Signup", "Facial check", "Document reading", "Credit analysis", "QiTech", "Approval"],
    },
  },
  {
    slug: "saas-multi-tenant",
    title: { pt: "SaaS multi-tenant & provisionamento", en: "Multi-tenant SaaS & provisioning" },
    client: "TDBUSINESS",
    year: "2022 → 2025",
    role: "Full Stack Developer",
    accent: "lime",
    tagline: {
      pt: "De 4 horas para 3 minutos: um ambiente SaaS novo com um clique.",
      en: "From 4 hours to 3 minutes: a new SaaS environment in one click.",
    },
    summary: {
      pt: "Na TDBUSINESS, construí a base das plataformas SaaS da empresa: CRM multi-tenant para 200+ usuários, com isolamento de dados por tenant, 5 níveis de permissão, soft delete e audit log. Depois automatizei o provisionamento de cada cliente novo — repositório no GitHub, banco Neon PostgreSQL e deploy na Vercel, tudo orquestrado por Server Actions do Next.js.",
      en: "At TDBUSINESS I built the foundation of the company's SaaS platforms: a multi-tenant CRM for 200+ users with per-tenant data isolation, 5 permission levels, soft deletes and audit logging. Then I automated provisioning for every new client — GitHub repository, Neon PostgreSQL database and Vercel deploy, all orchestrated by Next.js Server Actions.",
    },
    highlights: {
      pt: [
        "Setup de ambiente de 4 horas para 3 minutos com GitHub API, Neon e Vercel API.",
        "Arquitetura multi-tenant servindo 3+ organizações sem nenhum vazamento entre tenants.",
        "Autenticação própria com 5 níveis de permissão, soft delete e audit log completo.",
        "Integrações com OpenAI, Power BI, WhatsApp Business e Telegram.",
        "Dashboards de 3,2s para 1,2s com tuning de PostgreSQL e cache Redis.",
      ],
      en: [
        "Environment setup from 4 hours to 3 minutes with the GitHub API, Neon and the Vercel API.",
        "Multi-tenant architecture serving 3+ organizations with zero cross-tenant data leaks.",
        "Custom auth with 5 permission levels, soft deletes and full audit logging.",
        "Integrations with OpenAI, Power BI, WhatsApp Business and Telegram.",
        "Dashboards from 3.2s to 1.2s through PostgreSQL tuning and Redis caching.",
      ],
    },
    metrics: [
      { value: "4h → 3min", label: { pt: "por ambiente", en: "per environment" } },
      { value: "200+", label: { pt: "usuários", en: "users" } },
      { value: "0", label: { pt: "vazamentos entre tenants", en: "cross-tenant leaks" } },
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Redis", "GitHub API", "Neon", "Vercel"],
    flow: {
      pt: ["Cliente novo", "GitHub API", "Neon PostgreSQL", "Vercel API", "Ambiente no ar"],
      en: ["New client", "GitHub API", "Neon PostgreSQL", "Vercel API", "Environment live"],
    },
  },
  {
    slug: "fiscalok",
    title: "fiscalOK",
    client: { pt: "Produto próprio", en: "Own product" },
    year: "2026",
    role: "Full Stack Developer",
    accent: "yellow",
    tagline: {
      pt: "SaaS para negócios de alimentação passarem na fiscalização sanitária.",
      en: "A SaaS that helps food businesses pass health inspections.",
    },
    summary: {
      pt: "Checklists sanitários com modelos, cronogramas, cadastro de equipamentos, formulários de temperatura, evidências com assinatura e relatórios, com cobrança recorrente via Stripe liberando o workspace.",
      en: "Sanitary checklists with templates, schedules, equipment records, temperature forms, signed evidence and reports, with Stripe subscriptions unlocking the workspace.",
    },
    highlights: {
      pt: [
        "Domínio de checklists sanitários modelado do zero a partir de uma especificação técnica.",
        "Assinaturas Stripe com bloqueio do workspace por status de pagamento.",
        "Monorepo Turborepo com Next.js, Hono e oRPC, e logging centralizado.",
      ],
      en: [
        "Sanitary checklist domain modeled from scratch from a technical spec.",
        "Stripe subscriptions gating the workspace by payment status.",
        "Turborepo monorepo with Next.js, Hono and oRPC, plus centralized logging.",
      ],
    },
    stack: ["Next.js", "Hono", "oRPC", "Drizzle", "PostgreSQL", "Better Auth", "Stripe", "Turborepo"],
    flow: {
      pt: ["Modelo de checklist", "Cronograma", "Execução + evidências", "Assinatura", "Relatório"],
      en: ["Checklist template", "Schedule", "Run + evidence", "Signature", "Report"],
    },
  },
  {
    slug: "aeterna-rpg",
    title: "Aeterna RPG",
    client: { pt: "Projeto pessoal", en: "Personal project" },
    year: "2026",
    role: "Game dev",
    accent: "pink",
    tagline: {
      pt: "RPG de ação em pixel art no Unity 6, com regras inspiradas em D&D 5e.",
      en: "A pixel-art action RPG in Unity 6 with rules inspired by D&D 5e.",
    },
    summary: {
      pt: "Protótipo de RPG de ação em pixel art (Unity 6, URP 2D) com combate baseado no SRD 5.2 de D&D 5e, multiclasse, árvores de talentos, crafting, estações do ano e ciclo dia/noite — tudo montado por código ao dar Play.",
      en: "A pixel-art action RPG prototype (Unity 6, URP 2D) with combat based on the D&D 5e SRD 5.2, multiclassing, talent trees, crafting, seasons and a day/night cycle — all built from code when you hit Play.",
    },
    highlights: {
      pt: ["Regras de combate a partir do SRD 5.2 de D&D 5e.", "Multiclasse, árvores de talentos e crafting.", "Estações do ano e ciclo dia/noite."],
      en: ["Combat rules derived from the D&D 5e SRD 5.2.", "Multiclassing, talent trees and crafting.", "Seasons and a day/night cycle."],
    },
    stack: ["Unity 6", "C#", "URP 2D", "Git LFS"],
    flow: {
      pt: ["Atributos (SRD 5.2)", "Classes + multiclasse", "Talentos", "Crafting", "Estações e dia/noite"],
      en: ["Abilities (SRD 5.2)", "Classes + multiclass", "Talents", "Crafting", "Seasons & day/night"],
    },
    team: [{ name: "Bryan Fardin" }],
  },
  {
    slug: "vitrine-sebrae",
    archived: true,
    title: "Vitrine Sebrae Startups",
    client: "Sebrae",
    year: "2024 → 2025",
    role: "Front-end Developer",
    accent: "yellow",
    tagline: {
      pt: "Vitrine de startups e MPEs que roda ao vivo nos eventos do Sebrae.",
      en: "A live showcase of startups and small businesses for Sebrae events.",
    },
    summary: {
      pt: "Catálogo interativo de startups curadas pelo Sebrae, feito para ser explorado em telões e celulares durante eventos. Fui o único dev front-end, entreguei antes do prazo e propus — e implementei — um log de acessos por card com Supabase, que mostrou quais empresas mais atraíram o público nos três dias do Startup Summit 2024. Em 2025 ganhou a versão MPE e segue sendo usada em eventos.",
      en: "An interactive catalog of Sebrae-curated startups, built to be explored on big screens and phones during events. I was the only front-end developer, shipped ahead of schedule, and proposed — and built — per-card access logging with Supabase, showing which companies drew the most attention across the three days of Startup Summit 2024. In 2025 it gained a small-business (MPE) edition and is still used at events.",
    },
    highlights: {
      pt: [
        "Único dev front-end, entrega antes do prazo de 1 mês.",
        "Analytics por card com Supabase — ideia minha, adotada pelo cliente.",
        "1K+ acessos simultâneos no Startup Summit 2024.",
        "Versão MPE lançada em 2025.",
      ],
      en: [
        "Sole front-end developer, delivered ahead of the 1-month deadline.",
        "Per-card analytics with Supabase — my idea, adopted by the client.",
        "1K+ concurrent visitors at Startup Summit 2024.",
        "Small-business (MPE) edition launched in 2025.",
      ],
    },
    metrics: [
      { value: "1K+", label: { pt: "acessos simultâneos", en: "concurrent visitors" } },
      { value: "3 dias", label: { pt: "de evento medidos", en: "of event tracked" } },
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "shadcn/ui"],
    images: ["/images/novo-vitrine-sebrae/home.webp", "/images/vitrine-sebrae/home.webp"],
    url: "https://vitrine.sebraestartups.com.br/",
  },
  {
    slug: "plataforma-core",
    archived: true,
    title: "Plataforma CORE",
    client: "CORE-SC",
    year: "2024",
    role: "Full Stack Developer",
    accent: "violet",
    tagline: {
      pt: "Portal de dados com painéis públicos e privados, autenticação e números ao vivo.",
      en: "A data portal with public and private dashboards, auth and live numbers.",
    },
    summary: {
      pt: "Portal de dados para o CORE-SC com autenticação, painéis públicos e privados vindos da API interna e números alimentados direto de Google Sheets. Entregue em 4 semanas, com nuvem de palavras animada, paginação inteligente de painéis e um modo de visualização imersivo.",
      en: "A data portal for CORE-SC with authentication, public and private dashboards served by the internal API, and numbers fed straight from Google Sheets. Shipped in 4 weeks with an animated word cloud, smart dashboard pagination and an immersive viewing mode.",
    },
    highlights: {
      pt: [
        "Autenticação e separação entre painéis públicos e privados.",
        "Indicadores alimentados por Google Sheets, sem deploy para atualizar.",
        "Visualizador de painéis imersivo e paginação automática.",
        "Do zero à entrega em 4 semanas.",
      ],
      en: [
        "Authentication and split between public and private dashboards.",
        "Indicators fed by Google Sheets — no deploy needed to update.",
        "Immersive dashboard viewer and automatic pagination.",
        "From zero to delivery in 4 weeks.",
      ],
    },
    stack: ["Next.js", "TypeScript", "React Query", "Google Sheets API", "Tailwind CSS"],
    images: [
      "/images/plataforma-core/hero.webp",
      "/images/plataforma-core/numbers.webp",
      "/images/plataforma-core/panels.webp",
      "/images/plataforma-core/panel.webp",
    ],
    url: "https://dev-plataforma-core.vercel.app/",
    team: [aguiar],
  },
  {
    slug: "sindipi",
    archived: true,
    title: "Plataforma Sindipi",
    client: "Sindipi",
    year: "2023 → 2024",
    role: "Full Stack Developer",
    accent: "cyan",
    tagline: {
      pt: "Legislação, convenções, convênios e diário do Sindipi em um lugar só.",
      en: "Sindipi's legislation, agreements, partnerships and journal in one place.",
    },
    summary: {
      pt: "Unifiquei os sistemas do Sindipi em uma plataforma consumindo a API do time de dados — legislação, convenções coletivas, convênios e diário em um só lugar, entregue em 3 semanas. Em 2024 virou também o Observatório Sindipi, um recorte enxuto só com os painéis públicos mais relevantes.",
      en: "I unified Sindipi's systems into one platform on top of the data team's API — legislation, collective agreements, partnerships and journal in a single place, shipped in 3 weeks. In 2024 it also spawned the Sindipi Observatory, a lean cut with only the most relevant public dashboards.",
    },
    highlights: {
      pt: [
        "Várias ferramentas legadas unificadas em uma navegação só.",
        "Integração com a API do time de dados.",
        "Entregue em 3 semanas.",
        "Spin-off: Observatório Sindipi com painéis públicos.",
      ],
      en: [
        "Several legacy tools unified under one navigation.",
        "Integration with the data team's API.",
        "Shipped in 3 weeks.",
        "Spin-off: Sindipi Observatory with public dashboards.",
      ],
    },
    stack: ["Next.js", "TypeScript", "React Query", "Tailwind CSS", "shadcn/ui"],
    images: [
      "/images/plataforma-sindipi/home.webp",
      "/images/plataforma-sindipi/legislacao.webp",
      "/images/plataforma-sindipi/convencoes.webp",
      "/images/observatorio-sindipi/home.webp",
      "/images/observatorio-sindipi/panel.webp",
    ],
    url: "https://plataforma-sindipi.vercel.app/",
    team: [aguiar],
  },
  {
    slug: "planejamento-sebrae",
    archived: true,
    title: "Planejamento Sebrae SC",
    client: "Sebrae SC",
    year: "2023",
    role: "Front-end Developer",
    accent: "pink",
    tagline: {
      pt: "Site-apresentação animado do planejamento estratégico do Sebrae SC.",
      en: "An animated web presentation of Sebrae SC's strategic plan.",
    },
    summary: {
      pt: "Experiência web criada para acompanhar a apresentação do planejamento do Sebrae SC e concorrer a prêmios. Hero e cards totalmente animados com Framer Motion, fiéis ao Figma, e uma galeria com scroll customizado — entregue em 3 semanas.",
      en: "A web experience built to accompany Sebrae SC's strategic plan presentation and compete for awards. Fully animated hero and cards with Framer Motion, faithful to the Figma, plus a gallery with custom scrolling — shipped in 3 weeks.",
    },
    highlights: {
      pt: [
        "Animações com Framer Motion fiéis ao protótipo do Figma.",
        "Cards de etapas com estado e transições.",
        "Galeria com scroll customizado.",
        "Entregue em 3 semanas.",
      ],
      en: [
        "Framer Motion animations faithful to the Figma prototype.",
        "Stateful step cards with transitions.",
        "Gallery with custom scrolling.",
        "Shipped in 3 weeks.",
      ],
    },
    stack: ["Next.js", "Framer Motion", "TypeScript", "Tailwind CSS"],
    images: [
      "/images/sebrae-planejamento/hero.webp",
      "/images/sebrae-planejamento/oportunidades.webp",
      "/images/sebrae-planejamento/economia.webp",
      "/images/sebrae-planejamento/galeria.webp",
      "/images/sebrae-planejamento/etapas.webp",
    ],
    url: "https://planejamento.sebrae-sc.com.br/",
    team: [aguiar],
  },
  {
    slug: "observatorio-cti",
    archived: true,
    title: "Observatório CTI",
    client: "Fapesc",
    year: "2023",
    role: "Front-end Developer",
    accent: "lime",
    tagline: {
      pt: "Dados públicos de ciência, tecnologia e inovação de SC, organizados por tema.",
      en: "Santa Catarina's public science, tech and innovation data, organized by theme.",
    },
    summary: {
      pt: "Portal da Fapesc que organiza painéis Power BI de ciência, tecnologia e inovação por tema, tornando dados públicos navegáveis para gestores, pesquisadores e imprensa.",
      en: "A Fapesc portal that organizes Power BI dashboards on science, technology and innovation by theme, making public data browsable for managers, researchers and press.",
    },
    highlights: {
      pt: ["Navegação por tema e por painel.", "Integração com Power BI embarcado."],
      en: ["Navigation by theme and by dashboard.", "Embedded Power BI integration."],
    },
    stack: ["Next.js", "TypeScript", "Power BI", "Tailwind CSS", "shadcn/ui"],
    images: ["/images/plataforma-linda/home.webp", "/images/plataforma-linda/educacao.webp"],
    url: "https://observatoriocti.com.br/",
  },
  {
    slug: "td-business",
    archived: true,
    title: "TD Business",
    client: "TDBUSINESS",
    year: "2023",
    role: "Front-end Developer",
    accent: "orange",
    tagline: {
      pt: "Site institucional com diagnóstico de maturidade empresarial.",
      en: "Company website with a business maturity assessment.",
    },
    summary: {
      pt: "Site da TD com portfólio de cases, conteúdo e um formulário de diagnóstico que calcula o grau de maturidade da empresa a partir das respostas. Do protótipo no Figma ao deploy em um mês.",
      en: "TD's website with a case portfolio, content hub and an assessment form that scores a company's business maturity from its answers. From Figma prototype to deploy in one month.",
    },
    highlights: {
      pt: ["Diagnóstico de maturidade calculado a partir das respostas.", "Do Figma ao deploy em 1 mês."],
      en: ["Maturity assessment scored from the answers.", "From Figma to deploy in 1 month."],
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    images: [
      "/images/td-business/home.webp",
      "/images/td-business/content.webp",
      "/images/td-business/oca.webp",
      "/images/td-business/eleven.webp",
    ],
    url: "https://www.tdbusiness.com.br/",
    team: [aguiar],
  },
  {
    slug: "saas-admin-client",
    archived: true,
    title: "SaaS Admin / Client",
    client: "Navint",
    year: "2023",
    role: "Full Stack Developer",
    accent: "yellow",
    tagline: {
      pt: "Duas apps irmãs: um admin que configura tudo e um portal que mostra só o que cada perfil pode ver.",
      en: "Twin apps: an admin that configures everything and a portal that shows each profile only what it may see.",
    },
    summary: {
      pt: "Um admin onde gestores criam usuários, painéis e temas e definem acessos, e um portal cliente que exibe exatamente o que cada perfil pode ver. Regras de negócio e fluxo de dados desenhados antes da primeira linha de código; front na Vercel, backend e arquivos na AWS.",
      en: "An admin where managers create users, dashboards and themes and define access, and a client portal that shows each profile exactly what it may see. Business rules and data flow were designed before the first line of code; front end on Vercel, backend and files on AWS.",
    },
    highlights: {
      pt: [
        "Modelagem das regras de acesso antes do desenvolvimento.",
        "Gestão de usuários, painéis e temas pelo admin.",
        "Backend e armazenamento na AWS.",
      ],
      en: ["Access rules modeled before development.", "User, dashboard and theme management in the admin.", "Backend and storage on AWS."],
    },
    stack: ["Next.js", "TypeScript", "React Query", "AWS", "Tailwind CSS"],
    flow: {
      pt: ["Admin", "Usuários & acessos", "Painéis & temas", "Portal cliente"],
      en: ["Admin", "Users & access", "Dashboards & themes", "Client portal"],
    },
    url: "https://www.navint.com.br/",
    team: [aguiar],
  },
  {
    slug: "assessment-pmf",
    archived: true,
    title: "Assessment PMF",
    client: { pt: "Prefeitura de Florianópolis", en: "Florianópolis City Hall" },
    year: "2025",
    role: { pt: "Desafio técnico", en: "Technical assessment" },
    accent: "cyan",
    tagline: {
      pt: "Desafio técnico para a Prefeitura de Florianópolis, do protótipo ao deploy.",
      en: "Technical assessment for Florianópolis City Hall, from prototype to deploy.",
    },
    summary: {
      pt: "Aplicação completa construída como assessment técnico no processo seletivo da Prefeitura Municipal de Florianópolis: App Router com Server Components, validação com Zod, estados complexos com React Query e atenção a acessibilidade e performance.",
      en: "A complete application built as the technical assessment for Florianópolis City Hall's hiring process: App Router with Server Components, Zod validation, complex state with React Query, and attention to accessibility and performance.",
    },
    highlights: {
      pt: ["Server Components no App Router.", "Validação de ponta a ponta com Zod.", "Acessibilidade e performance como requisito."],
      en: ["Server Components on the App Router.", "End-to-end validation with Zod.", "Accessibility and performance as requirements."],
    },
    stack: ["Next.js", "TypeScript", "React Query", "Zod", "Tailwind CSS", "shadcn/ui"],
    images: ["/images/assessment-pmf/1.webp", "/images/assessment-pmf/2.webp"],
    url: "https://assessment-pmf.vercel.app/",
  },
  {
    slug: "2xl",
    archived: true,
    title: "2XL",
    client: "Freelance",
    year: "2023",
    role: "Front-end Developer",
    accent: "violet",
    tagline: {
      pt: "Landing page para captar projetos freelance — do zero ao ar em 3 semanas.",
      en: "A landing page to land freelance projects — from zero to live in 3 weeks.",
    },
    summary: {
      pt: "Site feito em dupla para captar projetos freelance: serviços, processo de criação e planos com formulário de orçamento. Construído direto no código, sem Figma, em 3 semanas.",
      en: "A site built as a duo to land freelance work: services, design process and plans with a quote form. Built straight in code, no Figma, in 3 weeks.",
    },
    highlights: {
      pt: ["Do zero ao ar em 3 semanas.", "Fluxo de orçamento guiado por formulário."],
      en: ["From zero to live in 3 weeks.", "Form-driven quote flow."],
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    images: ["/images/2XL/hero.webp", "/images/2XL/quality.webp", "/images/2XL/how.webp", "/images/2XL/plans.webp"],
    url: "https://2x-l.com/",
    team: [aguiar],
  },
];
