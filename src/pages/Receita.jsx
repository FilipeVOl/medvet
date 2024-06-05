import { useContext, useState, useEffect } from "react";
import { Input, InputLabel } from "@mui/material";
import AddIcon from "../assets/add.svg";
import { PrescContext } from "../contexts/prescContext";

export const InputReceita = ({
  label,
  setter,
  value,
  descrValue,
  requireVal,
  handleButton,
}) => {
  const handleChanges = (e) => {
    setter(e.target.value);
  };

  return (
    <div className="flex flex-col mb-4">
      <InputLabel className="ml-4">{label}</InputLabel>
      <Input
        type="text"
        onChange={handleChanges}
        onClick={() => handleButton(descrValue)}
        value={value}
        className={`${
          requireVal ? "outline-red-600 border-red-500" : "outline-gray-input"
        } border rounded-md h-[46px] p-2 text-base border-border-gray`}
      />
    </div>
  );
};

export const Receita = () => {
  const { page, setPage } = useContext(PrescContext);
  const { medicamentos, setMedicamentos } = useContext(PrescContext);
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
  const [required, setRequired] = useState({
    paciente: false,
    tutor: false,
    species: false,
    raca: false,
    sexo: false,
    idade: false,
    peso: false,
    id: false,
    unidade: false,
    medicacao: false,
    descricao: false,
  });

  const fullfillValidate = {
    paciente,
    tutor,
    species,
    raca, 
    sexo,
    idade,
    peso, 
    id,
    unidade,
    medicacao,
    descricao,
  }

  const validateTrue = (chaves) => {
    let obj = { ...required };
    const keys = Object.keys(obj);
    keys.forEach((e) => {
      if (e == chaves) {
        obj[e] = false;
      }
    });
    setRequired(obj);
  };

  const validateInputs = () => {
    const keys = Object.keys(fullfillValidate)
    const values = Object.values(fullfillValidate)
    let validation = false
    let obj = { ...required }
    values.map((e, index) => {
      if (e == '') {
        const chaves = keys[index]
        obj[chaves] = true;
        validation = true
      }
    })
    setRequired(obj)
    return validation
  }

  const addMedicamento = () => {
    const array = [...medicamentos];
    const obj = {
      uso: "",
      farmacia: "",
      unidade: "",
      medicacao: "",
      descricao: "",
    };
    array.push(obj);
    setMedicamentos(array);
  };

  const handleMedicamento = (arr, index, valor, key) => {
    const array = [...arr];
    array[index] = { ...array[index], [key]: valor };
    setMedicamentos(array);
  };

  useEffect(() => {
  }, [medicamentos]);

  // const InputAutocomplete = ({ tutors }) => {
  //   return (
  //     <div>
  //       <input list="tutors" />
  //       <datalist id="tutors">
  //         {tutors.map((tutor, index) => (
  //           <option key={index} value={tutor.name} />
  //         ))}
  //       </datalist>
  //     </div>
  //       )

  const handleSubmit = () => {
    const validacaoCampos = validateInputs()
    if (validacaoCampos) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      return
    }

    let isEmpty = false;

    medicamentos.forEach((medicamento, index) => {
      Object.entries(medicamento).forEach(([key, value]) => {
        if (!value) {
          isEmpty = false;
          console.log(`O campo ${key} do medicamento ${index + 1} está vazio`);
        }
      });
    });

    if (isEmpty) {
      return;
    }
    const data = {
      paciente,
      tutor,
      species,
      raca,
      sexo,
      idade,
      peso,
      id,
      medicamentos,
    };
  };

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
            descrValue="paciente"
            requireVal={required.paciente}
            handleButton={validateTrue}
          />

          <InputReceita
            label="Tutor"
            setter={setTutor}
            value={tutor}
            descrValue="tutor"
            requireVal={required.tutor}
            handleButton={validateTrue}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <InputReceita
            label="Espécie"
            setter={setSpecies}
            value={species}
            descrValue="species"
            requireVal={required.species}
            handleButton={validateTrue}
          />
          <InputReceita
            label="Raça"
            setter={setRaca}
            value={raca}
            descrValue="raca"
            requireVal={required.raca}
            handleButton={validateTrue}
          />
          <InputReceita
            label="Sexo"
            setter={setSexo}
            value={sexo}
            descrValue="sexo"
            requireVal={required.sexo}
            handleButton={validateTrue}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 w-3/4">
          <InputReceita
            label="Idade"
            setter={setIdade}
            value={idade}
            descrValue="idade"
            requireVal={required.idade}
            handleButton={validateTrue}
          />
          <InputReceita
            label="Peso"
            setter={setPeso}
            value={peso}
            descrValue="peso"
            requireVal={required.peso}
            handleButton={validateTrue}
          />
          <InputReceita
            label="ID"
            setter={setId}
            value={id}
            descrValue="id"
            requireVal={required.id}
            handleButton={validateTrue}
          />
        </div>
      </form>

      <p className="text-xl px-20 py-8">Medicação</p>
      <div>
        {medicamentos.map((e, index) => {
          return (
            <form
              key={index}
              className="px-24 w-auto mb-20 border-2 mx-8 py-8 flex flex-col gap-4"
            >
              <div className="grid grid-cols-3 gap-10">
                <label>
                  Uso
                  <select
                    value={e.uso}
                    onChange={(e) =>
                      handleMedicamento(
                        medicamentos,
                        index,
                        e.target.value,
                        "uso"
                      )
                    }
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
                </label>

                <label>
                  Farmácia
                  <select
                    value={e.farmacia}
                    onChange={(e) =>
                      handleMedicamento(
                        medicamentos,
                        index,
                        e.target.value,
                        "farmacia"
                      )
                    }
                    className="border flex-col grow flex w-full rounded-md h-[46px] p-2 text-base border-border-gray"
                  >
                    <option value="farmacia1">Farmacia 1</option>
                    <option value="farmacia 2">Farmacia 2</option>
                  </select>
                </label>

                <label>
                  Unidade (qt.)
                  <input
                    value={e.unidade}
                    onClick={() => validateTrue("unidade")}
                    onChange={(e) =>
                      handleMedicamento(
                        medicamentos,
                        index,
                        e.target.value,
                        "unidade"
                      )
                    }
                    className={`${
                      required.unidade
                        ? "outline-red-600 border-red-500"
                        : "outline-gray-input"
                    } border rounded-md h-[46px] w-full p-2 text-base border-border-gray`}
                  ></input>
                </label>
              </div>

              <div>
                <label>
                  Medicação
                  <input
                    label="Medicação"
                    value={e.medicacao}
                    onClick={() => validateTrue("medicacao")}
                    onChange={(e) =>
                      handleMedicamento(
                        medicamentos,
                        index,
                        e.target.value,
                        "medicacao"
                      )
                    }
                    className={`${
                      required.medicacao
                        ? "outline-red-600 border-red-500"
                        : "outline-gray-input"
                    } border rounded-md h-[46px] w-full p-2 text-base border-border-gray`}
                  ></input>
                </label>
              </div>

              <div>
                <label>
                  Descrição (Posologia)
                  <input
                    value={e.descricao}
                    onClick={() => validateTrue("descricao")}
                    onChange={(e) =>
                      handleMedicamento(
                        medicamentos,
                        index,
                        e.target.value,
                        "descricao"
                      )
                    }
                    className={`${
                      required.descricao
                        ? "outline-red-600 border-red-500"
                        : "outline-gray-input"
                    } border rounded-md h-[46px] w-full p-2 text-base border-border-gray`}                  ></input>
                </label>
              </div>
            </form>
          );
        })}
      </div>

      <div className="mx-24">
        <button
          onClick={() => addMedicamento()}
          className="font-bold text-nowrap mt-12 w-full justify-center bg-primary text-white flex items-center 
          rounded-md h-[46px] bg-gray-button border-2
        p-2 text-base"
        >
          <img src={AddIcon} alt="adicionar medicamento" />
          Adicionar Medicamento
        </button>
      </div>

      <div className="flex justify-end w-auto mr-24 mb-8">
        <button
          onClick={() => handleSubmit()}
          className="rounded-md h-[46px] mt-8 w-1/4 border-2 text-center bg-border-blue text-white font-bold"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

// InputLabel.propTypes = {

// }

export default Receita;
