import axios from "axios";

export const ApiGitItemProduct = async () => {
  try {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=6439d58a0049ad0b52b9003f`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
ApiGitItemProduct();
