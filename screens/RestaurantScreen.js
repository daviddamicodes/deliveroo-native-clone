import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import COLORS from "../variables";
import clsxm from "../lib/clsxm";

const RestaurantScreen = () => {
  const navigation = useNavigation();

  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      shortDescription,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  return (
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
    </ScrollView>
  );
};

export default RestaurantScreen;
