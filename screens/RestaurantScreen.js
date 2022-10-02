import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import COLORS from "../variables";
import clsxm from "../lib/clsxm";

import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurant } from "../redux/features/restaurantSlice";
import { selectBasketItems } from "../redux/features/basketSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const items = useSelector(selectBasketItems);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    );
  }, [dispatch]);

  return (
    <>
      <BasketIcon />

      <ScrollView>
        <View className="relative">
          <Image
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            className="h-56 w-full bg-gray-300 p-4"
          />
          <TouchableOpacity
            className={clsxm("rounded-full bg-gray-100 p-2")}
            style={{
              position: "absolute",
              top: StatusBar.currentHeight + 10,
              left: 20,
            }}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeftIcon size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="my-1 flex-row space-x-2">
              <View className="flex-row items-center space-x-1">
                <StarIcon color="green" opacity={0.5} size={22} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-600">{rating}</Text> • {genre}
                </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <MapPinIcon color="gray" opacity={0.4} size={22} />
                <Text className="text-xs text-gray-500">
                  Nearby • {address}
                </Text>
              </View>
            </View>

            <Text className="mt-2 pb-4 text-gray-500">{short_description}</Text>
          </View>

          <TouchableOpacity className="flex-row items-center space-x-2 border-y border-gray-300 p-4">
            <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
            <Text className="text-md flex-1 pl-2 font-bold">
              Have a food allergy?
            </Text>
            <ChevronRightIcon color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View className={clsxm(items.length && "pb-32")}>
          <Text className="mb-3 px-4 pt-6 text-xl font-bold">Menu</Text>
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
