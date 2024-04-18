import { sliceEvents, createPlugin } from "@fullcalendar/core/index.js";

function CustomView(props) {
  let segs = sliceEvents(props, true)

  return (
    <>
      <div>
        {segs.map((seg) => (
          <div key={seg.eventRange.instance.instanceId}>
            {seg.eventRange.def.title}
          </div>
        ))}
      </div>
    </>
  )
}

export default createPlugin({
  views: {
    custom: CustomView
  }
});

export const style = {
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 3,
  p: 8,
};