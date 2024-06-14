import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { Grid } from "@mui/material";

export default function InfoProntuario() {
  const Title = ({ title }) => {
    return (
      <div className="flex gap-2 items-center">
        <h1 className="font-Montserrat text-[##100F49] font-semibold text-2xl">
          {title}
        </h1>
      </div>
    );
  };

  const SystemsWrapper = ({ title }) => {
    return (
      <div className="flex-1 w-full items-start justify-start mb-12">
        <h1 className="font-Montserrat font-normal text-lg text-[#2C2C2C]">
          {title}
        </h1>
      </div>
    );
  };

  return (
    <>
      <div className="container flex p-20 ml-12 mt-8 flex-col font-Montserrat">
        <div className="flex flex-col mb-10">
          <h1 className="font-Montserrat h-10 font-bold text-2xl">
            Prontuário
          </h1>
          <span className="font-Montserrat font-semibold text-xl text-[#2C2C2C]">
            N° 475256
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <Title title="Informações de Identificação" />
          <Grid container spacing={2} rowSpacing={3} className="p-8">
            <Grid item xs={2}>
              <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                Professor:
              </h1>
              <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                João da Silva
              </span>
            </Grid>
            <Grid item xs={2}>
              <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                Paciente:
              </h1>
              <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                Joacir
              </span>
            </Grid>
            <Grid item xs={3}>
              <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                Tutor:
              </h1>
              <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                Bárbara Rodriguez
              </span>
            </Grid>
            <Grid item xs={2}>
              <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                Data:
              </h1>
              <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                26/04/2004
              </span>
            </Grid>
            <Grid item xs={3}>
              <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                Espécie:
              </h1>
              <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                Canis familiaris
              </span>
            </Grid>
            <Grid item xs={3}>
              <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                Raça:
              </h1>
              <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                Canis Molaris
              </span>
            </Grid>
            <Grid item xs={2}>
              <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                Sexo:
              </h1>
              <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                Macho
              </span>
            </Grid>
            <Grid item xs={2}>
              <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                Idade:
              </h1>
              <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                3 anos
              </span>
            </Grid>
            <Grid item xs={2}>
              <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                Peso:
              </h1>
              <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                12kg
              </span>
            </Grid>
            <Grid item xs={2}>
              <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                Pelagem:
              </h1>
              <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                Amarela
              </span>
            </Grid>
          </Grid>
          <Title title="Anamnese" />
          <div className="flex flex-col p-8">
            <h1 className="font-Montserrat font-semibold text-lg text-[#2C2C2C]">
              Motivo da consulta:
            </h1>
            <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
              O animal fica agressivo quando encosta na pata direita dianteira{" "}
            </span>

            <h1 className="font-Montserrat font-semibold text-lg text-[#2C2C2C] mt-4">
              Histórico:
            </h1>
            <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
              Costuma ser muito dócil e gosta correr no quintal.
            </span>
            <div className="flex justify-between gap-16">
              <div className="w-1/2">
                <h1 className="font-Montserrat text-[##100F49] font-semibold text-xl py-8">
                  Vacinação:
                </h1>
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                      Qual:
                    </h1>
                    <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                      Vacina contra Raiva
                    </span>
                  </div>
                  <div>
                    <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                      Data da última:
                    </h1>
                    <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                      Vacina contra Raiva
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-1/2">
                <h1 className="font-Montserrat text-[##100F49] font-semibold text-xl py-8">
                  Desverminação:
                </h1>
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                      Qual:
                    </h1>
                    <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                      Dontral
                    </span>
                  </div>
                  <div>
                    <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                      Data da última:
                    </h1>
                    <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                      Vacina contra Raiva
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Title title="Exame Físico" />
          <Grid container spacing={2} rowSpacing={3} className="p-8">
            <Grid item xs={3}>
              <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                Temperatura:
              </h1>
              <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                37.5°C
              </span>
            </Grid>
            <Grid item xs={3}>
              <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                Freq. Cardíaca:
              </h1>
              <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                120 bpm
              </span>
            </Grid>
            <Grid item xs={3}>
              <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                Freq. Respiratória:
              </h1>
              <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                30 mpm
              </span>
            </Grid>
            <Grid item xs={3}>
              <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                Linfonodos reativos:
              </h1>
              <span className="font-Montserrat font-normal text-xl text-[#2C2C2C]">
                1,5 cm
              </span>
            </Grid>
            <Grid item xs={12}>
              <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                Grau de desidratação estimado: 5%
              </h1>
            </Grid>
            <Grid item xs={12}>
              <h1 className="font-Montserrat text-[##100F49] font-semibold text-xl">
                Mucosas:
              </h1>
            </Grid>
            <Grid item xs={3}>
              <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                Normocoradas
              </h1>
            </Grid>
            <Grid item xs={2}>
              <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                Pálidas
              </h1>
            </Grid>
            <Grid item xs={2}>
              <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                Congestas
              </h1>
            </Grid>
            <Grid item xs={2}>
              <h1 className="font-Montserrat font-medium text-lg text-[#2C2C2C]">
                Cianóticas
              </h1>
            </Grid>
          </Grid>
          <Title title="Avaliação dos sistemas" />
          <Grid container spacing={2} rowSpacing={3} className="p-8">
            <Grid item xs={6}>
              <SystemsWrapper title="Pele e anexos:" />
            </Grid>
            <Grid item xs={6}>
              <SystemsWrapper title="Sist. Circulatório:" />
            </Grid>
            <Grid item xs={6}>
              <SystemsWrapper title="Sist. Respiratório:" />
            </Grid>
            <Grid item xs={6}>
              <SystemsWrapper title="Sist. Digestivo:" />
            </Grid>
            <Grid item xs={6}>
              <SystemsWrapper title="Sist. Locomotor:" />
            </Grid>
            <Grid item xs={6}>
              <SystemsWrapper title="Sist. Nervoso:" />
            </Grid>
            <Grid item xs={6}>
              <SystemsWrapper title="Sist. Genitourinário:" />
            </Grid>
            <Grid item xs={6}>
              <SystemsWrapper title="Outros:" />
            </Grid>
          </Grid>
          <Title title="Exames" />
          <Grid container spacing={2} rowSpacing={3} className="p-8">
            <Grid item xs={6}>
              <SystemsWrapper title="Exames complementares:" />
            </Grid>
            <Grid item xs={6}>
              <SystemsWrapper title="Diagnóstico:" />
            </Grid>
            <Grid item xs={6}>
              <SystemsWrapper title="Tratamento:" />
            </Grid>
            <Grid item xs={6}>
              <SystemsWrapper title="Observações:" />
            </Grid>
            <Grid item xs={6}>
              <SystemsWrapper title="Responsável (Nome Completo):" />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
