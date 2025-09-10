// Graph data
let nodes = [];
let edges = [];
let steps = [];
let currentStepIndex = 0;

// DOM elements
const nodeNameInput = document.getElementById("nodeName");
const addNodeBtn = document.getElementById("addNodeBtn");
const nodesList = document.getElementById("nodesList");

const fromNodeSelect = document.getElementById("fromNode");
const toNodeSelect = document.getElementById("toNode");
const weightInput = document.getElementById("weight");
const addEdgeBtn = document.getElementById("addEdgeBtn");

const startNodeSelect = document.getElementById("startNode");
const startBtn = document.getElementById("startBtn");
const nextStepBtn = document.getElementById("nextStepBtn");
const resetBtn = document.getElementById("resetBtn");
const clearBtn = document.getElementById("clearBtn");

const graphCanvas = document.getElementById("graphCanvas");
const flowStepsBox = document.getElementById("flowSteps");
const currentStepBox = document.getElementById("currentStep");
const pqBox = document.getElementById("priorityQueueBox");
const finalResultsBox = document.getElementById("finalResults");

// Add node
addNodeBtn.onclick = () => {
  const name = nodeNameInput.value.trim();
  if (name && !nodes.includes(name)) {
    nodes.push(name);
    updateUI();
  }
  nodeNameInput.value = "";
};

// Add edge
addEdgeBtn.onclick = () => {
  const from = fromNodeSelect.value;
  const to = toNodeSelect.value;
  const w = parseInt(weightInput.value);
  if (from && to && !isNaN(w)) {
    edges.push({ from, to, weight: w });
    updateUI();
  }
  weightInput.value = "";
};

// Update UI
function updateUI() {
  // Update node chips
  nodesList.innerHTML = nodes.map(n => `<span>${n}</span>`).join("");

  // Update selects
  [fromNodeSelect, toNodeSelect, startNodeSelect].forEach(sel => {
    sel.innerHTML = `<option value="">${sel.id === "startNode" ? "Select start node" : sel.id === "fromNode" ? "From" : "To"}</option>` +
      nodes.map(n => `<option value="${n}">${n}</option>`).join("");
  });

  drawGraph();
}

// Draw graph (basic circle layout)
function drawGraph() {
  graphCanvas.innerHTML = "";
  const cx = 200, cy = 200, r = 120;
  const positions = {};
  nodes.forEach((n, i) => {
    const angle = 2 * Math.PI * i / nodes.length;
    positions[n] = { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });

  // Draw edges
  edges.forEach(e => {
    const p1 = positions[e.from], p2 = positions[e.to];
    if (!p1 || !p2) return;
    graphCanvas.innerHTML += `
      <line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="#64748b" stroke-width="2"/>
      <text x="${(p1.x+p2.x)/2}" y="${(p1.y+p2.y)/2}" fill="black" font-size="12" text-anchor="middle">${e.weight}</text>
    `;
  });

  // Draw nodes
  nodes.forEach(n => {
    const p = positions[n];
    graphCanvas.innerHTML += `
      <circle cx="${p.x}" cy="${p.y}" r="20" fill="#6366f1" stroke="white" stroke-width="2"/>
      <text x="${p.x}" y="${p.y+4}" fill="white" font-size="14" text-anchor="middle">${n}</text>
    `;
  });
}

// Clear all
clearBtn.onclick = () => {
  nodes = [];
  edges = [];
  steps = [];
  updateUI();
  flowStepsBox.innerHTML = "";
  currentStepBox.innerHTML = "";
  pqBox.innerHTML = "";
  finalResultsBox.innerHTML = "";
};

// Reset algorithm
resetBtn.onclick = () => {
  currentStepIndex = 0;
  steps = [];
  nextStepBtn.disabled = true;
  currentStepBox.innerHTML = "";
  pqBox.innerHTML = "";
  finalResultsBox.innerHTML = "";
  drawGraph();
};

// Run algorithm
startBtn.onclick = () => {
  const source = startNodeSelect.value;
  if (!source) return;
  steps = runDijkstra(source);
  currentStepIndex = 0;
  showStep(steps[0]);
  nextStepBtn.disabled = false;
};

// Next step
nextStepBtn.onclick = () => {
  if (currentStepIndex < steps.length - 1) {
    currentStepIndex++;
    showStep(steps[currentStepIndex]);
  } else {
    nextStepBtn.disabled = true;
  }
};

// Dijkstra algorithm
function runDijkstra(source) {
  const graph = {};
  nodes.forEach(n => graph[n] = []);
  edges.forEach(e => {
    graph[e.from].push({ node: e.to, weight: e.weight });
    graph[e.to].push({ node: e.from, weight: e.weight });
  });

  const dist = {};
  nodes.forEach(n => dist[n] = Infinity);
  dist[source] = 0;

  const pq = [[0, source]];
  const visited = new Set();
  const steps = [];

  steps.push({ msg: `Start from ${source}`, dist: { ...dist }, pq: [...pq] });

  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, u] = pq.shift();
    if (visited.has(u)) continue;
    visited.add(u);

    steps.push({ msg: `Visiting ${u}`, dist: { ...dist }, pq: [...pq] });

    for (let { node: v, weight } of graph[u]) {
      if (!visited.has(v) && d + weight < dist[v]) {
        dist[v] = d + weight;
        pq.push([dist[v], v]);
        steps.push({ msg: `Update ${v} = ${dist[v]} via ${u}`, dist: { ...dist }, pq: [...pq] });
      }
    }
  }

  steps.push({ msg: "Algorithm complete", dist: { ...dist }, pq: [] });
  return steps;
}

// Show step
function showStep(step) {
  currentStepBox.innerHTML = step.msg;
  pqBox.innerHTML = "<b>Priority Queue:</b><br>" + step.pq.map(([d, n]) => `${n}(${d})`).join(", ");
  if (step.msg.includes("complete")) {
    finalResultsBox.innerHTML = "<b>Final Distances:</b><br>" +
      Object.entries(step.dist).map(([n, d]) => `${n}: ${d}`).join("<br>");
  }
}
