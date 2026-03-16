const scene=new THREE.Scene()

const camera=new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
)

const renderer=new THREE.WebGLRenderer({alpha:true})

renderer.setSize(window.innerWidth,window.innerHeight)

renderer.domElement.id = "background-canvas"
document.body.appendChild(renderer.domElement)

camera.position.z=60

const particles=120

const geometry=new THREE.BufferGeometry()

const positions=[]

for(let i=0;i<particles;i++){

positions.push(

(Math.random()-0.5)*120,
(Math.random()-0.5)*120,
(Math.random()-0.5)*120

)

}

geometry.setAttribute(
"position",
new THREE.Float32BufferAttribute(positions,3)
)

const material=new THREE.PointsMaterial({

color:0x00ffff,
size:1.5

})

const points=new THREE.Points(geometry,material)

scene.add(points)

const linesMaterial=new THREE.LineBasicMaterial({

color:0x00ffff,
opacity:0.2,
transparent:true

})

const linesGeometry=new THREE.BufferGeometry()

const lines=[]

for(let i=0;i<positions.length;i+=3){

for(let j=i+3;j<positions.length;j+=3){

const dx=positions[i]-positions[j]
const dy=positions[i+1]-positions[j+1]
const dz=positions[i+2]-positions[j+2]

const dist=Math.sqrt(dx*dx+dy*dy+dz*dz)

if(dist<25){

lines.push(

positions[i],
positions[i+1],
positions[i+2],

positions[j],
positions[j+1],
positions[j+2]

)

}

}

}

linesGeometry.setAttribute(
"position",
new THREE.Float32BufferAttribute(lines,3)
)

const lineMesh=new THREE.LineSegments(linesGeometry,linesMaterial)

scene.add(lineMesh)

function animate(){

requestAnimationFrame(animate)

points.rotation.y+=0.0007
lineMesh.rotation.y+=0.0007

renderer.render(scene,camera)

}

animate()

window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight
camera.updateProjectionMatrix()

renderer.setSize(window.innerWidth,window.innerHeight)

})