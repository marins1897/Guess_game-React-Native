import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import { useState } from 'react';
import Colors from './util/colors';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';


export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({ 
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
   });

  if (!fontsLoaded) {
    return <AppLoading />;
  }


  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  };

  const gameOverHandler = (numberOfRounds) => {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  };

  const startNewGameHandler = () => {
    setUserNumber(null);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen onPickedNumber = { pickedNumberHandler } />;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber}
                        onGameOver = { gameOverHandler } />;
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen roundsNumber={guessRounds} 
                            userNumber={userNumber} 
                            onStartNewGame={startNewGameHandler} />
  }


  return (
    <>
    <StatusBar style="light" />
    <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
      <ImageBackground source={require('./assets/images/background.png')} 
                      resizeMode='cover'
                      style={styles.rootScreen}
                      imageStyle={styles.image}
      >
      <SafeAreaView style={styles.rootScreen}>
        {screen}
      </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  image: {
    opacity: .15,
  }
});
