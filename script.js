class DijkstraVisualizer {
    constructor() {
        this.nodes = [];
        this.edges = [];
        this.distances = {};
        this.currentNode = null;
        this.visitedNodes = new Set();
        this.running = false;
        this.step = 0;
        this.algorithm = [];
        this.priorityQueue = [];
        this.currentStep = "";
        
        this.flowSteps = [
            { id: 1, text: "Initialize all distances to ∞" },
            { id: 2, text: "Set source distance to 0" },
            { id: 3, text: "Add source to priority queue" },
            { id: 4, text: "While queue is not empty:" },
            { id: 5, text: "Extract node with min distance" },
            { id: 6, text: "Mark node as visited" },
            { id: 7, text: "Update neighbors' distances" },
            { id: 8, text: "Add unvisited neighbors to queue" },
            { id: 9, text: "Algorithm complete!" }
        ];
        
        this.activeFlowSteps = new Set();
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.renderFlowSteps();
    }
    
    bindEvents() {
        // Node input
        document.getElementById('nodeInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.addNode();
        });
        document.getElementById('addNodeBtn').addEventListener('click', () => this.addNode());
        
        // Edge input
        document.getElementById('addEdgeBtn').addEventListener('click', () => this.addEdge());
        
        // Controls
        document.getElementById('startBtn').addEventListener('click', () => this.startVisualization());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextStep());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearAll());
    }
    
    addNode() {
        const input = document.getElementById('nodeInput');
        const nodeName = input.value.trim();
        
        if (nodeName && !this.nodes.includes(nodeName)) {
            this.nodes.push(nodeName);
            input.value = '';
            this.updateNodeSelects();
            this.renderNodes();
            this.renderGraph();
        }
    }
    
    addEdge() {
        const fromNode = document.getElementById('fromNode').value;
        const toNode = document.getElementById('toNode').value;
        const weight = document.getElementById('weightInput').value;
        
        if (fromNode && toNode && weight && !isNaN(weight)) {
            const newEdge = { from: fromNode, to: toNode, weight: parseInt(weight) };
            this.edges.push(newEdge);
            
            // Clear inputs
            document.getElementById('fromNode').value = '';
            document.getElementById('toNode').value = '';
            document.getElementById('weightInput').value = '';
            
            this.renderGraph();
        }
    }
    
    updateNodeSelects() {
        const selects = ['fromNode', 'toNode', 'startNode'];
        selects.forEach(selectId => {
            const select = document.getElementById(selectId);
            const currentValue = select.value;
            
            // Clear existing options except the first one
            while (select.children.length > 1) {
                select.removeChild(select.lastChild);
            }
            
            // Add node options
            this.nodes.forEach(node => {
                const option = document.createElement('option');
                option.value = node;
                option.textContent = node;
                select.appendChild(option);
            });
            
            // Restore previous value if it still exists
            if (this.nodes.includes(currentValue)) {
                select.value = currentValue;
            }
        });
    }
    
    renderNodes() {
        const nodesList = document.getElementById('nodesList');
        nodesList.innerHTML = '';
        
        this.nodes.forEach(node => {
            const nodeTag = document.createElement('span');
            nodeTag.className = 'node-tag';
            nodeTag.textContent = node;
            nodesList.appendChild(nodeTag);
        });
    }
    
    generateNodePositions() {
        const positions = {};
        const centerX = 200;
        const centerY = 200;
        const radius = 120;
        
        this.nodes.forEach((node, index) => {
            const angle = (2 * Math.PI * index) / this.nodes.length;
            positions[node] = {
                x: centerX + radius * Math.cos(angle),
                y: centerY + radius * Math.sin(angle)
            };
        });
        
        return positions;
    }
    
    getNodeColor(node) {
        if (this.visitedNodes.has(node)) return "#10b981";
        if (this.currentNode === node) return "#f59e0b";
        return "#6366f1";
    }
    
    getEdgeColor(from, to) {
        if (this.visitedNodes.has(from) && this.visitedNodes.has(to)) return "#10b981";
        if (this.currentNode === from || this.currentNode === to) return "#f59e0b";
        return "#64748b";
    }
    
    renderGraph() {
        const svg = document.getElementById('graphSvg');
        svg.innerHTML = '';
        
        if (this.nodes.length === 0) return;
        
        const nodePositions = this.generateNodePositions();
        
        // Draw edges
        this.edges.forEach((edge, index) => {
            const fromPos = nodePositions[edge.from];
            const toPos = nodePositions[edge.to];
            
            if (!fromPos || !toPos) return;
            
            const midX = (fromPos.x + toPos.x) / 2;
            const midY = (fromPos.y + toPos.y) / 2;
            
            // Edge line
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', fromPos.x);
            line.setAttribute('y1', fromPos.y);
            line.setAttribute('x2', toPos.x);
            line.setAttribute('y2', toPos.y);
            line.setAttribute('stroke', this.getEdgeColor(edge.from, edge.to));
            line.setAttribute('stroke-width', '3');
            line.setAttribute('opacity', '0.8');
            svg.appendChild(line);
            
            // Weight circle
            const weightCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            weightCircle.setAttribute('cx', midX);
            weightCircle.setAttribute('cy', midY);
            weightCircle.setAttribute('r', '15');
            weightCircle.setAttribute('fill', 'rgba(15, 15, 35, 0.9)');
            weightCircle.setAttribute('stroke', this.getEdgeColor(edge.from, edge.to));
            weightCircle.setAttribute('stroke-width', '2');
            svg.appendChild(weightCircle);
            
            // Weight text
            const weightText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            weightText.setAttribute('x', midX);
            weightText.setAttribute('y', midY + 5);
            weightText.setAttribute('text-anchor', 'middle');
            weightText.setAttribute('fill', '#ffffff');
            weightText.setAttribute('font-size', '12');
            weightText.setAttribute('font-weight', 'bold');
            weightText.textContent = edge.weight;
            svg.appendChild(weightText);
        });
        
        // Draw nodes
        this.nodes.forEach(node => {
            const pos = nodePositions[node];
            if (!pos) return;
            
            // Node circle
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', pos.x);
            circle.setAttribute('cy', pos.y);
            circle.setAttribute('r', '30');
            circle.setAttribute('fill', this.getNodeColor(node));
            circle.setAttribute('stroke', 'rgba(255, 255, 255, 0.3)');
            circle.setAttribute('stroke-width', '3');
            circle.style.transition = 'all 0.3s ease';
            circle.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))';
            svg.appendChild(circle);
            
            // Node label
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', pos.x);
            label.setAttribute('y', pos.y - 45);
            label.setAttribute('text-anchor', 'middle');
            label.setAttribute('fill', '#ffffff');
            label.setAttribute('font-size', '16');
            label.setAttribute('font-weight', 'bold');
            label.textContent = node;
            svg.appendChild(label);
            
            // Distance text
            const distanceText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            distanceText.setAttribute('x', pos.x);
            distanceText.setAttribute('y', pos.y + 6);
            distanceText.setAttribute('text-anchor', 'middle');
            distanceText.setAttribute('fill', '#ffffff');
            distanceText.setAttribute('font-size', '12');
            distanceText.setAttribute('font-weight', 'bold');
            
            const distance = this.distances[node];
            distanceText.textContent = distance !== undefined ? 
                (distance === Infinity ? "∞" : distance) : "∞";
            svg.appendChild(distanceText);
        });
    }
    
    renderFlowSteps() {
        const flowStepsContainer = document.getElementById('flowSteps');
        flowStepsContainer.innerHTML = '';
        
        this.flowSteps.slice(0, 5).forEach(step => {
            const stepDiv = document.createElement('div');
            stepDiv.className = `flow-step ${this.activeFlowSteps.has(step.id) ? 'active' : ''}`;
            stepDiv.innerHTML = `<strong>${step.id}.</strong> ${step.text}`;
            flowStepsContainer.appendChild(stepDiv);
        });
    }
    
    createAdjacencyList() {
        const graph = {};
        this.nodes.forEach(node => {
            graph[node] = [];
        });
        
        this.edges.forEach(edge => {
            graph[edge.from].push({ node: edge.to, weight: edge.weight });
            graph[edge.to].push({ node: edge.from, weight: edge.weight });
        });
        
        return graph;
    }
    
    generateDijkstraSteps(source) {
        const graph = this.createAdjacencyList();
        const dist = {};
        const steps = [];
        const pq = [];
        const visited = new Set();
        
        // Initialize
        this.nodes.forEach(node => {
            dist[node] = Infinity;
        });
        dist[source] = 0;
        pq.push([0, source]);
        
        steps.push({
            type: "initialize",
            distances: { ...dist },
            current: null,
            visited: new Set(),
            priorityQueue: [[0, source]],
            message: `Initialized all distances. Source ${source} = 0, others = ∞`,
            flowSteps: new Set([1, 2, 3])
        });
        
        while (pq.length > 0) {
            pq.sort((a, b) => a[0] - b[0]);
            const [currentDist, currentNode] = pq.shift();
            
            if (visited.has(currentNode)) continue;
            
            visited.add(currentNode);
            
            steps.push({
                type: "visit",
                distances: { ...dist },
                current: currentNode,
                visited: new Set(visited),
                priorityQueue: [...pq],
                message: `Visiting node ${currentNode} with distance ${currentDist}`,
                flowSteps: new Set([4, 5, 6])
            });
            
            // Check all neighbors
            for (const neighbor of graph[currentNode]) {
                const neighborNode = neighbor.node;
                const edgeWeight = neighbor.weight;
                const newDist = dist[currentNode] + edgeWeight;
                
                if (newDist < dist[neighborNode]) {
                    dist[neighborNode] = newDist;
                    pq.push([newDist, neighborNode]);
                    
                    steps.push({
                        type: "update",
                        distances: { ...dist },
                        current: currentNode,
                        visited: new Set(visited),
                        priorityQueue: [...pq],
                        message: `Updated distance to ${neighborNode}: ${newDist} (via ${currentNode})`,
                        calculation: `${dist[currentNode]} + ${edgeWeight} = ${newDist} < ${dist[neighborNode] === newDist ? 'previous' : dist[neighborNode]}`,
                        flowSteps: new Set([7, 8])
                    });
                }
            }
        }
        
        steps.push({
            type: "complete",
            distances: { ...dist },
            current: null,
            visited: new Set(visited),
            priorityQueue: [],
            message: "Algorithm complete! All shortest distances found.",
            flowSteps: new Set([9])
        });
        
        return steps;
    }
    
    startVisualization() {
        const startNode = document.getElementById('startNode').value;
        if (!startNode) {
            alert('Please select a start node');
            return;
        }
        
        if (this.nodes.length === 0) {
            alert('Please add some nodes first');
            return;
        }
        
        this.running = true;
        this.step = 0;
        this.algorithm = this.generateDijkstraSteps(startNode);
        this.visitedNodes.clear();
        this.currentNode = null;
        
        // Initialize distances
        this.nodes.forEach(node => {
            this.distances[node] = Infinity;
        });
        this.distances[startNode] = 0;
        
        // Show/hide controls
        document.getElementById('startBtn').style.display = 'none';
        document.getElementById('nextBtn').style.display = 'block';
        document.getElementById('resetBtn').style.display = 'block';
        
        // Show algorithm info sections
        document.getElementById('currentStepInfo').style.display = 'block';
        document.getElementById('priorityQueue').style.display = 'block';
        
        this.renderGraph();
        this.updateAlgorithmInfo();
    }
    
    nextStep() {
        if (this.step >= this.algorithm.length) {
            this.completeVisualization();
            return;
        }
        
        const currentStep = this.algorithm[this.step];
        
        // Update visualization state
        this.distances = { ...currentStep.distances };
        this.currentNode = currentStep.current;
        this.visitedNodes = new Set(currentStep.visited);
        this.activeFlowSteps = new Set(currentStep.flowSteps);
        this.priorityQueue = [...currentStep.priorityQueue];
        
        // Update displays
        this.renderGraph();
        this.renderFlowSteps();
        this.updateAlgorithmInfo(currentStep);
        
        this.step++;
        document.getElementById('stepCounter').textContent = `(${this.step}/${this.algorithm.length})`;
        
        if (this.step >= this.algorithm.length) {
            document.getElementById('nextBtn').textContent = 'Complete';
        }
    }
    
    updateAlgorithmInfo(stepData = null) {
        if (!stepData) return;
        
        // Update current step info
        document.getElementById('currentStepText').textContent = stepData.message;
        
        // Update calculation details if available
        if (stepData.calculation) {
            document.getElementById('calculationDetails').style.display = 'block';
            document.getElementById('calculationContent').textContent = stepData.calculation;
        } else {
            document.getElementById('calculationDetails').style.display = 'none';
        }
        
        // Update priority queue
        const queueContent = document.getElementById('priorityQueueContent');
        queueContent.innerHTML = '';
        
        if (this.priorityQueue.length > 0) {
            this.priorityQueue
                .sort((a, b) => a[0] - b[0])
                .forEach(([dist, node]) => {
                    const queueItem = document.createElement('div');
                    queueItem.className = 'queue-item';
                    queueItem.innerHTML = `<span>${node}</span><span>${dist}</span>`;
                    queueContent.appendChild(queueItem);
                });
        } else {
            queueContent.innerHTML = '<div class="queue-item">Empty</div>';
        }
    }
    
    completeVisualization() {
        this.running = false;
        
        // Show final results
        document.getElementById('finalResults').style.display = 'block';
        const resultsContent = document.getElementById('finalResultsContent');
        resultsContent.innerHTML = '';
        
        Object.entries(this.distances).forEach(([node, distance]) => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `<span>${node}</span><span>${distance === Infinity ? '∞' : distance}</span>`;
            resultsContent.appendChild(resultItem);
        });
        
        // Hide next button
        document.getElementById('nextBtn').style.display = 'none';
        
        // Update flow steps to show completion
        this.activeFlowSteps = new Set([9]);
        this.renderFlowSteps();
    }
    
    reset() {
        this.running = false;
        this.step = 0;
        this.algorithm = [];
        this.visitedNodes.clear();
        this.currentNode = null;
        this.activeFlowSteps.clear();
        
        // Reset distances
        this.nodes.forEach(node => {
            this.distances[node] = Infinity;
        });
        
        // Show/hide controls
        document.getElementById('startBtn').style.display = 'block';
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('resetBtn').style.display = 'none';
        document.getElementById('nextBtn').textContent = 'Next Step';
        
        // Hide algorithm info sections
        document.getElementById('currentStepInfo').style.display = 'none';
        document.getElementById('calculationDetails').style.display = 'none';
        document.getElementById('priorityQueue').style.display = 'none';
        document.getElementById('finalResults').style.display = 'none';
        
        this.renderGraph();
        this.renderFlowSteps();
    }
    
    clearAll() {
        this.reset();
        this.nodes = [];
        this.edges = [];
        this.distances = {};
        
        // Clear all inputs and selects
        document.getElementById('nodeInput').value = '';
        document.getElementById('weightInput').value = '';
        
        // Clear select options
        ['fromNode', 'toNode', 'startNode'].forEach(selectId => {
            const select = document.getElementById(selectId);
            while (select.children.length > 1) {
                select.removeChild(select.lastChild);
            }
        });
        
        this.renderNodes();
        this.renderGraph();
    }
}

// Initialize the visualizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new DijkstraVisualizer();
});
