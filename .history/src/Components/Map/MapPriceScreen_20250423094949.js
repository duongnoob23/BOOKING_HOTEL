import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { mapOpenClose } from "../../Redux/Slice/hotelSlice";

const MapPriceScreen = ({ route, data }) => {
  // const data = route?.params;
  console.log("data mappppp", data);
  const { map } = useAppSelector((state) => state.hotel);
  const dispatch = useAppDispatch();

  const handleOpenMap = () => {
    if (map === true) {
      openMapLocation();
      dispatch(mapOpenClose(false));
    }
  };
  console.log(map);
  useEffect(() => {
    handleOpenMap();
  }, [map]);
  const startCoordinate = {
    latitude: 21.0312, // Lăng Chủ tịch Hồ Chí Minh
    longitude: 105.8341,
  };

  //   const [showButtons, setShowButtons] = useState(false); // State để hiển thị nút

  const openMapLocation = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${startCoordinate.latitude},${startCoordinate.longitude}`;
    Linking.openURL(url).catch((err) =>
      console.error("Error opening map:", err)
    );
  };

  const openMapDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${startCoordinate.latitude},${startCoordinate.longitude}`;
    Linking.openURL(url).catch((err) =>
      console.error("Error opening directions:", err)
    );
  };

  return (
    <View>
      <View style={styles.mapContainer}>
        <View style={styles.mapWapper}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: startCoordinate.latitude,
              longitude: startCoordinate.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={startCoordinate}
              title="Lăng Chủ tịch Hồ Chí Minh"
              //   onPress={() => setShowButtons((pre) => !pre)}
            />
          </MapView>
        </View>
      </View>
      {/* {showButtons && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={openMapDirections}>
            <Text style={styles.buttonText}>Chỉ đường</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={openMapLocation}>
            <Text style={styles.buttonText}>Xem vị trí</Text>
          </TouchableOpacity>
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    width: "90%",
    height: 200,
    marginHorizontal: "auto",
    backgroundColor: "white",
  },
  mapWapper: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    //     position: "absolute",
    //     bottom: 0,
    //     right: 0,
    //     flexDirection: "row",
  },
  button: {
    backgroundColor: "#4285F4", // Màu xanh giống Google Maps
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default MapPriceScreen;
