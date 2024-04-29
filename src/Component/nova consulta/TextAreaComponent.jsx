import PropTypes from "prop-types";

export default function TextAreaComponent(props) {
  return (
    <div className="my-8">
      <label htmlFor={props.id} className="grow mx-8 my-8">
        {props.id}
        <textarea
          id={props.id} name={props.id} rows="3" cols="25" className="w-full border-solid border-2 order-border-gray rounded-lg p-1 resize-none"
          value={props.value}
          onChange={((e) => props.setSomething(e.target.value))}></textarea>
      </label>
    </div>
  )
}

TextAreaComponent.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setSomething: PropTypes.func.isRequired,
};