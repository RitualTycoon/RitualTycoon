ge.Module.define('engine.entity').requires('engine.util')
.init(function() {
	"use strict";
	
	var self = this,
		module = this;
	
	this.Entity	= ge.EventSystem.extend({
		init:		function(parent) {
			this._super();
			this._parent	= parent;
			this.components	= new self.engine.util.LinkedList();
			
			this.createComp	= self.createEntry.bind(this.components, this);
// 			this._objects	= new self.engine.util.LinkedList();
// 			this._handlers	= Object.extended();
		},
		dispose:	function() {
			this.trigger('dispose', this);
			if(this._parent)
				this._parent.entities.remove(this);
// 				this._parent._objects.remove(this);
			//FIXME remove from systems
// 			this._objects.forEach(function(obj) {
// 				obj.dispose();
// 			});
		},
// 		_add:		function(obj_class) {
// 			//NOTE Value of first parameter is unimportant, since it gets eaten anyway
// 			var args		= [null, this].concat([].splice.call(arguments, 1)),
// 				instance	= new (Function.prototype.bind.apply(obj_class, args));
// 			this._objects.push(instance)
// 			return instance;
// 		},
	});
	
	this.createEntry = function(parent, obj_class) {
		// Thanks to Pumbaa80 from Stackoverflow -> http://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible
		//NOTE Value of first parameter is unimportant, since it gets eaten anyway
		var args		= [null, parent].concat([].splice.call(arguments, 2)),
			instance	= new (Function.prototype.bind.apply(obj_class, args));
		this.push(instance);
		return instance;
	};
	
	var nextid = 0,
		idpool = [];
	function generateID() {
		return idpool.isEmpty() ? nextid++ : idpool.pop();
	}
	//NOTE This applies an unique ID to each _subclass_, shared with all instance of it.
	// Problem is, that we cannot use function references as key value for object, and maps (wich can use these) are not iteratable.
	var normalizeExtend = function ext(prop) {
		prop.id			= generateID();
		var Class		= ge.Class.extend.bind(this)(prop);
		Class.id		= prop.id;
		Class.extend	= ext;
		return Class;
	};
	
	this.Component = ge.EventSystem.extend({
		init:	function(entity) {
			this._super();
			this.entity = entity;
		},
		dispose:	function() {
			//TODO unbind listeners
			this.trigger('dispose', this);
			this.entity.components.remove(this);
		}
	});
	this.Component.extend = normalizeExtend;
	
	
	this.Unique = this.Component.extend({
		init:	function(entity) {
			this._super(entity);
			entity.id	= generateID();
		},
		dispose:function() {
			this._super();
			idpool.push(this.entity.id);
			delete this.entity.id;
		}
	});
	
	
	this.GameObject = this.Entity.extend({
		init:	function(panel) {
			this._super(panel);
			this.panel		= this._parent;
// 			this.components	= new self.engine.util.LinkedList();
// 			this.addComp	= self.createEntry.bind(this.components, this);
// 			this.addComp	= this.components.createEntry.bind(this.components);
			
			this.createComp(self.Unique);
		}
	});
	
	
	this.createAspect = function() {
		var include	= [],
			exclude	= [];
		return {
			all:	function() {
				include = include.concat(Array.prototype.slice.call(arguments));
// 				for(var i=0; i<include.length; i++) {
// 					console.log(include[i].id);
// 				}
				return this;
			},
			none:	function() {
				exclude = exclude.concat(Array.prototype.slice.call(arguments));
				return this;
			},
			match:	function(entity) {
				function check(criteria) {
// 					if(matcher instanceof ge.Class) {
					//FIXME super hacky!!
					if(criteria.id)
						return entity.components.has(criteria);
					return criteria.match(entity);
				}
				
				for(var i=0; i<include.length; i++) {
					if(!check(include[i]))
						return false
// 					if(!entity.components.has(include[i]))
// 						return false;
				}
				for(var i=0; i<exclude.length; i++) {
					if(check(exclude[i]))
						return false
// 					if(entity.components.has(exclude[i]))
// 						return false;
				}
				return true;
			}
		};
	};
	
	
	this.System = this.Entity.extend({
		id:		undefined,	//TODO
		init:	function(state, aspect) {
			this._super(state);
			this.aspect		= aspect;
			this.state		= this._parent;
			this.entities	= new self.engine.util.LinkedList();
			
			this._bags		= [];
		},
		_watchChange:		function(entity) {
			if(!self.aspect.match(entity)) {
				entity.unreg(this._watchChange);
				this.entities.remove(entity);
			}
		},
		createBag:			function(aspect, bag) {
			var bag = bag || new self.engine.util.LinkedList();
			this._bags.push({
				aspect:		aspect,
				entities:	bag
			});
			function check(entity) {
// 				console.log(entity);
				if(aspect.match(entity)) {
					bag.push(entity);
					//FIXME dosn't work, because same handler could be attached more than once
					entity.reg('changed', function() {
						if(!aspect.match(entity))
							bag.remove(entity);
					});
					//Function.prototype.bind(this.entities.remove, entity) //TODO function wrapper is nicer
					entity.reg('dispose', function() {
						//TODO trigger unbind? Or unbind all on dispose in dispatcher?
						bag.remove(entity);
					});
				}
			}
			this.state.entities.forEach(check);
			this.state.reg('spawn', function(_, entity) {check(entity)});
			return bag;
		},
		//FIXME Bad name
		enquireAdmission:	function(entity) {
			var self = this;
			if(this.aspect.match(entity)) {
				this.entities.push(entity);
				this.trigger('added', entity);
				//FIXME event never triggers
				entity.reg('changed', this._watchChange);
				entity.reg('dispose', //Function.prototype.bind(this.entities.remove, entity) //TODO function wrapper is nicer
					function() {
					self.entities.remove(entity);
					//TODO function wrapper is nicer
				});
			}
		},
		update:	function() {}
	});
	
	
	/*this.Moveable = this.Component.extend({
		init:	function(entity, pos) {
			this._super(entity);
			
			entity.pos	= pos||{x: 0, y: 0};
			entity.vel	= {x: 0, y: 0};
// 			entity.acc	= {x: 0, y: 0};
			
			function handler() {
				
			}
			entity.reg('update', handler);
			
			this.dispose = function() {
				entity.unreg(handler);
			};
		}
	});*/
	
	//TODO rename to Process
	module.Update = module.Component.extend({
		update:	function(fnct) {
			this.reg('update', fnct);
		}
	});
	module.UpdateSystem = module.System.extend({
		init:	function(state) {
			this._super(state, module.createAspect().all(module.Update));
		},
		update:	function() {
			this.entities.forEach(function(entity) {
				entity.components.get(module.Update).trigger('update');
			});
		}
	});
	
	this.Transform = this.Component.extend({
		init:	function(entity, pos) {
			this._super(entity);
			
			this.pos	= pos||{x: 0, y: 0};
			this.vel	= {x: 0, y: 0};
		}
	});
	
	this.DrawingSystem = this.System.extend({
// 		id:		'Draw',	//TODO
		//FIXME panel instead of state
		init:	function(state, canvas) {
			this.canvas		= canvas;
			this.context	= canvas.getContext('2d');
			this._super(state, self.createAspect().all(self.Drawable));
		},
		update:	function() {
			var ctx = this.context;
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.entities.forEach(function(entity) {
				ctx.save();
				//FIXME Only for testing. Make seperate system
				if(entity.components.has(self.Transform)) {
					var transform = entity.components.get(self.Transform)
					ctx.translate(transform.pos.x, transform.pos.y);
				}
				entity.trigger('draw', ctx);
				ctx.restore();
			});
		}
	});
	
	this.Drawable = this.Component.extend({
		init:	function(entity) {
			this._super(entity);
			var draw_callback;
			function handler(_, ctx) {
				if(draw_callback)
					draw_callback(ctx);
			}
			entity.reg('draw', handler);
			
			this.draw = function(fnct) {
				draw_callback = fnct;
			}
			this.dispose = function() {
				entity.unreg('draw', handler);
			};
		}
	});
});
