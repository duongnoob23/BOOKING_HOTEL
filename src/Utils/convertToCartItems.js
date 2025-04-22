// export const convertToCartItems = (roomRequestList) => {
//   if (!roomRequestList || !Array.isArray(roomRequestList)) {
//     return { cartItems: [], roomMapping: {} };
//   }

//   const roomMapping = {};
//   const serviceMap = roomRequestList.reduce((acc, room) => {
//     if (!room.serviceList || !room.serviceList.length) {
//       return acc;
//     }

//     const roomId = room.roomId;
//     roomMapping[roomId] = roomMapping[roomId] || [];
//     roomMapping[roomId].push(room.uniqueId);

//     room.serviceList.forEach((service) => {
//       if (!acc[service.id]) {
//         acc[service.id] = [];
//       }
//       acc[service.id].push({
//         roomId: roomId,
//         quantity: service.quantity,
//         time: service.time || "",
//         note: service.note || "",
//       });
//     });

//     return acc;
//   }, {});

//   const cartItems = Object.keys(serviceMap).map((serviceId) => ({
//     serviceId: parseInt(serviceId),
//     roomBookingRequestList: serviceMap[serviceId],
//   }));

//   return { cartItems, roomMapping };
// };
export const convertToCartItems = (roomRequestList) => {
  // Kiểm tra đầu vào
  if (!roomRequestList || !Array.isArray(roomRequestList)) {
    return { cartItems: [], roomMapping: {} };
  }

  // Khởi tạo roomMapping và danh sách serviceIds
  const roomMapping = {};
  const serviceIds = new Set();

  // Thu thập tất cả serviceIds và xây dựng roomMapping
  roomRequestList.forEach((room) => {
    const roomId = room.roomId;
    roomMapping[roomId] = roomMapping[roomId] || [];
    roomMapping[roomId].push(room.uniqueId);

    // Thu thập serviceIds từ serviceList
    if (room.serviceList && Array.isArray(room.serviceList)) {
      room.serviceList.forEach((service) => {
        serviceIds.add(service.id);
      });
    }
  });

  // Tạo serviceMap cho tất cả serviceIds
  const serviceMap = {};
  serviceIds.forEach((serviceId) => {
    serviceMap[serviceId] = roomRequestList.map((room) => {
      // Tìm dịch vụ tương ứng trong serviceList của phòng
      const service = room.serviceList?.find((s) => s.id === serviceId);
      return {
        roomId: room.roomId,
        quantity: service ? service.quantity || 0 : 0, // Nếu không có dịch vụ hoặc quantity undefined, dùng 0
        time: service ? service.time || "" : "",
        note: service ? service.note || "" : "",
      };
    });
  });

  // Chuyển serviceMap thành cartItems
  const cartItems = Array.from(serviceIds).map((serviceId) => ({
    serviceId: parseInt(serviceId),
    roomBookingRequestList: serviceMap[serviceId],
  }));

  return { cartItems, roomMapping };
};
