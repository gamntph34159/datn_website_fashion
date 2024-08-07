import { Link } from "react-router-dom";
import Products from "../../../components/common/Items/Products";
import { useRef } from "react";
import ScrollTop from "../../../common/hooks/Customers/ScrollTop";
import { Query_Products } from "../../../common/hooks/Products/Products";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { IProduct } from "../../../common/interfaces/Product";

const Trending_Products = () => {
  const { data, isLoading } = Query_Products();
  const sizeListItems = useRef<HTMLDivElement | null>(null);
  const backItems = useRef<HTMLButtonElement | null>(null);
  const nextItems = useRef<HTMLButtonElement | null>(null);

  const handleNext = () => {
    if (sizeListItems.current) {
      const offsetWidthListItems = sizeListItems.current.offsetWidth || 0;
      const sizeGapColumn = parseFloat(
        window
          .getComputedStyle(sizeListItems.current)
          .getPropertyValue("column-gap")
          .replace("%", "")
      );
      sizeListItems.current.scrollLeft =
        sizeListItems.current.scrollLeft +
        offsetWidthListItems +
        (sizeGapColumn / 100) * offsetWidthListItems;
    }
  };

  const handlePrevious = () => {
    if (sizeListItems.current) {
      const offsetWidthListItems = sizeListItems.current.offsetWidth || 0;
      const sizeGapColumn = parseFloat(
        window
          .getComputedStyle(sizeListItems.current)
          .getPropertyValue("column-gap")
          .replace("%", "")
      );
      sizeListItems.current.scrollLeft =
        sizeListItems.current.scrollLeft -
        offsetWidthListItems -
        (sizeGapColumn / 100) * offsetWidthListItems;
    }
  };

  return (
    <div className="py-16 text-center border-b overflow-hidden ">
      {/* title */}
      <div className="text-center flex flex-col items-center mb-[50px]">
        <span className="text-[42px] font-medium tracking-wide mb-[20px]">
          Sản phẩm nổi bật
        </span>
        <p className="opacity-80 text-[16px]my-4">
          Find a bright ideal to suit your taste width our great selection of
          suspension.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-[200px]">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      ) : (
        <>
          {/* products */}
          {data?.length === 0 ? (
            <div className="flex justify-center items-center">
              <img
                src="../../src/assets/Images/Products/no-data.png"
                alt="Không có sản phẩm"
              />
            </div>
          ) : (
            <div className="mb-[20px] w-[1330px] mx-auto">
              <div
                ref={sizeListItems}
                className="overflow-x-scroll py-4 hidden_scroll-x_trendingproducts scroll-smooth listProductsTrendingChild grid grid-flow-col lg:gap-x-[1.5%]  mb:auto-cols-[48%] md:auto-cols-[33%] lg:auto-cols-[24%]"
              >
                {data?.map((item: IProduct) => {
                  return <Products key={item._id} items={item} />;
                })}
              </div>
              {/* back, next page */}
              <div className="flex items-center *:mx-8 justify-center *:duration-300 *:text-lg">
                <button
                  ref={backItems}
                  onClick={handlePrevious}
                  className="opacity-50 cursor-drop hover:scale-[1.3]"
                >
                  &#10094;
                </button>
                <button
                  ref={nextItems}
                  onClick={handleNext}
                  className="hover:scale-[1.3]"
                >
                  &#10095;
                </button>
              </div>
            </div>
          )}
          {/* view all */}
          <div className="flex items-center justify-center mx-auto  mx-auto h-[60px] w-[172.18px] hover:bg-gray-100 duration-200 hover:text-black border border-black  bg-black cursor-pointer text-white">
            {" "}
            <Link onClick={ScrollTop} className="text-[15px] " to={"/shops"}>
              Xem thêm
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Trending_Products;
