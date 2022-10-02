import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import {
  selectBasketItems,
  selectBasketTotal,
} from "../redux/features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);

  if (items.length === 0) return null;

  return (
    <View className="absolute bottom-6 z-50 w-full">
      <TouchableOpacity
        className="mx-5 flex-row items-center space-x-1 rounded-lg bg-[#00CCBB] p-4"
        onPress={() => navigation.navigate("Basket")}
      >
        <Text className="bg-[#01A296] py-1 px-2 text-lg font-extrabold text-white">
          {items.length}
        </Text>
        <Text className="flex-1 text-center font-extrabold text-white">
          View Basket
        </Text>
        <Text className="text-lg font-extrabold text-white">
          <Currency quantity={basketTotal} currency="USD" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
