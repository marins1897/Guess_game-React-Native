import { View, Image, StyleSheet, Text, useWindowDimensions, ScrollView } from "react-native";
import Title from "../components/UI/Title";
import Colors from "../util/colors";
import PrimaryButton from "../components/UI/PrimaryButton";

const GameOverScreen = ({ roundsNumber, userNumber, onStartNewGame }) => {
    const { width, height } = useWindowDimensions();

    let imageSize = 300;

    if (width < 380) {
        imageSize = 150;
    }

    if (height < 400) {
        imageSize = 80;
    }

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2,
    };

    const marginTopStyle = height < 380 ? 30 : 100;

    return (
        <ScrollView style={styles.screen}>
        <View style={[styles.rootContainer, { marginTop: marginTopStyle}]}>
            <Title>GAME OVER!</Title>
            <View style={[styles.imageContainer, imageStyle]}>
                <Image source={require('../assets/images/success.png')} style={styles.image} />
            </View>

            <Text style={styles.summaryText}> Your phone needed 
                <Text style={styles.highlight}> {roundsNumber}</Text> rounds to guess the number 
                <Text style={styles.highlight}> {userNumber}</Text>.
            </Text>
            <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
        </View>
        </ScrollView>
    )
}

export default GameOverScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    rootContainer:{
        flex: 1,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        borderWidth: 6,
        borderColor: Colors.primary700,
        overflow: 'hidden',
        margin: 24,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24,
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500,
    }
})