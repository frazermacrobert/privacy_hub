// Config for each scenario: title, timeline stages and prevention tips
const leakScenarios = {
    'cloud-misconfiguration': {
        title: 'Cloud misconfiguration: public link left open',
        stages: [
            {
                label: 'Uploaded',
                description: 'A file containing personal data is uploaded to a shared cloud workspace.'
            },
            {
                label: 'Synced',
                description: 'The workspace syncs copies across multiple regions and backup locations.'
            },
            {
                label: 'Indexed',
                description: 'Search indexing makes the document easily discoverable inside the platform.'
            },
            {
                label: 'Shared wider than intended',
                description: 'A “share with link” setting is used, and the link circulates far beyond the original audience.'
            },
            {
                label: 'Misused',
                description: 'Someone outside the intended group downloads or copies the data, creating a potential incident.'
            }
        ],
        prevention: {
            intro: 'Cloud tools are powerful, but configuration choices can silently widen your audience.',
            tips: [
                'Use named, access-controlled groups instead of public or “anyone with the link” sharing.',
                'Review default sharing settings on workspaces before uploading sensitive content.',
                'Regularly audit who has access to shared folders containing personal data.',
                'Close down links and access once collaboration on a document is complete.'
            ],
            note: 'The earlier a misconfiguration is spotted and corrected, the shorter and less severe the timeline.'
        }
    },
    'lost-device': {
        title: 'Lost device: unlocked phone in the wild',
        stages: [
            {
                label: 'Device used',
                description: 'Work email and documents are accessed on a personal or corporate mobile device.'
            },
            {
                label: 'Lost',
                description: 'The device is left in a public place, such as a taxi or café.'
            },
            {
                label: 'Access opportunity',
                description: 'Because the device is not properly locked, whoever finds it can open apps and messages.'
            },
            {
                label: 'Data extracted',
                description: 'Emails, attachments and contacts are viewed, forwarded or screenshotted.'
            },
            {
                label: 'Incident',
                description: 'The loss is discovered later, and investigation must assume that data could have been accessed.'
            }
        ],
        prevention: {
            intro: 'Strong device controls turn a lost phone into an inconvenience, not a data breach.',
            tips: [
                'Enable full device lock (PIN, biometrics) and automatic screen lock timeouts.',
                'Use approved apps with remote wipe and device management capabilities where available.',
                'Avoid storing sensitive files locally on devices unless there is a clear need.',
                'Report lost or stolen devices immediately so security actions can be taken.'
            ],
            note: 'Quick reporting dramatically limits how far this kind of timeline can progress.'
        }
    },
    'phishing-click': {
        title: 'Phishing click: one link, many consequences',
        stages: [
            {
                label: 'Suspicious email received',
                description: 'A realistic-looking email arrives, urging quick action on an account or invoice.'
            },
            {
                label: 'Link clicked',
                description: 'The link is opened, taking the user to a spoofed login or malware-hosting site.'
            },
            {
                label: 'Credentials or access taken',
                description: 'Login details are harvested or malicious code runs in the background.'
            },
            {
                label: 'Lateral movement',
                description: 'The attacker uses access to explore mailboxes, shared drives or internal systems.'
            },
            {
                label: 'Data accessed / exfiltrated',
                description: 'Personal and confidential data may be viewed, copied or removed from the environment.'
            }
        ],
        prevention: {
            intro: 'Most phishing timelines can be stopped at step one with a healthy dose of suspicion.',
            tips: [
                'Pause and inspect sender details, links and tone before clicking on unexpected messages.',
                'Use official channels to verify requests for payment, credentials or urgent action.',
                'Report suspicious emails using the organisation’s reporting tools instead of deleting them quietly.',
                'Keep devices and browsers updated so technical controls can block known threats.'
            ],
            note: 'Even if you do click, reporting quickly helps contain and investigate the issue.'
        }
    },
    'weak-password': {
        title: 'Weak password: easy to guess, hard to unwind',
        stages: [
            {
                label: 'Simple password created',
                description: 'A short, reused or easily guessed password is set for an important account.'
            },
            {
                label: 'Credential found or guessed',
                description: 'Attackers obtain the password from another breach or by automated guessing.'
            },
            {
                label: 'Account accessed',
                description: 'The account is accessed without detection, often outside normal working hours.'
            },
            {
                label: 'Data explored',
                description: 'Mailboxes, files and connected apps are browsed and copied over time.'
            },
            {
                label: 'Broader compromise',
                description: 'Access is used to pivot into other systems or impersonate the account owner.'
            }
        ],
        prevention: {
            intro: 'Strong passwords and additional factors stop this timeline before it starts.',
            tips: [
                'Use long, unique passphrases rather than short, complex-looking passwords.',
                'Turn on multi-factor authentication (MFA) wherever it is offered.',
                'Avoid reusing work passwords on personal sites or services.',
                'Update passwords promptly if you suspect any account compromise.'
            ],
            note: 'Password managers make it realistic to maintain unique, strong credentials.'
        }
    }
};

// DOM references
const timelineContainer = document.getElementById('timeline-container');
const timelineEl = document.getElementById('timeline');
const scenarioTitleEl = document.getElementById('scenario-title');
const startButton = document.getElementById('start-button');
const preventionCard = document.getElementById('prevention-card');
const preventionContent = document.getElementById('prevention-content');

let currentScenarioKey = null;
let currentStepIndex = -1;
let revealTimer = null;
let isPlaying = false;

/**
 * Build the timeline for the selected scenario and show the timeline card.
 */
function startTimeline(key) {
    const scenario = leakScenarios[key];
    if (!scenario || !timelineEl || !timelineContainer) {
        return;
    }

    currentScenarioKey = key;
    currentStepIndex = -1;
    isPlaying = false;

    // Reset any running timer
    if (revealTimer) {
        clearTimeout(revealTimer);
        revealTimer = null;
    }

    // Update title
    if (scenarioTitleEl) {
        scenarioTitleEl.textContent = scenario.title;
    }

    // Build timeline steps
    const stepsHtml = scenario.stages
        .map((stage, index) => {
            return `
                <div class="timeline-step" data-step="${index}">
                    <div class="step-marker">${index + 1}</div>
                    <div class="step-body">
                        <h3>${stage.label}</h3>
                        <p>${stage.description}</p>
                    </div>
                </div>
            `;
        })
        .join('');

    timelineEl.innerHTML = stepsHtml;

    // Show the timeline card, hide prevention for now
    timelineContainer.style.display = 'block';
    if (preventionCard) {
        preventionCard.style.display = 'none';
    }
    if (preventionContent) {
        preventionContent.innerHTML = '';
    }

    // Reset button state
    if (startButton) {
        startButton.disabled = false;
        startButton.textContent = '▶️ Start Timeline';
    }

    // Scroll timeline into view
    timelineContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Animate the timeline from the start, revealing one step at a time.
 */
function playTimeline() {
    if (!currentScenarioKey || !timelineEl || isPlaying) {
        return;
    }

    const steps = Array.from(timelineEl.querySelectorAll('.timeline-step'));
    if (!steps.length) {
        return;
    }

    // Reset steps visual state
    steps.forEach(step => {
        step.classList.remove('active');
    });

    currentStepIndex = -1;
    isPlaying = true;

    if (startButton) {
        startButton.disabled = true;
        startButton.textContent = 'Playing...';
    }

    // Start from the first step
    revealNextStep();
}

/**
 * Reveal the next step in the timeline, and at the end show prevention tips.
 */
function revealNextStep() {
    if (!timelineEl) return;

    const steps = Array.from(timelineEl.querySelectorAll('.timeline-step'));
    if (!steps.length) return;

    currentStepIndex += 1;

    if (currentStepIndex < steps.length) {
        const step = steps[currentStepIndex];
        step.classList.add('active');

        // Keep the current step in view for horizontal scroll
        step.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

        // Queue next step
        revealTimer = setTimeout(revealNextStep, 1400);
    } else {
        // Finished
        isPlaying = false;
        if (startButton) {
            startButton.disabled = false;
            startButton.textContent = 'Replay timeline';
        }
        showPrevention();
    }
}

/**
 * Show the "How to avoid this timeline" card for the current scenario.
 */
function showPrevention() {
    const scenario = currentScenarioKey ? leakScenarios[currentScenarioKey] : null;
    if (!scenario || !preventionCard || !preventionContent) {
        return;
    }

    const { intro, tips, note } = scenario.prevention;

    preventionContent.innerHTML = `
        <p>${intro}</p>
        <ul>
            ${tips.map(tip => `<li>${tip}</li>`).join('')}
        </ul>
        <p class="minor-note">${note}</p>
    `;

    preventionCard.style.display = 'block';
    preventionCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
