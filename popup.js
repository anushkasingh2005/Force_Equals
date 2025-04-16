document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('toggleWidget');
    
    // Load saved state
    chrome.storage.local.get(['widgetVisible'], function(result) {
        toggle.checked = result.widgetVisible !== false;
    });
    
    // Save state when toggled
    toggle.addEventListener('change', function() {
        const isVisible = this.checked;
        chrome.storage.local.set({ widgetVisible: isVisible });
        
        // Send message to content script
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { 
                action: "toggleWidget", 
                visible: isVisible 
            });
        });
    });
});