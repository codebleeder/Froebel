
function init() {   
    var canvas_side = new fabric.Canvas('canvas-side');
    var canvas_main = new fabric.Canvas('canvas-main');
    var shapes_main = {
        rect: {
            top: 20.8333,
            left: 15,
            width: 70,
            height: 40,
            fill: '#25ced1'
        },

        square: {
            top: 20.8333,
            left: 15,
            width: 40,
            height: 40,
            fill: '#d1d1d1'
        },

        triangle: {
            top: 20.8333,
            left: 15,
            width: 40,
            height: 34.6410161514,
            fill: '#fceade',            
        },

        right_triangle: {
            top: 40.8333,
            left: 90,
            width: 56.5685424949,
            height: 28.284271245,
            fill: '#ff8a5b',
            angle: 135
        },

        circle: {
            top: 20.8333,
            left: 15,
            radius: 25,
            fill: '#ea526f'
        },

        semi_circle: {
            top: 20.8333,
            left: 90,
            radius: 25,
            fill: '#115e5f',
            endAngle: Math.PI,
            angle: 90
        }
    };

    var shapes_side = {
        rect: {
            top: 20.8333,
            left: 15,
            width: 70,
            height: 40,
            fill: '#25ced1',            
            hasBorders: false,
            hasControls: false,
            lockMovementX: true,
            lockMovementY: true 
        },

        square: {
            top: 104.16333,
            left: 30,
            width: 40,
            height: 40,
            fill: '#d1d1d1',
            hasBorders: false,
            hasControls: false,
            lockMovementX: true,
            lockMovementY: true 
        },

        triangle: {
            top: 187.163333,
            left: 30,
            width: 40,
            height: 34.6410161514,
            fill: '#fceade',
            hasBorders: false,
            hasControls: false,
            lockMovementX: true,
            lockMovementY: true 
        },

        right_triangle: {
            top: 290.496333,
            left: 90,
            width: 56.5685424949,
            height: 28.284271245,
            fill: '#ff8a5b',
            hasBorders: false,
            hasControls: false,
            angle: 135,
            lockMovementX: true,
            lockMovementY: true 
        },

        circle: {
            top: 353.8299,
            left: 30,
            radius: 25,
            fill: '#ea526f',
            hasBorders: false,
            hasControls: false,
            lockMovementX: true,
            lockMovementY: true 
        },

        semi_circle: {
            top: 437.2,
            left: 90,
            radius: 25,            
            startAngle: 0,
            endAngle: Math.PI,
            hasBorders: false,
            hasControls: false,
            fill: '#115e5f',
            angle: 90,
            lockMovementX: true,
            lockMovementY: true 
        },
    };
    
    function add_shape(shape, top) {
        if (shape === 'rect' && top === shapes_side.rect.top) {
            var rect_main = new fabric.Rect(shapes_main.rect);
            canvas_main.add(rect_main);
        }

        if (shape === 'rect' && top === shapes_side.square.top) {
            var square_main = new fabric.Rect(shapes_main.square);
            canvas_main.add(square_main);
        }

        if (shape == 'triangle' && top==shapes_side.triangle.top) {
            var triangle_main = new fabric.Triangle(shapes_main.triangle);
            canvas_main.add(triangle_main);
        }

        if (shape == 'triangle' && top == shapes_side.right_triangle.top) {
            var right_triangle_main = new fabric.Triangle(shapes_main.right_triangle);
            canvas_main.add(right_triangle_main);
        }


        if (shape == 'circle' && top === shapes_side.circle.top) {
            var circle_main = new fabric.Circle(shapes_main.circle);
            canvas_main.add(circle_main);
        }

        if (shape == 'circle' && top === shapes_side.semi_circle.top) {
            var semi_circle_main = new fabric.Circle(shapes_main.semi_circle);
            canvas_main.add(semi_circle_main);
        }
    }
    
    
    fabric.Object.prototype.transparentCorners = true; 

    canvas_side.on('object:selected', function () {
        console.log('object selected');
    });
    
    canvas_side.hoverCursor = 'crosshair';

    canvas_side.on('object:selected', function (opt) {        
        var shape_type = opt.target.get('type');
        add_shape(shape_type, opt.target.top, opt.target.left);
        canvas_side.discardActiveObject();  
    });

    // Draw shapes in the side-canvas 
    var rect_side = new fabric.Rect(shapes_side.rect);
    var triangle_side = new fabric.Triangle(shapes_side.triangle);
    canvas_side.add(rect_side);
    canvas_side.add(triangle_side);
    var circle_side = new fabric.Circle(shapes_side.circle);
    canvas_side.add(circle_side);
    var square_side = new fabric.Rect(shapes_side.square);
    canvas_side.add(square_side);
    var right_triangle_side = new fabric.Triangle(shapes_side.right_triangle);
    canvas_side.add(right_triangle_side);
    var semi_circle_side = new fabric.Circle(shapes_side.semi_circle);
    canvas_side.add(semi_circle_side);

    window.onkeydown = onKeyDownHandler;

    function removeActiveObjects() {
        var activeGroup = canvas_main.getActiveObjects();
        activeGroup.forEach(function (object) {
            canvas_main.remove(object);
        });
        canvas_main.discardActiveObject();  
    }

    function onKeyDownHandler(e) {
        switch (e.key) {
            case 'Delete': // delete                
                removeActiveObjects();          
        }
    };

    document.getElementById("btn-add-color").onclick = function () {
        var activeObjects = canvas_main.getActiveObjects();
        var color = document.getElementById('btn-color-value');
        activeObjects.forEach(function (object) {
            object.set('fill', '#' + color.firstChild.data);
        });
        canvas_main.renderAll();
    };

    document.getElementById('btn-remove').onclick = function () {
        removeActiveObjects();
    }

}