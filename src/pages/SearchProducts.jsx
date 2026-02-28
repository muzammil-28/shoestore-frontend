import { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import Header from "../components/Header";
import Footer from "../components/Footer";

function SearchProducts() {
    const [params] = useSearchParams();
    const search = params.get("search");

    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!search) return;
        fetch(`https://shoesstore.infinityfreeapp.com/shoestore-backend/api/search-product.php?search-prod=${search}`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    }, [search]);

    // console.log(products);

    return (
        <div>
            <Header />
            <div className="p-10">
                <h1 className="text-2xl font-bold mb-6">
                    Search Result for: "{search}"
                </h1>

                {/* search products  */}
                <div className='mt-12 flex justify-center md:justify-between flex-wrap m-auto gap-y-10 gap-x-4 mb-10'>
                    {
                        products.map((p, index) => (
                            <Link key={index} to={`/product-detail/${p.id}`}>
                                <div className='relative w-[220px] h-[310px] bg-white shadow-lg rounded-lg p-2 cursor-pointer hover:scale-[1.06]' data-aos="fade-up">
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
            <Footer />
        </div>
    )
}

export default SearchProducts