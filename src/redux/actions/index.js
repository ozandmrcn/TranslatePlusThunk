import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../utils/api";

export const getLanguages = createAsyncThunk(
  "language/fetchLanguages",
  async () => {
    // Send api request
    const res = await api.get("/languages");

    // Return response
    return res.data.languages;
  }
);

export const translateText = createAsyncThunk(
  "translate/fetchTranslate",
  async (_, { getState }) => {
    const { translate } = getState();

    const res = await api.post("", {
      q: translate.textToTranslate,
      source: translate.sourceLang.value,
      target: translate.targetLang.value,
    });

    return res.data.data.translations.translatedText[0];
  }
);
