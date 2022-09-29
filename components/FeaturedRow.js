import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import COLORS from "../variables";
import RestaurantCards from "./RestaurantCards";

const FeaturedRow = ({ id, title, description }) => {
  return (
    <View className="bg-gray-100">
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="text-lg font-bold">{title}</Text>
        <ArrowRightIcon color={COLORS.primary} />
      </View>
      <Text className="px-4 text-xs text-gray-500">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          //this is inner scrollView style
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {[...Array(3)].map((_, index) => (
          <RestaurantCards
            id="123"
            imgUrl="http://links.papareact.com/gn7"
            title="Sushi"
            rating={4.5}
            genre="Japanese"
            address="123 Main St"
            shortDescription="This is a short description"
            dishes={[]}
            long={20}
            lat={0}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
