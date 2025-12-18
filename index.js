
//! Declaring variables and selecting elements
const entryText = document.querySelector('#entry-text');
const submitBtn = document.querySelector('#submit-btn');
const entriesContainer = document.querySelector('#entries-container');
const entries =[]


//! Submit on click
submitBtn.addEventListener('click', () => {

    // Get user input
    const text = entryText.value;
    
    // Check if empty
    if(text.trim() === '') return;

    // Save the journal entry in an object then push into an empty array
    const getCurrentDate = () => new Date().toLocaleDateString();
    const entryObj = 
    {
       text: text, 
       date: getCurrentDate()  
    };

    entries.push(entryObj);
    
    // Create the card
    const card = document.createElement('div');
    card.classList.add('card');
    const header = document.createElement('div');
    header.classList.add('card-header')
    const body = document.createElement('div');
    body.classList.add('card-body');
    const footer = document.createElement('div');
    footer.classList.add('card-footer')
    const heading = document.createElement('h3');
    heading.textContent = entryObj.date
    const paragraph = document.createElement('p')
    paragraph.textContent = text;

    //Append the elements
    body.appendChild(heading);
    body.appendChild(paragraph);
    card.appendChild(header);
    card.appendChild(body);
    card.appendChild(footer);
    entriesContainer.prepend(card);
    
    //Clear the text value
    entryText.value = ''

   


});

