import { Autocomplete, TextField } from "@mui/material";
import PropTypes from "prop-types";

const TutorSelector = ({ tutores, onTutorSelect, selectedTutor }) => {
  return (
    <div className="w-full">
      <Autocomplete
        options={tutores}
        getOptionLabel={(option) => 
          `${option.name} - Tel: ${option.phone} (Cadastro: ${option.sequence})`
        }
        value={selectedTutor}
        onChange={(_event, newValue) => {
          console.log("Selected tutor:", newValue);
          onTutorSelect(newValue);
        }}
        renderOption={(props, option) => (
          <li {...props} className="p-4 hover:bg-[#f0f7f4] transition-colors duration-150">
            <div className="flex flex-col">
              <div className="font-medium text-lg text-[#144A36]">{option.name}</div>
              <div className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Tel:</span> {option.phone}
                <span className="mx-2">•</span>
                <span className="font-medium">Cadastro:</span> {option.sequence}
              </div>
            </div>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Selecione um tutor"
            sx={{
              backgroundColor: 'white',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                fontFamily: 'Montserrat',
                padding: '4px 12px',
                '& fieldset': { 
                  borderColor: '#9F9F9F',
                  borderWidth: '1px',
                  borderRadius: '8px'
                },
                '&:hover fieldset': { 
                  borderColor: '#144A36',
                  borderWidth: '1px'
                },
                '&.Mui-focused fieldset': { 
                  borderColor: '#144A36',
                  borderWidth: '2px'
                }
              },
              '& .MuiInputLabel-root': {
                fontFamily: 'Montserrat',
                color: '#666',
                '&.Mui-focused': {
                  color: '#144A36',
                  fontWeight: '500'
                }
              },
              '& .MuiAutocomplete-input': {
                padding: '8px 4px !important',
                fontSize: '1rem',
                textAlign: 'center',
                '&::placeholder': {
                  color: '#9F9F9F',
                  opacity: 0.7
                }
              }
            }}
          />
        )}
        sx={{
          '& .MuiAutocomplete-listbox': {
            padding: '4px',
            '& .MuiAutocomplete-option': {
              margin: '4px',
              borderRadius: '6px',
              '&[aria-selected="true"]': {
                backgroundColor: '#144A36',
                color: 'white'
              },
              '&.Mui-focused': {
                backgroundColor: '#e8f5e9'
              }
            }
          },
          '& .MuiPaper-root': {
            borderRadius: '8px',
            marginTop: '4px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }
        }}
        ListboxProps={{
          style: { 
            maxHeight: '300px',
            padding: '8px'
          }
        }}
      />
    </div>
  );
};

TutorSelector.propTypes = {
  tutores: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      phone: PropTypes.string,
    })
  ).isRequired,
  onTutorSelect: PropTypes.func.isRequired,
  selectedTutor: PropTypes.object,
};

export default TutorSelector;