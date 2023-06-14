import { Divider } from "antd";
import Timeline from "./Timeline";

function Home({ setActiveSection, activeSection, banner, setBanner, currentID, fetchEvents, newEvent }) {
  function goAnn() {
    setActiveSection("Announcements");
    setBanner("Announcements");
  }
  return (
    <div className="flex-container">
      <div className="calendar">
        <div className="timeline">Event Timeline</div>
        <Timeline currentID={currentID} />
      </div>
      <div className="AnnSection">
        <div onClick={goAnn} className="announcement">
          Recent Announcements
        </div>
      </div>
    </div>
  );
}

export default Home;
