import { useTexture } from "@react-three/drei";

const themesData = [
	{
		secondaryColor: "#454a47",
		color: "white",
		material: (color) => "standard",
		map: "marble.jpg",
		lightMap: "marble_displacement.jpg",
		roughnessMap: "marble_roughness.jpg",
		alphaMap: null,
		aoMap: null,
		metalnessMap: null,
		metalness: 0,
		roughness: 1,
	},
	{
		secondaryColor: "#454a47",
		color: "white",
		material: (color) => "standard",
		map: null,
		lightMap: null,
		roughnessMap: null,
		alphaMap: null,
		aoMap: null,
		metalnessMap: null,
		metalness: 1,
		roughness: 0.5,
	},
	{
		secondaryColor: "#454a47",
		color: "white",
		material: (color) => "standard",
		map: null,
		lightMap: null,
		roughnessMap: "gold_roughness.png",
		alphaMap: null,
		aoMap: null,
		metalnessMap: null,
		metalness: 0,
		roughness: 1,
	},
	{
		secondaryColor: "#454a47",
		color: "white",
		material: (color) => "standard",
		map: "Tiles4.jpg",
		lightMap: "Tiles4_displacement.jpg",
		roughnessMap: "Tiles4_roughness.jpg",
		alphaMap: null,
		aoMap: null,
		metalnessMap: null,
		metalness: 0,
		roughness: 1,
	},
	{
		secondaryColor: "#454a47",
		color: "white",
		material: (color) => "standard",
		map: "Tiles3.jpg",
		lightMap: null,
		roughnessMap: "Tiles3_roughness.jpg",
		alphaMap: "Tiles3_displacement.jpg",
		aoMap: null,
		metalnessMap: null,
		metalness: 0,
		roughness: 1,
	},
	{
		secondaryColor: "#454a47",
		color: "white",
		material: (color) => "standard",
		map: "Tiles.jpg",
		lightMap: "Tiles_displacement.jpg",
		roughnessMap: "Tiles_roughness.jpg",
		alphaMap: null,
		aoMap: "Tiles_ambientOcclusion.jpg",
		metalnessMap: null,
		metalness: 0,
		roughness: 1,
	},
	{
		secondaryColor: "#454a47",
		color: "white",
		material: (color) => "standard",
		map: "Tiles2.jpg",
		lightMap: null,
		roughnessMap: "Tiles2_roughness.jpg",
		alphaMap: "Tiles2_displacement.jpg",
		aoMap: null,
		metalnessMap: null,
		metalness: 0,
		roughness: 1,
	},
	{
		secondaryColor: "#454a47",
		color: "white",
		material: (color) => "standard",
		map: "MetalPlates.jpg",
		lightMap: "MetalPlates_displacement.jpg",
		roughnessMap: "MetalPlates_roughness.jpg",
		alphaMap: null,
		aoMap: null,
		metalnessMap: "MetalPlates_metalness.jpg",
		metalness: 0,
		roughness: 1,
	},
	{
		secondaryColor: "#454a47",
		color: "white",
		material: (color) => "standard",
		map: "Ice.jpg",
		lightMap: "Ice_displacement.jpg",
		roughnessMap: "Ice_roughness.jpg",
		alphaMap: null,
		aoMap: null,
		metalnessMap: null,
		metalness: 0,
		roughness: 1,
	},
	{
		secondaryColor: "#454a47",
		color: "white",
		material: (color) => "standard",
		map: null,
		lightMap: "Fabric022_displacement.jpg",
		roughnessMap: "Fabric022_roughness.jpg",
		alphaMap: null,
		aoMap: null,
		metalnessMap: null,
		metalness: 0,
		roughness: 1,
	},
];
export const colors = [
	{
		mainColor: "#4B8B70",
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
		secondaryColor: "#8e79f7",
		mainColor: "#cbe04f",
		contrastColor: "#D2D1C9",
	},
	{
		mainColor: "#D6955A",
		secondaryColor: "#BCBAB0",
		contrastColor: "#212523",
	},
	{
		mainColor: "#BCBAB0",
		secondaryColor: "#282D2A",
		contrastColor: "#D2D1C9",
	},
	{
		secondaryColor: "#282D2A",
		mainColor: "#9333A9",
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
	// const map0 = useTexture(`./media/textures/marble.jpg`);
	// const lightMap0 = useTexture(`./media/textures/marble_displacement.jpg`);
	// const roughnessMap0 = useTexture(`./media/textures/marble_roughness.jpg`);

	// const roughnessMap2 = useTexture(`./media/textures/gold_roughness.png`);

	// const map3 = useTexture(`./media/textures/Tiles4.jpg`);
	// const roughnessMap3 = useTexture(`./media/textures/Tiles4_roughness.jpg`);

	// const map5 = useTexture(`./media/textures/Tiles.jpg`);
	// const roughnessMap5 = useTexture(`./media/textures/Tiles_roughness.jpg`);

	// const map6 = useTexture(`./media/textures/Tiles2.jpg`);
	// const roughnessMap6 = useTexture(`./media/textures/Tiles2_roughness.jpg`);

	// const map7 = useTexture(`./media/textures/MetalPlates.jpg`);

	// const roughnessMap7 = useTexture(
	// 	`./media/textures/MetalPlates_roughness.jpg`
	// );
	// const metalnessMap7 = useTexture(
	// 	`./media/textures/MetalPlates_metalness.jpg`
	// );

	// const map8 = useTexture(`./media/textures/Ice.jpg`);
	// const lightMap8 = useTexture(`./media/textures/Ice_displacement.jpg`);
	// const roughnessMap8 = useTexture(`./media/textures/Ice_roughness.jpg`);

	// const empty = useTexture(`./media/textures/empty.png`);

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
		`./media/textures/marble.jpg`,
		`./media/textures/marble_displacement.jpg`,
		`./media/textures/marble_roughness.jpg`,
		`./media/textures/gold_roughness.png`,
		`./media/textures/Tiles4.jpg`,
		`./media/textures/Tiles4_roughness.jpg`,
		`./media/textures/Tiles.jpg`,
		`./media/textures/Tiles_roughness.jpg`,
		`./media/textures/Tiles2.jpg`,
		`./media/textures/Tiles2_roughness.jpg`,
		`./media/textures/MetalPlates.jpg`,
		`./media/textures/MetalPlates_roughness.jpg`,
		`./media/textures/MetalPlates_metalness.jpg`,
		`./media/textures/Ice.jpg`,
		`./media/textures/Ice_displacement.jpg`,
		`./media/textures/Ice_roughness.jpg`,
		`./media/textures/empty.png`,
	]);

	const themes = [
		{
			secondaryColor: "#454a47",
			secondaryColorEnd: "#454a47",
			color: "#68ab8e",
			colorEnd: "#86D9BD",
			wallMaterial: false,
			material: (color) => <meshMatcapMaterial color={color} />,
			// material:(color)=> <meshMatcapMaterial color={"#68ab8e"} />,
		},
		{
			secondaryColor: "#D2D1C9",
			secondaryColorEnd: "#EBEAE1",
			color: "#D4D0C1",
			colorEnd: "#D4D0C1",
			wallMaterial: true,
			materialType: "normal",
			material: (color) => <meshNormalMaterial />,
		},
		{
			secondaryColor: "#D4D0C1",
			secondaryColorEnd: "#D4D0C1",
			color: "#e34267",
			colorEnd: "#B03350",
			wallMaterial: false,
			material: (color) => (
				<meshStandardMaterial
					color={color}
					// color={"#e34267"}
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
			material: (color) => (
				<meshStandardMaterial
					color={"white"}
					map={map6}
					roughnessMap={roughnessMap6}
				/>
			),
		},

		{
			secondaryColor: "#454a47",
			secondaryColorEnd: "#454a47",
			color: "#454a47",
			colorEnd: "#454a47",
			wallMaterial: true,
			materialType: "distance",
			material: (color) => <meshDistanceMaterial />,
		},
		{
			secondaryColor: "#D4D0C1",
			secondaryColorEnd: "#D4D0C1",
			color: "#fba063",
			colorEnd: "#FDC456",
			wallMaterial: false,
			material: (color) => (
				<meshStandardMaterial
					color={color}
					// color={"#fba063"}
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
			material: (color) => (
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
			material: (color) => (
				<meshStandardMaterial
					color={color}
					// color={"#a64dbf"}
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
			material: (color) => (
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
			material: (color) => (
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
			// material:(color)=> <meshMatcapMaterial color={"#f38bf5"} />,
			material: (color) => <meshMatcapMaterial color={color} />,
		},
		{
			secondaryColor: "#b7bebd",
			secondaryColorEnd: "#b7bebd",
			color: "#9babac",
			colorEnd: "#9CA7B8",
			wallMaterial: false,
			material: (color) => (
				<meshStandardMaterial
					color={"white"}
					map={map8}
					lightMap={lightMap8}
					roughnessMap={roughnessMap8}
					alphaMap={empty}
					aoMap={empty}
					metalnessMap={empty}
				/>
			),
		},
		{
			secondaryColor: "#D4D0C1",
			secondaryColorEnd: "#D4D0C1",
			color: "#3c9df1",
			colorEnd: "#2CCBDB",
			wallMaterial: false,
			material: (color) => <meshMatcapMaterial color={color} />,
			// material:(color)=> <meshMatcapMaterial color={"#3c9df1"} />,
		},
		{
			secondaryColor: "#768591",
			secondaryColorEnd: "#616E78",
			color: "#8D8F8C",
			colorEnd: "#A4A6A2",
			wallMaterial: false,
			material: (color) => (
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
