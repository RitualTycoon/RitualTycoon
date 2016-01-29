ge.Module.define('engine.input').requires('engine.entity')
.init(function() {
	"use strict";
	
	var module	= this,
		entity	= this.engine.entity;
	
	this.KEYS = Object.extended({
		'MOUSE_L': -1,
		'MOUSE_R': -2,
	// 	'MWHEEL_UP': -4,
	// 	'MWHEEL_DOWN': -5,
		'BACKSPACE': 8,
		'TAB': 9,
		'ENTER': 13,
		'PAUSE': 19,
		'CAPS': 20,
		'ESC': 27,
		'SPACE': 32,
		'PAGE_UP': 33,
		'PAGE_DOWN': 34,
		'END': 35,
		'HOME': 36,
		'LEFT_ARROW': 37,
		'UP_ARROW': 38,
		'RIGHT_ARROW': 39,
		'DOWN_ARROW': 40,
		'INSERT': 45,
		'DELETE': 46
	});
	
// 	function keyup(evt) {}
// 	function keydown(evt) {}
// 	document.addEventListener('keydown', keydown);
// 	document.addEventListener('keyup', keyup);
	
	this.InputSystem = entity.System.extend({
		init:	function(panel, element) {
			this._super(panel, entity.createAspect().all(module.Interactive));
			
			var self = this,
				//TODO repeat for more than one key?
				//TODO delete on unbind
				repeat_ids	= {};
			this._bindings	= Object.extended({}),
			this._bindings_up	= Object.extended({});
			this.mousepos	= {x: -1, y: -1};
			this.key_state	= Object.extended({});
			module.KEYS.values().forEach(function(key) {
				self.key_state[key] = false;
			});
			//TODO unbind
			this.reg('added', function(_, entity) {
				entity.components.get(module.Interactive)._bind(self);
			});
			
			function mousemove(evt) {
				//TODO wich element?
				if(evt.offsetX) {
					// why not that easy in FF?
					self.mousepos.x = evt.offsetX;
					self.mousepos.y = evt.offsetY;
				} else {
					//NOTE has do be done on each event, because layout may have been changed
					var dom		= element,
						x_off	= 0,
						y_off	= 0;
					while(dom != null) {
						x_off += dom.offsetLeft;
						y_off += dom.offsetTop;
						dom = dom.offsetParent;
					}
					self.mousepos.x = (evt.pageX - x_off);
					self.mousepos.y = (evt.pageY - y_off);
				}
			}
			function keydown(evt) {
				var key;
				if(evt.type == 'mousedown') {
					key = evt.button == 2 || evt.altKey ? module.KEYS.MOUSE_R : module.KEYS.MOUSE_L;
				} else {
					key = evt.keyCode;
				}
				if(module.KEYS.values().indexOf(key) == -1) {
					return;
				}
				if(!self.key_state[key]) {
					self.key_state[key] = true;
					if(self._bindings[key] != undefined) {
						self._bindings[key].handler(key, false);
						if(self._bindings[key].repeat > 0) {
							repeat_ids[key] = setTimeout(function() {
								repeat_ids[key] = setInterval(function() {
									self._bindings[key].handler(key, true);
								}, self._bindings[key].repeat);
							}, self._bindings[key].delay);
						}
					}
				}
		// 			event.stopPropagation();
				evt.preventDefault();
// 				console.log('keydown');
			}
			function keyup(evt) {
				var key;
				if(evt.type == 'mouseup') {
					key = evt.button == 2 || evt.altKey ? module.KEYS.MOUSE_R : module.KEYS.MOUSE_L;
				} else {
					key = evt.keyCode;
				}
				self.key_state[key] = false;
				
				if(self._bindings_up[key] != undefined) {
					self._bindings_up[key].handler(key);
				}
				//TODO Needs more testing!
				if(module.KEYS.values().indexOf(evt.keyCode) < 0) {
					return;
				}
		// 			self.key_state[evt.keyCode] = false;
				//NOTE Problem? Should share same id nevertheless
				clearTimeout(repeat_ids[key]);
				clearInterval(repeat_ids[key]);
// 				console.log('keyup');
			}
			panel.reg('show', function() {
				element.addEventListener('mousemove', mousemove);
				element.addEventListener('mousedown', keydown);
				element.addEventListener('mouseup', keyup);
				document.addEventListener('keydown', keydown);
				document.addEventListener('keyup', keyup);
			});
			panel.reg('hide', function() {
				element.removeEventListener('mousemove', mousemove);
				element.removeEventListener('mousedown', keydown);
				element.removeEventListener('mouseup', keyup);
				document.removeEventListener('keydown', keydown);
				document.removeEventListener('keyup', keyup);
			});
		},
		
		bind:		function(key, handler, repeat, delay) {
			this._bindings[key] = {handler: handler, repeat: repeat || 0, delay: delay || 500};
		},
		bindUp:		function(key, handler) {
			this._bindings_up[key] = {handler: handler};
		},
		unbindAll:	function() {
			this._bindings = Object.extended({});
			this._bindings_up = Object.extended({});
		},
		
		update:	function() {
// 			console.log('blubb');
		}
	});
// 	
	this.Interactive = entity.Component.extend({
		init:	function(entity) {
// 			console.log('sdfsdf');
// 			this._super(entity);
// 			var move_callback;
// 			function handler() {
// 				if(draw_callback)
// 					draw_callback(ctx);
// 			}
// 			entity.reg('draw', handler);
// 			
// 			this.mousemove = function(fnct) {
// 				move_callback = fnct;
// 			}
			var handler;
			this.input	= function(fnct) {
				handler = fnct;
			}
			this._bind	= function(system) {
				handler(system);
			}
// 			this.dispose = function() {
// 				entity.unreg('draw', handler);
// 			};
		},
// 		bind:	function(key, handler, repeat, delay) {
// // 			this.bindings[key] = {handler: handler, repeat: repeat || 0, delay: delay || 500};
// 		}
	});
});
