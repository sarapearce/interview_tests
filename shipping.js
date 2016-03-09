$(document).ready(function () {
    getFastestGrid(["KC2000", "TWR1501"]);
});

this.pWarehouses = [];
pWarehouses["KC2000"] = ["78756", "90210"];
pWarehouses["TWR1501"] = ["10001", "90210"];
pWarehouses["ES1500"] = ["10001"];

var numCalled = 0;


this.Warehouse_1_Zip = "78756";
this.Warehouse_2_Zip = "90210";
this.Warehouse_3_Zip = "10001";

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
    
    var czip = getCZip();
    var warehouse_times = {};
    var values = [];
    var fastest_times = {};
    if (ProductIds.length > 1) {
	ProductIds.forEach(function (product_id) {
	    var delivery_time = getDeliveryTime(product_id);
	    for (var key in delivery_time) {
		values.push(parseInt(delivery_time[key]));
	    }
	    var fastest_time = Array.min(values);
	    fastest_times[product_id] = fastest_time;
	});
    } else {
	//only 1 product id
	var fastest_time = getFastest(czip);
	fastest_times[ProductIds] = fastest_time;
    }
    //console.log(fastest_times);
    return fastest_times;

}


function getDeliveryTime(ProductId) {

    var delivery_times = {};
    var czip = getCZip();
    var warehouse_zips = getProductWarehouses(ProductId);

    warehouse_zips.forEach(function (wzip) {
	var time = calculateTime(czip, wzip);
	delivery_times.push(time);
    });

    return delivery_times;

}

Array.min = function (array) {
    
    return Math.min.apply(Math, array);
    
};

