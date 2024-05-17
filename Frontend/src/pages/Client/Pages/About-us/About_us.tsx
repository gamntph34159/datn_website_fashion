import { SearchIcon, CartIcon, HeartIcon, NoteIcon, ArrowRight } from "../../../../resources/svg/Icon/Icon";
import './style.css'
const AboutUS = () => {
    return (
        <div className="container mx-auto max-w-[1200px]">
            <header className="flex items-center h-[100px]">
                <a href="#" className="w-28 h-20 mr-2 ">
                    <img
                        src="../../../src/resources/images/Logo/logo_chung.png"
                        alt="Logo"
                    />
                </a>
                <nav className="flex-grow">
                    <ul className="flex justify-center gap-10 text-base font-semibold text-[#222222]">
                        <li>
                            <a href="#" className="border-[#f68e56] hover:border-b-2">
                                HOME
                            </a>
                        </li>
                        <li>
                            <a href="#" className="border-[#f68e56] hover:border-b-2">
                                SHOP
                            </a>
                        </li>
                        <li>
                            <a href="#" className="border-[#f68e56] hover:border-b-2">
                                CATEGORIES
                            </a>
                        </li>
                        <li>
                            <a href="#" className="border-[#f68e56] hover:border-b-2">
                                BLOG
                            </a>
                        </li>
                        <li>
                            <a href="#" className="border-[#f68e56] hover:border-b-2">
                                CONTACT
                            </a>
                        </li>
                        <li className="relative">
                            <a href="#" className="border-[#f68e56] hover:border-b-2">
                                PAGES
                            </a>
                            <ul className="absolute top-full left-0 hidden bg-white border rounded-sm mt-1 w-32">
                                <li>
                                    <a href="/about-us" className="block px-4 py-2 hover:bg-gray-100">About Us</a>
                                </li>
                                <li>
                                    <a href="/faqs" className="block px-4 py-2 hover:bg-gray-100">FAQs</a>
                                </li>
                                <li>
                                    <a href="/delivery" className="block px-4 py-2 hover:bg-gray-100">Delivery</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <nav className="ml-auto ">
                    <ul className="flex items-center float-right gap-10">
                        <li>
                            <a href="#">
                                <SearchIcon />
                            </a>
                        </li>
                        <li>
                            <a href="/cart">
                                <CartIcon />
                            </a>
                        </li>
                        <li>
                            <a href="/favourite">
                                <HeartIcon />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-white transition-colors duration-300 hover:text-orange-500"
                            >
                                <NoteIcon />
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
            <div>
                <div className="flex items-center bg-gray-100 h-20 p-4 mx-w-[1200px]">
                    <ul className="flex gap-2">
                        <li className="text-red-500"><a href="#">Home </a></li>
                        <li> / </li>
                        <li><a href="#">About us</a></li>
                    </ul>
                </div>
            </div>
            <div>
                <div className="text-center mb-16">
                    <div className="mb-20 mt-9 ">
                        <p className="font-bold text-xl mb-5 uppercase tracking-wider ">Meet our team</p>
                        <nav className="w-[700px]  mx-auto text-center font-thin text-gray-500 ">
                            Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica. Lorem Khaled Ipsum is a major key to success. They don’t want us to win. Always remember in the jungle there’s a lot of they in there, after you overcome they, you will make it to paradise. Major key, don’t fall for the trap, stay focused. It’s the ones closest to you that want to see you fail. Major key, don’t fall for the trap, stay focused. It’s the ones closest to you that want to see you fail. You see the hedges, how I got it shaped up? It’s important to shape up your hedges, it’s like getting a haircut, stay fresh.
                        </nav>
                    </div>
                    <div className="grid grid-cols-3 gap-4 *:bg-gray-100">
                        <div className="border p-4">
                            <img src="../../../src/resources/images/logo/images.jpg" alt="" className="w-full h-48" />
                            <div className="text-left mt-5  font-thin">
                                <p className="font-bold text-gray-500">Patrict</p>
                                <p className="text-sm">CEO & Founder of Stark Store.</p>
                                <nav className="text-sm">Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera.</nav>
                            </div>
                        </div>

                        <div className="border p-4">
                            <img src="../../../src/resources/images/logo/images.jpg" alt="" className="w-full h-48" />
                            <div className="text-left mt-5  font-thin">
                                <p className="font-bold text-gray-500">Patrict</p>
                                <p className="text-sm">CEO & Founder of Stark Store.</p>
                                <nav className="text-sm">Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera.</nav>
                            </div>
                        </div>
                        <div className="border p-4">
                            <img src="../../../src/resources/images/logo/images.jpg" alt="" className="w-full h-48" />
                            <div className="text-left mt-5  font-thin">
                                <p className="font-bold text-gray-500">Patrict</p>
                                <p className="text-sm">CEO & Founder of Stark Store.</p>
                                <nav className="text-sm">Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera.</nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <iframe width="1200" height="500" src="https://www.youtube.com/embed/_9VUPq3SxOc"  ></iframe>
                </div>
                <div className="mb-5 mt-5 text-center">
                    <h2 className="p-5 text-center text-4xl">Our Collector</h2>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="border border-gray-300">
                            <div className="text-center image-container">
                                <img
                                    src="../../../src/resources/images/products/interior-design-concept-sale-home-260nw-2169578877.webp"
                                    alt=""
                                    className="w-full h-96"
                                />
                                <p className="text-lg font-thin mt-5 p-3 flex justify-center items-center">
                                    Dép Màu Đen
                                    <div className="w-5 h-5 ml-2">
                                        <ArrowRight />
                                    </div>
                                </p>
                            </div>
                        </div>
                        <div className="border border-gray-300">
                            <div className="text-center image-container">
                                <img
                                    src="../../../src/resources/images/products/interior-design-concept-sale-home-260nw-2169578877.webp"
                                    alt=""
                                    className="w-full h-96"
                                />
                                <p className="text-lg font-thin mt-5 p-3 flex justify-center items-center">
                                    Dép Màu Đen
                                    <div className="w-5 h-5 ml-2">
                                        <ArrowRight />
                                    </div>
                                </p>
                            </div>
                        </div>
                        <div className="border border-gray-300">
                            <div className="text-center image-container">
                                <img
                                    src="../../../src/resources/images/products/interior-design-concept-sale-home-260nw-2169578877.webp"
                                    alt=""
                                    className="w-full h-96"
                                />
                                <p className="text-lg font-thin mt-5 p-3 flex justify-center items-center">
                                    Dép Màu Đen
                                    <div className="w-5 h-5 ml-2">
                                        <ArrowRight />
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-5 ">
                        <div className="bg-amber-700 p-3 w-28 border text-center text-white ">
                            <button >Views all</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default AboutUS;