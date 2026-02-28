import { useEffect, useState } from "react";

function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
        if(window.scrollY > 300)
        {
            setShowButton(true);
        }else{
            setShowButton(false);
        }
    }
    window.addEventListener("scroll", handleScroll);
    return () => removeEventListener("scroll", handleScroll);
  },[])

  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior : "smooth",
    });
  }

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="sm:w-[35px] md:w-[50px] h-[50px] fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-3 rounded-2xl shadow-lg hover:bg-gray-800 transition"
        >
          ↑
        </button>
      )}
    </>
  );
}

export default ScrollToTopButton;