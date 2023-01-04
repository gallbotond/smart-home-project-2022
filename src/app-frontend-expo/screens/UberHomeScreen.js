import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_KEY } from "@env";
import { setDestination, setOrigin } from "../slices/navSlice";
import { useDispatch } from "react-redux";
import NavFavourites from "../components/NavFavourites";

export default function UberHomeScreen() {
  const dispatch = useDispatch();

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="p-5">
        <Image
          style={{ width: 100, height: 100, resizeMode: "contain" }}
          source={{ uri: "https://links.papareact.com/gzs" }}
        />

        <GooglePlacesAutocomplete
          placeholder="Where From?"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={500}
          styles={{ container: { flex: 0 }, textInput: { fontSize: 18 } }}
          query={{ key: GOOGLE_MAPS_KEY, language: "en" }}
          enablePoweredByContainer={false}
          fetchDetails={true}
          minLength={2}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );

            dispatch(setDestination(null));
          }}
        />

        <NavOptions />
        <NavFavourites />
      </View>
    </SafeAreaView>
  );
}
