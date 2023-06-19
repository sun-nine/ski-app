import { extendTheme } from "@chakra-ui/react";
import { Noto_Sans_JP } from 'next/font/google';

const nextFont = Noto_Sans_JP({
	weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

const colors = {
	brand: {
		900: "#1a365d",
		800: "#153e75",
		700: "#2a69ac",
	},    
};

export const theme = extendTheme({ 
	colors, 
	fonts: {
		body: nextFont.style.fontFamily,
		heading: nextFont.style.fontFamily,
	}
});
