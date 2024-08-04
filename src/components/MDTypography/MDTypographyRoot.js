import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { TypographyProps } from "@mui/material/Typography";
import { Theme } from "@mui/material/styles";

interface OwnerState {
  color: keyof Theme["palette"] | "inherit" | "text" | "white" | "light";
  textTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
  verticalAlign?: "unset" | "baseline" | "sub" | "super" | "text-top" | "text-bottom" | "middle" | "top" | "bottom";
  fontWeight?: "light" | "regular" | "medium" | "bold";
  opacity?: number;
  textGradient?: boolean;
  darkMode?: boolean;
}

interface StyledTypographyProps extends TypographyProps {
  ownerState: OwnerState;
}

export default styled(Typography)<StyledTypographyProps>(({ theme, ownerState }) => {
  const { palette, typography, functions } = theme;
  const { color, textTransform, verticalAlign, fontWeight, opacity, textGradient, darkMode } = ownerState;

  const { gradients, transparent, white } = palette;
  const { fontWeightLight, fontWeightRegular, fontWeightMedium, fontWeightBold } = typography;
  const { linearGradient } = functions;

  // fontWeight styles
  const fontWeights: Record<string, number> = {
    light: fontWeightLight,
    regular: fontWeightRegular,
    medium: fontWeightMedium,
    bold: fontWeightBold,
  };

  // styles for the typography with textGradient={true}
  const gradientStyles = () => ({
    backgroundImage:
      color !== "inherit" && color !== "text" && color !== "white" && gradients[color as keyof typeof gradients]
        ? linearGradient(gradients[color as keyof typeof gradients].main, gradients[color as keyof typeof gradients].state)
        : linearGradient(gradients.dark.main, gradients.dark.state),
    display: "inline-block",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: transparent.main,
    position: "relative" as "relative",
    zIndex: 1,
  });

  // color value
  let colorValue = color === "inherit" || !palette[color as keyof typeof palette] ? "inherit" : palette[color as keyof typeof palette].main;

  if (darkMode && (color === "inherit" || !palette[color as keyof typeof palette])) {
    colorValue = "inherit";
  } else if (darkMode && color === "dark") colorValue = white.main;

  return {
    opacity,
    textTransform,
    verticalAlign,
    textDecoration: "none",
    color: colorValue,
    fontWeight: fontWeights[fontWeight as keyof typeof fontWeights],
    ...(textGradient && gradientStyles()),
  };
});
