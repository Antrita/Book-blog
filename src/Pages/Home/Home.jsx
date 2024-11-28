import React from 'react';
import MainNavbar from '../../Components/Navbar/Navbar';
import HeroSection from '../../Components/HeroSection/Hero'
import '../../Pages/Home/Home.css';

function Home() {
  return (
    <div className="home-container">
      
      <main>
        <HeroSection />
        {/* Add more sections as needed */}
      </main>
    </div>
  );
}

export default Home;