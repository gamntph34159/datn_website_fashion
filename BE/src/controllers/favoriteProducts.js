import { StatusCodes } from "http-status-codes";
import FavoriteProducts from "../models/favoriteProducts";
export const GetFavoriteProductByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const favoriteProducts = await FavoriteProducts.findOne({
      userId
    }).populate("products.productId");
    if (!favoriteProducts) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "List Favorite Products not found" });
    }
    const dataProductPavorite = {
      products: favoriteProducts.products.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        category_id: item.productId.category_id,
        price: item.productId.price
      }))
    };
    return res.status(StatusCodes.OK).json(dataProductPavorite);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
export const addFavoriteProducts = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let favoriteProducts = await FavoriteProducts.findOne({ userId });

    if (!favoriteProducts) {
      favoriteProducts = new FavoriteProducts({ userId, products: [] });
    }
    // Check if the product is already in the favorites
    const productExists = favoriteProducts.products.some(
      (product) => product.productId.toString() === productId
    );

    if (productExists) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: "Product already in favorites" });
    }
    favoriteProducts.products.push({ productId });
    await favoriteProducts.save();

    return res.status(StatusCodes.OK).json(favoriteProducts);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
export const removeFavoriteProduct = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let favoriteProducts = await FavoriteProducts.findOne({ userId });
    if (!favoriteProducts) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "List Favorite Products Not Found" });
    }

    favoriteProducts.products = favoriteProducts.products.filter(
      (product) =>
        product.productId && product.productId.toString() !== productId
    );
    await favoriteProducts.save();

    return res.status(StatusCodes.OK).json(favoriteProducts);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
