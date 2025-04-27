import axios from "axios";

export const ApiGetBrands = async () => {
  try {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
ApiGetBrands()