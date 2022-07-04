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
				<group>{animation}</group>
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



Since I am quite proud of how the visualization feature was implemented, I will explain how it works the best that I can.

To put it plainly, all logic takes place in a custom **hook**, that calls an **async function** that yields from a **generator function** specific to the chosen sorting algorithm.

### The Generator

Each sorting algorithm has its **own generator** function. I will explain how they work on **bubble sort**.

All generators take in the `items` array and `arrMax` which is a number that represents the maximum value in the array (it is needed to determine the height of the bars). `items` is an array of objects from which we get the starting unsorted array. Each element is an object in the form of `{ val: <number>, active: <boolean> }`. `val` is just a natural number, which we refer to when sorting. `active` represents whether or not the bar should be green (implying focus).

```javascript
export default function* bubbleSort(items, arrMax) {
	let i = 0;
	let j = 0;
	let arr = JSON.parse(JSON.stringify(items));

	while (i < arr.length) {
		j = 0;

		arr[i].active = true;
		arr[j].active = true;

		while (j < arr.length - 1) {
			if (arr[j].val > arr[j + 1].val) {
				[arr[j].val, arr[j + 1].val] = [arr[j + 1].val, arr[j].val];
			}

			if (j !== i) arr[j].active = false;

			j++;

			arr[j].active = true;
			if (j + 1 !== arr.length) arr[j + 1].active = true;

			yield newElements(arr, arrMax);
		}

		arr[j].active = false;
		arr[i].active = false;

		i++;

		if (i !== arr.length) arr[i].active = true;

		yield newElements(arr, arrMax);
	}
}
```

Immediately at the beginning, we do a hard copy of `items` array, because the variable is shared by all visualizations, and so we can’t modify it.

We then start the sorting process and, whenever we deem appropriate, we yield how the copied array currently looks. We yield the value returned by the `newElements` function because it returns **jsx** elements based on the array that should be put on screen.

```javascript
export default function newElements(items, max) {
	return (
		<>
			{items.map((el, inx) => {
				return (
					<div
						key={inx}
						className="node-container"
						style={{ width: `calc(${(1 / max) * 100}% )` }}
					>
						<div
							className={`node-coloured ${
								el.active ? "active" : null
							}`}
							style={{ height: `${(el.val * 100) / max}%` }}
						></div>
					</div>
				);
			})}
		</>
	);
}
```

With bubble sort, we want to show a new array whenever `i` or `j` variable is changed. We want to change the corresponding to them element’s `active` value to true, to show that the algorithm “looks” at them. We also change `j + 1` element’s `active` value to true because, in bubble sort, we compare element `j` with element `j + 1`.

### The Async Function

The async function is just a loop that calls a `sleep` function for the amount of time set by the user, **sets the state** value to what the generator yields and **breaks** the loop when the generator is done. The state that the function sets is the value **returned by the hook** and which is subsequently shown directly on the screen.

```javascript
async function getEls() {
	while (true) {
		await sleep(speedRef.current);

		const elsObj = elsGenerator.next();

		if (elsObj.done) {
			break;
		}

		setElements(elsObj);
	}
}
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
