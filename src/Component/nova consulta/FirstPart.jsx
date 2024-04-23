import professores from "../../mocks/professores.mock"
import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import "./firstPart.css";
export default function FirstPart() {
  const [selectedTeacher, setSelectedTeacher] = useState('');
    return (
        <div className="font-Montserrat p-28">
          <div className="font-bold">
            <h1 className="text-[30px]">Identificação</h1>
          </div>
          <div>
          <form action="" className="text-[18px]">
            <div className="py-8 w-full" >
              <div className="flex gap-8">
                <label htmlFor="free-solo-2-demo" className="w-full">Professor
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    options={professores}
                    getOptionLabel={(teacher) => teacher.name}
                    value={selectedTeacher}
                    onChange={((e) => setSelectedTeacher(e.target.value))}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  </label>
                <label htmlFor="">Data
                  <input type="date" className={'w-full border-[1px] order-border-gray justify-self-end rounded-lg h-10 p-1'}/>
                </label>
              </div>
              <label htmlFor="">Paciente
                <input type="text" className={'w-full border-[1px] order-border-gray'}/>
              </label>
              <label htmlFor="">Tutor
                <input type="text" className={'w-full border-[1px] order-border-gray'}/>
              </label>
              <label htmlFor="">Espécie
                <input type="text" className={'w-full border-[1px] order-border-gray'}/>
              </label>
              <label htmlFor="">Raça
                <input type="text" className={'w-full border-[1px] order-border-gray'}/>
              </label>
              <label htmlFor="">Sexo
                <input type="text" className={'w-full border-[1px] order-border-gray'}/>
              </label>
              <label htmlFor="">Idade
                <input type="text" className={'w-full border-[1px] order-border-gray'}/>
              </label>
              <label htmlFor="">Peso
                <input type="text" className={'w-full border-[1px] order-border-gray'}/>
              </label>
              <label htmlFor="">Pelagem
                <input type="text" className={'w-full border-[1px] order-border-gray'}/>
              </label>
            </div>
            <div>
              <label htmlFor="motivo">
                Motivo da Consulta
                <textarea id="motivo" name="motivo" rows="5" cols="33" className="resize-none">
                </textarea>
              </label>
              <label htmlFor="historico" >
                Histórico
                <textarea id="historico" name="historico" rows="5" cols="33" className="resize-none">
                </textarea>
              </label>
            </div>
            <div>
              <h1>Vacinação</h1>
              <label htmlFor="">Qual
                <input type="text" name="vacina1" id="vacina1" />
              </label>
              <label htmlFor="">Data da Última
                <input type="date" name="data1" id="data1" />
              </label>
              <label htmlFor="">Qual
                <input type="text" name="vacina2" id="vacina2" />
              </label>
              <label htmlFor="">Data da Última
                <input type="date" name="data2" id="data2" />
              </label>
            </div>
            <button type="button">Próximo</button>
          </form>
          </div>
        </div>
    )
}