import DailyForecast from "./components/DailyForecast";
import Navbar from "./components/Navbar";
import Search from "./components/Search";


function App() {
  return (
    <>
    <div>
      <Navbar/>
    </div>
    <div className="p-3 md:container mx-auto">
      <Search/>
    </div>
    <div>
      <DailyForecast/>
    </div>
    </>
  );
}

export default App;
