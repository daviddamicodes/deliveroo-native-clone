import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../redux/features/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../redux/features/basketSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import COLORS from "../variables";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";
import { StatusBar } from "expo-status-bar";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const dispatch = useDispatch();
  const basketTotal = useSelector(selectBasketTotal);

  // useMemo(() => {
  //   const groupedItems = items.reduce((results, item) => {
  //     (results[items.id] = results[items.id] || []).push(item);
  //     return results;
  //   }, {});

  //   return groupedItems;
  // }, [items]);

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white pt-5">
      <View className="flex-1 bg-gray-100">
        <View className="shadow-xs border-b border-[#00CCBB] bg-white p-5">
          <View>
            <Text className="text-center text-lg font-bold">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-3 right-5 rounded-full bg-gray-100"
          >
            <XCircleIcon color={COLORS.primary} size={50} />
          </TouchableOpacity>
        </View>
        <View className="my-5 flex-row items-center space-x-4 bg-white px-4 py-3">
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="h-7 w-7 rounded-full bg-gray-300 p-4"
          />
          <Text className="flex-1">Deliver in 50 - 75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#00CCBB]">{items.length} x</Text>
              <Image
                source={{
                  uri: urlFor(items[0]?.image).url(),
                }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">
                <Currency quantity={items[0]?.price} currency="USD" />
              </Text>
              <TouchableOpacity>
                <Text
                  className="text-xs text-[#00CCBB]"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      <View className="mt-5 space-y-4 bg-white p-5">
        <View className="flex-row justify-between">
          <Text className="text-gray-400">Subtotal</Text>
          <Text className="text-gray-400">
            <Currency quantity={basketTotal} currency="USD" />
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-400">Delivery Fee</Text>
          <Text className="text-gray-400">
            <Currency quantity={3.99} currency="USD" />
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="">Order Total</Text>
          <Text className="font-extrabold">
            <Currency quantity={basketTotal + 3.99} currency="USD" />
          </Text>
        </View>

        <TouchableOpacity
          className="rounded-lg bg-[#00CCBB] p-4"
          onPress={() => navigation.navigate("PreparingOrder")}
        >
          <Text className="text-center text-lg font-bold text-white">
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default BasketScreen;
