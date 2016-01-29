"use strict";
ge.Module.define('engine.loader').requires('engine.state', 'engine.panel').init(function() {
	var module	= this,
		process	= [],
		loader	= {
			'image':	function(url) {
				var img = new Image(); //document.createElement('img');
				img.load = function(success, error) {
					this.onload = success;
					this.onerror = error;
					this.src = url;
				}
				return img;
			},
			'script':	function(url, type) {
				var script	= document.createElement('script');
				script.type	= type || 'text/javascript';
				document.getElementsByTagName('head')[0].appendChild(script);
				script.load = function(success, error) {
					this.onload = success;
					this.onerror = error;
					this.src = url;
				}
				return script;
			}
		},
		resources	= {};
	
	module.addType = function(type, fct) {
		loader[type] = fct;
	};
	
	module.load	= function(type, url) {
		var list	= resources[type]||[],
			args	= [].splice.call(arguments, 1);
		if(list.isEmpty())
			resources[type] = list;
		return list[url] || (function() {
			var obj		= loader[type].apply(this, args);
			process.push(obj);
			return obj;
		})();
	};
	
	//TODO better name
	module.preload = function() {
		var status = {
			process:	0,
			finished:	0
		};
		function success() {
			status.process--;
			status.finished++;
		}
		function error() {
			console.error('Ressource load fail');
		}
		
		process.forEach(function(res) {
			status.process++;
			res.load(success, error);
		});
		return status;
	}
	
	module.Loader = module.engine.state.State.extend({
		//FIXME Noone says, that the loader can only be the 1. State (dynamic reload)
		init: function(state) {
			this._super(null);
			this.state	= state;
			this.status	= module.preload();
			console.log('loading...');
		},
		
		loop: function() {
// 			console.log(this.status);
			if(this.status.process == 0) {
				console.log('loading complete ('+this.status.finished+' files)');
				return this.state; /*new (this.state)();*/
			}
		},
// 		load: function(type, url) {
// 			var self = this;
// 			this.busy++;
// 			var resource = new (type)(url);
// 			resource.load(function() {
// 				// TODO Test
// // 				setTimeout(function() {
// 					self.busy--;
// // 				}, Math.random() * 500 + 250);
// 				
// 			});
// 			return resource;
// 		}
	});
	
	module.SimpleLoaderScreen = module.engine.panel.HTMLPanel.extend({
		init: function(state, dom) {
			this._super(state);
			this.preloader = module.preload();
		},
		
		loop: function() {
			this.draw(this.context);
			return this._super();
		},
		
		draw: function(ctx) {
			ctx.fillStyle	= 'black';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle	= 'white';
			ctx.fillText('Loading...', 10, 10);
			ctx.fillText(this.busy + ' files remaining', 10, 25);
		},
	});
	
	/*this.Loader = this.engine.state.State.extend({
		init: function(state) {
			this._super(null);
			this.busy	= 0;
			this.state	= state;
		},
		
		loop: function() {
// 			console.log(this.busy);
			if(this.busy == 0) {
				return this.state;
			}
		},
		load: function(type, url) {
			var self = this;
			this.busy++;
			var resource = new (type)(url);
			resource.load(function() {
				// TODO Test
// 				setTimeout(function() {
					self.busy--;
// 				}, Math.random() * 500 + 250);
				
			});
			return resource;
		}
	});
	
	this.Image = ge.Class.extend({
		url:	null,
		img:	null,
		
		init:	function(url, callback) {
			this.url = url;
		},
		
		load:	function(callback) {
			this.img = new Image();
			this.img.onload = function() {
				(callback || function() {})();
			};
			this.img.src = this.url;
		},
	});
	
	
	this.SimpleLoader = this.Loader.extend({
		init: function(state, canvas) {
			this._super(state);
			this.canvas = canvas;
			this.context = canvas.getContext('2d');
		},
		
		loop: function() {
			this.draw(this.context);
			return this._super();
		},
		
		draw: function(ctx) {
			ctx.fillStyle	= 'black';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle	= 'white';
			ctx.fillText('Loading...', 10, 10);
			ctx.fillText(this.busy + ' files remaining', 10, 25);
		},
	});*/
});
