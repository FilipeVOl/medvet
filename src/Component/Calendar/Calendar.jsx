import "./calendar.css";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { style } from "./calendar_utils.jsx";
import multiMonthPlugin from '@fullcalendar/multimonth'

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
      <div className="justify-center w-full p-12 mt-8 flex flex-col gap-8">
        <h1 className="font-bold text-3xl">Calendário</h1>
        <FullCalendar
          locale={"pt-br"}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthPlugin]}
          initialView="multiMonthYear"
          selectable={true}
          editable={true}
          weekends={true}
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next",
          }}
          events={events} // Eventos dinâmicos
          dateClick={handleDateSelect}
          eventClick={handleEventClick}
        />
      </div>
    </>
  );
};
