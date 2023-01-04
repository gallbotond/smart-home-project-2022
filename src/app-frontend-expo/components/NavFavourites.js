import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "@rneui/base";

const data = [
  {
    id: "1",
    icon: "home",
    location: "Home",
    destination: "Code Street, London, UK",
  },
  {
    id: "2",
    icon: "briefcase",
    location: "Work",
    destination: "London Eye, London, UK",
  },
];

export default function NavFavourites() {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View className="bg-gray-200" style={{ height: 0.5 }} />
      )}
      renderItem={({ item: { location, destination, icon } }) => (
        <TouchableOpacity className="flex-row items-center p-5">
          <Icon
            className="mr-4 rounded-full bg-gray-300 p-3"
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text className="font-semibold text-lg">{location}</Text>
            <Text className="text-gray-500">{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
