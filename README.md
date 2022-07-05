# PORTFOLIO
![Screenshot 1](https://github.com/copperhuh/Portfolio/blob/master/src/screenshots/ss-portfolio.png?raw=true)

My personal portfolio website, built with React Three Fiber. The site uses complex use-Spring animations on DOM elements, 3D models, and vector graphic paths to ensure fluidity when changing between 13 unique visual themes. Features asynchronous message sending to an API, handling the initial website loading by using React Suspense, and full responsiveness.

## Demo

[Github Pages](https://copperhuh.github.io/Portfolio/)

## Table of Contents

-   [Technologies](#Technologies)
-   [Run Locally](#Run-Locally)
-   [How It Works](#How-It-Works)
-   [Inspiration](#Inspiration)
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
  npm start
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

## Appendix

SORT DEMON is a visualizer of sorting algorithms. It is meant to be used as a tool for learning **how the algorithms act and how they contrast from one another**. I did **not** design it to accurately show the relative speed of the algorithms, since I deemed it would make the faster algorithms less “readable”. Please keep that in mind while using the site.

### About Algorithms

There can be up to 9 algorithms running at the same time. If after adding a new algorithm, only its name appears, just click the **reset** or **shuffle** button to show it entirely. Also, note that **removing an algorithm in the middle of the runtime** can lead to some strange behavior that is also easily fixed with a **reset** or **shuffle**. Another thing - the more structurally complex algorithms (like the ones using recursion) have to **run in their entirety** before recreating their steps on the screen. I say that because that initial run in the background can lead to a **slight lag** when starting the visualization with a **large array size** and **multiple of these complex algorithms**.

### About Descriptions

**I do not take credit for any of the descriptions’ contents** - proper sources are linked at the bottom of each description. This is a **personal project** - the description functionality is just a feature that I thought would be nice to implement and thought that authentic articles would look better than some Lorem Ipsum boilerplate text. I strongly recommend everyone to visit the websites from which I got the articles - all of them are great resources for learning computer science-related topics.

## Author

-   [Jakub Koper](https://github.com/copperhuh)

## Feedback

If you have any feedback, feel free to reach out to me at jakub.koper@wpc-huh.com
