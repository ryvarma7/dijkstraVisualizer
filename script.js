* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f0f23 100%);
    min-height: 100vh;
    color: #ffffff;
    overflow-x: auto;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
}

.main-title {
    font-size: 3rem;
    font-weight: 800;
    text-align: center;
    margin-bottom: 2rem;
    background: linear-gradient(45deg, #8b5cf6, #06b6d4, #10b981);
    background-size: 400% 400%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient 3s ease infinite;
    text-shadow: 0 0 30px rgba(139, 92, 246, 0.3);
}

@keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.grid-container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 1.5rem;
    align-items: start;
}

.panel {
    background: rgba(15, 15, 35, 0.8);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
}

.panel:hover {
    border-color: rgba(139, 92, 246, 0.4);
    box-shadow: 
        0 12px 40px rgba(0, 0, 0, 0.4),
        0 0 20px rgba(139, 92, 246, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
}

.panel-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #8b5cf6;
    text-align: center;
}

.section {
    margin-bottom: 1.5rem;
}

.section-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #e2e8f0;
}

.section-title.small {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}

.input-group {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
}

.input-field, .select-field {
    flex: 1;
    padding: 0.75rem;
    background: rgba(30, 30, 60, 0.6);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 8px;
    color: #ffffff;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.input-field:focus, .select-field:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
    background: rgba(30, 30, 60, 0.8);
}

.input-field::placeholder {
    color: rgba(255, 255, 255, 0.5);
}

.select-field option {
    background: #1a1a2e;
    color: #ffffff;
}

.edge-inputs {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
}

.btn {
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.btn:active {
    transform: translateY(0);
}

.btn-primary {
    background: linear-gradient(135deg, #3b82f6, #1e40af);
    color: white;
}

.btn-primary:hover {
    background: linear-gradient(135deg, #2563eb, #1e3a8a);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
}

.btn-success {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    width: 100%;
}

.btn-success:hover {
    background: linear-gradient(135deg, #059669, #047857);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
}

.btn-purple {
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    color: white;
    width: 100%;
}

.btn-purple:hover {
    background: linear-gradient(135deg, #7c3aed, #6d28d9);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
}

.btn-secondary {
    background: linear-gradient(135deg, #64748b, #475569);
    color: white;
    width: 100%;
}

.btn-secondary:hover {
    background: linear-gradient(135deg, #475569, #334155);
    box-shadow: 0 8px 25px rgba(100, 116, 139, 0.4);
}

.btn-danger {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
    width: 100%;
}

.btn-danger:hover {
    background: linear-gradient(135deg, #dc2626, #b91c1c);
    box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4);
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
}

.controls {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.nodes-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.node-tag {
    padding: 0.25rem 0.75rem;
    background: linear-gradient(135deg, #3b82f6, #1e40af);
    color: white;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
}

.visualization-panel {
    min-height: 500px;
}

.svg-container {
    background: rgba(30, 30, 60, 0.3);
    border-radius: 12px;
    padding: 1rem;
    border: 1px solid rgba(139, 92, 246, 0.2);
    margin-bottom: 1rem;
}

.legend {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    text-align: center;
}

.legend-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.legend-color {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.3);
}

.legend-color.unvisited {
    background: #6366f1;
}

.legend-color.current {
    background: #f59e0b;
}

.legend-color.visited {
    background: #10b981;
}

.legend span {
    font-size: 0.8rem;
    color: #e2e8f0;
}

.flow-steps {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.flow-step {
    padding: 0.5rem;
    border-radius: 6px;
    font-size: 0.75rem;
    transition: all 0.3s ease;
    border: 1px solid transparent;
}

.flow-step.active {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.2));
    border-color: rgba(16, 185, 129, 0.4);
    color: #10b981;
    box-shadow: 0 0 10px rgba(16, 185, 129, 0.2);
}

.flow-step:not(.active) {
    background: rgba(100, 116, 139, 0.2);
    color: #94a3b8;
}

.calculation-details, .current-step-info, .priority-queue, .final-results {
    margin-bottom: 1rem;
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid;
}

.calculation-details {
    background: rgba(59, 130, 246, 0.1);
    border-color: rgba(59, 130, 246, 0.3);
}

.current-step-info {
    background: rgba(16, 185, 129, 0.1);
    border-color: rgba(16, 185, 129, 0.3);
}

.priority-queue {
    background: rgba(245, 158, 11, 0.1);
    border-color: rgba(245, 158, 11, 0.3);
}

.final-results {
    background: rgba(139, 92, 246, 0.1);
    border-color: rgba(139, 92, 246, 0.3);
}

.calculation-content, .priority-queue-content, .final-results-content {
    font-size: 0.75rem;
    line-height: 1.4;
}

.queue-item, .result-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem 0.5rem;
    margin: 0.25rem 0;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    font-family: monospace;
}

/* Responsive Design */
@media (max-width: 1200px) {
    .grid-container {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .main-title {
        font-size: 2.5rem;
    }
}

@media (max-width: 768px) {
    .container {
        padding: 1rem;
    }
    
    .main-title {
        font-size: 2rem;
    }
    
    .edge-inputs {
        grid-template-columns: 1fr;
    }
    
    .legend {
        grid-template-columns: 1fr;
        gap: 0.5rem;
    }
    
    .legend-item {
        flex-direction: row;
        justify-content: center;
    }
}
