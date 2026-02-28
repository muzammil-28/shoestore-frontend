import { useState, useEffect } from 'react';
// import Slide from "../assets/image"
const Slider = ({autoPlayInterval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  useEffect(() => {
    fetch('https://shoesstore.infinityfreeapp.com/shoestore-backend/api/slider.php')
    .then(res => res.json())
    .then(data => setSlides(data))
    .catch(err => console.error("Fetching error.", err));
  }, []);
  // Auto-play functionality
  useEffect(() => {
    if(slides.length === 0) return ;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, autoPlayInterval);
    return () => clearInterval(interval); // Cleanup on unmount
  }, [slides.length, autoPlayInterval]);

  // Manual navigation
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  console.log(slides);
  return (
    <div className="relative w-full mx-auto overflow-hidden">
      {/* Slider container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((img, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img
              src={`https://shoesstore.infinityfreeapp.com/shoestore-backend/uploads/image/${img.image}`}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 text-blue-500 p-2 rounded-full hover:bg-opacity-75 cursor-pointer transition-opacity"
      >
        &#10094; {/* Left arrow */}
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 text-blue-500 p-2 rounded-full hover:bg-opacity-75 cursor-pointer transition-opacity"
      >
        &#10095; {/* Right arrow */}
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;