import { useState, useEffect, useCallback } from "react";
//import { supabase } from "../../supabase";
import { Card, Space, Timeline, Popover, Button } from 'antd';
import CreateEvent from './Events/CreateEvent';
import EventDetails from "./Events/EventDetails";
import AttendanceList from "./Events/AttendanceList";
import { fetchEvents, newEvent, deleteEvent } from "./Events/EventsAPI";


function AttendancePage( { currentID } ) {
    const [load, setLoad] = useState('loading');
    const [events, setEvents] = useState([]);
    const [eventID, setEventID] = useState(null);
    const [open, setOpen] = useState(false);

    const hide = () => {
        setOpen(false);
    };

    const content = (
        <CreateEvent currentID={currentID} newEvent={newEvent} hide={hide}/>
    );

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    /*  create event and fetch events function are all put into EventsAPI
    async function fetchEvents() {
        let { data: es, error } = await supabase
        .from("Events")
        .select("*")
        .order('date_time', { ascending: false });
        // const data = es.map((item) => ({
        //     id: item.id,
        //     children: (
        //         <p onClick={()=>chooseEvent(item.id)}>{item.event_name}</p>
        //     ),
        //     label: item.date_time
        // }))
        setEvents(es);
        console.log("problem here")
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
        fetchEvents().then((value) => {
            setEvents(value);
            setLoad('loaded');});
        console.log(events);
        console.log(currentID);
        console.log('member')
        console.log();
    }, [newEvent, deleteThisEvent]);

    const chooseEvent = useCallback(
        (num) => {
          setEventID(num);
        },
        [eventID]
    );

    if (load === 'loading') {
        return (
            <div>
                <h2>Loading...</h2>
            </div>
        )
    } else if (load === 'loaded' && !events.length) {
        return (
            <div className="flex-container">
                <div className="no_poll">
                    <h2>There are no events yet!</h2>
                </div>
                <div className='create_event'>
                    <Popover
                    title="Create new event"
                    trigger="click"
                    content={content}
                    open={open}
                    onOpenChange={handleOpenChange}
                    >
                        <Button className="AntButton" type="primary">Create Event</Button>
                    </Popover>
                </div>
            </div>
        )
    }

    function deleteThisEvent(num) {
        deleteEvent(num);
        setEventID(null);
    }

    return (
        <div className='flex-container'>
            <div className="event_list">
            <Space
            direction="vertical"
            size="middle"
            style={{
            display: 'flex',
            }}
            >
                {events.map((item) => (
                    <Card title={item.date_time} 
                    size="small" 
                    onClick={() => chooseEvent(item.id)}
                    hoverable={true}>
                    <h1>{item.event_name}</h1>
                    </Card>
                ))}
            </Space>
            </div>
            <div className="event_details" >
                <EventDetails eventID={eventID} currentID={currentID} deleteEvent={deleteThisEvent}/>
                <AttendanceList eventID={eventID} />
            </div>
            <div className='create_event'>
            <Popover
                title="Create new event"
                trigger="click"
                content={content}
                open={open}
                onOpenChange={handleOpenChange}
            >
                <Button className="AntButton" type="primary">Create Event</Button>
            </Popover>
            </div>
        </div>
    )
}

export default AttendancePage;