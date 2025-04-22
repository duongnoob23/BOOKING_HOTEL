export const formatPrice = (price) => {
  // Chuyển đổi giá thành chuỗi, tách phần nguyên và thập phân
  const [integerPart, decimalPart = "0"] = String(price).split(".");

  // Định dạng phần nguyên: thêm dấu chấm mỗi 3 chữ số từ phải sang trái
  const formattedInteger = parseInt(integerPart)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Kết hợp phần nguyên, thập phân và đơn vị VNĐ
  return `${formattedInteger},${decimalPart} VNĐ`;
};
