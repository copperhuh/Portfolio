export const getColorFromRange = (
	color1,
	color2,
	idx,
	leng,
	n,
	type = "index"
) => {
	let vals1 = ["", "", ""];
	let vals2 = ["", "", ""];

	for (let i = 0; i < color1.length - 1; i++) {
		vals1[~~(i / 2)] += color1[i + 1];
		vals2[~~(i / 2)] += color2[i + 1];
	}
	vals1 = vals1.map((hex) => parseInt(hex, 16));
	vals2 = vals2.map((hex) => parseInt(hex, 16));

	const colors = new Array(n);
	const colorsN = n % 2 === 0 ? n / 2 + 1 : (n + 1) / 2;
	const diff = vals1.map((_, i) => vals1[i] - vals2[i]);

	for (let i = 0; i < n; i++) {
		if (i < colorsN) {
			colors[i] =
				"#" +
				vals1
					.map((_, id) =>
						Math.ceil(vals1[id] - (diff[id] / (colorsN - 1)) * i)
					)
					.map((dec) => dec.toString(16))
					.map((hex) => (hex.length === 2 ? hex : "0" + hex))
					.join("");
		} else {
			colors[i] = colors[colorsN - (i + 2 - colorsN)];
		}
	}

	const arr = new Array(leng)
		.fill(null)
		.map((_, i) => colors[i % colors.length]);

	return type === "all"
		? arr
		: type === "avrage"
		? arr[~~((colorsN - 1) / 2)]
		: arr[idx];
};
