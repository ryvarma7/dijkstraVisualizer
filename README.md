# 🛤️ Dijkstra’s Algorithm Visualizer  

An **interactive web-based tool** to learn and visualize **Dijkstra’s shortest path algorithm**.  
This project lets you **build custom graphs**, step through the algorithm execution, and understand how shortest paths are calculated.  

---

## 📸 Preview  

> 🎥 (Add a screenshot or GIF of your app running here if possible)

---

## 🚀 Features  

- ➕ Add **nodes** and **edges** with weights  
- 🎯 Select a **start node**  
- ▶ Run Dijkstra’s Algorithm step-by-step  
- 📊 Live updates of:  
  - Current step description  
  - Priority queue  
  - Shortest distances  
- 🖼 Graph visualization with nodes, edges & weights  
- 🔄 Reset or clear the graph anytime  

---

## 📖 How to Use  

1. **Add Nodes**  
   - Type a node name (e.g., `A`, `B`, `C`) and click `+`.  

2. **Add Edges**  
   - Select two nodes (`From` and `To`).  
   - Enter a weight (positive number).  
   - Click `Add Edge`.  

3. **Choose Start Node**  
   - Select which node to start the algorithm from.  

4. **Run Algorithm**  
   - Click `▶ Start Algorithm`.  
   - Click `Next Step` to go through the algorithm execution.  

5. **Reset or Clear**  
   - `⟳ Reset` → Restart the algorithm with the same graph.  
   - `🗑 Clear All` → Remove all nodes & edges.  

---

## 🧠 How Dijkstra’s Algorithm Works  

1. **Initialization**  
   - Set all node distances = `Infinity`.  
   - Distance of start node = `0`.  
   - Add start node to **priority queue**.  

2. **Visit Nodes**  
   - Pick the node with the **smallest distance** from the queue.  
   - Mark it as **visited**.  

3. **Relax Edges**  
   - For each neighbor, check if going through the current node gives a **shorter path**.  
   - If yes → update distance and push neighbor into queue.  

4. **Repeat** until all nodes are visited or queue is empty.  

5. **Result** → Shortest path cost from the start node to every other node.  

---

## 📊 Example Run  

Graph:  
