
import './App.css';
import TopBar from './components/TopBar';
import Body from './components/Body';
import { useState } from 'react';
import { Divider } from 'antd';

function HomePage() {
  const [activeSection, setActiveSection] = useState('Home');
  const [currentBanner, setBanner] = useState('Welcome Back!');

  return (
    <div className="App">
      <TopBar setActiveSection={setActiveSection} activeSection={activeSection} banner={currentBanner} setBanner={setBanner} />
      <Body activeSection={activeSection} setActiveSection={setActiveSection} banner={currentBanner} setBanner={setBanner} />
    </div>
  );
}

export default HomePage;
