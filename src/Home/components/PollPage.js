import { Card, Button, Popover, message, Spin } from "antd";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../supabase";
import PollQuestions from "./Polls/PollQs";
import CreatePoll from "./Polls/CreatePoll";
import PollResult from "./Polls/PollResult";
import moment from "moment";

function PollPage( { userID, ccaID, manager } ) {
  const [polls, setPolls] = useState([]);
  const [error, setError] = useState(null);
  const [choice, setChoice] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentID, setCurrentID] = useState("");
  const [temPollID, setTemPollID] = useState("");
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState("loading");
  //const { pollstack, setPollstack } = useState(null);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const content = (
    <CreatePoll currentID={currentID} newPoll={newPoll} hide={hide} ccaID={ccaID}/>
  );

  async function fetchData() {
    let { data: Polls, error } = await supabase
      .from("Polls")
      .select("*")
      .is("active", true)
      .eq("cca_id", ccaID)
      .order("deadline", { ascending: false });
    setPolls(Polls);
    setLoad("loaded");
    //console.log(polls);
  }

  async function getUserID() {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    setCurrentID(user.id);
    //console.log(currentID);
  }

  useEffect(() => {
    fetchData();
    getUserID();
    //console.log(currentID);
    //console.log(polls);
    //console.log("here");
  }, [deletePoll, newPoll]);

  const choosePoll = useCallback(
    (num) => {
      setChoice(num);
    },
    [choice]
  );

  if (load === "loading") {
    return (
      <div className="centered">
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      </div>
    );
  } else if (load === "loaded" && !polls.length) {
    return (
      <div className="flex-container">
        <div className="no_poll">
          <p>There are no polls yet.</p>
        </div>
        <div className="create_poll">
          <Popover
            title="Create new poll"
            trigger="click"
            content={content}
            open={open}
            onOpenChange={handleOpenChange}
          >
            <Button className="AntButton">Create Poll</Button>
          </Popover>
        </div>
      </div>
    );
  }

  async function newPoll(values, cca) {
    const { data, error } = await supabase.from("Polls").insert({
      posted_by: currentID,
      deadline: values.deadline,
      active: true,
      poll_name: values.poll_name,
      question: values.question,
      cca_id: cca
    });

    if (error) {
      message.error("No access.");
    } else {
      getNewPollID(values);
    }
  }

  async function getNewPollID(values) {
    const { data: newPollID, nperror } = await supabase
      .from("Polls")
      .select("id")
      .match({
        posted_by: currentID,
        active: true,
        poll_name: values.poll_name,
        question: values.question
      })
      .order("created_at", { ascending: false });
    //console.log(newPollID);
    //console.log(newPollID[0].id);
    //await setTemPollID(newPollID[0].id);
    //console.log('new poll id:', temPollID);
    createNewOptions(values, newPollID[0].id);
  }

  async function createNewOptions(values, pID) {
    const optionsData = values.options.map((item) => ({
      poll_id: pID,
      text: item
    }));

    const { oerror } = await supabase.from("Options").insert(optionsData);
  }

  async function deletePoll(pollID, username) {
    if (!username || username === null) {
      message.error("No access.");
    } else {
      const { derror } = await supabase
        .from("Polls")
        .update({ active: false })
        .eq("id", pollID);
      setChoice(null);
    }
  }

  return (
    <div className="flex-container">
      <div className="poll_list">
        <ul>
          {polls.map((item) => (
            <li>
              <Card
                style={{ width: 300 }}
                onClick={() => choosePoll(item.id)}
                hoverable={true}
              >
                <p>submit by {item.deadline}</p>
                <h1>{item.poll_name}</h1>
                <font color="red">
                  {moment().isAfter(moment(item.deadline)) ? "Closed" : ""}
                </font>
              </Card>
              <br></br>
            </li>
          ))}
        </ul>
      </div>
      <div className="poll_form">
        <PollQuestions
          pollID={choice}
          cID={currentID}
          deletePoll={deletePoll}
          ccaID={ccaID}
          manager={manager}
        />
        {manager === true ?
        <PollResult pollID={choice} currentID={currentID} /> : <></> }
      </div>
      {manager === true ?
      <div className="create_poll">
        <Popover
          title="Create new poll"
          trigger="click"
          content={content}
          open={open}
          onOpenChange={handleOpenChange}
        >
          <Button className="AntButton">Create Poll</Button>
        </Popover>
      </div> : <></> }
    </div>
  );
}

export default PollPage;
