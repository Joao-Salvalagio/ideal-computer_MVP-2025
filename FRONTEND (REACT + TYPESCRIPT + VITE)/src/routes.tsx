import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Questionario from './pages/Questionario';
import Recomendacao from './pages/Recomendacao';
import DetalhesComponentes from './pages/DetalhesComponentes';
import Admin from './pages/Admin';
import GerenciarUsuarios from './pages/GerenciarUsuarios';

const AppRoutes = () => (
  <>
    <Navbar />
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/questionario" element={<Questionario />} />
      <Route path="/recomendacao" element={<Recomendacao />} />
      <Route path="/detalhes-componentes" element={<DetalhesComponentes />} />
      
      {/* Rotas Protegidas - Admin */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requireAdmin={true}>
            <Admin />
          </ProtectedRoute>
        } 
      />
      
      {/* Nova Rota - Gerenciamento de Usuários */}
      <Route 
        path="/admin/usuarios" 
        element={
          <ProtectedRoute requireAdmin={true}>
            <GerenciarUsuarios />
          </ProtectedRoute>
        } 
      />
    </Routes>
  </>
);

export default AppRoutes;
