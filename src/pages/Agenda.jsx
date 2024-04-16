import agendas from '../mocks/agenda.mock'
import iconSearch from '../images/icon-search.png'
export default function Agenda() {
  function transData(dateString) {
    const day = dateString.toString().substring(0, 2);
    const month = dateString.toString().substring(2, 4);
    const year = dateString.toString().substring(4);
    return `${day}/${month}/${year}`
  }
  return (
    <main className="font-Montserrat">
      <section>
        <h1 className="text-2xl font-bold m-16">Agendamentos</h1>
      </section>
      <section>
      <div className="relative w-full mx-24">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <img src={iconSearch}/>
          </div>
          <input type="text" id="simple-search" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por data" required />
      </div>
      </section>
      <section className='mx-24'>
          <ol>
          {agendas.map((dados) => {
            const chave = Object.keys(dados);
            return (
              <div key = {chave} className="m-12 pr-20">
                <h2 className="text-5x1">{transData(chave)}</h2>
                {dados[chave].map((e) => {
                  return (
                    <div className='flex flex-col bg-side-gray my-4 p-2 rounded-lg pr-96'>
                      <span className='justify-self-start bg-red-400'>oi</span>
                      <span className="m-2"key={e[0]}>{e[0]}</span>
                      <span className="m-2"key={e[1]}>{e[1]}</span>
                      <span className="m-2"key={e[2]}>{e[2]}</span>
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