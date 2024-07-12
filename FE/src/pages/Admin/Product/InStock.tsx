import { format } from "date-fns";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../../common/interfaces/Product";
import Loading from "../../../components/base/Loading/Loading";
import { useQueryClient } from "@tanstack/react-query";
import AddProduct from "./AddProducts/Index";
import { Query_Products } from "../../../common/hooks/Products/Products";
import { remove_items_client } from "../../../_lib/Items/Products";
import { getAll } from "../../../services/category";
import { ICategory } from "../../../common/interfaces/Category";
const StockProduct = () => {
  const { data, isLoading } = Query_Products();
  const navigate = useNavigate();
  const [removingProductId, setRemovingProductId] = useState<string | null>(
    null
  );
  const queryClient = useQueryClient();
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAll();
        setCategories(categoriesData);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return format(date, "HH:mm dd/MM/yyyy");
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  const handleRemove = async (id: string) => {
    if (window.confirm("Bạn có muốn xóa sản phẩm này không?")) {
      setRemovingProductId(id);
      try {
        await remove_items_client(id);
        alert("Xóa thành công");
        queryClient.invalidateQueries("products");
      } catch (error) {
        alert("Xóa thất bại");
        console.error("Error deleting product:", error);
      } finally {
        setRemovingProductId(null);
      }
    }
  };

  const handleUpdate = (id: string) => {
    navigate(`edit/${id}`);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col mt-5">
          <div className="relative flex items-center justify-between mb-3">
            <h1 className="text-2xl font-medium">Kho </h1>
            <AddProduct />
          </div>
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        STT
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        Ảnh sản phẩm
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        ID
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        Tên sản phẩm
                      </th>

                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        Danh mục
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        Tồn kho
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        Ngày tạo
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        Ngày chỉnh sửa
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {data?.map((product: IProduct, index: number) => (
                      <tr key={index}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                          <img
                            src={product.image_product}
                            alt={product.name_product}
                            className="object-cover w-20 h-20 border rounded-md "
                          />
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
                          {product._id}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 ">
                          {product.name_product}
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                          {getCategoryName(product.category_id)}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                          {product.countInStock_product}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {formatDate(product.createdAt)}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {formatDate(product.updatedAt)}
                        </td>
                        <td className="flex px-4 py-4 text-sm">
                          <button
                            onClick={() => handleUpdate(product._id!)}
                            className="p-3 mr-2 text-white transition-colors duration-200 bg-blue-500 border rounded-lg hover:bg-blue-400 focus:outline-none"
                          >
                            Cập nhật
                          </button>
                          <button
                            onClick={() => handleRemove(product._id!)}
                            className={`p-3 text-white transition-colors duration-200 border rounded-lg ${
                              removingProductId === product._id
                                ? "bg-gray-500"
                                : "bg-rose-500 hover:bg-rose-400"
                            } focus:outline-none`}
                            disabled={removingProductId === product._id}
                          >
                            {removingProductId === product._id
                              ? "Đang xóa..."
                              : "Xóa"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StockProduct;