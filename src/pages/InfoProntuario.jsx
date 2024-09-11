import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import CircularIndeterminate from "../Component/Prontuarios/Loading";
import { getEnchiridionId, getTeacherName } from "../services/enchiridion";
import { getAnimalById } from "../services/animals";
import { getTeacherid } from "../services/professores";
import { getTutorID } from "../services/tutores";
import { useNavigate } from "react-router-dom";



export default function InfoProntuario() {

  const { id } = useParams();
  const [prontuario, setProntuario] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [teacher, setTeacher] = useState({})
  const [animals, setAnimals] = useState({});
  const [tutor, setTutor] = useState({})


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const enchiridion = await getEnchiridionId(id);
        const [animal, prof] = await Promise.all([
          getAnimalById(enchiridion.animal_id),
          getTeacherid(enchiridion.teacher_id),
        ]);
        setProntuario(enchiridion);
        setAnimals(animal)
        setTeacher(prof)
      } catch (error) {
        console.error("Erro ao buscar o prontuário:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);






  const Title = ({ title }) => {
    return (
      <div className="flex gap-2 items-center">
        <h1 className="font-Montserrat text-[##100F49] font-semibold text-2xl">
          {title}
        </h1>
      </div>
    );
  };

  const SystemsWrapper = ({ title, props }) => {
    return (
      <div className="flex-1 w-full items-start justify-start mb-12">
        <h1 className="font-Montserrat font-semibold text-lg text-[#2C2C2C]">
          {title}
        </h1>
        <h1>
          {props}
        </h1>
      </div>
    );
  };

  const navigate = useNavigate();


    

  return (
    <>
      {isLoading ? <CircularIndeterminate /> :
        <div className="container flex p-20 ml-12 mt-8 flex-col font-Montserrat">
          <div className="flex flex-col mb-10">
            <h1 className="font-Montserrat h-10 font-bold text-2xl">
              Prontuário
            </h1>
            <span className="font-Montserrat font-semibold text-xl text-[#2C2C2C]">
              N° {prontuario.id}
            </span>
            <button
              className="mt-4 w-[216px] px-6 py-2 bg-[#D5D0C7]  text-white font-Montserrat font-semibold text-lg 	rounded-[10px] transition-colors duration-300 ease-in-out hover:bg-[#007448]"
              style={{ width: '216px' }}
              onClick={() => {
                navigate(`/prontuarios/edit/${prontuario.id}`)
              }}
            >
              Editar Prontuário
            </button>

          </div>
          <div className="flex flex-col gap-2">
            <Title title="Informações de Identificação" />
            <Grid container spacing={2} rowSpacing={3} className="p-8">
              <Grid item xs={2}>
                <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                  Professor:
                </h1>
                <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                  {teacher.user.name}
                </span>
              </Grid>
              <Grid item xs={2}>
                <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                  Paciente:
                </h1>
                <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                  {animals.data.name}
                </span>
              </Grid>
              <Grid item xs={3}>
                <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                  Tutor:
                </h1>
                <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                  {animals.data.tutor.name}
                </span>
              </Grid>
              <Grid item xs={2}>
                <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                  Data:
                </h1>
                <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                  {new Date(prontuario.date).toLocaleDateString()}
                </span>
              </Grid>
              <Grid item xs={3}>
                <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                  Espécie:
                </h1>
                <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                  {animals.data.species}
                </span>
              </Grid>
              <Grid item xs={3}>
                <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                  Raça:
                </h1>
                <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                  {animals.data.race}
                </span>
              </Grid>
              <Grid item xs={2}>
                <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                  Sexo:
                </h1>
                <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                  {animals.data.gender}
                </span>
              </Grid>
              <Grid item xs={2}>
                <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                  Idade:
                </h1>
                <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                  {animals.data.age}
                </span>
              </Grid>
              <Grid item xs={2}>
                <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                  Peso:
                </h1>
                <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                  {prontuario.weight}
                </span>
              </Grid>
              <Grid item xs={2}>
                <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                  Pelagem:
                </h1>
                <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                  {animals.data.coat}
                </span>
              </Grid>
            </Grid>
            <Title title="Anamnese" />
            <div className="flex flex-col p-8">
              <h1 className="font-Montserrat font-semibold text-lg text-[#2C2C2C]">
                Motivo da consulta:
              </h1>
              <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                {prontuario.reason_consult}
              </span>

              <h1 className="font-Montserrat font-semibold text-lg text-[#2C2C2C] mt-4">
                Histórico:
              </h1>
              <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                {prontuario.history}
              </span>
              <div className="flex justify-between gap-16">
                <div className="w-1/2">
                  <h1 className="font-Montserrat text-[##100F49] font-semibold text-xl py-8">
                    Vacinação:
                  </h1>
                  {prontuario.vaccinations.map((vacina) => (
                    <div className="flex justify-between items-center " key={vacina.id}>
                      <div>
                        <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                          Qual:
                        </h1>
                        <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                          {vacina.name}
                        </span>
                      </div>
                      <div>
                        <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                          Data da última:
                        </h1>
                        <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                          {vacina.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-1/2">
                  <h1 className="font-Montserrat text-[##100F49] font-semibold text-xl py-8">
                    Desverminação:
                  </h1>
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                        Qual:
                      </h1>
                      <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                        Dontral
                      </span>
                    </div>
                    <div>
                      <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                        Data da última:
                      </h1>
                      <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                        Vacina contra Raiva
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Title title="Exame Físico" />
            <Grid container spacing={2} rowSpacing={3} className="p-8">
              <Grid item xs={3}>
                <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                  Temperatura:
                </h1>
                <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                  {prontuario.temperature}
                </span>
              </Grid>
              <Grid item xs={3}>
                <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                  Freq. Cardíaca:
                </h1>
                <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                  {prontuario.frequency_cardiac}
                </span>
              </Grid>
              <Grid item xs={3}>
                <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                  Freq. Respiratória:
                </h1>
                <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                  {prontuario.frequency_respiratory}
                </span>
              </Grid>
              <Grid item xs={3}>
                <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                  Linfonodos reativos:
                </h1>
                <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                  {prontuario.lymph_node}
                </span>
              </Grid>
              <Grid item xs={12}>
                <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                  Grau de desidratação estimado: {prontuario.dehydration}
                </h1>
              </Grid>
              <Grid item xs={12}>
                <h1 className="font-Montserrat text-[##100F49] font-semibold text-xl">
                  Mucosas
                </h1>
              </Grid>
              <Grid item xs={3}>
                <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                  Tipo: {prontuario.type_mucous}
                </h1>
              </Grid>
              <Grid item xs={3}>
                <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                  Qual: {prontuario.whats_mucous}
                </h1>
              </Grid>
              {/* <Grid item xs={2}>
              <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                Congestas
              </h1>
            </Grid>
            <Grid item xs={2}>
              <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                Cianóticas
              </h1>
            </Grid> */}
            </Grid>
            <Title title="Avaliação dos sistemas" />
            <Grid container spacing={2} rowSpacing={3} className="p-8">
              <Grid item xs={6}>
                <SystemsWrapper title="Pele e anexos:" props={prontuario.skin_annex} />
              </Grid>
              <Grid item xs={6}>
                <SystemsWrapper title="Sist. Circulatório:" props={prontuario.system_circulatory} />
              </Grid>
              <Grid item xs={6}>
                <SystemsWrapper title="Sist. Respiratório:" props={prontuario.system_respiratory} />
              </Grid>
              <Grid item xs={6}>
                <SystemsWrapper title="Sist. Digestivo:" props={prontuario.system_digestive} />
              </Grid>
              <Grid item xs={6}>
                <SystemsWrapper title="Sist. Locomotor:" props={prontuario.system_locomotor} />
              </Grid>
              <Grid item xs={6}>
                <SystemsWrapper title="Sist. Nervoso:" props={prontuario.system_nervous} />
              </Grid>
              <Grid item xs={6}>
                <SystemsWrapper title="Sist. Genitourinário:" props={prontuario.system_genitourinary} />
              </Grid>
              <Grid item xs={6}>
                <SystemsWrapper title="Outros:" props={prontuario.others} />
              </Grid>
            </Grid>
            <Title title="Exames" />
            <Grid container spacing={2} rowSpacing={3} className="p-8">
              <Grid item xs={6}>
                <SystemsWrapper title="Exames complementares:" props={prontuario.complementary_exams} />
              </Grid>
              <Grid item xs={6}>
                <SystemsWrapper title="Diagnóstico:" props={prontuario.diagnosis} />
              </Grid>
              <Grid item xs={6}>
                <SystemsWrapper title="Tratamento:" props={prontuario.trataments} />
              </Grid>
              <Grid item xs={6}>
                <SystemsWrapper title="Observações:" props={prontuario.observations} />
              </Grid>
              <Grid item xs={6}>
                <SystemsWrapper title="Responsável (Nome Completo):" props={teacher.user.name} />
              </Grid>
            </Grid>
          </div>
        </div>
      }
    </>
  );
}
