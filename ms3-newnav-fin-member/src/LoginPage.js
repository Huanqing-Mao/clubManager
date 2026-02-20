import "./styles.css";
import Window from "./Components/Window";
import TopBanner from "./Components/TopBanner";
import BottomBanner from "./Components/BottomBanner";

export default function LoginPage({ loginStatus, setLoginStatus }) {
  return (
    <div className="App">
      <TopBanner />
      <Window loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
      <BottomBanner />
    </div>
  );
}
