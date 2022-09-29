import { View, Text, ScrollView } from "react-native";
import React from "react";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
    >
      {[...Array(6)].map((_, index) => (
        <CategoryCard
          key={index}
          imgUrl="http://links.papareact.com/gn7"
          title="category"
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
