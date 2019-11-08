/**
 * Converts our planeShift shader into something usable with threejs.
 * TODO: Eventually this should be broken out into a utility to automatically
 * create these for any shader folder.
 */
import glslify from 'glslify';

// // inline shader code
// const source = glslify({
//   vertex: './frag.glsl',
//   fragment: './vert.glsl',
//   sourceOnly: true
// });

// // convert to ThreeJS shader object:
// // { vertexShader, fragmentShader, uniforms, attributes }
// const create = require('three-glslify')(THREE);
// const xtend = require('xtend');

// export default (args) => {
//   return xtend(create(source), args)
// };

const frag = glslify('./frag.glsl');
const vert = glslify('./vert.glsl');

export { frag, vert };
