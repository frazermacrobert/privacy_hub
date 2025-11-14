const scenarios = {
    'social-post': {
        title: 'Social Media Post',
        destinations: [
            {
                country: 'USA',
                element: 'dest-us',
                reason: 'Social media platform servers',
                risk: 'medium',
                description: 'Your post is stored on servers in the US, subject to US surveillance laws and data requests from law enforcement.'
            },
            {
                country: 'Germany',
                element: 'dest-eu',
                reason: 'EU content delivery network',
                risk: 'low',
                description: 'Cached copies distributed across EU data centers for faster loading, protected by GDPR regulations.'
            },
            {
                country: 'Singapore',
                element: 'dest-asia',
                reason: 'Asian-Pacific CDN hub',
                risk: 'medium',
                description: 'Your content is replicated to serve users in Asia-Pacific regions, with different privacy frameworks than the EU.'
            }
        ],
        implications: {
            summary: 'A single social media post can be replicated across 3+ continents within seconds.',
            laws: [
                '<strong>GDPR (EU)</strong>: Gives you rights to access, rectify, and delete your data',
                '<strong>CLOUD Act (US)</strong>: Allows US authorities to request data from US companies regardless of where it\'s stored',
                '<strong>PDPA (Singapore)</strong>: Different consent and retention requirements',
                '<strong>Right to be Forgotten</strong>: May not apply equally across all jurisdictions'
            ],
            takeaway: 'Once posted, your data exists under multiple legal frameworks simultaneously, making complete removal complex.'
        }
    },
    'document': {
        title: 'Document Forwarding',
        destinations: [
            {
                country: 'USA',
                element: 'dest-us',
                reason: 'Cloud email provider',
                risk: 'high',
                description: 'Email passes through US-based servers where it may be scanned for security, advertising, or legal compliance.'
            },
            {
                country: 'Germany',
                element: 'dest-eu',
                reason: 'Recipient\'s email server',
                risk: 'medium',
                description: 'Stored on recipient\'s European email system, subject to their organization\'s retention policies.'
            },
            {
                country: 'Singapore',
                element: 'dest-asia',
                reason: 'Document scanning service',
                risk: 'high',
                description: 'Third-party security scanning and malware detection processed through Asian data centers.'
            },
            {
                country: 'Australia',
                element: 'dest-aus',
                reason: 'Backup and archival',
                risk: 'medium',
                description: 'Automated backups stored in Australian data centers for disaster recovery purposes.'
            }
        ],
        implications: {
            summary: 'Email attachments pass through an average of 4-6 international jurisdictions.',
            laws: [
                '<strong>Data Localization Laws</strong>: Some countries require certain data to be stored locally',
                '<strong>Cross-border Data Transfers</strong>: Require legal mechanisms like Standard Contractual Clauses',
                '<strong>Discovery Requests</strong>: Legal proceedings in any jurisdiction may access your document',
                '<strong>Retention Obligations</strong>: Different countries have varying requirements for how long data must be kept'
            ],
            takeaway: 'Sensitive documents should use encryption and consider data residency requirements before transmission.'
        }
    },
    'shopping': {
        title: 'Online Shopping',
        destinations: [
            {
                country: 'USA',
                element: 'dest-us',
                reason: 'Payment processor',
                risk: 'high',
                description: 'Credit card details processed through US payment gateways, subject to financial regulations and potential data breaches.'
            },
            {
                country: 'Germany',
                element: 'dest-eu',
                reason: 'Fulfillment center',
                risk: 'medium',
                description: 'Shipping address stored in EU warehouse systems for order processing and delivery tracking.'
            },
            {
                country: 'Singapore',
                element: 'dest-asia',
                reason: 'Customer analytics platform',
                risk: 'medium',
                description: 'Purchase behavior analyzed by third-party marketing platforms to build consumer profiles.'
            }
        ],
        implications: {
            summary: 'A single purchase shares your data with payment processors, retailers, shippers, and analytics firms across multiple countries.',
            laws: [
                '<strong>PCI DSS</strong>: International payment card security standards',
                '<strong>Consumer Protection Laws</strong>: Vary by country and affect your rights',
                '<strong>Marketing Consent</strong>: Different opt-in/opt-out requirements across regions',
                '<strong>Data Broker Regulations</strong>: Your shopping data may be sold to third parties where permitted'
            ],
            takeaway: 'Review privacy policies and payment options. Consider using virtual cards or privacy-focused payment methods.'
        }
    },
    'video-call': {
        title: 'Video Conference',
        destinations: [
            {
                country: 'USA',
                element: 'dest-us',
                reason: 'Video platform servers',
                risk: 'high',
                description: 'Video streams routed through US data centers, potentially recorded and transcribed without clear notification.'
            },
            {
                country: 'Germany',
                element: 'dest-eu',
                reason: 'European participant connection',
                risk: 'low',
                description: 'EU-based participants connect through local servers with GDPR protections for their data.'
            },
            {
                country: 'Singapore',
                element: 'dest-asia',
                reason: 'AI transcription service',
                risk: 'high',
                description: 'Automated transcription processed in Asia, creating searchable text records of your conversations.'
            }
        ],
        implications: {
            summary: 'Video calls can involve 3-5 jurisdictions simultaneously, with each participant\'s data subject to different laws.',
            laws: [
                '<strong>Recording Consent Laws</strong>: Requirements vary (one-party vs two-party consent)',
                '<strong>Workplace Surveillance</strong>: Different protections for employee privacy',
                '<strong>AI Processing</strong>: Transcription and analysis may occur without explicit consent',
                '<strong>Data Retention</strong>: Platforms may keep recordings longer than you expect'
            ],
            takeaway: 'Always announce recordings, review platform privacy settings, and consider end-to-end encrypted alternatives for sensitive discussions.'
        }
    }
};

function simulateSpread(scenarioType) {
    const scenario = scenarios[scenarioType];
    const mapContainer = document.getElementById('map-container');
    const journeyInfo = document.getElementById('journey-info');
    const legalImplications = document.getElementById('legal-implications');
    const destinations = document.getElementById('destinations');
    const connectionsGroup = document.getElementById('connections');
    
    // Show map container
    mapContainer.style.display = 'block';
    legalImplications.style.display = 'none';
    journeyInfo.innerHTML = '';
    connectionsGroup.innerHTML = '';
    destinations.style.display = 'block';
    
    // Scroll to map
    mapContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Animate connections and show location info
    scenario.destinations.forEach((dest, index) => {
        setTimeout(() => {
            // Draw connection line
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const destElement = document.getElementById(dest.element);
            const originX = 500;
            const originY = 200;
            const destX = parseFloat(destElement.getAttribute('cx'));
            const destY = parseFloat(destElement.getAttribute('cy'));
            
            // Create curved path
            const midX = (originX + destX) / 2;
            const midY = Math.min(originY, destY) - 50;
            const pathD = `M ${originX} ${originY} Q ${midX} ${midY} ${destX} ${destY}`;
            
            line.setAttribute('d', pathD);
            line.setAttribute('class', 'connection-line');
            line.style.animationDelay = `${index * 0.3}s`;
            connectionsGroup.appendChild(line);
            
            // Add location card
            setTimeout(() => {
                const card = document.createElement('div');
                card.className = 'location-card';
                card.innerHTML = `
                    <h4>
                        📍 ${dest.country}
                        <span class="risk-badge risk-${dest.risk}">${dest.risk.toUpperCase()} RISK</span>
                    </h4>
                    <p><strong>${dest.reason}</strong></p>
                    <p>${dest.description}</p>
                `;
                journeyInfo.appendChild(card);
                
                // Show legal implications after last destination
                if (index === scenario.destinations.length - 1) {
                    setTimeout(() => {
                        showLegalImplications(scenario);
                    }, 500);
                }
            }, 800);
            
        }, index * 1000);
    });
}

function showLegalImplications(scenario) {
    const legalImplications = document.getElementById('legal-implications');
    const implicationsContent = document.getElementById('implications-content');
    
    implicationsContent.innerHTML = `
        <div class="info-box">
            <strong>Summary:</strong> ${scenario.implications.summary}
        </div>
        
        <h3>Legal Frameworks at Play:</h3>
        <ul>
            ${scenario.implications.laws.map(law => `<li>${law}</li>`).join('')}
        </ul>
        
        <div class="warning-box">
            <strong>Key Takeaway:</strong> ${scenario.implications.takeaway}
        </div>
    `;
    
    legalImplications.style.display = 'block';
    legalImplications.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
