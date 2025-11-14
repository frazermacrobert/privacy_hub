const questions = [
    {
        question: "Which option is SAFE for storing work passwords?",
        options: [
            { text: "Write them in a notebook", safe: false },
            { text: "Use a password manager", safe: true },
            { text: "Save in browser", safe: false },
            { text: "Email to yourself", safe: false }
        ],
        explanation: "Password managers encrypt your passwords and are the safest option."
    },
    {
        question: "Which Wi-Fi network is SAFE to use?",
        options: [
            { text: "Coffee shop public Wi-Fi", safe: false },
            { text: "Your home network", safe: true },
            { text: "Airport free Wi-Fi", safe: false },
            { text: "Unsecured 'Free WiFi'", safe: false }
        ],
        explanation: "Public Wi-Fi networks are vulnerable to eavesdropping. Use your home network or VPN."
    },
    {
        question: "Which action is SAFE when receiving an unexpected email?",
        options: [
            { text: "Click the link immediately", safe: false },
            { text: "Download the attachment", safe: false },
            { text: "Verify sender before acting", safe: true },
            { text: "Reply with personal info", safe: false }
        ],
        explanation: "Always verify the sender's identity before taking any action on unexpected emails."
    },
    {
        question: "Which storage option is SAFE for confidential documents?",
        options: [
            { text: "Public Dropbox link", safe: false },
            { text: "Personal USB drive", safe: false },
            { text: "Encrypted company cloud", safe: true },
            { text: "Desktop folder", safe: false }
        ],
        explanation: "Encrypted company-approved cloud storage provides security and proper access controls."
    },
    {
        question: "Which social media privacy setting is SAFE?",
        options: [
            { text: "Profile set to public", safe: false },
            { text: "Location sharing enabled", safe: false },
            { text: "Two-factor authentication on", safe: true },
            { text: "Accept all friend requests", safe: false }
        ],
        explanation: "Two-factor authentication adds crucial security to your accounts."
    },
    {
        question: "Which password is SAFE to use?",
        options: [
            { text: "password123", safe: false },
            { text: "YourName2024", safe: false },
            { text: "T7$mK9#pL2@qR5", safe: true },
            { text: "Company2024!", safe: false }
        ],
        explanation: "Strong passwords use random combinations of letters, numbers, and symbols."
    },
    {
        question: "Which device practice is SAFE?",
        options: [
            { text: "No screen lock", safe: false },
            { text: "Auto-lock after 1 minute", safe: true },
            { text: "Same PIN for everything", safe: false },
            { text: "Disable updates", safe: false }
        ],
        explanation: "Auto-lock protects your device if lost or stolen. Keep it short!"
    },
    {
        question: "Which file sharing method is SAFE?",
        options: [
            { text: "Email to multiple people", safe: false },
            { text: "Post on social media", safe: false },
            { text: "Secure company portal", safe: true },
            { text: "Public file hosting site", safe: false }
        ],
        explanation: "Company-approved secure portals ensure proper access control and encryption."
    },
    {
        question: "Which browser practice is SAFE?",
        options: [
            { text: "Stay logged in everywhere", safe: false },
            { text: "Clear cookies regularly", safe: true },
            { text: "Ignore HTTPS warnings", safe: false },
            { text: "Save all passwords", safe: false }
        ],
        explanation: "Clearing cookies regularly reduces tracking and protects your privacy."
    },
    {
        question: "Which remote work practice is SAFE?",
        options: [
            { text: "Work in public spaces", safe: false },
            { text: "Share screen freely", safe: false },
            { text: "Use company VPN", safe: true },
            { text: "Use personal devices", safe: false }
        ],
        explanation: "Company VPNs encrypt your connection and protect sensitive data."
    }
];

let currentQuestion = 0;
let score = 0;
let streak = 0;
let wrongAnswers = [];
let gameActive = false;

function startGame() {
    // Reset game state
    currentQuestion = 0;
    score = 0;
    streak = 0;
    wrongAnswers = [];
    gameActive = true;
    
    // Shuffle questions
    shuffleArray(questions);
    questions.forEach(q => shuffleArray(q.options));
    
    // Show game card
    document.getElementById('intro-card').style.display = 'none';
    document.getElementById('game-card').style.display = 'block';
    document.getElementById('results-card').style.display = 'none';
    
    // Load first question
    loadQuestion();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        endGame();
        return;
    }
    
    const question = questions[currentQuestion];
    
    // Update header
    document.getElementById('question-counter').textContent = `${currentQuestion + 1}/10`;
    document.getElementById('score-display').textContent = score;
    document.getElementById('streak-display').textContent = streak;
    
    // Update progress bar
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    
    // Load question
    document.getElementById('question-text').textContent = question.question;
    
    // Load options
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option.text;
        btn.onclick = () => selectOption(index);
        optionsContainer.appendChild(btn);
    });
    
    // Hide feedback
    document.getElementById('feedback').style.display = 'none';
}

function selectOption(index) {
    if (!gameActive) return;
    
    const question = questions[currentQuestion];
    const selectedOption = question.options[index];
    const optionButtons = document.querySelectorAll('.option-btn');
    const feedback = document.getElementById('feedback');
    
    // Disable all buttons
    optionButtons.forEach(btn => btn.disabled = true);
    
    // Mark selected option
    if (selectedOption.safe) {
        optionButtons[index].classList.add('correct');
        feedback.className = 'feedback correct';
        feedback.textContent = `✓ Correct! ${question.explanation}`;
        
        // Update score and streak
        score += 10 + (streak * 2); // Bonus points for streaks
        streak++;
        
        document.getElementById('score-display').textContent = score;
        document.getElementById('streak-display').textContent = streak;
    } else {
        optionButtons[index].classList.add('incorrect');
        feedback.className = 'feedback incorrect';
        feedback.textContent = `✗ Not safe! ${question.explanation}`;
        
        // Track wrong answer
        wrongAnswers.push(question.question);
        
        // Reset streak
        streak = 0;
        document.getElementById('streak-display').textContent = streak;
        
        // Highlight correct answer
        question.options.forEach((opt, i) => {
            if (opt.safe) {
                optionButtons[i].classList.add('correct');
            }
        });
    }
    
    feedback.style.display = 'block';
    
    // Move to next question after delay
    setTimeout(() => {
        currentQuestion++;
        loadQuestion();
    }, 2000);
}

function endGame() {
    gameActive = false;
    
    // Hide game card, show results
    document.getElementById('game-card').style.display = 'none';
    document.getElementById('results-card').style.display = 'block';
    
    // Display final score
    document.getElementById('final-score').textContent = score;
    
    // Calculate performance rating
    const percentage = (score / 100) * 100; // Max score is 100 (10 questions × 10 points)
    let rating, message, emoji;
    
    if (percentage >= 90) {
        rating = "Privacy Expert";
        message = "Outstanding! You have excellent privacy awareness.";
        emoji = "🏆";
    } else if (percentage >= 70) {
        rating = "Privacy Conscious";
        message = "Great job! You're making smart privacy choices.";
        emoji = "⭐";
    } else if (percentage >= 50) {
        rating = "Privacy Aware";
        message = "Good start! Keep building those privacy reflexes.";
        emoji = "👍";
    } else {
        rating = "Privacy Learner";
        message = "You're on the right track. Review the tips below!";
        emoji = "📚";
    }
    
    document.getElementById('performance-rating').innerHTML = `
        <h3>${emoji} ${rating}</h3>
        <p>${message}</p>
    `;
    
    // Generate personalized recommendations
    const recommendations = generateRecommendations();
    const recommendationsList = document.getElementById('recommendations-list');
    recommendationsList.innerHTML = recommendations.map(rec => `
        <div class="recommendation-item">
            <h4>${rec.title}</h4>
            <p>${rec.description}</p>
        </div>
    `).join('');
    
    // Scroll to results
    document.getElementById('results-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function generateRecommendations() {
    const recommendations = [
        {
            title: "Enable Two-Factor Authentication",
            description: "Add an extra layer of security to all your important accounts. It takes minutes but dramatically improves your security."
        },
        {
            title: "Use a Password Manager",
            description: "Stop reusing passwords. A password manager generates and stores unique, strong passwords for every account."
        },
        {
            title: "Be Skeptical of Emails",
            description: "Always verify unexpected emails before clicking links or downloading attachments. When in doubt, contact the sender directly."
        },
        {
            title: "Update Your Privacy Settings",
            description: "Review privacy settings on social media and apps regularly. Limit what information is publicly visible."
        },
        {
            title: "Use Encryption",
            description: "Encrypt sensitive files and use HTTPS websites. Look for the padlock icon in your browser."
        }
    ];
    
    // Return subset based on performance
    if (score >= 80) {
        return recommendations.slice(0, 2);
    } else if (score >= 50) {
        return recommendations.slice(0, 3);
    } else {
        return recommendations;
    }
}
