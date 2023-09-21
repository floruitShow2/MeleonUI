### 一、THREEJS 功能实现思路

#### 	（一）模型高亮

##### 1. 功能介绍

​		用户获取到导入模型所有图层的名称列表后，鼠标悬停到某一图层，获取该图层上的名称后，高亮模型中的该部件

##### 2. 实现思路

###### （1）根据模型名称获取对象实例：

```ts
<THREE.Object3D> - .getObjectByName(name: string): Obejct3D
```

###### （2）拷贝对象实例

理论上拷贝操作会复制原对象上包括 position 等所有属性，但是会有一些特殊情况需要做额外处理

```ts
const maskObject = objectMesh.clone()

// position - 需要手动更新，考虑到性能问题，threejs不提供自动更新位置信息的功能
const vector3 = new THREE.Vector3()
const worldVector3 = objects<THREE.Object3D>.getWorldPosition(vector3)
maskObject.position.copy(worldVector3)

// rotation - 当将多个对象用 Group 包裹后，rotation 等属性会作用在 Group 上，如果直接复制子对象可能会出现无法复制对象无法完全覆盖原始对象
if (object.parent && object.parent.name !== 'Scene') {
  maskObject.rotation.copy(object.parent.rotation)
}
```

###### （3）添加高亮

```ts
// 创建透明材质
const maskMaterial = new THREE.MeshBasicMaterial({
  color: 0xffba00,
  transparent: true, // 设置为true，opacity才会生效
  side: THREE.DoubleSide,
  opacity: 0.6,
  depthWrite: false
})
maskObject.material = maskMaterial
```

###### （4）添加/删除对象

```ts
// 新增对象实例
scene<THREE.Scene>.add(maskObject)
// 删除对象实例 - 
onMouseLeave() {
	// 在拷贝对象时将 clonedObject<THREE.Object3D>.name 设置为 maskObject
  const object = scene<THREE.Scene>.getObjectByName('maskObject')
  if (!object) return
  scene.remove(object)
  // 拷贝分组时由于需要给内部每个元素添加高亮材质，需要创建多个名称为 maskObject 的拷贝对象，递归调用函数直到找不到名称为 maskObject 的对象实例
  this.onMouseLeave()
}
```

#### （二）显示/隐藏对象

##### 1. 功能介绍

用户点击图层右侧的显示图标后，获取到该图层代表的元素后，更新 ``.visible`` 属性

##### 2. 实现思路

###### （1）获取图层层级关系

```ts
// 当点击分组的 显示|隐藏 图标后，除了隐藏模型本身，还需要将其子图层全部变灰
// 使用 DFS算法 生成图层层级关系
const copiedLayers = deepClone(this.totalLayers)
function DFS(layers: LayersType, target: string, res: string[] = []): void {
  const keys = Object.keys(layers)
  for (let i = 0; i < keys.length; i++) {
    const layer = layers[keys[i]]
    if (typeof layer === 'string') {
      if (keys[i] === target) result = [...res, keys[i]]
    } else {
      DFS(layer, target, [...res, keys[i]])
    }
  }
}
let result: string[] = []
DFS(copiedLayers, label, result)
// console.log(result) ==> [layer1, layer2, layer3]
return !this.hiddenFolders.some(item => result.includes(item))
```

###### (2) 隐藏模型

```ts
// 需要注意的是，如果通过 .material.visible 设置对象的显示或隐藏，可能会因为多个模型应用了同个材质，导致被同时隐藏
// 后续如果有隐藏材质的需要，可以考虑该属性
const findObj = THREE.Scene.getObjectByName(label)
if (!findObj) return
findObj.visible = isVisible
```

#### （三）数据标签

##### 1. 功能介绍

用户点击图层的查看详情图标时，获取对应模型的世界位置信息，在该位置上展示标签【标签由DOM元素生成】

##### 2. 实现思路

###### （1）获取对象位置

```ts
// 根据图层标签获取对应实例
const findObj = scene.getObjectByName(label)
if (!findObj) return
// 生成世界坐标逻辑：
const vector3 = new THREE.Vector3()

// 1. 目标对象的父级为 THREE.Scene：直接调用 THREE.Object3D.getWorldPosition(vector3) 获取世界坐标
let 【worldVector3】 = findObj.getWorldPosition(vector3)

// 2. 目标对象位于某个分组内：使用上述方法获得的位置与所在分组的位置相同，不够精确。
if (findObj instanceof THREE.Mesh && findObj.parent && findObj.parent.name !== 'Scene') {
	// (1) 更新矩阵位置，确保当前所有模型的位置都是最新的
  findObj.updateMatrixWorld(true)
  // (2) 手动更新能够完全包围对象实例的最大球体的数据
  findObj.geometry.computeBoundingSphere()
  // (3) 克隆该球体的中心位置【此结果是相对于其所在分组的设备坐标，不能直接用于标签定位】
  const center = findObj.geometry.boundingSphere.center.clone()
  // (4) 将设备坐标转换为世界坐标
  findObj.localToWorld(center)
  worldVector3 = center
}
// 创建第二个坐标，将其作为标签卡片的位置，后续需要基于这两个坐标绘制曲线
const { x: wx, y: wy, z: wz } = worldVector3
const [cx, cy, cz] = [wx + 0.5, wy + 0.5, wz]
const 【cardWorldVector3】 = new THREE.Vector3(cx, cy, cz)
```

###### （2）生成标签实例

使用  ``CSS3DRenderer ``| ``CSS3DObject `` 将DOM元素转换为能在 THREE.Scene 中查看的“伪模型”

```ts
// renderer
const css3dRenderer = new CSS3DRenderer()
const { width, height } = THREE.Scene.sizes
css3dRenderer.setSize(width, height)
css3dRenderer.domElement.style.position = 'absolute'
css3dRenderer.domElement.style.top = '0'
css3dRenderer.domElement.style.left = '0'
// 如果不取消鼠标事件的话，会印象到 THREE.Controls 生效
css3dRenderer.domElement.style.pointerEvents = 'none'
this.canvasWrapper.appendChild(css3dRenderer.domElement)

// object
const { x, y, z } = findObj.scale
const css3dObject = new CSS3DObject(this.DisplayFrame.$el as HTMLElement)
css3dObject.name = cardName
css3dObject.position.copy(cardWorldVector3)
css3dObject.scale.set(x * 0.002, y * 0.002, z * 0.002)

this.experience.scene.add(css3dObject)

// 渲染标签
// 注意：css3dRenderer 渲染时用到的 camera 应该和模型所在的 THREE.Scene 用到的 camera 相同，从而保证随着相机的移动缩放，标签和模型能够同时变化
const camera = this.experience.camera.perspectiveCamera
css3dRenderer.render(this.experience.scene, camera)
this.experience.time.on('update', () => {
	css3dRenderer.render(this.experience.scene, camera)
})
```

###### （3）绘制贝塞尔曲线

```ts
// line
const lineMaterial = new THREE.LineBasicMaterial({ color: '#0487E2' })
// 基于【worldVector3】和【cardWorldVector3】生成贝塞尔曲线
function getCurvePoints(worldVector3: THREE.Vector3, cardWorldVector3: THREE.Vector3) {
  const { x: wx, y: wy, z: wz } = worldVector3
  const { x: cx, y: cy, z: cz } = cardWorldVector3
  const [mx, my, mz] = [(wx + cx) / 2, (wy + cy) / 2, (wz + cz) / 2]
  const firControlPoint = [(wx + mx + 0.3) / 2, (wy + my - 0.3) / 2, (wz + mz) / 2]
  const secControlPoint = [(cx + mx - 0.3) / 2, (cy + my + 0.3) / 2, (cz + mz) / 2]
  const curve = new THREE.CubicBezierCurve3(
  worldVector3,
  new THREE.Vector3(...firControlPoint),
  new THREE.Vector3(...secControlPoint),
    cardWorldVector3
  )
  return curve.getPoints( 50 )
}
const points = this.getCurvePoints(worldVector3, cardWorldVector3)
const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
const line = new THREE.Line(lineGeometry, lineMaterial)
// 设置唯一名称，方便后续移除
line.name = lineName

this.experience.scene.add(line)
```