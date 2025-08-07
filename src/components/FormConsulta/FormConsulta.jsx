import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Box, TextField, Button, CircularProgress, FormControl, FormControlLabel, Checkbox, Grid, Paper, Typography } from '@mui/material';
import { formatCPF, formatCPFDisplay, handleCPFChange, formatPhone, formatPhoneDisplay, handlePhoneChange, formatCEP, formatCEPDisplay, handleCEPChange } from '../../utils/inputMasks';

export default function FormConsulta({ animalData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nomeResponsavel: animalData?.tutorName || localStorage.getItem('tutorName') || '',
    cpf: animalData?.tutorData?.cpf ? formatCPFDisplay(animalData.tutorData.cpf) : (localStorage.getItem('tutorCpf') ? formatCPFDisplay(localStorage.getItem('tutorCpf')) : ''),
    endereco: animalData?.tutorData?.address || localStorage.getItem('tutorAddress') || '',
    cep: '',
    telefone: animalData?.tutorData?.phone ? formatPhoneDisplay(animalData.tutorData.phone) : (localStorage.getItem('tutorPhone') ? formatPhoneDisplay(localStorage.getItem('tutorPhone')) : ''),
    motivoConsulta: animalData?.reason || localStorage.getItem('motivoConsulta') || '',
    observacoes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cpf') {
      handleCPFChange(value, (newValue) => {
        setFormData(prev => ({ ...prev, [name]: newValue }));
      });
    } else if (name === 'telefone') {
      handlePhoneChange(value, (newValue) => {
        setFormData(prev => ({ ...prev, [name]: newValue }));
      });
    } else if (name === 'cep') {
      handleCEPChange(value, (newValue) => {
        setFormData(prev => ({ ...prev, [name]: newValue }));
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.motivoConsulta) {
      Swal.fire({
        title: 'Campo obrigatório',
        text: 'Por favor, preencha o motivo da consulta',
        icon: 'warning',
        confirmButtonColor: '#144A36',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        cpf: formatCPF(formData.cpf),
        telefone: formatPhone(formData.telefone),
        cep: formatCEP(formData.cep),
        animalId: animalData?.id || '',
        animalName: animalData?.name || '',
        species: animalData?.species || '',
        race: animalData?.race || '',
        age: animalData?.age || '',
        dataConsulta: new Date()
      };      
      const response = await axios.post(
        'http://localhost:3333/termos-consulta',
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );if (response.status === 201 || response.status === 200) {
        localStorage.removeItem('consultaPagOne');
        localStorage.removeItem('consultaPagSec');
        localStorage.removeItem('consultaPagTh');
        localStorage.removeItem('diagnostico');
        localStorage.removeItem('tratamento');
        localStorage.removeItem('observacoes');
        localStorage.removeItem('examesComplementares');
        localStorage.removeItem('selectedForm');
        localStorage.removeItem('motivoConsulta');
        
        localStorage.setItem('tutorName', formData.nomeResponsavel);
        localStorage.setItem('tutorCpf', formatCPF(formData.cpf));
        localStorage.setItem('tutorAddress', formData.endereco);
        localStorage.setItem('tutorPhone', formatPhone(formData.telefone));

      
        let pdfUrl;
        
        if (response.data.pdfUrl) {
          pdfUrl = `http://localhost:3333/termos-consulta/${response.data.id}/pdf`;
        } else if (response.data.id) {
          const pdfResponse = await axios.get(
            `http://localhost:3333/termos-consulta/${response.data.id}/pdf`,
            { 
              responseType: 'blob'
            }
          );
          pdfUrl = URL.createObjectURL(pdfResponse.data);
        }

        Swal.fire({
          title: 'Sucesso!',
          text: 'Termo de consulta gerado com sucesso',
          icon: 'success',
          confirmButtonColor: '#144A36',
          confirmButtonText: 'Ver PDF',
          showCancelButton: true,
          cancelButtonText: 'Fechar'
        }).then((result) => {
          if (result.isConfirmed && pdfUrl) {
            window.open(pdfUrl, '_blank');
          }
        });
        
      }
    } catch (error) {
      console.error("Erro ao criar termo de consulta:", error);
      Swal.fire({
        title: 'Erro',
        text: error.response?.data?.message || 'Ocorreu um erro ao gerar o termo de consulta. Tente novamente.',
        icon: 'error',
        confirmButtonColor: '#144A36'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 12, bgcolor: 'background.paper', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold" fontFamily="Montserrat">
        Termo de Consulta
      </Typography>
      <Typography variant="subtitle1" gutterBottom fontFamily="Montserrat">
        {animalData?.name ? `Paciente: ${animalData.name}` : 'Preencha os dados do responsável e da consulta'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nome do Responsável"
              name="nomeResponsavel"
              value={formData.nomeResponsavel}
              onChange={handleChange}
              variant="outlined"
              InputProps={{
                style: { fontFamily: 'Montserrat' }
              }}
              InputLabelProps={{
                style: { fontFamily: 'Montserrat' }
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="CPF"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              variant="outlined"
              placeholder="000.000.000-00"
              InputProps={{
                style: { fontFamily: 'Montserrat' }
              }}
              InputLabelProps={{
                style: { fontFamily: 'Montserrat' }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Endereço"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              variant="outlined"
              InputProps={{
                style: { fontFamily: 'Montserrat' }
              }}
              InputLabelProps={{
                style: { fontFamily: 'Montserrat' }
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="CEP"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              variant="outlined"
              placeholder="00000-000"
              InputProps={{
                style: { fontFamily: 'Montserrat' }
              }}
              InputLabelProps={{
                style: { fontFamily: 'Montserrat' }
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              variant="outlined"
              placeholder="(00) 00000-0000"
              InputProps={{
                style: { fontFamily: 'Montserrat' }
              }}
              InputLabelProps={{
                style: { fontFamily: 'Montserrat' }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Motivo da Consulta"
              name="motivoConsulta"
              value={formData.motivoConsulta}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={3}
              InputProps={{
                style: { fontFamily: 'Montserrat' }
              }}
              InputLabelProps={{
                style: { fontFamily: 'Montserrat' }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Observações"
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={3}
              InputProps={{
                style: { fontFamily: 'Montserrat' }
              }}
              InputLabelProps={{
                style: { fontFamily: 'Montserrat' }
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{
              bgcolor: '#144A36',
              '&:hover': { bgcolor: '#0d3526' },
              fontFamily: 'Montserrat',
              fontWeight: 'bold',
              px: 4
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Gerar Termo de Consulta'
            )}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

FormConsulta.propTypes = {
  animalData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    tutorName: PropTypes.string,
    age: PropTypes.string,
    species: PropTypes.string,
    race: PropTypes.string,
    sex: PropTypes.string,
    weight: PropTypes.string,
    reason: PropTypes.string,
    tutorData: PropTypes.shape({
      address: PropTypes.string,
      phone: PropTypes.string,
      cpf: PropTypes.string
    })
  })
};

FormConsulta.defaultProps = {
  animalData: {
    id: '',
    name: '',
    tutorName: '',
    tutorData: {
      address: '',
      phone: '',
      cpf: ''
    }
  }
};
