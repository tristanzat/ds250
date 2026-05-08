/**
 * Load assignments from manifest.json and populate the page
 */
async function loadAssignments() {
    const assignmentsContainer = document.getElementById('assignments');
    
    try {
        const response = await fetch('../manifest.json');
        
        if (!response.ok) {
            throw new Error(`Failed to load manifest.json: ${response.statusText}`);
        }
        
        const manifest = await response.json();
        
        if (!manifest.assignments || manifest.assignments.length === 0) {
            assignmentsContainer.innerHTML = '<p class="loading">No assignments found. Update manifest.json to add assignments.</p>';
            return;
        }
        
        // Clear loading message
        assignmentsContainer.innerHTML = '';
        
        // Create cards for each assignment
        manifest.assignments.forEach(assignment => {
            const card = createAssignmentCard(assignment);
            assignmentsContainer.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading assignments:', error);
        assignmentsContainer.innerHTML = `
            <div class="error">
                <strong>Error loading assignments:</strong> ${error.message}
                <p style="margin-top: 10px; font-size: 0.9em;">Make sure manifest.json exists in the root directory with your assignment list.</p>
            </div>
        `;
    }
}

/**
 * Create an assignment card element
 */
function createAssignmentCard(assignment) {
    const card = document.createElement('div');
    card.className = 'assignment-card';
    
    const link = document.createElement('a');
    link.href = assignment.path;
    link.title = assignment.description || 'Open assignment';
    
    const title = document.createElement('div');
    title.className = 'assignment-title';
    title.textContent = assignment.title;
    
    const description = document.createElement('div');
    description.className = 'assignment-description';
    description.textContent = assignment.description || '';
    
    const pathElement = document.createElement('div');
    pathElement.className = 'assignment-path';
    pathElement.textContent = assignment.path;
    
    link.appendChild(title);
    link.appendChild(description);
    link.appendChild(pathElement);
    
    card.appendChild(link);
    
    return card;
}

// Load assignments when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAssignments);
} else {
    loadAssignments();
}