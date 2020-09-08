fetch("http://localhost:3000/articles?include=comments").
    then(function (response) {
    return response.json();
}).then(function (articles) {
    console.log(articles);
    var grid = document.querySelector("#grid");
    articles.forEach(function (article) {
        grid.innerHTML += "<div class=\"col col-lg-4 col-md-6 col-xs-12\" >\n                                        <div class=\"card\" style=\"width: 18rem;\">\n                                            <img class=\"card-img-top\" src=\"" + article.imageUrl + "\" alt=\"Card image cap\">\n                                            <div class=\"card-body\">\n                                                <h5 class=\"card-title\">" + article.title + "</h5>\n                                                <p class=\"card-text\">" + article.author + "</p>\n                                                <p class=\"card-text\">" + article.abstract + "</p>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    ";
    });
}).catch(function (error) { return console.log(error); });
export {};
