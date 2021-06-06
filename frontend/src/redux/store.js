import { createStore } from "redux";
import reducer from "./reducers";

const store = createStore(reducer)

export { store }
