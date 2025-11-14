const scenarios = {
    'wrong-recipient': {
        title: 'Wrong Recipient Scenario',
        dominoes: [
            {
                title: 'Initial Mistake',
                description: 'Email containing salary information sent to john@company.com (internal employee) instead of john@client.com.',
                severity: 'medium',
                icon: '📧'
            },
            {
                title: 'Unintended Recipient Views',
                description: 'Wrong John opens email, sees confidential salary data for multiple employees including his colleagues.',
                severity: 'high',
                icon: '👁️'
            },
            {
                title: 'Screenshots Taken',
                description: 'Recipient takes screenshots before you can recall the email. Data now exists outside your control.',
                severity: 'high',
                icon: '📸'
            },
            {
                title: 'Information Spreads',
                description: 'Screenshots shared with other employees, causing workplace discord and potential discrimination claims.',
                severity: 'critical',
                icon: '💬'
            },
            {
                title: 'Legal Complications',
                description: 'HR investigation launched. Potential GDPR breach for unauthorized disclosure of personal data. Regulatory fines possible.',
                severity: 'critical',
                icon: '⚖️'
            }
        ],
        prevention: {
            immediate: 'Use email delay send (30-60 seconds) to catch mistakes. Enable "External Email" warnings in your client.',
            preventive: [
                'Use BCC for mass emails to hide recipient lists',
                'Enable delayed send for all emails (gives you time to catch errors)',
                'Set up address book warnings for similar-looking email addresses',
                'Use DLP (Data Loss Prevention) tools that flag sensitive content',
                'Implement email recall procedures in your organization',
                'Train staff to verify recipients before pressing send'
            ]
        }
    },
    'reply-all': {
        title: 'Reply All Gone Wrong',
        dominoes: [
            {
                title: 'Internal Discussion',
                description: 'Team discusses pricing strategy, concerns about competitor, and internal profit margins via email.',
                severity: 'low',
                icon: '💼'
            },
            {
                title: 'Reply All to External',
                description: 'Team member hits "Reply All" including external client who was CC\'d on original email.',
                severity: 'high',
                icon: '📨'
            },
            {
                title: 'Confidential Strategy Exposed',
                description: 'Client sees your pricing strategy, profit margins, and competitive concerns. Negotiating position compromised.',
                severity: 'critical',
                icon: '🔓'
            },
            {
                title: 'Deal Renegotiation',
                description: 'Client demands better terms based on revealed margins. Potential loss of hundreds of thousands in revenue.',
                severity: 'critical',
                icon: '💰'
            },
            {
                title: 'Reputation Damage',
                description: 'Client questions your professionalism. Future business relationships at risk. Word spreads in industry.',
                severity: 'high',
                icon: '📉'
            }
        ],
        prevention: {
            immediate: 'Consider disabling "Reply All" by default. Train teams to use "Reply" first, then add recipients deliberately.',
            preventive: [
                'Remove "Reply All" button from default email interface',
                'Create separate email threads for internal vs external discussions',
                'Use internal collaboration tools (Slack, Teams) instead of email for sensitive discussions',
                'Implement email banners that highlight external recipients',
                'Set up approval workflows for emails to external parties',
                'Regular training on email etiquette and data classification'
            ]
        }
    },
    'forwarded': {
        title: 'Unauthorized Forward',
        dominoes: [
            {
                title: 'Confidential Email Sent',
                description: 'CEO sends strategic acquisition plan to senior leadership team marked "Confidential - Do Not Forward".',
                severity: 'low',
                icon: '🔒'
            },
            {
                title: 'Team Member Forwards',
                description: 'One recipient forwards to their assistant for "scheduling purposes," ignoring confidentiality warning.',
                severity: 'medium',
                icon: '➡️'
            },
            {
                title: 'Multiple Forwards',
                description: 'Assistant forwards to other assistants. Email chain now includes 15+ people, many unauthorized.',
                severity: 'high',
                icon: '🔄'
            },
            {
                title: 'Leak to Competitor',
                description: 'Someone in extended chain has connection to competitor. Acquisition target learns of your interest.',
                severity: 'critical',
                icon: '🚨'
            },
            {
                title: 'Deal Collapse',
                description: 'Target company demands higher price or shops to other buyers. Multi-million dollar deal at risk or lost entirely.',
                severity: 'critical',
                icon: '💔'
            }
        ],
        prevention: {
            immediate: 'Use Information Rights Management (IRM) to prevent forwarding of sensitive emails.',
            preventive: [
                'Enable IRM (Information Rights Management) for confidential emails',
                'Use "Do Not Forward" restrictions that are technically enforced',
                'Send sensitive information via secure portals instead of email',
                'Implement email expiration for time-sensitive information',
                'Create audit trails showing who accessed what information',
                'Use watermarks with recipient names on attachments',
                'Regular audits of email forwarding patterns'
            ]
        }
    },
    'attachment': {
        title: 'Wrong Attachment Sent',
        dominoes: [
            {
                title: 'File Mix-Up',
                description: 'Intended to send "Project_Summary.pdf" but attached "All_Employees_SSN.xlsx" with same-looking filename.',
                severity: 'medium',
                icon: '📎'
            },
            {
                title: 'Personal Data Exposed',
                description: 'Excel file contains Social Security Numbers, dates of birth, and home addresses for 500+ employees.',
                severity: 'critical',
                icon: '🆔'
            },
            {
                title: 'Recipient Downloads',
                description: 'External recipient downloads file before you notice. File now on their systems, backed up to cloud.',
                severity: 'critical',
                icon: '⬇️'
            },
            {
                title: 'Regulatory Breach',
                description: 'Mandatory breach notification to all affected employees and regulators. GDPR fines up to 4% of annual revenue.',
                severity: 'critical',
                icon: '⚠️'
            },
            {
                title: 'Identity Theft Risk',
                description: 'Employees face identity theft risk. Class action lawsuit filed. Insurance claims. Reputation permanently damaged.',
                severity: 'critical',
                icon: '🚫'
            }
        ],
        prevention: {
            immediate: 'Never store sensitive personal data in files with generic names. Use encryption for all sensitive files.',
            preventive: [
                'Encrypt sensitive files with passwords (share password separately)',
                'Use descriptive filenames that make content obvious',
                'Implement file scanning that detects PII before sending',
                'Store sensitive data in secure databases, not shared files',
                'Require dual approval for emails containing sensitive attachments',
                'Use attachment preview features before sending',
                'Implement automatic file encryption for specific data types',
                'Regular data classification training for all staff'
            ]
        }
    }
};

function startDomino(scenarioType) {
    const scenario = scenarios[scenarioType];
    const dominoContainer = document.getElementById('domino-container');
    const dominoChain = document.getElementById('domino-chain');
    const preventionTips = document.getElementById('prevention-tips');
    
    // Clear previous content
    dominoChain.innerHTML = '';
    
    // Show domino container
    dominoContainer.style.display = 'block';
    preventionTips.style.display = 'none';
    
    // Scroll to visualization
    dominoContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Animate each domino piece
    scenario.dominoes.forEach((domino, index) => {
        setTimeout(() => {
            const piece = document.createElement('div');
            piece.className = 'domino-piece';
            piece.style.animationDelay = `${index * 0.1}s`;
            
            piece.innerHTML = `
                <div class="domino-number">${index + 1}</div>
                <div class="domino-content">
                    <h3>
                        <span>${domino.icon}</span>
                        ${domino.title}
                        <span class="severity-badge severity-${domino.severity}">${domino.severity}</span>
                    </h3>
                    <p>${domino.description}</p>
                </div>
            `;
            
            dominoChain.appendChild(piece);
            
            // Show prevention tips after last domino
            if (index === scenario.dominoes.length - 1) {
                setTimeout(() => {
                    showPreventionTips(scenario);
                }, 800);
            }
        }, index * 600);
    });
}

function showPreventionTips(scenario) {
    const preventionTips = document.getElementById('prevention-tips');
    const tipsContent = document.getElementById('tips-content');
    
    tipsContent.innerHTML = `
        <div class="immediate-action">
            <h4>⚡ Immediate Action You Can Take</h4>
            <p>${scenario.prevention.immediate}</p>
        </div>
        
        <div class="tip-section">
            <h3>🛡️ Prevention Best Practices</h3>
            <ul class="tips-list">
                ${scenario.prevention.preventive.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        </div>
        
        <div class="info-box">
            <strong>Remember:</strong> Most email disasters are preventable with the right tools and training. 
            Invest time in configuring your email client's security features and establishing clear protocols 
            for handling sensitive information.
        </div>
    `;
    
    preventionTips.style.display = 'block';
    preventionTips.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
