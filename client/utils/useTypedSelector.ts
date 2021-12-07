import { createSelectorHook } from "react-redux";
import { RootState } from "../store";

export const useTypedSelector = createSelectorHook<RootState>();
