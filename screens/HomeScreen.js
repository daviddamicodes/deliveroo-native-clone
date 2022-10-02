import { View, Text, Image, TextInput, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
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
import sanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    // navigation.setOptions({
    //   headerShown: false,
    // });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured"] {
      ...,
      restaurants[]->{
        ...,
        dishes[]->,
      },
    }`
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
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

      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* Body */}
        <Categories />

        {featuredCategories?.map((category, index) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default HomeScreen;
