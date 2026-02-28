import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function RelatedProducts({relProductId}) {
    const [relatedProducts, setRelatedProducts] = useState([]);
    useEffect(() => {
        if(!relProductId) return;
        fetch(`http://localhost/Projects/ShoeStore/shoestore-backend/api/related-products.php?rel_product_id=${relProductId}`)
        .then(res => res.json())
        .then(data => setRelatedProducts(data))
        .catch(err => console.error(err));
    },[relProductId]);
    console.log(relatedProducts);
    return (
        <div className='py-2 px-10'>
                <h1 className='text-2xl md:text-3xl font-bold text-gray-800 text-center tracking-[1px]'>Related Products</h1>
                <div className='w-[100px] h-[4px] rounded-lg bg-blue-500 m-auto mt-3'></div>
                <div className='mt-12 flex justify-center md:justify-between flex-wrap m-auto gap-y-10 gap-x-4 mb-10'>
                    {
                        relatedProducts.map((p, index) => (
                            <Link key={index} to={`/product-detail/${p.id}`}>
                                <div className='relative w-[220px] h-[310px] bg-white shadow-lg rounded-lg p-2 cursor-pointer hover:scale-[1.06]' data-aos="fade-up">
                                    <div className='absolute text-[14px] text-center font-bold text-green-500 top-3 right-3 blink'>
                                        {Math.floor(((p.old_price - p.new_price) / p.old_price) * 100)}% OFF
                                    </div>
                                    <div>
                                        <img src={`http://localhost/Projects/ShoeStore/shoestore-backend/uploads/image/${p.image}`} alt={`Product image`} />
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
    )
}

export default RelatedProducts