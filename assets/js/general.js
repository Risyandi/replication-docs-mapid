let sidebarButton = document.querySelector('#sidebar-hide');
let wrapperSidebar = document.querySelector('#wrapper-sidebar');
let sidebarIcon = document.querySelector('#sidebar-icon');

sidebarButton.addEventListener('click', hideElement);
window.addEventListener('scroll', stickyMenu);

// hide element
function hideElement() {
    wrapperSidebar.classList.toggle("hide-sidebar");
    sidebarButton.classList.toggle("off-sidebar");
    sidebarIcon.classList.toggle("fa-flip-horizontal");
}

// sticky and hide menu
function stickyMenu() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        wrapperSidebar.classList.remove("sticky");
        wrapperSidebar.classList.add("sticky");
        sidebarButton.classList.remove("sticky-top-hide");
        sidebarButton.classList.add("sticky-top");
    } else {
        wrapperSidebar.classList.remove("sticky");
        wrapperSidebar.classList.add("non-sticky");
        sidebarButton.classList.remove("sticky-top");
        sidebarButton.classList.add("sticky-top-hide");
    }
}