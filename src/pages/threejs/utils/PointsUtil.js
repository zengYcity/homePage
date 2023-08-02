import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

const getPoints = ({ num, isNeedTween, ...rest }) => {
  // 构建粒子的几何图形
  const geometry = new THREE.BufferGeometry();
  // 记录图形中每个顶点的动画
  geometry.tween = [];
  // 当前随机生成的基础顶点数组
  const positionArray = [];
  for (let i = 0; i < num; i += 1) {
    const position = THREE.MathUtils.randFloat(-5, 5);
    if (isNeedTween) {
      geometry.tween.push(new TWEEN.Tween({ position }).easing(TWEEN.Easing.Exponential.In));
    }
    positionArray.push(position);
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positionArray), 3));
  return new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      map: new THREE.TextureLoader().load(`${process.env.PUBLIC_URL}/gltf/png/baby-blue.png`),
      size: 0.02,
      alphaTest: 0.2,
      opacity: 0.6,
      transparent: true,
      depthTest: true,
      ...rest,
    })
  );
};

export default getPoints;
