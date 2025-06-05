import React, { useEffect, useState } from 'react';
import { getInternacoesAnimalId } from '../../services/solicitacoes';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PrintIcon from '@mui/icons-material/Print';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Divider, Grid } from '@mui/material';

export default function SolicitacoesInternacaoView({ animalId }) {
  const [internacoes, setInternacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInternacao, setSelectedInternacao] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchInternacoes = async () => {
      try {
        const response = await getInternacoesAnimalId(animalId);
        if (response && response.length > 0) {
          setInternacoes(response);
        }
      } catch (error) {
        console.error('Erro ao buscar internações:', error);
      } finally {
        setLoading(false);
      }
    };

    if (animalId) {
      fetchInternacoes();
    }
  }, [animalId]);

  const handlePrintInternacao = async (event, internacaoId) => {
    event.stopPropagation();
    try {
      window.open(`http://localhost:3333/get/termo-internacao/${internacaoId}/pdf`);
    } catch (error) {
      console.error('Erro ao gerar PDF da internação:', error);
    }
  };

  const handleOpenDialog = (internacao) => {
    setSelectedInternacao(internacao);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // Função para formatar a data
  const formatarData = (dataString) => {
    if (!dataString) return 'Data não informada';
    return new Date(dataString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return <div className="text-center py-4">Carregando internações...</div>;
  }

  return (
    <div>
      {internacoes.length === 0 ? (
        <div className="text-center py-4 text-gray-600">
          Nenhuma solicitação de internação encontrada
        </div>
      ) : (
        internacoes.map((internacao) => (
          <div
            key={internacao.id}
            className="flex flex-col bg-[#FFFEF9] px-11 py-6 rounded-xl gap-6 mt-4 hover:shadow-xl cursor-pointer"
            onClick={() => handleOpenDialog(internacao)}
          >            
            <div className="font-Montserrat text-2xl text-[#2C2C2C] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <LocalHospitalIcon className="text-[#100F49]" sx={{ fontSize: 32 }} />
                <span>
                  {formatarData(internacao.dataEntrada || internacao.createdAt)}
                </span>
              </div>
              <div className="flex gap-4">
                <PrintIcon
                  onClick={(e) => handlePrintInternacao(e, internacao.id)}
                  className="cursor-pointer text-[#100F49] hover:scale-110 transition-transform"
                  sx={{ fontSize: 28 }}
                />
                <VisibilityIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenDialog(internacao);
                  }}
                  className="cursor-pointer text-[#100F49] hover:scale-110 transition-transform"
                  sx={{ fontSize: 28 }}
                />
              </div>
            </div>
            <div className="font-Montserrat text-lg text-[#595959]">
              <div>
                <strong>Motivo da internação:</strong> {internacao.motivoInternacao}
              </div>
              <div>
                <strong>Responsável:</strong> {internacao.nomeResponsavel}
              </div>
              {internacao.observacoes && (
                <div>
                  <strong>Observações:</strong> {internacao.observacoes}
                </div>
              )}
            </div>
          </div>
        ))
      )}

      {/* Dialog para detalhes da internação */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
        aria-labelledby="internacao-dialog-title"
      >
        {selectedInternacao && (
          <>
            <DialogTitle id="internacao-dialog-title">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <LocalHospitalIcon className="text-[#100F49]" sx={{ fontSize: 32 }} />
                  <span className="font-semibold">
                    Detalhes do Termo de Internação
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
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-900">Datas</h3>
                      <div className="mt-2 bg-gray-50 p-3 rounded-lg">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-gray-700 font-medium">Data de Entrada:</span>
                            <div className="mt-1">{formatarData(selectedInternacao.dataEntrada)}</div>
                          </div>
                          <div>
                            <span className="text-gray-700 font-medium">Data de Saída Prevista:</span>
                            <div className="mt-1">{formatarData(selectedInternacao.dataSaidaPrevista)}</div>
                          </div>
                          <div className="mt-2">
                            <span className="text-gray-700 font-medium">Criado em:</span>
                            <div className="mt-1">{formatarData(selectedInternacao.createdAt)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-900">Responsável</h3>
                      <div className="mt-2 bg-gray-50 p-3 rounded-lg">
                        <div>
                          <span className="text-gray-700 font-medium">Nome:</span>
                          <div className="mt-1">{selectedInternacao.nomeResponsavel}</div>
                        </div>
                        {selectedInternacao.rgResponsavel && (
                          <div className="mt-2">
                            <span className="text-gray-700 font-medium">RG:</span>
                            <div className="mt-1">{selectedInternacao.rgResponsavel}</div>
                          </div>
                        )}
                        {selectedInternacao.cpfResponsavel && (
                          <div className="mt-2">
                            <span className="text-gray-700 font-medium">CPF:</span>
                            <div className="mt-1">{selectedInternacao.cpfResponsavel}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Grid>
                </Grid>
                
                <Divider className="my-4" />
                
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900">Detalhes da Internação</h3>
                  <div className="mt-2 bg-gray-50 p-3 rounded-lg">
                    <div>
                      <span className="text-gray-700 font-medium">Motivo da Internação:</span>
                      <div className="mt-1">{selectedInternacao.motivoInternacao}</div>
                    </div>
                  
                    {selectedInternacao.observacoes && (
                      <div className="mt-3">
                        <span className="text-gray-700 font-medium">Observações:</span>
                        <div className="mt-1">{selectedInternacao.observacoes}</div>
                      </div>
                    )}
                  </div>
                </div>
                
              
              </div>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={(e) => handlePrintInternacao(e, selectedInternacao.id)} 
                variant="contained" 
                color="primary" 
                startIcon={<PrintIcon />}
              >
                Imprimir
              </Button>
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
