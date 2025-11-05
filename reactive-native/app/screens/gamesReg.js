import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import { RadioButton, Checkbox, List } from 'react-native-paper';
import { postGms, getToken } from '../services/apiGames';
import { AppError } from '../errors/baseError';
import { exibirMensagem } from '../errors/showError';

export default function GamesRegistration() {
  const [nameGame, setName] = useState("");
  const [price, setPrice] = useState("");
  const [ageRating, setAge] = useState("");
  const [genre, setGenre] = useState([]);
  const [console, setconsole] = useState("");
  const [synopsis, setSynopsis] = useState("");

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

  const token = getToken();

  const Post = async () => {
    try{
      if(nameGame == "" || price == "" || ageRating == ""){
        throw new AppError('Está faltando campos excenciais para o Login', 400, 'Campos Faltantes');
      } else if(isNaN(price) || !isNaN(nameGame) || !isNaN(synopsis) || !isNaN(console)) {
        throw new AppError('Campos com valores inválidos', 400, 'Valor invávlido');
      } else if (genre.length <= 0) {
        throw new AppError('Nenhum gênero selecionado, por favor, selecione um antes de registra o jogo', 400, 'Nenhum gênero selecionado');
      } else {
        await postGms( {nameGame, price, ageRating, genre, console, synopsis}, token);
        setName("");
        setPrice("");
        setAge("");
        setGenre([]);
        setconsole("");
        setSynopsis("");
      }
    } catch(error){
      exibirMensagem(error.message, error.name);
    }
  }

  const handleToggleSelection = (value) => {
    if(genre.includes(value)){
      setGenre(genre.filter(val => val !== value));
    } else {
      setGenre([...genre, value]);
    }
  };
  
  return (
    <ScrollView style={styles.container}>
        <Text style={styles.text}>Cadastro de Jogos</Text>
        <TextInput placeholder='Nome Do Jogo' value={nameGame} onChangeText={setName}
          inputMode='text' style={styles.input}/>
        <TextInput placeholder='Valor do jogo R$' value={price} onChangeText={setPrice}
          inputMode='numeric' style={styles.input}/>
        <View>
          <Text>Classificação Indicativa</Text>
          <View style={styles.clasInd}>
            <View>
              <View style={styles.radBut}>
                <RadioButton value='L' status={ageRating === 'Livre' ? 'checked' : 'unchecked'} onPress={() => setAge('Livre')} />
                <Text>Livre para todos os públicos</Text>
              </View>
              <View style={styles.radBut}>
                <RadioButton value='10' status={ageRating === '10' ? 'checked' : 'unchecked'} onPress={() => setAge('10')} />
                <Text>Não recomendado para menores de 10 anos</Text>
              </View>
              <View style={styles.radBut}>
                <RadioButton value='12' status={ageRating === '12' ? 'checked' : 'unchecked'} onPress={() => setAge('12')} />
                <Text>Não recomendado para menores de 12 anos</Text>
              </View>
            </View>
            <View>
              <View style={styles.radBut}>
                <RadioButton value='14' status={ageRating === '14' ? 'checked' : 'unchecked'} onPress={() => setAge('14')} />
                <Text>Não recomendado para menores de 14 anos</Text>
              </View>
              <View style={styles.radBut}>
                <RadioButton value='16' status={ageRating === '16' ? 'checked' : 'unchecked'} onPress={() => setAge('16')} />
                <Text>Não recomendado para menores de 16 anos</Text>
              </View>
              <View style={styles.radBut}>
                <RadioButton value='18' status={ageRating === '18' ? 'checked' : 'unchecked'} onPress={() => setAge('18')} />
                <Text>Não recomendado para menores de 18 anos</Text>
              </View>
            </View>
          </View>
        </View>
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
                onPress={() => handleToggleSelection(item.value)}
              />
            ))}
          </List.Accordion>
        </List.Section>
        <TextInput placeholder='console' value={console} onChangeText={setconsole}
          inputMode='text' style={styles.input}/>
        <TextInput placeholder='Sinopse do jogo' value={synopsis} onChangeText={setSynopsis}
          inputMode='text' style={styles.input}/>
        <Button title="Save" onPress={Post}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  radBut: {flexDirection: 'row', alignItems: 'center'},
  clasInd: {flexDirection: 'row', gap: 200},
  container: {padding: 16, gap: 12},
  text: { fontSize: 20, fontWeight: "600" },
  input: { borderWidth: 1, borderRadius: 8, padding: 12 },
});
