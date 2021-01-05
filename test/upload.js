$(document).ready(function (){
    $("#upload").click(function (){
        var path;
        var img = document.querySelector("input[type='file']");
        var formdata = new FormData();
        formdata.append("file",img.files[0]);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
        for(let i=0;i<5;i++){
            fetch("http://172.26.36.228/api/images/upload", requestOptions)
                .then(response=>response.json().then(function (json){
                    var path = json.path
                    console.log(path);
                    break;
            }))
        }
    })
})
