// function ouvrirRechercheGoogle() {
//     // Remplacez 'votre mot clé' par le mot clé que vous souhaitez rechercher
//     var motCle = 'site:codeloccol.org';
//     var url = 'https://www.google.com/search?q=' + encodeURIComponent(motCle);
//     window.open(url, '_blank');
// }

// const expression = document.getElementById('keyWord');
// const siteUrl = document.getElementById('onSite');
// const fileType = document.getElementsByName('ressourceType');
// const date = document.getElementById('pubDate');

// let query = {
//     keyWord: "",
//     onSite: "",
//     documentType: "",
//     date: ""
// }


// expression.addEventListener('change', (e) => {
//     e.preventDefault();
//     query.keyWord = e.target.value;
//     console.log(query);
// })

// siteUrl.addEventListener('change', (e) => {
//     e.preventDefault();
//     query.onSite = e.target.value;
//     console.log(query);
// })

// function getSelectedValue() {
//     var radios = document.getElementsByName('ressourceType');
//     var selectedValue = null;
//     for (var i = 0; i < radios.length; i++) {
//         if (radios[i].checked) {
//             selectedValue = radios[i].value;
//             break;
//         }
//     }
//     if (selectedValue) {
//         alert('Selected resource type: ' + selectedValue);
//     } else {
//         alert('No resource type selected');
//     }
// }


// Get ressource value
// function getSelectedValue() {
//     var radios = document.getElementsByName('ressourceType');
//     var selectedValue = null;
//     for (var i = 0; i < radios.length; i++) {
//         if (radios[i].checked) {
//             selectedValue = radios[i].value;
//             break;
//         }
//     }
//     if (selectedValue) {
//         console.log('Selected resource type: ' + selectedValue);
//     } else {
//         console.log('No resource type selected');
//     }
// }

const submit = document.getElementById('headerSubmitBtn');
const userPrompt = document.getElementById('userPrompt');

export let query = {
    keyWord: {query: null, casse: false},
    onSite: null,
    documentType: null,
    date: {
        after: null,
        before: null
    }
}

function formatPrompt (data) {
    let prompt = `${data.keyWord.query != null | false ? data.keyWord.casse == true ? `intext:"${data.keyWord.query}"` : `intext:${data.keyWord.query}` : ""} ${data.onSite != null | false ? `site:${data.onSite}` : ""} ${data.documentType != null | false ? `filetype:${data.documentType}` : ""} ${data.date.after != null | false ? `after:${data.date.after}` : ""} ${data.date.before != null | false ? `before:${data.date.before}` : ""}`;
    userPrompt.value = prompt
}


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    // Ajouter des écouteurs de changement sur les éléments du formulaire
    form.elements['casse'].forEach(radio => {
        radio.addEventListener('change', (event) => {
            const value = event.target.value;
            if (value === 'no') query.keyWord.casse = false;
            if (value === 'yes') query.keyWord.casse = true;
        });
    });

    form.elements['keyWord'].addEventListener('change', (event) => {
        const value = event.target.value;
        query.keyWord.query = value;
        formatPrompt(query)
    });

    form.elements['onSite'].addEventListener('change', (event) => {
        const value = event.target.value;
        query.onSite = value;
        formatPrompt(query)
    });

    // Radios for 'ressourceType'
    const ressourceTypeRadios = document.querySelectorAll('input[name="ressourceType"]');
    ressourceTypeRadios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            const value = event.target.value;
            query.documentType = value;
            formatPrompt(query)
        });
    });

    form.elements['pubDateAfter'].addEventListener('change', (event) => {
        const value = new Date(event.target.value)
        query.date.after = value.toISOString().split('T')[0];
        console.log(query)
        formatPrompt(query)
    });

    form.elements['pubDateBefore'].addEventListener('change', (event) => {
        const value = new Date(event.target.value)
        query.date.before = value.toISOString().split('T')[0];
        console.log(query)
        formatPrompt(query)
    });
});

export function submitSearch (queryId, newData) {
    const q = {...query, id: uuidv4(), createdAt: new Date()};
    if (!localStorage.getItem('queryiq')) 
        localStorage.setItem('queryiq', JSON.stringify([q]));
    else {
        let old = JSON.parse(localStorage.getItem('queryiq'));
        if (queryId && newData) {
            old.map(i => {
                if (i.id == queryId) {
                    i.keyWord.query = newData.keyWord.query;
                    i.keyWord.casse = newData.keyWord.casse;
                    i.onSite = newData.onSite;
                    i.documentType = newData.documentType;
                    i.data = newData.Date;
                }
            })
            localStorage.removeItem('queryiq');
            localStorage.setItem('queryiq', JSON.stringify(old));
            let prompt = `${newData.keyWord.query != null | false ? newData.keyWord.casse == true ? `intext:"${newData.keyWord.query}"` : `intext:${newData.keyWord.query}` : ""} ${newData.onSite != null | false ? `site:${newData.onSite}` : ""} ${newData.documentType != null | false ? `filetype:${newData.documentType}` : ""} ${newData.date.after != null | false ? `after:${newData.date.after}` : ""} ${newData.date.before != null | false ? `before:${newData.date.before}` : ""}`;
            var url = 'https://www.google.com/search?q=' + encodeURIComponent(prompt);
            window.open(url, '_blank');
            return;
        } else {
            localStorage.setItem('queryiq', JSON.stringify([...old, q]));
            var url = 'https://www.google.com/search?q=' + encodeURIComponent(userPrompt.value);
            window.open(url, '_blank');
        }
    }
}

submit.addEventListener('click', () => submitSearch());