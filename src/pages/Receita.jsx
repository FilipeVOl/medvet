import React, { useState } from "react";
import { Input, InputLabel } from "@mui/material";
import AddIcon from "../assets/add.svg";

const InputReceita = ({ label, setter, value }) => {
  const handleChanges = (e) => {
    setter(e.target.value);
  };
  return (
    <div className="flex flex-col mb-4">
      <InputLabel className="ml-4">{label}</InputLabel>
      <Input
        type="text"
        onChange={handleChanges}
        value={value}
        className="border rounded-md h-[46px] p-2 text-base border-border-gray"
      />
    </div>
  );
};

const Receita = () => {
  const [paciente, setPaciente] = useState("");
  const [tutor, setTutor] = useState("");
  const [species, setSpecies] = useState("");
  const [raca, setRaca] = useState("");
  const [sexo, setSexo] = useState("");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [id, setId] = useState("");
  const [uso, setUso] = useState("");
  const [farmacia, setFarmacia] = useState("");
  const [unidade, setUnidade] = useState("");
  const [medicacao, setMedicacao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [medicamentos, setMedicamentos] = useState([]);

  return (
    <div className="font-Montserrat">
      <h1 className="p-14 h-10 text-2xl font-bold">Receita</h1>
      <p className="text-xl px-20 py-8">Identificação</p>
      <form className="px-24">
        <div className="grid grid-cols-2 gap-4">
          <InputReceita
            label="Paciente"
            setter={setPaciente}
            value={paciente}
          />
          <InputReceita label="Tutor" setter={setPaciente} value={paciente} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <InputReceita label="Espécie" setter={setSpecies} value={species} />
          <InputReceita label="Raça" setter={setRaca} value={raca} />
          <InputReceita label="Sexo" setter={setSexo} value={sexo} />
        </div>
        <div className="grid grid-cols-3 gap-4 w-3/4">
          <InputReceita label="Idade" setter={setIdade} value={idade} />
          <InputReceita label="Peso" setter={setPeso} value={peso} />
          <InputReceita label="ID" setter={setId} value={id} />
        </div>
      </form>

      <p className="text-xl px-20 py-8">Medicação</p>
      {medicamentos.map((e, index) => {
        return (
          <form className="px-24 w-auto mb-20">
            <div className="grid grid-cols-3 gap-10">
              <InputLabel>
                Uso
                <select
                  value={uso}
                  onChange={(e) => setUso(e.target.value)}
                  className="border flex-col flex w-full rounded-md h-[46px] grow p-2 text-base border-border-gray"
                >
                  <option value="oral">Oral</option>
                  <option value="retal">Retal</option>
                  <option value="sublingual">Sublingual</option>
                  <option value="injetavel">Injetável</option>
                  <option value="dermatologico">Dermatológico</option>
                  <option value="nasal">Nasal</option>
                  <option value="oftalmologico">Oftalmológico</option>
                </select>
              </InputLabel>

              <InputLabel>
                Farmácia
                <select
                  value={farmacia}
                  onChange={(e) => setFarmacia(e.target.value)}
                  className="border flex-col grow flex w-full rounded-md h-[46px] p-2 text-base border-border-gray"
                >
                  <option value="farmacia1">Farmacia 1</option>
                  <option value="farmacia 2">Farmacia 2</option>
                </select>
              </InputLabel>

              <InputReceita
                label="Unidade (qt.)"
                setter={setUnidade}
                value={unidade}
                className="border rounded-md h-[46px] w-auto p-2 text-base border-border-gray"
              ></InputReceita>
            </div>

            <div>
              <InputReceita
                label="Medicação"
                setter={setMedicacao}
                value={medicacao}
                className="border rounded-md h-[46px] p-2 text-base border-border-gray"
              ></InputReceita>
            </div>

            <div>
              <InputReceita
                label="Descrição (Posologia)"
                setter={setDescricao}
                value={descricao}
                className="border rounded-md h-[46px] p-2 text-base border-border-gray"
              ></InputReceita>
            </div>
          </form>
        );
      })}

      <div>
        <button
          className="font-bold text-nowrap mt-12 w-full justify-center bg-primary text-white flex items-center 
          rounded-md h-[46px] bg-gray-button border-2
        p-2 text-base"
        >
          <img src={AddIcon} alt="adicionar medicamento" />
          Adicionar Medicamento
        </button>
      </div>

      <div className="flex justify-end">
        <button className="rounded-md h-[46px] mt-8 w-1/4 border-2 text-center bg-border-blue text-white font-bold">
          Confirmar
        </button>
      </div>
    </div>
  );
};

// InputLabel.propTypes = {

// }

export default Receita;
