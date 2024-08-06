import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../styles/calc';

// Composant personnalisé pour les boutons
const CustomButton = ({ title, onPress }: { title: string, onPress: () => void }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

// Composant pour le calculateur de prêt
const CalculateurPret = () => {
  const [montant, setMontant] = useState('');
  const [taux, setTaux] = useState('');
  const [duree, setDuree] = useState('');
  const [paiementMensuel, setPaiementMensuel] = useState('');

  const calculerPret = () => {
    const p = parseFloat(montant);
    const r = parseFloat(taux) / 100 / 12;
    const n = parseInt(duree) * 12;
    const numerateur = r * Math.pow(1 + r, n);
    const denominateur = Math.pow(1 + r, n) - 1;
    const paiement = p * (numerateur / denominateur);
    setPaiementMensuel(paiement.toFixed(2));
  };

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Calculateur de Prêt</Text>
      <TextInput
        style={styles.input}
        placeholder="Montant du prêt"
        keyboardType="numeric"
        value={montant}
        onChangeText={setMontant}
      />
      <TextInput
        style={styles.input}
        placeholder="Taux d'intérêt (%)"
        keyboardType="numeric"
        value={taux}
        onChangeText={setTaux}
      />
      <TextInput
        style={styles.input}
        placeholder="Durée du prêt (années)"
        keyboardType="numeric"
        value={duree}
        onChangeText={setDuree}
      />
      <CustomButton title="Calculer" onPress={calculerPret} />
      {paiementMensuel ? (
        <Text style={styles.result}>Paiement Mensuel: €{paiementMensuel}</Text>
      ) : null}
    </View>
  );
};

// Composant pour le calculateur d'investissement
const CalculateurInvestissement = () => {
  const [principal, setPrincipal] = useState('');
  const [taux, setTaux] = useState('');
  const [annees, setAnnees] = useState('');
  const [valeurFuture, setValeurFuture] = useState('');

  const calculerInvestissement = () => {
    const p = parseFloat(principal);
    const r = parseFloat(taux) / 100;
    const n = parseInt(annees);
    const valeur = p * Math.pow(1 + r, n);
    setValeurFuture(valeur.toFixed(2));
  };

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Calculateur d'Investissement</Text>
      <TextInput
        style={styles.input}
        placeholder="Montant initial"
        keyboardType="numeric"
        value={principal}
        onChangeText={setPrincipal}
      />
      <TextInput
        style={styles.input}
        placeholder="Taux d'intérêt (%)"
        keyboardType="numeric"
        value={taux}
        onChangeText={setTaux}
      />
      <TextInput
        style={styles.input}
        placeholder="Années"
        keyboardType="numeric"
        value={annees}
        onChangeText={setAnnees}
      />
      <CustomButton title="Calculer" onPress={calculerInvestissement} />
      {valeurFuture ? (
        <Text style={styles.result}>Valeur Future: €{valeurFuture}</Text>
      ) : null}
    </View>
  );
};

const Calculateur = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Simulation financière</Text>
      <CalculateurPret />
      <CalculateurInvestissement />
    </ScrollView>
  );
};

export default Calculateur;
