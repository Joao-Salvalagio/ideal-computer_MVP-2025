import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import styles from './Questionario.module.css';

const Questionario = () => {
  const [selectedUso, setSelectedUso] = useState('');
  const [selectedOrcamento, setSelectedOrcamento] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!selectedUso || !selectedOrcamento) {
      alert('Por favor, selecione o uso e o orçamento');
      return;
    }

    setIsLoading(true);

    try {
      // Mapeamento dos valores para o formato esperado pelo backend
      const usageMap: Record<string, string> = {
        gaming: 'Jogos',
        trabalho: 'Trabalho',
        estudos: 'Estudos'
      };

      const budgetMap: Record<string, string> = {
        economico: 'econômico',
        intermediario: 'intermediário',
        alto: 'alto',
        extremo: 'extremo'
      };

      // Chamada para o backend com os nomes corretos dos campos
      const response = await api.post('/api/recommendations/generate', {
        usage: usageMap[selectedUso] || selectedUso,
        budget: budgetMap[selectedOrcamento] || selectedOrcamento,
        detail: 'Geral'  // Campo obrigatório, pode ser ajustado depois
      });

      console.log('Resposta do backend:', response.data);

      // Redirecionar para página de recomendação
      navigate('/recomendacao', { 
        state: { 
          build: response.data,
          uso: selectedUso,
          orcamento: selectedOrcamento
        } 
      });
    } catch (error: any) {
      console.error('Erro ao gerar recomendação:', error);
      
      if (error.response?.status === 404) {
        alert('Nenhuma peça encontrada para essa combinação. Cadastre peças no admin primeiro.');
      } else if (error.response?.status === 403) {
        alert('Você precisa estar logado para gerar recomendações.');
      } else if (error.response?.data?.message) {
        alert(`Erro: ${error.response.data.message}`);
      } else {
        alert('Erro ao gerar recomendação. Verifique se há peças cadastradas no sistema.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Qual será o uso principal do PC?</h1>
        <p className={styles.subtitle}>Isso nos ajuda a priorizar as peças certas para sua necessidade</p>

        {/* SEÇÃO DE USO */}
        <div className={styles.section}>
          <div className={styles.optionsGrid}>
            <div 
              className={`${styles.optionCard} ${selectedUso === 'gaming' ? styles.selected : ''}`}
              onClick={() => setSelectedUso('gaming')}
            >
              <div className={styles.optionIcon}>🎮</div>
              <h3 className={styles.optionTitle}>Gaming</h3>
              <p className={styles.optionDescription}>Jogos e entretenimento</p>
            </div>

            <div 
              className={`${styles.optionCard} ${selectedUso === 'trabalho' ? styles.selected : ''}`}
              onClick={() => setSelectedUso('trabalho')}
            >
              <div className={styles.optionIcon}>💼</div>
              <h3 className={styles.optionTitle}>Trabalho</h3>
              <p className={styles.optionDescription}>Produtividade e profissional</p>
            </div>

            <div 
              className={`${styles.optionCard} ${selectedUso === 'estudos' ? styles.selected : ''}`}
              onClick={() => setSelectedUso('estudos')}
            >
              <div className={styles.optionIcon}>🎓</div>
              <h3 className={styles.optionTitle}>Estudos</h3>
              <p className={styles.optionDescription}>Acadêmico e aprendizado</p>
            </div>
          </div>
        </div>

        {/* SEÇÃO DE ORÇAMENTO */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Qual é seu orçamento?</h2>
          <p className={styles.sectionSubtitle}>Definiremos as melhores peças dentro da sua faixa de preço</p>

          <div className={styles.optionsGrid}>
            <div 
              className={`${styles.optionCard} ${selectedOrcamento === 'economico' ? styles.selected : ''}`}
              onClick={() => setSelectedOrcamento('economico')}
            >
              <div 
                className={styles.optionIcon} 
                style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)' }}
              >
                <span style={{ fontSize: '2.5rem', color: '#22c55e' }}>$</span>
              </div>
              <h3 className={styles.optionTitle}>Econômico</h3>
              <p className={styles.optionDescription}>R$ 2.000 - 4.000</p>
            </div>

            <div 
              className={`${styles.optionCard} ${selectedOrcamento === 'intermediario' ? styles.selected : ''}`}
              onClick={() => setSelectedOrcamento('intermediario')}
            >
              <div 
                className={styles.optionIcon} 
                style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)' }}
              >
                <span style={{ fontSize: '2.5rem', color: '#3b82f6' }}>$</span>
              </div>
              <h3 className={styles.optionTitle}>Intermediário</h3>
              <p className={styles.optionDescription}>R$ 4.000 - 7.000</p>
            </div>

            <div 
              className={`${styles.optionCard} ${selectedOrcamento === 'alto' ? styles.selected : ''}`}
              onClick={() => setSelectedOrcamento('alto')}
            >
              <div 
                className={styles.optionIcon} 
                style={{ backgroundColor: 'rgba(168, 85, 247, 0.15)' }}
              >
                <span style={{ fontSize: '2.5rem', color: '#a855f7' }}>$</span>
              </div>
              <h3 className={styles.optionTitle}>Alto</h3>
              <p className={styles.optionDescription}>R$ 7.000 - 12.000</p>
            </div>

            <div 
              className={`${styles.optionCard} ${selectedOrcamento === 'extremo' ? styles.selected : ''}`}
              onClick={() => setSelectedOrcamento('extremo')}
            >
              <div 
                className={styles.optionIcon} 
                style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)' }}
              >
                <span style={{ fontSize: '2.5rem', color: '#ef4444' }}>$</span>
              </div>
              <h3 className={styles.optionTitle}>Extremo</h3>
              <p className={styles.optionDescription}>R$ 12.000+</p>
            </div>
          </div>
        </div>

        {/* BOTÃO */}
        <button 
          className={styles.submitButton}
          onClick={handleSubmit}
          disabled={!selectedUso || !selectedOrcamento || isLoading}
        >
          {isLoading ? 'Gerando recomendação...' : 'Gerar recomendação'}
        </button>
      </div>
    </div>
  );
};

export default Questionario;
