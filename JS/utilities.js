export function removeByClass(className) {
    className = "." + className;
    document.querySelectorAll(className).forEach(function(a){
        a.remove()
    })
}