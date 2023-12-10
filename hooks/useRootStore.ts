import React from "react";
import {storesContext} from "../utils/RootStore";

export const useRootStore = () => React.useContext(storesContext);
