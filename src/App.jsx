import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faStar, faQuoteLeft, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import strawberry_donut from "../public/strawberry.png";
import berries_donut from "../public/berries.png";
import pistachio_donut from "../public/pistachio.png";
import banana_donut from "../public/banana.png";
import orange_donut from "../public/orange.png";

const donutImages = [
  strawberry_donut,
  berries_donut,
  pistachio_donut,
  banana_donut,
  orange_donut
];

const RotatingDonut = () => {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % donutImages.length);
        setAnimating(false);
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <img
      src={donutImages[index]}
      alt="Rotating Donut"
      className={`w-48 h-48 object-contain drop-shadow-xl transition-all duration-500 ease-in-out ${
        animating ? "opacity-0 rotate-[360deg]" : "opacity-100 rotate-0"
      }`}
    />
  );
};

// Flavor Carousel Component
const FlavorCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const flavors = [
    { name: "Strawberry", image: strawberry_donut, description: "Sweet and fruity" },
    { name: "Berry Blend", image: berries_donut, description: "Mixed berry explosion" },
    { name: "Pistachio", image: pistachio_donut, description: "Nutty and creamy" },
    { name: "Banana", image: banana_donut, description: "Creamy and tropical" },
    { name: "Orange", image: orange_donut, description: "Citrusy and refreshing" }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === flavors.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? flavors.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-3xl shadow-xl bg-gradient-to-br from-pink-50 to-purple-50">
      <div 
        ref={carouselRef}
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {flavors.map((flavor, index) => (
          <div key={index} className="w-full flex-shrink-0 flex flex-col md:flex-row items-center p-6 md:p-10">
            <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
              <img 
                src={flavor.image} 
                alt={flavor.name} 
                className="w-48 h-48 object-contain drop-shadow-lg rounded-2xl"
              />
            </div>
            <div className="w-full md:w-2/3 text-center md:text-left">
              <h3 className="text-3xl font-bold text-pink-600 mb-2">{flavor.name}</h3>
              <p className="text-lg text-pink-500 mb-4">{flavor.description}</p>
              <div className="flex justify-center md:justify-start space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition backdrop-blur-sm"
        aria-label="Previous flavor"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition backdrop-blur-sm"
        aria-label="Next flavor"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {flavors.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentIndex ? 'bg-pink-600' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Testimonials Component
const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah J.",
      text: "The best donut I've ever tasted! The strawberry flavor is absolutely divine.",
      rating: 5
    },
    {
      name: "Michael T.",
      text: "I come here every morning. The pistachio donut is my absolute favorite!",
      rating: 5
    },
    {
      name: "Emma R.",
      text: "Fresh, delicious, and so satisfying. Will definitely be back!",
      rating: 4
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-100 transform hover:-translate-y-2">
          <div className="flex items-center mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 mr-1" />
            ))}
            <span className="ml-2 text-pink-500 font-medium">{testimonial.rating}/5</span>
          </div>
          <div className="flex items-start">
            <FontAwesomeIcon icon={faQuoteLeft} className="text-pink-300 text-2xl mr-2 mt-1" />
            <p className="text-gray-600 italic">"{testimonial.text}"</p>
          </div>
          <p className="mt-4 font-semibold text-pink-600">- {testimonial.name}</p>
        </div>
      ))}
    </div>
  );
};

// New Sections with Advanced Animations
const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-6 lg:px-20 bg-gradient-to-br from-pink-50/50 to-purple-50/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl text-pink-600 font-bold mb-16 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Choose Your Flavor", desc: "Select from our delicious variety of handcrafted donuts" },
            { step: "02", title: "Customize", desc: "Add sprinkles, glaze, or special requests" },
            { step: "03", title: "Enjoy!", desc: "Receive your fresh donut delivered to your door" }
          ].map((item, index) => (
            <div 
              key={index} 
              className={`text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 transition-all duration-500 transform hover:scale-105 ${
                activeStep === index 
                  ? 'border-pink-500 scale-105 shadow-xl' 
                  : 'border-pink-200'
              }`}
              onMouseEnter={() => setActiveStep(index)}
            >
              <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-pink-600 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SpecialOffers = () => {
  const [hoveredOffer, setHoveredOffer] = useState(null);
  
  return (
    <section className="py-20 px-6 lg:px-20 bg-gradient-to-br from-pink-50/50 to-purple-50/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl text-pink-600 font-bold mb-16 text-center">
          Special Offers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { 
              title: "Family Bundle", 
              desc: "6 donuts for the price of 4",
              price: "$18",
              image: strawberry_donut
            },
            { 
              title: "Weekly Special", 
              desc: "Buy 1 get 1 free on selected flavors",
              price: "Buy 1 Get 1 Free",
              image: berries_donut
            }
          ].map((offer, index) => (
            <div 
              key={index} 
              className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-pink-200 transition-all duration-500 transform hover:scale-105 hover:shadow-xl"
              onMouseEnter={() => setHoveredOffer(index)}
              onMouseLeave={() => setHoveredOffer(null)}
            >
              <div className="md:flex">
                <div className="md:w-1/3 p-6 flex items-center justify-center">
                  <img src={offer.image} alt={offer.title} className="w-32 h-32 object-contain transition-transform duration-500 hover:scale-110" />
                </div>
                <div className="md:w-2/3 p-6">
                  <h3 className="text-2xl font-bold text-pink-600 mb-2">{offer.title}</h3>
                  <p className="text-gray-600 mb-4">{offer.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-pink-600">{offer.price}</span>
                    <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:from-pink-600 hover:to-purple-600 transition duration-300 transform hover:scale-110">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
  const faqs = [
    {
      question: "How fresh are your donuts?",
      answer: "We bake fresh daily and deliver within 2 hours of baking for maximum freshness."
    },
    {
      question: "Do you offer delivery?",
      answer: "Yes! We deliver to most locations within 30 minutes. Check availability in your area."
    },
    {
      question: "Can I customize my order?",
      answer: "Absolutely! Add sprinkles, different glazes, or special requests when ordering."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and Apple Pay for your convenience."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6 lg:px-20 bg-gradient-to-br from-pink-50/50 to-purple-50/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl text-pink-600 font-bold mb-16 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-200 transition-all duration-300"
            >
              <button
                className="w-full flex justify-between items-center text-left"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-xl font-bold text-pink-600">{faq.question}</h3>
                <FontAwesomeIcon 
                  icon={openIndex === index ? faChevronUp : faChevronDown} 
                  className="text-pink-500 transition-transform duration-300"
                />
              </button>
              {openIndex === index && (
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const App = () => {
  const donutRefs = useRef([]);
  donutRefs.current = [];

  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const strawberryRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(strawberryRef.current, {
      scale: 1.2,
      duration: 1,
      ease: "power2.out"
    })
      .to(strawberryRef.current, {
        x: "60vw",
        y: "-60vh",
        scale: 1,
        duration: 1.2,
        ease: "power3.inOut"
      })
      .to(contentRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        onComplete: () => setLoaded(true)
      });
  }, []);

  useEffect(() => {
    if (!loaded) return;

    requestAnimationFrame(() => {
      const sequence = [1, 2, 3, 4, 1, 2, 3, 4];
      const tl = gsap.timeline({ repeat: -1 });

      sequence.forEach((index) => {
        tl.to(donutRefs.current[index], {
          scale: 1.2,
          duration: 0.7,
          ease: "power2.inOut"
        }).to(donutRefs.current[index], {
          scale: 1,
          duration: 0.4,
          ease: "power2.inOut"
        });
      });
    });
  }, [loaded]);

  const tabs = [
    { tab: "About", color: "text-blue-500" },
    { tab: "Shop", color: "text-orange-500" },
    { tab: "Contact", color: "text-pink-400" },
    { tab: "Feed", color: "text-yellow-400" }
  ];

  // Initialize ScrollTrigger animations
  useEffect(() => {
    if (!loaded) return;
    
    // Hero section animation
    gsap.from(".hero-left", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".hero-left",
        start: "top 80%",
      }
    });

    gsap.from(".hero-right", {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".hero-right",
        start: "top 80%",
      }
    });

    // About section animations
    gsap.from("#about h2", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
      }
    });

    gsap.from("#about .flex", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
      }
    });

    // Flavors section animations
    gsap.from("#flavors h2", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: "#flavors",
        start: "top 80%",
      }
    });

    gsap.from("#flavors .flavor-carousel", {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: "#flavors",
        start: "top 80%",
      }
    });

    // Shop section animations
    gsap.from("#shop h2", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: "#shop",
        start: "top 80%",
      }
    });

    // Testimonials section animations
    gsap.from("#feed h2", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: "#feed",
        start: "top 80%",
      }
    });

    gsap.from("#feed .testimonial-card", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: "#feed",
        start: "top 80%",
      }
    });

    // Footer animation
    gsap.from("footer", {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: "footer",
        start: "top 90%",
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [loaded]);

  return (
    <main className="relative bg-gradient-to-b from-pink-50 via-white to-white text-gray-800 overflow-hidden">
      {!loaded && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
          <img
            src={strawberry_donut}
            alt="Loading Donut"
            className="w-32 h-32 object-contain"
            ref={strawberryRef}
          />
        </div>
      )}

      <div ref={contentRef} className="opacity-0 transition-opacity duration-1000">
        {/* Header */}
        <header className="w-full py-6 bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-between px-6 fixed top-0 left-0 z-50 lg:w-1/2 lg:left-1/2 lg:-translate-x-1/2 rounded-b-xl">
          <h1 className="text-xl font-bold text-pink-600">Donuttello</h1>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            {tabs.map(({ tab, color }) => (
              <a
                href={`#${tab.toLowerCase()}`}
                className={`${color} text-lg font-medium transition duration-200 hover:text-pink-600`}
                key={tab}
              >
                {tab}
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger Icon */}
          <button
            className="lg:hidden text-pink-600 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </header>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="lg:hidden fixed top-20 right-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 z-40 flex flex-col space-y-3 border border-pink-100">
            {tabs.map(({ tab, color }) => (
              <a
                href={`#${tab.toLowerCase()}`}
                className={`${color} text-lg font-semibold`}
                key={tab}
                onClick={() => setMenuOpen(false)}
              >
                {tab}
              </a>
            ))}
          </div>
        )}

        {/* Hero Section */}
        <section className="min-h-screen w-full flex flex-col items-center justify-center text-center px-6 pt-40 lg:flex-row lg:justify-between lg:text-left lg:px-20 lg:pt-0">
          <div className="hero-left flex flex-col items-center lg:items-start max-w-xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl text-pink-600 uppercase tracking-wider mb-4 font-extrabold">
              Donuttello
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-pink-500 tracking-wide mb-6 leading-relaxed">
              1 Bite. 24 Hours of Happiness.
            </p>
            <button className="rounded-full px-8 py-3 text-base sm:text-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-xl hover:from-pink-600 hover:to-purple-600 transition duration-300 transform hover:scale-105">
              Order Now
            </button>
          </div>

          <div className="hero-right hidden lg:flex items-center justify-center w-1/2 h-full">
            <img
              src={strawberry_donut}
              alt="Strawberry Donut"
              className="w-1/2 ml-40 transition-transform duration-300"
              ref={(el) => (donutRefs.current[0] = el)}
            />
            <div className="other-donuts flex flex-col">
              <img src={berries_donut} alt="Berries Donut" className="w-1/2 flex -ml-7" ref={(el) => (donutRefs.current[1] = el)} />
              <img src={pistachio_donut} alt="Pistachio Donut" className="w-1/2 flex ml-5" ref={(el) => (donutRefs.current[2] = el)} />
              <img src={banana_donut} alt="Banana Donut" className="w-1/2 flex mt-6 ml-5" ref={(el) => (donutRefs.current[3] = el)} />
              <img src={orange_donut} alt="Orange Donut" className="w-1/2 flex -ml-7 mt-1" ref={(el) => (donutRefs.current[4] = el)} />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl sm:text-5xl text-pink-600 font-bold mb-12 text-center">
              About Our Donuts
            </h2>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="lg:w-1/2 text-lg text-gray-600 leading-relaxed text-left">
                <p className="mb-6">
                  This special <span className="font-semibold text-pink-600">Donuttello Donut </span> is made with love, baked to perfection, and topped with a touch of joy... because every bite should feel like a celebration.
                </p>
                <p>
                  Handmade with love and bursting with sweetness, <span className="font-semibold text-pink-600">Donuttello Donuts</span> are your go-to treat for smiles, cravings, and cozy moments.
                </p>
              </div>

              <div className="lg:w-1/2 flex justify-center">
                <div className="relative">
                  <RotatingDonut />
                  <div className="absolute -inset-4 bg-pink-200 rounded-full opacity-30 blur-xl -z-10"></div>
                </div>
              </div>
            </div>

            <div className="mt-16 flex gap-6 justify-center flex-wrap">
              <img src={berries_donut} alt="Berries Donut" className="w-20 h-20 object-contain hover:scale-110 transition duration-300 rounded-xl shadow-md" />
              <img src={pistachio_donut} alt="Pistachio Donut" className="w-20 h-20 object-contain hover:scale-110 transition duration-300 rounded-xl shadow-md" />
              <img src={banana_donut} alt="Banana Donut" className="w-20 h-20 object-contain hover:scale-110 transition duration-300 rounded-xl shadow-md" />
              <img src={orange_donut} alt="Orange Donut" className="w-20 h-20 object-contain hover:scale-110 transition duration-300 rounded-xl shadow-md" />
            </div>
          </div>
        </section>

        {/* Flavors Section */}
        <section id="flavors" className="py-20 px-6 lg:px-20 bg-gradient-to-br from-pink-50/50 to-purple-50/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl sm:text-5xl text-pink-600 font-bold mb-12 text-center">
              Our Flavors
            </h2>
            <FlavorCarousel />
          </div>
        </section>

        {/* How It Works Section */}
        <HowItWorks />

        {/* Shop Section */}
        <section id="shop" className="py-20 px-6 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl sm:text-5xl text-pink-600 font-bold mb-12 text-center">
              Our Menu
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {donutImages.map((image, idx) => (
                <div
                  key={idx}
                  className="menu-item flex flex-col items-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-pink-100"
                  ref={(el) => (donutRefs.current[idx] = el)}
                >
                  <div className="flex justify-center mb-4">
                    <img
                      src={image}
                      alt={`Donut ${idx + 1}`}
                      className="w-32 h-32 object-contain transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-pink-600 mb-2 text-center">
                    Donut {idx + 1}
                  </h3>
                  <p className="text-gray-600 text-sm text-center mb-4">
                    A delightful treat that brings joy to every bite.
                  </p>
                  <button className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:from-pink-600 hover:to-purple-600 transition duration-300 transform hover:scale-105">
                    Order Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Offers Section */}
        <SpecialOffers />

        {/* Testimonials Section */}
        <section id="feed" className="py-20 px-6 lg:px-20 bg-gradient-to-br from-pink-50/50 to-purple-50/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl sm:text-5xl text-pink-600 font-bold mb-12 text-center">
              Customer Feedback
            </h2>
            <Testimonials />
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection />

        {/* Footer */}
        <footer className="bg-gradient-to-r from-pink-600 to-purple-700 text-white py-12 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Donuttello</h3>
              <p className="text-pink-100">
                Making every bite a moment of joy since 2020.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-pink-100">
                <li><a href="#about" className="hover:text-white transition">About</a></li>
                <li><a href="#shop" className="hover:text-white transition">Shop</a></li>
                <li><a href="#flavors" className="hover:text-white transition">Flavors</a></li>
                <li><a href="#feed" className="hover:text-white transition">Feedback</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-pink-100">
                <li>123 Sweet Street</li>
                <li>Donutville, DV 12345</li>
                <li>info@donuttello.com</li>
                <li>(123) 456-7890</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition transform hover:scale-110">
                  <span className="sr-only">Facebook</span>
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </a>
                <a href="#" className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition transform hover:scale-110">
                  <span className="sr-only">Instagram</span>
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </a>
                <a href="#" className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition transform hover:scale-110">
                  <span className="sr-only">Twitter</span>
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </a>
              </div>
            </div>
          </div>
          
          <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-pink-400/30 text-center text-pink-200">
            <p>&copy; {new Date().getFullYear()} Donuttello. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </main>
  );
};