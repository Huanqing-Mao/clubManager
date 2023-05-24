import { Tag, Calendar } from 'antd';

const getListData = (value) => { // edit such that it use year month day to find data
    let listData;   // seems like 'value' here is a dayjs object
    switch (value.date()) { // try value.year()
      case 8:
        listData = [
          {
            type: 'warning',
            content: 'This is warning event.',
          },
          {
            type: 'success',
            content: 'This is usual event.',
          },
        ];
        break;
      case 10:
        listData = [
          {
            type: 'warning',
            content: 'This is warning event.',
          },
          {
            type: 'success',
            content: 'This is usual event.',
          },
          {
            type: 'error',
            content: 'This is error event.',
          },
        ];
        break;
      case 15:
        listData = [
          {
            type: 'warning',
            content: 'This is warning event',
          },
          {
            type: 'success',
            content: 'This is very long usual event。。....',
          },
          {
            type: 'error',
            content: 'This is error event 1.',
          },
          {
            type: 'error',
            content: 'This is error event 2.',
          },
          {
            type: 'error',
            content: 'This is error event 3.',
          },
          {
            type: 'error',
            content: 'This is error event 4.',
          },
        ];
        break;
      default:
    }
    return listData || [];
  };
  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };
  function Timeline() {
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
              <Tag status={item.type} text={item.content}>{item.type}</Tag>
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
    return <div><Calendar cellRender={cellRender}/></div>;
  };
  export default Timeline;