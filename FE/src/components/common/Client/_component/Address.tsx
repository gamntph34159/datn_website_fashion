import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Checkbox,
  Form,
  FormProps,
  Input,
  message,
  Popconfirm,
} from "antd";
import instance from "../../../../configs/axios";
import useLocalStorage from "../../../../common/hooks/Storage/useStorage";
import { useNavigate } from "react-router-dom";
type FieldType = {
  userId: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  addressDetails: string;
  checked: boolean;
  newAddress: string;
};

export const Add_Address = ({ handleAddress }: any) => {
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const querryClient = useQueryClient();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate } = useMutation({
    mutationFn: async (formData) => {
      const { data } = await instance.post(`/auth/add_address`, formData);
      form.resetFields();
      return data;
    },
    onSuccess: () => {
      querryClient.invalidateQueries({
        queryKey: ["AUTH_KEY"],
      });
      messageApi.open({
        type: "success",
        content: "Thêm địa chỉ thành công",
      });
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Thêm địa chỉ thất bại!",
      });
    },
  });
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const data_form: any = {
      userId: userId,
      newAddress: values,
    };
    mutate(data_form);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white p-5 border rounded relative w-[400px] lg:w-[500px]">
        <h1 className="py-3 text-center font-medium">Địa chỉ mới</h1>
        {contextHolder}
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="fullName"
            className="w-full my-3"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input
              className="w-full border px-2 py-2 rounded focus:ring-0"
              placeholder="Họ và tên"
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            className="w-full my-3"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input
              className="w-full border px-2 py-2 rounded focus:ring-0"
              placeholder="Số điện thoại"
            />
          </Form.Item>

          <Form.Item
            name="address"
            className="w-full my-3"
            rules={[
              { required: true, message: "Please input your address details!" },
            ]}
          >
            <Input
              className="w-full border px-2 py-2 rounded focus:ring-0"
              placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
            />
          </Form.Item>

          <Form.Item
            name="addressDetails"
            className="w-full my-3"
            rules={[
              {
                required: true,
                message: "Please input your specific address!",
              },
            ]}
          >
            <Input
              className="w-full border px-2 py-2 rounded focus:ring-0"
              placeholder="Địa chỉ cụ thể"
            />
          </Form.Item>

          <Form.Item
            className="w-full my-3 flex items-center gap-3"
            name="checked"
            valuePropName="checked"
          >
            <Checkbox>Đặt làm mặc định</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button htmlType="submit" className="h-10 bg-black text-white">
              Hoàn Thành
            </Button>
          </Form.Item>
        </Form>
        <Button
          onClick={handleAddress}
          className="hover:bg-slate-100 hover:rounded-full hover:border-2 w-8 h-8 border-0 absolute top-5 right-5 rounded px-2 py-2"
        >
          <CloseOutlined />
        </Button>
      </div>
    </div>
  );
};

export const Update_Address = ({ handleUpdateAddress }: any) => {
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  // Lấy thông tin địa chỉ người dùng
  const { data } = useQuery({
    queryKey: ["AUTH_KEY", userId],
    queryFn: async () => {
      const { data } = await instance.get(`/auth/address/${userId}`);
      return data;
    },
  });

  // Mutation để cập nhật địa chỉ
  const { mutate } = useMutation({
    mutationFn: async (formData) => {
      const { data } = await instance.put(`/auth/address/${userId}`, {
        updatedAddress: formData,
      });
      form.resetFields();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["AUTH_KEY", userId],
      });
      messageApi.open({
        type: "success",
        content: "Chỉnh sửa địa chỉ thành công",
      });
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Chỉnh sửa địa chỉ thất bại!",
      });
    },
  });

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    mutate(values);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white p-5 border rounded relative w-[400px] lg:w-[500px]">
        <h1 className="py-3 text-center font-medium">Địa chỉ mới</h1>
        {contextHolder}
        <Form
          form={form}
          name="basic"
          initialValues={{ ...data?.address }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="fullName"
            className="w-full my-3"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input
              className="w-full border px-2 py-2 rounded focus:ring-0"
              placeholder="Họ và tên"
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            className="w-full my-3"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input
              className="w-full border px-2 py-2 rounded focus:ring-0"
              placeholder="Số điện thoại"
            />
          </Form.Item>

          <Form.Item
            name="address"
            className="w-full my-3"
            rules={[
              { required: true, message: "Please input your address details!" },
            ]}
          >
            <Input
              className="w-full border px-2 py-2 rounded focus:ring-0"
              placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
            />
          </Form.Item>

          <Form.Item
            name="addressDetails"
            className="w-full my-3"
            rules={[
              {
                required: true,
                message: "Please input your specific address!",
              },
            ]}
          >
            <Input
              className="w-full border px-2 py-2 rounded focus:ring-0"
              placeholder="Địa chỉ cụ thể"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button htmlType="submit" className="h-10 bg-black text-white">
              Hoàn Thành
            </Button>
          </Form.Item>
        </Form>
        <Button
          onClick={handleUpdateAddress}
          className="hover:bg-slate-100 hover:rounded-full hover:border-2 w-8 h-8 border-0 absolute top-5 right-5 rounded px-2 py-2"
        >
          <CloseOutlined />
        </Button>
      </div>
    </div>
  );
};

export const List_Address = ({
  auth,
  handleTAdd,
  handleAddressSelect,
  handleAddress,
}: any) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white p-5 border rounded relative w-[400px] lg:w-[600px] max-h-[600px] overflow-auto hidden_scroll_x">
        <h1 className="py-3 text-center text-xl font-medium">
          Địa chỉ của tôi
        </h1>
        <div>
          <div className="px-5 py-4">
            <div className="flex justify-between">
              <h2 className="py-2">Địa chỉ</h2>
              <Button className="w-9 h-9" onClick={handleTAdd}>
                <PlusOutlined />
              </Button>
            </div>
            <div
              className="flex justify-between items-center my-5 border-b pb-6"

            >
              <div className="py-1 flex items-start gap-4">
                <div>
                  <h1>
                    <span className="font-bold">{auth?.fullName}</span>
                    <span className="px-2 text-gray-400">|</span>
                    <span className="text-gray-400">{auth?.phoneNumber}</span>
                  </h1>
                  <p className="text-gray-400 py-2">{auth?.addressDetails}</p>
                  <p className="text-gray-400">{auth?.address}</p>

                </div>
              </div>
              <div className="">
                <div className="hidden lg:block">
                  <div className="flex flex-col gap-2 text-blue-400 py-2">
                    <Button className="w-9 h-9">
                      <EditOutlined />
                    </Button>
                    <Popconfirm
                      title="Địa chỉ nhận hàng"
                      description="Bạn có muốn chọn làm địa chỉ nhận hàng không?"
                      onConfirm={() => handleAddressSelect(item)}
                      okText="Có"
                      cancelText="Không"
                    >
                      <Button className="w-9 h-9">
                        <CheckOutlined />
                      </Button>
                    </Popconfirm>
                  </div>
                </div>
                <div className="block lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          onClick={handleAddress}
          className="hover:bg-slate-100 hover:rounded-full hover:border-2 w-8 h-8 border-0 absolute top-5 right-5 rounded px-2 py-2"
        >
          <CloseOutlined />
        </Button>
      </div>
    </div>
  );
};
