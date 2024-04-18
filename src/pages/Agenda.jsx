import agendas from '../mocks/agenda.mock'
import iconSearch from '../images/icon-search.png'
export default function Agenda() {
  function transData(dateString) {
    const day = dateString.toString().substring(0, 2);
    const month = dateString.toString().substring(2, 4);
    const year = dateString.toString().substring(4);
    const a = `${day}/${month}/${year}`
    return a
  }
  const phoneMask = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };
  return (
    <main className="font-Montserrat !important">
      <section>
        <h1 className="text-2xl font-bold m-16">Agendamentos</h1>
      </section>
      <section>
      <div className="relative w-full mx-24">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <img src={iconSearch}/>
          </div>
          <input type="text" id="simple-search" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-3/12" placeholder="Buscar por data" required />
      </div>
      </section>
      <section className='mx-24'>
          <ol>
          {agendas.map((dados) => {
            const chave = Object.keys(dados);
            return (
              <div key = {chave} className="m-12 pr-20 max-w-4xl">
                <h2 className="text-2xl pr-0 text-text-gray font-semibold">{transData(chave)}</h2>
                {dados[chave].map((e) => {
                  return (
                    <div key={e}className='flex bg-side-gray my-4 rounded-lg ml-4'>
                      <div className='bg-card-green m-0 text-transparent  rounded-lg'>a</div>
                      <div className='flex flex-col p-4'>
                        <div className='m-2'>
                          <span>Tutor:  <span className="font-bold pl-1">{e.Paciente}</span></span>
                          <span>, {e.Especie}</span>
                        </div>
                        <div className='m-2'>
                          <span className="ml-0 pr-1">Paciente:  <span className="font-bold pl-1">{e.Tutor}</span></span>
                          <span className="ml-0 pl-1">{`- ${phoneMask(e.N)}`}</span>
                        </div>
                        <span className="m-2">{`Observações: ${e.Observacoes}`}</span>
                        </div>
                    </div>
                  )
                })}
              </div>
            )
          }
          )}
          </ol>

      </section>
    </main>
  )
  }