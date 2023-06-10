import { View, StyleSheet, Dimensions } from "react-native";
import Colors from "../../util/colors";


const Card = ({ children }) => {
    return (
        <View style={styles.inputContainer}>
            { children }
        </View>
    )
}

export default Card;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 8,
        marginTop: deviceWidth < 380 ? 18 : 36,
        marginHorizontal: 24,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: .3,
      },
})