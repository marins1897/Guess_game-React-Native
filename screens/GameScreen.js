import { View, StyleSheet, Alert, FlatList, useWindowDimensions } from "react-native";
import PrimaryButton from "../components/UI/PrimaryButton";
import Title from "../components/UI/Title";
import Colors from "../util/colors";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import Card from '../components/UI/Card';
import InstructionText from "../components/UI/InstructionText";
import { Ionicons } from '@expo/vector-icons';
import GuessLogItem from "../components/game/GuessLogItem";

const generateRandomNumberBetween = (min,max,exclude) => {
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;

    if (randomNumber === exclude) {
        return generateRandomNumberBetween(min, max, exclude);
    } else {
        return randomNumber;
    }
};

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
    const initalGuess = generateRandomNumberBetween(1, 100, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initalGuess);
    const [guessRounds, setGuessRounds] = useState([initalGuess]);

    const { width, height } = useWindowDimensions();

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    },[])

    const nextGuessHandler = (direction) => { // direction is lower or higher
        if ((direction === 'lower' && currentGuess < userNumber) || (direction === 'higher' && currentGuess > userNumber)) {
            Alert.alert("Don't lie!",
                        "You know this is wrong.",
                        [{ text: 'Sorry!', style: 'cancel'}]
                    );
            return;
        }

        if (direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }

        const newRandomNumber = generateRandomNumberBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRandomNumber);
        setGuessRounds(prevGuessRounds => [newRandomNumber,...prevGuessRounds]);
    };

    const guessRoundsListLength = guessRounds.length;
    const marginTopDistance = height < 380 ? 30 : 100;

    let content = (
    <>
    <NumberContainer>{currentGuess}</NumberContainer>
    <Card>
        <InstructionText style={styles.instructionText}> Higher or Lower? </InstructionText>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color='white'/> 
                </PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
                    <Ionicons name="md-add" size={24} color='white' /> 
                </PrimaryButton>
                </View>
            </View>
    </Card>
    </>
    );

    if (width > 500) {
        content = 
        <>
        <View style={styles.buttonContainerWide}>
        <View style={styles.buttonContainer}>
                <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color='white'/> 
                </PrimaryButton>
                </View>

                <NumberContainer>{currentGuess}</NumberContainer>

                <View style={styles.buttonContainer}>
                <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
                    <Ionicons name="md-add" size={24} color='white' /> 
                </PrimaryButton>
                </View>
        </View>

        </>
    }

    return (
        <View style={[styles.screen, {marginTop: marginTopDistance}]}>
            <Title> Opponent's Guess </Title>
            {content}
            <View style={styles.listContainer}>
               {/**{guessRounds.map(guessRound => <Text key={guessRound}> { guessRound } </Text>)}*/} 
                <FlatList data={guessRounds}
                        renderItem={(itemData) => <GuessLogItem 
                                                    roundNumber={guessRoundsListLength - itemData.index} 
                                                    guess={itemData.item} />}
                        keyExtractor={(item) => item}        
                />
            </View>
        </View>
    )
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 60,
        padding: 8,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.accent500,
        textAlign: 'center',
        borderWidth: 2,
        borderColor: Colors.accent500,
        padding: 12,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainerWide: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
    },
    instructionText: {
        marginBottom: 16
    },
    listContainer: {
        flex: 1,
        padding: 16,
    }
})