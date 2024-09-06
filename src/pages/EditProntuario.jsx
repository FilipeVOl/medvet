import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import CircularIndeterminate from "../Component/Prontuarios/Loading";
import { useParams } from "react-router-dom";
import { getEnchiridionId, getTeacherName } from "../services/enchiridion";
import { getAnimalById } from "../services/animals";
import { getTeacherid } from "../services/professores";
import axios from 'axios';

export default function EditProntuario() {
  const [prontuario, setProntuario] = useState({
    weight: "",
    reason_consult: "",
    history: "",
    vaccinations: [],
    deworming: "",
    stringDate: "",
    date_deworming: "",
    temperature: "",
    frequency_cardiac: "",
    frequency_respiratory: "",
    lymph_node: "",
    dehydration: "",
    type_mucous: "",
    whats_mucous: "",
    skin_annex: "",
    system_circulatory: "",
    system_respiratory: "",
    system_digestive: "",
    system_locomotor: "",
    system_nervous: "",
    system_genitourinary: "",
    others: "",
    complementary_exams: "",
    diagnosis: "",
    trataments: "",
    observations: ""
  });
  const [animal, setAnimal] = useState({
    id: "",
    name: "",
    age: "",
    coat: "",
    created_at: "",
    gender: "",
    race: "",
    sequence: "",
    species: ""
  });
  const [teacher, setTeacher] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [showToast, setShowToast] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const enchiridion = await getEnchiridionId(id);
        const [animalDataResponse, teacherData] = await Promise.all([
          getAnimalById(enchiridion.animal_id),
          getTeacherid(enchiridion.teacher_id),
        ]);
        const animalData = animalDataResponse.data;
        const formattedDate = enchiridion.date ? new Date(enchiridion.date).toLocaleDateString('pt-BR') : '';
        // console.log(animalData)
        // console.log(teacherData)
        console.log(enchiridion)
        setProntuario({ ...enchiridion, stringDate: formattedDate });
        setAnimal(animalData);
        setTeacher(teacherData.user.name);
      } catch (error) {
        console.error("Erro ao buscar o prontuário:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);



  // useEffect(() => {
  //   if (showToast) {
  //     const timer = setTimeout(() => {
  //       setShowToast(false);
  //     }, 10000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [showToast]);

  

  if (isLoading) {
    return <CircularIndeterminate />;
  }


  const updateEnchiridion = async (prontuario) => {
    try {
      const response = await axios.put(`http://localhost:3333/put/enchiridion`, prontuario);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar o prontuário:", error);
      throw error;
    }
  };

  const handleSave = async () => {
    try {
      console.log(prontuario)
      await updateEnchiridion(prontuario);
      alert("Prontuário atualizado com sucesso!");
      // setShowToast(true);
    } catch (error) {
      console.error("Erro ao salvar o prontuário:", error.response ? error.response.data : error.message);
    }
  };

  const CustomInput = ({
    label,
    value,
    onChange,
    type = "text",
    required = false,
    fullWidth = true,
    ...props
  }) => {

  
    return (
    <div className="flex flex-col w-full">
      <label className="mb-2 text-gray-700 font-semibold">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full border-solid border-2 rounded-lg h-11 p-2 ${required ? "outline-red-600 border-red-500" : "outline-gray-input"}`}
        {...props}
      />
    </div>
  )};

  return (
    <div className="container flex p-20 ml-12 mt-8 flex-col font-Montserrat">
        {/* {showToast && (
            <div className="animate-fadeIn opacity-0 absolute top-32 right-0 m-4">
              <div
                class="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700"
                role="alert"
                tabindex="-1"
                aria-labelledby="hs-toast-success-example-label"
              >
                <div class="flex p-4">
                  <div class="shrink-0">
                    <svg
                      class="shrink-0 size-4 text-teal-500 mt-0.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
                    </svg>
                  </div>
                  <div class="ms-3">
                    <p
                      id="hs-toast-success-example-label"
                      class="text-sm text-gray-700 dark:text-neutral-400"
                    >
                      Aluno excluído com sucesso
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )} */}
      <div className="flex flex-col gap-2 flex-grow">
        <h1 className="font-Montserrat h-10 font-bold text-2xl">Editar Prontuário</h1>

        <div className="flex flex-col gap-2">
          <h1 className="font-Montserrat font-semibold text-lg text-[#2C2C2C] mb-4">Informações de Identificação</h1>
          <Grid container spacing={2} rowSpacing={3} className="p-8">
            <Grid item xs={2}>
              <CustomInput
                label="Professor"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)} // Atualize o nome do professor diretamente
              />
            </Grid>
            <Grid item xs={2}>
              <CustomInput
                label="Paciente"
                value={animal.name || ""}
                onChange={(e) => setAnimal({ ...animal, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomInput
                label="Tutor"
                value={animal.tutor?.name || ""}
                onChange={(e) => setAnimal({ ...animal, tutor: { name: e.target.value } })}
              />
            </Grid>
            <Grid item xs={2}>
              <CustomInput
                label="Data"
                value={prontuario.stringDate || ""}
                onChange={(e) => setProntuario({ ...prontuario, date: e.target.value })}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomInput
                label="Espécie"
                value={animal.species || ""}
                onChange={(e) => setAnimal({ ...animal, species: e.target.value })}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomInput
                label="Raça"
                value={animal.race || ""}
                onChange={(e) => setAnimal({ ...animal, race: e.target.value })}
              />
            </Grid>
            <Grid item xs={2}>
              <CustomInput
                label="Sexo"
                value={animal.gender || ""}
                onChange={(e) => setAnimal({ ...animal, gender: e.target.value })}
              />
            </Grid>
            <Grid item xs={2}>
              <CustomInput
                label="Idade"
                value={animal.age || ""}
                onChange={(e) => setAnimal({ ...animal, age: e.target.value })}
              />
            </Grid>
            <Grid item xs={2}>
              <CustomInput
                label="Peso"
                value={prontuario.weight}
                onChange={(e) => setProntuario({ ...prontuario, weight: e.target.value })}
              />
            </Grid>
            <Grid item xs={2}>
              <CustomInput
                label="Pelagem"
                value={animal.coat || ""}
                onChange={(e) => setAnimal({ ...animal, coat: e.target.value })}
              />
            </Grid>
          </Grid>

          <h1 className="font-Montserrat font-semibold text-lg text-[#2C2C2C] mb-4">Anamnese</h1>
          <div className="flex flex-col p-8">
            <CustomInput
              label="Motivo da Consulta"
              value={prontuario.reason_consult}
              onChange={(e) => setProntuario({ ...prontuario, reason_consult: e.target.value })}
            />
            <CustomInput
              label="Histórico"
              value={prontuario.history || ""}
              onChange={(e) => setProntuario({ ...prontuario, history: e.target.value })}
            />
          </div>

          <h1 className="font-Montserrat font-semibold text-lg text-[#2C2C2C] mb-4">Vacinação</h1>
          <div className="flex flex-col p-8">
            {prontuario.vaccinations.map((vacina, index) => (
              <div key={index} className="flex flex-col mb-4">
                <CustomInput
                  label="Qual"
                  value={vacina.name || ""}
                  onChange={(e) => {
                    const newVaccinations = [...prontuario.vaccinations];
                    newVaccinations[index].name = e.target.value;
                    setProntuario({ ...prontuario, vaccinations: newVaccinations });
                  }}
                />
                <CustomInput
                  label="Data da última"
                  value={vacina.date || ""}
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
            <CustomInput
              label="Qual"
              value={prontuario.deworming || ""}
              onChange={(e) => setProntuario({ ...prontuario, deworming: e.target.value })}
            />
            <CustomInput
              label="Data da última"
              value={prontuario.date_deworming || ""}
              onChange={(e) => setProntuario({ ...prontuario, date_deworming: e.target.value })}
            />
          </div>

          <h1 className="font-Montserrat font-semibold text-lg text-[#2C2C2C] mb-4">Exame Físico</h1>
          <Grid container spacing={2} rowSpacing={3} className="p-8">
            <Grid item xs={3}>
              <CustomInput
                label="Temperatura"
                value={prontuario.temperature}
                onChange={(e) => setProntuario({ ...prontuario, temperature: e.target.value })}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomInput
                label="Frequência Cardíaca"
                value={prontuario.frequency_cardiac}
                onChange={(e) => setProntuario({ ...prontuario, frequency_cardiac: e.target.value })}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomInput
                label="Frequência Respiratória"
                value={prontuario.frequency_respiratory}
                onChange={(e) => setProntuario({ ...prontuario, frequency_respiratory: e.target.value })}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomInput
                label="Linfonodos reativos"
                value={prontuario.lymph_node || ""}
                onChange={(e) => setProntuario({ ...prontuario, lymph_node: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} rowSpacing={3} className="p-8">
            <Grid item xs={3}>
              <CustomInput
                label="Grau de desidratação estimado"
                value={prontuario.dehydration || ""}
                onChange={(e) => setProntuario({ ...prontuario, dehydration: e.target.value })}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomInput
                label="Mucosas Tipo"
                value={prontuario.type_mucous || ""}
                onChange={(e) => setProntuario({ ...prontuario, type_mucous: e.target.value })}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomInput
                label="Mucosas Qual"
                value={prontuario.whats_mucous || ""}
                onChange={(e) => setProntuario({ ...prontuario, whats_mucous: e.target.value })}
              />
            </Grid>
          </Grid>

          <h1 className="font-Montserrat font-semibold text-lg text-[#2C2C2C] mb-4">Avaliação dos Sistemas</h1>
          <Grid container spacing={2} rowSpacing={3} className="p-8">
            <Grid item xs={3}>
              <CustomInput
                label="Pele e anexos"
                value={prontuario.skin_annex || ""}
                onChange={(e) => setProntuario({ ...prontuario, skin_annex: e.target.value })}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomInput
                label="Circulatório"
                value={prontuario.system_circulatory || ""}
                onChange={(e) => setProntuario({ ...prontuario, system_circulatory: e.target.value })}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomInput
                label="Respiratório"
                value={prontuario.system_respiratory || ""}
                onChange={(e) => setProntuario({ ...prontuario, system_respiratory: e.target.value })}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomInput
                label="Digestivo"
                value={prontuario.system_digestive || ""}
                onChange={(e) => setProntuario({ ...prontuario, system_digestive: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} rowSpacing={3} className="p-8">
            <Grid item xs={3}>
              <CustomInput
                label="Locomotor"
                value={prontuario.system_locomotor || ""}
                onChange={(e) => setProntuario({ ...prontuario, system_locomotor: e.target.value })}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomInput
                label="Nervoso"
                value={prontuario.system_nervous || ""}
                onChange={(e) => setProntuario({ ...prontuario, system_nervous: e.target.value })}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomInput
                label="Geniturinário"
                value={prontuario.system_genitourinary || ""}
                onChange={(e) => setProntuario({ ...prontuario, system_genitourinary: e.target.value })}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomInput
                label="Outros"
                value={prontuario.others || ""}
                onChange={(e) => setProntuario({ ...prontuario, others: e.target.value })}
              />
            </Grid>
          </Grid>

          <h1 className="font-Montserrat font-semibold text-lg text-[#2C2C2C] mb-4">Exames Complementares</h1>
          <div className="flex flex-col p-8">
            <CustomInput
              label="Exames Complementares"
              value={prontuario.complementary_exams || ""}
              onChange={(e) => setProntuario({ ...prontuario, complementary_exams: e.target.value })}
            />
          </div>

          <h1 className="font-Montserrat font-semibold text-lg text-[#2C2C2C] mb-4">Diagnóstico e Tratamentos</h1>
          <div className="flex flex-col p-8">
            <CustomInput
              label="Diagnóstico"
              value={prontuario.diagnosis || ""}
              onChange={(e) => setProntuario({ ...prontuario, diagnosis: e.target.value })}
            />
            <CustomInput
              label="Tratamentos"
              value={prontuario.trataments || ""}
              onChange={(e) => setProntuario({ ...prontuario, trataments: e.target.value })}
            />
          </div>

          <h1 className="font-Montserrat font-semibold text-lg text-[#2C2C2C] mb-4">Observações</h1>
          <div className="flex flex-col p-8">
            <CustomInput
              label="Observações"
              value={prontuario.observations || ""}
              onChange={(e) => setProntuario({ ...prontuario, observations: e.target.value })}
            />
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
    </div>
  );
}