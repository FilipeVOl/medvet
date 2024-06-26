import PropTypes from "prop-types";

export default function InputComponent(props) {
  return (
    <label className="grow" htmlFor="">{props.nome}
      <input id={props.id} placeholder={props.place} type={props.dataType} value={props.type} 
      onClick={ () => props.handleButton(props.descrHandle)}
      className={`${props.requireVal
        ? "outline-red-600 border-red-500"
        : "outline-gray-input"
      } w-full border-solid border-2 border-gray rounded-lg h-11 p-2`} 
      onChange={((e) => props.setDataCom(e.target.value))} disabled={props.disable}/>
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
  requireVal: PropTypes.bool,
  handleButton: PropTypes.func,
  descrHandle: PropTypes.string,
  disable: PropTypes.bool,
};