# PORTFOLIO
![Screenshot 1](https://github.com/copperhuh/Portfolio/blob/master/src/screenshots/ss-portfolio.png?raw=true)

My personal portfolio website, built with React Three Fiber. The site uses complex use-Spring animations on DOM elements, 3D models, and vector graphic paths to ensure fluidity when changing between 13 unique visual themes. Features asynchronous message sending to an API, handling the initial website loading by using React Suspense, and full responsiveness.

## Demo

[Github Pages](https://copperhuh.github.io/Portfolio/)

## Table of Contents

-   [Technologies](#Technologies)
-   [Run Locally](#Run-Locally)
-   [How It Works](#How-It-Works)
-   [Appendix](#Appendix)
-   [Author](#Author)
-   [Feedback](#Feedback)

## Technologies

#### Main

-   **React**
-   **React Three Fiber** 
-   **Styled Components**
-   **use-Spring**
-   **Vite**

#### Other

-   **Material UI** (icons)
-   **Axios** (async message sending)
-   **camera-controls** by [yomotsu](https://github.com/yomotsu/camera-controls) (menaging camera position)
-   **Github Pages** (hosting demo)

## Run Locally

Clone the project

```bash
  git clone https://github.com/copperhuh/Portfolio
```

Go to the project directory

```bash
  cd Portfolio
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## How It Works

### Handling Initial Asset Loading

Since all the texture, 3D model, and scene loading takes some time and happens immediately on page load, there was a need for a loader to obscure the unloaded site in the beginning. The idea I came up with, was to create a component that I would pass as a fallback prop to a React Suspense that was wrapped around the component that finishes loading last. This component wouldn’t actually return anything and would only have a useEffect hook, which returns a function call that changes parent’s state signalling that the loading has ended.

```javascript
export default function Loading({ setLoaded }) {
	useEffect(() => {
		return () => setTimeout(() => setLoaded(true), 100);
	}, []);
	return;
}
```

```javascript
function Scene({ setLoaded, ... }) {
	...
	return (
		<>
			...
			<Suspense fallback={<Loading setLoaded={setLoaded} />}>
				<Skull ... />
			</Suspense>
		</>
	);
}
```

It works, since useEffect’s return behaves like componentWillUnmout and we know it will unmount when React Suspense hides its fallback - so only after the component it wraps finishes loading. With this setup have state with information whether everything is loaded or not, and we then can conditionally show a load screen component at the top level of the app with a smooth CSS animation (if it was a JS animation it wouldn’t work, since JS is busy loading)

```javascript
function App() {
	...

	const [loaded, setLoaded] = useState(false);
	const [loadScreenOpen, setLoadScreenOpen] = useState(true);
	const [landingOpen, setLandingOpen] = useState(false);
	
	...

	return (
		<>
			...
			{loadScreenOpen && (
				<LoadingScreen
					setLoadScreenOpen={setLoadScreenOpen}
					setLandingOpen={setLandingOpen}
					loaded={loaded}
				/>
			)}
			...
		</>
	);
}
```



### Ring Gradient

It may be not noticeable at first glance but most themes' background "rings" are colored with a subtle gradient, or more specifically, even though each ring has only one color, rings next to each other have slightly different ones, which makes them all together look like a moving gradient.
The way I did it was to, first of all, make each ring aware of its relative index (eg. the 15th even ring out of 25 even rings and 50 overall rings), and then with the help of a utility function, that takes in two colors (gradient boundaries as CSS valid hex string) and ring index, get the specific color. The function translates hex strings to RGB values in three-element arrays, next it creates an array of all the colors the gradient will consist of by gradually distributing the red, green, and blue value's differences in a way similar to an arithmetic sequence (eg. gradient from colors [0,0,0] and [4,4,4] for four rings => [[0,0,0],[2,2,2],[4,4,4],[2,2,2]]). Lastly, the algorithm maps over the array, turns RGB arrays into CSS valid hex strings, and returns the color at the ring index of the ring from which the function was originally called.
```javascript
const getColorFromRange = ( color1, color2, idx, leng, n, type = "index") => {
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
```

### Skull's Idle Animation

From the beginning I wanted the skull to move like it was floating in zero gravity, so I decided that the animation should be done with use-Spring for maximum smoothness. Skull's mesh's props 'rotationX', 'rotationY', 'rotationZ', and 'positionY' are animated with separate useSpring hooks so that the skull rotates on all axes and slightly hovers up and down at the same time. As to why the skull moves seemingly at random - the specific spring's 'config' object I used has the 'friction' parameter set to 0, this means that at no point does the animation noticeably bounce to loop - that in combination with the fact that each axis animation is separate makes the skull movement look random.  

```javascript
const { x } = useSpring({
	loop: true,
	to: [{ x: (Math.PI * 4) / 10 }, { x: (Math.PI * 6) / 10 }],
	from: { x: (Math.PI * 5.5) / 10 },
	delay: 2,
	config: { mass: 100, tension: 300, friction: 0 },
	pause: !moveSkull,
});

const { y } = useSpring({
	loop: true,
	to: [{ y: (Math.PI * 9.5) / 10 }, { y: (Math.PI * 10.5) / 10 }],
	from: { y: (Math.PI * 10.5) / 10 },
	delay: 2,
	config: { mass: 100, tension: 250, friction: 0 },
	pause: !moveSkull,
});

const { z } = useSpring({
	loop: true,
	to: [{ z: (Math.PI * 8) / 4 }, { z: (Math.PI * 9.5) / 4 }],
	from: { z: (Math.PI * 9.5) / 4 },
	config: { mass: 100, tension: 100, friction: 0 },
	pause: !moveSkull,
});

const { v } = useSpring({
	loop: true,
	to: [{ v: 2 }, { v: 1.8 }],
	from: { v: 1.8 },
	config: { mass: 20, tension: 100, friction: 0 },
	pause: !moveSkull,
});
```

### Skull's OnClick Animation

There are two skulls always present - the main one that is always visible and has the current visual theme (the same theme as the background), and there is also another very small skull hidden inside the main one. The small skull always has the theme that's next in the queue and when the main skull is clicked the small skull grows at the same time that the main one shrinks to give the illusion that the next theme fluidly overtakes the current one. Then only when the main skull is fully obscured by the enlarged small skull, the main skull's theme is changed (at that moment both skulls have the same theme). After the main skull changes its theme, both skulls' sizes bounce back - the main skull comes to the front and the small one becomes small again - then the small skull's theme is changed to the next one up in the queue and is ready for another click animation. 

The animation is the way it is to ensure that the user doesn't see the skulls when their theme is changing - since some themes have textures or even change the whole material of the mesh, the change looks jarring and even sometimes flickers for a moment.

### Skull's White Outline

The outline was originally added to be a visual indicator that the skull is clickable, but in hindsight, I don't really think that it achieves that goal. Nonetheless, I left it in since I think it looks nice. 

The outline is just the same model as the skull, only larger and its mesh has a lesser 'renderOrder' prop's value than the colored skull. Also, the outline skull's material is 'meshBasicMaterial' (hence no shading) with 'depthTest' and 'depthWrite' props set to false.

### Async Message Sending With Getform

Message sending from the contact section is handled by [Getform](https://getform.io/)'s API. The messages are sent asynchronously to their database and are visible on the dashboard of my Getform account 

## Appendix

### Problems 

-	There seems to be a bug that makes it so that after a theme change, some rings don't manage to switch themes and stick out from the rest. I think the problem occurs only when the site is lagging but I'm not 100% certain. Nevertheless, the problem is always fixed after another theme change.

-	An issue with the appearance of the skull textures on some mobile devices. At the moment I really don't have the resources to check what causes the problem - it appears on some IOS devices but looks perfect on other IOS devices and desktops. 

-	Overall performance problems on some less powerful devices eg. older phones, and laptops (noticeable lag in all 3D object movement). 

## Author

-   [Jakub Koper](https://github.com/copperhuh)

## Feedback

If you have any feedback, feel free to reach out to me at jakub.koper@wpc-huh.com
