import '../../App.css';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import Category2 from '../Category/Category2';
import Hero from '../Hero/Hero';
import Navbar from '../Navbar/Navbar';
import Services from '../Services/Services';
import Products from '../Products/Products';
import AOS from "aos";
import "aos/dist/aos.css";

import headphone from "../../assets/hero/headphone.png";
import smartwatch2 from "../../assets/category/smartwatch2-removebg-preview.png";
import Partners from '../Partners/Partners';
import Footer from '../Footer/Footer';
import React from 'react';

const BannerData = {
  discount: "30% OFF",
  title: "Fine Smile",
  date: "1 June to 15 June",
  image: headphone,
  title2: "Air Solo Bass",
  title3: "Summer Sale",
  title4: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente eveniet quidem ut iste ad repellat voluptas, repudiandae molestias nostrum perspiciatis!",
  bgColor: "#f42c37"
}

const BannerData2 = {
  discount: "30% OFF",
  title: "Happy Hours",
  date: "1 June to 15 June",
  image: smartwatch2,
  title2: "Smart Solo",
  title3: "Summer Sale",
  title4: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente eveniet quidem ut iste ad repellat voluptas, repudiandae molestias nostrum perspiciatis!",
  bgColor: "#2dcc6f"
}

function MainPage() {

  React.useEffect(() => {
    AOS.init(
      {
        duration: 800,
        easing: "ease-in-sine",
        delay: 100,
        offset: 100,
      }
    );
    AOS.refresh();
  }, [])

  return (
    <>
      <div className="bg-white dark:bg-gray-900
    dark:text-white duration-200 overflow-hidden">


        <Hero />
        <Category />
        <Category2 />
        <Services />
        <Banner data={BannerData} />
        <Products />
        <Banner data={BannerData2} />
        <Partners />
        <Footer />

      </div>
    </>
  );
}

export default MainPage;
