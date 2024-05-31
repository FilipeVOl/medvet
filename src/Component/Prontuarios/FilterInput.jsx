import searchIcon from '../../images/searchIcon.svg'
import PropTypes from "prop-types";

export default function FilterInput(props) {
  return (
    <section className="w-full flex bg-gray-50 border border-gray-300 rounded-lg mr-16 p-1">
      <img src={searchIcon} className='p-2'/>
      <input type="text" id="simple-search" className="w-full text-gray-900 text-sm rounded-lg"
        placeholder={props.placeHolder} required
        onChange={(e) => {
          props.handleFilter(e.target.value);
        }} />
    </section>
  )
}

FilterInput.propTypes = {
  placeHolder: PropTypes.string.isRequired,
  valueInput: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
}