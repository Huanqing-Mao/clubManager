import logo from './cm.png';

export default function TopBar({ setActiveSection, activeSection, banner, setBanner}) {

  function goHome() {
    setActiveSection('Home');
    setBanner('Welcome Back!');
  }

  function goAttendance() {
    setActiveSection('Attendance');
    setBanner('Attendance');
  }

  function goPolls() {
    setActiveSection('Polls');
    setBanner('Polls');
  }

  function goFiles() {
    setActiveSection('Files');
    setBanner('Files');
  }

  function goProfile() {
    setActiveSection('Profile');
    setBanner('Personal Profile');
  }


  return(
    <header className="App-header">
      <title>{activeSection}</title>
      <div>
        <img src={logo} className="logo" height="240" onClick={goHome}/>
        <h1 className="banner">{banner}</h1>
        <a onClick={goProfile} className="profile">Member #12345</a>
      </div>
      
      <nav>
        <ul>
          <li><a onClick={goHome}>Home</a></li>
          <li><a onClick={goAttendance}>Attendance</a></li>
          <li><a onClick={goPolls}>Polls</a></li>
          <li><a onClick={goFiles}>Files</a></li>
        </ul>
      </nav>
      
      
    </header>
  )
};