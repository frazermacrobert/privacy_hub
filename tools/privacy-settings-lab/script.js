// Privacy Settings Lab logic
// Scores are illustrative only, not a formal assessment.

document.addEventListener('DOMContentLoaded', () => {
    const visibilitySelect = document.getElementById('visibility-setting');
    const trackingSelect = document.getElementById('tracking-setting');
    const syncSelect = document.getElementById('sync-setting');
    const accessSelect = document.getElementById('access-setting');

    const riskScoreEl = document.getElementById('risk-score');
    const riskBarFill = document.getElementById('risk-bar-fill');
    const riskCommentaryEl = document.getElementById('risk-commentary');
    const riskFactorsEl = document.getElementById('risk-factors');

    if (
        !visibilitySelect ||
        !trackingSelect ||
        !syncSelect ||
        !accessSelect ||
        !riskScoreEl ||
        !riskBarFill ||
        !riskCommentaryEl ||
        !riskFactorsEl
    ) {
        // If something is missing, quietly bail.
        return;
    }

    function calculateRisk() {
        const visibility = visibilitySelect.value;
        const tracking = trackingSelect.value;
        const sync = syncSelect.value;
        const access = accessSelect.value;

        let score = 0;
        const factors = [];

        // Visibility scoring
        switch (visibility) {
            case 'public':
                score += 3;
                factors.push('Wide visibility makes accidental or onward sharing more likely.');
                break;
            case 'restricted':
                score += 2;
                factors.push('Restricted groups limit exposure but still rely on list hygiene.');
                break;
            case 'need-to-know':
                score += 1;
                factors.push('Need to know access keeps exposure focused on those who genuinely require it.');
                break;
        }

        // Tracking / analytics scoring
        switch (tracking) {
            case 'broad':
                score += 3;
                factors.push('Broad tracking can create large behavioural datasets and more obligations.');
                break;
            case 'minimised':
                score += 2;
                factors.push('Minimised analytics reduce detail while still giving useful insights.');
                break;
            case 'strict':
                score += 1;
                factors.push('Strictly necessary tracking limits what is collected in the first place.');
                break;
        }

        // Sync & storage scoring
        switch (sync) {
            case 'multi-region':
                score += 3;
                factors.push('Multi region syncing increases the number of copies and jurisdictions involved.');
                break;
            case 'regional':
                score += 2;
                factors.push('Regional storage narrows the footprint but still creates multiple copies.');
                break;
            case 'minimal':
                score += 1;
                factors.push('Minimal syncing and shorter retention reduce what exists to be breached or misused.');
                break;
        }

        // Access control scoring
        switch (access) {
            case 'shared':
                score += 3;
                factors.push('Shared accounts make it hard to attribute actions or revoke access cleanly.');
                break;
            case 'individual':
                score += 2;
                factors.push('Individual accounts are better, but still hinge on password strength and hygiene.');
                break;
            case 'strong':
                score += 1;
                factors.push('Strong authentication and role based access create a solid foundation.');
                break;
        }

        updateUI(score, factors);
    }

    function updateUI(score, factors) {
        // Minimum score = 4, maximum = 12
        const minScore = 4;
        const maxScore = 12;
        const clamped = Math.min(Math.max(score, minScore), maxScore);
        const scale = (clamped - minScore) / (maxScore - minScore); // 0 → 1

        // Map to a bar width between 25% and 100% so "lower" is still visible
        const minWidth = 25;
        const maxWidth = 100;
        const widthPercent = minWidth + (maxWidth - minWidth) * scale;
        riskBarFill.style.width = widthPercent + '%';

        // Risk label
        let label;
        let commentary;

        if (scale <= 0.33) {
            label = 'Lower';
            commentary =
                'These settings lean towards minimisation and control. Real risk still depends on the data and context, but you are broadly heading in the right direction.';
        } else if (scale <= 0.66) {
            label = 'Medium';
            commentary =
                'You have a mixed picture. Some choices contain risk, others open it up. This is where context, contracts and real world behaviour matter most.';
        } else {
            label = 'Higher';
            commentary =
                'Several settings tilt towards openness, tracking or wider spread. For anything sensitive, you would want stronger controls than this.';
        }

        riskScoreEl.textContent = label;
        riskCommentaryEl.textContent = commentary;

        // Key drivers list
        riskFactorsEl.innerHTML = '';
        factors.forEach(text => {
            const li = document.createElement('li');
            li.textContent = text;
            riskFactorsEl.appendChild(li);
        });
    }

    // Recalculate whenever a setting changes
    [visibilitySelect, trackingSelect, syncSelect, accessSelect].forEach(select => {
        select.addEventListener('change', calculateRisk);
    });

    // Initial calculation using default selections
    calculateRisk();
});
