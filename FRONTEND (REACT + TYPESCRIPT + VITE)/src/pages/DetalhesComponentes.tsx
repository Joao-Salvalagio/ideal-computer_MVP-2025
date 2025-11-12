import React, { useEffect } from 'react';
import styles from './DetalhesComponentes.module.css';
import { useNavigate } from 'react-router-dom';
import { useRecommendation } from '../contexts/RecommendationContext';

const DetalhesComponentes: React.FC = () => {
  const navigate = useNavigate();
  const { recommendation, questionnaireData } = useRecommendation();

  useEffect(() => {
    // Redireciona se não houver recomendação
    if (!recommendation) {
      navigate('/questionario');
    }
  }, [recommendation, navigate]);

  if (!recommendation) {
    return null;
  }

  // Mapeia finalidade para nome da build
  const buildNames: { [key: string]: string } = {
    'gaming': 'Gaming',
    'trabalho': 'Trabalho',
    'estudos': 'Estudos'
  };

  const budgetNames: { [key: string]: string } = {
    '2000-4000': 'Econômica',
    '4000-7000': 'Intermediária',
    '7000-12000': 'Alta Performance',
    '12000+': 'Extrema'
  };

  const buildName = questionnaireData 
    ? `Build ${buildNames[questionnaireData.usage]} ${budgetNames[questionnaireData.budget]}`
    : 'Sua Build Personalizada';

  // Monta array de componentes
  const componentes = [
    { tipo: 'Processador', nome: `${recommendation.cpu.marca} ${recommendation.cpu.nome}`, preco: recommendation.cpu.preco },
    { tipo: 'Placa-mãe', nome: `${recommendation.placaMae.marca} ${recommendation.placaMae.nome}`, preco: recommendation.placaMae.preco },
    ...(recommendation.gpu ? [{ tipo: 'Placa de Vídeo', nome: `${recommendation.gpu.marca} ${recommendation.gpu.nome}`, preco: recommendation.gpu.preco }] : []),
    { tipo: 'Memória RAM', nome: `${recommendation.memoriaRam.marca} ${recommendation.memoriaRam.nome} ${recommendation.memoriaRam.capacidadeGb}GB`, preco: recommendation.memoriaRam.preco },
    { tipo: 'Armazenamento', nome: `${recommendation.armazenamento.marca} ${recommendation.armazenamento.nome}`, preco: recommendation.armazenamento.preco },
    { tipo: 'Fonte', nome: `${recommendation.fonte.marca} ${recommendation.fonte.nome}`, preco: recommendation.fonte.preco },
    { tipo: 'Gabinete', nome: `${recommendation.gabinete.marca} ${recommendation.gabinete.nome}`, preco: recommendation.gabinete.preco },
    ...(recommendation.refrigeracao ? [{ tipo: 'Refrigeração', nome: `${recommendation.refrigeracao.marca} ${recommendation.refrigeracao.nome}`, preco: recommendation.refrigeracao.preco }] : [])
  ];

  // Calcula total
  const totalPrice = componentes.reduce((sum, comp) => sum + comp.preco, 0);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Componentes e Preços</h2>
      <p className={styles.subtitle}>Detalhamento completo da sua build recomendada</p>

      <div className={styles.buildHeader}>
        <div className={styles.buildInfo}>
          <span className={styles.icon}>🛒</span>
          <div>
            <h3>{buildName}</h3>
            <p>Total: <strong>R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong></p>
          </div>
        </div>
      </div>

      <div className={styles.tableCard}>
        <h4 className={styles.tableTitle}>Lista de Componentes</h4>
        <p className={styles.tableSubtitle}>Todos os componentes necessários para sua build</p>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Componente</th>
                <th>Preço</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {componentes.map((comp, index) => (
                <tr key={index}>
                  <td>
                    <span className={styles.badge}>{comp.tipo}</span>
                  </td>
                  <td className={styles.componentName}>{comp.nome}</td>
                  <td className={styles.preco}>R$ {comp.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td>
                    <span className={styles.noLink}>N/A</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Total da Build:</span>
          <span className={styles.totalValue}>R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.backButton} onClick={() => navigate('/recomendacao')}>
          ← Voltar
        </button>
      </div>

      <div className={styles.footer}>
        <p>Faça login para salvar esta build e acessá-la posteriormente</p>
        <button className={styles.loginButton} onClick={() => navigate('/login')}>
          Fazer login
        </button>
      </div>
    </div>
  );
};

export default DetalhesComponentes;
