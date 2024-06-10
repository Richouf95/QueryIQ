import {submitSearch} from './blankRequest.js';

function removePopUp() {
    const popUp = document.getElementById('darkBackground');
    if (popUp != null) popUp.parentNode.removeChild(popUp);
}

function updateForm (data) {
    const popupContent = document.getElementById('popupContent');
    if (popupContent) {
        while (popupContent.firstChild) {
            popupContent.removeChild(popupContent.firstChild)
        }
    }

    const title = document.createElement('div');
    title.id = "historyContentTitle";
    popupContent.innerHTML = `
        <h3 style='text-align: center; font-size:2em; margin: 20px 0px; color: black'>Query ${data.id.substring(0,8)}...</h3>
    `;
    popupContent.appendChild(title);

    popupContent.style.height = "40rem";
    popupContent.style.overflow = "scroll"

    const updateFormulare = document.createElement('form');
    

    const queryImput = document.createElement('div');
    queryImput.id = `queryImput`;
    queryImput.innerHTML = `
        <div class="etape" id="etape1" style='color: black'>
            <label>Terms of your research?</label><br>
            <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <span>Termes exact ?</span>
                <div style="display: flex; align-items: center; margin-left: 10px; margin-right: 10px;">
                    <label for="yesCasse">Yes</label>
                    <input style="margin-right: 5px; margin-left: 5px;" type="radio" name="casseOnUpdate"
                        id="yesCasse" value="yes" ${data.keyWord.casse && "checked"}>
                </div>
                <div style="display: flex; align-items: center">
                    <label for="noCasse">No</label>
                    <input style="margin-right: 5px; margin-left: 5px;" type="radio" name="casseOnUpdate"
                        id="noCasse" value="no" ${!data.keyWord.casse && "checked"}>
                </div>
            </div>
            <input type="text" id="updateKeyWorkImput" name="keyWorkOnUpdate" value="${data.keyWord.query}">
        </div>
        <hr style="margin-top: 10px; margin-bottom: 10px" />
    `;
    updateFormulare.appendChild(queryImput);

    const onSiteImput = document.createElement('div');
    onSiteImput.id = `onSiteImput`;
    onSiteImput.innerHTML = `
        <div class="etape" id="etape2">
            <label>On some site ?</label><br>
            <input type="text" id="onSiteInput" name="onSiteUpdate" value="${data.onSite}">
        </div>
        <hr style="margin-top: 10px; margin-bottom: 10px" />
    `;
    updateFormulare.appendChild(onSiteImput);

    const ressourceTypeImput = document.createElement('div');
    ressourceTypeImput.id = `ressourceTypeImput`;
    ressourceTypeImput.innerHTML = `
        <div class="etape" id="etape3">
            <span style="color:black">Which type of ressource are you searching for ?</span>
            <!-- etape0Content -->
            <div id="etape0Content">
                <div style="display: flex; justify-content: center;">
                    <div
                        style="display: flex; flex-direction: column; justify-content: center; margin: 10px;">
                        <img src="assets/pdf.png" alt="pdfImage" width="100" style="border-radius: 20px;">
                        <input
                            style="text-align: center; width: 100%; margin-top: 20px; transform: scale(1.5);"
                            type="radio" id="pdf" name="ressourceTypeOnUpdate" value="pdf" ${data.documentType === "pdf" && "checked"}>
                    </div>
                    <div
                        style="display: flex; flex-direction: column; justify-content: center; margin: 10px;">
                        <img src="assets/doc.png" alt="docImage" width="100" style="border-radius: 20px;">
                        <input
                            style="text-align: center; width: 100%; margin-top: 20px; transform: scale(1.5);"
                            type="radio" id="doc" name="ressourceTypeOnUpdate" value="doc" ${data.documentType === "doc" && "checked"}>
                    </div>
                </div>
            </div>
        </div>
        <hr style="margin-top: 10px; margin-bottom: 10px" />
    `;
    updateFormulare.appendChild(ressourceTypeImput);

    const publishAfterDateImput = document.createElement('div');
    publishAfterDateImput.id = `publishDateImput`;
    publishAfterDateImput.innerHTML = `
        <div class="etape" id="etape4">
            <label>Publication after date</label><br>
            <input type="date" id="pubDateImput" name="pubAfterDateOnUpdate" value="${data.date.after ? data.date.after : ""}">
        </div>
    `;
    updateFormulare.appendChild(publishAfterDateImput);

    const publishBeforeDateImput = document.createElement('div');
    publishBeforeDateImput.id = `publishDateImput`;
    publishBeforeDateImput.innerHTML = `
        <div class="etape" id="etape4">
            <label>Publication before date</label><br>
            <input type="date" id="pubDateImput" name="pubBeforeDateOnUpdate" value="${data.date.before ? data.date.before : ""}">
        </div>
    `;
    updateFormulare.appendChild(publishBeforeDateImput);

    popupContent.appendChild(updateFormulare);

    const divAction = document.createElement('div');
    divAction.id = "divAction";
    divAction.innerHTML = `
        <button id="actionUpdate" onclick="(() => {
            const popUp = document.getElementById('darkBackground');
            if (popUp != null) popUp.parentNode.removeChild(popUp);
        })()">Cancel</button>
        <button id="actionResearch">Research</button>
    `;

    popupContent.appendChild(divAction);

    let queryUpdated = {...data};

    updateFormulare.elements['casseOnUpdate'].forEach(radio => {
        radio.addEventListener('change', (event) => {
            const value = event.target.value;
            if (value === 'no') queryUpdated.keyWord.casse = false;
            if (value === 'yes') queryUpdated.keyWord.casse = true;
        });
    });

    updateFormulare.elements['keyWorkOnUpdate'].addEventListener('change', (event) => {
        const value = event.target.value;
        queryUpdated.keyWord.query = value;
    });

    updateFormulare.elements['onSiteUpdate'].addEventListener('change', (event) => {
        const value = event.target.value;
        queryUpdated.onSite = value;
    });

    // Radios for 'ressourceType'
    const ressourceTypeRadios = document.querySelectorAll('input[name="ressourceTypeOnUpdate"]');
    ressourceTypeRadios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            const value = event.target.value;
            queryUpdated.documentType = value;
        });
    });

    updateFormulare.elements['pubAfterDateOnUpdate'].addEventListener('change', (event) => {
        const value = new Date(event.target.value)
        queryUpdated.date.before = value.toISOString().split('T')[0];
    });

    updateFormulare.elements['pubBeforeDateOnUpdate'].addEventListener('change', (event) => {
        const value = new Date(event.target.value)
        queryUpdated.date.before = value.toISOString().split('T')[0];
    });

    const research = document.getElementById('actionResearch');
    research.addEventListener('click', () => {
        submitSearch(data.id, queryUpdated);
        const popUp = document.getElementById('darkBackground');
        if (popUp != null) popUp.parentNode.removeChild(popUp);
    })
    
}

export function historyContent(data) {

    const tagId = data.id;
    const historyId = tagId.substring(8, tagId.length);

    const storage = JSON.parse(localStorage.getItem('queryiq'));

    const history = storage.filter(x => x.id === historyId)[0];

    const darkBackground = document.createElement('div');
    darkBackground.id = "darkBackground";

    const popupContent = document.createElement('div');
    popupContent.id = 'popupContent';

    const title = document.createElement('div');
    title.id = "historyContentTitle";
    title.innerHTML = `
        <h3 style='text-align: center; font-size:2em; margin: 20px 0px; color: black'>Query ${history.id.substring(0,8)}...</h3>
        <img src="../assets/close.png" alt="close" id="closePopUp" onclick="(() => {
            const popUp = document.getElementById('darkBackground');
            if (popUp != null) popUp.parentNode.removeChild(popUp);
        })()"/>
    `;

    // Ajout de l'élément closePopUp
    popupContent.appendChild(title);

    const q = document.createElement('div');
    q.innerHTML = `
        <h5 style="font-size: 20px; margin: 20px 0px 10px 20px; color: black">Query :</h5>
        <hr style="width:90%; margin: auto">
        <div style='padding:10px'></div>
        <span style="background: #1F1F1F; padding: 5px 10px; margin: 40px 35px; border-radius: 20px;">${history.keyWord.query}</span>
    `;
    if (history.keyWord.query !== "") popupContent.appendChild(q);

    const s = document.createElement('div');
    s.innerHTML = `
        <h5 style="font-size: 20px; margin: 20px 0px 10px 20px; color: black">On site :</h5>
        <hr style="width:90%; margin: auto">
        <div style='padding:10px'></div>
        <span style="background: #1F1F1F; padding: 5px 10px; margin: 40px 35px; border-radius: 20px">${history.onSite}</span>
    `;
    if (history.onSite) popupContent.appendChild(s);

    const f = document.createElement('div');
    f.innerHTML = `
        <h5 style="font-size: 20px; margin: 20px 0px 10px 20px; color: black">File type :</h5>
        <hr style="width:90%; margin: auto">
        <div style='padding:10px'></div>
        <span style="background: #1F1F1F; padding: 5px 10px; margin: 40px 35px; border-radius: 20px">${history.documentType}</span>
    `;
    if (history.documentType) popupContent.appendChild(f);

    const dAfter = document.createElement('div');
    dAfter.innerHTML = `
        <h5 style="font-size: 20px; margin: 20px 0px 10px 20px; color: black"">Publish after :</h5>
        <hr style="width:90%; margin: auto">
        <div style='padding:10px'></div>
        <span style="background: #1F1F1F; padding: 5px 10px; margin: 40px 35px; border-radius: 20px">${history.date.after}</span>
    `;

    const dBefore = document.createElement('div');
    dBefore.innerHTML = `
        <h5 style="font-size: 20px; margin: 20px 0px 10px 20px; color: black"">Publish before :</h5>
        <hr style="width:90%; margin: auto">
        <div style='padding:10px'></div>
        <span style="background: #1F1F1F; padding: 5px 10px; margin: 40px 35px; border-radius: 20px">${history.date.before}</span>
    `;
    history.date.after && popupContent.appendChild(dAfter);
    history.date.before && popupContent.appendChild(dBefore);

    const divAction = document.createElement('div');
    divAction.id = "divAction";
    divAction.innerHTML = `
        <button id="actionUpdate">Update</button>
        <button id="actionResearch">Research</button>
    `;

    popupContent.appendChild(divAction)

    darkBackground.appendChild(popupContent);

    document.body.appendChild(darkBackground);

    const research = document.getElementById('actionResearch');
    research.addEventListener('click', () => {
        submitSearch("", history);
        const popUp = document.getElementById('darkBackground');
        if (popUp != null) popUp.parentNode.removeChild(popUp);
    })

    const bt = document.getElementById('actionUpdate');
    bt.addEventListener('click', () => updateForm(history))
}
