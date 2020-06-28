const urlAPI = 'http://api.mapid.io/blog/get_list_docs_public/blog';

drawComponent(urlAPI);

/**
 * fetching data from API 
 */
function fetchAPIAll(urlAPI) {
    fetch(urlAPI)
        .then((res) => res.json()) //tranform data to json
        .then(function (data) {
            let dataLength = data.length;

            for (let index = 0; index < dataLength; index++) {
                let objEditor = JSON.parse(data[index].editorState);
                let dateEditor = data[index].date;
                let name_author = data[index].authors[0].user.full_name;
                let name_author_id = data[index].authors[0].user.name;
                let objBlockEditor = objEditor.blocks.length;


                let arrayObjImage = [];
                arrayObjImage = objEditor.entityMap;

                if (Object.keys(arrayObjImage).length != 0) {

                    let images = arrayObjImage[0].data.src;
                    let title = data[index].title;

                    componentHeadline(images, title);

                    for (let indexObj = 0; indexObj < objBlockEditor; indexObj++) {
                        let textEditor = objEditor.blocks[indexObj].text;

                        if (textEditor != "" && textEditor != " ") {
                            let content = objEditor.blocks[indexObj].text;
                            let date_publish = new Date(dateEditor);

                            year = date_publish.getFullYear();
                            month = date_publish.getMonth() + 1;
                            dt = date_publish.getDate();

                            if (dt < 10) {
                                dt = '0' + dt;
                            }
                            if (month < 10) {
                                month = '0' + month;
                            }
                            date_publish = month + " " + dt + " " + year;

                            componentContent(name_author_id, name_author, date_publish, content);
                        }
                    }
                }
            }
        }).catch(function (error) {
            console.log(error, "Fetching API error");
        });
}

/**
 * create component
 */
function componentHeadline(images, title) {
    let output = "";
    output += `
        <div class="wrapper-headline">
        <!-- image headline -->
        <div class="image-headline">
            <img src="${images}" alt="headline images">
        </div>
        <!-- title headline -->
        <div class="title-headline">
            <h1>${title}</h1>
        </div>
        </div>`;

    let triggerHeadline = document.querySelector('#component');
    triggerHeadline.innerHTML += output;
}

function componentContent(name_author_id, name_author, date_publish, content) {
    let output2 = "";
    output2 += `<div class="main-wrapper-content">`;
    output2 += `<div class="wrapper-author" id="${name_author_id}">
                <!-- image author -->
                <div class="images-author" >
                <img src="https://doc.mapid.io/static/media/profile_pic_comment.2a6f2a32.svg" alt="images author">
                </div>
                <div class="wrapper-detail-author">
                    <!-- name author -->
                    <div class="name-author">
                        <p>${name_author}</p>
                        </div>
                    <!-- date publish content -->
                    <div class="date-author">
                    <p>${date_publish}</p>
                    </div>
                </div>
                </div>`;
    output2 += `<!-- content article -->
                <div class="wrapper-content">
                    <p>
                        ${content}
                    </p>
                </div>
                </div>`;

    // remove duplicate element
    const st = new Set();
    for (const div of document.querySelectorAll(`#${name_author_id}`)) {
        if (st.has(div.textContent.trim())) {
            div.parentNode.removeChild(div);
        }
        st.add(div.textContent.trim());
    }
    let triggerHeadline = document.querySelector('#component');
    triggerHeadline.innerHTML += output2;

}

/**
 * draw component & fill data from fetching API
 */
function drawComponent(urlAPI) {
    fetchAPIAll(urlAPI);
}