import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
        faFacebook, 
        faInstagram, 
        faWhatsapp, 
        faTwitter 
} from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div className="w-full bg-blue-500">
        <div className="flex justify-center md:justify-between gap-5 flex-wrap items-center py-4 px-12">
            <div className="w-[240px] h-[150px]">
                <h1 className="text-white font-bold text-2xl">ShoeStore</h1>
                <p className="text-sm text-white mt-4 tracking-wide">
                    Quality Shoes for Men & Women.  
                    Formal, Casual & Sandals at best prices.
                </p>
                <div className='mt-4 flex gap-1'>
                    <span><FontAwesomeIcon icon={faFacebook} size="xl" className='text-white cursor-pointer transform hover:scale-[1.1]' /></span>
                    <span><FontAwesomeIcon icon={faInstagram} size="xl" className='text-white cursor-pointer hover:scale-[1.1]' /></span>
                    <span><FontAwesomeIcon icon={faWhatsapp} size="xl" className='text-white cursor-pointer hover:scale-[1.1]' /></span>
                    <span><FontAwesomeIcon icon={faTwitter} size="xl" className='text-white cursor-pointer hover:scale-[1.1]' /></span>
                </div>
            </div>
            <div className='w-[180px] h-[200px]'>
                <h1 className="text-white font-bold text-[19px]">Quick Links</h1>
                <a href="#" className='block text-white mt-2'>Home</a>
                <a href="#" className='block text-white mt-2'>Men</a>
                <a href="#" className='block text-white mt-2'>Women</a>
                <a href="#" className='block text-white mt-2'>About</a>
                <a href="#" className='block text-white mt-2'>Contact</a>
            </div>
            <div className='w-[180px] h-[200px]'>
                <h1 className="text-white font-bold text-[19px]">Customer Service</h1>
                <a href="#" className='block text-white mt-2'>Contact Us</a>
                <a href="#" className='block text-white mt-2'>FAQs</a>
                <a href="#" className='block text-white mt-2'>Return & Exchange</a>
                <a href="#" className='block text-white mt-2'>Track Order</a>
                <a href="#" className='block text-white mt-2'>Size Guide</a>
            </div>
            <div className='w-[180px] h-[200px]'>
                <h1 className="text-white font-bold text-[19px]">Policies</h1>
                <a href="#" className='block text-white mt-2'>Privacy Policy</a>
                <a href="#" className='block text-white mt-2'>Terms & Conditions</a>
                <a href="#" className='block text-white mt-2'>Refund Policy</a>
                <a href="#" className='block text-white mt-2'>Shipping Policy</a>
            </div>
            <div className='w-[230px] h-[200px]'>
                <h1 className="text-white font-bold text-[19px]">Contact</h1>
                <a href="#" className='block text-white mt-2'>Address: Pakistan</a>
                <a href="#" className='block text-white mt-2'>Phone: +92 313 0000000</a>
                <a href="#" className='block text-white mt-2'>Email: support@shoestore.com</a>
            </div>
        </div>
        <div className='w-full h-[1px] bg-white mt-2'></div>
        <div className='text-center py-3'>
            <p className='text-white'>© 2026 ShoeStore. All rights reserved.Built by Muzammil Islam</p>
        </div>
    </div>
  )
}

export default Footer