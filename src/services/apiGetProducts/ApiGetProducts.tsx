import axios from "axios";

export const ApiGetProducts = async () => {
  try {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    return response.data ;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
ApiGetProducts();
