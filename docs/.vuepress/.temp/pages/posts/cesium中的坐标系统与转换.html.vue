<template><h2 id="_1-cesium坐标系统" tabindex="-1"><a class="header-anchor" href="#_1-cesium坐标系统" aria-hidden="true">#</a> 1.cesium坐标系统</h2>
<p>cesium开发中常用的坐标系统</p>
<ul>
<li>屏幕坐标系统(二维)，对应Cartesian2来</li>
<li>笛卡尔空间直角坐标系统(三维)</li>
<li>地理坐标系统(经纬度坐标)</li>
</ul>
<h3 id="_1-屏幕二维坐标系" tabindex="-1"><a class="header-anchor" href="#_1-屏幕二维坐标系" aria-hidden="true">#</a> [1]屏幕二维坐标系</h3>
<p>是二位笛卡尔坐标系,cesium中使用Cartesian2来描述屏幕坐标系统</p>
<p>构造函数为<code>new Cesium.Cartesian2(x, y)</code>,屏幕左上角为原点,x右为正,y下为正</p>
<p><img src="https://img-blog.csdnimg.cn/img_convert/2e165161ca54a022c1ed836ac33483e0.png" alt="adfasdf"></p>
<p>而openlayers中</p>
<p><img src="https://img-blog.csdnimg.cn/img_convert/8351face7805b9742afa9cd6e6a55f1d.png" alt="未p"></p>
<h3 id="_2-笛卡尔空间直角坐标系" tabindex="-1"><a class="header-anchor" href="#_2-笛卡尔空间直角坐标系" aria-hidden="true">#</a> [2]笛卡尔空间直角坐标系</h3>
<p>原点为参考椭球的中心下</p>
<p>构造函数为<code>new Cesium.Cartesian3(x, y, z)</code></p>
<p><img src="https://img-blog.csdnimg.cn/img_convert/f85f2cc325b505e649743fd61cde856f.png" alt="image-20220319212624672"></p>
<h3 id="_3-wgs-84地理坐标系" tabindex="-1"><a class="header-anchor" href="#_3-wgs-84地理坐标系" aria-hidden="true">#</a> [3]WGS-84地理坐标系</h3>
<p><code>new Cesium.Cartographic(longitude, latitude, height)</code></p>
<blockquote>
<p>注：这里的经纬度是用弧度表示的，经纬度其实就是角度。弧度即角度对应弧长是半径的倍数。</p>
<p>所以经纬度是以弧度为单位的，高度是以米为单位。</p>
<p>弧度= π / 180 × 角度
角度=180 / π × 弧度</p>
</blockquote>
<p><img src="https://img-blog.csdnimg.cn/img_convert/a0f0d6a605ac8d299305d52cc04c82b8.png" alt="image-20220319213157255"></p>
<h3 id="_4-webgl坐标系" tabindex="-1"><a class="header-anchor" href="#_4-webgl坐标系" aria-hidden="true">#</a> [4]WebGL坐标系</h3>
<p><img src="https://img-blog.csdnimg.cn/img_convert/5056419522856129b54c9beaf9c93723.png" alt="image-20220424110419983">
Cesium使用WebGL进行图形渲染，因此WebGL坐标系也必须了解。在进行自定义渲染时需要用到WebGL坐标系，WebGL坐标系也是右手坐标系，X轴水平，正方向为右；Y轴垂直，正方向为上；Z轴垂直与屏幕，正方向为外。</p>
<h2 id="_2-cesium坐标转换" tabindex="-1"><a class="header-anchor" href="#_2-cesium坐标转换" aria-hidden="true">#</a> 2.cesium坐标转换</h2>
<h3 id="_1-角度与弧度的转换" tabindex="-1"><a class="header-anchor" href="#_1-角度与弧度的转换" aria-hidden="true">#</a> [1]角度与弧度的转换</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//角度转弧度</span>
<span class="token keyword">var</span> radians <span class="token operator">=</span> Cesium<span class="token punctuation">.</span>CesiumMath<span class="token punctuation">.</span><span class="token function">toRadians</span><span class="token punctuation">(</span>degrees<span class="token punctuation">)</span>
<span class="token comment">//弧度转角度</span>
<span class="token keyword">var</span> degrees <span class="token operator">=</span> Cesium<span class="token punctuation">.</span>CesiumMath<span class="token punctuation">.</span><span class="token function">toDegrees</span><span class="token punctuation">(</span>radians<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="_2-wgs84转cartesian3" tabindex="-1"><a class="header-anchor" href="#_2-wgs84转cartesian3" aria-hidden="true">#</a> [2]WGS84转Cartesian3</h3>
<p>Cesium在绘图过程中需要使用笛卡尔空间直角坐标，因此需要将<code>WGS84经纬度坐标</code>转换为笛卡尔坐标，才能用于绘图。
<code>cartographic</code>：弧度制表示的wgs84坐标系。wgs84使用（经度，纬度，大地高）表示。</p>
<h4 id="_1-通过弧度或经纬度直接转换" tabindex="-1"><a class="header-anchor" href="#_1-通过弧度或经纬度直接转换" aria-hidden="true">#</a> (1)通过弧度或经纬度直接转换</h4>
<h5 id="角度制的wgs84转cartesian3" tabindex="-1"><a class="header-anchor" href="#角度制的wgs84转cartesian3" aria-hidden="true">#</a> 角度制的WGS84转Cartesian3</h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Cesium<span class="token punctuation">.</span>Cartesian3<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span>longitude<span class="token punctuation">,</span> latitude<span class="token punctuation">,</span> height<span class="token punctuation">,</span> ellipsoid<span class="token punctuation">,</span> result<span class="token punctuation">)</span>
ellipsoid：该经纬度所使用的椭球体
result：存储结果的对象
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Cesium<span class="token punctuation">.</span>Cartesian3<span class="token punctuation">.</span><span class="token function">fromDegreesArray</span><span class="token punctuation">(</span>coordinates<span class="token punctuation">,</span> ellipsoid<span class="token punctuation">,</span> result<span class="token punctuation">)</span>
coordinates：经纬度数组列表，用于批量转换<span class="token punctuation">[</span>经度，纬度，进度，纬度，。。。。<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> cartesian3s <span class="token operator">=</span> Cesium<span class="token punctuation">.</span>Cartesian3<span class="token punctuation">.</span><span class="token function">fromDegreesArrayHeights</span><span class="token punctuation">(</span>coordinates<span class="token punctuation">)</span><span class="token punctuation">;</span>
coordinates：<span class="token punctuation">[</span>经度，纬度，高度，进度，纬度，高度。。。。<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h5 id="弧度制wgs84转cartesian3" tabindex="-1"><a class="header-anchor" href="#弧度制wgs84转cartesian3" aria-hidden="true">#</a> 弧度制WGS84转Cartesian3</h5>
<p>弧度制转换类似与角度</p>
<ul>
<li><code>Cesium.Cartesian3.fromRadians</code>,</li>
<li><code>Cesium.Cartesian3.fromRadiansArray</code>,</li>
<li><code>Cesium.Cartesian3.fromRadiansArrayHeights</code></li>
</ul>
<h4 id="_2-使用椭球体转换" tabindex="-1"><a class="header-anchor" href="#_2-使用椭球体转换" aria-hidden="true">#</a> (2)使用椭球体转换</h4>
<p>根据椭球体参数将WGS-84转换</p>
<p>同样也分为通过角度式的WGS84经纬度和弧度式的经纬度转为笛卡尔空间直角坐标系</p>
<h5 id="角度制的wgs84转cartesian3-1" tabindex="-1"><a class="header-anchor" href="#角度制的wgs84转cartesian3-1" aria-hidden="true">#</a> 角度制的WGS84转Cartesian3</h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//度为单位的WGS84</span>
<span class="token keyword">let</span> position <span class="token operator">=</span> Cesium<span class="token punctuation">.</span>Cartographic<span class="token punctuation">.</span><span class="token function">fromDegrees</span><span class="token punctuation">(</span>lon<span class="token punctuation">,</span> lat<span class="token punctuation">,</span> height<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 单个坐标</span>
<span class="token keyword">let</span> cartesian3 <span class="token operator">=</span> Cesium<span class="token punctuation">.</span>Ellipsoid<span class="token punctuation">.</span><span class="token constant">WGS84</span><span class="token punctuation">.</span><span class="token function">cartographicToCartesian</span><span class="token punctuation">(</span>position<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 多个坐标</span>
<span class="token keyword">let</span> cartesian3s <span class="token operator">=</span> Cesium<span class="token punctuation">.</span>Ellipsoid<span class="token punctuation">.</span><span class="token constant">WGS84</span><span class="token punctuation">.</span><span class="token function">cartographicArrayToCartesianArray</span><span class="token punctuation">(</span>positions<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h5 id="弧度制wgs84转cartesian3-1" tabindex="-1"><a class="header-anchor" href="#弧度制wgs84转cartesian3-1" aria-hidden="true">#</a> 弧度制WGS84转Cartesian3</h5>
<p>同上</p>
<h3 id="_3-cartesian3转wgs84" tabindex="-1"><a class="header-anchor" href="#_3-cartesian3转wgs84" aria-hidden="true">#</a> [3]Cartesian3转WGS84</h3>
<p>下面两种方式转换得到的是都是默认的弧度式的经纬度坐标WGS84</p>
<h4 id="_1-直接转换" tabindex="-1"><a class="header-anchor" href="#_1-直接转换" aria-hidden="true">#</a> (1)直接转换</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> cartographic <span class="token operator">=</span> Cesium<span class="token punctuation">.</span>Cartographic<span class="token punctuation">.</span><span class="token function">fromCartesian</span><span class="token punctuation">(</span>cartesian3<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="_2-通过椭球体转换" tabindex="-1"><a class="header-anchor" href="#_2-通过椭球体转换" aria-hidden="true">#</a> (2)通过椭球体转换</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 单个坐标</span>
<span class="token keyword">let</span> cartographic <span class="token operator">=</span> Cesium<span class="token punctuation">.</span>Ellipsoid<span class="token punctuation">.</span><span class="token constant">WGS84</span><span class="token punctuation">.</span><span class="token function">cartesianToCartographic</span><span class="token punctuation">(</span>cartesian3<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 多个坐标</span>
<span class="token keyword">let</span> cartographics <span class="token operator">=</span> Cesium<span class="token punctuation">.</span>Ellipsoid<span class="token punctuation">.</span><span class="token constant">WGS84</span><span class="token punctuation">.</span><span class="token function">cartesianArrayToCartographic</span><span class="token punctuation">(</span>cartesain3Array<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="_4-cartesian2与cartesian3互转" tabindex="-1"><a class="header-anchor" href="#_4-cartesian2与cartesian3互转" aria-hidden="true">#</a> [4]Cartesian2与Cartesian3互转</h3>
<p>屏幕坐标和迪卡尔空间直角坐标系的转换</p>
<h4 id="_1-cartesian2转cartesian3" tabindex="-1"><a class="header-anchor" href="#_1-cartesian2转cartesian3" aria-hidden="true">#</a> (1)Cartesian2转Cartesian3</h4>
<p><code>Cartesian2</code>转<code>椭球面笛卡尔坐标</code>，不包含地形、模型等的坐标，Cesium中的<code>Camera</code>提供了<code>pickEllipsoid</code>方法</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> cartesain3 <span class="token operator">=</span> viewer<span class="token punctuation">.</span>scene<span class="token punctuation">.</span>camera<span class="token punctuation">.</span><span class="token function">pickEllipsoid</span><span class="token punctuation">(</span>cartesian2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><code>Cartesian2</code>转<code>场景坐标</code>，包含地形和模型等的场景空间坐标，使用<code>Scene</code>类中的<code>pickPosition</code>方法实现</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> cartesian3 <span class="token operator">=</span> viewer<span class="token punctuation">.</span>scene<span class="token punctuation">.</span><span class="token function">pickPosition</span><span class="token punctuation">(</span>cartesian2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><code>Cartesian2</code>坐标转<code>Cartesian3</code>，通过相机与屏幕点位连线来求取坐标。使用Scene类中globe属性中的pick方法：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> ray <span class="token operator">=</span> viewer<span class="token punctuation">.</span>camera<span class="token punctuation">.</span><span class="token function">getPickRay</span><span class="token punctuation">(</span>cartesian2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> cartesian3 <span class="token operator">=</span> globe<span class="token punctuation">.</span><span class="token function">pick</span><span class="token punctuation">(</span>ray<span class="token punctuation">,</span>viewer<span class="token punctuation">.</span>scene<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="_2-cartesian3转cartesian2" tabindex="-1"><a class="header-anchor" href="#_2-cartesian3转cartesian2" aria-hidden="true">#</a> (2)Cartesian3转Cartesian2</h4>
<p>Cesium提供了SceneTransforms的wgs84ToWindowCoordinates方法将笛卡尔坐标转换为屏幕坐标</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> cartesian2 <span class="token operator">=</span> Cesium<span class="token punctuation">.</span>SceneTransforms<span class="token punctuation">.</span><span class="token function">wgs84ToWindowCoordinates</span><span class="token punctuation">(</span>cartesian3<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考：</h4>
<ul>
<li>https://github.com/AJJackGIS/Cesium/blob/master/doc/Cesium%E4%B8%AD%E7%9A%84%E5%87%A0%E7%A7%8D%E5%9D%90%E6%A0%87%E5%92%8C%E7%9B%B8%E4%BA%92%E8%BD%AC%E6%8D%A2.md</li>
<li>https://blog.csdn.net/weixin_45782925/article/details/123365834</li>
<li>《面向三维GIS的开发与应用》</li>
</ul>
</template>
