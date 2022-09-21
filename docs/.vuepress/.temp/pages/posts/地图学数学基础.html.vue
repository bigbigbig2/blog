<template><nav class="table-of-contents"><ul><li><RouterLink to="#_1-地球的数学模拟">1.地球的数学模拟</RouterLink><ul><li><RouterLink to="#_1-大地水准面geoids">[1]大地水准面Geoids</RouterLink></li><li><RouterLink to="#_2-旋转椭球体rotational-ellipsoid">[2]旋转椭球体rotational ellipsoid</RouterLink></li><li><RouterLink to="#_3-参考椭球体reference-ellipsoid">[3]参考椭球体reference ellipsoid</RouterLink></li><li><RouterLink to="#_4-大地基准面datum">[4]大地基准面Datum</RouterLink></li></ul></li><li><RouterLink to="#_2-地理坐标系gcs">2.地理坐标系GCS</RouterLink><ul><li><RouterLink to="#_1-地理坐标系分类">[1]地理坐标系分类</RouterLink><ul><li><RouterLink to="#天文经纬度">天文经纬度</RouterLink></li><li><RouterLink to="#大地经纬度">大地经纬度</RouterLink></li><li><RouterLink to="#地心经纬度">地心经纬度</RouterLink></li></ul></li><li><RouterLink to="#_2-常见的地理-大地坐标系">[2]常见的地理/大地坐标系</RouterLink><ul><li><RouterLink to="#参心坐标系">参心坐标系</RouterLink></li><li><RouterLink to="#地心坐标系">地心坐标系</RouterLink></li></ul></li></ul></li><li><RouterLink to="#_3-高程系统">3.高程系统</RouterLink><ul><li><RouterLink to="#_1-高程系统分类">[1]高程系统分类</RouterLink></li><li><RouterLink to="#_2-转换">[2]转换</RouterLink><ul><li><RouterLink to="#不同椭球大地高的转换">不同椭球大地高的转换</RouterLink></li><li><RouterLink to="#不同高程基准正常高转换">不同高程基准正常高转换</RouterLink></li><li><RouterLink to="#大地高和正常高的转换">大地高和正常高的转换</RouterLink></li></ul></li><li><RouterLink to="#_3-我国常用的高程基准面">[3]我国常用的高程基准面</RouterLink></li></ul></li><li><RouterLink to="#_4-投影">4.投影</RouterLink><ul><li><RouterLink to="#_1-简介">[1]简介</RouterLink></li><li><RouterLink to="#_2-投影方法">[2]投影方法</RouterLink><ul><li><RouterLink to="#几何透视法">几何透视法</RouterLink></li><li><RouterLink to="#数学分析法">数学分析法</RouterLink></li></ul></li><li><RouterLink to="#_3-投影方式分类">[3]投影方式分类</RouterLink><ul><li><RouterLink to="#按变形性质分类">按变形性质分类</RouterLink><ul><li><RouterLink to="#等角投影">等角投影</RouterLink></li><li><RouterLink to="#等面积投影">等面积投影</RouterLink></li><li><RouterLink to="#任意投影">任意投影</RouterLink></li></ul></li><li><RouterLink to="#从投影面类型划分">从投影面类型划分</RouterLink><ul><li><RouterLink to="#圆柱投影">圆柱投影</RouterLink></li><li><RouterLink to="#圆锥投影">圆锥投影</RouterLink></li><li><RouterLink to="#方位投影">方位投影</RouterLink></li></ul></li><li><RouterLink to="#从投影面与地球位置关系划分为">从投影面与地球位置关系划分为</RouterLink></li></ul></li><li><RouterLink to="#_4-投影坐标系">[4]投影坐标系</RouterLink></li><li><RouterLink to="#_5-我国常用的投影">[5]我国常用的投影</RouterLink><ul><li><RouterLink to="#高斯-克吕格gauss-kruger投影-横轴等角切圆柱投影">高斯-克吕格Gauss-Kruger投影（横轴等角切圆柱投影）</RouterLink><ul><li><RouterLink to="#特点">特点</RouterLink></li></ul></li><li><RouterLink to="#兰伯特lambert投影-正轴等角割圆锥投影">兰伯特Lambert投影（正轴等角割圆锥投影）</RouterLink></li><li><RouterLink to="#墨卡托mercator投影-正轴等角圆柱投影">墨卡托Mercator投影（正轴等角圆柱投影）</RouterLink></li><li><RouterLink to="#通用墨卡托投影utm">通用墨卡托投影UTM</RouterLink><ul><li><RouterLink to="#utm投影分带">UTM投影分带</RouterLink></li></ul></li></ul></li></ul></li><li><RouterLink to="#_6-坐标参考系统-coordinate-reference-systems-crs">6.坐标参考系统（Coordinate Reference Systems CRS）</RouterLink><ul><li><RouterLink to="#_1-wkid与epsg">[1]WKID与EPSG</RouterLink></li><li><RouterLink to="#_2-常见地理坐标系统gcs">[2]常见地理坐标系统GCS</RouterLink></li><li><RouterLink to="#_3-常见投影坐标系统pcs">[3]常见投影坐标系统PCS</RouterLink><ul><li><RouterLink to="#基于于高斯克吕格投影的投影坐标系统">基于于高斯克吕格投影的投影坐标系统</RouterLink></li><li><RouterLink to="#基于utm投影的投影坐标系统">基于UTM投影的投影坐标系统</RouterLink></li><li><RouterLink to="#基于网络墨卡托-webmercator-投影的投影坐标系统">基于网络墨卡托（WebMercator）投影的投影坐标系统</RouterLink></li></ul></li><li><RouterLink to="#_4-各大地图厂商使用的坐标系">[4]各大地图厂商使用的坐标系</RouterLink></li></ul></li><li><RouterLink to="#_7-数据中坐标参考系统">7.数据中坐标参考系统</RouterLink><ul><li><RouterLink to="#_1-判别">[1]判别</RouterLink></li><li><RouterLink to="#_2-定义投影">[2]定义投影</RouterLink></li><li><RouterLink to="#_3-转换投影">[3]转换投影</RouterLink></li></ul></li><li><RouterLink to="#_8-瓦片坐标系">8.瓦片坐标系</RouterLink><ul><li><RouterLink to="#_2-wmts规范">[2]WMTS规范</RouterLink></li><li><RouterLink to="#_3-tms规范">[3]TMS规范</RouterLink></li><li><RouterLink to="#_4-百度地图">[4]百度地图</RouterLink></li><li><RouterLink to="#_5-bing地图">[5]bing地图</RouterLink></li></ul></li><li><RouterLink to="#_9-坐标参考系统的表达">9.坐标参考系统的表达</RouterLink></li><li><RouterLink to="#_10-不同坐标参考系统的转换">10.不同坐标参考系统的转换</RouterLink><ul><li><RouterLink to="#_1-三参数转换">[1]三参数转换</RouterLink></li><li><RouterLink to="#_2-七参数转换">[2]七参数转换</RouterLink></li><li><RouterLink to="#_3-四参数转换">[3]四参数转换</RouterLink></li></ul></li><li><RouterLink to="#_11-地图投影前端实现与转换">11.地图投影前端实现与转换</RouterLink><ul><li><RouterLink to="#turf-js">turf.js</RouterLink></li><li><RouterLink to="#proj">proj</RouterLink></li></ul></li></ul></nav>
<h2 id="_1-地球的数学模拟" tabindex="-1"><a class="header-anchor" href="#_1-地球的数学模拟" aria-hidden="true">#</a> 1.地球的数学模拟</h2>
<p><img src="https://img-blog.csdnimg.cn/7156c2573b624df1a25172da71d87f38.png" alt="在这里插入图片描述"></p>
<h3 id="_1-大地水准面geoids" tabindex="-1"><a class="header-anchor" href="#_1-大地水准面geoids" aria-hidden="true">#</a> [1]大地水准面Geoids</h3>
<p>假设当海水处于完全静止的平衡状态时，从海平面延伸到所有大陆下部， 而与地球重力方向处处正交的一个连续、闭合的曲面，这就是大地水准面，但是大地体并不能使用相应的数学表示。</p>
<p><img src="https://img-blog.csdnimg.cn/78f79bfa386d44e5ab86df48e2e466b6.png" alt="在这里插入图片描述"></p>
<p>大地测量中用水准量测方法得到地面上各点的高程就是依据这个水准面来确定的，大地水准面上任何一点的铅垂线都与大地水准面成正交，而铅垂线的方向又受地球内部质量分布不均匀和地面高低起伏的影响，致使大地水准面产生微小起伏，所以大地水准面仍是一个不规则的、不能用简单数学公式表达的曲面。</p>
<p>大地水准面不同于平均海平面。</p>
<h3 id="_2-旋转椭球体rotational-ellipsoid" tabindex="-1"><a class="header-anchor" href="#_2-旋转椭球体rotational-ellipsoid" aria-hidden="true">#</a> [2]旋转椭球体rotational ellipsoid</h3>
<p>在数学上的定义：椭圆围绕其短轴或长轴旋转而成的球体</p>
<p>在地球上的定义：旋转椭球体是大地体经绕地轴（短轴）旋转而成的表面光滑的球体，既与地球的真实形状十分相似，也可以使用简单的数学公式表达称为地球椭球体，其表面称为地球椭球面，地球椭球面的方程为：</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:2.1771em;vertical-align:-0.686em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.4911em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal">a</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7401em;"><span style="top:-2.989em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:2.1771em;vertical-align:-0.686em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.4911em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal">a</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7401em;"><span style="top:-2.989em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:2.1771em;vertical-align:-0.686em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.4911em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal">b</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7401em;"><span style="top:-2.989em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span></span></p>
<p>所有经线圈都是相等的椭圆，而赤道和所有纬线圈都是正圆。</p>
<p>表征地球椭球体的主要参数有椭球长半径<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">a</span></span></span></span>、短半径<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal">b</span></span></span></span>、扁率<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal" style="margin-right:0.0037em;">α</span></span></span></span>、第一偏心率<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">e</span></span></span></span>、第二偏心率<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal">e</span><span class="mord">’</span></span></span></span></p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">a</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.0574em;vertical-align:-0.686em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3714em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">a</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">a</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal">b</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span><span class="mspace newline"></span><span class="base"><span class="strut" style="height:0.8641em;"></span><span class="mord"><span class="mord mathnormal">e</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.1771em;vertical-align:-0.686em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.4911em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal">a</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7401em;"><span style="top:-2.989em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal">a</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord"><span class="mord mathnormal">b</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span><span class="mspace newline"></span><span class="base"><span class="strut" style="height:0.8641em;"></span><span class="mord"><span class="mord mathnormal">e</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">′2</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.1771em;vertical-align:-0.686em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.4911em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal">b</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7401em;"><span style="top:-2.989em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal">a</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord"><span class="mord mathnormal">b</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<h3 id="_3-参考椭球体reference-ellipsoid" tabindex="-1"><a class="header-anchor" href="#_3-参考椭球体reference-ellipsoid" aria-hidden="true">#</a> [3]参考椭球体reference ellipsoid</h3>
<p>参考椭球体——拥有特定地球椭球体参数的定义的椭球体</p>
<p>由于推算的年代、测量技术、与方法及其测定地区的不同，地球椭球体的参数并不一致。下面为常见的参考椭球体地球椭球体及其参数</p>
<p><img src="https://img-blog.csdnimg.cn/58f437c19ceb449a907c9acda0a3425d.png" alt="在这里插入图片描述"></p>
<ul>
<li>1940年北京坐标系：克拉索夫斯基（Krasovsky）椭球体</li>
<li>西安80：1975</li>
<li>国家2000：CGCS2000椭球</li>
</ul>
<h3 id="_4-大地基准面datum" tabindex="-1"><a class="header-anchor" href="#_4-大地基准面datum" aria-hidden="true">#</a> [4]大地基准面Datum</h3>
<p>有了参考椭球，在实际建立地理空间坐标系统的时候，还需要指定一个大地基准面将这个椭球体与大地体联系起来。
讲白了，就是地球椭球体只是近似的代表地球，为了尽量减少针对各个地区的近似误差，即通过大地基准面使得地球椭球体与地球体在某一区域尽量重合。因此，各个地区为了使得地球椭球体与地球体尽量重合，导致有很多不同的大地基准面，如北京54坐标系、西安80坐标系实际上指的是我国的两个大地基准面。下图可解释大地基准面的作用。
<img src="https://img-blog.csdnimg.cn/1bd38ba6ec8242d7a6f2b07ae3202e8e.png" alt="在这里插入图片描述"></p>
<blockquote>
<p>那么为了使得地球椭球体通过平移、旋转、缩放与地球体更加贴合，大地基准面就需要7参数分别为：三个平移参数<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">Δ</span><span class="mord mathnormal" style="margin-right:0.07847em;">X</span><span class="mord cjk_fallback">、</span><span class="mord">Δ</span><span class="mord mathnormal" style="margin-right:0.22222em;">Y</span><span class="mord cjk_fallback">、</span><span class="mord">Δ</span><span class="mord mathnormal" style="margin-right:0.07153em;">Z</span></span></span></span>；三个旋转参数<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8778em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">ε</span><span class="mord mathnormal">x</span><span class="mord cjk_fallback">、</span><span class="mord mathnormal">ε</span><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="mord cjk_fallback">、</span><span class="mord mathnormal">ε</span><span class="mord mathnormal" style="margin-right:0.04398em;">z</span></span></span></span>；最后是比例校正因子，用于调整椭球大小。</p>
</blockquote>
<ol>
<li><strong>地心基准面</strong>：由卫星数据得到，使用地球的质心作为原点， WGS 1984，CGCS200坐标系</li>
<li><strong>区域基准面</strong>：特定区域内与地球表面吻合，大地原点是参考椭球与大地水准面相切的点，例如<code>Beijing54、Xian80</code>。 我们通常称谓的<code>Beijing54、Xian80坐标系实际上指的是我国的两个大地基准面</code></li>
</ol>
<p>我们通常说的<code>参心大地坐标系</code>和<code>地心大地坐标系</code>的区别就在于此。</p>
<p><strong>参心大地坐标系</strong>（区域基准面）：指经过定位与定向后，地球椭球的中心不与地球质心重合而是接近地球质心。区域性大地坐标系。是我国基本测图和常规大地测量的基础。如Beijing54、Xian80。</p>
<p><strong>地心大地坐标系</strong>（地心基准面）：指经过定位与定向后，地球椭球的中心与地球质心重合。如<code>CGCS2000、WGS84</code></p>
<h2 id="_2-地理坐标系gcs" tabindex="-1"><a class="header-anchor" href="#_2-地理坐标系gcs" aria-hidden="true">#</a> 2.地理坐标系<strong>GCS</strong></h2>
<p><strong>Geographical Coordinate System</strong>指用经度和纬度表示地面点位的球面坐标</p>
<h3 id="_1-地理坐标系分类" tabindex="-1"><a class="header-anchor" href="#_1-地理坐标系分类" aria-hidden="true">#</a> [1]地理坐标系分类</h3>
<p>一般地理坐标可分为三种，<strong>天文经纬度，大地经纬度，地心经纬度</strong>。通常地图上使用的经纬度都为<strong>大地经纬度</strong></p>
<h4 id="天文经纬度" tabindex="-1"><a class="header-anchor" href="#天文经纬度" aria-hidden="true">#</a> 天文经纬度</h4>
<p><img src="https://img-blog.csdnimg.cn/772ed9f9304b401db08041f39b0d370a.png" alt="在这里插入图片描述"></p>
<h4 id="大地经纬度" tabindex="-1"><a class="header-anchor" href="#大地经纬度" aria-hidden="true">#</a> 大地经纬度</h4>
<p><img src="https://img-blog.csdnimg.cn/0d2003b4002249fbb6e7ac7db2389553.png" alt="在这里插入图片描述"></p>
<h4 id="地心经纬度" tabindex="-1"><a class="header-anchor" href="#地心经纬度" aria-hidden="true">#</a> 地心经纬度</h4>
<p><img src="https://img-blog.csdnimg.cn/2219635e9bda402ab06790f293ea9db0.png" alt="在这里插入图片描述"></p>
<blockquote>
<p>在大地测量学中，常用天文经纬度定义地理坐标。 在地图学中，以大地经纬度定义地理坐标。 在地理学研究以及地图学小比例尺 制图中，通常将椭球体当成正球体看， 采用地心经纬度 。</p>
<p><img src="https://img-blog.csdnimg.cn/496036e767ae4bd58df3511952ff4e41.png" alt="在这里插入图片描述"></p>
</blockquote>
<h3 id="_2-常见的地理-大地坐标系" tabindex="-1"><a class="header-anchor" href="#_2-常见的地理-大地坐标系" aria-hidden="true">#</a> [2]常见的地理/大地坐标系</h3>
<p>地理/大地坐标系是大地测量中以参考椭球面为基础建立起来的（基准面）坐标系。地面点的位置用大地经度、大地纬度和大地高度表示</p>
<h4 id="参心坐标系" tabindex="-1"><a class="header-anchor" href="#参心坐标系" aria-hidden="true">#</a> 参心坐标系</h4>
<ul>
<li>
<p>1954北京坐标系</p>
</li>
<li>
<p>1980国家大地坐标系</p>
</li>
</ul>
<h4 id="地心坐标系" tabindex="-1"><a class="header-anchor" href="#地心坐标系" aria-hidden="true">#</a> 地心坐标系</h4>
<ul>
<li>2000国家大地坐标系（注意区分CGCS2000椭球体）</li>
<li>WGS84坐标系（注意区分WGS84椭球体）</li>
</ul>
<blockquote>
<p>地理/大地坐标系=椭球体+基准面组成</p>
</blockquote>
<h2 id="_3-高程系统" tabindex="-1"><a class="header-anchor" href="#_3-高程系统" aria-hidden="true">#</a> 3.高程系统</h2>
<p><strong>高程系统是指相对于不同性质的起算面（大地水准面，似大地水准面、椭球面等）所定义的高程体系</strong></p>
<h3 id="_1-高程系统分类" tabindex="-1"><a class="header-anchor" href="#_1-高程系统分类" aria-hidden="true">#</a> [1]高程系统分类</h3>
<p>高程系统的基准面基本上有两种：一是<strong>大地水准面</strong>，它是正高和力高的基准面；二是<strong>参考椭球表面</strong>，它是大地高程的基准面。此外，为了克服正高不能精确计算的困难还采用正常高，以似大地水准面为基准面，它非常接近大地水准面。</p>
<ul>
<li>大地水准面—&gt;**正高系统：**地球上一点到大地水准面的距离。平均重力无法精确测得，所以正高无法精确得到</li>
<li>似大地水准面—&gt;**正常高系统：**地球上一点到似大地水准面的距离。沿重力线方向可以精确测得的</li>
<li>参考椭球体—&gt;**大地高系统：**沿法线方向到参考椭球的距离，大地高一般用符号H表示，常见的地理坐标（B，L，H）便是采用此高程系统</li>
</ul>
<blockquote>
<p>大地高=正常高系统+高程异常</p>
<p>大地高=正高系统+大地水准面差距</p>
<p>我国高程采用的是正常高和大地高系统。通常用到的地理坐标系高程都是大地高，通常外业用水准测得的是正常高。</p>
</blockquote>
<h3 id="_2-转换" tabindex="-1"><a class="header-anchor" href="#_2-转换" aria-hidden="true">#</a> [2]转换</h3>
<h4 id="不同椭球大地高的转换" tabindex="-1"><a class="header-anchor" href="#不同椭球大地高的转换" aria-hidden="true">#</a> 不同椭球大地高的转换</h4>
<p>三维七参数模型进行转换</p>
<h4 id="不同高程基准正常高转换" tabindex="-1"><a class="header-anchor" href="#不同高程基准正常高转换" aria-hidden="true">#</a> 不同高程基准正常高转换</h4>
<p>我国目前采用的高程基准是1985国家高程基准，但是还有其他高程基准，例如1954黄海高程基准。这种情况就要获得不同高程基准间的改正数。</p>
<h4 id="大地高和正常高的转换" tabindex="-1"><a class="header-anchor" href="#大地高和正常高的转换" aria-hidden="true">#</a> 大地高和正常高的转换</h4>
<p>（1）如果是北京54或西安80这种参心坐标系。获得高程异常后，按大地高和正常高之间关系公式直接计算。
（2）WGS84/CGCS2000大地高与1985国家高程基准间的转换</p>
<h3 id="_3-我国常用的高程基准面" tabindex="-1"><a class="header-anchor" href="#_3-我国常用的高程基准面" aria-hidden="true">#</a> [3]我国常用的高程基准面</h3>
<ul>
<li>
<p>1956黄海高程系统</p>
</li>
<li>
<p>1985国家高程基准</p>
</li>
</ul>
<h2 id="_4-投影" tabindex="-1"><a class="header-anchor" href="#_4-投影" aria-hidden="true">#</a> 4.投影</h2>
<h3 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> [1]简介</h3>
<p>在地球椭球面和平面之间建立点与点之间函数关系的数学方法，称为地图投影。（比如是将地球展开画到平面上）</p>
<p>投影坐标系：为平面坐标。参考平面地是水平面，坐标单位：米、千米等；</p>
<p>投影坐标系的生成是以地理坐标系为基准的，所以每个投影坐标系前面都会挂有地理坐标系</p>
<p>而地理坐标系后面的一串，则是投影参数。 比如 <code>Beijing 1954/3-degree Gauss-Kruger zone 39</code>，意思是：3度分带法的北京54坐标系，中央经线在东117度的分带坐标，横坐标前加带号</p>
<h3 id="_2-投影方法" tabindex="-1"><a class="header-anchor" href="#_2-投影方法" aria-hidden="true">#</a> [2]投影方法</h3>
<h4 id="几何透视法" tabindex="-1"><a class="header-anchor" href="#几何透视法" aria-hidden="true">#</a> 几何透视法</h4>
<p>透视学原理： 按比例缩小、特征点到图纸上
<img src="https://img-blog.csdnimg.cn/9d1102bf93ee47d286885fb1708c984e.png" alt="在这里插入图片描述"></p>
<h4 id="数学分析法" tabindex="-1"><a class="header-anchor" href="#数学分析法" aria-hidden="true">#</a> 数学分析法</h4>
<p>地球椭球面上的经纬网 平面上相应的经纬线网
<img src="https://img-blog.csdnimg.cn/e4416d31340443fc869e5b0a4d9bff55.png" alt="在这里插入图片描述"></p>
<h3 id="_3-投影方式分类" tabindex="-1"><a class="header-anchor" href="#_3-投影方式分类" aria-hidden="true">#</a> [3]投影方式分类</h3>
<p>地球椭球表面是一种不可能展开的曲面，要把这样一个曲面表现到平面上，就会发生裂隙或褶皱。 在投影面上，可运用经纬线的“拉伸”或“压缩”（通过数学手段）来加以避免，以便形成一幅完整的地图。但不可避免会产生变形。 地图投影的变形通常有：长度变形、面积变形和角度变形。在实际应用中，根据使用地图的目的，限定某种变形。</p>
<p>根据不同的需要，我们会选择不同的投影组合</p>
<p><img src="https://img-blog.csdnimg.cn/a678c7228a734e33ac5d6a2f9bcd2692.png" alt="在这里插入图片描述"></p>
<h4 id="按变形性质分类" tabindex="-1"><a class="header-anchor" href="#按变形性质分类" aria-hidden="true">#</a> 按变形性质分类</h4>
<h5 id="等角投影" tabindex="-1"><a class="header-anchor" href="#等角投影" aria-hidden="true">#</a> 等角投影</h5>
<ul>
<li>角度变形为零(<code>Mercator</code>)[条件：<code>w=0,a=b</code>]</li>
<li>我国大中比例尺地形图上所采用的<code>高斯—克吕格投影</code>就是等角横切椭圆柱投影。 小比例尺地形图和航空图则采用等角圆锥投影</li>
<li>墨卡托：正轴等角圆柱投影</li>
</ul>
<h5 id="等面积投影" tabindex="-1"><a class="header-anchor" href="#等面积投影" aria-hidden="true">#</a> 等面积投影</h5>
<ul>
<li>面积变形为零(<code>Albers</code>)[条件：<code>p=a*b=1</code>]</li>
</ul>
<h5 id="任意投影" tabindex="-1"><a class="header-anchor" href="#任意投影" aria-hidden="true">#</a> 任意投影</h5>
<ul>
<li>
<p>长度、角度和面积都存在变形（其中，各种变形相互联系相互影响，等积与等角互斥，等积投影角度变形大，等角投影面积变形大）[条件：<code>a=1或b=1</code>]</p>
</li>
<li>
<p>等距离投影是任意投影中的一个</p>
</li>
</ul>
<blockquote>
<p>补充：</p>
<ul>
<li><strong>标准纬线</strong></li>
</ul>
<p>在地图投影中不变形的纬线。投影平面切在某点，<strong>该点在球面上，也在投影平面上</strong>这样的点投影后不产生任何变形。 圆锥与地球某纬线圈相切，圆柱在赤道上与地球相切，这些相切的纬线投影后均无变形</p>
<p><img src="https://img-blog.csdnimg.cn/96c69b2a88bc4c0d9f67469bb7fc8ae1.png" alt="在这里插入图片描述"></p>
</blockquote>
<blockquote>
<ul>
<li><strong>等变形线</strong></li>
</ul>
<p>等变形线是投影变形值相等点的连线，有面积和角度等变形线之分。等变形线与没有变形的点和线，组成了变形分布的系统。 在投影略图上绘出等变形线，用来表示变形分布的情况及其投 影使用的优劣。等变形线的形状在一些投影中是规则的，如与纬 线形状一致或以投影中心为圆心的圆等，但大多数是不规则的曲线。</p>
</blockquote>
<h4 id="从投影面类型划分" tabindex="-1"><a class="header-anchor" href="#从投影面类型划分" aria-hidden="true">#</a> 从投影面类型划分</h4>
<h5 id="圆柱投影" tabindex="-1"><a class="header-anchor" href="#圆柱投影" aria-hidden="true">#</a> 圆柱投影</h5>
<p>以圆柱面为投影面，将经纬网投影到圆 柱面上，然后将圆柱面展成平面</p>
<p>根据圆柱面和地球面的相对位置，圆柱投影分为正圆柱、横圆柱和斜圆柱</p>
<p><img src="https://img-blog.csdnimg.cn/0bf25a2cb8bd46ee8939a52dd4ec2049.png" alt="在这里插入图片描述"></p>
<p>根据圆柱面和地球面的相互关系不同，可分为切圆柱投影和割圆柱投影</p>
<p><img src="https://img-blog.csdnimg.cn/a06acaa82308473faec90902f79ac09d.png" alt="在这里插入图片描述"></p>
<h5 id="圆锥投影" tabindex="-1"><a class="header-anchor" href="#圆锥投影" aria-hidden="true">#</a> 圆锥投影</h5>
<p>以圆锥面为投影面，将圆锥与地球相割或相切，将经纬网投影到圆锥面上，然后将圆锥面展成平面</p>
<p>根据圆锥面和地球面的相对位置，圆锥投影分为正圆锥、横圆锥和斜圆锥</p>
<p><img src="https://img-blog.csdnimg.cn/1bef5b6c74634ed587724ab901ed601b.png" alt="在这里插入图片描述"></p>
<p>根据圆锥面和地球面的相互关系不同，可分为切圆锥投影和割圆锥投影</p>
<p><img src="https://img-blog.csdnimg.cn/ab63f7476160486a9abcbc6dde242fac.png" alt="在这里插入图片描述"></p>
<h5 id="方位投影" tabindex="-1"><a class="header-anchor" href="#方位投影" aria-hidden="true">#</a> 方位投影</h5>
<p>投影面为平面，平面与地球面构成相割或相切的位置关系，将经纬网投影到平面上，根据投影面和地球面的相对位置，方位投影分为正方位（切点在两级）、横方位（切点在赤道）和斜方位（切点在赤道和两级之间）几种投影</p>
<p><img src="https://img-blog.csdnimg.cn/e18a7a5a6dd840179008b6dbc3c1f42d.png" alt="在这里插入图片描述"></p>
<h4 id="从投影面与地球位置关系划分为" tabindex="-1"><a class="header-anchor" href="#从投影面与地球位置关系划分为" aria-hidden="true">#</a> 从投影面与地球位置关系划分为</h4>
<p>正轴投影：投影面中心轴与地轴相互重合</p>
<p>斜轴投影：投影面中心轴与地轴斜向相交</p>
<p>横轴投影：投影面中心轴与地轴相互垂直</p>
<p>相切投影：投影面与椭球体相切</p>
<p>相割投影：投影面与椭球体相割</p>
<h3 id="_4-投影坐标系" tabindex="-1"><a class="header-anchor" href="#_4-投影坐标系" aria-hidden="true">#</a> [4]投影坐标系</h3>
<p>投影坐标系=地理坐标系+投影方法</p>
<h3 id="_5-我国常用的投影" tabindex="-1"><a class="header-anchor" href="#_5-我国常用的投影" aria-hidden="true">#</a> [5]我国常用的投影</h3>
<p>我国基本比例尺地形图（1：100万、1：50万、1：25万、1：10万、1：5万、1：2.5万、1：1万、1：5000） **除1：100万以外均采用高斯-克吕格Gauss-Kruger投影（**横轴等角切圆柱投影，又叫横轴墨卡托Transverse Mercator投影）为地理基础。 1：100万地形图采用兰伯特Lambert投影（正轴等角割圆锥投影），其分幅原则与国际地理学会规定的全球统一使用的国际百万分之一地图投影保持一致。 海上小于50万的地形图多用墨卡托Mercator投影（正轴等角圆柱投影）。 我国大部份省区图以及大多数这一比例尺的地图也多采用Lambert投影和属于同一投影系统的Albers投影（正轴等积割圆锥投影）。</p>
<h4 id="高斯-克吕格gauss-kruger投影-横轴等角切圆柱投影" tabindex="-1"><a class="header-anchor" href="#高斯-克吕格gauss-kruger投影-横轴等角切圆柱投影" aria-hidden="true">#</a> 高斯-克吕格Gauss-Kruger投影（横轴等角切圆柱投影）</h4>
<p>高斯—克吕格投影亦称为横轴 墨卡托投影，简称TM 投影</p>
<p>我国规定1:1万、1:2.5万、1:5万、1:10万、1:25万、1:50万比例尺的地形图均采用高斯克吕格投影。该投影在英美等国家被称为横轴墨卡托投影</p>
<p><img src="https://img-blog.csdnimg.cn/bda0d79851af454cb12304c7ee89677d.png" alt="在这里插入图片描述"></p>
<h6 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点</h6>
<ul>
<li>离中央经线越远的地区，面积变化越大。</li>
<li>此投影合适用于导航</li>
<li>投影椭圆柱面是横着的</li>
<li>投影椭圆柱面与椭球体相切</li>
</ul>
<h4 id="兰伯特lambert投影-正轴等角割圆锥投影" tabindex="-1"><a class="header-anchor" href="#兰伯特lambert投影-正轴等角割圆锥投影" aria-hidden="true">#</a> 兰伯特Lambert投影（正轴等角割圆锥投影）</h4>
<h4 id="墨卡托mercator投影-正轴等角圆柱投影" tabindex="-1"><a class="header-anchor" href="#墨卡托mercator投影-正轴等角圆柱投影" aria-hidden="true">#</a> 墨卡托Mercator投影（正轴等角圆柱投影）</h4>
<p>地球面上一条与所有经线相交成等方位角的曲线称为<strong>等角航线</strong></p>
<p><img src="https://img-blog.csdnimg.cn/067ea8c8a60941d6954229fa63efc49e.png" alt="在这里插入图片描述"></p>
<p>等角航线被投影为直线，便于航迹绘算。 等角性质投影，保持图上方位与实地一致。 经纬线形状简单，便于绘制</p>
<p>特点：</p>
<ul>
<li>没有角度变形，图上方位与实地保持一致；</li>
<li>标准纬线上没有变形；</li>
<li>两极变形趋向无穷大</li>
</ul>
<h4 id="通用墨卡托投影utm" tabindex="-1"><a class="header-anchor" href="#通用墨卡托投影utm" aria-hidden="true">#</a> 通用墨卡托投影UTM</h4>
<p>通用横墨卡托投影，简称UTM投影，几何上理解为横轴等角割圆柱投影，标记南纬80°至北纬84°之间的所有位置。</p>
<p><img src="https://img-blog.csdnimg.cn/7701ea8eb4d54a4e8e3da134c22c7c66.png" alt="在这里插入图片描述"></p>
<p>UTM投影与高斯—克吕格投影之间没有实质性 的差别，其投影条件与高斯—克吕格投影相比，除 中央经线长度比m0为0.9996以外，其他条件相同。 UTM投影改善了高斯—克吕格投影在低纬度地 区的变形。世界上许多国家的地形图采用UTM投影作数学基础</p>
<h5 id="utm投影分带" tabindex="-1"><a class="header-anchor" href="#utm投影分带" aria-hidden="true">#</a> UTM投影分带</h5>
<p>UTM 经度区范围为1到60，其中58个区的东西跨度为 6°。经度区涵盖了地球中纬度范围从 80°S 到 84°N 之间的所有区域。一共有 20个UTM 纬度区，每个区的南北跨度为 8°；使用字母 C 到 X 标识（其中没有字母 I 和 O）。A、B、Y、Z 区不在系统范围以内，它们覆盖了南极和北极区。
<img src="https://img-blog.csdnimg.cn/50541a62445c4c269af75fc942453ec3.png" alt="在这里插入图片描述"></p>
<p>UTM投影与高斯-克吕格投影的区别</p>
<p>（1） 中央经线长度比不同，UTM投影是0.9996，而高 斯-克吕格投影是1。</p>
<p>（2）带的划分相同，而带号的起算不同。带号相差30。</p>
<p>（3）对于中、低纬度地区，UTM投影的变形优于高斯克吕格投影。</p>
<p>（4）西方国家（美、英、德、法）多采用UTM投影作为 国家基本地形图投影，东方国家（中、苏、蒙、朝）多采 用高斯-克吕格投影作为国家基本地形图投影</p>
<h2 id="_6-坐标参考系统-coordinate-reference-systems-crs" tabindex="-1"><a class="header-anchor" href="#_6-坐标参考系统-coordinate-reference-systems-crs" aria-hidden="true">#</a> 6.坐标参考系统（Coordinate Reference Systems CRS）</h2>
<p><img src="https://img-blog.csdnimg.cn/7255d6a141144479a2cc427b2dff2598.png" alt="在这里插入图片描述"></p>
<p>GIS中的坐标参考系统（Coordinate Reference Systems CRS）分为两大类：投影坐标系PCS和地理坐标系GCS</p>
<p>一个投影坐标系统，必然包括一个投影方法和一个地理坐标系统的定义</p>
<blockquote>
<p>注意：空间参考系spatial reference system（SRS不等于坐标参考系CRSCoordinate Reference Systems），空间参考系SRS包含坐标参考系CRS，坐标参考系是空间参考系的必要组成部分。</p>
<p>可以联想postgis中空间参考系表spatial_ref_sys中包含的内容</p>
</blockquote>
<h3 id="_1-wkid与epsg" tabindex="-1"><a class="header-anchor" href="#_1-wkid与epsg" aria-hidden="true">#</a> [1]WKID与EPSG</h3>
<p>WKID即Well Known ID，众所周知的ID号的意思。EPSG是管理这些ID号的一个组织，网站是epsg.io</p>
<p>一个GIS里的坐标系统，必须有一个WKID(<strong>地理坐标系统和投影坐标系统均可使用WKID定义，尽管投影坐标系=地理坐标系统+投影，其地理坐标系统的WKID和投影坐标系统的WKID是无关联的</strong>)</p>
<h3 id="_2-常见地理坐标系统gcs" tabindex="-1"><a class="header-anchor" href="#_2-常见地理坐标系统gcs" aria-hidden="true">#</a> [2]常见地理坐标系统GCS</h3>
<p>见上图</p>
<h3 id="_3-常见投影坐标系统pcs" tabindex="-1"><a class="header-anchor" href="#_3-常见投影坐标系统pcs" aria-hidden="true">#</a> [3]常见投影坐标系统PCS</h3>
<h4 id="基于于高斯克吕格投影的投影坐标系统" tabindex="-1"><a class="header-anchor" href="#基于于高斯克吕格投影的投影坐标系统" aria-hidden="true">#</a> 基于于高斯克吕格投影的投影坐标系统</h4>
<p>在我国北京54、西安80、国家2000地理坐标系统，均可以使用高斯克吕格投影定义出投影坐标系统</p>
<p>同一个地理坐标系统通常有多个投影投影坐标系统（其WKID也是不同的），可以根据需求选择，下面为一些示例</p>
<p>在ArcGIS中，不同的GCS（地理坐标系）的PCS（投影坐标系）是不同的，以CGCS2000、西安80和北京54为例：</p>
<p><code>CGCS2000_3_Degree_GK_CM_111E</code>：CGCS2000的GCS下，使用高斯克吕格3度分带法，以中央经线为东经111度的投影带的投影坐标系（WKID: 4546 ）</p>
<p><code>CGCS2000_3_Degree_GK_Zone_30</code>：CGCS2000的GCS下，使用高斯克吕格3度分带法，第30个投影带的投影坐标系（WKID: 4518 ）</p>
<p><code>Beijing_1954_3_Degree_GK_CM_111E</code>：北京54的GCS下，使用高斯克吕格3度分带法，以中央经线为东经111度的投影带的投影坐标系（WKID: 2434）</p>
<p><code>Beijing_1954_3_Degree_GK_Zone_35</code>：北京54的GCS下，使用高斯克吕格3度分带法，第35个投影带的投影坐标系（WKID: 2401 ）</p>
<p><code>Xian_1980_3_Degree_GK_CM_111E</code>：西安80的GCS下，使用高斯克吕格3度分带法，以中央经线为东经111度的投影带的投影坐标系（WKID: 2382）</p>
<p><code>Xian_1980_3_Degree_GK_Zone_34</code>：西安80的GCS下，使用高斯克吕格3度分带法，第34个投影带的投影坐标系（WKID: 2358）</p>
<blockquote>
<ul>
<li>名称中有CM，在Y坐标（经线方向）不带带号</li>
<li>名称中有Zone，则在Y坐标（经线方向）带带号</li>
</ul>
</blockquote>
<h4 id="基于utm投影的投影坐标系统" tabindex="-1"><a class="header-anchor" href="#基于utm投影的投影坐标系统" aria-hidden="true">#</a> 基于UTM投影的投影坐标系统</h4>
<p>类似于高斯克吕格投影坐标系统，只不过通常的组合是<strong>UTM投影+WGS84地理坐标系统</strong>，其组合与分代规同上。</p>
<h4 id="基于网络墨卡托-webmercator-投影的投影坐标系统" tabindex="-1"><a class="header-anchor" href="#基于网络墨卡托-webmercator-投影的投影坐标系统" aria-hidden="true">#</a> 基于网络墨卡托（WebMercator）投影的投影坐标系统</h4>
<p>只有一个，<strong>WebMercator投影+WGS84地理坐标系</strong> WKID=3857</p>
<h3 id="_4-各大地图厂商使用的坐标系" tabindex="-1"><a class="header-anchor" href="#_4-各大地图厂商使用的坐标系" aria-hidden="true">#</a> [4]各大地图厂商使用的坐标系</h3>
<ul>
<li>谷歌地图和OSM地图——&gt;<code>WGS84</code>坐标系</li>
<li>天地图——&gt;<code>CGCS2000</code>坐标系</li>
<li>高德、腾讯——&gt;<code>GCJ02</code>坐标系，<code>GCJ02</code>坐标系是在<code>WGS84</code>基础上加密而成的。</li>
<li>百度——&gt;<code>BD09</code>坐标系，是在<code>GCJ02</code>上再次加密而成的。</li>
</ul>
<blockquote>
<ul>
<li>WGS84\CGCS2000是原始坐标系，GCJ02\BD09是加密坐标系。</li>
<li>UTM投影坐标系经常应用在无人驾驶及高精地图上面；</li>
<li>国内Android系统手机采集的AGPS数据是GCJ02坐标系的；</li>
<li>RTK和一些PDA设备采集的GPS数据是WGS84坐标系的；</li>
<li>IOS系统手机采集的AGPS数据是WGS84坐标系的；</li>
<li>GPS定位芯片获取的定位数据是WGS84坐标系的；</li>
<li>北斗芯片获取的定位数据是CGCS2000坐标系的。</li>
</ul>
</blockquote>
<p>大多数情况下，我们可以认为<code>CGCS2000</code>坐标系=WGS84坐标系，很多软件和框架都还没有兼容CGCS2000坐标系，我们在使用CGCS2000坐标系的数据的时候，可以设置为WGS84坐标系，这样也便于传输和查阅。</p>
<h2 id="_7-数据中坐标参考系统" tabindex="-1"><a class="header-anchor" href="#_7-数据中坐标参考系统" aria-hidden="true">#</a> 7.数据中坐标参考系统</h2>
<h3 id="_1-判别" tabindex="-1"><a class="header-anchor" href="#_1-判别" aria-hidden="true">#</a> [1]判别</h3>
<ul>
<li>如果数据的元数据坐标系统的定义，则可以从数据的元数据中得知坐标系</li>
<li>如果数据的元数据没有坐标系统定义，需要通过观察数据坐标值来判断GCS、PCS类型，则需要一定的经验。</li>
<li>如果数据是两位数+三位数或者三位数+三位数等落于我国经纬度范围的数字，则可以大致判断是地理坐标系统，只需询问数据提供者，然后自己为数据定义地理坐标系统即可。</li>
<li>如果给的数据尺度很小，例如是一个厂房，而且一个单位数值差不多就是1米，则判断是CAD绘图，是未经校准的平面直角坐标系，可以理解为投影坐标系，只不过位置并不准确罢了，需要校准。</li>
<li>如果给的数据单位很大，通常是几万、几十万（5位数+6位数，是无投影带的，5位数是经线x方向，6位数是纬线y方向）（6位数+7位数，是有投影带的，6位数是纬线y方向，7位数是经线x方向，通过7位数的前两个数字判断投影带），此时可以粗略判断是投影坐标系统。</li>
<li>如果均不是以上的数值，则判断为误操作，可能是错误定义了坐标系，也可能是错误进行投影计算。</li>
</ul>
<h3 id="_2-定义投影" tabindex="-1"><a class="header-anchor" href="#_2-定义投影" aria-hidden="true">#</a> [2]定义投影</h3>
<p>在arcgis - arcmap中，在数据管理工具箱&gt;投影工具集下，是处理坐标系统的强大工具。</p>
<ul>
<li>“<strong>定义投影</strong>”工具，是为无坐标系统定义的数据定义GCS或PCS用的；</li>
</ul>
<h3 id="_3-转换投影" tabindex="-1"><a class="header-anchor" href="#_3-转换投影" aria-hidden="true">#</a> [3]转换投影</h3>
<ul>
<li>数据管理工具箱-&gt;投影工具集-&gt;“<strong>投影</strong>”工具，是转换坐标系统用的，可以由GCS投影到指定PCS，也可以由PCS转到指定GCS（可以是PCS定义内的GCS，也可以是其他GCS），也可以由PCS转到另一个PCS（换投影带，或者连GCS、PCS一起换）</li>
</ul>
<h2 id="_8-瓦片坐标系" tabindex="-1"><a class="header-anchor" href="#_8-瓦片坐标系" aria-hidden="true">#</a> 8.瓦片坐标系</h2>
<ul>
<li>谷歌地图、OSM、高德、腾讯、等都使用谷歌的瓦片地图规范</li>
<li>Z表示缩放层级，从0开始；<code>XY</code>的原点在左上角，<code>X</code>从左向右，<code>Y</code>从上向下</li>
</ul>
<p><img src="https://img-blog.csdnimg.cn/9ca11f5166104c519f524668bb32208a.png" alt="在这里插入图片描述"></p>
<h3 id="_2-wmts规范" tabindex="-1"><a class="header-anchor" href="#_2-wmts规范" aria-hidden="true">#</a> [2]WMTS规范</h3>
<ul>
<li>切片原点为左下角，X 轴向右，Y 轴向上</li>
<li>腾讯地图采用</li>
<li>WMTS瓦片可为矩形或正方形</li>
</ul>
<p><img src="https://img-blog.csdnimg.cn/1720f452a006440a9207df1295bb63f3.png" alt="在这里插入图片描述"></p>
<h3 id="_3-tms规范" tabindex="-1"><a class="header-anchor" href="#_3-tms规范" aria-hidden="true">#</a> [3]TMS规范</h3>
<ul>
<li>切片原点为左下角</li>
<li>TMS瓦片固定了为正方形</li>
</ul>
<h3 id="_4-百度地图" tabindex="-1"><a class="header-anchor" href="#_4-百度地图" aria-hidden="true">#</a> [4]百度地图</h3>
<ul>
<li>Z从1开始，在最高级就把地图分为四块瓦片；XY的原点在经纬度位0的位置，X从左向右，Y从下向上</li>
</ul>
<p><img src="https://img-blog.csdnimg.cn/c40c068685df433c9abad53225fb8df8.png" alt="在这里插入图片描述"></p>
<h3 id="_5-bing地图" tabindex="-1"><a class="header-anchor" href="#_5-bing地图" aria-hidden="true">#</a> [5]bing地图</h3>
<ul>
<li><code>QuadTree</code>：微软Bing地图使用的编码规范，Z的定义与谷歌相同，同一层级的瓦片不用XY两个维度表示，而只用一个整数表示，该整数服从四叉树编码规则</li>
</ul>
<h2 id="_9-坐标参考系统的表达" tabindex="-1"><a class="header-anchor" href="#_9-坐标参考系统的表达" aria-hidden="true">#</a> 9.坐标参考系统的表达</h2>
<p>常见的坐标参考系的表达有的WKT、Proj4表达、EPSG的WKID方式</p>
<p>proj.4表达式</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">+</span>proj<span class="token operator">=</span>longlat <span class="token operator">+</span>datum<span class="token operator">=</span><span class="token constant">WGS84</span> <span class="token operator">+</span>no_defs
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>EPSG表达式</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token constant">EPSG</span><span class="token operator">:</span><span class="token number">4326</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>WKID=4326的WKT表达</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>GEOGCS<span class="token punctuation">[</span><span class="token string">"WGS 84"</span><span class="token punctuation">,</span> <span class="token comment">//GEOGCS定义地理坐标系统,第一个属性"WGS 84"为该坐标系的名字</span>
    DATUM<span class="token punctuation">[</span><span class="token string">"WGS_1984"</span><span class="token punctuation">,</span><span class="token comment">//基准面"DATUM"</span>
        SPHEROID<span class="token punctuation">[</span><span class="token string">"WGS 84"</span><span class="token punctuation">,</span><span class="token number">6378137</span><span class="token punctuation">,</span><span class="token number">298.257223563</span><span class="token punctuation">,</span><span class="token comment">//"SPHEROID"是椭球体名称和长半轴长和扁率的倒数</span>
            AUTHORITY<span class="token punctuation">[</span><span class="token string">"EPSG"</span><span class="token punctuation">,</span><span class="token string">"7030"</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        AUTHORITY<span class="token punctuation">[</span><span class="token string">"EPSG"</span><span class="token punctuation">,</span><span class="token string">"6326"</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    PRIMEM<span class="token punctuation">[</span><span class="token string">"Greenwich"</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token comment">//中央经线Greenwich，0度标准子午线</span>
        AUTHORITY<span class="token punctuation">[</span><span class="token string">"EPSG"</span><span class="token punctuation">,</span><span class="token string">"8901"</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    UNIT<span class="token punctuation">[</span><span class="token string">"degree"</span><span class="token punctuation">,</span><span class="token number">0.0174532925199433</span><span class="token punctuation">,</span><span class="token comment">//转换因子0.0174532925199433</span>
        AUTHORITY<span class="token punctuation">[</span><span class="token string">"EPSG"</span><span class="token punctuation">,</span><span class="token string">"9122"</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    AUTHORITY<span class="token punctuation">[</span><span class="token string">"EPSG"</span><span class="token punctuation">,</span><span class="token string">"4326"</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>WKT（Well-known  text），是一种文本标记语言，用于表示矢量几何对象、空间参照系统及空间参照系统之间的转换。</p>
<h2 id="_10-不同坐标参考系统的转换" tabindex="-1"><a class="header-anchor" href="#_10-不同坐标参考系统的转换" aria-hidden="true">#</a> 10.不同坐标参考系统的转换</h2>
<p>一个坐标系统挪到另一个坐标系统，有哪些情况呢？</p>
<p>坐标系统转换的通常就是地理坐标系统之间的转换，也即椭球体的之间转换。直接转换投影坐标系是比较复杂的</p>
<h3 id="_1-三参数转换" tabindex="-1"><a class="header-anchor" href="#_1-三参数转换" aria-hidden="true">#</a> [1]三参数转换</h3>
<p>平移原点，只需要给出三个方向的平移量<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">d</span><span class="mord mathnormal">x</span><span class="mord cjk_fallback">、</span><span class="mord mathnormal">d</span><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="mord cjk_fallback">、</span><span class="mord mathnormal">d</span><span class="mord mathnormal" style="margin-right:0.04398em;">z</span></span></span></span></p>
<p><img src="https://img-blog.csdnimg.cn/1e1590fdeaed42a58bdb95239c11acaf.png" alt="在这里插入图片描述"></p>
<h3 id="_2-七参数转换" tabindex="-1"><a class="header-anchor" href="#_2-七参数转换" aria-hidden="true">#</a> [2]七参数转换</h3>
<p>三个平移参数<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">d</span><span class="mord mathnormal">x</span><span class="mord cjk_fallback">、</span><span class="mord mathnormal">d</span><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="mord cjk_fallback">、</span><span class="mord mathnormal">d</span><span class="mord mathnormal" style="margin-right:0.04398em;">z</span></span></span></span> + 三个方向的旋转角度<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.0037em;">α</span><span class="mord cjk_fallback">、</span><span class="mord mathnormal" style="margin-right:0.05278em;">β</span><span class="mord cjk_fallback">、</span><span class="mord mathnormal" style="margin-right:0.05556em;">γ</span></span></span></span> + 统一的缩放比例 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.03148em;">k</span></span></span></span></p>
<p><img src="https://img-blog.csdnimg.cn/7f57bb33f9e347e98ef13fe7c175b0a7.png" alt="在这里插入图片描述"></p>
<h3 id="_3-四参数转换" tabindex="-1"><a class="header-anchor" href="#_3-四参数转换" aria-hidden="true">#</a> [3]四参数转换</h3>
<p>也就是只在二维平面的情况，通过控制两个平移量<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">d</span><span class="mord mathnormal">x</span><span class="mord cjk_fallback">、</span><span class="mord mathnormal">d</span><span class="mord mathnormal" style="margin-right:0.03588em;">y</span></span></span></span>，一个旋转角度<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal" style="margin-right:0.0037em;">α</span></span></span></span>，一个缩放比例<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.03148em;">k</span></span></span></span>参数</p>
<h2 id="_11-地图投影前端实现与转换" tabindex="-1"><a class="header-anchor" href="#_11-地图投影前端实现与转换" aria-hidden="true">#</a> 11.地图投影前端实现与转换</h2>
<h4 id="turf-js" tabindex="-1"><a class="header-anchor" href="#turf-js" aria-hidden="true">#</a> turf.js</h4>
<h4 id="proj" tabindex="-1"><a class="header-anchor" href="#proj" aria-hidden="true">#</a> proj</h4>
<p>。。。</p>
</template>
