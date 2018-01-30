/**
 * @constructor FORGE.ObjectRenderer
 * @param {FORGE.Viewer} viewer - {@link FORGE.Viewer} reference.
 * @extends {FORGE.BaseObject}
 */
FORGE.ObjectRenderer = function(viewer, objects)
{
    /**
     * Viewer reference
     * @name FORGE.ObjectRenderer#_viewer
     * @type {FORGE.Viewer}
     * @private
     */
    this._viewer = viewer;

    /**
     * @name FORGE.ObjectRenderer#_scene
     * @type {THREE.Scene}
     * @private
     */
    this._scene = null;

    /**
     * @name FORGE.ObjectRenderer#_objects
     * @type {Array<FORGE.Object3D>}
     * @private
     */
    this._objects = objects;

    /**
     * Picking manager.
     * @name FORGE.SceneRenderer#_picking
     * @type {FORGE.Picking}
     * @private
     */
    this._picking = null;

    FORGE.BaseObject.call(this, "ObjectRenderer");

    this._boot();
};

FORGE.ObjectRenderer.prototype = Object.create(FORGE.BaseObject.prototype);
FORGE.ObjectRenderer.prototype.constructor = FORGE.ObjectRenderer;

/**
 * Init routine
 * @method FORGE.ObjectRenderer#_boot
 * @private
 */
FORGE.ObjectRenderer.prototype._boot = function()
{
window.scene =     this._scene = new THREE.Scene();

    for (var i=0; i<this._objects.length; i++)
    {
        this._scene.add(this._objects[i].mesh);
    }

    // this._picking = new FORGE.PickingDrawpass(this._viewer);
};

/**
 * Get 3d objects that are eligible to raycast (interactive)
 * @method  FORGE.ObjectRenderer#getRaycastable
 * @return {Array<FORGE.Object3D>}
 */
FORGE.ObjectRenderer.prototype.getRaycastable = function()
{
    return this._objects.filter(function(object)
    {
        return (object.ready === true && object.interactive === true);
    });
};

/**
 * Render routine
 * @method FORGE.ObjectRenderer#render
 * @param {FORGE.Viewport} viewport - current rendering viewport
 * @param {FORGE.WebGLRenderTarget} target - render target
 */
FORGE.ObjectRenderer.prototype.render = function(viewport, target)
{
    if (this._scene.children.length === 0)
    {
        return;
    }

    var view = viewport.view.current;
    var camera = viewport.camera.main;

    var materialRef = this._viewer.renderer.getMaterialForView(view.type, "mapping");

    for (var i=0; i<this._objects.length; i++)
    {
        var object = this._objects[i];
        var material = object.material;
        var mesh = object.mesh;

        mesh.frustumCulled = view.type === FORGE.ViewType.RECTILINEAR;

        mesh.material = materialRef;
        mesh.material.side = THREE.FrontSide;
        mesh.material.transparent = material.transparent;
        mesh.material.needsUpdate = true;

        if ("tTexture" in mesh.material.uniforms && object.material.texture !== null)
        {
            mesh.material.uniforms.tTexture = object.material.texture;
        }
    }

    view.updateUniforms(materialRef.uniforms);

    this._viewer.renderer.webGLRenderer.render(this._scene, camera, target);
    
    // this._picking.render(this._scene, camera, target, viewType);
};

/**
 * Destroy sequence
 * @method FORGE.ObjectRenderer#destroy
 */
FORGE.ObjectRenderer.prototype.destroy = function()
{
    if (this._picking !== null) {
        this._picking.destroy();
        this._picking = null;
    }

    this._objects = null;

    this._scene.children = null;
    this._scene = null;

    this._viewer = null;

    FORGE.BaseObject.prototype.destroy.call(this);
};

/**
 * Get all the objects
 * @name FORGE.ObjectRenderer#all
 * @type {Array<FORGE.Object3D>}
 */
Object.defineProperty(FORGE.ObjectRenderer.prototype, "all",
{
    /** @this {FORGE.ObjectRenderer} */
    get: function()
    {
        return this._objects;
    }
});


/**
 * Get background scene.
 * @name FORGE.ObjectRenderer#scene
 * @type {THREE.Scene}
 */
Object.defineProperty(FORGE.ObjectRenderer.prototype, "scene",
{
    /** @this {FORGE.ObjectRenderer} */
    get: function()
    {
        return this._scene;
    }
});

