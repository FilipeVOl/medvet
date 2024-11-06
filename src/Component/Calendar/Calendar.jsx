import "./calendar.css";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Input, InputLabel } from "@mui/material";
import { style } from "./calendar_utils.jsx";

export const Calendar = () => {
  const [view, setView] = useState("dayGridMonth");
  const [dateClicked, setDateClicked] = useState("");
  const [events, setEvents] = useState([
    { title: "event 1", date: "2022-01-01" },
    { title: "event 2", date: "2022-01-02" },
  ]);
  const handleCreateEvent = (event) => {
    setEvents([...events, event]);
  };
  const handleDateSelect = (selectInfo) => {
    setOpen(true);
    const calendarApi = selectInfo.view.calendar;
    setDateClicked(selectInfo.dateStr);
    calendarApi.unselect(); // clear date selection
  };

  const handleEventClick = (clickInfo) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEventContent = (arg) => {
    return { html: `<b>${arg.timeText}</b> ${arg.event.title}` };
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>Agendamento para o dia {dateClicked}</h1>
        </Box>
      </Modal>
      <div className="flex justify-center w-full p-3 mt-8">
        <FullCalendar
          locale={"pt-br"}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={view}
          selectable={true}
          editable={true}
          weekends={true}
          eventContent={handleEventContent}
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next",
          }}
          events={events}
          dateClick={handleDateSelect}
          eventClick={handleEventClick}
        />
      </div>
    </>
  );
};
