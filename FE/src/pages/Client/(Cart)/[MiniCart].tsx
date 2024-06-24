import { Link } from "react-router-dom"
import ScrollTop from "../../../common/hooks/Customers/ScrollTop"
import { RecycleIcon } from "../../../resources/svg/Icon/Icon"

const MiniCart = () => {
    return (<div className="absolute rounded bg-white shadow mb:w-[70%] lg:w-[25%] duration-300 right-[7%] group-hover:scale-100 scale-0 shadow-2xl 
    p-4 group-hover:translate-y-[15px] group-hover:translate-x-0 translate-x-1/2 -translate-y-1/2 before:content-[''] 
    before:absolute before:w-[35px] before:h-[20px] before:right-[-5px] before:top-0 before:translate-y-[-100%]">
            <div className="mb-[20px]">
                <span className="text-sm">You have 3 items in you cart</span>
            </div>
            {/* list */}
            <div className="grid h-full grid-flow-rows">
                {/* list items cart */}
                <div className="border-b w-full grid grid-cols-[70px_auto] py-[20px] gap-3 auto-rows-[70px]">
                    {/* img product */}
                    <div className="bg-[#f2f2f2] p-2">
                        <img className="relative z-[1] w-full h-full duration-300" src="assets/Images/ethnic.png" alt='' />
                    </div>
                    <div className="w-full flex justify-between">
                        {/* infor product */}
                        <div className="flex flex-col *:text-sm justify-between">
                            <span>San pham 1</span>
                            <strong>1 x $ 80.00</strong>
                            <span>Size: S</span>
                        </div>
                        {/* remove product */}
                        <div className="flex items-end cursor-pointer">
                            <RecycleIcon/>
                        </div>
                    </div>
                </div>
                {/* ---- */}
            </div>
            {/* subtotal */}
            <div>
                <div className="flex justify-between items-center my-6">
                    <strong>Subtotal</strong>
                    <strong>$200.00</strong>
                </div>
                {/*  */}
                <div className="flex flex-col gap-y-[20px] *:rounded-md *:w-full *:h-[55px] *:grid *:place-items-center *:text-sm">
                    <Link onClick={ScrollTop} to={'/cart'} className="bg-black text-white cursor-pointer" >View Cart</Link>
                </div>
            </div>
    </div>
    )
}

export default MiniCart