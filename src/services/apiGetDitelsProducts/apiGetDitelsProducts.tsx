import axios from "axios";

export const apiGetDitelsProducts = async () => {
  try {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/6428de2adc1175abc65ca05b}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
