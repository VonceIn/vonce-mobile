import { useFonts } from "expo-font";

export const useFontsLoader = () => {
    const [loaded] = useFonts({
        Radnika: require('../assets/fonts/Radnika-Medium.otf'),
        Ubuntu300: require('../assets/fonts/Ubuntu-Light.ttf'),
        Ubuntu400: require('../assets/fonts/Ubuntu-Regular.ttf'),
        Ubuntu500: require('../assets/fonts/Ubuntu-Medium.ttf'),
        Ubuntu700: require('../assets/fonts/Ubuntu-Bold.ttf'),
        PlusJakarta300: require('../assets/fonts/PlusJakartaSans-Light.ttf'),
        PlusJakarta400: require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
        PlusJakarta500: require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
        PlusJakarta700: require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
    });

    return { loaded };
}