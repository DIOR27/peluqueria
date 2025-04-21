import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import OurServices from "../components/OurServices";
import WorkingHours from "../components/WorkingHours";
import OurTeam from "../components/OurTeam";
import Footer from "../components/Footer";
import BookAppointmentNow from "../components/BookAppointmentNow";

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto">
        <Header />
        <HeroSection />
        <OurServices />
        <WorkingHours />
        <OurTeam />
      </div>
      <BookAppointmentNow />
      <Footer />
    </div>
  );
}

export default Home;
