import Header from '../components/Header'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import RelatedProducts from '../components/RelatedProducts';
import Footer from '../components/Footer';

function ProductDetail() {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isAddToCart, setIsAddToCart] = useState(false);

  useEffect(() => {
    fetch(`http://localhost/Projects/ShoeStore/shoestore-backend/api/product-detail.php?id=${id}`)
      .then(res => res.json())
      .then(data => {
                    setProductDetail(data);
                    setMainImage(data.image[0])
      })
      .catch(err => console.error(err))
  }, [id]);

  // quantity ka liye
  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // add-to-cart ka liye
  const handleAddToCart = async () => {
    try{
      const cartRes = await fetch(
        "http://localhost/Projects/ShoeStore/shoestore-backend/api/add-to-cart.php",
        {
          method : "POST",
          headers : {"Content-Type" : "application/json"},
          credentials : "include",
          body : JSON.stringify({
            product_id : id,
            qty : quantity
          })
        }
      )
      const cartData = await cartRes.json();

      if(cartData.login === false)
      {
        navigate("/login-page");
        return;
      }

      if(cartData.status)
      {
        setMessageType("true");
        setMessage(cartData.message)
        setIsAddToCart(true);
      }else{
        setMessageType("false");
        setMessage(cartData.message)
      }
    }catch(err)
    {
      console.error("Add to cart error.", err);
    }
    // console.log(cartData.status);
  };

  // add-to-cart message 
  useEffect(() => {
    const messageTime = setTimeout(() => {
      setMessage("");
    }, 1000);
    return () => clearTimeout(messageTime);
  });

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
    console.log(isFavorite ? "Removed from Favorite" : "Added to Favorite");
  };

  const handleBuyNow = () => {
    if(!isAddToCart)
    {
      alert("Please Add To Cart First.");
      return;
    }
    navigate(`/checkout/product/${id}`)
  }

  return (
    <div>
      <Header />
      {message && (
        <div className={`mb-4 p-3 rounded text-white text-center ${messageType === "true" ? "bg-green-500" : "bg-red-500"}`}>
          {message}
        </div>
      )}
      {
        !productDetail ? (<p>Loading...</p>) : (

          <div className='py-4 px-12 mt-5 flex flex-wrap gap-y-3 md:justify-between'>

            <div className='w-[40vw] md:w-100 border border-8 border-gray-200 rounded-2xl p-1'>

              {/* product ki image */}
              <div className='w-full md:h-[350px] overflow-hidden group object-cover'>
                <img src={`http://localhost/Projects/ShoeStore/shoestore-backend/uploads/image/${mainImage}`} className='group-hover:scale-110 cursor-pointer' />
              </div>
              <div className="flex gap-3 mt-3 justify-center">
                  {
                    productDetail.image?.map((img, index) => (
                      <img 
                        key={index}
                        src={`http://localhost/Projects/ShoeStore/shoestore-backend/uploads/image/${img}`}
                        onClick={() => setMainImage(img)} 
                        className={`w-15 h-15 object-cover border rounded cursor-pointer ${mainImage === img ? "border-blue-500" : "border-gray-300"}`}
                      />
                    ))
                  }
              </div>
            </div>

            <div className='w-[57vw]'>
              {/* product ka name */}
              <h1 className='text-xl font-bold md:text-2xl tracking-[1px]'>{productDetail.name}</h1>

              {/* product ki price */}
              <div className='flex gap-5 mt-2'>
                <span className='text-[16px] md:text-[20px] line-through'>RS. {Number(productDetail.old_price).toLocaleString()}</span>
                <span className='text-[16px] md:text-[20px] text-red-500'>RS. {Number(productDetail.new_price).toLocaleString()}</span>
              </div>

              {/* product ka size section  */}
              <div className='mt-2'>
                <h2 className='font-bold'>Size : <span className='font-medium ml-1'>Available all size.</span></h2>
              </div>
              
              {/* product buy info  */}
              <div className='w-[225px] md:w-[350px] flex mt-5 justify-between'>

                {/* product quantity */}
                <div className="flex items-center gap-2 md:gap-4 mb-6">
                  <button
                    onClick={decrement} className="px-2 py-[3px] md:px-4 md:py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">
                    -
                  </button>
                  <span className="px-2 py-[3px] md:px-4 md:py-1 border rounded">{quantity}</span>
                  <button
                    onClick={increment} className="px-2 py-[3px] md:px-4 md:py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">
                    +
                  </button>
                </div>

                {/* Add to cart button  */}
                <div>
                  <button
                    onClick={handleAddToCart} 
                    className="bg-blue-500 text-white text-[13px] px-2 py-2 w-[85px] md:px-[12px] md:py-[9px] md:w-[120px] md:text-[15px] rounded hover:bg-blue-600 transition cursor-pointer">
                    Add to Cart
                  </button>
                </div>

                {/* product favorite button */}
                <div>
                  <button 
                    onClick={toggleFavorite} 
                    className={`py-1 px-2 md:py-2 md:px-3 rounded-full border ${isFavorite ? "bg-red-500 text-white" : "text-gray-700"} transition hover:scale-110`}>
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                </div>
              </div>

              {/* product buy krne ka button */}
              <button  
                onClick={handleBuyNow}
                className="w-[50%] bg-blue-500 text-white md:px-6 md:py-2 py-1 px-3 rounded rounded-lg hover:bg-blue-600 transition cursor-pointer">
                Buy It Now
              </button>

              {/* product ki description */}
              <div className='w-full mt-5'>
                  <h2 className='font-bold'>Description : </h2>
                  <p className='w-full text-justify'>{productDetail.text}</p>
              </div>
            </div>
            
          </div>
        )
      }
      {productDetail && (
        <RelatedProducts relProductId={productDetail.category_id}/>
      )}
      <Footer />
    </div>
  )
}

export default ProductDetail