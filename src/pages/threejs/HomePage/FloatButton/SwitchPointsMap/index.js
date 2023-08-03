import { useEffect, useState } from 'react';
import { FloatButton } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { POINTS_MAPS } from '../../constant';
import '../index.css';

const SwitchSceneBackground = ({ objects, current, render }) => {
  const [isAuto, setIsAuto] = useState(true);

  const setPointsMap = num => {
    if (!objects) return;
    const { points } = objects;
    const newTexture = new THREE.TextureLoader().load(POINTS_MAPS[num || 0]);
    // 创建 Tween 动画对象
    new TWEEN.Tween({ t: 0 })
      .to({ t: 1 }, 400) // 动画时长为 1000 毫秒
      .easing(TWEEN.Easing.Linear.None) // 使用 Quadratic.Out 缓动函数
      .onUpdate(({ t }) => {
        // 在动画更新时修改材质贴图
        if (t > 0.5) {
          points.material.map = newTexture;
        }
      })
      .onComplete(() => {
        render();
      })
      .start();
  };

  useEffect(() => {
    if (isAuto && objects) {
      setPointsMap(THREE.MathUtils.randInt(0, 7));
    }
  }, [current, objects]);

  const onPointsMapChange = num => {
    setPointsMap(num);
  };

  return (
    <FloatButton.Group shape="square">
      <FloatButton
        type={isAuto ? 'primary' : 'default'}
        icon={<ClockCircleOutlined className="theme-icon" />}
        tooltip={isAuto ? '关闭自动随机切换粒子颜色' : '开启自动随机切换粒子颜色'}
        onClick={() => setIsAuto(!isAuto)}
      />
      <FloatButton description="浅蓝" onClick={() => onPointsMapChange(0)} />
      <FloatButton description="蓝色" onClick={() => onPointsMapChange(1)} />
      <FloatButton description="墨绿" onClick={() => onPointsMapChange(2)} />
      <FloatButton description="荧绿" onClick={() => onPointsMapChange(3)} />
      <FloatButton description="绿色" onClick={() => onPointsMapChange(4)} />
      <FloatButton description="白色" onClick={() => onPointsMapChange(5)} />
      <FloatButton description="黄色" onClick={() => onPointsMapChange(6)} />
      <FloatButton description="红色" onClick={() => onPointsMapChange(7)} />
    </FloatButton.Group>
  );
};

export default SwitchSceneBackground;
