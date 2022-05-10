import { Dimensions, Platform } from 'react-native'

const useScreenSize = () => {
    const { width, height } = Dimensions.get('window')

    const metrics = {
        screenWidth: width < height ? width : height,
        screenHeight: width < height ? height : width,
        navBarHeight: Platform.OS === 'ios' ? 54 : 66,
    }
    return metrics
}

export default useScreenSize