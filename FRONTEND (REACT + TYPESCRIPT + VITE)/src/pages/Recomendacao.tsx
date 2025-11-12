import React, { useEffect } from 'react';
import styles from './Recomendacao.module.css';
import { useNavigate } from 'react-router-dom';
import { useRecommendation } from '../contexts/RecommendationContext';

const Recomendacao: React.FC = () => {
  const navigate = useNavigate();
  const { recommendation, questionnaireData } = useRecommendation();

  useEffect(() => {
    // Redireciona se não houver recomendação
    if (!recommendation) {
      console.warn('⚠️ Nenhuma recomendação encontrada. Redirecionando...');
      navigate('/questionario');
    } else {
      console.log('✅ Recomendação carregada:', recommendation);
      console.log('✅ Dados do questionário:', questionnaireData);
    }
  }, [recommendation, navigate, questionnaireData]);

  // Loading state
  if (!recommendation) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <p>Carregando recomendação...</p>
        </div>
      </div>
    );
  }

  // ✅ CALCULA PREÇO TOTAL COM VERIFICAÇÃO SEGURA
  const totalPrice = 
    (recommendation.cpu?.preco || 0) +
    (recommendation.placaMae?.preco || 0) +
    (recommendation.gpu?.preco || 0) +
    (recommendation.memoriaRam?.preco || 0) +
    (recommendation.armazenamento?.preco || 0) +
    (recommendation.fonte?.preco || 0) +
    (recommendation.gabinete?.preco || 0) +
    (recommendation.refrigeracao?.preco || 0);

  // ✅ CORRIGIDO: Mapeia CORRETAMENTE as finalidades
  const buildNames: { [key: string]: string } = {
    'Jogos': 'Gaming',
    'Trabalho': 'Trabalho',
    'Estudos': 'Estudos'
  };

  // ✅ CORRIGIDO: Mapeia CORRETAMENTE os orçamentos
  const budgetNames: { [key: string]: string } = {
    'econômico': 'Econômica',
    'intermediário': 'Intermediária',
    'alto': 'Alta Performance',
    'extremo': 'Extrema'
  };

  const buildName = questionnaireData 
    ? `Build ${buildNames[questionnaireData.usage] || questionnaireData.usage} ${budgetNames[questionnaireData.budget] || questionnaireData.budget}`
    : 'Sua Build Personalizada';

  // Conta componentes
  const componentCount = 
    5 + // CPU, Placa-mãe, RAM, Armazenamento, Fonte, Gabinete
    (recommendation.gpu ? 1 : 0) +
    (recommendation.refrigeracao ? 1 : 0);

  // ✅ JUSTIFICATIVAS COM VERIFICAÇÃO SEGURA
  const razoes = [
    recommendation.cpu 
      ? `${recommendation.cpu.nome} - Processador ${recommendation.cpu.marca} de alto desempenho`
      : 'Processador não disponível',
    recommendation.gpu 
      ? `${recommendation.gpu.nome} - GPU com ${recommendation.gpu.memoriaVram}GB VRAM`
      : 'Processador com gráficos integrados para tarefas do dia a dia',
    recommendation.memoriaRam
      ? `${recommendation.memoriaRam.capacidadeGb}GB RAM ${recommendation.memoriaRam.tipo} - Memória suficiente para multitasking`
      : 'Memória RAM não disponível',
    recommendation.armazenamento
      ? `${recommendation.armazenamento.nome} - Armazenamento ${recommendation.armazenamento.tipo} para velocidade`
      : 'Armazenamento não disponível',
    recommendation.fonte
      ? `${recommendation.fonte.nome} - Fonte ${recommendation.fonte.potenciaWatts}W com margem de segurança`
      : 'Fonte não disponível'
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.badge}>📈 Recomendação Personalizada</div>
        <h2>Por que essa build?</h2>
        <p className={styles.subtitle}>Entenda as razões por trás de cada escolha</p>
      </div>

      <div className={styles.buildCard}>
        <div className={styles.buildHeader}>
          <h3>{buildName}</h3>
          <div className={styles.preco}>
            R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className={styles.justificativasSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.checkIcon}>✓</span>
            <h4>Justificativas da Recomendação</h4>
          </div>
          <p className={styles.sectionSubtitle}>Cada componente foi escolhido estrategicamente</p>
          
          <div className={styles.razoesList}>
            {razoes.map((razao, index) => (
              <div key={index} className={styles.razaoItem}>
                <span className={styles.checkSmall}>✓</span>
                <span>{razao}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.metricas}>
          <div className={styles.metricaCard}>
            <div className={styles.metricaValue}>{componentCount}</div>
            <div className={styles.metricaLabel}>Componentes</div>
          </div>
          <div className={styles.metricaCard}>
            <div className={`${styles.metricaValue} ${styles.green}`}>100%</div>
            <div className={styles.metricaLabel}>Compatibilidade</div>
          </div>
          <div className={styles.metricaCard}>
            <div className={styles.metricaValue}>⭐⭐⭐⭐⭐</div>
            <div className={styles.metricaLabel}>Performance</div>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.primaryButton} onClick={() => navigate('/detalhes-componentes')}>
            Ver peças e valores →
          </button>
          <button className={styles.secondaryButton} onClick={() => navigate('/questionario')}>
            Refazer questionário
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recomendacao;