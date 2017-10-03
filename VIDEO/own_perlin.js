 // Function to linearly interpolate between a0 and a1
 // Weight w should be in the range [0.0, 1.0]
 var lerp = function ( a0, a1,  w) {
     return (1.0 - w)*a0 + w*a1;
 };
 var Gradient = [];
 // Computes the dot product of the distance and gradient vectors.
 var dotGridGradient = function( ix,  iy,  x,  y) {
 
     // Precomputed (or otherwise) gradient vectors at each grid node
     // var Gradient[IYMAX][IXMAX][2];
 
     // Compute the distance vector
     var dx = x - ix;
     var dy = y - iy;
     console.log('ix : ' + ix + '; iy : ' + iy)
     // Compute the dot-product
     return (dx*Gradient[iy][ix][0] + dy*Gradient[iy][ix][1]);
     // return (dx + dy);
 };
 
 // Compute Perlin noise at coordinates x, y
 var perlin = function(x, y) {

     // Determine grid cell coordinates
     var x0 = Math.floor(x);
     var x1 = x0 + 1;
     var y0 = Math.floor(y);
     var y1 = y0 + 1;
 
     // Determine interpolation weights
     // Could also use higher order polynomial/s-curve here
     var sx = x - x0;
     var sy = y - y0;
 
     // Interpolate between grid point gradients
     var n0, n1, ix0, ix1, value;
     n0 = dotGridGradient(x0, y0, x, y);
     n1 = dotGridGradient(x1, y0, x, y);
     ix0 = lerp(n0, n1, sx);
     n0 = dotGridGradient(x0, y1, x, y);
     n1 = dotGridGradient(x1, y1, x, y);
     ix1 = lerp(n0, n1, sx);
     value = lerp(ix0, ix1, sy);
 
     return value;
 };
 var generateRandomXY = function(){
     var a = Math.floor(Math.random() * 3)-1;
     var b = Math.floor(Math.random() * 3)-1;
     return [a,b];
 };
 var generatePerlinNoise = function(width,height){

     for(var i = 0;i<width+2;i++){
          Gradient.push([]);
          for(var j = 0; j < height+2;j++){
               Gradient[i]
               Gradient[i].push(generateRandomXY());
               
          }

     }

     var result = [];
     var current;
     for(var i = 0; i< width;i+=1){
          result.push([]);
          // console.log(i);
          for(var j = 0; j< height;j+=1){
               // console.log(j);
               current =  perlin(i,j);
               result[i].push(current);
          }
     }
     return result;
 };