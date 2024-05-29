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

// console.log(query);

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

const uniqueId = uuidv4();
console.log(uniqueId)

const submit = document.getElementById('headerSubmitBtn');
const userPrompt = document.getElementById('userPrompt');

export let query = {
    keyWord: {query: "", casse: false},
    onSite: "",
    documentType: "",
    date: ""
}

function formatPrompt (data) {
    let prompt = `${data.keyWord.query && `intext:${data.keyWord.query}`} ${data.onSite && `site:${data.onSite}`} ${data.documentType && `filetype:${data.documentType}`} ${data.date && `after:${data.date}`}`;
    userPrompt.value = prompt
}


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    // Fonction pour afficher les données récupérées
    const displayData = (id, value) => {
        console.log(`ID: ${id}, Value: ${value}`);
    };

    // Ajouter des écouteurs de changement sur les éléments du formulaire
    form.elements['casse'].forEach(radio => {
        radio.addEventListener('change', (event) => {
            const value = event.target.value;
            // displayData(event.target.id, event.target.value);
            if (value === 'no') query.keyWord.casse = false;
            if (value === 'yes') query.keyWord.casse = true;
        });
    });

    form.elements['keyWord'].addEventListener('change', (event) => {
        const value = event.target.value;
        // displayData(event.target.id, event.target.value);
        query.keyWord.query = value;
        formatPrompt(query)
    });

    form.elements['onSite'].addEventListener('change', (event) => {
        const value = event.target.value;
        // displayData(event.target.id, event.target.value);
        query.onSite = value;
        formatPrompt(query)
    });

    // Radios for 'ressourceType'
    const ressourceTypeRadios = document.querySelectorAll('input[name="ressourceType"]');
    ressourceTypeRadios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            const value = event.target.value;
            // displayData(event.target.id, event.target.value);
            query.documentType = value;
            formatPrompt(query)
        });
    });

    form.elements['pubDate'].addEventListener('change', (event) => {
        const value = event.target.value;
        // displayData(event.target.id, event.target.value);
        query.date = value;
        formatPrompt(query)
    });
});

submit.addEventListener('click', () => {
    const q = {...query, id: uuidv4(), createdAt: new Date()};
    if (!localStorage.getItem('queryiq')) 
        localStorage.setItem('queryiq', JSON.stringify([q]));
    else {
        const old = JSON.parse(localStorage.getItem('queryiq'));
        localStorage.setItem('queryiq', JSON.stringify([...old, q]));
        // const history = JSON.parse(localStorage.getItem('queryiq'));
        // console.log("=> History :\n", history)
    }
    // console.log(q)
});