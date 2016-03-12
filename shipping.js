
//returns shortest shipping time based on product_id and customer zipcode

$(document).ready(function () {
    getFastestGrid(["KC2000", "TWR1501"]);
//    getFastestGrid(["KC2000"]);
});

//global storage for existing warehouse zips and delivery_times
this.existing_warehouse_data = [];

this.pWarehouses = [];
pWarehouses["KC2000"] = ["78756", "90210"];
pWarehouses["TWR1501"] = ["10001", "90210"];
pWarehouses["ES1500"] = ["10001"];

var numCalled = 0;

function getCZip() {
    return "78703";
}

function calculateTime(zip1, zip2) {

    numCalled++;
    if (zip2 == "90210") {
	return 5;
    }
    else if (zip2 == "10001") {
	return 4;
    }
    else if (zip2 == "78756") {
	return 2;
    }

    return 2;
}

function getProductWarehouses(productID) {
    return pWarehouses[productID];
}


function getFastest(ProductId) {
    var czip = getCZip();
    var times = [];

    var warehouse_ids = getProductWarehouses(ProductId);

    warehouse_ids.forEach(function (index, id) {
	var calc_time = calculateTime(id, czip);
	times.push(calc_time);
    });

    var min_time = Array.min(times);
    return min_time;
}

function getFastestGrid(ProductIds) {

    var fastest_times = [];

    ProductIds.forEach(function (product_id) {
	var values = [];
	var delivery_times = getDeliveryTimes(product_id);

	for (var key in delivery_times) {
	    //look at right side (time) of zip_time element in the array.
	    var time = delivery_times[key].split('_')[1];
	    values.push(Number.parseInt(time));
	}

	var fastest_time = Array.min(values);
	var product_delivery_time = {};
	product_delivery_time[product_id] = fastest_time;
	fastest_times.push(product_delivery_time);

    });
    
    return fastest_times;

}

function getDeliveryTimes(ProductId) {

    var warehouse_zips = getProductWarehouses(ProductId);
    var delivery_times = [];

    warehouse_zips.forEach(function (wzip) {
	//check to prevent redudant calls to calculateTime for same warehouse.
	if (getExistingWZipTimes(wzip).length === 0) {
	    var time = calculateTime(getCZip(), wzip);
	    //create zip_time element and push 
	    delivery_times.push(wzip + '_' + time);
	    this.existing_warehouse_data.push(wzip + '_' + time);
	} else {
	    //we have a warehouse zip_time already stored, get it from there.
	    var wzip_times = getExistingWZipTimes(wzip);
	    //looping not quite necessary in this use case, but as more warehouses hold a product, we will have >1 in the array.
	    wzip_times.forEach(function (wzip_time) {
		delivery_times.push(wzip_time);
		this.existing_warehouse_data.push(wzip_time);
	    });
	}
    });

    return delivery_times;

}

function getExistingWZipTimes(zip) {

    var wzip_times = [];

    this.existing_warehouse_data.forEach(function (wzip_time) {
	//take left side (zip) of zip_time element.
	var wzip = wzip_time.split('_')[0];
	if (wzip === zip) {
	    wzip_times.push(wzip_time);
	}
    });

    return wzip_times;

}

Array.min = function (array) {

    return Math.min.apply(Math, array);

};
