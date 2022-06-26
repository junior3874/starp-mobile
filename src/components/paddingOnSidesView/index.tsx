import React from "react";
import { View } from "react-native";

type PaddingOnSidesViewProps = {
  children: React.ReactNode;
  data: any[];
  index: number;
  paddingAmount: number;
};

export function PaddingOnSidesView({
  children,
  data,
  index,
  paddingAmount,
}: PaddingOnSidesViewProps) {
  return (
    <View
      style={{
        flex: 1,
        paddingLeft: index == 0 ? paddingAmount : 0,
        paddingRight: index == data.length - 1 ? paddingAmount : 0,
      }}
    >
      {children}
    </View>
  );
}
