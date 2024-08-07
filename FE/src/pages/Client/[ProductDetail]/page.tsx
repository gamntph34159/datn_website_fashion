import { useParams } from "react-router-dom";
import ImageProducts from "./ImageProducts";
import InforProduct from "./InforProduct";
import ProductRelated from "./RelatedProducts";
import DescriptionProduct from "./DescriptionProduct";
import { Query_Products } from "../../../common/hooks/Products/Products";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const ProductDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = Query_Products(id);
  return (
    <>
      <div className="xl:w-[1440px] w-[95vw] mx-auto">
        <div className="lg:mt-[40px] mt-[60px] lg:w-full w-[90vw] mx-auto">
          <div className="text-sm py-6 bg-[#F3F3F3] font-medium px-[2.5%] rounded">
            Home &#10148; Products &#10148; Detail
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center h-screen">
              <Spin indicator={<LoadingOutlined spin />} size="large" />
            </div>
          ) : (
            <div>
              <div className="lg:grid lg:grid-cols-[573px_auto] gap-x-20 lg:mt-5">
                {/*  desktop : left  , mobile : row 1 */}

                <ImageProducts product={data?.product} />
                {/*desktop: right, mobile : row 2 */}
                {/* <Infor_Detail_Product /> */}
                <div>
                  <InforProduct dataProps={data} />
                </div>
              </div>
              {/* description */}
              <div>
                <DescriptionProduct product={data?.product} />
              </div>
              {/* related item */}
              <ProductRelated product={data?.product} />
            </div>
          )}
        </div>
      </div>

    </>

  );
};

export default ProductDetail;
