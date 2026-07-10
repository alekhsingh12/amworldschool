const container = document.getElementById("liquidHero");

const scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera(
    -1, 1, 1, -1, 0.1, 10
);

camera.position.z = 1;

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

container.appendChild(renderer.domElement);

const loader = new THREE.TextureLoader();

const imagePath =
    window.matchMedia("(max-width: 992px)").matches
        ? "../sky.jpeg"
        : "../building.jpeg";
const texture = loader.load(imagePath);




texture.minFilter = THREE.LinearFilter;

const material = new THREE.ShaderMaterial({

    uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) }
    },

    vertexShader: `

        varying vec2 vUv;

        void main(){

            vUv=uv;

            gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);

        }

        `,

    fragmentShader: `

        uniform sampler2D uTexture;

        uniform float uTime;

        uniform vec2 uMouse;

        varying vec2 vUv;

        void main(){

            vec2 uv=vUv;

            float d=distance(uv,uMouse);

            float ripple = sin(18.0 * d - uTime * 3.0);
float strength = 0.012 * exp(-12.0 * d);

uv += normalize(uv - uMouse) * ripple * strength;

            gl_FragColor=texture2D(uTexture,uv);

        }

        `

});

const geometry = new THREE.PlaneGeometry(2, 2);

const mesh = new THREE.Mesh(
    geometry,
    material
);

scene.add(mesh);

window.addEventListener("mousemove", e => {

    const rect = renderer.domElement.getBoundingClientRect();

    material.uniforms.uMouse.value.x =
        (e.clientX - rect.left) / rect.width;

    material.uniforms.uMouse.value.y =
        1 - (e.clientY - rect.top) / rect.height;

});

function animate(time) {

    requestAnimationFrame(animate);

    material.uniforms.uTime.value = time * 0.001;

    renderer.render(scene, camera);

}

animate();

