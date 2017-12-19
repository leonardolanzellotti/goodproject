var MetadataService = {
    search: function (queryString, sourceLanguage, targetLanguage) {
        var request = $.ajax({
            "type": "GET",
            "dataType": "json",
            "url": encodeURI("metadata_service.php?type=0&data=" + queryString + "&sourceLanguage=" + sourceLanguage + "&targetLanguage=" + targetLanguage),
            "async": true
        });
        return request;
    },
    translate: function (content, sourceLanguage, targetLanguage) {
        var request = $.ajax({
            "type": "GET",
            "dataType": "json",
            "url": encodeURI("metadata_service.php?type=1&data=" + JSON.stringify(content) + "&sourceLanguage=" + sourceLanguage + "&targetLanguage=" + targetLanguage),
            "async": true
        });
        return request;
    }
};