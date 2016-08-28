var pointsArray = document.getElementsByClassName('point');


var animatePoints = function(points) {

    var revealPoint = function(i) {
        points[i].style.opacity = 1;
        points[i].style.transform = "scaleX(1) translateY(1)";
        points[i].style.msTransform = "scaleX(1) translateY(0)";
        points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
    };

    for (var i = 0; i < points.length; i++) {
        revealPoint(i);
    }
};

window.onload = function() {
    var sellingPoints = document.getElementsByClassName('selling-points')[0];
    if (window.innerHeight > 950) {
        animatePoints(pointsArray);
    }

    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;

    window.addEventListener('scroll', function(event) {
        console.log('scroll top ' + document.body.scrollTop)
        console.log('scroll distance ' + scrollDistance)
        if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
            animatePoints(pointsArray);
        }
    });
}