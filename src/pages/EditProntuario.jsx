import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import CircularIndeterminate from "../Component/Prontuarios/Loading";
import { useParams } from "react-router-dom";
import { getEnchiridionId, getTeacherName } from "../services/enchiridion";
import { getAnimalById } from "../services/animals";
import { getTeacherid } from "../services/professores";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import axios from 'axios';

export default function EditProntuario() {

  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      prontuario: {
        vaccinations: [], 
      },
    },
  });


  const [enchiridionId, setEnchiridionId] = useState(null);
  const [teacherId, setTeacherId] = useState(null);
  const [animalId, setAnimalId] = useState(null);


  const { fields, append, remove } = useFieldArray({
    control,
    name: 'prontuario.vaccinations',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

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
        // console.log(enchiridion)
        setValue('teacher', teacherData.user.name);
        setValue('animal.name', animalData.name);
        setValue('animal.tutor', animalData.tutor?.name || '');
        setValue('prontuario.stringDate', formattedDate);
        setValue('animal.species', animalData.species);
        setValue('animal.race', animalData.race);
        setValue('animal.gender', animalData.gender);
        setValue('animal.age', animalData.age);
        setValue('prontuario.weight', enchiridion.weight);
        setValue('animal.coat', animalData.coat);
        setValue('prontuario.reason_consult', enchiridion.reason_consult);
        setValue('prontuario.history', enchiridion.history);
        setValue('prontuario.vaccinations', enchiridion.vaccinations);
        setValue('prontuario.deworming', enchiridion.deworming);
        setValue('prontuario.date_deworming', enchiridion.date_deworming);
        setValue('prontuario.temperature', enchiridion.temperature);
        setValue('prontuario.frequency_cardiac', enchiridion.frequency_cardiac);
        setValue('prontuario.frequency_respiratory', enchiridion.frequency_respiratory);
        setValue('prontuario.lymph_node', enchiridion.lymph_node);
        setValue('prontuario.dehydration', enchiridion.dehydration);
        setValue('prontuario.type_mucous', enchiridion.type_mucous);
        setValue('prontuario.whats_mucous', enchiridion.whats_mucous);
        setValue('prontuario.skin_annex', enchiridion.skin_annex);
        setValue('prontuario.system_circulatory', enchiridion.system_circulatory);
        setValue('prontuario.system_respiratory', enchiridion.system_respiratory);
        setValue('prontuario.system_digestive', enchiridion.system_digestive);
        setValue('prontuario.system_locomotor', enchiridion.system_locomotor);
        setValue('prontuario.system_nervous', enchiridion.system_nervous);
        setValue('prontuario.system_genitourinary', enchiridion.system_genitourinary);
        setValue('prontuario.others', enchiridion.others);
        setValue('prontuario.complementary_exams', enchiridion.complementary_exams);
        setValue('prontuario.diagnosis', enchiridion.diagnosis);
        setValue('prontuario.trataments', enchiridion.trataments);
        setValue('prontuario.observations', enchiridion.observations);
        setEnchiridionId(enchiridion.id);
        setTeacherId(enchiridion.teacher_id);
        setAnimalId(enchiridion.animal_id);
      } catch (error) {
        console.error("Erro ao buscar o prontuário:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);



  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);



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

  const onSubmit = async (formData) => {
    try {
      const prontuario = {
        ...formData.prontuario,
        vaccination: formData.prontuario.vaccinations.map((vaccine) => ({
          id: vaccine.id || null,
          date: vaccine.date,
          name: vaccine.name,
          enchiridion_id: id,
        })),
        status_delete: false,
        animal_id: animalId,
        teacher_id: teacherId,
        id: enchiridionId
      };

      console.log(prontuario);
      await updateEnchiridion(prontuario);
      // setShowToast(true);
      alert("Prontuário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar o prontuário:", error.response ? error.response.data : error.message);
    }
  };

  const CustomInput = ({ label, name, control, defaultValue = "", required = false, type = "text" }) => (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div className="flex flex-col w-full">
          <label className="mb-2 text-gray-700 font-semibold">{label}</label>
          <input
            {...field}
            type={type}
            className={`w-full border-solid border-2 rounded-lg h-11 p-2 ${required ? "outline-red-600 border-red-500" : "outline-gray-input"}`}
          />
        </div>
      )}
    />
  );

  return (
    <div className="container flex p-20 ml-12 mt-8 flex-col font-Montserrat">
      {showToast && (
        <div className="animate-fadeIn absolute top-32 right-0 m-4">
          <div className="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700" role="alert" aria-labelledby="hs-toast-success-example-label">
            <div className="flex p-4">
              <div className="shrink-0">
                <svg className="shrink-0 size-4 text-teal-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
                </svg>
              </div>
              <div className="ms-3">
                <p id="hs-toast-success-example-label" className="text-sm text-gray-700 dark:text-neutral-400">
                  Prontuário atualizado com sucesso!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2 flex-grow">
        <h1 className="font-Montserrat h-10 font-bold text-2xl">Editar Prontuário</h1>

        <div className="flex flex-col gap-2">
          <h1 className="font-Montserrat font-semibold text-lg text-[#2C2C2C] mb-4">Informações de Identificação</h1>
          <Grid container spacing={2} rowSpacing={3} className="p-8">
            <Grid item xs={2}>
              <CustomInput label="Professor" name="teacher" control={control} />
            </Grid>
            <Grid item xs={2}>
              <CustomInput label="Paciente" name="animal.name" control={control} />
            </Grid>
            <Grid item xs={3}>
              <CustomInput label="Tutor" name="animal.tutor" control={control} />
            </Grid>
            <Grid item xs={2}>
              <CustomInput label="Data" name="prontuario.stringDate" control={control} />
            </Grid>
            <Grid item xs={3}>
              <CustomInput label="Espécie" name="animal.species" control={control} />
            </Grid>
            <Grid item xs={3}>
              <CustomInput label="Raça" name="animal.race" control={control} />
            </Grid>
            <Grid item xs={2}>
              <CustomInput label="Sexo" name="animal.gender" control={control} />
            </Grid>
            <Grid item xs={2}>
              <CustomInput label="Idade" name="animal.age" control={control} />
            </Grid>
            <Grid item xs={2}>
              <CustomInput label="Peso" name="prontuario.weight" control={control} />
            </Grid>
            <Grid item xs={2}>
              <CustomInput label="Pelagem" name="animal.coat" control={control} />
            </Grid>
          </Grid>
          <h1 className="font-Montserrat font-semibold text-lg text-[#2C2C2C] mb-4">Anamnese</h1>
          <div className="flex flex-col p-8">
            <CustomInput label="Motivo da Consulta" name="prontuario.reason_consult" control={control} />
            <CustomInput label="Histórico" name="prontuario.history" control={control} />
          </div>

          <h1 className="font-Montserrat font-semibold text-lg text-[#2C2C2C] mb-4">Vacinação</h1>
          <div className="flex flex-col p-8">
            {fields.map((vacina, index) => (
              <div key={vacina.id} className="flex flex-col mb-4">
                <CustomInput
                  label="Qual"
                  name={`prontuario.vaccinations[${index}].name`}
                  control={control}
                  defaultValue={vacina.name || ""}
                />
                <CustomInput
                  label="Data da última"
                  name={`prontuario.vaccinations[${index}].date`}
                  control={control}
                  defaultValue={vacina.date || ""}
                />

                <button type="button" onClick={() => remove(index)} className="mt-4 w-[100px] px-2 py-1 bg-[#dd3030]  text-white font-Montserrat  text-[15px]	rounded-[10px] transition-colors duration-300 ease-in-out hover:bg-[#702020]">Remover</button>
              </div>
            ))}
            <div className="flex justify-center items-center ">
              <button type="button" onClick={() => append({ name: '', date: '' })} className="mt-4 w-[210px] px-6 py-2 bg-[#D5D0C7]  text-white font-Montserrat font-semibold text-[15px] 	rounded-[10px] transition-colors duration-300 ease-in-out hover:bg-[#007448]"  >Adicionar Vacinação</button>
            </div>
          </div>

          <h1 className="font-Montserrat font-semibold text-lg text-[#2C2C2C] mb-4">Desverminação</h1>
          <div className="flex flex-col p-8">
            <CustomInput label="Desverminação" name="prontuario.deworming" control={control} />
            <CustomInput label="Data" name="prontuario.date_deworming" control={control} />
          </div>

          <h1 className="font-Montserrat font-semibold text-lg text-[#2C2C2C] mb-4">Exame Físico</h1>
          <Grid container spacing={2} rowSpacing={3} className="p-8">
            <Grid item xs={3}>
              <CustomInput label="Temperatura" name="prontuario.temperature" control={control} />
            </Grid>
            <Grid item xs={3}>
              <CustomInput label="Frequência Cardíaca" name="prontuario.frequency_cardiac" control={control} />
            </Grid>
            <Grid item xs={3}>
              <CustomInput label="Frequência Respiratória" name="prontuario.frequency_respiratory" control={control} />
            </Grid>
            <Grid item xs={3}>
              <CustomInput label="Linfônodos" name="prontuario.lymph_node" control={control} />
            </Grid>
          </Grid>
          <Grid container spacing={2} rowSpacing={3} className="p-8">
            <Grid item xs={3}>
              <CustomInput label="Grau de desidratação estimadoo" name="prontuario.dehydration" control={control} />
            </Grid>
            <Grid item xs={3}>
              <CustomInput label="Mucosas Tipo" name="prontuario.type_mucous" control={control} />
            </Grid>
            <Grid item xs={3}>
              <CustomInput label="Mucosas Qual" name="prontuario.whats_mucous" control={control} />
            </Grid>
          </Grid>

          <h1 className="font-Montserrat font-semibold text-lg text-[#2C2C2C] mb-4">Avaliação dos Sistemas</h1>
          <Grid container spacing={2} rowSpacing={3} className="p-8">
            <Grid item xs={3}>
              <CustomInput label="Pele e anexos" name="prontuario.skin_annex" control={control} />
            </Grid>
            <Grid item xs={3}>
              <CustomInput label="Sistema Circulatório" name="prontuario.system_circulatory" control={control} />
            </Grid>
            <Grid item xs={3}>
              <CustomInput label="Sistema Respiratório" name="prontuario.system_respiratory" control={control} />
            </Grid>
            <Grid item xs={3}>
              <CustomInput label="Sistema Digestivo" name="prontuario.system_digestive" control={control} />
            </Grid>
            <Grid item xs={3}>
              <CustomInput label="Sistema Locomotor" name="prontuario.system_locomotor" control={control} />
            </Grid>
            <Grid item xs={3}>
              <CustomInput label="Sistema Nervoso" name="prontuario.system_nervous" control={control} />
            </Grid>
            <Grid item xs={3}>
              <CustomInput label="Sistema Geniturinário" name="prontuario.system_genitourinary" control={control} />
            </Grid>
            <Grid item xs={3}>
              <CustomInput label="Outros" name="prontuario.others" control={control} />
            </Grid>
          </Grid>

          <h1 className="font-Montserrat font-semibold text-lg text-[#2C2C2C] mb-4">Exames Complementares</h1>
          <div className="flex flex-col p-8">
            <CustomInput label="Exames Complementares" name="prontuario.complementary_exams" control={control} />
          </div>

          <h1 className="font-Montserrat font-semibold text-lg text-[#2C2C2C] mb-4">Diagnóstico e Tratamentos</h1>
          <div className="flex flex-col p-8">
            <CustomInput label="Diagnóstico" name="prontuario.diagnosis" control={control} />
            <CustomInput label="Tratamentos" name="prontuario.trataments" control={control} />
          </div>

          <h1 className="font-Montserrat font-semibold text-lg text-[#2C2C2C] mb-4">Observações</h1>
          <div className="flex flex-col p-8">
            <CustomInput label="Observações" name="prontuario.observations" control={control} />
          </div>

          <div className="flex justify-end mb-4 mt-8">
            <button
              className="mt-4 w-[216px] px-6 py-2 bg-[#D5D0C7]  text-white font-Montserrat font-semibold text-lg 	rounded-[10px] transition-colors duration-300 ease-in-out hover:bg-[#007448]"
              style={{ width: '216px' }}
              onClick={handleSubmit(onSubmit)}
            >
              Salvar alterações
            </button>
          </div>



        </div>
      </div>
    </div>
  );
}