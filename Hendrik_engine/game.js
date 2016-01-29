ge.Module.define('engine.game')
// .requires('engine.loader') //, 'engine.input')
.init(function() {
	"use strict";
	var module = this;
	
	module.Game = ge.Class.extend({
		//TODO shift more in here! Like ressources etc.
// 		loader:	new this.engine.loader.Loader(),
// 		state:		null,
// 		running:	null,
// 		loader:	null,
		
		init:	function(state) {
			this.running	= false;
			this.state		= state;
			
			state.show(null);
// 			this.loader = loader||this.engine.loader.Loader;
// 			this._super();
// 			this.loader = this.state = new (loader||self.engine.loader.Loader)(state); //new self.engine.loader.Loader(screen);
		}
	});
});
