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

const MapCheckScreen = () => {
  const { map, hotelDetail } = useAppSelector((state) => state.hotel);
  const dispatch = useAppDispatch();

  // Activity list from hotelDetail
  const activityList = hotelDetail?.nearBy?.activityList || [];

  // Convert activityList to markers with coordinates
  const markers = activityList.map((activity) => ({
    title: activity.name,
    latitude: parseFloat(activity.latitude),
    longitude: parseFloat(activity.longitude),
  }));

  // Calculate the initial region to encompass all markers
  const calculateInitialRegion = () => {
    if (markers.length === 0) {
      return {
        latitude: 16.060126, // Default fallback (Da Nang Museum)
        longitude: 108.223118,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
    }

    const latitudes = markers.map((marker) => marker.latitude);
    const longitudes = markers.map((marker) => marker.longitude);

    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);

    const latitude = (minLat + maxLat) / 2;
    const longitude = (minLng + maxLng) / 2;
    const latitudeDelta = (maxLat - minLat) * 1.5 || 0.05; // Add padding
    const longitudeDelta = (maxLng - minLng) * 1.5 || 0.05; // Add padding

    return {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    };
  };

  const handleOpenMap = () => {
    if (map === true) {
      openMapLocation();
      dispatch(mapOpenClose(false));
    }
  };

  useEffect(() => {
    handleOpenMap();
  }, [map]);

  const openMapLocation = () => {
    // Open the first marker's location as a fallback
    const { latitude, longitude } = markers[0] || calculateInitialRegion();
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url).catch((err) =>
      console.error("Error opening map:", err)
    );
  };

  const openMapDirections = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url).catch((err) =>
      console.error("Error opening directions:", err)
    );
  };

  return (
    <View>
      <View style={styles.mapContainer}>
        <View style={styles.mapWapper}>
          <MapView style={styles.map} initialRegion={calculateInitialRegion()}>
            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.title}
                onPress={() =>
                  openMapDirections(marker.latitude, marker.longitude)
                }
              />
            ))}
          </MapView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    width: "100%", // Adjusted to full width
    height: 300, // Increased height for better visibility
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
});

export default MapCheckScreen;
