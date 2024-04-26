import FirstPart from "../Component/nova consulta/FirstPart"
import { ConsultProvider } from "../contexts/consultContext";

export default function NovaConsulta() {
    return (
      <ConsultProvider>
        <FirstPart/>
      </ConsultProvider>
    )
}