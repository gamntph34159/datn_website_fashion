import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import User from "../../models/Auth/users";
import { signupSchema } from "../../validations/auth";

export const GetAllUser = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error getting all products:", error);
    return res.status(500).json({ error: error.message });
  }
};
export const Get_All_User_Search = async (req, res) => {
  const { _search = "" } = req.query;
  try {
    const querry = {};
    if (_search) {
      querry.$and = [
        {
          userName: { $regex: new RegExp(_search, "i") },
        },
      ];
    }
    const user = await User.find(querry);
    console.log(user);
    return res.status(StatusCodes.OK).json({
      message: "Done !",
      user,
    });
  } catch (error) {
    console.error("Error getting all products:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Loi server !",
    });
  }
};
export const GetAuthById = async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }
    if (user._id.toString() !== id) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.error("MongoDB Query Error:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "MongoDB Query Error" });
  }
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, "123456", { expiresIn: "7d" });
};
const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, "123456", { expiresIn: "15m" });
};
export const signup = async (req, res) => {
  const { email, password } = req.body;
  const { error } = signupSchema.validate(req.body, { abortEarly: false });
  const existUser = await User.findOne({ email });

  try {
    if (error) {
      const messages = error.details.map((item) => item.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        messages,
      });
    }

    if (existUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        messages: ["Email đã tồn tại"],
      });
    }
    // Mã hóa mật khẩu
    const hashedPassword = await bcryptjs.hash(password, 10);
    // Nếu không có user nào trong hệ thống thì tạo user đầu tiên là admin
    const role = (await User.countDocuments({})) === 0 ? "admin" : "user";

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
      role,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Đăng ký tài khoản thành công", user });
  } catch (error) {
    console.error(`Đăng ký thất bại do:`, error);
  }
};
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    // user = { _id: , name: , xxx}
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        messages: ["Email không tồn tại"],
      });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        messages: ["Mật khẩu không chính xác"],
      });
    }
    const token = jwt.sign({ userId: user._id }, "123456", {
      expiresIn: "7d",
    });
    // const accessToken = generateAccessToken(user._id);
    // const refreshToken = generateRefreshToken(user._id); // Generate refresh token

    return res
      .status(StatusCodes.OK)
      .json({ message: "Đăng nhập thành công", user, token });
  } catch (error) {
    console.error(`Error finding user with email ${email}:`, error);
  }
};
export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "No token provided" });
    }
    // Lưu token vào danh sách đen (blacklist) để ngăn không cho token đó được sử dụng nữa
    const blacklistedToken = new BlacklistedToken({ token });
    await blacklistedToken.save();

    // Gửi phản hồi thành công
    res.status(StatusCodes.OK).json({ message: "Đăng xuất thành công" });
  } catch (error) {
    console.error(`Error during logout:`, error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

// be/src/controllers/auth.js
export const refreshToken = async (req, res) => {
  try {
    const oldToken = req.headers.authorization;
    if (!oldToken) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "No token provided" });
    }

    // Kiểm tra token có trong blacklist
    const isBlacklisted = await isTokenBlacklisted(oldToken);
    if (isBlacklisted) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Token is blacklisted" });
    }

    // Giải mã oldToken để lấy userId
    let decoded;
    try {
      decoded = jwt.verify(oldToken, "123456"); // Sử dụng cùng secret key như khi tạo token
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ error: "Token expired" });
      } else {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ error: "Invalid token" });
      }
    }

    const userId = decoded.userId;
    if (!userId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid token payload" });
    }

    // Tạo refreshToken mới
    const newToken = generateRefreshToken(userId);

    // Trả về refreshToken mới cho client
    res.status(StatusCodes.OK).json({ newToken });
  } catch (error) {
    console.error(`Error during token refresh:`, error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
export const isTokenBlacklisted = async (token) => {
  const tokenInBlacklist = await BlacklistedToken.findOne({ token });
  return !!tokenInBlacklist;
};

export const add_address = async (req, res) => {
  const { userId, newAddress } = req.body;

  // Kiểm tra thông tin địa chỉ
  if (
    !newAddress ||
    !newAddress.fullName ||
    !newAddress.phoneNumber ||
    !newAddress.addressDetails ||
    !newAddress.address
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Thông tin địa chỉ không được để trống" });
  }

  try {
    // Tìm người dùng
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Người dùng không tồn tại" });
    }

    // Cập nhật địa chỉ
    user.address = newAddress;

    // Lưu thay đổi
    await user.save();
    return res
      .status(StatusCodes.OK)
      .json({ message: "Đã thêm địa chỉ thành công", address: user.address });
  } catch (error) {
    console.error("Lỗi khi thêm địa chỉ:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Lỗi khi thêm địa chỉ" });
  }
};

export const get_address = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Tìm người dùng
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy người dùng" });
    }

    // Trả về địa chỉ
    const address = user.address;
    return res.status(StatusCodes.OK).json({ address });
  } catch (error) {
    console.error("Lỗi khi lấy địa chỉ:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Lỗi khi lấy địa chỉ" });
  }
};

export const updateUserAddress = async (req, res) => {
  const userId = req.params.userId;
  const { updatedAddress } = req.body;

  try {
    // Tìm người dùng trong CSDL bằng userId
    const user = await User.findById(userId);

    // Kiểm tra nếu không tìm thấy người dùng
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Không tìm thấy người dùng",
      });
    }

    // Ghi log để kiểm tra dữ liệu đầu vào
    console.log("Dữ liệu địa chỉ cập nhật:", updatedAddress);

    // Cập nhật địa chỉ
    // Để cập nhật, ta cần đảm bảo rằng các thuộc tính của `updatedAddress` thay thế các thuộc tính cũ
    user.address = { ...user.address, ...updatedAddress };

    // Ghi log để kiểm tra dữ liệu sau khi cập nhật
    console.log("Địa chỉ sau khi cập nhật:", user.address);

    // Lưu người dùng đã được cập nhật vào cơ sở dữ liệu
    const updatedUser = await user.save();

    // Ghi log để kiểm tra dữ liệu sau khi lưu
    console.log("Dữ liệu người dùng sau khi lưu:", updatedUser.address);

    return res.status(StatusCodes.OK).json({
      message: "Đã cập nhật địa chỉ thành công",
      address: updatedUser.address,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật địa chỉ:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Lỗi khi cập nhật địa chỉ",
    });
  }
};

export const delete_address = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Tìm người dùng
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy người dùng" });
    }

    // Xóa địa chỉ
    user.address = {};

    // Lưu thay đổi
    await user.save();
    return res
      .status(StatusCodes.OK)
      .json({ message: "Đã xóa địa chỉ thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa địa chỉ:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Lỗi khi xóa địa chỉ" });
  }
};
export const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const updatedData = req.body;

  try {
    // Tìm người dùng hiện tại
    const user = await User.findById(userId);

    // Kiểm tra nếu không tìm thấy người dùng
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy người dùng để cập nhật" });
    }

    const updatedFields = [];
    for (const key in updatedData) {
      if (user[key] !== updatedData[key]) {
        updatedFields.push({
          field: key,
          value: updatedData[key], // Thêm trường value để lưu giá trị cập nhật
          time: new Date(),
        });
        user[key] = updatedData[key];
      }
    }

    // Thêm thông tin cập nhật vào mảng updatedFields
    user.updatedFields.push(...updatedFields);

    // Lưu người dùng đã cập nhật
    await user.save();

    // Trả về thông báo thành công và thông tin người dùng đã cập nhật
    return res.status(StatusCodes.OK).json({
      message: "Cập nhật người dùng thành công",
      updatedFields,
      user,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật người dùng:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
