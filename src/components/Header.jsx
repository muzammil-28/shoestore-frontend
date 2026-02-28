import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faShoppingCart, faHeart, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";

function Header() {
    const [open, setOpen] = useState(false);
    const [menu, setMenu] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [searchProduct, setSearchProduct] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://shoesstore.infinityfreeapp.com/shoestore-backend/api/navbar.php")
            .then(res => res.json())
            .then(data => setMenu(data))
            .catch(err => console.error("Fetch error", err));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchProduct.trim()) return;
        navigate(`/search-product?search=${searchProduct}`)
    }

    useEffect(() => {
        fetch(`http://shoesstore.infinityfreeapp.com/shoestore-backend/api/check-login.php`, { credentials: "include" })
            .then(res => res.json())
            .then(data => setUserInfo(data.login ? data.user : null))
            .catch(err => console.error(err));
    }, []);

    const handleLogout = async () => {
        try {
            const logoutRes = await fetch(`https://shoesstore.infinityfreeapp.com/shoestore-backend/api/logout.php`,
                {
                    method: "POST",
                    credentials: "include"
                });
            const logoutData = await logoutRes.json();
            if (logoutData.status) {
                setUserInfo(null);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <header>
                <nav className="px-6 py-4 flex justify-between items-center">

                    {/* website ka Logo */}
                    <div>
                        <Link to={`/`} className="text-2xl font-bold text-blue-600">ShoeStore</Link>
                    </div>

                    {/* Desktop Menu */}
                    <ul className="md:flex md:space-x-6 hidden">
                        {
                            menu.filter(item => Number(item.parent_id) === 0).map(item => (
                                <li key={item.id} className="group relative">
                                    <Link
                                        to={`/${item.title}`}
                                        className="text-gray-800 hover:text-blue-500 relative after:absolute after:left-0 after:h-[3px] after:rounded-lg after:w-0 after:bg-blue-500 after:transition-all after:duration-300 after:-bottom-[5px] hover:after:w-full"
                                    >
                                        {item.title}
                                    </Link>
                                    <ul className="absolute mt-[4px] w-40 bg-white rounded shadow-2xl hidden group-hover:block transition-opacity duration-300 z-10">
                                        {
                                            menu.filter(sub => sub.parent_id === item.id).map(sub => (
                                                <li key={sub.id}>
                                                    <Link to={`/products/${sub.id}`} className="block px-4 py-2 hover:bg-blue-500 hover:text-white">
                                                        {sub.title}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </li>
                            ))
                        }
                    </ul>

                    {/* Desktop Right Section */}
                    <div className="flex items-center gap-4">

                        {/* Search Bar */}
                        <div className="hidden md:flex items-center w-full max-w-xs bg-white rounded-full border border-gray-400 overflow-hidden">
                            <form onSubmit={handleSearch} className="w-full">
                                <input
                                    type="search"
                                    placeholder="Search products..."
                                    value={searchProduct}
                                    onChange={(e) => setSearchProduct(e.target.value)}
                                    className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-l-full"
                                />
                            </form>
                        </div>

                        {/* Heart or cart ka button */}
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faHeart} size="xl" className='cursor-pointer' />
                            <Link to={`/cart-products`}>
                                <FontAwesomeIcon icon={faShoppingCart} size="xl" className='cursor-pointer' />
                            </Link>
                        </div>

                        {/* Login / User */}
                        <div className="md:flex md:space-x-2 hidden">
                            {!userInfo ? (
                                <>
                                    <Link to="/login-page" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md">
                                        Login
                                    </Link>
                                    <Link to="/register-page" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md">
                                        Register
                                    </Link>
                                </>
                            ) : (
                                <div className="relative group flex items-center gap-2">
                                    <button className='cursor-pointer flex items-center'>
                                        <FontAwesomeIcon icon={faUserCircle} className="text-2xl" />
                                    </button>

                                    {/* Dropdown */}
                                    <div className="
                                        absolute right-0 top-full w-56
                                        bg-white text-black rounded shadow-lg
                                        opacity-0 invisible
                                        group-hover:opacity-100 group-hover:visible
                                        transition duration-200 z-50"
                                    >
                                        <div className="px-4 py-3 border-b">
                                            <p className="font-semibold">{userInfo.name}</p>
                                            <p className="text-sm text-gray-500">{userInfo.email}</p>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Mobile Menu Toggle */}
                        <div onClick={() => setOpen(!open)} className='px-[7px] py-[1px] border border-gray-400 rounded-md cursor-pointer md:hidden'>
                            <FontAwesomeIcon icon={open ? faXmark : faBars} />
                        </div>
                    </div>
                </nav>

                {/* small device ka liye menu */}
                <div className={`md:hidden px-6 pb-4 space-y-4 overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0 py-0"}`}>


                    {
                        userInfo && (
                            <div>
                                <h4>Hi, {userInfo.name}</h4>
                                <p>{userInfo.email}</p>
                            </div>
                        )
                    }

                    {/* Search Bar */}
                    <div className="flex items-center w-full bg-white rounded-full border border-gray-400 overflow-hidden">
                        <form onSubmit={handleSearch} className="w-full">
                            <input
                                type="search"
                                placeholder="Search products..."
                                value={searchProduct}
                                onChange={(e) => setSearchProduct(e.target.value)}
                                className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                            />
                        </form>
                    </div>

                    {/* Mobile ka liye menu */}
                    <ul className="space-y-2 mt-2">
                        {
                            menu.filter(item => item.parent_id === "0").map(item => (
                                <li key={item.id} className="group">
                                    <a className="block text-gray-800 hover:text-blue-500 cursor-pointer mt-1">{item.title}</a>
                                    <ul className="hidden left-0 mt-2 w-40 rounded group-hover:block">
                                        {
                                            menu.filter(sub => sub.parent_id === item.id).map(sub => (
                                                <li key={sub.id}>
                                                    <Link to={`/products/${sub.id}`} className="block px-4 py-2 hover:text-blue-500">
                                                        {sub.title}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </li>
                            ))
                        }
                    </ul>
                    {/* logout button tab show ho ga jab user login ho ga  */}
                    {
                        userInfo && (
                            <button
                                onClick={handleLogout}
                                className="text-red-600 hover:bg-gray-100 cursor-pointer"
                            >
                            Logout
                            </button>
                        )
                    }
                    {/* agr user login ni ha tab login/register ka button */}
                    <div className="pt-2 flex items-center justify-between">
                        {!userInfo && (
                            <div className="flex space-x-2 w-full">
                                <Link to="/login-page" className="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
                                    Login
                                </Link>
                                <Link to="/register-page" className="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
            </header>
        </div>
    )
}

export default Header