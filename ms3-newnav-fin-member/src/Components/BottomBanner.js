import circle from "./circle.png";

export default function BottomBanner() {
  return (
    <>
      <div className="bottomBanner">
        <img src={circle} alt="circle" style={{ width: "20px" }} />
        <span> Post & Organise Announcements</span>
        <img src={circle} alt="circle" style={{ width: "20px" }} />
        <span> Create Polls</span>
        <img src={circle} alt="circle" style={{ width: "20px" }} />
        <span> Logging Attendance </span>

        <br />
        <img src={circle} alt="circle" style={{ width: "20px" }} />
        <span> Visualise Member Profiles </span>
        <img src={circle} alt="circle" style={{ width: "20px" }} />
        <span> Visualise Financial Data</span>
        <img src={circle} alt="circle" style={{ width: "20px" }} />
        <span> Organising Files</span>

        <br />
        <text className="bottom"> About Us</text>
        <text className="bottom"> Contact Us </text>
        <text className="bottom"> Created By Team 5539, Orbital 2023</text>
      </div>

      <div></div>
    </>
  );
}
