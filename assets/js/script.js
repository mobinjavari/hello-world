

function ShowComments()
{
    if(window.document.getElementById('comments').style.display == "none"){
        window.document.getElementById('comments').style.display = "inline";
    }
    else if(window.document.getElementById('comments').style.display == "inline"){
        window.document.getElementById('comments').style.display = "none";
    }    
}

function OpenLink(url)
{
    location.href = 'https://'+url;
}