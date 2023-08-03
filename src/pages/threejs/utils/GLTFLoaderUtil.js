import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const loadGLTF = ({ url, loadingManager, index }, onLoad) => {
  if (!url) return;
  const params = loadingManager ? [loadingManager] : [];
  new GLTFLoader(...params).load(url, gltf => {
    gltf.scene.traverse(child => {
      if (child.isMesh) {
        // 移动
        const positions = [
          [-3, 3, 0],
          [0, -3, 0],
          [3, 3, 0],
          [0, 0, 0],
        ];
        child.geometry.translate(...positions[index]);
        // 缩放
        child.geometry.scale(0.4, 0.4, 0.4);
        // 旋转
        child.geometry.rotateX(Math.PI / 2);
        // 变换后的模型顶点数组
        const { array } = child?.geometry?.attributes?.position;
        if (onLoad) {
          onLoad(array || []);
        }
      }
    });
  });
};

export const loadGLTFLs = ({ urls }, onLoad) => {
  const loadingManager = new THREE.LoadingManager();
  const GLTFPositionList = [];
  (urls || []).forEach((url, index) => {
    loadGLTF({ url, loadingManager, index }, positionList => {
      GLTFPositionList.push(positionList);
    });
  });
  loadingManager.onLoad = () => {
    onLoad(GLTFPositionList);
  };
};
