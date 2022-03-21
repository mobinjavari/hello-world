

function ToggleShowComments()
{
    if(window.document.getElementsByClassName('comment-list')[0].style.display == "none"){
        window.document.getElementsByClassName('comment-list')[0].style.display = "inline";
        window.document.getElementsByClassName('toggle-show-comments')[0].textContent = "بستن نظرات";

    }
    else if(window.document.getElementsByClassName('comment-list')[0].style.display == "inline"){
        window.document.getElementsByClassName('comment-list')[0].style.display = "none";
        window.document.getElementsByClassName('toggle-show-comments')[0].textContent = "مشاهده نظرات";
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

window.onscroll = function() {ScrollBar()};

function ScrollBar() {
    var PageScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (PageScroll / height) * 100;
    document.getElementsByClassName("scroll-nav-effect")[0].style.width = scrolled + "%";
}

function Copy_Text(input_id) {
    var copyText = document.getElementById(input_id);
    navigator.clipboard.writeText(copyText.textContent);
    alert("کپی شد !");
}