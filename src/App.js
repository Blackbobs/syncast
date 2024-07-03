import DailyForecast from "./components/DailyForecast";
import FiveDaysForecast from "./components/FiveDaysForecast";
import Navbar from "./components/Navbar";
import Search from "./components/Search";


function App() {
  return (
    <>
    <div>
      <Navbar/>
    </div>
    <div className="container mx-auto">
    <div className="p-3 md:container mx-auto">
      <Search/>
    </div>
    <div>
      <DailyForecast/>
    </div>
    <div>
      <FiveDaysForecast/>
    </div>
    </div>
    </>
  );
}

export default App;
