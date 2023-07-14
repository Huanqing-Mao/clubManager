import { Divider, Card } from "antd";
import Timeline from "./Timeline";
import AnnMain from "./Announcements/AnnMain";

function Home({
  setActiveSection,
  activeSection,
  banner,
  setBanner,
  userID,
  fetchEvents,
  newEvent,
  ccaID,
  manager
}) {
  function goAnn() {
    setActiveSection("Announcements");
    setBanner("Announcements");
  }

  return (
    <div className="flex-container">
      <div className="calendar">
        <Card
          style={{
            height: 70,
            fontSize: 18,
            backgroundColor: "rgba(7, 133, 165, 0.1)"
          }}
        >
          <div className="timeline">Event Timeline</div>
        </Card>
        <p></p>
        <Timeline currentID={userID} ccaID={ccaID} manager={manager}/>
      </div>
      <div className="AnnSection">
        <Card
          style={{
            height: 70,
            fontSize: 18,
            backgroundColor: "rgba(7, 133, 165, 0.1)"
          }}
        >
          <div onClick={goAnn} className="announcement">
            Recent Announcements
            <p></p>
          </div>
        </Card>
        <AnnMain userID={userID} ccaID={ccaID} manager={manager}/>
      </div>
    </div>
  );
}

export default Home;
