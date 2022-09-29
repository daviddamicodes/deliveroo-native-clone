import { View, Text, Image, TextInput } from "react-native";
import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import COLORS from "../variables";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({});
  }, []);

  return (
    <SafeAreaView className="bg-white pt-5">
      {/* Header */}
      <View className="mx-4 flex-row items-center space-x-2 pb-3">
        <Image
          source={{
            uri: "http://links.papareact.com/wru",
          }}
          className="h-7 w-7 rounded-full bg-gray-300 p-4"
        />
        <View className="flex-1">
          <Text className="text-xs font-bold text-gray-400">Deliver Now!</Text>
          <Text className="text-xl font-bold">
            Current Location!
            <ChevronDownIcon size={20} color={COLORS.primary} />
          </Text>
        </View>
        <UserIcon size={35} color={COLORS.primary} />
      </View>

      {/* Search */}
      <View className="mx-4 flex-row items-center space-x-2 pb-2">
        <View className="flex-1 flex-row items-center space-x-2 bg-gray-200 p-3">
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput
            placeholder="Restaurants and Cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon color={COLORS.primary} />
      </View>

      {/* Body */}
      <Categories />

      <FeaturedRow
        id="123"
        title="Featured"
        description="Paid placement for our partners"
      />
      <FeaturedRow
        id="456"
        title="Tasty Discounts"
        description="Everyone had been enjoying these juicy discounts"
      />
      <FeaturedRow
        id="789"
        title="Offers near you!"
        description="Why not support your local restaurants tonight"
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default HomeScreen;
