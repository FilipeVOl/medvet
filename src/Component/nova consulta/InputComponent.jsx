import PropTypes from "prop-types";

export default function InputComponent(props) {
  return (
    <label className="grow" htmlFor="">{props.nome}
      <input id={props.id} placeholder={props.place} type={props.dataType} value={props.type} className={'w-full border-solid border-2 border-gray rounded-lg h-10 p-1'} onChange={((e) => props.setDataCom(e.target.value))} />
    </label>
  )
}

InputComponent.propTypes = {
  nome: PropTypes.string.isRequired,
  dataType: PropTypes.string.isRequired,
  setDataCom: PropTypes.func.isRequired,
  place: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
};