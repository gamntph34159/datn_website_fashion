import { useForm } from "react-hook-form";
import { Pay_Mutation } from "../../../common/hooks/Pay/mutation_Pay";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import { List_Auth } from "../../../common/hooks/Auth/querry_Auth";
import { Spin, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  Add_Address,
  List_Address,
} from "../../../components/common/Client/_component/Address";
import { Address, Chevron_right } from "../../../components/common/Client/_component/Icons";
import { useNavigate } from "react-router-dom";

const Pay = () => {
  const routing = useNavigate();
  const [user] = useLocalStorage("user", {});
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState(false);
  const userId = user?.user?._id;
  const { data: auth, isLoading } = List_Auth(userId);
  console.log(auth);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const { register, handleSubmit, setValue } = useForm();
  const { onSubmit, contextHolder, messageApi } = Pay_Mutation();
  const data_sessionStorage = sessionStorage.getItem("item_order");
  let data: any;
  if (data_sessionStorage) {
    data = JSON.parse(data_sessionStorage);
  } else {
    routing("/");
  }
  useEffect(() => {
    if (auth && auth?.address) {
      setSelectedAddress(auth?.address);
      setValue("userName", auth?.address?.fullName);
      setValue("phone", auth?.address?.phoneNumber);
      setValue("email", auth?.email);
      setValue("address", `${auth?.address?.addressDetails} - ${auth?.address?.address}`);
    }
  }, [auth, setValue]);

  const handleTAdd = () => {
    setAddress(!address);
    if (isOpen) setIsOpen(false);
  };

  const handleAddress = () => {
    setIsOpen(!isOpen);
    if (address) setAddress(false);
  };
  const handleAddressSelect = (address: any) => {
    setSelectedAddress(address);
    setIsOpen(false);
    setValue("userName", address?.fullName);
    setValue("phone", address?.phoneNumber);
    setValue("email", address?.email)
    setValue("address", `${address?.addressDetails} - ${address?.address}`);
  };

  // add order
  function onAddOrder(data_form: any) {
    if (!data_form.address || data_form.address.trim() === "") {
      messageApi.open({
        type: "warning",
        content: "Vui lòng chọn chọn đại chỉ!",
      });
      return
    }
    const item_order = {
      userId: userId,
      items: data?.data_order,
      customerInfo: {
        ...data_form
      },
      totalPrice: data?.totalPrice,
      email: user?.user?.email,
    };
    onSubmit(item_order);

  }
  const dataSo = data?.data_order.map((order: any) => {
    return {
      key: order.productId._id,
      ...order
    }
  })
  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'image_product',
      key: 'image_product',
      render: (_: any, order: any) => (
        <img src={order.productId.image_product} className="w-[70px] lg:w-[100px] lg:h-[100px]" alt="" />
      ),
    },
    {
      dataIndex: 'name_product',
      key: 'name_product',
      render: (_: any, order: any) => (
        <div className="lg:flex lg:items-center gap-32">
          <div>
            <h1 className="font-bold text-sm lg:text-base">{order?.productId?.name_product}</h1>
            <p className="border border-stone-200 rounded my-1 lg:my-3 px-3 py-1 lg:py-2 lg:w-[220px] w-full text-xs lg:text-sm">
              Đổi trả miễn phí 15 ngày
            </p>
            <div className="flex justify-between md:hidden mt-2">
              <p className="text-sm lg:text-base">{order?.price_item?.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}</p>
              <p className="text-sm lg:text-base">x {order?.quantity}</p>
            </div>
          </div>
          <p className="font-bold w-28 p-0 text-xs lg:text-sm mt-2 lg:mt-0">
            Loại: {order?.color_item} - {order?.name_size}
          </p>
        </div>
      ),
    },
    {
      dataIndex: 'price_product',
      key: 'price_product',
      render: (_: any, order: any) => (
        <p className="hidden lg:block text-sm lg:text-base">{order?.price_item?.toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        })}</p>
      ),
    },
    {
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_: any, order: any) => (
        <p className="hidden lg:block text-sm lg:text-base"> x {order?.quantity}</p>
      ),
    },
    {
      dataIndex: 'total_price_item',
      key: 'total_price_item',
      render: (_: any, order: any) => (
        <p className="font-bold hidden lg:block text-sm lg:text-base">
          {order?.total_price_item?.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })}
        </p>
      ),
    },
  ];

  return (
    <>
      <div className="xl:w-[1440px] w-[95vw] mx-auto">
        {contextHolder}
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
          </div>
        ) : (
          <div className="mt-20">
            <div className="mb-6">
              <div className="flex items-center gap-3 bg-[#F5F5F5] py-6">
                <img
                  src="../../src/assets/Images/Logo/logo.png"
                  className="w-[50px] h-[50px]"
                  alt=""
                />
                <span className="h-[50px] border-black border-r-2"></span>
                <h1 className="text-2xl font-bold">Thanh Toán</h1>
              </div>
            </div>
            <form onSubmit={handleSubmit(onAddOrder)}>
              <div className="p-2 lg:py-6 lg:px-6 border rounded shadow-sm">
                <div className="flex gap-3">
                  <Address />
                  <p>Địa chỉ nhận hàng</p>
                </div>
                <div className="flex justify-between lg:justify-normal gap-12 flex-wrap pl-9">
                  <div className="flex items-center gap-4">
                    <h1 className="font-bold">{selectedAddress?.fullName}</h1>
                    <p className="font-bold">{selectedAddress?.phoneNumber}</p>
                    <p>{selectedAddress?.addressDetails + " - " + selectedAddress?.address}</p>
                  </div>
                  <div className="flex items-center gap-8">
                    {/* {!selectedAddress?.checked === true ? ('') : (
                      <div className="border py-2 px-4 rounded border-black hidden lg:block">
                        Mặc định
                      </div>
                    )} */}
                    <div
                      className="text-blue-400 underline cursor-pointer"
                      onClick={handleAddress}
                    >
                      <span className="hidden lg:block">Thay đổi</span>
                      <span className="md:hidden block">
                        <Chevron_right />
                      </span>
                    </div>

                  </div>
                </div>
              </div>
              <div className="border my-4 rounded shadow-sm">
                {/* <table className="w-full">
                <thead className=" *:py-3 *:px-6 *:font-normal hidden lg:block ">
                  <th className="w-[800px] text-left">Sản phẩm</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </thead>
                <tbody>
                  {data?.data_order?.map((item: any) => (
                    <tr className="*:text-center">
                      <td className="flex items-center justify-between *:py-3 *:px-6">
                        <div className="flex items-center gap-5">
                          <img
                            src={item?.productId?.image_product}
                            className="w-[100px] h-[100px]"
                            alt=""
                          />
                          <div className="flex flex-col">
                            <p className="mb-3 font-bold text-left">
                              {item?.productId?.name_product}
                            </p>
                            <p className="border border-stone-200 rounded py-2 w-[220px]">
                              Đổi trả miễn phí 15 ngày
                            </p>
                          </div>
                        </div>
                        <div className="mr-12">
                          <p className="font-bold w-28 p-0">
                            Loại: {item?.color_item} - {item?.name_size}
                          </p>
                        </div>
                      </td>
                      <td>
                        {item?.productId?.price_product.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                      <td>{item?.quantity}</td>
                      <td>
                        <p className="font-bold">
                          {item?.total_price_item?.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table> */}
                <Table columns={columns} dataSource={dataSo} pagination={false} />
                <div className="flex items-center justify-end gap-8 p-6">
                  {/* <p>Tổng số tiền ( {calculateTotalProduct()} sản phẩm):</p> */}
                  <p className="text-xl font-bold text-black">
                    {data?.totalPrice?.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
              </div>
              <div className="border mt-4 mb-8 rounded shadow-sm">
                <div className="border-b flex justify-between px-6 py-6">
                  <p className="text-xl">Phương thức thanh toán</p>
                  <div className="flex gap-8 items-center">
                    <select
                      className="border rounded p-2"
                      {...register("payment", { required: true })}
                    >
                      <option value="Thanh toán khi nhận hàng">
                        Thanh toán khi nhận hàng
                      </option>
                      <option value="VNPAY">Thanh toán qua VNPAY</option>
                      <option value="MoMo">Thanh toán bằng MoMo</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end py-6 px-6 border-b">
                  <div>
                    <div className="flex justify-between py-3 gap-16">
                      <p>Tổng tiền hàng</p>
                      <p>
                        {data?.totalPrice?.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                    </div>
                    <div className="flex justify-between py-3 gap-16">
                      <p>Phí vận chuyển</p>
                      <p>0đ</p>
                    </div>
                    {/* <div className="flex justify-between py-3 gap-16">
                                        <p>Tổng cộng Voucher giảm giá:</p>
                                        <p>-₫50.000</p>
                                    </div> */}
                    <div className="flex justify-between py-3 gap-16">
                      <p>Tổng thanh toán</p>
                      <p className="text-xl font-bold text-black">
                        {data?.totalPrice?.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center py-6 px-6">
                  <p>
                    Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo{" "}
                    <span className="text-blue-400">Điều khoản</span>
                  </p>
                  <button
                    className="w-[200px] py-3 bg-black text-white font-bold rounded"
                    type="submit"
                  >
                    Đặt hàng
                  </button>
                </div>
              </div>
            </form >
            {address && <Add_Address handleAddress={handleAddress}></Add_Address>
            }
            {
              isOpen && (
                <List_Address
                  auth={auth.address}
                  handleTAdd={handleTAdd}
                  handleAddressSelect={handleAddressSelect}
                  handleAddress={handleAddress}
                ></List_Address>
              )
            }
          </div >
        )}
      </div>

    </>
  );
};

export default Pay;
