import '../css/style.css';
import './plugins';
import locations from "./store/locations";


locations.init().then(res => {
    locations.createCarts();
    locations.filter();
});
