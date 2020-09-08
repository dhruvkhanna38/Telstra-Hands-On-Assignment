import Articles from "./models/article"

fetch("http://localhost:3000/articles?include=comments").
        then(function(response: Response){
            return response.json();
        }).then(function(articles:Articles[]){
            console.log(articles);
            const grid = <HTMLElement>document.querySelector("#grid");
            articles.forEach((article) => {
                grid.innerHTML += `<div class="col col-lg-4 col-md-6 col-xs-12" >
                                        <div class="card" style="width: 18rem;">
                                            <img class="card-img-top" src="${article.imageUrl}" alt="Card image cap">
                                            <div class="card-body">
                                                <h5 class="card-title">${article.title}</h5>
                                                <p class="card-text">${article.author}</p>
                                                <p class="card-text">${article.abstract}</p>
                                            </div>
                                        </div>
                                    </div>
                                    `
            });
        }).catch(error=>console.log(error));
