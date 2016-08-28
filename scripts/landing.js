var pointsArray = document.getElementsByClassName('point');


var animatePoints = function(points) {

    // var revealPoint = function(i) {
    //     points[i].style.opacity = 1;
    //     points[i].style.transform = "scaleX(1) translateY(1)";
    //     points[i].style.msTransform = "scaleX(1) translateY(0)";
    //     points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
    // };

    // for (var i = 0; i < points.length; i++) {
    //     revealPoint(i);
    // }

    var revealPoint = function(point) {
        point.style.opacity = 1;
        point.style.transform = "scaleX(1) translateY(1)";
        point.style.msTransform = "scaleX(1) translateY(0)";
        point.style.WebkitTransform = "scaleX(1) translateY(0)";
    };

    forEach(points, revealPoint);
};


window.onload = function() {
    var sellingPoints = document.getElementsByClassName('selling-points')[0];
    if (window.innerHeight > 950) {
        animatePoints(pointsArray);
    }

    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;

    window.addEventListener('scroll', function(event) {
        if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
            animatePoints(pointsArray);
        }
    });
}