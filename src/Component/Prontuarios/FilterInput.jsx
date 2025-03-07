
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";

export default function FilterInput(props) {
  return (
    <section className="w-full flex items-center bg-gray-50 border border-gray-300 rounded-lg mr-16 p-2 relative">
      <SearchIcon
        sx={{
          color: "gray",
          fontSize: "20px",
          marginRight: "8px"
        }}
      />
      <input 
        type={props.type} 
        id="simple-search" 
        className="w-full text-gray-900 text-sm rounded-lg outline-none bg-transparent pl-2"
        placeholder={props.placeHolder} 
        required
        value={props.valueInput}
        onChange={(e) => {
          props.handleFilter(e.target.value);
        }} 
      />
    </section>
  )
}

FilterInput.propTypes = {
  placeHolder: PropTypes.string.isRequired,
  valueInput: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
}