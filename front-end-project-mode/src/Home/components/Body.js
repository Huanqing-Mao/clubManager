import Home from './Home';

export default function Body({ activeSection, setActiveSection, banner, setBanner }) {
    let content;

    if (activeSection === 'Home') {
        content = <Home setActiveSection={setActiveSection} activeSection={activeSection} banner={banner} setBanner={setBanner}/>;
    } else if (activeSection === 'Attendance') {
        content = <p>This is Attendance page.</p>
    } else if (activeSection === 'Polls') {
        content = <p>This is Polls page.</p>
    } else if (activeSection === 'Files') {
        content = <p>This is Files page.</p>
    } else if (activeSection === 'Profile') {
        content = <p>This is your perosnal profile page.</p>
    } else if (activeSection === 'Announcements') {
        content = <p>This is announcements page.</p>
    }

    return<div className='main'>{content}</div>;
}