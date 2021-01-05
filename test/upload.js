$(document).ready(function (){
    $("#upload").click(function (){
        var img = document.querySelector("input[type='file']");
        var formdata = new FormData();
        formdata.append("file",img.files[0]);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
        fetch("http://172.26.36.228/api/images/upload", requestOptions)
        .then(response=>{
            if(response.status===201){
                response.json().then(function (json){
                        var path = json.path;
                        var myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
                        var urlencoded = new URLSearchParams();
                        urlencoded.append("fpath", path);
                        var reqOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: urlencoded,
                            redirect: 'follow'
                        };
                        fetch("http://172.26.36.228/api/images/classify", reqOptions)
                        .then(response => {
                            if(response.status===200){
                                window.alert(response.text());
                            }
                        })
                        .catch(error => console.log('error', error));
                })
            }
        })
    })
})
