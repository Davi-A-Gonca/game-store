import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { RadioButton, Checkbox, List } from 'react-native-paper';
import { getGms, delGms } from '../services/apiGames';
import { postGms } from '../services/apiSearch';
import { exibirMensagem } from '../errors/showError';
import { ScrollView } from "react-native-web";

export default function GamesList() {
  const [data, setData] = useState([]);
  const [gameName, setName] = useState("");
  const [consol, setConsol] = useState("");
  const [price, setPrice] = useState("");
  const [genre, setGenre] = useState([]);
  const [ageRating, setAgeRating] = useState("");

  const genreOptions = [
    {label: 'Ação', value: 'Ação'},
    {label: 'Aventura', value: 'Aventura'},
    {label: 'Terror', value:  'Terror'},
    {label: 'RPG', value: 'RPG'},
    {label: 'Simulação', value: 'Simulação'},
    {label: 'Estratégia', value: 'Estratégia'},
    {label: 'Sobrevivência', value: 'Sobrevivência'},
    {label: 'Mistério', value: 'Mistério'},
    {label: 'Quebra-cabeça', value: 'Quebra-cabeça'}];
  const [genresExpanded, setGenresExpanded] = useState(false);

  const ageRatingOptions = [
    {label: 'Livre', value: 'L'},
    {label: 'Para maiores de 10 anos', value: '10'},
    {label: 'Para maiores de 12 anos', value: '12'},
    {label: 'Para maiores de 14 anos', value: '14'},
    {label: 'Para maiores de 16 anos', value: '16'},
    {label: 'Para maiores de 18 anos', value: '18'}
  ];
  const [ageRatingExpanded, setAgeRatingExpanded] = useState(false);

  async function load() {
    try{
      const lista = await getGms();
      setData(lista);
    } catch(error){
      exibirMensagem(error.message, error.name);
    }
  }
  
  useEffect(() => { load(); }, [])

  const handleDelete = async (id) =>{
    await delGms(id);
    setData((prev) => prev.filter((c) => c.id !== id))
  }

  const handleToggleSelectionGenre = (value) => {
    if(genre.includes(value)){
      setGenre(genre.filter(val => val !== value));
    } else {
      setGenre([...genre, value]);
    }
  };

  const handleJson = async () => {
    const newGenre = genre.length === 0 ? [""] : genre;
    const newPrice = price === "" ? 0.0000 : price;
    const oldJson = {gameName, consol, newPrice, newGenre, ageRating};
    const foundData = await postGms(oldJson);
    setData(foundData);
  }

  function list(games){
    return (
      <View style={styles.viewList}>
        <View style={styles.viewGames}>
          <Text style={styles.textName}>{games.nameGame}:</Text>
          <View style={styles.row}>
            <Text>Preço: R${games.price}</Text>
            <Text>Console: {games.console}</Text>
          </View>
          <View style={styles.row}>
            <Text>Classificação: {games.ageRating}</Text>
            <Text>Genero: {games.genre.join('; ')}</Text>
          </View>
          <Text>Sinopse: {games.synopsis}</Text>
        </View>
        <View style={styles.button}>
          <Button title="Excluir" color="tomato" onPress={() => handleDelete(games.id)}/>
        </View>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.centeredContentContainer}>
      <View style={styles.viewFilter}>
        <View style={styles.row}>
          <TextInput placeholder='Nome Do Jogo' value={gameName} onChangeText={setName}
            inputMode='text' style={styles.input}/>
          <TextInput placeholder='Console do jogo' value={consol} onChangeText={setConsol}
            inputMode='text' style={styles.input}/>
          <TextInput placeholder='Valor máximo do jogo R$' value={price} onChangeText={setPrice}
            inputMode='numeric' style={styles.input}/>
        </View>
        <View style={styles.row}>
          <List.Section style={styles.genreSection}>
            <List.Accordion
              title={`Gêneros Selecionados (${genre.length})`}
              description="Toque para selecionar um ou mais gêneros"
              left={props => <List.Icon {...props} icon="gamepad-variant-outline" />}
              expanded={genresExpanded}
              onPress={() => setGenresExpanded(!genresExpanded)}
            >
              {genreOptions.map((item) => (
                <Checkbox.Item 
                  key={item.value} 
                  label={item.label} 
                  value={item.value}
                  status={genre.includes(item.value) ? 'checked' : 'unchecked'} 
                  onPress={() => handleToggleSelectionGenre(item.value)}
                />
              ))}
            </List.Accordion>
          </List.Section>
          <List.Section style={styles.genreSection}>
            <List.Accordion
              title={`Classificação Selecionada (${ageRating})`}
              description="Toque para selecionar ou trocar classificação"
              expanded={ageRatingExpanded}
              onPress={() => setAgeRatingExpanded(!ageRatingExpanded)}
            >
              {ageRatingOptions.map((item) => (
                <Checkbox.Item 
                  key={item.value} 
                  label={item.label} 
                  value={item.value}
                  status={ageRating == item.value ? 'checked' : 'unchecked'} 
                  onPress={() => {if(ageRating != item.value) setAgeRating(item.value);}}
                />
              ))}
            </List.Accordion>
          </List.Section>
          <TouchableOpacity style={styles.button_filter} onPress={handleJson}></TouchableOpacity>
        </View>
      </View>
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => list(item)}
      ListEmptyComponent={
        <View style={styles.viewWating}>
          <Text style={styles.textWating}>Buscando informações...</Text>
          <ActivityIndicator size="large" />
        </View>
      }
      contentContainerStyle={styles.container}
    />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centeredContentContainer: {
      alignItems: 'center', 
    },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 70
  },
  container: {padding: 16, gap: 1},
  viewWating: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWating: {
    fontSize: 16,
    fontWeight: "bold",
  },
  viewList: {
    backgroundColor: '#ADD8E6',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewFilter: {
    backgroundColor: '#B8C0DF',
    paddingTop: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
    width: '70%',
  },
  viewGames: {
    flex: 7,
    paddingRight: 90,
  },
  button:{
    flex: 2,
  },
  textName: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  excludeMed: {
    fontSize: 30,
    color: '#ADD8E6',
  },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, backgroundColor: '#CECECE' },
  button_filter: {
    backgroundColor: "#FFFFFF",
    color: "#BBE6FC",
    width: 45,
    height: 45,
    borderRadius: 22.5,
    border: "none",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    marginLeft: 10,
  }
});
