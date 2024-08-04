import React, { useState } from 'react';
import api from '../../services/api';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registre os componentes necessários para Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoRelatorio = () => {
  const [dadosRelatorio, setDadosRelatorio] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });
  const [totalVideos, setTotalVideos] = useState(0);

  const fetchRelatorio1Data = () => {
    setLoading(true);
    api.get('/mais-videos-enviados')
      .then((response) => {
        setDadosRelatorio(response.data);
        updateChartData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar dados para Relatorio:', err);
        setLoading(false);
      });
  };

  const updateChartData = (dadosRelatorio) => {
    const labels = dadosRelatorio.map((item) => item.tratamento_nome);
    const data = dadosRelatorio.map((item) => parseInt(item.qtd_videos));

    // Calcular o total de vídeos
    const total = data.reduce((acc, current) => acc + current, 0);
    setTotalVideos(total);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Quantidade de Vídeos',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    });
  };

  return (
    <div>
      <button onClick={fetchRelatorio1Data} disabled={loading}
      style={{
        backgroundColor: '#4CAF50',
        border: 'none',
        color: 'white',
        padding: '15px 32px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '4px 2px',
        cursor: 'pointer'
      }}
      >
        {loading ? 'Carregando...' : 'Total de Videos Enviados por Usuário'}
      </button>
      <div>
        {chartData.labels.length > 0 && (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: `Relatório de videos enviado por USUÁRIO - TOTAL DE ${totalVideos} VÍDEOS`,
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default GraficoRelatorio;
