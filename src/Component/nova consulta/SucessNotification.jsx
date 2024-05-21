export default function SucessNotification(props) {
    const [ative, setAtive] = props.status
    setTimeout(() => {
        setAtive(null)
      }, 3000); 
  return (
    <div className={`display = ${ative}`}>
        Cadastrado Com Sucesso
    </div>
  )
}