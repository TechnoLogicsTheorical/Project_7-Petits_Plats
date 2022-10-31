import { Data } from "../utils/class/DataManager.js";
import { Interface } from "../utils/class/Interface.js";
import { EventManager } from "../utils/class/EventManager.js";

Interface.init(Data.getAllRecipes());
EventManager.init();