import agendas from '../mocks/agenda.mock'
import iconSearch from '../images/icon-search.png'
export default function Agenda() {
  return (
    <main>
      <section>
        <h1 className="text-2xl font-bold m-16">Agendamentos</h1>
      </section>
      <section>
      <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <img src={iconSearch}/>
          </div>
          <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por data" required />
      </div>
          <button type="button">Ver Calendário</button>
      </section>
      <section>
          <ol>
          {agendas.map((dados) => {
            const chave = Object.keys(dados);
            //ajeitar visualização
            return (
              <div key = {chave}>
                <h2>{chave}</h2>
                {dados[chave].map((e) => (
                  <p key = {e}>{e}</p>
                ))}
              </div>
            )
          }
          )}
          </ol>
      </section>
    </main>
  )
  }