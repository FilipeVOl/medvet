import "./calendar.css";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";


export const Calendar = () => {
  const [agenda, setAgenda] = useState(() => {
    const storedAgenda = window.localStorage.getItem("agenda");
    return storedAgenda ? JSON.parse(storedAgenda) : {};
  });

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const parsedEvents = Object.keys(agenda).flatMap((date) =>
      agenda[date].map((item) => ({
        title: `${item.nameTutor} - ${item.nameAnimal}`, // Concatena Tutor e Animal como título
        date: `${date.substring(4)}-${date.substring(2, 4)}-${date.substring(0, 2)}`, // Converte o formato de data (ddmmyyyy -> yyyy-mm-dd)
      }))
    );
    setEvents(parsedEvents);
  }, [agenda]);

  // Gerencia a data selecionada
  const [dateClicked, setDateClicked] = useState("");
  const [view, setView] = useState("dayGridMonth");

  // Abre o modal quando uma data é clicada
  const [open, setOpen] = useState(false);

  const handleDateSelect = (selectInfo) => {
    setOpen(true);
    setDateClicked(selectInfo.dateStr);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEventClick = (clickInfo) => {
    if (
      confirm(
        `Tem certeza de que deseja excluir o evento '${clickInfo.event.title}'?`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  return (
    <>
      {/* <Modal
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > */}
        {/* <Box sx={style}>
          <h1>Agendamento para o dia {dateClicked}</h1>
        </Box> */}
      {/* </Modal> */}
      <div className="justify-center w-full pl-28 pr-8 py-8  flex flex-col gap-8 Montserrat">
        <span className="font-bold text-3xl Montserrat">Calendário</span>
        <FullCalendar
          locale={"pt-br"}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth" // Changed from multiMonthYear to dayGridMonth
          selectable={true}
          editable={true}
          weekends={true}
          headerToolbar={{
            left: "prev,next today", // Added today button
            center: "title",
            right: "dayGridMonth,timeGridWeek" // Added week view option
          }}
          events={events}
          dateClick={handleDateSelect}
          eventClick={handleEventClick}
        />
      </div>
    </>
  );
};
