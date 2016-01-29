(function() {
	// We are going strict now
	"use strict";
	
	// Paul Irish
	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame       || 
				window.webkitRequestAnimationFrame || 
				window.mozRequestAnimationFrame    || 
				window.oRequestAnimationFrame      || 
				window.msRequestAnimationFrame     || 
		/*return*/ function(callback){
			window.setTimeout(callback, 1000 / 10);
		};
	})();
	
	window.ge = {
		version:	'0.1',
		
		src_path:	'./src/',
		game:		null,
// 		clock:		null,
		
		start:		function(game) {
			this.game		= game;
			game.running	= true;
			
			//TODO Better game-loop from http://gafferongames.com/game-physics/fix-your-timestep/
			/*double t = 0.0;
			const double dt = 0.01;

			double currentTime = hires_time_in_seconds();
			double accumulator = 0.0;

			State previous;
			State current;

			while ( !quit )
			{
				double newTime = time();
				double frameTime = newTime - currentTime;
				if ( frameTime > 0.25 )
					frameTime = 0.25;	  // note: max frame time to avoid spiral of death
				currentTime = newTime;

				accumulator += frameTime;

				while ( accumulator >= dt )
				{
					previousState = currentState;
					integrate( currentState, t, dt );
					t += dt;
					accumulator -= dt;
				}

				const double alpha = accumulator / dt;

				State state = currentState*alpha + previousState * ( 1.0 - alpha );

				render( state );
			}*/
			
			(function loop() {
				if(game.running) {
					var newstate = game.state.loop();
					//TODO make lazy init possible
					if(newstate != undefined) {
						newstate.show(game.state);
						game.state = newstate;
					}
// 					game.state.draw();
	// 				var tick = 1000 - ge.clock.tick();
	// 				setTimeout(loop, ((tick > 0 ? tick : 0) / self.fps).floor());
					ge.Timer.update();
					requestAnimFrame(loop);
				}
			})();
		},
		stop:		function() {
			this.game.running	= false;
		},
	};


	//TODO is said to be very slow, because of how _super is handled... http://codereview.stackexchange.com/questions/30018/please-check-my-improvement-on-john-resigs-simple-javascript-inheritance
	/* Simple JavaScript Inheritance
	 * By John Resig http://ejohn.org/
	 * MIT Licensed.
	 */
	(function() {
		// Inspired by base2 and Prototype
		var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
		// The base Class implementation (does nothing)
		ge.Class = function(){};
		
		// Create a new Class that inherits from this class
		ge.Class.extend = function parent(prop) {
// 			console.log(this.prototype);
			var _super = this.prototype;
			
			// Instantiate a base class (but only create the instance,
			// don't run the init constructor)
			initializing = true;
			var prototype = new this();
			initializing = false;
			
			// Copy the properties over onto the new prototype
			for (var name in prop) {
				// Check if we're overwriting an existing function
				prototype[name] = typeof prop[name] == "function" && 
				typeof _super[name] == "function" && fnTest.test(prop[name]) ?
				(function(name, fn){
					return function() {
						var tmp = this._super;
						
						// Add a new ._super() method that is the same method
						// but on the super-class
						this._super = _super[name];
						
						// The method only need to be bound temporarily, so we
						// remove it when we're done executing
						var ret = fn.apply(this, arguments);
						this._super = tmp;
						
						return ret;
					};
				})(name, prop[name]) :
				prop[name];
			}
			
			// The dummy class constructor
			function Class() {
				// All construction is actually done in the init method
				if ( !initializing && this.init )
					this.init.apply(this, arguments);
			}
			
			// Populate our constructed prototype object
			Class.prototype = prototype;
			
			// Enforce the constructor to be what we expect
			Class.prototype.constructor = Class;
			
			// And make this class extendable
			//WARNING Has been Class.extend = arguments.callee before. But the use of callee is deprecated in ECMAScript5. Check if we run into trouble with this.
			Class.extend = parent;
			
			return Class;
		};
	})();


	//FIXME rename to EventDispatcher
	ge.EventSystem	= ge.Class.extend({
		init:		function() {
			this._handlers	= Object.extended();
		},
		//TODO priority
		reg:		function(event, handler, priority) {
			var list = this._handlers[event]||[];
			if(list.isEmpty())
				this._handlers[event] = list;
			list.add(handler);
		},
		unreg:		function(handler) {
			//NOTE Can't use same handler for different signals -> problem?
			this._handlers.values().forEach(function(list) {
				list.remove(handler);
			});
		},
		trigger:	function(signal) {
			var args		= Array.prototype.slice.call(arguments, 1),
				propagate	= true,
				event		= {
					type:	signal,
					cancel:	function() {
						propagate = false;
					}
				};
			for(var index=0; propagate && index<(this._handlers[signal]||[]).length; index++) {
				this._handlers[signal][index].apply(this, [event].concat(args));
			}
			return propagate;
// 			var args = arguments;
// 			(this._handlers[signal]||[]).forEach(function(handler) {
// 				handler.apply(this, args);
// 			});
		}
	});


	ge.Timer = ge.Class.extend({
		init:	function() {
			this.last = ge.Timer.now;
		},
		tick:	function () {
			var last = this.last;
			this.last = ge.Timer.now;
			return ge.Timer.now - last;
		},
	});
	ge.Timer.last	= 0;
	ge.Timer.now	= 0;
	ge.Timer.update	= function() {
		ge.Timer.last	= ge.Timer.now;
		ge.Timer.now	= (new Date()).getTime();
	}


	ge.Module = new function() {
		var module_list	= Object.extended({}),	// loaded but not inevitably initialized yet
			load_queue	= [],					// waiting to be loaded
			callbacks	= [];
		
		function loadModule(module) {
	// 		console.debug('loading <'+module+'>');
			var path	= ge.src_path+module.replace(/\./g, '/')+'.js',
				script	= document.createElement('script');
			load_queue.push(module);
			script.type	= 'text/javascript';
			script.src	= path;
			document.getElementsByTagName('head')[0].appendChild(script);
			script.onload = function() {
	// 			console.debug('loaded <'+module+'>');
				load_queue.remove(module);
				evaluateModules();
	// 			console.log('done <'+module+'>');
			}
			script.onerror = function() {
				throw new Error('Could not load module <'+module+'> at "'+path+'"');
			}
		}
		
		function evaluateModules() {
			var new_loaded;
			do {
				new_loaded = false;
				module_list.values().forEach(function(module) {
					if(!module.initialized &&
						load_queue.intersect(module.dependencys).isEmpty() &&
						module.dependencys.every(function(dependency) {
						var module = module_list[dependency];
						return module && module.initialized;
					})) {
	// 					console.debug('start init <'+module.name+'>');
						if(!module.init_func) {
							throw new Error('Module <'+module.name+'> does not define a init-block!');
						}
						module.initialized = true;
						new_loaded = true;
						
						// Passing dependencys in context (including their dependencys as well, i see no way to avoid this)
						module.context = {};
						module.dependencys.forEach(function(dependency) {
	// 						function subpackage(list, obj) {
	// 							if(list.isEmpty()) {
	// 								return module_list[dependency].context;
	// 							} else {
	// 								obj[list.first()] = subpackage(list.from(1), {});
	// 								return obj;
	// 							}
	// 						}
	// 						var package_tree = subpackage(dependency.split('.'), {});
	// 						module.context[package_tree.first()] = package_tree.from(1);
	// 						subpackage(dependency.split('.'), {});
	// 						console.log(subpackage(dependency.split('.'), {}));
							// Subpackages should be in separate nested objects.
							//  Access like "this['engine.entity'].Entity" is't that great
							var subpackage_tree	= dependency.split('.'),
								current			= module.context;
							subpackage_tree.forEach(function(subpackage) {
								if(subpackage==subpackage_tree.last()) {
									current[subpackage] = module_list[dependency].context;
								} else {
									if(current[subpackage]==null) {
										current[subpackage] = {};
									}
									current = current[subpackage];
								}
	// 							console.log(subpackage);
							});
							
							
	// 						//FIXME Most likely buggy
	// 						if(module.context[subpackage_tree.first()]==undefined) {
	// 							module.context[subpackage_tree.first()] = {};
	// 						}
	// 						var current			= module.context[subpackage_tree.first()];
	// 						subpackage_tree.from(1).forEach(function(subpackage) {
	// 							if(subpackage==subpackage_tree.last()) {
	// 								current[subpackage] = module_list[dependency].context;
	// 							} else {
	// 								current = current[subpackage] = {};
	// 							}
	// 						});
							
	// 						console.log(module.context);
						});
						module.init_func.apply(module.context);
	// 					console.debug('end init <'+module.name+'>');
					}
				});
			} while(new_loaded);
			if(load_queue.isEmpty()) {
				if(module_list.values().some(function(module) {
					return !module.initialized;
				})) {
					//TODO more concrete error message. Eg. if the file is found, but does not declare the module correctly
					throw new Error('Module error! - Syntax error or Circular dependency detected!');
// 					console.log(module_list);
				}
				//FIXME verfy!
				// everything has been loaded fine
				callbacks.forEach(function(callback) {
					callback();
				});
			}
		}
		
		this.onReady	= function(callback) {
			callbacks.push(callback);
		};
		this.define		= function(module) {
			if(module_list.hasOwnProperty(module)) {
				throw new Error('Module <'+module+'> is already definded!');
			}
			if(module!='main' && load_queue.none(function(name) {
				return name==module;
			})) {
				throw new Error('Module <'+module+'> does not match filename!');
			}
			return module_list[module] = {
				name:			module,
				initialized:	false,
				dependencys:	[],
				init_func:		null,
				context:		null,
				
				init:			function(func) {
					this.init_func = func;
					evaluateModules(); //FIXME If there are no dependencys. Never verfied!
					return this;
				},
				requires:		function() {
					// http://bonsaiden.github.com/JavaScript-Garden/#function.arguments
					this.dependencys = Array.prototype.slice.call(arguments);
					this.dependencys.forEach(function(dependency) {
						if(!module_list[dependency] &&
	// 						!load_queue[dependency]) {
							//TODO verfy this fix
							load_queue.none(dependency)) {
							loadModule(dependency);
	// 						console.log("load: "+dependency+" (queue: "+load_queue+")");
	// 						load_queue[dependency] = [];
						}
	// 					load_queue[dependency].push(module);
					});
					return this;
				}
			};
		};
	};
})();
