// const submit = document.getElementById('headerSubmitBtn');
// const userPrompt = document.getElementById('userPrompt');

// export let query = {
//     keyWord: {query: null, casse: false},
//     onSite: null,
//     documentType: null,
//     date: {
//         after: null,
//         before: null
//     }
// }

// function formatPrompt (data) {
//     let prompt = `${data.keyWord.query != null | false ? data.keyWord.casse == true ? `intext:"${data.keyWord.query}"` : `intext:${data.keyWord.query}` : ""} ${data.onSite != null | false ? `site:${data.onSite}` : ""} ${data.documentType != null | false ? `filetype:${data.documentType}` : ""} ${data.date.after != null | false ? `after:${data.date.after}` : ""} ${data.date.before != null | false ? `before:${data.date.before}` : ""}`;
//     userPrompt.value = prompt
// }


// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.querySelector('form');

//     // Ajouter des écouteurs de changement sur les éléments du formulaire
//     form.elements['casse'].forEach(radio => {
//         radio.addEventListener('change', (event) => {
//             const value = event.target.value;
//             if (value === 'no') query.keyWord.casse = false;
//             if (value === 'yes') query.keyWord.casse = true;
//         });
//     });

//     form.elements['keyWord'].addEventListener('change', (event) => {
//         const value = event.target.value;
//         query.keyWord.query = value;
//         formatPrompt(query)
//     });

//     form.elements['onSite'].addEventListener('change', (event) => {
//         const value = event.target.value;
//         query.onSite = value;
//         formatPrompt(query)
//     });

//     // Radios for 'ressourceType'
//     const ressourceTypeRadios = document.querySelectorAll('input[name="ressourceType"]');
//     ressourceTypeRadios.forEach(radio => {
//         radio.addEventListener('change', (event) => {
//             const value = event.target.value;
//             query.documentType = value;
//             formatPrompt(query)
//         });
//     });

//     form.elements['pubDateAfter'].addEventListener('change', (event) => {
//         const value = new Date(event.target.value)
//         query.date.after = value.toISOString().split('T')[0];
//         console.log(query)
//         formatPrompt(query)
//     });

//     form.elements['pubDateBefore'].addEventListener('change', (event) => {
//         const value = new Date(event.target.value)
//         query.date.before = value.toISOString().split('T')[0];
//         console.log(query)
//         formatPrompt(query)
//     });
// });

// export function submitSearch (queryId, newData) {
//     const q = {...query, id: uuidv4(), createdAt: new Date()};
//     if (!localStorage.getItem('queryiq')) 
//         localStorage.setItem('queryiq', JSON.stringify([q]));
//     else {
//         let old = JSON.parse(localStorage.getItem('queryiq'));
//         if (queryId && newData) {
//             old.map(i => {
//                 if (i.id == queryId) {
//                     i.keyWord.query = newData.keyWord.query;
//                     i.keyWord.casse = newData.keyWord.casse;
//                     i.onSite = newData.onSite;
//                     i.documentType = newData.documentType;
//                     i.data = newData.Date;
//                 }
//             })
//             localStorage.removeItem('queryiq');
//             localStorage.setItem('queryiq', JSON.stringify(old));
//             let prompt = `${newData.keyWord.query != null | false ? newData.keyWord.casse == true ? `intext:"${newData.keyWord.query}"` : `intext:${newData.keyWord.query}` : ""} ${newData.onSite != null | false ? `site:${newData.onSite}` : ""} ${newData.documentType != null | false ? `filetype:${newData.documentType}` : ""} ${newData.date.after != null | false ? `after:${newData.date.after}` : ""} ${newData.date.before != null | false ? `before:${newData.date.before}` : ""}`;
//             var url = 'https://www.google.com/search?q=' + encodeURIComponent(prompt);
//             window.open(url, '_blank');
//             return;
//         } else {
//             localStorage.setItem('queryiq', JSON.stringify([...old, q]));
//             var url = 'https://www.google.com/search?q=' + encodeURIComponent(userPrompt.value);
//             window.open(url, '_blank');
//         }
//     }
// }

// submit.addEventListener('click', () => submitSearch());

// Select DOM elements
const submitButton = document.getElementById('headerSubmitBtn');
const userPrompt = document.getElementById('userPrompt');

// Initial query object
export let query = {
    keyWord: { query: null, casse: false },
    onSite: null,
    documentType: null,
    date: {
        after: null,
        before: null
    }
}

// Format the prompt for display
function formatPrompt(data) {
    const keyword = data.keyWord.query ? (data.keyWord.casse ? `intext:"${data.keyWord.query}"` : `intext:${data.keyWord.query}`) : "";
    const site = data.onSite ? `site:${data.onSite}` : "";
    const fileType = data.documentType ? `filetype:${data.documentType}` : "";
    const dateAfter = data.date.after ? `after:${data.date.after}` : "";
    const dateBefore = data.date.before ? `before:${data.date.before}` : "";
    
    const prompt = `${keyword} ${site} ${fileType} ${dateAfter} ${dateBefore}`.trim();
    userPrompt.value = prompt;

    return prompt;
}

// Add event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    // Handle case sensitivity changes
    form.elements['casse'].forEach(radio => {
        radio.addEventListener('change', (event) => {
            query.keyWord.casse = (event.target.value === 'yes');
            formatPrompt(query);
        });
    });

    // Handle keyword changes
    form.elements['keyWord'].addEventListener('change', (event) => {
        query.keyWord.query = event.target.value;
        formatPrompt(query);
    });

    // Handle site changes
    form.elements['onSite'].addEventListener('change', (event) => {
        query.onSite = event.target.value;
        formatPrompt(query);
    });

    // Handle resource type changes
    const resourceTypeRadios = document.querySelectorAll('input[name="ressourceType"]');
    resourceTypeRadios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            query.documentType = event.target.value;
            formatPrompt(query);
        });
    });

    // Handle date after changes
    form.elements['pubDateAfter'].addEventListener('change', (event) => {
        query.date.after = new Date(event.target.value).toISOString().split('T')[0];
        formatPrompt(query);
    });

    // Handle date before changes
    form.elements['pubDateBefore'].addEventListener('change', (event) => {
        query.date.before = new Date(event.target.value).toISOString().split('T')[0];
        formatPrompt(query);
    });
});

// Function to submit the search
export function submitSearch(queryId, newData) {
    const queryWithMetadata = { ...query, id: uuidv4(), createdAt: new Date() };

    let storedQueries = localStorage.getItem('queryiq') ? JSON.parse(localStorage.getItem('queryiq')) : [];

    if (queryId != "" && newData) {
        // Update an existing query
        storedQueries = storedQueries.map(item => {
            if (item.id === queryId) {
                return { ...item, ...newData };
            }
            return item;
        });
    } else {
        // Add a new query
        storedQueries.push(queryWithMetadata);
    }
    
    localStorage.setItem('queryiq', JSON.stringify(storedQueries));
    
    // Build the prompt for the search
    const promptData = newData || query;
    const prompt = formatPrompt(promptData);
    const url = `https://www.google.com/search?q=${encodeURIComponent(prompt)}`;
    
    window.open(url, '_blank');
}

// Add event listener for the submit button
submitButton.addEventListener('click', () => submitSearch());
