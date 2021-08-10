import { Alert } from "react-native";
import firebase from "../../config/firebaseConnection";

export const listFavorites = async () => {
  let arrFavorites: any = [];
  await firebase
    .database()
    .ref("pokemons")
    .on("value", (snapshot) => {
      snapshot.forEach((item) => {
        let data: any = {
          key: item.key,
          id: item.val().id,
          name: item.val().name,
        };
        arrFavorites.push(data);
      });
    });

  return arrFavorites;
};

export const addFavorite = async (id: any, name: any) => {
  const list = await listFavorites();
  if (list.length >= 5) {
    let favorite: string = "";
    list.forEach((pokemon: any) => (favorite = favorite + pokemon.name + "\n"));

    Alert.alert(
      "Fail to add favorite pokemon",
      `You have reached the limit of 5 favorite pokemons.\n\n${favorite}`
    );
  } else {
    let pokemons = await firebase.database().ref("pokemons");
    let key: any = pokemons.push().key;
    pokemons.child(key).set({
      id,
      name,
    });
  }
};

export const removeFavorite = async (key: any) => {
  await firebase.database().ref("pokemons").child(key).remove();
};
