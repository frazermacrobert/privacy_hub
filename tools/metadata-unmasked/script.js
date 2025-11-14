const metadataTypes = {
    email: {
        title: 'Email Metadata',
        categories: [
            {
                name: 'Header Information',
                items: [
                    { label: 'IP Address', value: '192.168.1.1' },
                    { label: 'Email Client', value: 'Outlook 2021' },
                    { label: 'Timestamp', value: '2025-01-15 14:23:11 GMT' },
                    { label: 'Server Route', value: 'via mail.company.com' }
                ],
                misuse: 'An attacker could use your IP address to determine your approximate location and the email client information to target you with specific phishing attacks designed for that platform.'
            },
            {
                name: 'Routing Data',
                items: [
                    { label: 'Sender Domain', value: 'company.com' },
                    { label: 'Mail Servers', value: '3 intermediary servers' },
                    { label: 'Authentication', value: 'SPF, DKIM passed' }
                ],
                misuse: 'Mail routing information can reveal your organization\'s email infrastructure, potentially exposing security weaknesses to attackers planning targeted campaigns.'
            },
            {
                name: 'Tracking & Analytics',
                items: [
                    { label: 'Read Receipt', value: 'Enabled' },
                    { label: 'Link Tracking', value: 'Active' },
                    { label: 'Open Pixel', value: 'Embedded' }
                ],
                misuse: 'Marketing trackers can monitor when and where you open emails, building detailed profiles of your behavior and schedule without your explicit consent.'
            }
        ]
    },
    photo: {
        title: 'Photo Metadata (EXIF)',
        categories: [
            {
                name: 'Location Data',
                items: [
                    { label: 'GPS Coordinates', value: '51.5074° N, 0.1278° W' },
                    { label: 'Altitude', value: '15 meters' },
                    { label: 'Location Name', value: 'London, UK' }
                ],
                misuse: 'Location data reveals where you live, work, and travel. Sharing photos with GPS data can expose your home address, daily routine, and travel patterns to strangers or malicious actors.'
            },
            {
                name: 'Device Information',
                items: [
                    { label: 'Camera Model', value: 'iPhone 14 Pro' },
                    { label: 'Serial Number', value: 'DMQT2LL/A' },
                    { label: 'Software', value: 'iOS 17.2' }
                ],
                misuse: 'Device information can be used to track which device took specific photos, potentially linking anonymous posts back to you. Serial numbers can be used to identify ownership.'
            },
            {
                name: 'Technical Details',
                items: [
                    { label: 'Date/Time Taken', value: '2025-01-15 10:30:45' },
                    { label: 'Lens Used', value: '24mm f/1.8' },
                    { label: 'Flash', value: 'Off' },
                    { label: 'Orientation', value: 'Portrait' }
                ],
                misuse: 'Timestamps can establish patterns of behavior and create timelines of your activities. When combined with location data, this creates a detailed log of your movements.'
            }
        ]
    },
    document: {
        title: 'Document Metadata',
        categories: [
            {
                name: 'Author & Revision',
                items: [
                    { label: 'Author', value: 'John Smith' },
                    { label: 'Last Modified By', value: 'Jane Doe' },
                    { label: 'Company', value: 'Acme Corporation' },
                    { label: 'Revision Count', value: '47 revisions' }
                ],
                misuse: 'Author information can reveal who worked on a document, potentially exposing confidential contributors. Revision counts might indicate sensitive negotiations or disputes.'
            },
            {
                name: 'Timestamps',
                items: [
                    { label: 'Created', value: '2024-11-20 09:15:00' },
                    { label: 'Modified', value: '2025-01-14 16:42:33' },
                    { label: 'Last Printed', value: '2025-01-10 11:20:15' },
                    { label: 'Total Edit Time', value: '4 hours 32 minutes' }
                ],
                misuse: 'Timestamps reveal when work occurred, potentially exposing working hours, deadlines, and time zone information. Edit time can indicate document importance or complexity.'
            },
            {
                name: 'Hidden Content',
                items: [
                    { label: 'Comments', value: '12 hidden comments' },
                    { label: 'Track Changes', value: 'Active (23 changes)' },
                    { label: 'Hidden Text', value: 'Present' }
                ],
                misuse: 'Hidden comments and tracked changes can contain sensitive discussions, deleted information, or candid remarks never intended for external viewing. These are often overlooked when sharing documents.'
            }
        ]
    },
    pdf: {
        title: 'PDF Metadata',
        categories: [
            {
                name: 'Document Properties',
                items: [
                    { label: 'Creator Tool', value: 'Adobe Acrobat Pro DC' },
                    { label: 'Producer', value: 'Microsoft Word 2021' },
                    { label: 'PDF Version', value: '1.7' },
                    { label: 'Title', value: 'Confidential_Report_Draft' }
                ],
                misuse: 'Creation tools and original filenames (like "Confidential_Report_Draft") can reveal information you intended to hide. Software versions might expose security vulnerabilities.'
            },
            {
                name: 'Security & History',
                items: [
                    { label: 'Encryption', value: 'None' },
                    { label: 'Permissions', value: 'Full access allowed' },
                    { label: 'Form Fields', value: '8 interactive fields' }
                ],
                misuse: 'Lack of encryption means anyone can access the content. Form field data can retain previous entries, potentially exposing sensitive information from earlier uses of the template.'
            },
            {
                name: 'Embedded Objects',
                items: [
                    { label: 'Hyperlinks', value: '5 external links' },
                    { label: 'Attachments', value: '2 embedded files' },
                    { label: 'JavaScript', value: 'Present' }
                ],
                misuse: 'Embedded files and scripts can contain malware or tracking code. External links might reveal internal network addresses or redirect to malicious sites without your knowledge.'
            }
        ]
    },
    presentation: {
        title: 'Presentation Metadata',
        categories: [
            {
                name: 'Authorship',
                items: [
                    { label: 'Template', value: 'Company_Standard_2024.potx' },
                    { label: 'Author', value: 'Marketing Team' },
                    { label: 'Manager', value: 'Sarah Johnson' },
                    { label: 'Company', value: 'Acme Corporation' }
                ],
                misuse: 'Template names can reveal internal naming conventions and organizational structure. Manager fields might expose reporting relationships you want to keep confidential.'
            },
            {
                name: 'Presentation Details',
                items: [
                    { label: 'Slide Count', value: '45 slides' },
                    { label: 'Hidden Slides', value: '8 slides hidden' },
                    { label: 'Notes', value: 'Present on 32 slides' },
                    { label: 'Custom Properties', value: '6 custom fields' }
                ],
                misuse: 'Hidden slides and speaker notes often contain sensitive information, alternative scenarios, or internal discussions not meant for external audiences but easily recoverable from the file.'
            },
            {
                name: 'Media & Revisions',
                items: [
                    { label: 'Embedded Media', value: '12 images, 3 videos' },
                    { label: 'Last Saved By', value: 'admin@company.com' },
                    { label: 'Revision Number', value: '23' }
                ],
                misuse: 'Embedded media retains its own metadata (including locations where photos were taken). High revision numbers might signal controversial content or indicate the sensitivity of the material.'
            }
        ]
    }
};

function showMetadata(type) {
    const data = metadataTypes[type];
    const displayDiv = document.getElementById('metadata-display');
    const titleElement = document.getElementById('file-title');
    const categoriesDiv = document.getElementById('metadata-categories');
    
    // Update title
    titleElement.textContent = data.title;
    
    // Build categories HTML
    let categoriesHTML = '';
    data.categories.forEach((category, categoryIndex) => {
        const categoryId = `category-${type}-${categoryIndex}`;
        const misuseId = `misuse-${type}-${categoryIndex}`;
        
        categoriesHTML += `
            <div class="metadata-category">
                <div class="category-header" onclick="toggleCategory('${categoryId}')">
                    <h3>${category.name}</h3>
                    <span class="toggle-icon">▼</span>
                </div>
                <div class="category-content" id="${categoryId}">
                    ${category.items.map(item => `
                        <div class="metadata-item">
                            <span class="metadata-label">${item.label}</span>
                            <span class="metadata-value">${item.value}</span>
                        </div>
                    `).join('')}
                    <button class="misuse-button" onclick="toggleMisuse('${misuseId}')">
                        ⚠️ See How This Could Be Misused
                    </button>
                    <div class="misuse-scenario" id="${misuseId}">
                        <h4>Potential Risk Scenario:</h4>
                        <p>${category.misuse}</p>
                    </div>
                </div>
            </div>
        `;
    });
    
    categoriesDiv.innerHTML = categoriesHTML;
    
    // Show the display
    displayDiv.style.display = 'block';
    displayDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function toggleCategory(categoryId) {
    const content = document.getElementById(categoryId);
    const header = content.previousElementSibling;
    
    content.classList.toggle('active');
    header.classList.toggle('active');
}

function toggleMisuse(misuseId) {
    const misuseDiv = document.getElementById(misuseId);
    misuseDiv.classList.toggle('show');
}
