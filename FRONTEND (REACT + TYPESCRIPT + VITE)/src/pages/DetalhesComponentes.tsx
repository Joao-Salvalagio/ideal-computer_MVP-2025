import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecommendation } from '../contexts/RecommendationContext';
import { useAuth } from '../contexts/AuthContext';
import { buildService } from '../services/buildService';
import styles from './DetalhesComponentes.module.css';

const DetalhesComponentes: React.FC = () => {
  const navigate = useNavigate();
  const { recommendation, questionnaireData } = useRecommendation();
  const { isLoggedIn, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Redireciona se não houver recomendação
  React.useEffect(() => {
    if (!recommendation) {
      console.warn('⚠️ Nenhuma recomendação encontrada. Redirecionando...');
      navigate('/questionario');
    }
  }, [recommendation, navigate]);

  if (!recommendation || !questionnaireData) {
    return (
      <div className={styles.container}>
        <p>Carregando...</p>
      </div>
    );
  }

  // Calcula preço total
  const totalPrice =
    (recommendation.cpu?.preco || 0) +
    (recommendation.placaMae?.preco || 0) +
    (recommendation.gpu?.preco || 0) +
    (recommendation.memoriaRam?.preco || 0) +
    (recommendation.armazenamento?.preco || 0) +
    (recommendation.fonte?.preco || 0) +
    (recommendation.gabinete?.preco || 0) +
    (recommendation.refrigeracao?.preco || 0);

  // Nome da build
  const buildNames: { [key: string]: string } = {
    Jogos: 'Gaming',
    Trabalho: 'Trabalho',
    Estudos: 'Estudos',
  };

  const budgetNames: { [key: string]: string } = {
    econômico: 'Econômica',
    intermediário: 'Intermediária',
    alto: 'Alta Performance',
    extremo: 'Extrema',
  };

  const buildName = `Build ${buildNames[questionnaireData.usage] || questionnaireData.usage} ${budgetNames[questionnaireData.budget] || questionnaireData.budget}`;

  // ✅ Função para salvar build (ajustada ao backend)
  const handleSaveBuild = async () => {
    if (!recommendation.cpu || !recommendation.placaMae || !recommendation.memoriaRam || 
        !recommendation.armazenamento || !recommendation.fonte || !recommendation.gabinete) {
      alert('Erro: Componentes obrigatórios estão faltando.');
      return;
    }

    setLoading(true);
    setSaveSuccess(false);

    try {
      // ✅ Dados no formato do backend (snake_case)
      await buildService.saveBuild({
        nome_build: buildName,
        id_cpu: recommendation.cpu.id,
        id_placamae: recommendation.placaMae.id,
        id_gpu: recommendation.gpu?.id || null,
        id_ram: recommendation.memoriaRam.id,
        id_armazenamento: recommendation.armazenamento.id,
        id_fonte: recommendation.fonte.id,
        id_gabinete: recommendation.gabinete.id,
        id_refrigeracao: recommendation.refrigeracao?.id || null,
        uso_principal: questionnaireData.usage,
        detalhe: questionnaireData.detail,
        orcamento: questionnaireData.budget,
      });

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Erro ao salvar build:', error);
      alert('Erro ao salvar build. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Função para exportar JSON
  const handleExportJSON = () => {
    const buildData = {
      nome: buildName,
      finalidade: questionnaireData.usage,
      orcamento: questionnaireData.budget,
      componentes: {
        cpu: recommendation.cpu,
        placaMae: recommendation.placaMae,
        gpu: recommendation.gpu,
        memoriaRam: recommendation.memoriaRam,
        armazenamento: recommendation.armazenamento,
        fonte: recommendation.fonte,
        gabinete: recommendation.gabinete,
        refrigeracao: recommendation.refrigeracao,
      },
      precoTotal: totalPrice,
      dataCriacao: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(buildData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${buildName.replace(/\s+/g, '_')}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Componentes da tabela
  const componentes = [
    { tipo: 'Processador (CPU)', item: recommendation.cpu },
    { tipo: 'Placa-mãe', item: recommendation.placaMae },
    { tipo: 'Placa de Vídeo (GPU)', item: recommendation.gpu },
    { tipo: 'Memória RAM', item: recommendation.memoriaRam },
    { tipo: 'Armazenamento', item: recommendation.armazenamento },
    { tipo: 'Fonte', item: recommendation.fonte },
    { tipo: 'Gabinete', item: recommendation.gabinete },
    { tipo: 'Refrigeração', item: recommendation.refrigeracao },
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.badge}>🖥️ Detalhes Completos da Build</div>
        <h1>{buildName}</h1>
        <p className={styles.subtitle}>Confira todos os componentes, preços e opções</p>
      </div>

      {/* Alerta de sucesso ao salvar */}
      {saveSuccess && (
        <div className={styles.successAlert}>
          ✅ Build salva com sucesso!
        </div>
      )}

      {/* Card principal */}
      <div className={styles.buildCard}>
        {/* Tabela de componentes */}
        <div className={styles.tableContainer}>
          <table className={styles.componentsTable}>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Nome</th>
                <th>Marca</th>
                <th>Especificações</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              {componentes.map((comp, index) => {
                const item = comp.item;
                if (!item) {
                  return (
                    <tr key={index} className={styles.emptyRow}>
                      <td>{comp.tipo}</td>
                      <td colSpan={4} className={styles.notApplicable}>
                        Não se aplica
                      </td>
                    </tr>
                  );
                }

                // Especificações dinâmicas
                let specs = '';
                if ('soquete' in item) specs += `Soquete: ${item.soquete}`;
                if ('memoriaVram' in item) specs += `${item.memoriaVram}GB VRAM`;
                if ('capacidadeGb' in item && 'tipo' in item) specs += `${item.capacidadeGb}GB ${item.tipo}`;
                if ('frequenciaMhz' in item) specs += ` @ ${item.frequenciaMhz}MHz`;
                if ('potenciaWatts' in item) specs += `${item.potenciaWatts}W`;
                if ('formatosPlacaMaeSuportados' in item) specs += `Suporta: ${item.formatosPlacaMaeSuportados}`;

                return (
                  <tr key={index}>
                    <td className={styles.typeCell}>{comp.tipo}</td>
                    <td className={styles.nameCell}>{item.nome}</td>
                    <td>{item.marca}</td>
                    <td className={styles.specsCell}>{specs || '—'}</td>
                    <td className={styles.priceCell}>
                      R$ {item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className={styles.totalRow}>
                <td colSpan={4} className={styles.totalLabel}>
                  Preço Total
                </td>
                <td className={styles.totalPrice}>
                  R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Seção de ações */}
        <div className={styles.actionsSection}>
          <h3>Salvar e Exportar Build</h3>

          {isLoggedIn ? (
            <div className={styles.loggedInActions}>
              <p className={styles.userInfo}>
                Logado como: <strong>{user?.name}</strong> ({user?.email})
              </p>

              <div className={styles.buttonGrid}>
                <button
                  className={styles.saveButton}
                  onClick={handleSaveBuild}
                  disabled={loading}
                >
                  {loading ? '⏳ Salvando...' : '💾 Salvar Build'}
                </button>

                <button className={styles.exportButton} onClick={handleExportJSON}>
                  📄 Exportar JSON
                </button>

                <button
                  className={styles.secondaryButton}
                  onClick={() => navigate('/questionario')}
                >
                  🔄 Refazer Questionário
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.notLoggedIn}>
              <p className={styles.loginPrompt}>
                🔒 Faça login ou registro para usar as funcionalidades de <strong>Salvar</strong> e <strong>Exportar Build</strong>
              </p>

              <div className={styles.buttonGrid}>
                <button className={styles.loginButton} onClick={() => navigate('/login')}>
                  🔑 Fazer Login
                </button>

                <button className={styles.registerButton} onClick={() => navigate('/register')}>
                  ✍️ Criar Conta
                </button>

                <button
                  className={styles.secondaryButton}
                  onClick={() => navigate('/questionario')}
                >
                  🔄 Refazer Questionário
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalhesComponentes;
