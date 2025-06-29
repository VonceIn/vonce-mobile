import { Text, View } from "react-native";

export default function IndexScreen() {
    return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
            <Text className="text-4xl bg-secondary">
                Edit app/index.tsx to edit this screen.
            </Text>
        </View>
    );
}
