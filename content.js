// Premium data structure
const premiumData = {
    companyName: "TechCorp",
    matchScore: 86,
    accountStatus: "Target",
    lastUpdated: "2 days ago"
};

function createPremiumWidget(data) {
    const widget = document.createElement('div');
    widget.className = 'premium-widget';
    widget.innerHTML = `
        <div class="widget-header">
            <div class="logo-container">
                <div class="logo-circle"></div>
                <span class="logo-text">FE</span>
            </div>
            <h3>Premium Match</h3>
            <button class="close-btn">×</button>
        </div>
        <div class="widget-body">
            <div class="company-info">
                <span class="company-name">${data.companyName}</span>
                <span class="last-updated">Updated ${data.lastUpdated}</span>
            </div>
            <div class="match-score">
                <div class="score-progress">
                    <div class="progress-bar" style="width: ${data.matchScore}%"></div>
                </div>
                <span class="score-value">${data.matchScore}% Match</span>
            </div>
            <div class="status-indicator ${data.accountStatus.toLowerCase()}">
                <div class="status-dot"></div>
                <span>${data.accountStatus}</span>
            </div>
        </div>
        <div class="widget-footer">
            <button class="action-btn">View Details</button>
        </div>
    `;

    document.body.appendChild(widget);
    
    // Animation trigger
    setTimeout(() => {
        widget.classList.add('visible');
    }, 300);

    // Close functionality
    widget.querySelector('.close-btn').addEventListener('click', () => {
        widget.classList.remove('visible');
        setTimeout(() => {
            widget.remove();
            chrome.storage.local.set({ widgetVisible: false });
        }, 300);
    });
}

// Check storage and create widget
chrome.storage.local.get(['widgetVisible'], (result) => {
    if (result.widgetVisible !== false) {
        createPremiumWidget(premiumData);
    }
});

// Listen for toggle messages
chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "toggleWidget") {
        const widget = document.querySelector('.premium-widget');
        if (widget) {
            if (request.visible) {
                widget.classList.add('visible');
            } else {
                widget.classList.remove('visible');
            }
        } else if (request.visible) {
            createPremiumWidget(premiumData);
        }
    }
});