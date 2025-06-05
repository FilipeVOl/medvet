import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  IconButton,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { 
  VisibilityOutlined as ViewIcon,
  DeleteOutline as DeleteIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getAllTermosConsulta, getTermoConsultaPdf, deleteTermoConsulta } from '../../services/termoConsulta';
import Swal from 'sweetalert2';

export default function TermosConsultaView({ animalId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [termos, setTermos] = useState([]);
  const [selectedTermo, setSelectedTermo] = useState(null);
  const [openPdfDialog, setOpenPdfDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    fetchTermos();
  }, [animalId]);

  const fetchTermos = async () => {
    setIsLoading(true);
    try {
      const data = await getAllTermosConsulta();
      // Filter terms for the current animal
      const filteredTermos = data.filter(termo => termo.animalId === animalId);
      setTermos(filteredTermos);
    } catch (error) {
      console.error("Erro ao buscar termos de consulta:", error);
      Swal.fire({
        title: 'Erro',
        text: 'Ocorreu um erro ao carregar os termos de consulta',
        icon: 'error',
        confirmButtonColor: '#144A36'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewPdf = async (termo) => {
    setSelectedTermo(termo);
    
    try {
      const pdfBlob = await getTermoConsultaPdf(termo.id);
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
      setOpenPdfDialog(true);
    } catch (error) {
      console.error("Erro ao abrir PDF:", error);
      Swal.fire({
        title: 'Erro',
        text: 'Não foi possível abrir o PDF do termo de consulta',
        icon: 'error',
        confirmButtonColor: '#144A36'
      });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedTermo) return;
    
    try {
      await deleteTermoConsulta(selectedTermo.id);
      await fetchTermos(); // Refresh the list
      setOpenDeleteDialog(false);
      Swal.fire({
        title: 'Sucesso',
        text: 'Termo de consulta excluído com sucesso',
        icon: 'success',
        confirmButtonColor: '#144A36'
      });
    } catch (error) {
      console.error("Erro ao excluir termo de consulta:", error);
      Swal.fire({
        title: 'Erro',
        text: 'Ocorreu um erro ao excluir o termo de consulta',
        icon: 'error',
        confirmButtonColor: '#144A36'
      });
    }
  };

  const handleClosePdfDialog = () => {
    setOpenPdfDialog(false);
    // Revoke the URL when done to avoid memory leaks
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (e) {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress sx={{ color: '#144A36' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography 
        variant="h6" 
        gutterBottom 
        fontFamily="Montserrat" 
        fontWeight="bold" 
        color="#595959"
      >
        Termos de Consulta
      </Typography>

      {termos.length === 0 ? (
        <Paper elevation={0} sx={{ p: 3, bgcolor: '#f5f5f5', borderRadius: 2, textAlign: 'center' }}>
          <Typography fontFamily="Montserrat" color="#595959">
            Nenhum termo de consulta encontrado para este animal.
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontFamily: 'Montserrat', fontWeight: 'bold' }}>Data</TableCell>
                <TableCell sx={{ fontFamily: 'Montserrat', fontWeight: 'bold' }}>Responsável</TableCell>
                <TableCell sx={{ fontFamily: 'Montserrat', fontWeight: 'bold' }}>Motivo da Consulta</TableCell>
                <TableCell sx={{ fontFamily: 'Montserrat', fontWeight: 'bold' }} align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {termos.map((termo) => (
                <TableRow key={termo.id} hover>
                  <TableCell sx={{ fontFamily: 'Montserrat' }}>
                    {formatDate(termo.createdAt)}
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'Montserrat' }}>{termo.nomeResponsavel}</TableCell>
                  <TableCell sx={{ fontFamily: 'Montserrat' }}>{termo.motivoConsulta}</TableCell>
                  <TableCell align="center">
                    <IconButton 
                      color="primary" 
                      onClick={() => handleViewPdf(termo)} 
                      title="Visualizar PDF"
                    >
                      <ViewIcon />
                    </IconButton>
                    <IconButton 
                      color="error" 
                      onClick={() => {
                        setSelectedTermo(termo);
                        setOpenDeleteDialog(true);
                      }}
                      title="Excluir termo"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* PDF Viewer Dialog */}
      <Dialog 
        open={openPdfDialog} 
        onClose={handleClosePdfDialog}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography fontFamily="Montserrat" fontWeight="bold">
              Termo de Consulta
            </Typography>
            <IconButton onClick={handleClosePdfDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {pdfUrl && (
            <iframe
              src={pdfUrl}
              title="Termo de Consulta PDF"
              width="100%"
              height="600px"
              style={{ border: 'none' }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => window.open(pdfUrl, '_blank')}
            variant="contained"
            sx={{ bgcolor: '#144A36', '&:hover': { bgcolor: '#0d3526' }, fontFamily: 'Montserrat' }}
          >
            Abrir em Nova Aba
          </Button>
          <Button 
            onClick={handleClosePdfDialog}
            variant="outlined"
            sx={{ fontFamily: 'Montserrat' }}
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle sx={{ fontFamily: 'Montserrat' }}>
          Excluir Termo de Consulta
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontFamily: 'Montserrat' }}>
            Tem certeza de que deseja excluir este termo de consulta? Esta ação não pode ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenDeleteDialog(false)}
            sx={{ fontFamily: 'Montserrat' }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            sx={{ fontFamily: 'Montserrat' }}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

TermosConsultaView.propTypes = {
  animalId: PropTypes.string.isRequired
};
