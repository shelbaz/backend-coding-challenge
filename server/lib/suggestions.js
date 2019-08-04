import {City} from "../models/cities"

function getSuggestions(){

}

function calculateDistance(c1_longtitude, c1_latitude, c2_longtitude, c2_latitude){
    if ((c1_latitude == c2_latitude)     && 
        (c1_longtitude == c2_longtitude) || 
        (!c1_latitude || !c2_latitude || !c1_longtitude || !c2_longtitude)
        ){
		return 0;
	}
	else {
            var p = 0.017453292519943295;    // Math.PI / 180
            var c = Math.cos;
            var a = 0.5 - c((lat2 - lat1) * p)/2 + 
                    c(lat1 * p) * c(lat2 * p) * 
                    (1 - c((lon2 - lon1) * p))/2;
          
            return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
	}
}