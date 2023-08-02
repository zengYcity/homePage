import { useEffect } from 'react';
import { FloatButton } from 'antd';
import * as THREE from 'three';
// import { ReactComponent as BackgroundIcon } from '../../../../assets/homePage/background.svg';
import './index.css';

const themeMap = {
  lightBlue: '#000035',
  normalBlue: '#000022',
  darkBlue: '#000010',
  lightPurple: '#12043c',
  normalPurple: '#090316',
  darkPurple: '#05030d',
};

const SwitchSceneBackground = ({ objects, render }) => {
  const getCanvasTexture = color => {
    const canvas = document.createElement('canvas');
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#000000');
    gradient.addColorStop(0.5, color);
    gradient.addColorStop(1, '#000000');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    return new THREE.CanvasTexture(canvas);
  };

  useEffect(() => {
    if (!objects) return;
    const { scene } = objects;
    scene.background = getCanvasTexture(themeMap.darkBlue);
    render();
  }, [objects]);

  const onThemeChange = theme => {
    if (!objects) return;
    const { scene } = objects;
    scene?.background?.dispose();
    scene.background = getCanvasTexture(themeMap[theme]);
    render();
  };

  return (
    <FloatButton.Group shape="square">
      <FloatButton description="暗蓝" onClick={() => onThemeChange('darkBlue')} />
      <FloatButton description="暗紫" onClick={() => onThemeChange('darkPurple')} />
      <FloatButton description="深蓝" onClick={() => onThemeChange('normalBlue')} />
      <FloatButton description="深紫" onClick={() => onThemeChange('normalPurple')} />
      <FloatButton description="亮蓝" onClick={() => onThemeChange('lightBlue')} />
      <FloatButton description="亮紫" onClick={() => onThemeChange('lightPurple')} />
    </FloatButton.Group>
  );
};

export default SwitchSceneBackground;
