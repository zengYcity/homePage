import { useCallback, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import TWEEN from '@tweenjs/tween.js';
import SwitchSceneBackground from './FloatButton/SwitchSceneBackground';
import SwitchPointsMap from './FloatButton/SwitchPointsMap';
import getPoints from '../utils/PointsUtil';
import { GLTF_URLS } from './constant';
import { loadGLTFLs } from '../utils/GLTFLoaderUtil';
import './index.css';

const Index = () => {
  const [objects, setObjects] = useState(null);
  const [current, setCurrent] = useState(0);

  const initBase = useCallback(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    camera.position.set(0, 1, 5);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    const backgroundPoints = getPoints({ num: 20000, size: 0.025 });
    const points = getPoints({ num: 41967, isNeedTween: true });
    scene.add(backgroundPoints);
    scene.add(points);
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    document.querySelector('.three-container').appendChild(renderer.domElement);
    renderer.render(scene, camera);
    setObjects({ scene, camera, renderer, orbitControls, points });
  }, []);

  const render = useCallback(() => {
    if (objects) {
      const { scene, camera, renderer, orbitControls } = objects;
      orbitControls.update();
      renderer.render(scene, camera);
    }
  }, [objects]);

  const loadAnimation = useCallback(
    (points, gltfResults, loop = 0) => {
      const geometry = points?.geometry;
      for (let i = 0, j = 0; i < gltfResults[3].length; i += 1, j += 1) {
        if (j >= gltfResults[loop].length) {
          j = 0;
        }
        geometry.tween[i]
          .to({ position: gltfResults[loop][j] }, THREE.MathUtils.randFloat(1000, 3000))
          .onUpdate(({ position }) => {
            geometry.attributes.position.array[i] = position;
            geometry.attributes.position.needsUpdate = true;
            geometry.tween[i] = new TWEEN.Tween({ position }).easing(TWEEN.Easing.Exponential.In);
          })
          .start();
      }

      const newLoop = (loop + 1) % 4;
      setCurrent(newLoop);
      setTimeout(() => loadAnimation(points, gltfResults, newLoop), 4000);
    },
    []
  );

  const animate = useCallback(() => {
    // const { points } = objects;
    // points.rotation.x += 0.0004;
    // points.rotation.y += 0.0005;
    // points.rotation.z += 0.0006;
    TWEEN.update();
    render();
    requestAnimationFrame(animate);
  }, [objects, render]);

  const loadAllGLTFs = useCallback(() => {
    if (!objects) return;
    loadGLTFLs({ urls: GLTF_URLS }, results => {
      loadAnimation(objects?.points, results);
      animate();
    });
  }, [objects, render, loadAnimation, animate]);

  const onWindowResize = useCallback(() => {
    const { renderer, camera } = objects;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }, [objects]);

  // 初始化
  useEffect(() => {
    initBase();
  }, []);

  // 加载模型
  useEffect(() => {
    loadAllGLTFs();
  }, [objects]);

  // 事件监听
  useEffect(() => {
    if (objects) {
      window.addEventListener('resize', onWindowResize);
      // objects.orbitControls.addEventListener('change', () => render());
    }
    return () => {
      window.removeEventListener('resize', onWindowResize);
      // objects?.orbitControls?.removeEventListener('change', () => render());
    };
  }, [objects, render]);

  return (
    <>
      <div className="three-container" />
      <SwitchSceneBackground objects={objects} current={current} render={render} />
      <SwitchPointsMap objects={objects} current={current} render={render} />
    </>
  );
};

export default Index;
