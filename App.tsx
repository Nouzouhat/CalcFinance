import React, { useState } from 'react';
import { Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import Calculateur from './src/ecrans/calculateur';
import { styles } from './src/styles/app';

// Composant personnalisé pour les boutons
const CustomButton = ({ title, onPress }: { title: string, onPress: () => void }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

// Composant pour l'inscription et la connexion
const EcranAuth = ({ onAuthSuccess }: { onAuthSuccess: () => void }) => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [estInscription, setEstInscription] = useState(true);

  const gererAuth = async () => {
    try {
      if (estInscription) {
        await auth().createUserWithEmailAndPassword(email, motDePasse);
        Alert.alert('Inscription réussie !');
      } else {
        await auth().signInWithEmailAndPassword(email, motDePasse);
        Alert.alert('Connexion réussie !');
        onAuthSuccess();
      }
    } catch (error) {
      Alert.alert('Erreur, veuillez vérifier vos identifiants');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{estInscription ? 'Inscription' : 'Connexion'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={motDePasse}
        onChangeText={setMotDePasse}
      />
      <CustomButton title={estInscription ? "S'inscrire" : 'Se connecter'} onPress={gererAuth} />
      <CustomButton
        title={`Passer à la ${estInscription ? 'connexion' : 'inscription'}`}
        onPress={() => setEstInscription(!estInscription)}
      />
    </View>
  );
};

// Composant principal
const App = () => {
  const [estAuthentifie, setEstAuthentifie] = useState(false);

  const gererAuthSuccess = () => {
    setEstAuthentifie(true);
  };

  return (
    <View style={styles.container}>
      {!estAuthentifie ? (
        <EcranAuth onAuthSuccess={gererAuthSuccess} />
      ) : (
        <Calculateur />
      )}
    </View>
  );
};

export default App;
