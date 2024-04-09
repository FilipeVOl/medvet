import Header from './Component/Header'
import Navbar from './Component/Navbar'
import Cadastro from './Component/Cadastro'

function App() {

  return (
    <>
        <Header />
        <div className='separador flex'>
        <Navbar />
        <Cadastro />
        </div>
    </>
  )
}

export default App
