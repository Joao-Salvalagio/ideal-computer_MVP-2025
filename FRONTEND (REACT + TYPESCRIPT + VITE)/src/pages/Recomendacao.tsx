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
      navigate('/questionario');
    }
  }, [recommendation, navigate]);

  if (!recommendation) {
    return null;
  }

  // Calcula o preço total
  const totalPrice = 
    recommendation.cpu.preco +
    recommendation.placaMae.preco +
    (recommendation.gpu?.preco || 0) +
    recommendation.memoriaRam.preco +
    recommendation.armazenamento.preco +
    recommendation.fonte.preco +
    recommendation.gabinete.preco +
    (recommendation.refrigeracao?.preco || 0);

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

  // Conta componentes
  const componentCount = 
    5 + // CPU, Placa-mãe, RAM, Armazenamento, Fonte, Gabinete
    (recommendation.gpu ? 1 : 0) +
    (recommendation.refrigeracao ? 1 : 0);

  // Justificativas dinâmicas baseadas nos componentes
  const razoes = [
    `${recommendation.cpu.nome} - Processador ${recommendation.cpu.marca} de alto desempenho`,
    recommendation.gpu 
      ? `${recommendation.gpu.nome} - GPU com ${recommendation.gpu.memoriaVram}GB VRAM`
      : 'Processador com gráficos integrados para tarefas do dia a dia',
    `${recommendation.memoriaRam.capacidadeGb}GB RAM ${recommendation.memoriaRam.tipo} - Memória suficiente para multitasking`,
    `${recommendation.armazenamento.nome} - Armazenamento ${recommendation.armazenamento.tipo} para velocidade`,
    `${recommendation.fonte.nome} - Fonte ${recommendation.fonte.potenciaWatts}W com margem de segurança`
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
          <div className={styles.preco}>R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
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
