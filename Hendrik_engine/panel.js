ge.Module.define('engine.panel').requires('engine.util', 'engine.entity')
.init(function() {
	"use strict";
	var self = this;
	this.Panel = ge.EventSystem.extend({
		//TODO state argument is bad. State needs a factory method
		init:	function(state) {
			this._super();
			this.state		= state;
			this.entitys	= new self.engine.util.LinkedList();
			this.systems	= new self.engine.util.LinkedList();
			this.createSystem = self.engine.entity.createEntry.bind(this.systems, this);
		},
// 		createSystem:		function(obj_class) {
// 			var args		= [null, this].concat([].splice.call(arguments, 1)),
// 				instance	= new (Function.prototype.bind.apply(obj_class, args));
// 			this.systems.push(instance);
// 			return instance;
// 		},
// 		spawnEntity:		function(entity) {
// 			var args		= [null, this].concat([].splice.call(arguments, 1)),
// 				instance	= self.engine.entity.createEntry.bind.apply(this.entitys, this);
// 			this.systems.forEach(function(sys) {
// 				sys.enquireAdmission(instance);
// 			});
// 			return instance;
// 		},
		spawnEntity:		function(entity) {
			var args		= [null, this].concat([].splice.call(arguments, 1)),
				instance	= new (entity.bind.apply(entity, args));
			this.entitys.push(instance);
			this.systems.forEach(function(sys) {
				sys.enquireAdmission(instance);
			});
			return instance;
		},
		loop:	function() {
			this.systems.forEach(function(sys) {
				sys.update();
			});
		}
	});
	
	this.CanvasPanel = this.Panel.extend({
		canvas:	null,
		context:null,
		
		init:	function(state, canvas) {
			this._super(state);
			this.canvas	= canvas;
			this.context= canvas.getContext('2d');
			// Eleminates the strange "input" cursor, at least in chrome and firefox
// 			canvas.addEventListener('mousedown', function(evt) {
// 				evt.preventDefault();
// 				evt.stopPropagation();
// 			}, false);
// 			function prevent(e){
// 				e.preventDefault();
// 			}
// 			document.body.addEventListener('touchmove', prevent);
// 			document.body.addEventListener('touchstart', prevent);
		},
// 		draw:	function(ctx) {
// // // 			var ctx = this.context;
// 			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
// 			this.entitys.forEach(function(entity) {
// 				entity.trigger('draw');
// // 				ctx.save();
// // 				ctx.translate(entity.pos.x.round() /*- entity.size.width / 2*/, entity.pos.y.round() /*+ entity.size.height / 2*/);
// // 				entity.draw(ctx);
// // 				ctx.restore();
// 			});
// 		},
// 		loop:	function() {
// 			this._super();
// 			this.entitys.forEach(function(entity) {
// 				entity.trigger('update');
// 			});
// 			this.draw(this.context);
// 		}
	});
	
	this.HTMLPanel = this.Panel.extend({
		dom:	null,
		
		init:	function(state, dom) {
			this._super(state);
			this.dom = dom;
		},
		loop:	function() {
			//TODO animation
		}
	});
});
