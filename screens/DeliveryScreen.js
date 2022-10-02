import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../redux/features/restaurantSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import COLORS from "../variables";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <View className="flex-1 bg-[#00CCBB]">
      <SafeAreaView className="z-50">
        <View className="flex-row items-center justify-between p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon color="white" size={30} />
          </TouchableOpacity>
          <Text className="text-lg font-light text-white">Order Help</Text>
        </View>

        <View className="z-50 my-2 mx-5 rounded-md bg-white p-6 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">45 - 55 Minutes</Text>
            </View>
            <Image
              source={{
                uri: "https://links.papareact.com/fls",
              }}
              className="h-20 w-20"
            />
          </View>
          <Progress.Bar size={30} color={COLORS.primary} indeterminate={true} />

          <Text className="mt-3 text-gray-500">
            Tour order at {restaurant.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="z-0 -mt-10 flex-1"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor={COLORS.primary}
        />
      </MapView>

      <View className="h-28 flex-row items-center space-x-5 bg-white">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="ml-5 h-12 w-12 rounded-full bg-gray-300"
        />
        <View className="flex-1">
          <Text className="text-lg">David Dami</Text>
          <Text className="text-gray-400">Your Rider</Text>
        </View>
        <Text className="mr-5 text-lg font-bold text-[#00CCBB]">Call</Text>
      </View>
    </View>
  );
};

export default DeliveryScreen;
