export type Area = "meadow" | "sea";

export type AreaObject = {
  transform: {
    position: {
      x: number;
      y: number;
      z: number;
    };
    rotation: {
      x: number;
      y: number;
      z: number;
    };
    scale: {
      x: number;
      y: number;
      z: number;
    };
  };
  url: string;
};

export type GraphicsQuality = "high" | "low" | "middle";
