import { Link } from "react-router-dom";
import { RecycleIcon } from "../../../resources/svg/Icon/Icon";
import ScrollTop from "../../../common/hooks/Customers/ScrollTop";
import { ToastContainer } from "react-toastify"; // Import ToastContainer from react-toastify
import { useCart } from "../../../common/hooks/Cart/useCart"; // Đường dẫn tùy chỉnh theo cấu trúc thư mục của bạn
import { IProduct } from "../../../common/interfaces/Product";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";

const ListCart = () => {
  const {
    data,
    isLoading,
    isError,
    incrementQuantity,
    decreaseQuantity,
    removeProductInCart,
    calculateTotal,
    calculateTotalProduct
  } = useCart();
  const [user] = useLocalStorage("user", {});
  const account = user?.user;
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  return (
    <div className="w-[95%] mx-[2.5%] mt-[110px]">
      <div className="flex items-center border bg-gray-100 h-20 p-4">
        <ul className="flex gap-2">
          <li className="text-red-500">
            <a href="#">Home</a>
          </li>
          <li> / </li>
          <li>
            <a href="#">Cart</a>
          </li>
        </ul>
      </div>
      {account ? (
        <>
          {" "}
          {!data?.products || data?.products.length === 0 ? (
            <div className="w-full md:mt-10 h-auto flex mb:flex-col md:flex-row gap-x-[5%] my-[30px] mb:gap-y-[30px] md:gap-y-0">
              <span>Cart is empty</span>
            </div>
          ) : (
            <div className="w-full md:mt-10 h-auto flex mb:flex-col md:flex-row gap-x-[5%] my-[30px] mb:gap-y-[30px] md:gap-y-0">
              <div className="md:w-[70%] mb:w-full *:w-full">
                <table className="*:text-left table-auto">
                  <thead>
                    <tr className="*:font-medium *:md:text-sm *:mb:text-xs *:pb-6">
                      <th></th>
                      <th>Sản phẩm</th>
                      <th></th>
                      <th className="px-2">Đơn giá</th>
                      <th className="px-2">Số lượng</th>
                      <th className="pl-5">Tổng tiền</th>
                      <th className="px-2" />
                    </tr>
                  </thead>
                  <tbody>
                    {data?.products.map((item: IProduct, index: number) => (
                      <tr className="border-y" key={index}>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td className="w-[80px] py-5">
                          <img
                            className="relative bg-[#f2f2f2] rounded p-2 z-[1] w-[80px] h-[80px] duration-300"
                            src={item.image}
                            alt=""
                          />
                        </td>
                        <td className="pl-4 pr-2 md:w-[300px] mb:w-[120px]">
                          <div className="flex flex-col md:text-base mb:text-xs">
                            <strong className="font-semibold">
                              {item.name}
                            </strong>
                            <span>Loại: Áo</span>
                            <span>Size: S</span>
                          </div>
                        </td>
                        <td className="px-3">
                          <strong className="font-medium md:text-base mb:text-xs">
                            {item.price}
                          </strong>
                        </td>
                        <td className="pr-3">
                          <div className="w-[80%] flex items-center justify-around border md:py-2 mb:py-1 *:md:text-base *:mb:text-xs px-1 rounded-lg border-black *:font-medium">
                            <button>
                              <strong
                                className="font-medium"
                                onClick={() => {
                                  decreaseQuantity.mutate(item.productId);
                                }}
                              >
                                -
                              </strong>
                            </button>
                            <strong className="cursor-pointer">
                              {item.quantity}
                            </strong>
                            <button>
                              <strong
                                className="font-medium"
                                onClick={() =>
                                  incrementQuantity.mutate(item.productId)
                                }
                              >
                                +
                              </strong>
                            </button>
                          </div>
                        </td>
                        <td className="pl-5">
                          <strong className="font-medium md:text-base mb:text-xs">
                            {item.price * item.quantity}
                          </strong>
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              removeProductInCart.mutate(item.productId)
                            }
                          >
                            <RecycleIcon />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="md:w-[27%] bg-white flex flex-col shadow-sm text-sm text-black">
                <div className="w-full h-full flex flex-col lg:p-6 mb:p-4 border rounded-lg">
                  <div className="flex justify-between *:md:text-base *:mb:text-sm *:font-medium">
                    <strong>Tổng giá trị đơn hàng</strong>
                    <strong>{calculateTotal()}$</strong>
                  </div>
                  <div className="flex justify-between mt-4 *:md:text-base *:mb:text-sm *:font-medium">
                    <strong>Số lượng đơn hàng :</strong>
                    <strong>{calculateTotalProduct()}</strong>
                  </div>
                  <div className="flex flex-col border-y py-5 my-5">
                    <span className="text-xs mb-2">Nhập mã giảm giá</span>
                    <form className="border-2 md:h-[45px] mb:h-[35px] border-black rounded overflow-hidden grid grid-cols-[70%_30%] auto-row-full mb-5">
                      <input
                        className="px-4 outline-none"
                        type="text"
                        placeholder="Enter Code"
                      />
                      <button className="grid place-items-center bg-black text-gray-100 md:text-base mb:text-sm">
                        Apply
                      </button>
                    </form>
                  </div>
                  <div className="flex justify-between *:md:text-base *:mb:text-sm *:font-medium">
                    <strong>Cần thanh toán :</strong>
                    <strong>{calculateTotal()}$</strong>
                  </div>
                  <Link onClick={ScrollTop} to="pay">
                    <button className="px-4 py-3 mt-4 mr-5 duration-200 text-white font-semibold bg-black hover:bg-white hover:text-black border border-black rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
                      Tiến hành thanh toán
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="w-full md:mt-10 h-auto flex mb:flex-col md:flex-row gap-x-[5%] my-[30px] mb:gap-y-[30px] md:gap-y-0">
          <span>Please log in to your account</span>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default ListCart;
