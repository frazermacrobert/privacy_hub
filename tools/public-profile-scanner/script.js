// Public Profile Scanner (simulated)
// No scraping, no real lookups – just pattern-based prompts to think about exposure.

document.addEventListener('DOMContentLoaded', () => {
    const profileTextEl = document.getElementById('profile-text');
    const presetChips = document.querySelectorAll('.preset-chip');

    const signalLocation = document.getElementById('signal-location');
    const signalEmployer = document.getElementById('signal-employer');
    const signalRole = document.getElementById('signal-role');
    const signalContact = document.getElementById('signal-contact');
    const signalInterests = document.getElementById('signal-interests');
    const signalPhotos = document.getElementById('signal-photos');

    const runScanBtn = document.getElementById('run-scan-btn');

    const riskPill = document.getElementById('profile-risk-pill');
    const riskNote = document.getElementById('profile-risk-note');
    const inferenceList = document.getElementById('inference-list');
    const mitigationList = document.getElementById('mitigation-list');

    if (
        !profileTextEl ||
        !runScanBtn ||
        !riskPill ||
        !riskNote ||
        !inferenceList ||
        !mitigationList
    ) {
        return;
    }

    // ---------- Presets ----------

    const presets = {
        professional: {
            text:
                'Senior associate in an international law firm, specialising in data protection and technology regulation. ' +
                'Based in London and advising clients across Europe and the US. Regularly writes articles on privacy trends ' +
                'and mentors junior lawyers. Outside work: distance runner and coffee enthusiast.',
            signals: {
                location: true,
                employer: true,
                role: true,
                contact: false,
                interests: true,
                photos: true
            }
        },
        speaker: {
            text:
                'Frequent conference speaker on cybersecurity, privacy and AI ethics. Leads the privacy function for a global ' +
                'organisation in the tech sector. Often found on stage discussing cross-border investigations, incident response ' +
                'and regulatory expectations.',
            signals: {
                location: false,
                employer: true,
                role: true,
                contact: true,
                interests: false,
                photos: true
            }
        },
        social: {
            text:
                'Sharing life in a big city: law, privacy and the occasional marathon. Posts about travel, coffee spots, training ' +
                'runs and behind-the-scenes of working on complex investigations.',
            signals: {
                location: true,
                employer: false,
                role: true,
                contact: false,
                interests: true,
                photos: true
            }
        }
    };

    presetChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const key = chip.dataset.preset;
            const preset = presets[key];
            if (!preset) return;

            profileTextEl.value = preset.text;

            if (signalLocation) signalLocation.checked = !!preset.signals.location;
            if (signalEmployer) signalEmployer.checked = !!preset.signals.employer;
            if (signalRole) signalRole.checked = !!preset.signals.role;
            if (signalContact) signalContact.checked = !!preset.signals.contact;
            if (signalInterests) signalInterests.checked = !!preset.signals.interests;
            if (signalPhotos) signalPhotos.checked = !!preset.signals.photos;

            clearResults();
        });
    });

    // ---------- Scan button ----------

    runScanBtn.addEventListener('click', () => {
        const text = profileTextEl.value.trim();
        const signals = {
            location: !!signalLocation?.checked,
            employer: !!signalEmployer?.checked,
            role: !!signalRole?.checked,
            contact: !!signalContact?.checked,
            interests: !!signalInterests?.checked,
            photos: !!signalPhotos?.checked
        };

        runScan(text, signals);
    });

    // ---------- Core scan logic ----------

    function runScan(text, signals) {
        clearResults();

        const score = calculateExposureScore(text, signals);
        applyRiskLabel(score);

        const inferences = buildInferences(text, signals);
        const mitigations = buildMitigations(text, signals);

        populateList(inferenceList, inferences, 'This profile is fairly minimal. There is limited scope for meaningful inference from what is described.');
        populateList(mitigationList, mitigations, 'You are already sharing quite cautiously. Small tweaks may still help, but the profile is not especially revealing.');
    }

    function clearResults() {
        // Reset pill style/text back to a neutral baseline
        riskPill.classList.remove('risk-pill--higher', 'risk-pill--lower');
        riskPill.textContent = 'Neutral / mixed';
        riskNote.textContent = 'Add some details and run the scan to see how the pattern changes.';

        inferenceList.innerHTML = '';
        mitigationList.innerHTML = '';
    }

    function calculateExposureScore(text, signals) {
        let score = 0;
        const lower = text.toLowerCase();

        // Base on visible signals
        if (signals.location) score += 1.5;
        if (signals.employer) score += 1.5;
        if (signals.role) score += 1;
        if (signals.contact) score += 1.5;
        if (signals.interests) score += 0.75;
        if (signals.photos) score += 1.5;

        // Text-based hints about pattern and predictability
        const wordCount = text ? text.split(/\s+/).length : 0;

        if (/london|paris|new york|singapore|hong kong|berlin/gi.test(text)) {
            score += 0.5;
        }

        if (/global|international|cross[- ]border|across europe|worldwide/gi.test(text)) {
            score += 1;
        }

        if (/conference|speaker|panel|webinar|keynote|on stage/gi.test(text)) {
            score += 1;
        }

        if (/travel|travelling|often on the road|fly out/gi.test(text)) {
            score += 0.75;
        }

        if (/runner|marathon|training run|5k|10k|park run|parkrun/gi.test(text)) {
            score += 0.75; // routine / route predictability
        }

        if (/coffee|café|cafe|espresso/gi.test(text)) {
            score += 0.25; // soft, but can show habits
        }

        if (/family|children|kids|school run/gi.test(text)) {
            score += 0.75;
        }

        // Very long, detailed profiles often leak more crumbs
        if (wordCount > 120) {
            score += 1;
        } else if (wordCount < 25 && wordCount > 0) {
            score -= 0.5;
        }

        // Ensure non-negative
        return Math.max(score, 0);
    }

    function applyRiskLabel(score) {
        // Very rough banding – this is intentionally illustrative, not precise
        let label = 'Neutral / mixed';
        let note =
            'You are sharing a balanced amount of information. Context still matters: where this appears and who can see it will shift the real world impact.';
        let pillClass = null;

        if (score <= 3) {
            label = 'Lower exposure';
            note =
                'On the face of it this profile keeps things fairly contained. It still contributes to your wider digital footprint, but each individual piece is modest.';
            pillClass = 'risk-pill--lower';
        } else if (score >= 7) {
            label = 'Higher exposure';
            note =
                'Combined signals around role, location, routine and contact routes mean a motivated observer could build a reasonably detailed picture from this alone.';
            pillClass = 'risk-pill--higher';
        }

        riskPill.classList.remove('risk-pill--higher', 'risk-pill--lower');
        if (pillClass) {
            riskPill.classList.add(pillClass);
        }
        riskPill.textContent = label;
        riskNote.textContent = note;
    }

    function buildInferences(text, signals) {
        const inferences = [];
        const lower = text.toLowerCase();

        if (signals.location) {
            inferences.push(
                'Someone could identify roughly where you are based and narrow down which offices, events or hubs you are likely to use.'
            );
        }

        if (signals.employer) {
            inferences.push(
                'Linking your name to a specific employer or sector makes it easier to target work-related approaches or convincing phishing messages.'
            );
        }

        if (signals.role) {
            inferences.push(
                'Stating your role and seniority helps people infer what decisions you may influence and which systems you might access.'
            );
        }

        if (signals.contact) {
            inferences.push(
                'Publishing direct contact routes can invite both useful approaches and unwanted cold pitches or social engineering attempts.'
            );
        }

        if (signals.interests) {
            inferences.push(
                'Interests and hobbies provide rapport-building material for people who want to create quick familiarity or trust.'
            );
        }

        if (signals.photos) {
            inferences.push(
                'Photos and headshots make you more recognisable at events or in public spaces, which can be useful and occasionally misused.'
            );
        }

        if (/conference|speaker|panel|webinar|keynote|on stage/gi.test(text)) {
            inferences.push(
                'References to speaking or public events reveal where and when you might be physically present and approachable.'
            );
        }

        if (/runner|marathon|training run|park run|parkrun/gi.test(text)) {
            inferences.push(
                'Details about running and regular training can suggest patterns about when you are away from your desk or particular routes you favour.'
            );
        }

        if (/travel|travelling|often on the road|fly out/gi.test(text)) {
            inferences.push(
                'Frequent travel hints at times when you may be relying heavily on mobile devices and public networks.'
            );
        }

        if (/family|children|kids|school run/gi.test(text)) {
            inferences.push(
                'Mentions of family life can be entirely normal, but also add sensitive context if combined with routine, location and photos.'
            );
        }

        // If user gave no text and minimal signals, keep output from feeling empty
        if (!text && inferences.length === 0) {
            inferences.push(
                'With very little profile content, there is not much for an outsider to build on. The trade-off is that it may be harder for genuine contacts to find or recognise you.'
            );
        }

        return inferences;
    }

    function buildMitigations(text, signals) {
        const mitigations = [];

        if (signals.location) {
            mitigations.push(
                'Consider keeping city-level location if it is helpful, but avoid sharing neighbourhoods, regular venues or detailed routines in the same place.'
            );
        }

        if (signals.employer) {
            mitigations.push(
                'If appropriate, describe your sector or type of organisation instead of naming specific teams or internal systems you work on.'
            );
        }

        if (signals.role) {
            mitigations.push(
                'Keep role descriptions focused on what you do, not which high-risk systems or approval rights you personally control.'
            );
        }

        if (signals.contact) {
            mitigations.push(
                'Use a professional contact route that has good filtering and security controls instead of mixing work and purely personal channels.'
            );
        }

        if (signals.interests) {
            mitigations.push(
                'You can keep some personality in the profile while trimming out details that reveal exact locations, times or family patterns.'
            );
        }

        if (signals.photos) {
            mitigations.push(
                'Check older photos for badges, backgrounds or screens that accidentally reveal locations, IDs or client information.'
            );
        }

        const wordCount = text ? text.split(/\s+/).length : 0;

        if (wordCount > 140) {
            mitigations.push(
                'If the profile is very long, consider tightening it. Fewer, well-chosen details often do the job without adding extra clues.'
            );
        }

        if (/conference|speaker|panel|webinar|keynote|on stage/gi.test(text)) {
            mitigations.push(
                'When listing events, you might focus on themes and topics rather than dates and precise locations, especially on more personal channels.'
            );
        }

        if (mitigations.length === 0) {
            mitigations.push(
                'Keep reviewing profiles periodically. As your role and life change, details that once felt neutral can start to feel more revealing.'
            );
        }

        return mitigations;
    }

    function populateList(listEl, items, fallbackText) {
        listEl.innerHTML = '';
        if (!items || items.length === 0) {
            const li = document.createElement('li');
            li.textContent = fallbackText;
            listEl.appendChild(li);
            return;
        }

        items.forEach(text => {
            const li = document.createElement('li');
            li.textContent = text;
            listEl.appendChild(li);
        });
    }
});
