import axios from "axios";

export const ApiGitItemProduct = async (categoryId: string) => {
  try {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
