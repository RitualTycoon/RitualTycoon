//TODO gl-matrix has bug, -> unusable but mjs creates way to much garbage

ge.Module.define('engine.map.iso').requires('engine.panel', 'engine.loader')
.init(function() {
	"use strict";
	var module	= this,
		loader	= module.engine.loader;
	
	loader.addType('shader', function(url, type) {
		var request	= new XMLHttpRequest(),
			obj		= {
				load: function(success, error) {
					request.onload = function() {
						obj.type = type;
						obj.code = request.response;
						success();
					};
					request.onerror= error;
					request.send();
				}
			};
		request.open("GET", url, true);
		return obj;
	});
	
	module.WebGLPanel = module.engine.panel.Panel.extend({
// 		glmatrix:	loader.load('script', 'src/engine/libs/toji-gl-matrix-0d88336/dist/gl-matrix-min.js'),
// 		glmatrix:	loader.load('script', 'src/engine/libs/gl-matrix-min.js'),
		mjs:		loader.load('script', 'src/engine/libs/mjs.js'),
		
		init:	function(state, canvas, shader) {
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
			
			this._super(state);
			this.canvas = canvas;
			
			this.mv_matrix	= M4x4.I; //mat4.create();
			this.p_matrix	= M4x4.I; //mat4.create();
			
			var ctx = this.context = canvas.getContext("experimental-webgl", {antialias: false}),
				prog = this.shader_progam = ctx.createProgram();

			shader.forEach(function(elem) {
				var shader	= ctx.createShader({
					'x-shader/x-fragment':	ctx.FRAGMENT_SHADER,
					'x-shader/x-vertex':	ctx.VERTEX_SHADER}[elem.type]);
				ctx.shaderSource(shader, elem.code);
				ctx.compileShader(shader);
				if (!ctx.getShaderParameter(shader, ctx.COMPILE_STATUS))
					console.error(ctx.getShaderInfoLog(shader));
				
				ctx.attachShader(prog, shader);
			});
			ctx.linkProgram(prog);
			if (!ctx.getProgramParameter(prog, ctx.LINK_STATUS))
				console.error("Could not initialise shaders");
			
			this.context.viewportWidth	= canvas.width;
			this.context.viewportHeight	= canvas.height;
		},
		loop:	function() {
			var ctx = this.context;
			ctx.viewport(0, 0, ctx.viewportWidth, ctx.viewportHeight);
			ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT);
			this._super();
		}
	});
	
	var vertices,
		indices,
		uvs,
		colors;
	function initBuffers(ctx) {
		function createBuffer(type, data) {
			var buffer = ctx.createBuffer();
			ctx.bindBuffer(type, buffer);
			ctx.bufferData(type, data, ctx.STATIC_DRAW);
			return buffer;
		}
		
		var ht = .5;
		vertices = createBuffer(ctx.ARRAY_BUFFER, new Float32Array([
			0,ht,0,
			0,ht,1,
			1,ht,1,
			1,ht,0,
			0,0,1,
			1,0,1,
			1,0,0
		]/*.map(function(x) {
			return x*1.001;
		})*/));
		vertices.itemSize = 3;
		vertices.numItems = 7;
		
		indices = createBuffer(ctx.ELEMENT_ARRAY_BUFFER, new Uint16Array([
			0,1,2, 0,2,3, 1,4,2, 2,4,5, 3,2,6, 2,5,6
		]));
		indices.itemSize = 1;
		indices.numItems = 18;
		
		uvs = createBuffer(ctx.ARRAY_BUFFER, new Float32Array([
			0.5, 0.0,
			0.0, 0.25,
			0.5, 0.5,
			1.0, 0.25,
			0.0, 0.5,
			0.5, 0.75,
			1.0, 0.5
		].map(function(x, i) {
			return x+(i%2)*.01;
		})));
		uvs.itemSize = 2;
		uvs.numItems = 7;
		
		var c = [];
		[
			[1.0, 0.0, 0.0, 1.0], // Front face -- top
			[1.0, 1.0, 0.0, 1.0], // Back face #
			[0.0, 1.0, 0.0, 1.0], // Top face
		].forEach(function(color) {
			for(var j=0; j < 4; j++) {
				c = c.concat(color);
			}
		});
		//TODO Ugly
		colors = createBuffer(ctx.ARRAY_BUFFER, new Float32Array(c));
		colors.itemSize = 4;
		colors.numItems = 12;
	}
	
	function handleLoadedTexture(texture) {
		ctx.bindTexture(ctx.TEXTURE_2D, texture);
// 		ctx.pixelStorei(ctx.UNPACK_FLIP_Y_WEBGL, true);
		ctx.texImage2D(ctx.TEXTURE_2D, 0, ctx.RGBA, ctx.RGBA, ctx.UNSIGNED_BYTE, texture.image);
		ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MAG_FILTER, ctx.NEAREST);
		ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MIN_FILTER, ctx.NEAREST);
		ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_S, ctx.CLAMP_TO_EDGE /*ctx.CLAMP_TO_EDGE*/);
		
		ctx.bindTexture(ctx.TEXTURE_2D, null);
	}
	
	var texture;
	function initTexture(ctx, image) {
		texture = ctx.createTexture();
		ctx.bindTexture(ctx.TEXTURE_2D, texture);
		ctx.texImage2D(ctx.TEXTURE_2D, 0, ctx.RGBA, ctx.RGBA, ctx.UNSIGNED_BYTE, image);
		ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MAG_FILTER, ctx.NEAREST);
		ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MIN_FILTER, ctx.NEAREST);
		ctx.bindTexture(ctx.TEXTURE_2D, null);
		return texture;
	}
	
	module.IsoMap = module.WebGLPanel.extend({
		tileset:	loader.load('image', 'tile.png'),
		f_shader:	loader.load('shader', 'shader/fragment.shdr', 'x-shader/x-fragment'),
		v_shader:	loader.load('shader', 'shader/vertex.shdr', 'x-shader/x-vertex'),
		
		init:	function(state, canvas) {
			this._super(state, canvas, [this.f_shader, this.v_shader]);
			var ctx = this.context,
				prog = this.shader_progam;
			
			canvas.webkitImageSmoothingEnabled = ctx.imageSmoothingEnabled = ctx.mozImageSmoothingEnabled = ctx.oImageSmoothingEnabled = false;
			
			ctx.useProgram(prog);
			prog.vertex_pos = ctx.getAttribLocation(prog, "aVertexPosition");
			prog.vertex_color = ctx.getAttribLocation(prog, "aVertexColor");
			prog.texture_coord = ctx.getAttribLocation(prog, "aTextureCoord");
			
			ctx.enableVertexAttribArray(prog.vertex_pos);
			ctx.enableVertexAttribArray(prog.vertex_color);
			ctx.enableVertexAttribArray(prog.texture_coord);
			
			prog.pMatrixUniform	= ctx.getUniformLocation(prog, "uPMatrix");
			prog.mvMatrixUniform	= ctx.getUniformLocation(prog, "uMVMatrix");
			
// 			console.log(mat4.str(this.mv_matrix));
// 			mat4.translate(this.mv_matrix, this.mv_matrix, [1, 0, 0]);
// 			console.log(mat4.str(this.mv_matrix));
			
			initBuffers(ctx);
			this.texture = initTexture(ctx, this.tileset);
		},
		loop:	function() {
			this._super();
			var ctx = this.context,
				prog = this.shader_progam,
				xPos = 0,
				yPos = 0,
				zPos = -10,
				zoom = 45;

// 			mat4.perspective(this.p_matrix, 45, ctx.viewportWidth / ctx.viewportHeight, 0.1, 1000.0);
// 			mat4.ortho(this.p_matrix, 0, ctx.viewportWidth/zoom, 0, ctx.viewportHeight/zoom, 0.1, 100.0);
// 			var width = ctx.viewportWidth/(2*zoom),
// 				height = ctx.viewportHeight/(2*zoom);
// 			mat4.ortho(this.p_matrix, -width, width, -height, height, -1, 100);
			
// 			this.p_matrix = M4x4.makePerspective(50.0, ctx.viewportWidth / ctx.viewportHeight, 1.0, 10.0);
// 			this.p_matrix = M4x4.makeOrtho(-width, width, -height, height, -1, 100);
			
				var tile_pixel_width_ = 64,
					tile_world_size_ = tile_pixel_width_ / 4,
					aspect = ctx.viewportHeight / ctx.viewportWidth,
					screen_tiles=ctx.viewportWidth / tile_pixel_width_,
					ortho_width=screen_tiles*tile_world_size_*1.414213562373,
					ortho_height=ortho_width * aspect,
					fac = 32;
// 				console.log(ortho_width, ortho_width);
// 				mat4.ortho(-ortho_width/2, ortho_width/2,-ortho_height/2,ortho_height/2, 0.1, 100);
				this.p_matrix = M4x4.makeOrtho(-ortho_width/fac, ortho_width/fac,-ortho_height/fac,ortho_height/fac, -1, 100);
			
// 			mat4.identity(this.mv_matrix);
			
			this.mv_matrix = M4x4.I;
			
			var self = this,
				mvMatrixStack = [];
			function mvPushMatrix() {
// 				mvMatrixStack.push(mat4.clone(self.mv_matrix));
				mvMatrixStack.push(M4x4.clone(self.mv_matrix));
			}
			function mvPopMatrix() {
				if (mvMatrixStack.length == 0) {
					throw "Invalid popMatrix!";
				}
				self.mv_matrix = mvMatrixStack.pop();
			}
			function degToRad(deg) {
				return deg * Math.PI / 180;
			}

// 			mat4.translate(this.mv_matrix, this.mv_matrix, [-xPos, -yPos, -zPos]);	//NOTE Reihenfolge richtig?
// 			console.log(this.mv_matrix);
// 			mat4.rotate(this.mv_matrix, this.mv_matrix, degToRad(30), [1, 0, 0]);
// 			mat4.rotate(this.mv_matrix, this.mv_matrix, degToRad(-45), [0, 1, 0]);
			this.mv_matrix = M4x4.translate([xPos, yPos, zPos], this.mv_matrix);
			this.mv_matrix = M4x4.rotate(degToRad(30), [1, 0, 0], this.mv_matrix);
			this.mv_matrix = M4x4.rotate(degToRad(-45), [0, 1, 0], this.mv_matrix);
			
			for(var x=-5; x<5; x++) {
				for(var y=-5; y<5; y++) {
					for(var z=0; z<2; z++) {
						mvPushMatrix();
// 						mat4.translate(this.mv_matrix, this.mv_matrix, [x*1.1, y*1.1, z*1.1]);
// 						mat4.translate(this.mv_matrix, this.mv_matrix, [z, 0, 0]);
// 						mat4.translate(this.mv_matrix, [0, 0, 0], this.mv_matrix);
// 						mat4.rotate(this.mv_matrix, this.mv_matrix, .2, [1, 1, 1]);
						
// 						this.mv_matrix = M4x4.translate([x, 0, y], this.mv_matrix);

						ctx.activeTexture(ctx.TEXTURE0);
						ctx.bindTexture(ctx.TEXTURE_2D, this.texture);
						ctx.uniform1i(prog.samplerUniform, 0);

						ctx.bindBuffer(ctx.ARRAY_BUFFER, vertices);
						ctx.vertexAttribPointer(prog.vertex_pos, vertices.itemSize, ctx.FLOAT, false, 0, 0);
						
						ctx.bindBuffer(ctx.ARRAY_BUFFER, uvs);
						ctx.vertexAttribPointer(prog.texture_coord, uvs.itemSize, ctx.FLOAT, false, 0, 0);

						ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, indices);
						
						ctx.bindBuffer(ctx.ARRAY_BUFFER, colors);
						ctx.vertexAttribPointer(prog.vertex_color, colors.itemSize, ctx.FLOAT, false, 0, 0);
						
						ctx.uniformMatrix4fv(prog.pMatrixUniform, false, this.p_matrix);
						ctx.uniformMatrix4fv(prog.mvMatrixUniform, false, this.mv_matrix);
	
						ctx.drawElements(ctx.TRIANGLES, indices.numItems, ctx.UNSIGNED_SHORT, 0);
						
						mvPopMatrix();
						break;
					}
					break;
				}
				break;
			}
		}
	});
});
