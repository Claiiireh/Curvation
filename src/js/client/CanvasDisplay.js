/**
 * CanvasDisplay Constructor
 * @param {number} size
 * @param context
 * @constructor
 */
var CanvasDisplay = function (size, context) {
    /* private attribute */
    if (typeof size !== 'number') {
        throw new TypeError('CanvasDisplay constructor : The attribute size must be a number.');
    }
    var _size = size;
    var _context = context || null;

    /**
     * Define getter and setter for _size private attribute
     */
    Object.defineProperties(this, {
        "size": {
            // canvas.size
            get: function () { return _size; },
            // canvas.size = ...
            set: function(size) {
                if (typeof size !== 'number') {
                    throw new TypeError('CanvasDisplay constructor : The attribute size must be a number.');
                }
                _size = size;
            },
            enumerable: true
        }
    });


    /**
     * Define getter and setter for _context private attribute
     */
    Object.defineProperties(this, {
        "context": {
            // canvas.context
            get: function () { return _context; },
            // canvas.context = ...
            set: function(context) { _context = context; },
            enumerable: true
        }
    });

    /**
     * Define getter for compilated ratio attribute
     */
    Object.defineProperty(this, 'ratio', {
        // canvas.ratio
        get: function() { return _size / MAP_SIZE; },
        enumerable: true
    });
};

/**
 * Set CanvasDisplay as implementation of Drawer
 * @type {Drawer}
 */
CanvasDisplay.prototype = Object.create(Drawer);

/**
 * Initialize the drawer
 */
CanvasDisplay.prototype.init = function () {
    this.preprocess();
};

/**
 * Define preliminary process executed before drawing
 */
CanvasDisplay.prototype.preprocess = function () {
    this.clear();
};

/**
 * Draw a point
 */
CanvasDisplay.prototype.drawPoint = function (entity) {
    this.context.fillStyle = entity.color;
    this.context.beginPath();
    this.context.arc(entity.x * this.ratio, entity.y * this.ratio, entity.size * this.ratio, 0, 2 * Math.PI);
    this.context.fill();
};

/**
 * Draw an arrow
 */
CanvasDisplay.prototype.drawArrow = function (entity) {
    var dX = (entity.toX * this.ratio) - (entity.fromX * this.ratio);
    var dY = (entity.toY * this.ratio) - (entity.fromY * this.ratio);
    var angle = Math.atan2(dY, dX);
    this.context.strokeStyle = entity.color;
    this.context.beginPath();
    this.context.moveTo(entity.fromX * this.ratio, entity.fromY * this.ratio);
    this.context.lineTo(entity.toX * this.ratio, entity.toY * this.ratio);
    this.context.lineTo((entity.toX * this.ratio) - (entity.headSize * this.ratio) * Math.cos(angle - Math.PI / 6), (entity.toY * this.ratio) - (entity.headSize * this.ratio) * Math.sin(angle - Math.PI / 6));
    this.context.moveTo(entity.toX * this.ratio, entity.toY * this.ratio);
    this.context.lineTo((entity.toX * this.ratio) - (entity.headSize * this.ratio) * Math.cos(angle + Math.PI / 6), (entity.toY * this.ratio) - (entity.headSize * this.ratio) * Math.sin(angle + Math.PI / 6));
    this.context.stroke();
};

/**
 * Draw a curve
 */
CanvasDisplay.prototype.drawCurve = function (entity) {
};

/**
 * Define process executed after drawing
 */
CanvasDisplay.prototype.postprocess = function () {
};

/**
 * Clear the context
 */
CanvasDisplay.prototype.clear = function () {
    this.context.clearRect(0, 0, this.size, this.size);
};

/**
 * Draw the entites on the context
 * @param entities
 */
CanvasDisplay.prototype.draw = function (entities) {
    this.preprocess();
    for (var i = 0; i < entities.length; i++) {
        if (entities[i].type === 'Point') {
            this.drawPoint(entities[i]);
        } else if (entities[i].type === 'Arrow') {
            this.drawArrow(entities[i]);
        }
    }
};