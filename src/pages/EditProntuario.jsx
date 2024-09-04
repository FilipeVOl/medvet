import { Grid, TextField, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import CircularIndeterminate from "../Component/Prontuarios/Loading";

export default function EditProntuario() {
  // Definindo valores aleatórios para os campos
  const [prontuario, setProntuario] = useState({
    weight: "4.5 kg",
    reason_consult: "Exemplo motivo",
    history: "Histórico de exemplo",
    vaccinations: [{ name: "Vacina A", date: "01/01/2023" }],
    deworming: "Exemplo desverminação",
    deworming_date: "01/01/2023",
    temperature: "38°C",
    heart_rate: "120 bpm",
    respiration_rate: "20 rpm"
  });
  const [animals, setAnimals] = useState({
    data: {
      name: "Nome do Animal",
      tutor: { name: "Nome do Tutor" },
      species: "Espécie",
      race: "Raça",
      gender: "Sexo",
      age: "Idade",
      coat: "Pelagem"
    }
  });
  const [teacher, setTeacher] = useState({ user: { name: "Nome do Professor" } });

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    // Função para salvar as alterações
    console.log("Salvar prontuário");
  };

  if (isLoading) {
    return <CircularIndeterminate />;
  }

  return (
    <div className="container flex p-20 ml-12 mt-8 flex-col font-Montserrat">
      <div className="flex flex-col gap-2 flex-grow">
        <h1 className="font-Montserrat h-10 font-bold text-2xl">Editar Prontuário</h1>

        <div className="flex flex-col gap-2">
          <h1 className="font-Montserrat font-semibold text-lg text-[#2C2C2C] mb-4">Informações de Identificação</h1>
          <Grid container spacing={2} rowSpacing={3} className="p-8">
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Professor"
                value={teacher.user?.name || ""}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Paciente"
                value={animals.data?.name || ""}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Tutor"
                value={animals.data?.tutor?.name || ""}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Data"
                value={new Date().toLocaleDateString()}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Espécie"
                value={animals.data?.species || ""}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Raça"
                value={animals.data?.race || ""}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Sexo"
                value={animals.data?.gender || ""}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Idade"
                value={animals.data?.age || ""}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Peso"
                value={prontuario.weight || ""}
                variant="outlined"
                margin="normal"
                onChange={(e) => setProntuario({ ...prontuario, weight: e.target.value })}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Pelagem"
                value={animals.data?.coat || ""}
                variant="outlined"
                margin="normal"
                onChange={(e) => setAnimals({ ...animals, coat: e.target.value })}
              />
            </Grid>
          </Grid>

          <h1 className="font-Montserrat font-semibold text-lg text-[#2C2C2C] mb-4">Anamnese</h1>
          <div className="flex flex-col p-8">
            <TextField
              fullWidth
              label="Motivo da consulta"
              value={prontuario.reason_consult || ""}
              variant="outlined"
              margin="normal"
              onChange={(e) => setProntuario({ ...prontuario, reason_consult: e.target.value })}
            />
            <TextField
              fullWidth
              label="Histórico"
              value={prontuario.history || ""}
              variant="outlined"
              margin="normal"
              onChange={(e) => setProntuario({ ...prontuario, history: e.target.value })}
            />
          </div>

          <h1 className="font-Montserrat font-semibold text-lg text-[#2C2C2C] mb-4">Vacinação</h1>
          <div className="flex flex-col p-8">
            {prontuario.vaccinations.map((vacina, index) => (
              <div key={index} className="flex flex-col mb-4">
                <TextField
                  fullWidth
                  label="Qual"
                  value={vacina.name || ""}
                  variant="outlined"
                  margin="normal"
                  onChange={(e) => {
                    const newVaccinations = [...prontuario.vaccinations];
                    newVaccinations[index].name = e.target.value;
                    setProntuario({ ...prontuario, vaccinations: newVaccinations });
                  }}
                />
                <TextField
                  fullWidth
                  label="Data da última"
                  value={vacina.date || ""}
                  variant="outlined"
                  margin="normal"
                  onChange={(e) => {
                    const newVaccinations = [...prontuario.vaccinations];
                    newVaccinations[index].date = e.target.value;
                    setProntuario({ ...prontuario, vaccinations: newVaccinations });
                  }}
                />
              </div>
            ))}
          </div>

          <h1 className="font-Montserrat font-semibold text-lg text-[#2C2C2C] mb-4">Desverminação</h1>
          <div className="flex flex-col p-8">
            <TextField
              fullWidth
              label="Qual"
              value={prontuario.deworming || ""}
              variant="outlined"
              margin="normal"
              onChange={(e) => setProntuario({ ...prontuario, deworming: e.target.value })}
            />
            <TextField
              fullWidth
              label="Data da última"
              value={prontuario.deworming_date || ""}
              variant="outlined"
              margin="normal"
              onChange={(e) => setProntuario({ ...prontuario, deworming_date: e.target.value })}
            />
          </div>

          <h1 className="font-Montserrat font-semibold text-lg text-[#2C2C2C] mb-4">Exame Físico</h1>
          <Grid container spacing={2} rowSpacing={3} className="p-8">
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Temperatura"
                value={prontuario.temperature || ""}
                variant="outlined"
                margin="normal"
                onChange={(e) => setProntuario({ ...prontuario, temperature: e.target.value })}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Frequência Cardíaca"
                value={prontuario.heart_rate || ""}
                variant="outlined"
                margin="normal"
                onChange={(e) => setProntuario({ ...prontuario, heart_rate: e.target.value })}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Frequência Respiratória"
                value={prontuario.respiration_rate || ""}
                variant="outlined"
                margin="normal"
                onChange={(e) => setProntuario({ ...prontuario, respiration_rate: e.target.value })}
              />
            </Grid>
          </Grid>
        </div>

        <div className="flex justify-end mb-4 mt-8">
        <button
              className="mt-4 w-[216px] px-6 py-2 bg-[#D5D0C7]  text-white font-Montserrat font-semibold text-lg 	rounded-[10px] transition-colors duration-300 ease-in-out hover:bg-[#007448]"
              style={{ width: '216px' }}
              onClick={handleSave}
            >
              Salvar alterações
            </button>
        </div>
      </div>
    </div>
  );
}