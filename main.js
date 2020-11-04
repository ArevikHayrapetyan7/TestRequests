let getButton = document.getElementById('getUser');
let addButton = document.getElementById('addUser');
let id = document.getElementById('userId');
let formEl = document.getElementById('formEl');
let idArray = [];

let fetching = async (url) => {
    if (!idArray.includes(id["value"])) {
        await fetch(url).then((resp) => {
            return resp.json();
        })
            .then((resp) => {
                let p = document.createElement("p");
                let data = resp["data"];
                for (let prop in data) {
                    if (prop === "avatar") {
                        let img = document.createElement("img");
                        img.setAttribute("src", data[prop]);
                        img.setAttribute("alt", data["first_name"])
                        document.getElementById("add").append(img);
                    } else {
                        let p = document.createElement("p");
                        p.innerText = `${prop}  :   ${data[prop]}`;
                        document.getElementById("add").append(p);
                    }
                }
                ;
            });
    }
    idArray.push(id["value"]);
}
let posting = async (url = '') => {
    await fetch(url, {
        method: 'POST',
        body: new FormData(formEl)
    })
        .then((resp) => {
            if (resp.ok) {
                console.log(resp);
            }
            return resp.json();
        }).then((resp) => {
            console.log(resp);
        });
}

getButton.addEventListener('click', () => fetching(`https://reqres.in/api/users/${id["value"]}`));
addButton.addEventListener('click', () => posting("https://reqres.in/api/users"));
