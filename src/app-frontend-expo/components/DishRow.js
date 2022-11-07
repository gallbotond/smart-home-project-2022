import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { urlFor } from "../sanity";
// import Currency from 'react-currency-formatter'

export default function DishRow({ id, name, description, price, image }) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <>
      <TouchableOpacity className="bg-white border p-4 border-gray-200">
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400 mt-2">
              {/* <Currency quantity={price} currency="GBP" /> */}
            </Text>
          </View>

          <View>
            <Image
              style={{ borderWidth: 1, borderColor: "#f3f3f4" }}
              source={{ uri: urlFor(image).url() }}
              className="h-20 w-20 bg-gray-300 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}
