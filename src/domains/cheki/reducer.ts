import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { ChekiDirection } from "~/types/ChekiDirection";

export type State = {
  direction: ChekiDirection;
  imageHeight: number;
  imageUrl: string;
  imageWidth: number;
  isImageDragging: boolean;
  isImageRotating: boolean;
  isImageScaling: boolean;
};

const initialState: State = {
  direction: "horizontal",
  imageHeight: 0,
  imageUrl: "",
  imageWidth: 0,
  isImageDragging: false,
  isImageRotating: false,
  isImageScaling: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.addImage.fulfilled, (state, action) => {
      const { height, url, width } = action.payload;

      return {
        ...state,
        direction: height < width ? "horizontal" : "vertical",
        imageHeight: height,
        imageUrl: url,
        imageWidth: width,
      };
    })
    .addCase(actions.complete, (state) => ({
      ...state,
      isImageDragging: false,
      isImageRotating: false,
      isImageScaling: false,
    }))
    .addCase(actions.tick, (state, action) => {
      const { cursorPositions } = action.payload;
      console.log(cursorPositions);
      return state;
    })
    .addCase(actions.updateDirection, (state, action) => ({
      ...state,
      ...action.payload,
    }));
});
