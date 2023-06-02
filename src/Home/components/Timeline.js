import { Tag, Calendar } from 'antd';
import { useState, useEffect } from 'react';
import { supabase } from "../../supabase";


const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

function Timeline() {
  const [events, setEvents] = useState([]);

  async function fetchEvents() {
    let { data: es, error } = await supabase
    .from('Events')
    .select('*');
    setEvents(es);
    console.log(events);
  }

  useEffect(() => {
    fetchEvents();
    console.log('current events');
    console.log(events);
  },[])

  function getListData(value) {
    console.log(value);
    console.log('current date')
    let dayEvents = events.filter(item => item.date_time === value.format('YYYY-MM-DD'));
    return dayEvents || [];
  }

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Tag className={item.type}>{item.event_name}</Tag>
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };
  return <Calendar cellRender={cellRender} />;
};
export default Timeline;