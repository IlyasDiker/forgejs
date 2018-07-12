/**
 * FORGE.PickingInterface
 * Picking Interface class.
 *
 * @constructor FORGE.PickingInterface
 * @param {THREE.Scene} scene - scene
 * @param {function} fnObjectWithId - function retrieving a pickagble object with its id
 *
 * @extends {FORGE.BaseObject}
 */
FORGE.PickingInterface = function(scene, fnObjectWithId)
{
    FORGE.BaseObject.call(this, "PickingInterface");

    this._scene = scene;

    this._fnObjectWithId = fnObjectWithId;
};

FORGE.PickingInterface.prototype = Object.create(FORGE.BaseObject.prototype);
FORGE.PickingInterface.prototype.constructor = FORGE.PickingInterface;

/**
 * Destroy sequence.
 * @method FORGE.PickingInterface#destroy
 */
FORGE.PickingInterface.prototype.destroy = function()
{
    this._scene = null;

    this._fnObjectWithId = null;
};

/**
 * Get the scene.
 * @name FORGE.PickingInterface#scene
 * @type {THREE.Scene}
 * @readonly
 */
Object.defineProperty(FORGE.PickingInterface.prototype, "scene",
{
    /** @this {FORGE.PickingInterface} */
    get: function()
    {
        return this._scene;
    }
});

/**
 * Get the fnObjectWithId.
 * @name FORGE.PickingInterface#fnObjectWithId
 * @type {function}
 * @readonly
 */
Object.defineProperty(FORGE.PickingInterface.prototype, "fnObjectWithId",
{
    /** @this {FORGE.PickingInterface} */
    get: function()
    {
        return this._fnObjectWithId;
    }
});