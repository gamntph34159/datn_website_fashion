import { toast } from "react-toastify";
import instance from "../configs/axios";

const baseUri = 'http://localhost:2004/api/v1/orders';

// export const GetAllOrder = async (page: number, status: string = "") => {
//   try {
//     const { data } = await instance.get(`/orders?page=${page}&status=${status}`);
//     console.log(data);

//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
export async function get_order_client(page?: number, status?: string) {
  try {
    let uri = baseUri;
    const params = [];
    if (page) {
      params.push(`_page=${page}`);
    }
    if (status) {
      params.push(`_status=${status}`);
    }

    if (params.length > 0) {
      uri += `?${params.join('&')}`;
    }
    const res = await fetch(uri);
    if (!res.ok) {
      console.warn("Kiem tra lai server hoac internet !");
    }
    const { data, totalDocs, totalPages } = await res.json();
    return { data: data.docs, totalDocs, totalPages };
  } catch (error) {
    console.log(error || "Loi server!")
  }
}
export const getOrderById = async (id: string) => {
  try {
    const { data } = await instance.get(`/orders/${id}`);
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getOneOrderUser = async (userId: string) => {
  console.log(userId);

  try {
    const { data } = await instance.get(`/orders/get_order_user/${userId}`);

    return data?.docs;
  } catch (error) {
    console.log(error);
  }
};

export const Add_Order = async (order: any) => {
  try {
    const data = await instance.post(`/orders`, order);
    if(data?.status === 201) {
      sessionStorage.removeItem('item_order');
      toast.success('Đặt hàng thành công', {autoClose : 500})
    }
    else {
      toast.error('Đặt hàng không thành công', {autoClose : 500})
    }
    return data?.data;
  } catch (error) {
    console.log(error);
  }
};
export const Update_Status = async (items: any) => {
  console.log(items);
  try {
    const { data } = await instance.patch(`orders/${items.id}`, items.status);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};





// huy don hang có yêu cầu xác nhận

export const Cancel_Order = async (id: any) => {
  try {
    const { data } = await instance.post(`/orders/${id}/cancel`);
    if (data) {
      console.log('Yêu cầu hủy đơn thành công', data);
    } else {
      console.log('Yêu cầu hủy đơn hàng thất bại', data);
    }
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};



export const confirmCancelOrder = async ({ id, confirm }: any) => {
  try {
    const { data } = await instance.post(`/orders/${id}/cancel/confirm`, { confirm });
    return data;
  } catch (error) {
    console.log(error);
  }
};



