# 🖥️ Ideal Computer - Frontend

Sistema de montagem e recomendação de PCs personalizado.

## 🚀 Tecnologias

- React 18 + TypeScript
- Vite
- React Router DOM v6
- Axios
- CSS Modules

## 📦 Instalação

\\\ash
git clone https://github.com/ivokkkkk/FRONT_END_IDEAL_COMPUTER.git
cd FRONT_END_IDEAL_COMPUTER
npm install
\\\

## ⚙️ Executar

\\\ash
npm run dev
\\\

Acesse: http://localhost:5173

## 🔐 Usuário padrão

- **Email:** admin@gmail.com
- **Senha:** admin123

## 📂 Estrutura

\\\
src/
├── components/      # Componentes reutilizáveis
├── contexts/        # Contexts (Auth, Recommendation, Theme)
├── pages/           # Páginas principais
├── services/        # Integração com API
└── styles/          # CSS global
\\\

## 🎯 Funcionalidades

- ✅ Autenticação JWT
- ✅ Gerenciamento de usuários (admin)
- ✅ Questionário de montagem
- ✅ Sistema de recomendação
- ✅ Proteção de rotas
- ✅ Dark/Light mode

## 🔗 Backend

Requer backend rodando em: \http://localhost:8080\

Endpoints necessários:
- POST /api/auth/login
- POST /api/auth/register
- GET /api/usuarios
- POST /api/recommendations/generate
