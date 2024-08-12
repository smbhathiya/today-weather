import DisplayWeather from "./(components)/DisplayWeather";
import DisplayWeeklyWeather from "./(components)/DisplayWeeklyWeather";
import Navbar from "./(components)/Navbar";

export default function home() {
  return (
    <>
      <Navbar />
      <DisplayWeather />
      <DisplayWeeklyWeather />
    </>
  );
}
