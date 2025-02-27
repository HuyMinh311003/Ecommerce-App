export interface ICateProps {
  item: {
    _id: string;
    name: string;
    images: [string];
  };
  cateProps: {
    imageBg?: string;
    activeCate?: string;
    onPress?: () => void;
  };
  cateStyleProps: {
    imageBgHt?: number;
    width?: number;
    height?: number;
    radius?: number;
    resizeMode?: "contain" | "cover" | "stretch";
  };
}
