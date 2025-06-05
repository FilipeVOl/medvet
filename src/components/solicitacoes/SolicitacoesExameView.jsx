import React, { useEffect, useState } from 'react';
import { getExamesByAnimalId } from '../../services/solicitacoes';
import BiotechIcon from '@mui/icons-material/Biotech';
import PrintIcon from '@mui/icons-material/Print';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Divider } from '@mui/material';

export default function SolicitacoesExameView({ animalId }) {
  const [exames, setExames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExame, setSelectedExame] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchExames = async () => {
      try {
        const response = await getExamesByAnimalId(animalId);
        if (response && response.length > 0) {
          setExames(response);
        }
      } catch (error) {
        console.error('Erro ao buscar exames:', error);
      } finally {
        setLoading(false);
      }
    };

    if (animalId) {
      fetchExames();
    }
  }, [animalId]);
  const handlePrintExame = async (event, exameId) => {
    // Check if event is a valid event object with stopPropagation method
    if (event && typeof event.stopPropagation === 'function') {
      event.stopPropagation();
    }
    try {
      window.open(`http://localhost:3333/get/exame/${exameId}/pdf`);
    } catch (error) {
      console.error('Erro ao gerar PDF do exame:', error);
    }
  };

  const handleOpenDialog = (exame) => {
    setSelectedExame(exame);
    setDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // Função auxiliar para renderizar campos booleanos de exame
  const renderExameFields = (exame, categoria) => {
    const categorias = {
      hematologia: [
        { campo: 'hemograma', label: 'Hemograma' },
        { campo: 'pesquisaHemoparasitas', label: 'Pesquisa de Hemoparasitas' },
      ],
      bioquimicos: [
        { campo: 'altTGP', label: 'ALT/TGP' },
        { campo: 'astTGO', label: 'AST/TGO' },
        { campo: 'fosfataseAlcalina', label: 'Fosfatase Alcalina' },
        { campo: 'ureia', label: 'Ureia' },
        { campo: 'creatinina', label: 'Creatinina' },
      ],
      citologia: [
        { campo: 'citologiaMicroscopiaDireta', label: 'Microscopia Direta' },
        { campo: 'citologiaMicroscopiaCorada', label: 'Microscopia Corada' },
        { campo: 'pesquisaEctoparasitas', label: 'Pesquisa de Ectoparasitas' },
      ],
      urina: [
        { campo: 'urinaliseEAS', label: 'EAS' },
        { campo: 'urinaliseSedimento', label: 'Sedimento' },
      ],
      coprológico: [
        { campo: 'coproWilishowsky', label: 'Método Wilishowsky' },
        { campo: 'coproHoffmann', label: 'Método Hoffmann' },
        { campo: 'coproMcMaster', label: 'Método McMaster' },
      ],
      radiografia: [
        { campo: 'radiografiaSimples', label: 'Radiografia Simples' },
        { campo: 'radiografiaContrastada', label: 'Radiografia Contrastada' },
      ],
      ultrassom: [
        { campo: 'ultrassonografia', label: 'Ultrassonografia' },
        { campo: 'ultrassonografiaDoppler', label: 'Ultrassonografia com Doppler' },
      ],
      outros: [
        { campo: 'culturaBacteriana', label: 'Cultura Bacteriana' },
        { campo: 'culturaFungica', label: 'Cultura Fúngica' },
        { campo: 'testeAntimicrobianos', label: 'Teste de Antimicrobianos' },
      ],
    };

    if (!categorias[categoria]) return null;

    const camposAtivos = categorias[categoria]
      .filter(({ campo }) => exame[campo])
      .map(({ label }) => label);

    if (camposAtivos.length === 0) return null;

    return (
      <div className="mb-4">
        <h3 className="font-semibold text-gray-800">{categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h3>
        <ul className="ml-4">
          {camposAtivos.map((label, index) => (
            <li key={index} className="text-gray-700">• {label}</li>
          ))}
        </ul>
      </div>
    );
  };

  const renderCamposTexto = (exame) => {
    const campos = [
      { campo: 'metodoHemoparasita', label: 'Método Hemoparasita' },
      { campo: 'outroHemotologia', label: 'Outros (Hematologia)' },
      { campo: 'outrosExamesBioquimicos', label: 'Outros Exames Bioquímicos' },
      { campo: 'amostraCitologiaGeral', label: 'Amostra Citologia' },
      { campo: 'outroCitologiaGeral', label: 'Outros (Citologia)' },
      { campo: 'metodoDeColeta', label: 'Método de Coleta' },
      { campo: 'urinaliseOutroMetodo', label: 'Outros Métodos (Urinálise)' },
      { campo: 'coproMetodo', label: 'Método Copro' },
      { campo: 'coproOutro', label: 'Outros (Copro)' },
      { campo: 'outroRadiografia', label: 'Outros (Radiografia)' },
      { campo: 'regiaoRadiografia', label: 'Região' },
      { campo: 'posicao1', label: 'Posição 1' },
      { campo: 'posicao2', label: 'Posição 2' },
      { campo: 'outroUltrassonografia', label: 'Outros (Ultrassonografia)' },
      { campo: 'outrosExames', label: 'Outros Exames' },
      { campo: 'reason', label: 'Motivo' },
      { campo: 'observations', label: 'Observações' },
    ];

    const camposPreenchidos = campos
      .filter(({ campo }) => exame[campo])
      .map(({ campo, label }) => ({ label, valor: exame[campo] }));

    if (camposPreenchidos.length === 0) return null;

    return (
      <div className="mt-4">
        <h3 className="font-semibold text-gray-800">Informações Adicionais</h3>
        <div className="ml-4 grid grid-cols-1 gap-2">
          {camposPreenchidos.map(({ label, valor }, index) => (
            <div key={index} className="flex flex-col">
              <span className="font-medium text-gray-700">{label}:</span>
              <span className="text-gray-600">{valor}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="text-center py-4">Carregando exames...</div>;
  }

  return (
    <div>
      {exames.length === 0 ? (
        <div className="text-center py-4 text-gray-600">
          Nenhuma solicitação de exame encontrada
        </div>
      ) : (
        exames.map((exame) => (
          <div
            key={exame.id}
            className="flex flex-col bg-[#FFFEF9] px-11 py-6 rounded-xl gap-6 mt-4 hover:shadow-xl"
          >
            <div className="font-Montserrat text-2xl text-[#2C2C2C] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <BiotechIcon className="text-[#100F49]" sx={{ fontSize: 32 }} />
                <span>
                  {new Date(exame.dataSolicitacao).toLocaleDateString()}
                </span>
              </div>
              <div className="flex gap-4">
                <PrintIcon
                  onClick={(e) => handlePrintExame(e, exame.id)}
                  className="cursor-pointer text-[#100F49] hover:scale-110 transition-transform"
                  sx={{ fontSize: 28 }}
                />
                <VisibilityIcon
                  onClick={() => handleOpenDialog(exame)}
                  className="cursor-pointer text-[#100F49] hover:scale-110 transition-transform"
                  sx={{ fontSize: 28 }}
                />
              </div>
            </div>
            <div className="font-Montserrat text-lg text-[#595959]">
              <div className="font-semibold">
                Solicitação de exames - {new Date(exame.dataSolicitacao).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Clique no ícone de visualização para detalhes
              </div>
            </div>
          </div>
        ))
      )}

      {/* Dialog para detalhes do exame */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
        aria-labelledby="exame-dialog-title"
      >
        {selectedExame && (
          <>
            <DialogTitle id="exame-dialog-title">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <BiotechIcon className="text-[#100F49]" sx={{ fontSize: 32 }} />
                  <span className="font-semibold">
                    Detalhes da Solicitação de Exame
                  </span>
                </div>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={handleCloseDialog}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </DialogTitle>
            <DialogContent dividers>
              <div className="mb-4">
                <div className="flex flex-col mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-700 font-medium">Data da solicitação:</span>
                      <span className="ml-2">{new Date(selectedExame.dataSolicitacao).toLocaleDateString()}</span>
                    </div>
                   
                  </div>
                </div>
                
                <Divider className="my-4" />
                <h2 className="font-bold text-xl mb-3 text-[#100F49]">Exames Solicitados</h2>
                
                {renderExameFields(selectedExame, 'hematologia')}
                {renderExameFields(selectedExame, 'bioquimicos')}
                {renderExameFields(selectedExame, 'citologia')}
                {renderExameFields(selectedExame, 'urina')}
                {renderExameFields(selectedExame, 'coprológico')}
                {renderExameFields(selectedExame, 'radiografia')}
                {renderExameFields(selectedExame, 'ultrassom')}
                {renderExameFields(selectedExame, 'outros')}
                
                <Divider className="my-4" />
                {renderCamposTexto(selectedExame)}
              </div>
            </DialogContent>
            <DialogActions>
          
              <Button onClick={handleCloseDialog} variant="outlined" color="primary">
                Fechar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
