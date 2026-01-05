import Navbar from './components/Navbar';
import HeadphoneScroll from './components/HeadphoneScroll';
import CTASection from './components/CTASection';
import Features from './components/Features';
import TechSpecs from './components/TechSpecs';
import VideoSection from './components/VideoSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen overflow-x-hidden">
      <Navbar />
      <HeadphoneScroll />
      <CTASection />
      <Features />
      <VideoSection />
      <TechSpecs />
      <Footer />
    </main>
  );
}
