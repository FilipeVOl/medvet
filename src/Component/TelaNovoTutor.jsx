import PropTypes from "prop-types";

const TelaNovoTutor = () => {
  const InputConsulta = ({ label, type, isBig }) => {
    return (
      <div className="flex flex-col mb-4">
        <label className="ml-4" htmlFor={label}>
          {label}
        </label>
        <input
          type={type}
          className={`${
            isBig ? "w-[320px]" : "w-[220px]"
          }  border border-[#848484] rounded-[10px] h-[46px] p-2 text-base`}
        />
      </div>
    );
  };

  const InputTutor = ({ label, type, isBig }) => {
    return (
      <div className="flex flex-col mb-4">
        <label className="ml-4" htmlFor={label}>
          {label}
        </label>
        <input
          type={type}
          className={`${
            isBig ? "w-[490px]" : "w-[290px]"
          }  border border-[#848484] rounded-[10px] h-[46px] p-2 text-base`}
        />
      </div>
    );
  };
  return (
    <>
      <div className="flex flex-col p-16">
        <h1 className=" text-2xl font-bold">Agendar Consulta</h1>
        <form>
          <div className="pt-12 ml-4">
            <div className="flex gap-8">
              <InputConsulta label="Paciente" type="text" isBig />
              <InputConsulta label="Raça" type="text" />
              <InputConsulta label="Sexo" type="text" />
            </div>
            <div className="flex gap-8">
              <InputConsulta label="Data" type="text" />
              <InputConsulta label="Hora" type="text" />
              <InputConsulta label="Contato" type="text" isBig />
            </div>
          </div>
        </form>
        <h1 className=" text-2xl font-bold mt-2">Novo tutor</h1>
        <form>
          <div className="pt-12 ml-4">
            <div className="flex gap-11">
              <InputTutor label="Nome" type="text" isBig />
              <InputTutor label="CPF" type="text" />
            </div>
            <div className="flex gap-11">
              <InputTutor label="Email" type="text" />
              <InputTutor label="Telefone" type="text" isBig />
            </div>
            <div>
              <label className="ml-4" htmlFor="obs">
                Observação
              </label>
              <textarea className="border border-[#848484] rounded-[10px] h-[92px] p-2 text-base w-full resize-none" />
            </div>
          </div>
        </form>
        <div className="justify-between flex ml-4 mt-8">
          <button className="bg-white border border-[#848484] text-black font-bold rounded-[10px] h-[46px] w-[220px]">
            Voltar
          </button>
          <button className="bg-[#100F49] text-white font-bold rounded-[10px] h-[46px] w-[220px]">
            Confirmar
          </button>
        </div>
      </div>
    </>
  );
};

TelaNovoTutor.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  isBig: PropTypes.bool,
}

export default TelaNovoTutor;
