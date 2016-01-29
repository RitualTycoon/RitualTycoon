ge.Module.define('engine.animation').requires('engine.util', 'engine.entity')
.init(function() {
	"use strict";
	
	var module = this,
		last_id = 0;
	
	this.AnimationQueue = this.engine.util.LinkedList.extend({
		addAnimation:	function(func, start, end, duration, finish) {
			var anim = new module.Animation(this, func, start, end, duration, finish);
			this.push(anim);
			return anim;
		},
		runAnimations:	function() {
			var elem = this.first;
			while(elem != null) {
				var anim = elem.item;
// 				console.log(ge.Timer.now+"\n"+(anim.start_time+anim.duration)+"\n----");
				if(ge.Timer.now>anim.start_time+anim.duration) {
					// to reach the end-value for sure
					anim.anim_function(anim.end_value);
					anim.stopAnimation();
					(anim.finish_func || function() {})();
				} else {
					anim.anim_function(anim.calculateValue());
				}
				elem = elem.successor;
			}
		}
	});
	
	//TODO Cleanup
	this.Animation = ge.Class.extend({
		id:		0,
		
		init:	function(queue, func, start, end, duration, finish) {
			this.id				= last_id++;
			this.queue			= queue;
			this.start_time		= ge.Timer.now;
	// 		this.end_time	= ge.Timer.now+duration;
			this.duration		= duration;
			this.start_value	= start;
			this.end_value		= end;
			
// 			this.successor		= queue.first;
// 			this.precessor		= null;
			this.anim_function	= func;
			this.finish_func	= finish;
		},
		calculateValue:	function() {
			return this.start_value-(this.start_value-this.end_value)*((ge.Timer.now-this.start_time)/this.duration);
		},
		stopAnimation:	function() {
			this.queue.remove(this);
		},
	});

// 	this.addAnimation = function(obj, func, start, end, duration, finish) {
// 	};
	
	this.Animatable = this.engine.entity.Component.extend({
		init:	function(entity, timer) {
			this._super(entity);
			
			var self	= this,
				queue	= new module.AnimationQueue();
			this.animate = queue.addAnimation.bind(queue);
			
			entity.reg('update', function() {
				queue.runAnimations();
			});
			
// 			this.dispose = function() {
// 				self.dispose();
// 				console.log('dispose');
// 			};
// 				console.log(entity.test, string);
// 				console.log([].splice.call(arguments, 0));
		},
		dispose:	function() {
			this._super();
			console.log('dispose');
		}
	});
// 	this.Animatable.id = 'hello';
});
