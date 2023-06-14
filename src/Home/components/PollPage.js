import { Card, Button, Popover } from "antd";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../supabase";
import PollQuestions from "./Polls/PollQs";
import CreatePoll from "./Polls/CreatePoll";
import moment from "moment";

function PollPage() {
  const [polls, setPolls] = useState([]);
  const [error, setError] = useState(null);
  const [choice, setChoice] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentID, setCurrentID] = useState("");
  const [temPollID, setTemPollID] = useState("");
  const [open, setOpen] = useState(false);
  //const { pollstack, setPollstack } = useState(null);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const content = (
    <CreatePoll currentID={currentID} newPoll={newPoll} hide={hide} />
  );

  async function fetchData() {
    let { data: Polls, error } = await supabase
      .from("Polls")
      .select("*")
      .is("active", true)
      .order("deadline", { ascending: false });
    setPolls(Polls);
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

  if (!polls.length) {
    return (
      <div>
        <p>There are no polls yet.</p>
      </div>
    );
  }

  async function newPoll(values) {
    const { nerror } = await supabase.from("Polls").insert({
      posted_by: currentID,
      deadline: values.deadline,
      active: true,
      poll_name: values.poll_name,
      question: values.question
    });
    getNewPollID(values);
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

  async function deletePoll(pollID) {
    const { derror } = await supabase
      .from("Polls")
      .update({ active: false })
      .eq("id", pollID);
    setChoice(null);
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
            </li>
          ))}
        </ul>
      </div>
      <div className="poll_form">
        <PollQuestions
          pollID={choice}
          cID={currentID}
          deletePoll={deletePoll}
        />
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

export default PollPage;
