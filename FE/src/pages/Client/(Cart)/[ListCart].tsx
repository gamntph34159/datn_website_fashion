import { ToastContainer } from "react-toastify"; // Import ToastContainer from react-toastify
import { List_Cart } from "../../../common/hooks/Cart/querry_Cart";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import { RecycleIcon } from "../../../resources/svg/Icon/Icon";
import Dow_btn from "./dow";
import Up_btn from "./up";
import { Mutation_Cart } from "../../../common/hooks/Cart/mutation_Carts";
import ScrollTop from "../../../common/hooks/Customers/ScrollTop";
import { Link } from "react-router-dom";
import { Pay_Mutation } from "../../../common/hooks/Pay/mutation_Pay";

const ListCart = () => {
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const { data, isPending, isError, calculateTotal, calculateTotalProduct } =
    List_Cart(userId);
  // if (isPending) return <p>Loading...</p>;
  // if (isError) return <p>Error...</p>;
  const { mutate } = Mutation_Cart("REMOVE");

  function remove_item(id: any) {
    if (window.confirm("Xac nhan xoa san pham ?")) {
      const data_item = {
        userId: userId,
        productId: id,
      };
      mutate(data_item);
    }
  }
  const { calcuateTotal } = Pay_Mutation();
  return (
    <div className="w-[95%] mx-[2.5%] mt-[110px]">
      <div className="flex items-center h-20 p-4 bg-gray-100 border">
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
      <>
        {" "}
        {!data?.products || data?.products.length === 0 ? (
          <div className="w-full md:mt-10 h-auto flex mb:flex-col md:flex-row gap-x-[5%] my-[30px] mb:gap-y-[30px] md:gap-y-0">
            <div className="w-full h-[200px] flex flex-col justify-center items-center">
              <img
                src="../../src/assets/Images/Products/no_products.png"
                className="h-40 w-44"
                alt=""
              />
              <p>Chưa có sản phẩm nào</p>
            </div>
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
                  {data?.products.map((item: any, index: number) => (
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
                          <strong className="font-semibold">{item.name}</strong>
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
                          <Dow_btn
                            dataProps={{
                              id_item: item.productId,
                              quantity_item: item.quantity,
                            }}
                          />
                          <strong className="cursor-pointer">
                            {item.quantity}
                          </strong>
                          <Up_btn dataProps={item.productId} />
                        </div>
                      </td>
                      <td className="pl-5">
                        <strong className="font-medium md:text-base mb:text-xs">
                          {item.price * item.quantity}
                        </strong>
                      </td>
                      <td>
                        <button onClick={() => remove_item(item.productId)}>
                          <RecycleIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:w-[27%] bg-white flex flex-col shadow-sm text-sm text-black">
              <div className="flex flex-col w-full h-full border rounded-lg lg:p-6 mb:p-4">
                <div className="flex justify-between *:md:text-base *:mb:text-sm *:font-medium">
                  <strong>Tổng giá trị đơn hàng</strong>
                  <p className="text-xl font-bold text-yellow-500">
                    {" "}
                    {calcuateTotal()}{" "}
                    <strong className="ml-3 text-black">$</strong>
                  </p>
                </div>
                <div className="flex justify-between mt-4 *:md:text-base *:mb:text-sm *:font-medium">
                  <strong>Số lượng đơn hàng :</strong>
                  <strong>{calculateTotalProduct()}</strong>
                </div>
                <div className="flex flex-col py-5 my-5 border-y">
                  <span className="mb-2 text-xs">Nhập mã giảm giá</span>
                  <form className="border-2 md:h-[45px] mb:h-[35px] border-black rounded overflow-hidden grid grid-cols-[70%_30%] auto-row-full mb-5">
                    <input
                      className="px-4 outline-none"
                      type="text"
                      placeholder="Enter Code"
                    />
                    <button className="grid text-gray-100 bg-black place-items-center md:text-base mb:text-sm">
                      Apply
                    </button>
                  </form>
                </div>
                <div className="flex justify-between *:md:text-base *:mb:text-sm *:font-medium">
                  <strong>Cần thanh toán :</strong>
                  <strong>${calculateTotal()}</strong>
                </div>
                <Link onClick={ScrollTop} to="pay">
                  <button className="px-4 py-3 mt-4 mr-5 font-semibold text-white duration-200 bg-black border border-black rounded hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
                    Tiến hành thanh toán
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </>
      {/* check account */}
      {/* <div className="w-full md:mt-10 h-auto flex mb:flex-col md:flex-row gap-x-[5%] my-[30px] mb:gap-y-[30px] md:gap-y-0">
        <span>Please log in to your account</span>
      </div> */}

      <ToastContainer />
    </div>
  );
};

export default ListCart;
