import { useState, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import { Input, InputLabel, TextField } from "@mui/material";
import z, { set } from "zod";
import { postTutor, PutTutor } from "../services/tutores";
import { UpdateEditContext } from "../contexts/updateEditContext";

const InputTutor = ({ label, type, setter, value }) => {
  const handleChange = useCallback(
    (e) => {
      setter(e.target.value);
    },
    [setter]
  );

  return (
    <div className="flex flex-col mb-4">
      <InputLabel className="ml-4" htmlFor={label}>
        {label}
      </InputLabel>
      <Input
        type={type}
        value={value}
        onChange={handleChange}
        className={`${
          value === "" ? "border-[#FF0000]" : "border-[#848484]"
        }  border rounded-lg h-[40px] p-2 text-base`}
      />
    </div>
  );
};

const TelaNovoTutor = (props) => {
  const { selectedUser, setSelectedUser } = useContext(UpdateEditContext);
  const { openEdit, setOpenEdit } = useContext(UpdateEditContext);
  const { openNew, setOpenNew } = useContext(UpdateEditContext);
  const [name, setNome] = useState(selectedUser ? selectedUser.name : "");
  const [phone, setPhone] = useState(selectedUser ? selectedUser.phone : "");
  const [cpf, setCpf] = useState(selectedUser ? selectedUser.cpf : "");
  const [email, setEmail] = useState(selectedUser ? selectedUser.email : "");
  const [password, setPassword] = useState(
    selectedUser ? selectedUser.password : ""
  );
  const [phoneWMask, setMask] = useState(
    selectedUser ? selectedUser.phone : ""
  );
  const [adress, setAddress] = useState("");
  const [id, setId] = useState(selectedUser ? selectedUser.id : "");

  const ConsultaSchema = z.object({
    name: z.string().min(1),
    phone: z.string().min(1),
    password: z.string().min(1),
    cpf: z.string().min(0),
    email: z.string().min(0),
    id: z.string().min(0),
    adress: z.string().min(0),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const consulta = ConsultaSchema.parse({
        name,
        phone: phoneUnmask(phoneWMask),
        password: "jello",
        cpf,
        email,
        id: id,
        adress,
      });
      if (selectedUser == null) {
        console.log(selectedUser);
        postTutor(consulta);
        setOpenNew(!openNew);
        // window.location.reload();
      } else {
        PutTutor(consulta);
        setOpenEdit(!openEdit);
      }
    } catch (error) {
      console.error(error.errors);
      console.log(selectedUser);
    }
  };

  const phoneMask = (e) => {
    return e
      .replace(/\D/g, "")
      .replace(/^(\d{2})(9\d{4})/, "($1)$2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  const phoneUnmask = (value) => {
    return value.replace(/\D/g, "").replace(/^(\d{2})(9\d{8})$/, "$1$2");
  };

  const handlePhone = (e) => {
    if (e.target.value.length < 15) {
      setPhone(e.target.value);
      setMask(e.target.value);
    }
  };

  return (
    <div className="p-14 w-full h-auto">
      <h1 className="font-Montserrat text-2xl font-bold mt-2">Novo tutor</h1>
      <form>
        <div className="pt-12 ml-4 w-auto">
          <div className="gap-8 flex flex-col sm:grid sm:grid-cols-[2fr_1fr] md:gap-[10%]">
            <InputTutor
              label="Nome"
              type="text"
              setter={setNome}
              value={name}
            />
            <div className="flex flex-col mb-4">
              <label className="ml-4">
                Telefone
                <input
                  type="text"
                  onChange={handlePhone}
                  value={phoneMask(phone)}
                  className={` ${
                    phone === "" ? "border-[#FF0000]" : "border-[#848484]"
                  } 
                border rounded-md h-[40px] p-2 text-base`}
                />
              </label>
            </div>
          </div>
          <div className="gap-8 flex flex-col sm:grid sm:grid-cols-[1fr_1fr] md:gap-[10%]">
            <InputTutor label="CPF" type="text" setter={setCpf} value={cpf} />
            <InputTutor
              label="Email"
              type="email"
              setter={setEmail}
              value={email}
            />
          </div>
        </div>
        <div className="flex justify-end ml-4 mt-8">
          <button
            onClick={handleSubmit}
            className={`${
              !handleSubmit ? "cursor-not-allowed opacity-25 disabled" : ""
            } font-Montserrat border-border-blue border-2 w-52 rounded-md h-10 mt-36 bg-border-blue text-white`}
          >
            {props.buttonName}
          </button>
        </div>
      </form>
    </div>
  );
};

InputTutor.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isBig: PropTypes.bool,
  setter: PropTypes.func.isRequired,
  setter2: PropTypes.func,
  value: PropTypes.string.isRequired,
};

export default TelaNovoTutor;
