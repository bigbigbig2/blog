<template><nav class="table-of-contents"><ul><li><RouterLink to="#_1-三维数据模型">1.三维数据模型</RouterLink><ul><li><RouterLink to="#_2-体素模型-voxel-models">[2]体素模型（Voxel Models）</RouterLink></li><li><RouterLink to="#_3-参数化表面-parametric-surfaces">[3]参数化表面（Parametric Surfaces）</RouterLink></li><li><RouterLink to="#_4-隐式表面-implicit-surfaces">[4]隐式表面（Implicit Surfaces）</RouterLink></li><li><RouterLink to="#_5-点云-point-clouds">[5]点云（Point Clouds）</RouterLink></li></ul></li><li><RouterLink to="#_2-桌面端常见的三维模型数据格式">2.桌面端常见的三维模型数据格式</RouterLink><ul><li><RouterLink to="#_1-osgb">[1]OSGB</RouterLink></li><li><RouterLink to="#_2-obj">[2]OBJ</RouterLink></li><li><RouterLink to="#_3-fbx">[3]FBX</RouterLink></li><li><RouterLink to="#_4-stl">[4]STL</RouterLink></li><li><RouterLink to="#_5-3ds">[5]3DS</RouterLink></li><li><RouterLink to="#_6-dae">[6]DAE</RouterLink></li><li><RouterLink to="#_7-ply">[7]PLY</RouterLink></li></ul></li><li><RouterLink to="#_3-web端常见的三维模型数据格式">3.Web端常见的三维模型数据格式</RouterLink><ul><li><RouterLink to="#常见的web渲染引擎支持的三维数据格式">常见的Web渲染引擎支持的三维数据格式</RouterLink></li><li><RouterLink to="#_1-gltf">[1]glTF</RouterLink><ul><li><RouterLink to="#gltf-1-0与gltf-2-0">glTF 1.0与glTF 2.0</RouterLink></li><li><RouterLink to="#gltf与-glb">.gltf与.glb</RouterLink></li><li><RouterLink to="#注意事项">注意事项</RouterLink></li></ul></li><li><RouterLink to="#_2-高效三维数据格式-3d-tiles">[2]高效三维数据格式：3D Tiles</RouterLink><ul><li><RouterLink to="#_3d-tiles定义">3D Tiles定义</RouterLink></li><li><RouterLink to="#_3d-tiles数据结构">3D Tiles数据结构</RouterLink></li><li><RouterLink to="#_3d-tiles的生成方法">3D Tiles的生成方法</RouterLink></li><li><RouterLink to="#坐标系统">坐标系统</RouterLink></li><li><RouterLink to="#study-source-link">study source link：</RouterLink></li></ul></li></ul></li><li><RouterLink to="#_4-体积渲染">4.体积渲染</RouterLink></li><li><RouterLink to="#_5-测绘领域中的4d产品">5.测绘领域中的4D产品</RouterLink></li><li><RouterLink to="#"></RouterLink></li><li><RouterLink to="#_6-倾斜摄影三维建模软件">6.倾斜摄影三维建模软件</RouterLink><ul><li><RouterLink to="#_1-contextcapture-smart3d">[1]ContextCapture（Smart3D）</RouterLink></li><li><RouterLink to="#_2-pix4dmapper">[2]Pix4Dmapper</RouterLink></li><li><RouterLink to="#_3-photoscanz">[3]PhotoScanz</RouterLink></li><li><RouterLink to="#-1"></RouterLink></li></ul></li><li><RouterLink to="#_7-常见的三维建模软件">7.常见的三维建模软件</RouterLink></li></ul></nav>
<h2 id="_1-三维数据模型" tabindex="-1"><a class="header-anchor" href="#_1-三维数据模型" aria-hidden="true">#</a> 1.三维数据模型</h2>
<p>三维数据模型（3D data models）是用于表示三维空间中的物体和场景的计算机数据结构。常见的三维数据模型包括以下几种：</p>
<ul>
<li>多边形网格（Polygon Meshes）</li>
<li>体素模型（Voxel Models）</li>
<li>参数化表面（Parametric Surfaces）</li>
<li>隐式表面（Implicit Surfaces）</li>
<li>点云（Point Clouds）</li>
</ul>
<blockquote>
<p>这里仅做简单的科普介绍，如要深入了解可以看我之前的这篇笔记https://www.luxd.space/posts/%E5%87%A0%E4%BD%95.html，或者虎皮书Fundamenttals of Computer Graphs的第十二章Data structures for Graphis也有相关知识的深入讲解</p>
</blockquote>
<p>[1]多边形网格（Polygon Meshes）</p>
<p>多边形网格是一种常见的三维模型表示方法，通常采用三角形或四边形作为基本元素。多边形网格由顶点（vertices）、边（edges）和面（faces）组成。顶点记录三维坐标信息，边连接顶点，而面则由边围成。多边形网格可以表示各种复杂的三维物体，例如在计算机图形学和游戏开发中广泛使用</p>
<p>大多数现实世界的模型都由共享顶点的三角形组成。这些通常被称为三角形网格或三角不规则网(TIN)，有效处理它们对许多图形程序的性能至关重要。</p>
<h3 id="_2-体素模型-voxel-models" tabindex="-1"><a class="header-anchor" href="#_2-体素模型-voxel-models" aria-hidden="true">#</a> [2]体素模型（Voxel Models）</h3>
<p>体素模型是一种将三维空间离散化为规则的体素（Voxels，体素即Volume Pixels）格子的表示方法。每个体素可以存储颜色、密度等属性数据。体素模型通常用于表示具有内部结构的物体，如医学影像（CT、MRI）和地质数据等领域。</p>
<h3 id="_3-参数化表面-parametric-surfaces" tabindex="-1"><a class="header-anchor" href="#_3-参数化表面-parametric-surfaces" aria-hidden="true">#</a> [3]参数化表面（Parametric Surfaces）</h3>
<p>参数化表面是通过数学函数或参数方程来定义的表面。常见的参数化表面有NURBS（非均匀有理B样条曲面）和Bezier曲面等。参数化表面具有良好的数学性质，便于精确控制几何形状。它们在计算机辅助设计（CAD）和建筑设计等领域得到了广泛应用。</p>
<h3 id="_4-隐式表面-implicit-surfaces" tabindex="-1"><a class="header-anchor" href="#_4-隐式表面-implicit-surfaces" aria-hidden="true">#</a> [4]隐式表面（Implicit Surfaces）</h3>
<p>隐式表面是通过隐式方程定义的三维表面，例如 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">y</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span>。隐式表面可以表示复杂数学形状，如球体、圆锥体、超平面等。在计算机图形学中，隐式表面用于实现柔和的物体融合、建模和形状变形等效果。</p>
<h3 id="_5-点云-point-clouds" tabindex="-1"><a class="header-anchor" href="#_5-点云-point-clouds" aria-hidden="true">#</a> [5]点云（Point Clouds）</h3>
<p>点云是由大量离散的三维点组成的数据结构。每个点包含了位置信息，可能还包含颜色、法向量等属性。点云通常来源于三维扫描仪或者深度相机，用于表示实际环境中的物体和场景。点云数据可以被进一步处理，生成多边形网格等其他类型的三维模型。</p>
<h2 id="_2-桌面端常见的三维模型数据格式" tabindex="-1"><a class="header-anchor" href="#_2-桌面端常见的三维模型数据格式" aria-hidden="true">#</a> 2.桌面端常见的三维模型数据格式</h2>
<p>三维模型数据格式多种多样，常见的有OSGB,DAE,OBJ,STL,3DS,CLM,IFC,PLY等数据格式。这些主要是<strong>桌面软件所支持的数据格式</strong>，结构较为复杂，不适于网络传输，也就是意味着如果要在web端使用这些模型一般需要进行转换压缩。</p>
<h3 id="_1-osgb" tabindex="-1"><a class="header-anchor" href="#_1-osgb" aria-hidden="true">#</a> [1]OSGB</h3>
<p>OSGB（OpenSceneGraph Binary）：OSGB是一种基于OpenSceneGraph（OSG）的二进制文件格式。OSGB文件可以存储三维模型的几何信息、嵌入式链接纹理数据（.jpg）和场景图层信息。OSGB格式的优点是加载速度快，支持分层级细节（LOD）技术，适用于大规模三维场景的实时渲染。(在桌面端适用的很好)</p>
<p>优点：</p>
<ol>
<li>快速加载：OSGB是二进制格式，加载速度比文本格式快得多。</li>
<li>节省存储空间：由于OSGB是二进制格式，所以文件大小比文本格式小得多，可以在存储和传输方面节省空间和时间。</li>
<li>数据安全：由于OSGB是二进制格式，不容易被修改或篡改。</li>
<li>支持大型场景：OSGB格式支持大型场景和复杂的模型，因此适用于需要处理大型3D数据集的应用程序。</li>
</ol>
<p>缺点：</p>
<ol>
<li>不可读：由于OSGB是二进制格式，所以不能直接读取和编辑。这使得调试和修改变得更加困难。</li>
<li>不可扩展：OSGB格式是封闭的，不支持添加新的数据或扩展数据。这使得它不适合需要动态生成或编辑3D场景的应用程序。</li>
</ol>
<p><a href="https://blog.csdn.net/TxyITxs/article/details/119967351" target="_blank" rel="noopener noreferrer">OSGB格式解析</a></p>
<blockquote>
<p>还有就是需要构建索引才能在ContextCapture Viewer中预览所有数据块，没有索引只能一块一块的查看。</p>
</blockquote>
<h3 id="_2-obj" tabindex="-1"><a class="header-anchor" href="#_2-obj" aria-hidden="true">#</a> [2]OBJ</h3>
<p>OBJ文件格式是一种常用的三维模型文件格式，它是一种人类可读的文本格式，可以包含三角形、四边形、多边形和其他几何体的描述信息。OBJ文件格式最初由 Alias|Wavefront 公司开发，用于创建三维图形和动画。</p>
<p>很适合用于3D软件模型之间的互导，比如Smart3D里面生成的模型需要修饰，可以输出OBJ格式，之后就可以导入到3dsMax进行处理；或者在3dsMax中建了一个模型，想把它调到Maya里面渲染或动画，导出OBJ文件就是一种很好的选择。</p>
<p><strong>目前几乎所有知名的3D软件都支持OBJ文件的读写，OBJ文件还是一种文本文件，可以直接用写字板打开进行查看和编辑修改。</strong></p>
<p>OBJ文件格式通常由多个文件组成，其中包括OBJ文件（模型文件）、MTL文件和图片文件。这些文件通常被放在同一目录下，以方便引用和管理。</p>
<ul>
<li><strong>OBJ文件</strong>：通常以“.obj”扩展名结尾，包含了三维模型的几何信息，如顶点、面以及纹理坐标等。OBJ文件是一个文本文件，可以使用文本编辑器打开和编辑。
OBJ文件格式通常包含两个部分：顶点数据和面数据。顶点数据包括模型中的所有顶点的位置、法向量、纹理坐标和颜色信息。面数据包括模型中的所有面的顶点索引信息，用于描述如何将顶点连接起来形成面。
下面是一个简单的OBJ文件格式的例子：</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># 一个简单的OBJ文件格式示例
v 0.0 0.0 0.0    # 第一个顶点的位置
v 1.0 0.0 0.0    # 第二个顶点的位置
v 1.0 1.0 0.0    # 第三个顶点的位置
f 1 2 3          # 三角形面的顶点索引
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>OBJ文件格式的具体格式如下：</p>
<ol>
<li>顶点数据（可选）：以“v”命令开头，包含顶点的位置坐标。例如：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>v 0.0 0.0 0.0
v 1.0 0.0 0.0
v 1.0 1.0 0.0
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ol start="2">
<li>顶点法向量数据（可选）：以“vn”命令开头，包含顶点的法向量信息。例如：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>vn 0.0 0.0 1.0
vn 0.0 0.0 1.0
vn 0.0 0.0 1.0
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ol start="3">
<li>纹理坐标数据（可选）：以“vt”命令开头，包含顶点的纹理坐标信息。例如：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>vt 0.0 0.0
vt 1.0 0.0
vt 1.0 1.0
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ol start="4">
<li>面数据：以“f”命令开头，用于描述面的顶点索引。例如：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>f 1/1/1 2/2/1 3/3/1
f 1/1/1 3/3/1 4/4/1
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>在这个例子中，顶点索引的格式是“v/vt/vn”，分别表示顶点、纹理坐标和法向量在各自列表中的索引。如果某个属性不存在，则用“-”代替。例如，如果没有纹理坐标，则格式为“v//vn”。
此外，OBJ文件格式还支持一些其他命令，例如：</p>
<ol>
<li>“mtllib”：用于指定材质库文件的路径。</li>
<li>“usemtl”：用于指定使用的材质名称。</li>
<li>“g”：用于定义组信息。</li>
<li>“s”：用于指定平滑组信息</li>
</ol>
<ul>
<li><strong>MTL文件</strong>：通常以“.mtl”扩展名结尾，包含了三维模型的材质信息，如颜色、纹理、透明度等。MTL文件也是一个文本文件，可以使用文本编辑器打开和编辑。
例如，下面是一个MTL文件的示例：</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># 一个MTL文件示例
newmtl material1     # 定义一个新的材质
Ka 0.2 0.2 0.2       # 环境光颜色
Kd 0.8 0.8 0.8       # 漫反射颜色
Ks 1.0 1.0 1.0       # 镜面反射颜色
map_Kd texture.jpg   # 漫反射纹理贴图
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ul>
<li><strong>图片文件</strong>：通常以“.jpg”、“.png”等扩展名结尾，包含了三维模型的纹理信息。图片文件可以使用任何支持的图像编辑软件打开和编辑，例如Photoshop或GIMP。在OBJ和MTL文件中，图片文件通常被引用为纹理贴图。</li>
</ul>
<p>示例
<img src="https://img-blog.csdnimg.cn/img_convert/f1eb4fbdd97236b2663e29b5ffc8ab17.png#averageHue=#e3e1e0&amp;clientId=u07d34883-c8bd-4&amp;from=paste&amp;height=793&amp;id=u34a588cd&amp;originHeight=991&amp;originWidth=1920&amp;originalType=binary&amp;ratio=1.25&amp;rotation=0&amp;showTitle=false&amp;size=1108193&amp;status=done&amp;style=none&amp;taskId=u42c6a938-72a5-4135-be4b-aed7be94e7c&amp;title=&amp;width=1536" alt="image.png">
[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-CQcPgYsP-1691561372691)(%E4%B8%89%E7%BB%B4%E6%B8%B2%E6%9F%93%E7%9B%B8%E5%85%B3.assets/image-20230504164123038.png#id=zbqce&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=)]</p>
<h3 id="_3-fbx" tabindex="-1"><a class="header-anchor" href="#_3-fbx" aria-hidden="true">#</a> [3]FBX</h3>
<p>FBX是一种通用的三维模型格式，由Autodesk公司开发和维护。它是一种二进制文件格式，旨在支持不同3D软件之间的数据交换和互操作性。FBX文件可以包含几何体、材质、动画、灯光、相机、约束等多种类型的数据。</p>
<p>FBX格式的优点之一是在不同的3D软件之间转换时的高度兼容性。许多3D软件都支持导入和导出FBX文件，包括3ds Max、Maya、Blender、Cinema 4D等。这使得FBX成为一种常见的数据交换格式，可以在不同的软件之间轻松地共享3D模型和相关的数据。</p>
<p>FBX还支持动画数据的存储和传输，包括关键帧动画和骨骼动画。这使得FBX成为游戏开发、影视制作等行业中常用的格式之一。在游戏开发中，开发人员可以使用FBX格式将3D模型和动画从艺术家或外部制作公司导入到游戏引擎中。</p>
<ul>
<li><strong>FBX文件结构</strong>：FBX文件由多个块组成，每个块代表一种类型的数据，比如几何体、材质、动画轨迹等。每个块都有一个头部，其中包含块的类型、大小和版本信息等元数据。这种结构使得FBX文件非常灵活和可扩展，可以根据需要添加或删除特定类型的数据。</li>
<li>**常见应用领域：**由于其高度兼容性和支持动画数据的存储和传输，FBX广泛应用于游戏开发、影视制作、建筑设计、工业设计等领域。在游戏开发中，FBX格式常用于导入3D模型和动画到游戏引擎中。在影视制作中，FBX格式常用于在不同软件之间交换3D场景和角色数据。在建筑设计和工业设计中，FBX格式常用于展示和交流3D模型和设计方案。</li>
</ul>
<p>示例：<a href="https://sketchfab.com/3d-models/placeholder-cube-1-7b56b13a97df40c48d678c799d6e7231" target="_blank" rel="noopener noreferrer">https://sketchfab.com/3d-models/placeholder-cube-1-7b56b13a97df40c48d678c799d6e7231</a></p>
<h3 id="_4-stl" tabindex="-1"><a class="header-anchor" href="#_4-stl" aria-hidden="true">#</a> [4]STL</h3>
<p>STL是一种常用的三维模型数据格式，它是由3D Systems公司在1987年开发的。STL代表“STereoLithography”，是一种用于快速原型制造的文件格式。STL文件以二进制或ASCII格式存储，其中包含物体的表面几何信息</p>
<p>STL文件由一系列三角形组成，每个三角形都由三个顶点和一个法线向量定义。STL文件中的三角形数量决定了物体的精度和细节程度。STL文件中不包含材质、纹理、颜色、动画等其他信息。因此，STL文件通常用于制造原型或快速建模，而不是用于渲染或动画等高级应用。</p>
<p><strong>优点：</strong></p>
<p>简单性和通用性。几乎所有3D软件都支持导入和导出STL文件，因此可以在不同的软件之间轻松共享3D模型。此外，STL文件非常小，可以快速加载和处理，这使得它们在快速原型制造和3D打印等应用中非常有用。</p>
<p><strong>局限性：</strong></p>
<p>由于STL文件只包含表面几何信息，因此无法描述内部结构、孔洞、壳厚度等特性。另外，STL文件的精度受到三角形数量的限制，当三角形数量不足时，模型的曲面会出现锯齿状或平滑度不足的问题</p>
<h3 id="_5-3ds" tabindex="-1"><a class="header-anchor" href="#_5-3ds" aria-hidden="true">#</a> [5]3DS</h3>
<p>3DS是3dsMax建模软件的衍生文件格式，做完MAX的场景文件后可导出成3DS格式，可与其他建模软件兼容，也可用于渲染。</p>
<p><strong>优点：</strong></p>
<ul>
<li>3DS文件的优点之一是其广泛的支持。许多3D软件都支持导入和导出3DS文件，例如3ds Max、Maya、Blender、Cinema 4D等。这使得3DS成为一种通用的三维模型数据格式，可以在不同的软件之间共享3D模型。</li>
<li>3DS文件中包含的数据类型非常丰富，包括几何体、材质、动画、相机、灯光、约束等。这些数据可以描述三维场景中的不同方面，例如物体的形状、外观、动作等。此外，3DS文件还支持多种类型的动画数据，包括关键帧动画、物理动画、路径动画等。</li>
</ul>
<p><strong>局限性：</strong></p>
<p>由于其二进制格式，3DS文件不容易进行版本控制和修改。此外，3DS文件的文件大小通常很大，因为它们包含了大量的数据类型和细节。另外，3DS文件的精度受到三角形数量的限制，当三角形数量不足时，模型的曲面会出现锯齿状或平滑度不足的问题。</p>
<h3 id="_6-dae" tabindex="-1"><a class="header-anchor" href="#_6-dae" aria-hidden="true">#</a> [6]DAE</h3>
<p>DAE（Digital Asset Exchange）是一种<strong>基于XML</strong>的开放式三维模型交换格式，由Collada工作组开发。DAE文件包含了三维模型、材质、动画、灯光等信息，可以在不同的3D软件之间进行导入和导出。</p>
<p><strong>优点：</strong></p>
<ul>
<li>DAE文件的优点之一是其开放式标准。由于DAE是一种开放式标准，因此可以在不同的3D软件之间进行交换和共享，从而实现数据的无缝转移。此外，由于DAE是基于XML的格式，因此可以方便地进行版本控制和修改。</li>
<li>DAE文件还具有良好的兼容性。它可以与多种三维软件和引擎进行交互，包括3ds Max、Maya、Blender、Unity、Unreal Engine等。这使得DAE成为了一种通用的三维模型交换格式，可以在不同的软件和平台之间共享3D模型。</li>
</ul>
<p><strong>局限性：</strong></p>
<ul>
<li>DAE文件的缺点之一是文件大小较大。由于它是基于XML的格式，因此文件大小比二进制格式（如FBX、GLB等）要大很多。此外，由于DAE文件中包含了大量的数据和细节，因此在加载和渲染时需要消耗更多的时间和资源。</li>
</ul>
<h3 id="_7-ply" tabindex="-1"><a class="header-anchor" href="#_7-ply" aria-hidden="true">#</a> [7]PLY</h3>
<p>PLY（Polygon File Format）是一种用于存储三维模型的文件格式，由斯坦福大学图形实验室开发。PLY文件格式既可以存储三角形网格模型，也可以存储点云模型，是一种非常灵活和通用的三维模型数据格式。</p>
<p><strong>优点：</strong></p>
<ul>
<li>PLY文件格式的优点之一是其简单性。PLY文件格式采用ASCII或二进制格式存储三维模型数据，数据结构简单明了，易于理解和解析。此外，PLY文件格式支持自定义属性和注释，可以存储更多的信息和元数据。</li>
<li>PLY文件格式的另一个优点是其通用性。PLY文件格式可以被多种3D软件和引擎所支持，例如MeshLab、CloudCompare、Unity、Unreal Engine等。此外，PLY文件格式也被广泛用于科学计算、医学成像、机器人控制等领域，具有广泛的应用场景。</li>
</ul>
<p><strong>局限性：</strong></p>
<ul>
<li>PLY文件格式的缺点之一是其文件大小较大。由于PLY文件格式存储的是离散化的三维数据，因此文件大小比其他格式（如OBJ、FBX等）要大很多。此外，由于PLY文件格式不支持压缩，因此在传输和存储时需要消耗更多的时间和资源。</li>
</ul>
<h2 id="_3-web端常见的三维模型数据格式" tabindex="-1"><a class="header-anchor" href="#_3-web端常见的三维模型数据格式" aria-hidden="true">#</a> 3.Web端常见的三维模型数据格式</h2>
<h3 id="常见的web渲染引擎支持的三维数据格式" tabindex="-1"><a class="header-anchor" href="#常见的web渲染引擎支持的三维数据格式" aria-hidden="true">#</a> 常见的Web渲染引擎支持的三维数据格式</h3>
<p>以下是常见的Web渲染引擎（Cesium、Three.js、Babylon.js、deck.gl、Mapbox GL JS）支持的三维数据格式：</p>
<ol>
<li>
<p>Cesium：</p>
<ul>
<li>glTF (.gltf, .glb)：Cesium的主要支持的三维数据格式，用于表示3D模型和场景。</li>
<li></li>
</ul>
</li>
<li>
<p>Three.js：</p>
<ul>
<li>glTF (.gltf, .glb)：Three.js支持的主要三维数据格式。</li>
<li>OBJ：一种常见的3D模型格式，Three.js可以加载和显示OBJ文件。</li>
<li>FBX：Autodesk的3D模型格式，Three.js可以加载和显示FBX文件。</li>
<li>Collada (.dae)：一种基于XML的3D模型格式，Three.js可以加载和显示Collada文件。</li>
<li>JSON：Three.js的自定义JSON格式，用于表示3D模型和场景。</li>
</ul>
</li>
<li>
<p>Babylon.js：</p>
<ul>
<li>glTF (.gltf, .glb)：Babylon.js支持的主要三维数据格式。</li>
<li>OBJ：Babylon.js可以加载和显示OBJ文件。</li>
<li>FBX：Babylon.js可以加载和显示FBX文件。</li>
<li>Collada (.dae)：Babylon.js可以加载和显示Collada文件。</li>
<li>STL：一种用于3D打印的模型格式，Babylon.js可以加载和显示STL文件。</li>
<li>Babylon (.babylon)：Babylon.js的自定义格式，用于表示3D模型和场景。</li>
</ul>
</li>
<li>
<p>deck.gl：</p>
<ul>
<li>GeoJSON：deck.gl支持加载和显示GeoJSON文件，用于表示地理空间数据。</li>
<li>MVT（Mapbox Vector Tiles）：一种用于表示矢量地图数据的格式，deck.gl可以加载和显示MVT文件。</li>
</ul>
</li>
<li>
<p>Mapbox GL JS：</p>
<ul>
<li>GeoJSON：Mapbox GL JS支持加载和显示GeoJSON文件，用于表示地理空间数据。</li>
<li>MVT（Mapbox Vector Tiles）：Mapbox GL JS可以加载和显示MVT文件，用于表示矢量地图数据。</li>
<li>Terrain-RGB：一种用于表示地形数据的格式，Mapbox GL JS可以加载和显示Terrain-RGB文件。</li>
</ul>
</li>
</ol>
<p>对于Web端，因为网络传输性能的瓶颈，是不太适合直接使用桌面端常见的三维数据格式的，因为其文件通常很大，还有一些兼容性的问题，常见的Web渲染引擎也不支持。</p>
<h3 id="_1-gltf" tabindex="-1"><a class="header-anchor" href="#_1-gltf" aria-hidden="true">#</a> [1]glTF</h3>
<p>glTF（全称为GL Transmission Format）是一种基于JSON的开放标准的三维模型文件格式，由Khronos Group开发，旨在提供一种在WebGL、OpenGL和Vulkan等3D图形API中高效传输和加载三维模型的标准格式。glTF支持几何体、材质、纹理、动画、骨骼和节点层次结构等多种三维模型和场景元素。</p>
<h4 id="gltf-1-0与gltf-2-0" tabindex="-1"><a class="header-anchor" href="#gltf-1-0与gltf-2-0" aria-hidden="true">#</a> glTF 1.0与glTF 2.0</h4>
<p>glTF 1.0和glTF 2.0是glTF规范的两个版本，它们之间有很多的区别和改进。下面是它们的主要区别：</p>
<ol>
<li>文件格式：glTF 1.0使用JSON格式来描述3D模型的几何形状、材质、动画和其他相关信息，可以包含多个文件，例如二进制文件、纹理文件和其他资源文件。glTF 2.0使用JSON格式来描述3D模型的几何形状、材质、动画和其他相关信息，可以包含多个文件，例如二进制文件、纹理文件和其他资源文件，也可以使用glb二进制格式来存储所有的模型数据。</li>
<li>材质：glTF 1.0使用基于Phong模型的材质系统，可以定义漫反射、镜面反射和环境光反射等属性。glTF 2.0使用基于PBR（Physically Based Rendering）的材质系统，可以定义金属度、粗糙度、环境光遮蔽和法线贴图等属性，可以更加真实地模拟光照效果。</li>
<li>动画：glTF 1.0支持基于关键帧的动画，可以定义位置、旋转和缩放等属性的动画。glTF 2.0支持基于节点层级的动画，可以定义节点的变换矩阵、权重和可见性等属性的动画，可以更加灵活地控制动画效果。</li>
<li>扩展：glTF 1.0支持一些扩展，例如KHR_materials_common扩展，可以定义基于传统渲染管线的材质属性。glTF 2.0支持更多的扩展，例如KHR_texture_transform扩展，可以定义纹理的平移、旋转和缩放等属性，可以更加灵活地控制纹理效果。</li>
<li>性能：glTF 2.0相对于glTF 1.0来说，可以更好地支持GPU加速和压缩，可以更快地加载和渲染3D模型，可以更好地适应WebGL和OpenGL等图形API的要求。</li>
</ol>
<h4 id="gltf与-glb" tabindex="-1"><a class="header-anchor" href="#gltf与-glb" aria-hidden="true">#</a> .gltf与.glb</h4>
<p>.gltf是一种开放标准的三维模型文件格式，它使用JSON格式来描述三维模型的几何形状、材质、动画和其他相关信息。.gltf文件可以包含多个文件，例如二进制文件、纹理文件和其他资源文件。.gltf文件可以在WebGL和OpenGL等图形API中使用，可以在Web浏览器中直接加载和渲染。
<img src="https://img-blog.csdnimg.cn/img_convert/68048e5914b5a24afe6a156e6e55ff96.png#averageHue=#999d92&amp;clientId=u07d34883-c8bd-4&amp;from=paste&amp;height=310&amp;id=u17d7718f&amp;originHeight=387&amp;originWidth=744&amp;originalType=binary&amp;ratio=1.25&amp;rotation=0&amp;showTitle=false&amp;size=215095&amp;status=done&amp;style=none&amp;taskId=uccd95991-4066-433d-a0dd-f2091068fd4&amp;title=&amp;width=595.2" alt="image.png">
[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-OnHYRGvW-1691561372692)(%E4%B8%89%E7%BB%B4%E6%B8%B2%E6%9F%93%E7%9B%B8%E5%85%B3.assets/image-20230504181927988.png#id=r6Hkh&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=)]</p>
<p>.glb是.gltf的二进制版本，它将所有的模型数据存储在一个二进制文件中，包括几何形状、材质、动画和其他相关信息。.glb文件比.gltf文件更紧凑，因为它们不需要加载多个文件</p>
<p>cesium示例中的glb模型：
<img src="https://img-blog.csdnimg.cn/img_convert/49693f85035137d84ca347454ba4cdc6.png#averageHue=#fefdfd&amp;clientId=u07d34883-c8bd-4&amp;from=paste&amp;height=745&amp;id=uf9375105&amp;originHeight=931&amp;originWidth=1919&amp;originalType=binary&amp;ratio=1.25&amp;rotation=0&amp;showTitle=false&amp;size=102072&amp;status=done&amp;style=none&amp;taskId=u324c33de-bd44-4729-b7bb-96964d175eb&amp;title=&amp;width=1535.2" alt="image.png">
[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-Bbj0xwjk-1691561372693)(%E4%B8%89%E7%BB%B4%E6%B8%B2%E6%9F%93%E7%9B%B8%E5%85%B3.assets/image-20230504182917773.png#id=JxpTY&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=)]</p>
<h4 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项" aria-hidden="true">#</a> 注意事项</h4>
<ul>
<li>glTF 1.0和glTF 2.0都可以使用.gltf和.glb这两种文件格式</li>
<li>.gltf和.glb都是glTF文件格式的一部分，它们的区别在于文件的存储方式。.gltf文件使用JSON格式来描述三维模型的几何形状、材质、动画和其他相关信息，可以包含多个文件，例如二进制文件、纹理文件和其他资源文件。.glb文件是glTF的二进制版本，将所有的模型数据存储在一个二进制文件中，包括几何形状、材质、动画和其他相关信息。</li>
<li>glTF 1.0和glTF 2.0是两个不同的版本，它们之间有一些区别和改进。glTF 2.0相对于glTF 1.0来说，增加了更多的功能和特性，例如支持PBR材质、动态加载、GPU纹理压缩等。但是，glTF 2.0仍然可以使用.gltf和.glb这两种文件格式。</li>
<li>因此，可以使用.gltf和.glb这两种文件格式来存储glTF 1.0和glTF 2.0的三维模型数据。选择使用哪种文件格式，取决于具体的应用场景和需求。</li>
<li>GLTF、GLB（二进制gLTF文件）</li>
<li>三维瓦片：3DTiles（倾斜摄影、人工模型、三维建筑物、CAD、BIM、点云数据等）</li>
</ul>
<h3 id="_2-高效三维数据格式-3d-tiles" tabindex="-1"><a class="header-anchor" href="#_2-高效三维数据格式-3d-tiles" aria-hidden="true">#</a> [2]高效三维数据格式：3D Tiles</h3>
<p>3D Tiles 是 Cesium 提出的处理三维地理大数据的数据格式，从结构关系上看,3DTiles 归属于Primitive，具有很高的数据加载效率。</p>
<h4 id="_3d-tiles定义" tabindex="-1"><a class="header-anchor" href="#_3d-tiles定义" aria-hidden="true">#</a> 3D Tiles定义</h4>
<p>3D Tiles 是 Cesium 于2016 年3月定义的一种三维模型瓦片数据结构。3DTiles 将海量三维数据以分块、分层的形式组织起来,这样就大大减轻了浏览器和图形处理单元（GPU）的负担。3D Tiles数据的特点如下：</p>
<ol>
<li><strong>开放且灵活：<strong>作为一种开放式数据规范，3D Tiles 的切片方案灵活可变，三维模型的切片大小和覆盖范围可以人为设置。此外,3D Tiles 还能够适配三维空间中多种空间分区方案,包括</strong>KD树、四叉树、八叉树、普通网格</strong>，以及其他空间数据结构等。</li>
<li>**质性支特：**通过一组已定义的文件格式,可以将多种类型的三维地理空间要素(包括倾斜摄影数据、BIM/CAD 数据、三维建筑模型、实例化要素和点云数据)转换为三维形式的单个数据集,同时又允许多种不同格式标准的模型显示在同一个场景中。</li>
<li>**专为三维可视化设计：**3D Tiles 建立在gITF 格式之上，并引人了三维图形领域的技术，3D Tiles 格式的基础就是树状模型对象的层次结构(hierarchicallevels of detail, HLOD)。传统的细节层次模型会访问场景中所有对象或者节点，针对每一个节点判断是否符合渲染的条件;而 HLOD 具备层次结构，当不满足细化渲染添加的时候，场景只会渲染父级对象或节点，不会访问子节点，因此计算量会相对较小。</li>
<li><strong>可交互</strong>：3D Tiles 支持交互旋转和样式的设置，在 WcbGL 中优化后，三维瓦片文持对单个模型的交互，如高亮显示鼠标悬停位置的模型，或删除一个三维建筑模型。还支持对单个模型的材质修改，如根据建筑高度和年代，可以设置不同的显示效果而不需要重新更新代码。3D Tiles 用于流式传输三维空间信息,包括建筑物、树木、点云和矢量数据等。</li>
</ol>
<h4 id="_3d-tiles数据结构" tabindex="-1"><a class="header-anchor" href="#_3d-tiles数据结构" aria-hidden="true">#</a> 3D Tiles数据结构</h4>
<p>3D Tiles数据结构由两部分组成，一个是JSON格式的数据组织文件tileset.json，另外是每个瓦片节点对应的模型文件，3Dtiles支持的模型文件格式有.b3dm、.i3dm、.pnts、.vctr、.cmpt五种：
在1.0 版本的规范中，瓦片所引用的二进制的瓦片数据文件，有四种类型：.b3dm、.i3dm、.pnts、.cmpt</p>
<table>
<thead>
<tr>
<th>格式名称</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>Batched 3D Model( * . b3dm)</td>
<td>用于具有不同几何、材质或贴图的异质模型网格</td>
</tr>
<tr>
<td>Instanced 3D Model( * . i3dm)</td>
<td>实例化的模型，应用同一个三维模型，用于树木等相同的地物可视化</td>
</tr>
<tr>
<td>Point Cloud ( * . pnts)</td>
<td>用于点云数据的可视化</td>
</tr>
<tr>
<td>Vector Data ( * . vctr)</td>
<td>用手矢量数据的可视化</td>
</tr>
<tr>
<td>Composite( * . cmpt)</td>
<td>上述几种格式的组合</td>
</tr>
</tbody>
</table>
<p><img src="https://img-blog.csdnimg.cn/img_convert/84a2d02c58ac461b4e5fc765f7e7a5e9.png#averageHue=#e2e8e6&amp;clientId=u07d34883-c8bd-4&amp;from=paste&amp;height=277&amp;id=u69ecdac3&amp;originHeight=221&amp;originWidth=556&amp;originalType=url&amp;ratio=1.25&amp;rotation=0&amp;showTitle=false&amp;size=117465&amp;status=done&amp;style=none&amp;taskId=ueec7dc1e-1b89-4a75-be4d-2000166c53c&amp;title=&amp;width=697" alt="image.png">
一个tielset.json文件中最层级的对象中通常有这四个属性：</p>
<ul>
<li><strong>asset</strong>是一个包含了整体tileset 元数据属性的对象，其中 version 属性是定义3D Tiles 版本的字符串,版本号定义了 tileset. json 的JSON 格式和瓦片格式的基础。tilesetVersion 属性是一个选填的宇符串,用于定义特定应用中 tileset 的版本,可以用于更新 tileset。</li>
<li><strong>properities</strong>规定了瓦片集最大外包矩形地理空间范围，由经度、纬度、高度三个属性的最大值和最小值界定</li>
<li><strong>geometricError</strong>定义了一个非负误差(以米为单位），在这个误差下瓦片集不被渲染</li>
<li><strong>root</strong>用于定义根瓦片，root.geometricError 与最高层级tileset. json 的geometricError 不同。后者是整个瓦片集不被渲染的误差,前者是只有根瓦片被渲染的误差</li>
<li><strong>children</strong> 定义子瓦片对象的数组。每个子瓦片都有 bounding Volume,这个边界体被父瓦片的 bounding Volume 完全包围，通常子瓦片的 geometricError 要小于父瓦片的 geometricError。对于叶子瓦片而言，子瓦片数组的长度为零。</li>
</ul>
<blockquote>
<ul>
<li>瓦片对象记录的就是瓦片的元数据，真正瓦片的本体数据在content所引用的二进制文件中</li>
<li>瓦片还可以再引用 3dTiles 数据集（套娃）</li>
</ul>
</blockquote>
<p>这里重点说说<strong>root瓦片及其children：</strong>
树结构对于三维空间数据的组织有很大的优势。3dTiles在空间上允许数据集使用如下几种树结构：</p>
<ul>
<li><strong>四叉树</strong>：四叉树允许使用传统的均匀四叉树，也允许使用松散四叉树等变种（例如，允许子节点，即<strong>子瓦片允许存在空间范围重叠</strong>）。四叉树对在高度上不太好切分的数据比较适合，而如果追求极致的空间分割和分级（例如点云数据），那么八叉树更合适。</li>
<li>**八叉树：**八叉树也允许使用各种变种。</li>
<li><strong>KD树</strong></li>
<li>**格网结构：**格网结构的树允许瓦片存在多个子瓦片，通常出现在倾斜摄影数据上，但是这会导致网络请求过多的问题。</li>
</ul>
<h4 id="_3d-tiles的生成方法" tabindex="-1"><a class="header-anchor" href="#_3d-tiles的生成方法" aria-hidden="true">#</a> 3D Tiles的生成方法</h4>
<p>目前主要将四类三维数据格式模型 <strong>BIM、3ds Max 模型、倾斜摄影数据模型、简易三维模型</strong>生成为3D Tiles以在web端使用</p>
<h4 id="坐标系统" tabindex="-1"><a class="header-anchor" href="#坐标系统" aria-hidden="true">#</a> 坐标系统</h4>
<p>3dTiles采用的是WGS84椭球，但是并未采用经纬度记录数据：因为相对于精细三维模型来说，经纬度不足以提供足够精确的空间分割（要照顾图形显示问题）。所以，同样是那个形状，3dTiles使用了同一个WGS84椭球，但是更方便计算的坐标：空间直角坐标。（三维笛卡尔坐标）
用经纬度记录数据的WGS84坐标系，WKID是4326，用地心为坐标原点的空间直角坐标来记录数据的坐标系，WKID是4979.
3dTiles 用的就是4979坐标系。</p>
<h4 id="study-source-link" tabindex="-1"><a class="header-anchor" href="#study-source-link" aria-hidden="true">#</a> study source link：</h4>
<ul>
<li><a href="https://www.zhihu.com/column/c_1578062952615088129" target="_blank" rel="noopener noreferrer">3DTiles深度思考 - 知乎 (zhihu.com)</a>---总目录</li>
</ul>
<h2 id="_4-体积渲染" tabindex="-1"><a class="header-anchor" href="#_4-体积渲染" aria-hidden="true">#</a> 4.体积渲染</h2>
<p>体积渲染（Volume Rendering）是一种用于可视化三维数据的技术，它通过对数据的密度、颜色和透明度进行处理，将数据转换为图像或动画。与表面渲染不同，体积渲染不需要先将数据转换为表面网格，而是直接对数据进行处理，从而能够更全面地呈现数据的内部结构。</p>
<p>体积渲染的原理是基于光线追踪和体积光学的原理。在渲染过程中，光线从视点出发，经过数据中的每个点，并在每个点处计算出颜色、透明度等属性，最终形成一幅图像或动画。由于数据通常是非常大的，因此需要使用高性能计算机和专用的体积渲染软件来实现。</p>
<p>体积渲染在医学、科学、工程、地质和气象等领域都有广泛的应用，能够帮助人们更好地理解和分析数据，以便做出更好的决策。</p>
<ul>
<li>OBJ（Wavefront Object）： OBJ是一种简单的三维模型数据格式，主要用于表示三维几何形状。它是一种纯文本格式，易于阅读和编辑。OBJ文件通常包含顶点坐标、纹理坐标、法线和面信息。这种格式广泛应用于3D建模和动画软件，如Blender、3ds Max和Maya等。</li>
<li>STL（Stereolithography）： STL是一种常用于3D打印的文件格式。它表示三维模型的表面几何形状，通过一系列三角形面片来描述模型。STL文件可以是ASCII格式（纯文本）或二进制格式。由于其简单的结构和广泛的兼容性，STL已成为3D打印行业的标准文件格式。</li>
<li>FBX（Filmbox）： FBX是一种用于存储三维模型、动画和材质的文件格式。它支持多种3D软件，如Autodesk 3ds Max、Maya和Cinema 4D等。FBX文件可以包含复杂的场景信息，如骨骼动画、材质和纹理等。此外，FBX还支持二进制和ASCII两种格式。</li>
<li>PLY（Polygon File Format）： PLY是一种用于存储三维扫描数据的文件格式。它可以表示点云、面片和其他几何形状。PLY文件通常包含顶点坐标、颜色信息和面信息。这种格式主要用于计算机图形学和三维扫描领域，如点云处理和三维重建等。</li>
</ul>
<h2 id="_5-测绘领域中的4d产品" tabindex="-1"><a class="header-anchor" href="#_5-测绘领域中的4d产品" aria-hidden="true">#</a> 5.测绘领域中的4D产品</h2>
<ol>
<li><strong>DEM（数字高程模型-栅格）</strong>：DEM是一种数字地形模型，用于表示地表高度。它由点阵数据组成，每个点都有一个高度值。DEM可以用于地形分析、水文学、土地利用规划等领域。DEM数据可以从激光雷达、雷达高度计、卫星测高等多种方式得到。</li>
<li><strong>DOM（数字正射影像图-栅格）</strong>：DOM是一种数字影像产品，用于表示地表的真实颜色。它可以用高分辨率遥感影像数据生成，与DEM结合使用可以实现三维地形表面的可视化。DOM广泛应用于城市规划、农业、林业、环境监测等领域。</li>
<li><strong>DLG（数字线划图）</strong>：DLG是一种矢量产品，用于表示地物的线条、点和面等几何形状。它是通过数字化地图或者遥感影像等数据得到的。DLG数据可用于更新地图、制作专题图等应用，广泛应用于城市规划、交通规划、土地利用规划等领域。</li>
<li><strong>DRG（数字栅格图）</strong>：DRG是一种数字影像产品，用于表示地表的图像。它通常是由正射影像或者航空照片等数据生成的。DRG广泛应用于地图制作、军事规划、城市规划等领域。与DEM结合使用可以实现三维地形表面的可视化。</li>
</ol>
<h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h2>
<h2 id="_6-倾斜摄影三维建模软件" tabindex="-1"><a class="header-anchor" href="#_6-倾斜摄影三维建模软件" aria-hidden="true">#</a> 6.倾斜摄影三维建模软件</h2>
<h3 id="_1-contextcapture-smart3d" tabindex="-1"><a class="header-anchor" href="#_1-contextcapture-smart3d" aria-hidden="true">#</a> [1]ContextCapture（Smart3D）</h3>
<p>它原是摄影测量软件开发商 Acute3D 的主打产品，后来 Acute3D 被 Bentley 公司（没错，就是和汽车品牌宾利一个名字，但不是同一家公司）收购，更名为 ContextCapture。</p>
<p>它可以通过使用不同的图像和激光扫描数据，创建高精度的三维模型。ContextCapture软件可以将从无人机、航空或地面扫描仪中获取的图像和激光扫描数据进行处理，从而生成高度准确的模型。</p>
<p>ContextCapture具有多种功能和特点，包括：</p>
<ol>
<li><strong>处理大型数据集</strong>：ContextCapture可以处理大型数据集，包括大量的图像和激光扫描数据，以生成高精度的3D模型。</li>
<li><strong>自动化处理</strong>：ContextCapture可以自动化处理图像和激光扫描数据，从而减少人工干预和提高工作效率。</li>
<li><strong>多种导出格式</strong>：ContextCapture可以导出多种格式的3D模型，包括<code>OSGB</code>、<code>OBJ</code>、<code>FBX</code>、<code>COLLADA</code>和<code>STL</code>等，以便在其他软件中使用。</li>
<li><strong>高精度模型</strong>：ContextCapture可以生成高度准确的三维模型，这对于需要进行精确测量和分析的应用非常有用。</li>
<li><strong>应用广泛</strong>：ContextCapture可以应用于多种领域，包括建筑、土木工程、地质勘探、城市规划和文化遗产保护等。</li>
</ol>
<h3 id="_2-pix4dmapper" tabindex="-1"><a class="header-anchor" href="#_2-pix4dmapper" aria-hidden="true">#</a> [2]Pix4Dmapper</h3>
<p>Pix4Dmapper是一款由瑞士公司Pix4D开发的专业无人机影像处理软件，是一款专门用做测绘的软件，从数据采集（pix4Dcapture）到DOM、DSM及三维模型生产都有涉及。但是三维效果相对于samrt3D来说还是有些差距，但DOM正射影像生成更胜一筹。它可以将无人机采集的航拍图像、激光雷达数据和其他传感器数据转换为高精度的3D模型和地图。该软件的主要功能包括图像处理、点云生成和三维建模等。</p>
<p>Pix4Dmapper的主要特点和优势包括：</p>
<ol>
<li>高精度：Pix4Dmapper可以通过使用多个图像和传感器数据，生成高精度的3D模型和地图，精度可以达到亚厘米级别。</li>
<li>自动化：Pix4Dmapper可以自动处理数据，减少人工干预，提高工作效率。</li>
<li>多种导出格式：Pix4Dmapper可以将生成的3D模型和地图导出为多种格式，包括OBJ、FBX、PLY、LAS和GeoTIFF等。</li>
<li>应用广泛：Pix4Dmapper可以应用于建筑、土木工程、地质勘探、农业和环境保护等多个领域。</li>
<li>支持多种传感器：Pix4Dmapper可以处理多种传感器数据，例如RGB相机、热像仪、激光雷达和GPS等。</li>
</ol>
<h3 id="_3-photoscanz" tabindex="-1"><a class="header-anchor" href="#_3-photoscanz" aria-hidden="true">#</a> [3]PhotoScanz</h3>
<p>PhotoScan是由Agisoft LLC研发生产，是一款全自动生产三维模型的建模软件。我用这款软件较少，处理过少量的数据，把结果分项给大家，效果一目了然。这款软件操作简单，无特殊和难理解的参数需要设置，但是对于数据处理的容错率较低，易报错</p>
<h3 id="-1" tabindex="-1"><a class="header-anchor" href="#-1" aria-hidden="true">#</a> </h3>
<h2 id="_7-常见的三维建模软件" tabindex="-1"><a class="header-anchor" href="#_7-常见的三维建模软件" aria-hidden="true">#</a> 7.常见的三维建模软件</h2>
<ol>
<li>3ds Max：由Autodesk公司开发的三维计算机图形软件，可用于建筑、工程、建设、影视、游戏和广告等领域的三维设计和建模。</li>
<li>Maya：由Autodesk公司开发的三维计算机图形软件，可用于影视、游戏、动画、建筑、工程等领域的三维设计和建模。</li>
<li>Blender：一种开源的三维计算机图形软件，可用于建筑、工程、影视、游戏等领域的三维设计和建模。Blender具有丰富的功能和工具，包括建模、动画、渲染、剪辑等。</li>
<li>SketchUp：由Trimble公司开发的三维建模软件，主要用于建筑和室内设计等领域。SketchUp具有简单易用的用户界面，可用于快速建模和可视化设计。</li>
<li>SolidWorks：由Dassault Systèmes公司开发的三维计算机辅助设计软件，主要用于工程设计和制造。SolidWorks具有丰富的工具和功能，可用于创建机械、电子、建筑等方面的三维模型和装配体。</li>
<li>Rhino：由McNeel公司开发的三维建模软件，主要用于工业设计、建筑设计、珠宝设计等领域。Rhino具有强大的建模工具和灵活的曲面建模功能，可用于创建高质量的三维模型和曲面。</li>
</ol>
</template>
