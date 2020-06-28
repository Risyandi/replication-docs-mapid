// fetch data from API
const urlAPI = 'http://api.mapid.io/blog/get_list_docs_public/blog';

fetch(urlAPI)
    .then((res) => res.json()) //tranform data to json
    .then(function (data) {
        let dataLength = data.length;
        console.log(data);

        for (let index = 0; index < dataLength; index++) {
            console.log(data[index]);

            let obj = JSON.parse(data[index].editorState);
            console.log(obj);

            // object artictles length
            let objLength = obj.blocks.length;

            // object images length
            let objImageLength = [];
            objImageLength = obj.entityMap;
            if (Object.keys(objImageLength).length != 0) {
                console.log(objImageLength, "-->", Object.keys(objImageLength).length);
            }
            let lengthEntity = Object.keys(objImageLength).length;

            for (let indexObj = 0; indexObj < objLength; indexObj++) {
                let valueText = obj.blocks[indexObj].text;

                if (valueText != "" && valueText != " ") {
                    console.log(obj.blocks[indexObj].text);
                }
            }

            for (let indexObjImage = 0; indexObjImage < lengthEntity; indexObjImage++) {
                let valueType = obj.entityMap[indexObjImage].type;
                if (valueType != "link") {
                    console.log(obj.entityMap[indexObjImage].data.src);
                }

                if (valueType != "image") {
                    if (valueType == "link") {
                        console.log(obj.entityMap[indexObjImage].data.link_text);
                        console.log(obj.entityMap[indexObjImage].data.link_url);
                    }
                    if (valueType == "LINK") {
                        console.log(obj.entityMap[indexObjImage].data.href);
                        console.log(obj.entityMap[indexObjImage].data.url);
                    }
                }
            }

        }
    }).catch(function () {
        console.log("Fetching API error");
    });