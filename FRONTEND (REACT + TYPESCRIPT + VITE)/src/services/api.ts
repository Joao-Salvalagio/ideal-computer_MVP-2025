import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // ✅ SEM /api (seu backend não usa)
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ INTERCEPTOR CORRIGIDO: Só adiciona token se NÃO for rota de autenticação
api.interceptors.request.use(
  (config) => {
    // ✅ VERIFICAR SE É ROTA DE LOGIN/REGISTER
    const isAuthRoute = config.url?.includes('/auth/login') || config.url?.includes('/auth/register');
    
    // ✅ SÓ ADICIONA TOKEN SE NÃO FOR ROTA DE AUTENTICAÇÃO
    if (!isAuthRoute) {
      const token = localStorage.getItem('token'); // ✅ 'token' (não 'auth_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
