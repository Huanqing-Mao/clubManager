import { Divider } from 'antd';


function Home({ setActiveSection, activeSection, banner, setBanner}) {
    function goAnn() {
        setActiveSection('Announcements');
        setBanner('Announcements');
    }
    return (
        <div>
            <a>Event Timeline</a>
            <Divider type="vertical" />
            <a onClick={goAnn}>Recent Announcements</a>
        </div>
    );
};

export default Home;