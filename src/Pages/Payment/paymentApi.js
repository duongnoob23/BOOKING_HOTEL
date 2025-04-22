import { API_BASE_URL } from "../../Constant/Constant";

const paymentApi = {
  async createPayment(orderId, amount, paymentType) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/payment/create_order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          amount,
          paymentType,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Không thể tạo thanh toán");
      }

      const data = await response.json();
      return data; // Trả về { order_url, ... }
    } catch (error) {
      console.log("Error creating payment:", error);
      throw new Error(error.message || "Không thể tạo thanh toán");
    }
  },

  async checkPaymentStatus(appTransId) {
    try {
      const url = new URL(`${API_BASE_URL}/api/payment/status`);
      url.searchParams.append("appTransId", appTransId);

      const response = await fetch(url.toString(), {
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Không thể kiểm tra trạng thái");
      }

      const data = await response.json();
      return data.data; // Trả về { appTransId, status, message }
    } catch (error) {
      throw new Error(error.message || "Không thể kiểm tra trạng thái");
    }
  },
};

export default paymentApi;
