

function ToggleShowComments()
{
    if(window.document.getElementsByClassName('comment-list')[0].style.display == "none"){
        window.document.getElementsByClassName('comment-list')[0].style.display = "inline";
        window.document.getElementsByClassName('toggle-show-comments')[0].textContent = "بستن نظرات ...";

    }
    else if(window.document.getElementsByClassName('comment-list')[0].style.display == "inline"){
        window.document.getElementsByClassName('comment-list')[0].style.display = "none";
        window.document.getElementsByClassName('toggle-show-comments')[0].textContent = "مشاهده نظرات ...";
    }    
}


function OpenLink(url,protocol)
{
    switch (protocol) {
        case "page":
            location.href = url;
            break;

        case "http":
            location.href = 'http://'+url;
            break;
    
        default:
            location.href = 'https://'+url;
            break;
    }
}