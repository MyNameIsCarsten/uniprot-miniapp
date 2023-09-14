
const apiUrl = 'https://rest.uniprot.org/uniprotkb/';
const searchBox = document.querySelector('.search input')
const searchBtn = document.querySelector('.search button')

// Fetch data from the API
async function getInfo(acc_num) {
    const response = await fetch(apiUrl + `${acc_num}` + '.xml');
    let data = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, 'text/xml');

    console.log(xmlDoc);

    // Access XML data
    const entryNode = xmlDoc.querySelector('entry'); // Get the first 'entry' element
    if (entryNode) {
        tempList = ['name', 'fullName', 'shortName', 'gene', 'organism', 'sequence'];
        tempDict = {
            'name': 'Name',
            'fullName': 'Full Name',
            'shortName': 'Short Name',
            'gene': 'Gene',
            'organism': 'Organism',
            'sequence': 'Sequence'
        }

        for (let i = 0; i < tempList.length; i++) {
            let entryName = tempDict[tempList[i]];
            
            let entryValue = entryNode.querySelector(tempList[i]);
            console.log(entryValue);
            if (entryValue.innerHTML.includes('name')){
                entryValue = entryValue.querySelector('name').innerHTML;
            } else {
                entryValue = entryValue.innerHTML;
            }

            let tag = document.createElement('p');
            let textName = document.createTextNode(`${entryName}: `);
            let textValue = document.createTextNode(`${entryValue}`);
            let span = document.createElement('span');
            tag.appendChild(span);
            span.appendChild(textName);
            tag.appendChild(textValue);
            const element = document.querySelector('.col');
            element.appendChild(tag);

        }

    } else {
        console.log('Entry not found');
    }

    document.querySelector('.protein').style.display = 'flex';
    document.querySelector('#acc_num').innerHTML = acc_num;
}



searchBtn.addEventListener('click', () => {
    getInfo(searchBox.value);
})
