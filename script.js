

function createArray() {
    alert("Button clicked");
    let input = document.getElementById("arrayInput").value;

    if (input.trim() === "") {
        alert("Please enter numbers!");
        return;
    }

    let arr = input.split(" ").map(Number);

    // Check invalid input
    if (arr.some(isNaN)) {
        alert("Enter only numbers separated by space!");
        return;
    }

    displayArray(arr);
}

function generateRandom() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
        arr.push(Math.floor(Math.random() * 100) + 1);
    }
    displayArray(arr);
}

function displayArray(arr) {
    let container = document.getElementById("container");
    container.innerHTML = "";

    arr.forEach(value => {
        let bar = document.createElement("div");
        bar.classList.add("bar");

        bar.innerText = value; // ✅ show number
        bar.setAttribute("data-value", value);

        container.appendChild(bar);
    });
}

function showInfo(algo) {
    let info = document.getElementById("info");

    if (algo === "bubble") {
        info.innerHTML = "Bubble Sort → Time: O(n²), Space: O(1)";
    } else if (algo === "selection") {
        info.innerHTML = "Selection Sort → Time: O(n²), Space: O(1)";
    }
    else if (algo === "insertion") {
    info.innerHTML = "Insertion Sort → Time: O(n²), Space: O(1)";
    }
    else if (algo === "merge") {
    info.innerHTML = "Merge Sort → Time: O(n log n), Space: O(n)";
    }
    else if (algo === "quick") {
    info.innerHTML = "Quick Sort → Time: O(n log n), Space: O(log n)";
    }
    else if (algo === "bfs") {
    info.innerHTML = "BFS → Time: O(V + E), uses Queue";
    }
    else if (algo === "dfs") {
    info.innerHTML = "DFS → Time: O(V + E), uses Recursion/Stack";
}
}

let delay = 300;

document.getElementById("speedRange").addEventListener("input", function() {
    delay = this.value;
});

function sleep() {
    return new Promise(resolve => setTimeout(resolve, delay));
}

function resetArray() {
    document.getElementById("container").innerHTML = "";
    let bars = document.querySelectorAll(".bar");
    bars.forEach(bar => {
        bar.style.background = "cyan";
    });
}

//bubble sort
async function bubbleSort() {
    showInfo("bubble");
    let bars = document.querySelectorAll(".bar");

    for (let i = 0; i < bars.length; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {

            bars[j].classList.add("active");
            bars[j + 1].classList.add("active");

            await sleep();

            let val1 = parseInt(bars[j].innerText);
            let val2 = parseInt(bars[j + 1].innerText);

            if (val1 > val2) {

                bars[j].classList.add("swap");
                bars[j + 1].classList.add("swap");

                await sleep();

                // ✅ Swap numbers (MAIN FIX)
                bars[j].innerText = val2;
                bars[j + 1].innerText = val1;

                // ✅ Update data-values
                bars[j].setAttribute("data-value", val2);
                bars[j + 1].setAttribute("data-value", val1);
            }

            bars[j].classList.remove("active", "swap");
            bars[j + 1].classList.remove("active", "swap");
        }
    }
}

// binary search
async function binarySearch() {
    let bars = document.querySelectorAll(".bar");

    // Convert bars to array values
    let arr = [];
    bars.forEach(bar => {
        arr.push(parseInt(bar.getAttribute("data-value")));
    });

    // Sort array first
    arr.sort((a, b) => a - b);
    displayArray(arr);

    let target = prompt("Enter number to search:");
    target = parseInt(target);

    let low = 0;
    let high = arr.length - 1;

    let updatedBars = document.querySelectorAll(".bar");

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);

        // Highlight mid
        updatedBars[mid].classList.add("active");
        await sleep();

        let midValue = parseInt(updatedBars[mid].getAttribute("data-value"));

        if (midValue === target) {
            updatedBars[mid].style.background = "lime";
            return;
        }

        if (midValue < target) {
            for (let i = low; i <= mid; i++) {
                updatedBars[i].style.background = "#444";
            }
            low = mid + 1;
        } else {
            for (let i = mid; i <= high; i++) {
                updatedBars[i].style.background = "#444";
            }
            high = mid - 1;
        }

        await sleep();
    }

    alert("Element not found");
}

// Selection sort
async function selectionSort() {
    showInfo("selection");
    let bars = document.querySelectorAll(".bar");

    for (let i = 0; i < bars.length; i++) {
        let minIndex = i;

        bars[minIndex].classList.add("active");

        for (let j = i + 1; j < bars.length; j++) {

            bars[j].classList.add("active");
            await sleep();

            let val1 = parseInt(bars[j].innerText);
            let val2 = parseInt(bars[minIndex].innerText);

            if (val1 < val2) {
                bars[minIndex].classList.remove("active");
                minIndex = j;
                bars[minIndex].classList.add("active");
            } else {
                bars[j].classList.remove("active");
            }
        }

        // Swap
        if (minIndex !== i) {
            bars[i].classList.add("swap");
            bars[minIndex].classList.add("swap");

            await sleep();

            let temp = bars[i].innerText;
            bars[i].innerText = bars[minIndex].innerText;
            bars[minIndex].innerText = temp;

            bars[i].setAttribute("data-value", bars[i].innerText);
            bars[minIndex].setAttribute("data-value", bars[minIndex].innerText);
        }

        bars[i].classList.remove("swap");
        bars[minIndex].classList.remove("swap");
    }
}

// insertion sort
async function insertionSort() {
    showInfo("insertion");

    let bars = document.querySelectorAll(".bar");

    for (let i = 1; i < bars.length; i++) {

        let key = parseInt(bars[i].innerText);
        let j = i - 1;

        bars[i].classList.add("active");
        await sleep();

        while (j >= 0 && parseInt(bars[j].innerText) > key) {

            bars[j].classList.add("swap");
            await sleep();

            bars[j + 1].innerText = bars[j].innerText;
            bars[j + 1].setAttribute("data-value", bars[j].innerText);

            bars[j].classList.remove("swap");
            j--;
        }

        bars[j + 1].innerText = key;
        bars[j + 1].setAttribute("data-value", key);

        bars[i].classList.remove("active");
    }
}

// merge sort

async function mergeSort() {
    showInfo("merge");

    let bars = document.querySelectorAll(".bar");
    let arr = [];

    bars.forEach(bar => {
        arr.push(parseInt(bar.innerText));
    });

    await mergeSortHelper(arr, 0, arr.length - 1);
    displayArray(arr);
}

async function mergeSortHelper(arr, left, right) {
    if (left >= right) return;

    let mid = Math.floor((left + right) / 2);

    await mergeSortHelper(arr, left, mid);
    await mergeSortHelper(arr, mid + 1, right);

    await merge(arr, left, mid, right);
}

async function merge(arr, left, mid, right) {
    let temp = [];
    let i = left, j = mid + 1;

    while (i <= mid && j <= right) {
        await sleep();

        if (arr[i] < arr[j]) {
            temp.push(arr[i++]);
        } else {
            temp.push(arr[j++]);
        }
    }

    while (i <= mid) temp.push(arr[i++]);
    while (j <= right) temp.push(arr[j++]);

    for (let k = left; k <= right; k++) {
        arr[k] = temp[k - left];
    }

    displayArray(arr);
}

// quick sort

async function quickSort() {
    showInfo("quick");

    let bars = document.querySelectorAll(".bar");
    let arr = [];

    bars.forEach(bar => {
        arr.push(parseInt(bar.innerText));
    });

    await quickSortHelper(arr, 0, arr.length - 1);
    displayArray(arr);
}

async function quickSortHelper(arr, low, high) {
    if (low < high) {
        let pi = await partition(arr, low, high);

        await quickSortHelper(arr, low, pi - 1);
        await quickSortHelper(arr, pi + 1, high);
    }
}

async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        await sleep();

        if (arr[j] < pivot) {
            i++;

            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;

            displayArray(arr);
        }
    }

    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    displayArray(arr);

    return i + 1;
}

//Graphs

let graph = {};
let positions = {};
let nodeLabels = {}; // 0 -> A

// GENERATE GRAPH (A B 2 format)
function generateGraph() {
    let edgesText = document.getElementById("edgesInput").value.trim();

    if (edgesText === "") {
        alert("Enter edges");
        return;
    }

    graph = {};
    positions = {};
    nodeLabels = {};

    let nodeMap = {}; // A -> 0
    let index = 0;

    let lines = edgesText.split("\n");

    // Assign indices to node names
    for (let line of lines) {
        let [u, v, w] = line.trim().split(" ");

        if (!nodeMap[u]) {
            nodeMap[u] = index;
            nodeLabels[index] = u;
            index++;
        }

        if (!nodeMap[v]) {
            nodeMap[v] = index;
            nodeLabels[index] = v;
            index++;
        }
    }

    // Initialize graph
    for (let i = 0; i < index; i++) {
        graph[i] = [];

        positions[i] = {
            x: Math.random() * 500,
            y: Math.random() * 300
        };
    }

    // Add edges
    function edgeExists(u, v) {
    return graph[u].some(edge => edge.node === v);
    }
    for (let line of lines) {
    let [u, v, w] = line.trim().split(" ");
    let weight = parseInt(w);

    let uIndex = nodeMap[u];
    let vIndex = nodeMap[v];

    // ✅ prevent duplicates
    if (!edgeExists(uIndex, vIndex)) {
        graph[uIndex].push({ node: vIndex, weight: weight });
        graph[vIndex].push({ node: uIndex, weight: weight });
    }
    } 

    createGraph();
}

function createGraph() {
    let nodesDiv = document.getElementById("nodes");
    nodesDiv.innerHTML = "";

    for (let node in positions) {
        let div = document.createElement("div");
        div.classList.add("node");

        div.innerText = nodeLabels[node]; // ✅ FIXED

        div.style.left = positions[node].x + "px";
        div.style.top = positions[node].y + "px";

        makeDraggable(div, node);

        nodesDiv.appendChild(div);
    }

    drawEdges();
}

function makeDraggable(element, node) {
    let offsetX = 0, offsetY = 0;
    let isDragging = false;

    element.onmousedown = function (e) {
        isDragging = true;

        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;
    };

    document.onmousemove = function (e) {
        if (!isDragging) return;

        let x = e.clientX - offsetX;
        let y = e.clientY - offsetY;

        element.style.left = x + "px";
        element.style.top = y + "px";

        // ✅ update position
        positions[node].x = x;
        positions[node].y = y;

        // 🔥 redraw edges dynamically
        drawEdges();
    };

    document.onmouseup = function () {
        isDragging = false;
    };
}

function drawEdges() {
    let svg = document.getElementById("edges");
    svg.innerHTML = "";

    for (let u in graph) {
        graph[u].forEach(edge => {
            let v = edge.node;
            let weight = edge.weight;

            // ✅ prevent duplicate edges
            if (u < v) {

                let x1 = positions[u].x + 25;
                let y1 = positions[u].y + 25;
                let x2 = positions[v].x + 25;
                let y2 = positions[v].y + 25;

                // Line
                let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", x1);
                line.setAttribute("y1", y1);
                line.setAttribute("x2", x2);
                line.setAttribute("y2", y2);
                line.setAttribute("stroke", "white");
                line.setAttribute("stroke-width", "2");

                svg.appendChild(line);

                // Weight text (centered)
                let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                text.setAttribute("x", (x1 + x2) / 2);
                text.setAttribute("y", (y1 + y2) / 2 - 5);
                text.setAttribute("fill", "yellow");
                text.textContent = weight;
                svg.appendChild(text);
            }
        });
    }
}

x = Math.max(0, Math.min(x, 550));
y = Math.max(0, Math.min(y, 350));


async function bfs(start = 0) {
    let visited = new Set();
    let queue = [start];
    let result = [];

    while (queue.length > 0) {
        let node = queue.shift();

        if (visited.has(node)) continue;

        visited.add(node);
        result.push(node);

        let el = document.querySelectorAll(".node")[node];
        el.style.background = "red";
        await sleep();
        el.style.background = "orange";

        for (let nei of graph[node]) {
            if (!visited.has(nei.node)) {
                queue.push(nei.node);
            }
        }
    }

    // ✅ Display result
    document.getElementById("result").innerText =
    "BFS Order: " + result.map(n => nodeLabels[n]).join(" → ");
}

// DFS
async function dfs(start = 0) {
    let visited = new Set();
    let result = [];

    await dfsHelper(start, visited, result);

    // ✅ Display result
    document.getElementById("result").innerText =
    "BFS Order: " + result.map(n => nodeLabels[n]).join(" → ");
}

async function dfsHelper(node, visited, result) {
    visited.add(node);
    result.push(node);

    let el = document.querySelectorAll(".node")[node];
    el.style.background = "red";
    await sleep();
    el.style.background = "orange";

    for (let nei of graph[node]) {
        if (!visited.has(nei.node)) {
            await dfsHelper(nei.node, visited, result);
        }
    }
}