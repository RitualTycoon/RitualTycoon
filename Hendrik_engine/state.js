ge.Module.define('engine.state').requires('engine.util', 'engine.entity')
.init(function() {
	"use strict";
	var module = this;
	
	this.State = ge.EventSystem.extend({
// 		parent:		null,
// 		panels:		null,
		
		init:	function() {
			this._super();
// 			this.parent	= parent;
// 			this.panels	= panels||[];
			
			this.next_state	= null;
			this.entities	= new module.engine.util.LinkedList();
			this.systems	= new module.engine.util.LinkedList();
			this.createSystem = module.engine.entity.createEntry.bind(this.systems, this);
			
			//TODO find solution
// 			this.panels.each(function(panel) {
// 				panel.state = this;
// 			});
		},
		show:	function(precessor) {
			this.trigger('show');
// 			this.panels.each(function(panel) {
// 				panel.trigger('show');
// 			});
			// null when initially shown state (usually the loader only)
			if(precessor) {
				ge.game.state.hide(this);
			}
// 			if(ge.Input) {
// 				this.bindEvents();
// 			}
		},
		hide:	function(successor) {
			this.trigger('hide');
// 			this.panels.each(function(panel) {
// 				panel.trigger('hide');
// 			});
// 			if(ge.Input) {
// 				ge.input.unbindAll();
// 			}
		},
		spawnEntity:		function(entity) {
			var args		= [null, this].concat([].splice.call(arguments, 1)),
				instance	= new (entity.bind.apply(entity, args));
			this.entities.push(instance);
// 			console.log(instance);
			this.trigger('spawn', instance);
			this.systems.forEach(function(sys) {
				sys.enquireAdmission(instance);
			});
			return instance;
		},
		loop:	function() {
			this.trigger('loop');
// 			for(var i=0; i<this.panels.length; i++) {
// 				this.panels[i].loop();
// 			}
			this.systems.forEach(function(sys) {
				sys.update();
			});
			
			var target_state = this.next_state;
			if(this.next_state) {
				this.next_state = null;
			}
			return target_state;
		},
// 		draw:	function() {
// 			for(var i=0; i<this.panels.length; i++) {
// 				this.panels[i].draw();
// 			}
// 		},
		bindEvents:	function() {},
	});
});
