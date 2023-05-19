import { Divider } from "antd";

function Home({ setActiveSection, activeSection, banner, setBanner }) {
  function goAnn() {
    setActiveSection("Announcements");
    setBanner("Announcements");
  }
  return (
    <div className="float-container">
      <div className="timeline">Event Timeline</div>

      <div onClick={goAnn} className="announcement">
        Recent Announcements
      </div>
    </div>
  );
}

export default Home;
