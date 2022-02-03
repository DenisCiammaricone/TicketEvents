import { bookEvent, getUserShoppingCart, setCartAsOrdered } from "./db_impl.js"

document.getElementById("prenota").onclick = function() {
    getUserShoppingCart().then((events) => {
        setCartAsOrdered(events);
        events.forEach(element => {
            bookEvent(element);
        });
    });

}