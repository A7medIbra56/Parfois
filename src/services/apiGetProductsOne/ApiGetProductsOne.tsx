
import axios from "axios";

export const ApiGetProductsOne = async (ProductId: string) => {
  try {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${ProductId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
