import { useTexture } from "@react-three/drei";
import map0Url from "./textures/marble.jpg";
import lightMap0Url from "./textures/marble_displacement.jpg";
import roughnessMap0Url from "./textures/marble_roughness.jpg";
import roughnessMap2Url from "./textures/gold_roughness.png";
import map3Url from "./textures/Tiles4.jpg";
import roughnessMap3Url from "./textures/Tiles4_roughness.jpg";
import map5Url from "./textures/Tiles.jpg";
import roughnessMap5Url from "./textures/Tiles_roughness.jpg";
import map6Url from "./textures/Tiles2.jpg";
import roughnessMap6Url from "./textures/Tiles2_roughness.jpg";
import map7Url from "./textures/MetalPlates.jpg";
import roughnessMap7Url from "./textures/MetalPlates_roughness.jpg";
import metalnessMap7Url from "./textures/MetalPlates_metalness.jpg";
import map8Url from "./textures/Ice.jpg";
import lightMap8Url from "./textures/Ice_displacement.jpg";
import roughnessMap8Url from "./textures/Ice_roughness.jpg";
import emptyUrl from "./textures/empty.png";
import React from "react";

export const colors = [
	{
		mainColor: "#68ab8e",
		secondaryColor: "#212523",
		contrastColor: "#D2D1C9",
	},
	{
		mainColor: "#8A7CFE",
		secondaryColor: "#BCB9B0",
		contrastColor: "#212523",
	},
	{
		mainColor: "#CA2852",
		secondaryColor: "#BCB9B0",
		contrastColor: "#212523",
	},
	{
		mainColor: "#B2A7A0",
		secondaryColor: "#010202",
		contrastColor: "#D2D1C9",
	},

	{
		mainColor: "#D6955A",
		secondaryColor: "#BCBAB0",
		contrastColor: "#212523",
	},
	{
		mainColor: "#8C8D84",
		secondaryColor: "#282D2A",
		contrastColor: "#D2D1C9",
	},
	{
		secondaryColor: "#282D2A",
		mainColor: "#BE4DC3",
		contrastColor: "#D2D1C9",
	},
	{
		mainColor: "#BCBAB0",
		secondaryColor: "#266747",
		contrastColor: "#212523",
	},
	{
		secondaryColor: "#49453D",
		mainColor: "#0C0C0C",
		contrastColor: "#D2D1C9",
	},
	{
		mainColor: "#D282CD",
		secondaryColor: "#282D2A",
		contrastColor: "#D2D1C9",
	},
	{
		secondaryColor: "#A7ACAC",
		mainColor: "#8E9C9D",
		contrastColor: "#D2D1C9",
	},
	{
		mainColor: "#2E8ECA",
		secondaryColor: "#B4B1A7",
		contrastColor: "#212523",
	},
	{
		mainColor: "#5F605E",
		secondaryColor: "#39454E",
		contrastColor: "#D2D1C9",
	},
];
const useTheme = () => {
	const [
		map0,
		lightMap0,
		roughnessMap0,
		roughnessMap2,
		map3,
		roughnessMap3,
		map5,
		roughnessMap5,
		map6,
		roughnessMap6,
		map7,
		roughnessMap7,
		metalnessMap7,
		map8,
		lightMap8,
		roughnessMap8,
		empty,
	] = useTexture([
		map0Url,
		lightMap0Url,
		roughnessMap0Url,
		roughnessMap2Url,
		map3Url,
		roughnessMap3Url,
		map5Url,
		roughnessMap5Url,
		map6Url,
		roughnessMap6Url,
		map7Url,
		roughnessMap7Url,
		metalnessMap7Url,
		map8Url,
		lightMap8Url,
		roughnessMap8Url,
		emptyUrl,
	]);

	const themes = [
		{
			secondaryColor: "#454a47",
			secondaryColorEnd: "#454a47",
			color: "#68ab8e",
			colorEnd: "#86D9BD",
			wallMaterial: false,
			skullMaterial: false,
			material: <meshMatcapMaterial color={"#68ab8e"} />,
		},
		{
			secondaryColor: "#D2D1C9",
			secondaryColorEnd: "#EBEAE1",
			color: "#D4D0C1",
			colorEnd: "#D4D0C1",
			wallMaterial: true,
			skullMaterial: true,
			material: <meshNormalMaterial />,
		},
		{
			secondaryColor: "#D4D0C1",
			secondaryColorEnd: "#D4D0C1",
			color: "#e34267",
			colorEnd: "#B03350",
			wallMaterial: false,
			skullMaterial: false,
			material: (
				<meshStandardMaterial
					color="#e34267"
					roughnessMap={roughnessMap2}
					map={empty}
					aoMap={empty}
				/>
			),
		},
		{
			secondaryColor: "#111212",
			secondaryColorEnd: "#111212",
			color: "#c7b8ae",
			colorEnd: "#c7b8ae",
			wallMaterial: false,
			skullMaterial: true,
			material: (
				<meshStandardMaterial
					color={"white"}
					map={map6}
					roughnessMap={roughnessMap6}
					lightMap={empty}
					aoMap={empty}
				/>
			),
		},
		{
			secondaryColor: "#D4D0C1",
			secondaryColorEnd: "#D4D0C1",
			color: "#fba063",
			colorEnd: "#FDC456",
			wallMaterial: false,
			skullMaterial: false,
			material: (
				<meshStandardMaterial
					color={"#fba063"}
					roughnessMap={roughnessMap2}
					map={empty}
					aoMap={empty}
				/>
			),
		},
		{
			secondaryColor: "#454a47",
			secondaryColorEnd: "#D4D0C1",
			color: "#454a47",
			colorEnd: "#D4D0C1",
			wallMaterial: false,
			skullMaterial: true,
			material: (
				<meshStandardMaterial
					color={"white"}
					map={map5}
					roughnessMap={roughnessMap5}
					alphaMap={empty}
					metalnessMap={empty}
				/>
			),
		},
		{
			secondaryColor: "#454a47",
			secondaryColorEnd: "#454a47",
			color: "#a64dbf",
			colorEnd: "#D64BC8",
			wallMaterial: false,
			skullMaterial: false,
			material: (
				<meshStandardMaterial
					color={"#a64dbf"}
					metalness={1}
					roughness={0.5}
					map={empty}
					roughnessMap={empty}
					metalnessMap={empty}
				/>
			),
		},
		{
			secondaryColor: "#D4D0C1",
			secondaryColorEnd: "#D4D0C1",
			color: "#447c5e",
			colorEnd: "#64B58A",
			wallMaterial: false,
			skullMaterial: true,
			material: (
				<meshStandardMaterial
					color={"white"}
					map={map3}
					roughnessMap={roughnessMap3}
					aoMap={empty}
				/>
			),
		},
		{
			secondaryColor: "#A39E91",
			secondaryColorEnd: "#80766B",
			color: "#272726",
			colorEnd: "#272726",
			wallMaterial: false,
			skullMaterial: true,
			material: (
				<meshStandardMaterial
					color={"white"}
					map={map0}
					lightMap={lightMap0}
					roughnessMap={roughnessMap0}
					aoMap={empty}
				/>
			),
		},
		{
			secondaryColor: "#454a47",
			secondaryColorEnd: "#454a47",
			color: "#f38bf5",
			colorEnd: "#FA8289",
			wallMaterial: false,
			skullMaterial: false,
			material: <meshMatcapMaterial color={"#f38bf5"} />,
		},
		{
			secondaryColor: "#b7bebd",
			secondaryColorEnd: "#b7bebd",
			color: "#9babac",
			colorEnd: "#9CA7B8",
			wallMaterial: false,
			skullMaterial: true,
			material: (
				<meshStandardMaterial
					color={"white"}
					map={map8}
					lightMap={lightMap8}
					roughnessMap={roughnessMap8}
				/>
			),
		},
		{
			secondaryColor: "#D4D0C1",
			secondaryColorEnd: "#D4D0C1",
			color: "#3c9df1",
			colorEnd: "#2CCBDB",
			wallMaterial: false,
			skullMaterial: false,
			material: <meshMatcapMaterial color={"#3c9df1"} />,
		},
		{
			secondaryColor: "#768591",
			secondaryColorEnd: "#616E78",
			color: "#8D8F8C",
			colorEnd: "#A4A6A2",
			wallMaterial: false,
			skullMaterial: true,
			material: (
				<meshStandardMaterial
					color={"white"}
					map={map7}
					roughnessMap={roughnessMap7}
					metalnessMap={metalnessMap7}
				/>
			),
		},
	];

	return themes;
};
export default useTheme;
