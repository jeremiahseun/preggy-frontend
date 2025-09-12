
import React from "react";
import { View } from "react-native";


type GapProps = {
  space?: number;
};

export const GapColumn = ({ space }: GapProps) => {
    return <View style={{ paddingBottom: space }} />;
};

export const GapRow = ({ space }: GapProps) => {
    return <View style={{ paddingRight: space }} />;
};
