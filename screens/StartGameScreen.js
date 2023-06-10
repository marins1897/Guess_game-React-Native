import { TextInput, View, StyleSheet, Alert, useWindowDimensions, KeyboardAvoidingView, ScrollView } from "react-native";
import PrimaryButton from "../components/UI/PrimaryButton";
import { useState } from "react";
import Colors from "../util/colors";
import Title from "../components/UI/Title";
import InstructionText from "../components/UI/InstructionText";
import Card from "../components/UI/Card";

const StartGameScreen = ({ onPickedNumber }) => {
    const [enteredNumber, setEnteredNumber] = useState('');

    const { width, height } = useWindowDimensions();

    const numberInputHandler = (enteredText) => {
        setEnteredNumber(enteredText);
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredNumber);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid Number', 
                        'Number has to be a number between 1 and 99',
                        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
            );
        return;
        }

        onPickedNumber(chosenNumber);
    }

    const resetInputHandler = () => {
        setEnteredNumber('');
    };

    const marginTopDistance = height < 380 ? 30 : 100;


    return (
      <ScrollView style={styles.screen}>
      <KeyboardAvoidingView behavior="position" style={styles.screen}>
      <View style={[styles.rootContainer, { marginTop: marginTopDistance}]}>
        <Title> Guess My Number </Title>
        <Card>
          <InstructionText> Enter a Number </InstructionText>
            <TextInput style={styles.input} 
                    maxLength={2} 
                    keyboardType="number-pad" 
                    autoCapitalize="none" 
                    autoCorrect={false}
                    value={enteredNumber}
                    onChangeText={numberInputHandler}
            />
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}> Reset </PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}> Confirm </PrimaryButton>
                </View>
            </View>
        </Card>
      </View>
      </KeyboardAvoidingView>
      </ScrollView>
    )
}

export default StartGameScreen;


const styles = StyleSheet.create({
  screen: {
    flex : 1,
  },
  rootContainer: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: '20%',
    fontSize: 32,
    borderBottomWidth: 2,
    borderBottomColor: Colors.accent500,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  }
});