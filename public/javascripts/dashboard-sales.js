
$(function() {
    "use strict";
    // ============================================================== 
    // Revenue
    // ============================================================== 
 var ctx = document.getElementById('revenue').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',

                data: {
                    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
                    datasets: [{
                        label: 'Tuần này',
                        data: [12, 19, 3, 17, 6, 3, 7],
                      backgroundColor: "rgba(89, 105, 255,0.5)",
                                    borderColor: "rgba(89, 105, 255,0.7)",
                                    borderWidth: 2
                        
                    }, {
                        label: 'Tuần trước',
                        data: [2, 29, 5, 5, 2, 3, 10],
                          backgroundColor: "rgba(255, 64, 123,0.5)",
                                    borderColor: "rgba(255, 64, 123,0.7)",
                                    borderWidth: 2
                    }]
                },
                options: {
                        
                             legend: {
                        display: true,
                        position: 'bottom',

                        labels: {
                            fontColor: '#71748d',
                            fontFamily: 'Circular Std Book',
                            fontSize: 14,
                        }
                    },
                    scales: {
            yAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return '$' + value;
                    }
                }
            }]
        },


         scales: {
                                    xAxes: [{
                                        ticks: {
                                            fontSize: 14,
                                            fontFamily: 'Circular Std Book',
                                            fontColor: '#71748d',
                                        }
                                    }],
                                    yAxes: [{
                                        ticks: {
                                            fontSize: 14,
                                            fontFamily: 'Circular Std Book',
                                            fontColor: '#71748d',
                                        }
                                    }]
                                }
        
                }
            });


            var ctx = document.getElementById('revenue-month').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',

                data: {
                    labels: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29],
                    datasets: [{
                        label: 'Tháng này',
                        data: [12, 19, 3, 17, 6, 3, 7,11, 2, 5, 15, 12, 11, 10, 14],
                      backgroundColor: "rgba(89, 105, 255,0.5)",
                                    borderColor: "rgba(89, 105, 255,0.7)",
                                    borderWidth: 2
                        
                    }, {
                        label: 'Tháng trước',
                        data: [2, 29, 5, 5, 2, 3, 10, 7, 12, 15, 18, 15, 12, 13, 13],
                          backgroundColor: "rgba(255, 64, 123,0.5)",
                                    borderColor: "rgba(255, 64, 123,0.7)",
                                    borderWidth: 2
                    }]
                },
                options: {
                        
                             legend: {
                        display: true,
                        position: 'bottom',

                        labels: {
                            fontColor: '#71748d',
                            fontFamily: 'Circular Std Book',
                            fontSize: 14,
                        }
                    },
                    scales: {
            yAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return '$' + value;
                    }
                }
            }]
        },


         scales: {
                                    xAxes: [{
                                        ticks: {
                                            fontSize: 14,
                                            fontFamily: 'Circular Std Book',
                                            fontColor: '#71748d',
                                        }
                                    }],
                                    yAxes: [{
                                        ticks: {
                                            fontSize: 14,
                                            fontFamily: 'Circular Std Book',
                                            fontColor: '#71748d',
                                        }
                                    }]
                                }
        
                }
            });            
   
    // ============================================================== 
    // Total Sale
    // ============================================================== 
 var ctx = document.getElementById("total-sale").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                
                data: {
                    labels: ["Quần áo", " Phụ kiện", "Giày"],
                    datasets: [{
                        backgroundColor: [
                            "#5969ff",
                            "#ff407b",
                            "#25d5f2"
                        ],
                        data: [350.56, 135.18, 48.96]
                    }]
                },
                options: {
                    legend: {
                        display: false

                    }
                }

            });


var ctx = document.getElementById("total-sale-month").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                
                data: {
                    labels: ["Quần áo", " Phụ kiện", "Giày"],
                    datasets: [{
                        backgroundColor: [
                            "#5969ff",
                            "#ff407b",
                            "#25d5f2"
                        ],
                        data: [300, 220, 30]
                    }]
                },
                options: {
                    legend: {
                        display: false

                    }
                }

            });           
     
   
    // ============================================================== 
    // Location Map
    // ============================================================== 
     jQuery('#locationmap').vectorMap({
        
                map: 'world_mill_en',
                backgroundColor: 'transparent',
                borderColor: '#000',
                borderOpacity: 0,
                borderWidth: 0,
                zoomOnScroll: false,
                color: '#25d5f2',
                regionStyle: {
                    initial: {
                        fill: "#e3eaef"
                    }
                },
                markerStyle: {
                    initial: {
                        r: 9,
                        fill: "#25d5f2",
                        "fill-opacity": .9,
                        stroke: "#fff",
                        "stroke-width": 7,
                        "stroke-opacity": .4
                    },
                    hover: {
                        stroke: "#fff",
                        "fill-opacity": 1,
                        "stroke-width": 1.5
                    }
                },

                markers: [{
                    latLng: [40.71, -74],
                    name: "New York"
                }, {
                    latLng: [37.77, -122.41],
                    name: "San Francisco"
                }, {
                    latLng: [-33.86, 151.2],
                    name: "Sydney"
                }, {
                    latLng: [1.3, 103.8],
                    name: "Singapore"
                }],


                hoverOpacity: null,
                normalizeFunction: 'linear',
                scaleColors: ['#25d5f2', '#25d5f2'],
                selectedColor: '#c9dfaf',
                selectedRegions: [],
                showTooltip: true,
                onRegionClick: function(element, code, region) {
                    var message = 'You clicked "' + region + '" which has the code: ' + code.toUpperCase();
                    alert(message);
                }

            });


 // ============================================================== 
    // Revenue Cards
    // ============================================================== 
    $("#sparkline-1").sparkline([5, 5, 7, 7, 9, 5, 3, 5, 2, 4, 6, 7], {
        type: 'line',
        width: '99.5%',
        height: '100',
        lineColor: '#5969ff',
        fillColor: '#dbdeff',
        lineWidth: 2,
        spotColor: undefined,
        minSpotColor: undefined,
        maxSpotColor: undefined,
        highlightSpotColor: undefined,
        highlightLineColor: undefined,
        resize:true
    });



    $("#sparkline-2").sparkline([3, 7, 6, 4, 5, 4, 3, 5, 5, 2, 3, 1], {
        type: 'line',
        width: '99.5%',
        height: '100',
        lineColor: '#ff407b',
        fillColor: '#ffdbe6',
        lineWidth: 2,
        spotColor: undefined,
        minSpotColor: undefined,
        maxSpotColor: undefined,
        highlightSpotColor: undefined,
        highlightLineColor: undefined,
        resize:true
    });



    $("#sparkline-3").sparkline([5, 3, 4, 6, 5, 7, 9, 4, 3, 5, 6, 1], {
        type: 'line',
        width: '99.5%',
        height: '100',
        lineColor: '#25d5f2',
        fillColor: '#dffaff',
        lineWidth: 2,
        spotColor: undefined,
        minSpotColor: undefined,
        maxSpotColor: undefined,
        highlightSpotColor: undefined,
        highlightLineColor: undefined,
        resize:true
    });



    $("#sparkline-4").sparkline([6, 5, 3, 4, 2, 5, 3, 8, 6, 4, 5, 1], {
        type: 'line',
        width: '99.5%',
        height: '100',
        lineColor: '#fec957',
        fillColor: '#fff2d5',
        lineWidth: 2,
        spotColor: undefined,
        minSpotColor: undefined,
        maxSpotColor: undefined,
        highlightSpotColor: undefined,
        highlightLineColor: undefined,
        resize:true,
    });
 
    
   
    


});