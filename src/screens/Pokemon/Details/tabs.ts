import { Dimensions } from "react-native";
import Pokemon from "../../../services/api/types";

import About from "./About";
import BaseStats from "./BaseStats";
import Evolution from "./Evolution";
import Moves from "./Moves";

type SlideProps = {
  pokemon: Pokemon;
};

const tabs: any = [
  { name: "About", slide: About },
  { name: "Base Stats", slide: BaseStats },
  //{ name: 'Evolution', slide: Evolution },
  //{ name: 'Moves', slide: Moves },
];

const { width } = Dimensions.get("window");
const TAB_BUTTON_WIDTH = (width - 48) / 2;

export { tabs, SlideProps, TAB_BUTTON_WIDTH };
