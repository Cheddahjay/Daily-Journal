//! Select elements
const entryText = document.querySelector('#entry-text');
const submitBtn = document.querySelector('#submit-btn');
const entriesContainer = document.querySelector('#entries-container');
const noEntriesContainer = document.querySelector('#no-entries');

//! Load entries from localStorage or empty array
const entries = JSON.parse(localStorage.getItem('entries')) || [];

//! Create "No entries yet" card
const noEntryCard = document.createElement('div');
noEntryCard.classList.add('no-entry-card');
const noEntryText = document.createElement('h3');
noEntryText.classList.add('no-entry-text');
noEntryText.textContent = 'No journal entries yet. Start by writing your thoughts above';
noEntryCard.appendChild(noEntryText);

//! Function to render a single journal entry card
const renderEntry = (entryObj) => {
    const { info, date, id } = entryObj;

    const card = document.createElement('div');
    card.classList.add('card');  
    card.dataset.id = id;

    const body = document.createElement('div');
    body.classList.add('card-body');

    const footer = document.createElement('div');
    footer.classList.add('card-footer');

    const heading = document.createElement('h3');
    heading.textContent = `Your entry from: ${date}`;

    const paragraph = document.createElement('p');
    paragraph.textContent = info;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Remove entry';

    body.appendChild(heading);
    body.appendChild(paragraph);
    footer.appendChild(deleteBtn);

    card.appendChild(body);
    card.appendChild(footer);

    entriesContainer.prepend(card);
};

//! Render all existing entries on page load
if (entries.length > 0) {
    entries.forEach(renderEntry);
} else {
    noEntriesContainer.appendChild(noEntryCard);
}

//! Submit new journal entry
submitBtn.addEventListener('click', () => {
    const text = entryText.value.trim();
    if (!text) return;

    // Remove "No entries" card if exists
    if (entries.length === 0) noEntryCard.remove();

    const entryObj = {
        id: Date.now(),
        info: text,
        date: new Date().toLocaleDateString(),
    };

    entries.push(entryObj);
    localStorage.setItem('entries', JSON.stringify(entries));

    renderEntry(entryObj);
    entryText.value = '';
});

//! Delete entry
entriesContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const card = e.target.closest('.card');
        const id = Number(card.dataset.id);

        const index = entries.findIndex(entry => entry.id === id);
        entries.splice(index, 1);
        localStorage.setItem('entries', JSON.stringify(entries));

        card.remove();

        // If no entries left, show "No entries" card
        if (entries.length === 0) noEntriesContainer.appendChild(noEntryCard);
    }
});
