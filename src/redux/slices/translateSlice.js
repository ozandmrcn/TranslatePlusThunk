import { createSlice } from "@reduxjs/toolkit";
import { translateText } from "../actions";

const initialState = {
  isLoading: false,
  sourceLang: {
    value: undefined,
    label: "Detect language",
  },
  targetLang: {
    value: "en",
    label: "English",
  },
  textToTranslate: "",
  translatedText: "",
};

const translateSlice = createSlice({
  name: "translate",
  initialState,

  reducers: {
    setSource: (state, { payload }) => {
      state.sourceLang = payload;
    },

    setTarget: (state, { payload }) => {
      state.targetLang = payload;
    },

    setText: (state, { payload }) => {
      state.textToTranslate = payload;
    },

    swap: (state) => {
      const currentSourceLang = state.sourceLang;
      const currentTargetLang = state.targetLang;
      const currentTextToTranslate = state.textToTranslate;
      const currentTranslatedText = state.translatedText;

      // Eğer sağdaki dil "Detect language" değilse swap yapılır
      if (
        currentSourceLang.value !== undefined &&
        currentTargetLang.value !== undefined
      ) {
        state.sourceLang = currentTargetLang;
        state.targetLang = currentSourceLang;
        state.textToTranslate = currentTranslatedText;
        state.translatedText = currentTextToTranslate;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(translateText.pending, (state) => {
      state.isLoading = true;
      state.translatedText = "";
    });

    builder.addCase(translateText.rejected, (state) => {
      state.isLoading = false;
      alert("Translation failed");
    });

    builder.addCase(translateText.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.translatedText = payload;
    });
  },
});

export const { setSource, setTarget, setText, swap } = translateSlice.actions;

export default translateSlice.reducer;
