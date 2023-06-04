import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { Form, Radio, Button } from "antd";
import moment from "moment";

function PollQuestions({ pollID, cID, deletePoll }) {
  const [options, setOptions] = useState([]);
  const [question, setQuestion] = useState("");
  //const [currentID, setCurrentID] = useState("");
  const [vote, setVote] = useState(null);
  const [voted, setVoted] = useState("Submit");
  const [message, setMessage] = useState(
    "You have not submitted your vote yet, please vote before the deadline!"
  );
  const [passedDdl, setPassedDdl] = useState(false);
  const [form, setForm] = useState(null);
  console.log(pollID);
  console.log("current timestamp:", Date.now());

  async function fetchData() {
    let { data: ops, error } = await supabase
      .from("Options")
      .select("*")
      .eq("poll_id", pollID);
    setOptions(ops);
    console.log("poll options");
    console.log(options);
  }

  async function fetchQuestion() {
    let { data: q, err } = await supabase
      .from("Polls")
      .select("*")
      .eq("id", pollID);
    setQuestion(q[0].question);
    console.log(q);
    console.log("deadline of the question", q[0].deadline);
    //console.log("deadline of current question", new Date(q[0].deadline).getTime());
    const currentTime = moment();
    console.log("current timing", currentTime);
    const deadline = moment(q[0].deadline);
    const isDeadlinePassed = deadline.isAfter(currentTime);
    console.log(isDeadlinePassed);
    setPassedDdl(isDeadlinePassed);
    console.log("question here");
    console.log(question);
  }

  // async function getUserID() {
  //     const { data: { user } } = await supabase.auth.getUser();
  //     setCurrentID(user.id);
  //     console.log(currentID);
  // }

  async function getVoteRecord() {
    const { data: vr, verror } = await supabase
      .from("Votes")
      .select("*")
      .match({
        poll_id: pollID,
        user_id: cID
      });
    console.log(vr);
    if (vr !== null && vr[0] !== undefined) {
      setVote(vr[0].option_id);
      setVoted("Update");
      setMessage(
        "We have already recorded your response, you could still update your vote before the deadline!"
      );
    } else {
            setVoted("Submit");
            setMessage("You have not submitted your vote yet, please vote before the deadline!");
    };

    console.log("previous vote");
    console.log(vr);
    console.log(vote);
  }

  async function formStatus() {
    if (passedDdl) {
      setForm(
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => updateVote()}
          className="AntButton"
        >
          {voted}
        </Button>
      );
    } else {
      setForm(<a>This poll has been closed.</a>);
    }
  }

  useEffect(() => {
    if (pollID !== null) {
      fetchData();
      fetchQuestion();
      console.log(question);
    }
    //getUserID();
    console.log(cID);
    console.log("user info");
    getVoteRecord();
    console.log(vote);
    //formStatus();
  }, [pollID]);

  useEffect(() => {
    formStatus(); // Move formStatus() here
  }, [passedDdl, voted, vote]);

  async function updateVote() {
    if (voted === "Submit") {
      const { ierror } = await supabase
        .from("Votes")
        .insert({ poll_id: pollID, user_id: cID, option_id: vote });
      alert("Your response has been recorded!");
      //window.location.reload();
    } else {
      const { uerror } = await supabase
        .from("Votes")
        .update({ option_id: vote })
        .match({
          poll_id: pollID,
          user_id: cID
        });
      alert("Update Success!");
      //window.location.reload(true);
    }
  }

  if (pollID === null) {
    return (
      <div>
        <h2>Please select a poll.</h2>
      </div>
    );
  } else {
    return (
      <div>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
        >
          <p>{message}</p>
          <h2>{question}</h2>
          <Form.Item>
            <Radio.Group value={vote} onChange={(e) => setVote(e.target.value)}>
              {options.map((item) => (
                <Radio value={item.id}>{item.text}</Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          {form}
        </Form>
        <br></br>
        <Button onClick={() => deletePoll(pollID)} className="AntButton">
          Delete this poll
        </Button>
      </div>
    );
  }
}

export default PollQuestions;
