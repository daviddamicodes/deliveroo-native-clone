import { View, Text, TouchableOpacity, Image } from "react-native";
import Currency from "react-currency-formatter";
import React, { useState } from "react";
import { urlFor } from "../sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import COLORS from "../variables";
import clsxm from "../lib/clsxm";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
} from "../redux/features/basketSlice";

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);
  //to return the number of items in each row
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const dispatch = useDispatch();

  const addIItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemFromBasket = () => {
    if (!items.length > 0) return;

    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={clsxm(
          "border border-gray-200 bg-white p-4",
          isPressed && "border-b-0"
        )}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2 ">
            <Text className="mbb-1 text-lg">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="mt-2 text-gray-400">
              <Currency quantity={price} currency="USD" />
            </Text>
          </View>
          <View>
            <Image
              style={{ borderWidth: 1, borderColor: "#F3F3F4" }}
              source={{
                uri: urlFor(image).url(),
              }}
              className="h-20 w-20 bg-gray-300 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 py-3">
            <TouchableOpacity
              onPress={removeItemFromBasket}
              disabled={!items.length}
            >
              <MinusCircleIcon
                color={items.length ? COLORS.primary : "gray"}
                size={40}
              />
            </TouchableOpacity>
            <Text className="text-base">{items.length}</Text>
            <TouchableOpacity onPress={addIItemToBasket}>
              <PlusCircleIcon color={COLORS.primary} size={40} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
