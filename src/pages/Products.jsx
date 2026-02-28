import Header from "../components/Header"
import Footer from "../components/Footer"
import '../style.css'
import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import AOS from 'aos'
function Products() {
    const [product, setProduct] = useState([]);
    const { categoryId } = useParams();

    useEffect(() => {
    fetch(`https://shoesstore.infinityfreeapp.com/shoestore-backend/api/products-by-category.php?category_id=${categoryId}`)
      .then(res => res.json())
      .then(data => {
        if (data.status) {
          setProduct(data.data);
        }
      });
  }, [categoryId]);

    useEffect(() => {
        AOS.init({
            duration : 800,
            once : true,
            easing : 'ease-in-out'
        });
    }, []);
    // console.log(product);
    return (
        <div>
        <Header />
            <div className='mt-5 bg-gray-100 w-full h-full'>
                <div className='py-2 px-10'>
                    <div className='mt-12 flex justify-center md:justify-between flex-wrap m-auto gap-y-10 gap-x-4 mb-10'>
                        {
                            product.map((p, index) => (
                                <Link to={`/product-detail/${p.id}`}>
                                    <div key={index} className='relative w-[220px] h-[310px] bg-white shadow-lg rounded-lg p-2 cursor-pointer hover:scale-[1.06]' data-aos="fade-up">
                                        <div className='absolute text-[14px] text-center font-bold text-green-500 top-3 right-3 blink'>
                                            {Math.floor(((p.old_price - p.new_price) / p.old_price) * 100)}% OFF
                                        </div>
                                        <div>
                                            <img src={`https://shoesstore.infinityfreeapp.com/shoestore-backend/uploads/image/${p.image}`} alt={`Product image`} />
                                        </div>
                                        <div>
                                            <h4 className='text-sm font-bold text-center tracking-[1px]'>{p.name}</h4>
                                            <div className='flex gap-5 justify-center'>
                                                <span className='text-[16px] line-through'>RS. {Number(p.old_price).toLocaleString()}</span>
                                                <span className='text-[16px] text-red-500'>RS. {Number(p.new_price).toLocaleString()}</span>
                                            </div>
                                            <button className='py-[3px] px-2 md:py-[4px] md:px-[8px] bg-blue-500 text-sm text-white mt-2 float-right mr-2 cursor-pointer'>Buy Now</button>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        <Footer />    
        </div>
    )
}

export default Products
