import "./styles.css";
import Window from "./Components/Window";
import TopBanner from "./Components/TopBanner";
import BottomBanner from "./Components/BottomBanner";

export default function App() {
  return (
    <div className="App">
      <TopBanner />
      <Window />
      <BottomBanner />
    </div>
  );
}
