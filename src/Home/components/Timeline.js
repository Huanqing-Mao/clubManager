import { Tag, Calendar, Button, Popover } from "antd";
import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import CreateEvent from "./Events/CreateEvent";
import EventDetails from "./Events/EventDetails";
import { fetchEvents, newEvent, deleteEvent } from "./Events/EventsAPI";
import { PlusCircleOutlined } from "@ant-design/icons";

function Timeline({ currentID, ccaID, manager }) {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const content = (
    <CreateEvent
      currentID={currentID}
      newEvent={newEvent}
      hide={hide}
      ccaID={ccaID}
    />
  );

  const eventDetails = (eventID) => (
    <EventDetails
      eventID={eventID}
      currentID={currentID}
      deleteEvent={deleteEvent}
      ccaID={ccaID}
      manager={manager}
    />
  );

  /*
  async function fetchEvents() {
    let { data: es, error } = await supabase.from("Events").select("*");
    setEvents(es);
    console.log(events);
  }

  async function newEvent(values) {
    const { nerror } = await supabase.from("Events").insert({
      created_by: currentID,
      date_time: values.date_time,
      event_name: values.event_name,
      details: values.details
    });
  }
  */

  useEffect(() => {
    const data = fetchEvents(ccaID).then((value) => setEvents(value));
    //console.log(data);
    //setEvents(data);
    //console.log("current events");
    //console.log(events);
  }, [newEvent, events, deleteEvent]);

  const getMonthData = (value) => {
    if (events.length === 0 || events[0] === undefined) {
      return [];
    } else {
      //console.log("current month");
      let monthEvents = events.filter(
        (item) => item.date_time.slice(0, 7) === value.format("YYYY-MM")
      );
      return monthEvents || [];
    }
  };

  function getListData(value) {
    //console.log(value);
    if (events.length === 0) {
      const dayEvents = [];
      return dayEvents;
    } else {
      //console.log("current date");
      let dayEvents = events.filter(
        (item) => item.date_time === value.format("YYYY-MM-DD")
      );
      return dayEvents || [];
    }
  }

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return (
      <ul className="events">
        {num.map((item) => (
          <li key={item.content}>
            <Popover trigger="click" content={eventDetails(item.id)}>
              <Tag className={item.type}>{item.event_name}</Tag>
            </Popover>
          </li>
        ))}
      </ul>
    );
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Popover trigger="click" content={eventDetails(item.id)}>
              <Tag className={item.type}>{item.event_name}</Tag>
            </Popover>
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };
  return (
    <div>
      {/*manager === true ? (
        <Popover
          title="Create new event"
          trigger="click"
          content={content}
          open={open}
          onOpenChange={handleOpenChange}
        >
          <Button className="AntButton" icon=<PlusCircleOutlined />>
            Create Event
          </Button>
        </Popover>
      ) : (
        <></>
      )*/}
      <Calendar cellRender={cellRender} />
    </div>
  );
}
export default Timeline;
