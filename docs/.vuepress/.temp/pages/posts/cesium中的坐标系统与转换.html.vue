<template><nav class="table-of-contents"><ul><li><RouterLink to="#_1-cesium坐标介绍">1.cesium坐标介绍</RouterLink><ul><li><RouterLink to="#_1-屏幕坐标系统">[1]屏幕坐标系统</RouterLink></li><li><RouterLink to="#_2-笛卡尔空间直角坐标系统">[2]笛卡尔空间直角坐标系统</RouterLink></li><li><RouterLink to="#_3-地理坐标">[3]地理坐标</RouterLink></li></ul></li><li><RouterLink to="#_2-cesium坐标转换">2.cesium坐标转换</RouterLink><ul><li><RouterLink to="#_1-角度与弧度的转换">[1]角度与弧度的转换</RouterLink></li><li><RouterLink to="#_2-地理坐标转cartesian3">[2]地理坐标转Cartesian3</RouterLink><ul><li><RouterLink to="#_1-直接经过经纬度转换">(1)直接经过经纬度转换</RouterLink><ul><li><RouterLink to="#角度制的地理坐标转cartesian3">角度制的地理坐标转Cartesian3</RouterLink></li><li><RouterLink to="#弧度制与笛卡尔转换">弧度制与笛卡尔转换</RouterLink></li></ul></li><li><RouterLink to="#_2-使用椭球体转换">(2)使用椭球体转换</RouterLink></li></ul></li><li><RouterLink to="#_3-cartesian3转地理坐标">[3]Cartesian3转地理坐标</RouterLink><ul><li><RouterLink to="#_1-直接转换">(1)直接转换</RouterLink></li><li><RouterLink to="#_2-通过椭球体转换">(2)通过椭球体转换</RouterLink></li></ul></li><li><RouterLink to="#_4-cartesian2与cartesian3互转">[4]Cartesian2与Cartesian3互转</RouterLink><ul><li><RouterLink to="#_1-cartesian2转cartesian3">(1)Cartesian2转Cartesian3</RouterLink></li><li><RouterLink to="#_2-cartesian3转cartesian2">(2)Cartesian3转Cartesian2</RouterLink></li></ul></li></ul></li></ul></nav>
<h3 id="_1-cesium坐标介绍" tabindex="-1"><a class="header-anchor" href="#_1-cesium坐标介绍" aria-hidden="true">#</a> 1.cesium坐标介绍</h3>
<p>cesium开发中常用的坐标系统</p>
<ul>
<li>屏幕坐标系统(二维)</li>
<li>笛卡尔空间直角坐标系统(WGS84）</li>
<li>地理坐标系统(经纬度坐标)</li>
</ul>
<p>Cesium目前支持两种坐标系WGS84地理WKID=4326和WebMercator：WKID=3857，但是在Cesium中没有实际的对象来描述WGS84坐标，都是以弧度的方式来进行运用的也就是Cartographic类：</p>
<h4 id="_1-屏幕坐标系统" tabindex="-1"><a class="header-anchor" href="#_1-屏幕坐标系统" aria-hidden="true">#</a> [1]屏幕坐标系统</h4>
<p>也就是二维笛卡尔坐标系cesium中使用Cartesian2来描述屏幕坐标系统</p>
<p>构造函数为<code>new Cesium.Cartesian2(x, y)</code>,屏幕左上角为原点,x右为正,y下为正</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cdf48f29be4741319df57e54d1c561c1~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<p>而openlayers中</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9370e9d0f35e45a484d6c0c2f835e135~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h4 id="_2-笛卡尔空间直角坐标系统" tabindex="-1"><a class="header-anchor" href="#_2-笛卡尔空间直角坐标系统" aria-hidden="true">#</a> [2]笛卡尔空间直角坐标系统</h4>
<p>在GIS引擎中也称这种笛卡尔空间直角坐标系为（World Geodetic System 1984 (WGS84) 坐标系）</p>
<ul>
<li>原点为参考椭球的中心</li>
<li>这个坐标系固定在地球上；当地球自转时，系统也会自转，WGS84 中定义的物体相对于地球保持固定</li>
<li>x 轴指向地理坐标 (0°, 0°)，y 轴指向 (90°, 0°)，z 轴指向北极。赤道位于 xy 平面内。这是一个右手坐标系，因此 x × y = z，其中 x、y 和 z 是沿各自轴的单位向量</li>
<li>cesium中构造函数为<code>new Cesium.Cartesian3(x, y, z)</code></li>
</ul>
<blockquote>
<p>注意这里不要和WGS84地理坐标或者是WGS84椭球体混淆，这只是一个三维的笛卡尔坐标系的定义（只是指定轴向，原点位置等），并不像WGS84那样包含一些椭球参数</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1190b16e16cd43818066401bffc842f4~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h4 id="_3-地理坐标" tabindex="-1"><a class="header-anchor" href="#_3-地理坐标" aria-hidden="true">#</a> [3]地理坐标</h4>
<p><code>new Cesium.Cartographic(longitude, latitude, height)</code></p>
<ul>
<li>经度：参考椭球面上某点的大地子午面与本初子午面间的两面角。东正西负。</li>
<li>纬度：参考椭球面上某点的法线与赤道平面的夹角。北正南负。
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ba4d0b1e5dd46d0869802cb07ec24d1~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></li>
</ul>
<blockquote>
<p>注：Cartographic的经纬度是用弧度表示的，经纬度其实就是角度。弧度即角度对应弧长是半径的倍数。</p>
<p>所以经纬度是以弧度为单位的，高度是以米为单位。</p>
<p>弧度= π / 180 × 角度
角度=180 / π × 弧度</p>
</blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aee4f009c0a346449529fbfa7225d5e0~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述"></p>
<h3 id="_2-cesium坐标转换" tabindex="-1"><a class="header-anchor" href="#_2-cesium坐标转换" aria-hidden="true">#</a> 2.cesium坐标转换</h3>
<h4 id="_1-角度与弧度的转换" tabindex="-1"><a class="header-anchor" href="#_1-角度与弧度的转换" aria-hidden="true">#</a> [1]角度与弧度的转换</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//角度转弧度</span>
<span class="token keyword">var</span> radians <span class="token operator">=</span> Cesium<span class="token punctuation">.</span>CesiumMath<span class="token punctuation">.</span><span class="token function">toRadians</span><span class="token punctuation">(</span>degrees<span class="token punctuation">)</span>
<span class="token comment">//弧度转角度</span>
<span class="token keyword">var</span> degrees <span class="token operator">=</span> Cesium<span class="token punctuation">.</span>CesiumMath<span class="token punctuation">.</span><span class="token function">toDegrees</span><span class="token punctuation">(</span>radians<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h4 id="_2-地理坐标转cartesian3" tabindex="-1"><a class="header-anchor" href="#_2-地理坐标转cartesian3" aria-hidden="true">#</a> [2]地理坐标转Cartesian3</h4>
<p>Cesium在绘图过程中需要使用笛卡尔空间直角坐标（如WGS84笛卡尔坐标系），因此需要将<code>经纬度坐标</code>转换为笛卡尔坐标，才能用于绘图。
cartographic：<code>弧度制表示的地理坐标系</code>。使用（经度，纬度，大地高）表示。</p>
<h5 id="_1-直接经过经纬度转换" tabindex="-1"><a class="header-anchor" href="#_1-直接经过经纬度转换" aria-hidden="true">#</a> (1)直接经过经纬度转换</h5>
<h6 id="角度制的地理坐标转cartesian3" tabindex="-1"><a class="header-anchor" href="#角度制的地理坐标转cartesian3" aria-hidden="true">#</a> 角度制的地理坐标转Cartesian3</h6>
<p>直接转换：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Cesium<span class="token punctuation">.</span>Cartesian3<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span>longitude<span class="token punctuation">,</span> latitude<span class="token punctuation">,</span> height<span class="token punctuation">,</span> ellipsoid<span class="token punctuation">,</span> result<span class="token punctuation">)</span>
ellipsoid：该Cartesian3所使用的椭球，默认为Ellipsoid<span class="token punctuation">.</span><span class="token constant">WGS84</span>
result：存储结果的对象
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Cesium<span class="token punctuation">.</span>Cartesian3<span class="token punctuation">.</span><span class="token function">fromDegreesArray</span><span class="token punctuation">(</span>coordinates<span class="token punctuation">,</span> ellipsoid<span class="token punctuation">,</span> result<span class="token punctuation">)</span>
coordinates：经纬度数组列表，用于批量转换<span class="token punctuation">[</span>经度，纬度，进度，纬度，。。。。<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> cartesian3s <span class="token operator">=</span> Cesium<span class="token punctuation">.</span>Cartesian3<span class="token punctuation">.</span><span class="token function">fromDegreesArrayHeights</span><span class="token punctuation">(</span>coordinates<span class="token punctuation">)</span><span class="token punctuation">;</span>
coordinates：<span class="token punctuation">[</span>经度，纬度，高度，进度，纬度，高度<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h6 id="弧度制与笛卡尔转换" tabindex="-1"><a class="header-anchor" href="#弧度制与笛卡尔转换" aria-hidden="true">#</a> <strong>弧度制与笛卡尔转换</strong></h6>
<p>弧度制也类似，使用<code>Cesium.Cartesian3.fromRadians</code>, <code>Cesium.Cartesian3.fromRadiansArray</code>, <code>Cesium.Cartesian3.fromRadiansArrayHeights</code></p>
<h5 id="_2-使用椭球体转换" tabindex="-1"><a class="header-anchor" href="#_2-使用椭球体转换" aria-hidden="true">#</a> (2)使用椭球体转换</h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//先转换为弧度坐标</span>
<span class="token keyword">let</span> position <span class="token operator">=</span> Cesium<span class="token punctuation">.</span>Cartographic<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span>lon<span class="token punctuation">,</span> lat<span class="token punctuation">,</span> height<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//获取viewer椭球体实例</span>
<span class="token keyword">let</span> ellipsoid <span class="token operator">=</span> viewer<span class="token punctuation">.</span>scene<span class="token punctuation">.</span>globe<span class="token punctuation">.</span>ellipsoid<span class="token punctuation">;</span>
<span class="token comment">//开始转换</span>
<span class="token keyword">let</span> cartesian3 <span class="token operator">=</span> ellipsoid<span class="token punctuation">.</span><span class="token function">cartographicToCartesian</span><span class="token punctuation">(</span>position<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 多个坐标</span>
<span class="token keyword">let</span> cartesian3s <span class="token operator">=</span> ellipsoid<span class="token punctuation">.</span><span class="token function">cartographicArrayToCartesianArray</span><span class="token punctuation">(</span>positions<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h4 id="_3-cartesian3转地理坐标" tabindex="-1"><a class="header-anchor" href="#_3-cartesian3转地理坐标" aria-hidden="true">#</a> [3]Cartesian3转地理坐标</h4>
<h5 id="_1-直接转换" tabindex="-1"><a class="header-anchor" href="#_1-直接转换" aria-hidden="true">#</a> (1)直接转换</h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//直接转换得到的是WGS84弧度制的经纬度坐标，可将其再转换为角度制。</span>
<span class="token keyword">let</span> cartographic <span class="token operator">=</span> Cesium<span class="token punctuation">.</span>Cartographic<span class="token punctuation">.</span><span class="token function">fromCartesian</span><span class="token punctuation">(</span>cartesian3<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h5 id="_2-通过椭球体转换" tabindex="-1"><a class="header-anchor" href="#_2-通过椭球体转换" aria-hidden="true">#</a> (2)通过椭球体转换</h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//需要选着或创建地理坐标的椭球体参数</span>
<span class="token comment">// 单个坐标</span>
<span class="token keyword">let</span> cartographic <span class="token operator">=</span> Cesium<span class="token punctuation">.</span>Ellipsoid<span class="token punctuation">.</span><span class="token constant">WGS84</span><span class="token punctuation">.</span><span class="token function">cartesianToCartographic</span><span class="token punctuation">(</span>cartesian3<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 多个坐标</span>
<span class="token keyword">let</span> cartographics <span class="token operator">=</span> Cesium<span class="token punctuation">.</span>Ellipsoid<span class="token punctuation">.</span><span class="token constant">WGS84</span><span class="token punctuation">.</span><span class="token function">cartesianArrayToCartographic</span><span class="token punctuation">(</span>cartesain3Array<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="_4-cartesian2与cartesian3互转" tabindex="-1"><a class="header-anchor" href="#_4-cartesian2与cartesian3互转" aria-hidden="true">#</a> [4]Cartesian2与Cartesian3互转</h4>
<p>屏幕坐标和迪卡尔空间直角坐标系的转换</p>
<h5 id="_1-cartesian2转cartesian3" tabindex="-1"><a class="header-anchor" href="#_1-cartesian2转cartesian3" aria-hidden="true">#</a> (1)Cartesian2转Cartesian3</h5>
<p>屏幕转<code>椭球面笛卡尔坐标</code>，不包含地形、模型等的坐标
Cesium中的<code>Camera</code>提供了<code>pickEllipsoid</code>方法：<a href="https://cesium.com/learn/cesiumjs/ref-doc/Camera.html?classFilter=camera#pickEllipsoid" target="_blank" rel="noopener noreferrer">传送门</a></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> cartesain3 <span class="token operator">=</span> viewer<span class="token punctuation">.</span>scene<span class="token punctuation">.</span>camera<span class="token punctuation">.</span><span class="token function">pickEllipsoid</span><span class="token punctuation">(</span>cartesian2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>屏幕转<code>场景坐标</code>，包含地形和模型等的场景空间坐标
使用<code>Scene</code>类中的<code>pickPosition</code>方法实现：<a href="https://cesium.com/learn/cesiumjs/ref-doc/Scene.html#pickPosition" target="_blank" rel="noopener noreferrer">传送门</a></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> cartesian3 <span class="token operator">=</span> viewer<span class="token punctuation">.</span>scene<span class="token punctuation">.</span><span class="token function">pickPosition</span><span class="token punctuation">(</span>cartesian2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>屏幕坐标转<code>地表笛卡尔空间坐标</code>
通过相机与屏幕点位连线来求取坐标。
使用Scene类中globe属性中的pick方法：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> ray <span class="token operator">=</span> viewer<span class="token punctuation">.</span>camera<span class="token punctuation">.</span><span class="token function">getPickRay</span><span class="token punctuation">(</span>cartesian2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> cartesian3 <span class="token operator">=</span> globe<span class="token punctuation">.</span><span class="token function">pick</span><span class="token punctuation">(</span>ray<span class="token punctuation">,</span>viewer<span class="token punctuation">.</span>scene<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h5 id="_2-cartesian3转cartesian2" tabindex="-1"><a class="header-anchor" href="#_2-cartesian3转cartesian2" aria-hidden="true">#</a> (2)Cartesian3转Cartesian2</h5>
<p>Cesium提供了SceneTransforms的wgs84ToWindowCoordinates方法将笛卡尔坐标转换为屏幕坐标</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> cartesian2 <span class="token operator">=</span> Cesium<span class="token punctuation">.</span>SceneTransforms<span class="token punctuation">.</span><span class="token function">wgs84ToWindowCoordinates</span><span class="token punctuation">(</span>cartesian3<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></template>
