const scenarios = {
    email: {
        nodes: [
            { name: 'You', x: 400, y: 250 },
            { name: 'Email Server', x: 550, y: 150 },
            { name: 'Recipient', x: 650, y: 200 },
            { name: 'Cloud Backup', x: 600, y: 300 },
            { name: 'Search Index', x: 500, y: 350 },
            { name: 'Mobile Sync', x: 650, y: 350 },
            { name: 'Third-party Scanner', x: 550, y: 450 },
            { name: 'Analytics Service', x: 700, y: 280 },
            { name: 'Foreign Server (EU)', x: 750, y: 180 }
        ],
        copies: 8,
        jurisdictions: 3,
        tips: [
            'Use end-to-end encrypted email services when handling sensitive information',
            'Review email retention policies regularly and delete old messages',
            'Disable automatic cloud backups for confidential communications',
            'Be mindful of recipients\' email security practices and policies',
            'Consider using secure file-sharing platforms instead of email attachments'
        ]
    },
    document: {
        nodes: [
            { name: 'You', x: 400, y: 250 },
            { name: 'Cloud Storage', x: 550, y: 200 },
            { name: 'Collaboration Platform', x: 650, y: 250 },
            { name: 'Version History', x: 550, y: 350 },
            { name: 'Download Cache', x: 700, y: 180 },
            { name: 'Search Indexer', x: 500, y: 400 },
            { name: 'Backup System', x: 650, y: 380 },
            { name: 'Document Processor', x: 750, y: 280 },
            { name: 'CDN (Global)', x: 600, y: 120 },
            { name: 'Preview Generator', x: 480, y: 150 }
        ],
        copies: 10,
        jurisdictions: 4,
        tips: [
            'Disable version history for sensitive documents to limit data retention',
            'Use document expiration features when available',
            'Review sharing permissions before uploading to cloud platforms',
            'Consider data residency requirements for your jurisdiction',
            'Use local encryption before uploading sensitive files'
        ]
    },
    photo: {
        nodes: [
            { name: 'You', x: 400, y: 250 },
            { name: 'Photo App', x: 520, y: 200 },
            { name: 'Cloud Photos', x: 620, y: 220 },
            { name: 'Social Media', x: 680, y: 300 },
            { name: 'Facial Recognition', x: 580, y: 380 },
            { name: 'Location Database', x: 700, y: 180 },
            { name: 'Image Search', x: 500, y: 350 },
            { name: 'Metadata Extractor', x: 450, y: 180 },
            { name: 'CDN Cache', x: 750, y: 250 }
        ],
        copies: 9,
        jurisdictions: 5,
        tips: [
            'Strip metadata (EXIF data) before uploading photos online',
            'Disable location services for camera apps unless absolutely necessary',
            'Review photo sharing settings on all platforms',
            'Be aware that facial recognition may tag you across platforms',
            'Consider the long-term implications of photos shared publicly'
        ]
    },
    meeting: {
        nodes: [
            { name: 'You', x: 400, y: 250 },
            { name: 'Calendar Service', x: 550, y: 200 },
            { name: 'Video Platform', x: 650, y: 250 },
            { name: 'Recording Storage', x: 580, y: 350 },
            { name: 'Transcription AI', x: 500, y: 380 },
            { name: 'Attendee Devices', x: 700, y: 180 },
            { name: 'Cloud Sync', x: 450, y: 180 },
            { name: 'Analytics Dashboard', x: 750, y: 300 }
        ],
        copies: 8,
        jurisdictions: 3,
        tips: [
            'Disable automatic meeting recordings by default',
            'Review participant list before discussing sensitive matters',
            'Use waiting rooms to control meeting access',
            'Be aware that transcription services may process conversations',
            'Review data processing agreements with video conferencing providers'
        ]
    }
};

let animationFrame;

function startVisualization(type) {
    const scenario = scenarios[type];
    const vizContainer = document.getElementById('visualization');
    const canvas = document.getElementById('networkCanvas');
    const ctx = canvas.getContext('2d');
    const resultsPanel = document.getElementById('results');
    const tipsCard = document.getElementById('tips');
    
    // Show visualization container
    vizContainer.style.display = 'block';
    tipsCard.style.display = 'none';
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 500;
    
    // Scroll to visualization
    vizContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Animation variables
    let animationProgress = 0;
    const animationDuration = 2500;
    const startTime = Date.now();
    
    // Clear any existing animation
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
    }
    
    function animate() {
        const elapsed = Date.now() - startTime;
        animationProgress = Math.min(elapsed / animationDuration, 1);
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const visibleNodes = Math.floor(animationProgress * scenario.nodes.length);
        
        // Draw connections with animation
        ctx.strokeStyle = 'rgba(179, 211, 52, 0.4)';
        ctx.lineWidth = 2;
        for (let i = 1; i < visibleNodes; i++) {
            const progress = (animationProgress * scenario.nodes.length - i) / 1;
            if (progress > 0) {
                ctx.globalAlpha = Math.min(progress, 1);
                ctx.beginPath();
                ctx.moveTo(scenario.nodes[0].x, scenario.nodes[0].y);
                ctx.lineTo(scenario.nodes[i].x, scenario.nodes[i].y);
                ctx.stroke();
            }
        }
        ctx.globalAlpha = 1;
        
        // Draw nodes
        scenario.nodes.slice(0, visibleNodes).forEach((node, i) => {
            const isSource = i === 0;
            
            // Node circle
            ctx.fillStyle = isSource ? '#B3D334' : '#2c2c2c';
            ctx.beginPath();
            ctx.arc(node.x, node.y, isSource ? 25 : 15, 0, Math.PI * 2);
            ctx.fill();
            
            // White center for source
            if (isSource) {
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(node.x, node.y, 10, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Node label
            ctx.fillStyle = '#2c2c2c';
            ctx.font = isSource ? 'bold 14px sans-serif' : '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(node.name, node.x, node.y + (isSource ? 45 : 35));
        });
        
        // Continue animation or show results
        if (animationProgress < 1) {
            animationFrame = requestAnimationFrame(animate);
        } else {
            showResults(scenario, type);
        }
    }
    
    // Clear results first
    resultsPanel.innerHTML = '';
    
    // Start animation
    animate();
}

function showResults(scenario, type) {
    const resultsPanel = document.getElementById('results');
    
    resultsPanel.innerHTML = `
        <h3>📊 Data Ripple Effect</h3>
        <p><strong>${scenario.copies} copies</strong> of your data created across systems</p>
        <p><strong>${scenario.jurisdictions} jurisdictions</strong> reached, each with different privacy laws</p>
        <p style="margin-top: 1rem; color: var(--hl-gray);">
            Each copy represents a potential point of access, storage, and regulatory oversight.
        </p>
        <button class="button" onclick="showTips('${type}')" style="margin-top: 1rem;">
            💡 Shrink My Footprint
        </button>
    `;
}

function showTips(type) {
    const scenario = scenarios[type];
    const tipsCard = document.getElementById('tips');
    const tipsList = document.getElementById('tipsList');
    
    tipsList.innerHTML = scenario.tips.map(tip => `<li>${tip}</li>`).join('');
    tipsCard.style.display = 'block';
    tipsCard.scrollIntoView({ behavior: 'smooth' });
}
