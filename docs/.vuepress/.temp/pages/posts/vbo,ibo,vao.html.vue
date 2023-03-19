<template><nav class="table-of-contents"><ul><li><RouterLink to="#_1-vbo顶点缓冲区对象">1.VBO顶点缓冲区对象</RouterLink><ul><li><RouterLink to="#创建vbo函数">创建VBO函数</RouterLink></li><li><RouterLink to="#vbo使用">VBO使用</RouterLink></li></ul></li><li><RouterLink to="#_2-ibo索引缓冲对象">2.IBO索引缓冲对象</RouterLink><ul><li><RouterLink to="#创建ibo函数">创建IBO函数</RouterLink></li><li><RouterLink to="#使用ibo">使用IBO</RouterLink></li></ul></li><li><RouterLink to="#_3-顶点数组对象vao">3.顶点数组对象VAO</RouterLink><ul><li><RouterLink to="#使用vao">使用vao</RouterLink></li></ul></li></ul></nav>
<h3 id="_1-vbo顶点缓冲区对象" tabindex="-1"><a class="header-anchor" href="#_1-vbo顶点缓冲区对象" aria-hidden="true">#</a> 1.VBO顶点缓冲区对象</h3>
<p>一个顶点缓冲区对象如果存储顶点位置坐标、顶点法向量、顶点颜色信息，则需要使用三个VBO(vertex buffer object顶点缓冲区对象)，VBO就是一个缓冲区，用于存储顶点的有关信息.</p>
<p>顶点属性以VBO 的形式传递给顶点着色器，VBO负责将数据传递给顶点着色器中的attribute变量（首先将顶点数据存储在VBO中。然后它告诉着色器哪些 VBO 与哪些<code>attribute</code>变量相关联，以便顶点着色器可以正确处理顶点）</p>
<h4 id="创建vbo函数" tabindex="-1"><a class="header-anchor" href="#创建vbo函数" aria-hidden="true">#</a> 创建VBO函数</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//传入一个数组来创建VBO</span>
<span class="token keyword">function</span> <span class="token function">create_vbo</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// 生成缓冲区对象</span>
    <span class="token keyword">var</span> vbo <span class="token operator">=</span> gl<span class="token punctuation">.</span><span class="token function">createBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 绑定缓冲区（指定该缓冲区对象中要存储的数据类型）</span>
    gl<span class="token punctuation">.</span><span class="token function">bindBuffer</span><span class="token punctuation">(</span>gl<span class="token punctuation">.</span><span class="token constant">ARRAY_BUFFER</span><span class="token punctuation">,</span> vbo<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//将输出存入该缓冲区</span>
    gl<span class="token punctuation">.</span><span class="token function">bufferData</span><span class="token punctuation">(</span>gl<span class="token punctuation">.</span><span class="token constant">ARRAY_BUFFER</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Float32Array</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">,</span> gl<span class="token punctuation">.</span><span class="token constant">STATIC_DRAW</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 因为可以绑定到webgl中的缓冲区只有一个，这里设置为null为了确保使之前绑定的缓冲区无效</span>
    gl<span class="token punctuation">.</span><span class="token function">bindBuffer</span><span class="token punctuation">(</span>gl<span class="token punctuation">.</span><span class="token constant">ARRAY_BUFFER</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> vbo<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h4 id="vbo使用" tabindex="-1"><a class="header-anchor" href="#vbo使用" aria-hidden="true">#</a> VBO使用</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 将VBO绑定到当前webgl上下文</span>
gl<span class="token punctuation">.</span><span class="token function">bindBuffer</span><span class="token punctuation">(</span>gl<span class="token punctuation">.</span><span class="token constant">ARRAY_BUFFER</span><span class="token punctuation">,</span> vbo<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//激活/启用attribute属性（attribute变量地址[js变量]）</span>
gl<span class="token punctuation">.</span><span class="token function">enableVertexAttribArray</span><span class="token punctuation">(</span>attLocation<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//将缓冲区中的数据赋值给上面指定的attribute变量（着色器中）</span>
gl<span class="token punctuation">.</span><span class="token function">vertexAttribPointer</span><span class="token punctuation">(</span>attLocation<span class="token punctuation">,</span> attStride<span class="token punctuation">,</span> gl<span class="token punctuation">.</span><span class="token constant">FLOAT</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><blockquote>
<p>注意：在执行gl.vertexAttribPointer()，一定要先检查那个VBO与那个attribute关联起来很重要，所以不要忘记事先将 VBO 绑定到 WebGL（bindBuffer）</p>
</blockquote>
<h3 id="_2-ibo索引缓冲对象" tabindex="-1"><a class="header-anchor" href="#_2-ibo索引缓冲对象" aria-hidden="true">#</a> 2.IBO索引缓冲对象</h3>
<p>使用索引缓冲区时，数据直接分配到GPU上的内存区域。不是每次绘制都把数据传给GPU，GPU从内存空间拉取数据，所以这样比每次都传数据要快很多。</p>
<h4 id="创建ibo函数" tabindex="-1"><a class="header-anchor" href="#创建ibo函数" aria-hidden="true">#</a> 创建IBO函数</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">create_ibo</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//创建一个空的缓冲区对象</span>
    <span class="token keyword">var</span> ibo <span class="token operator">=</span> gl<span class="token punctuation">.</span><span class="token function">createBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//通过参数gl.ELEMENT_ARRAY_BUFFER将该缓冲区对象指定为IBO</span>
    gl<span class="token punctuation">.</span><span class="token function">bindBuffer</span><span class="token punctuation">(</span>gl<span class="token punctuation">.</span><span class="token constant">ELEMENT_ARRAY_BUFFER</span><span class="token punctuation">,</span> ibo<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 将索引数据分配给缓冲区</span>
    gl<span class="token punctuation">.</span><span class="token function">bufferData</span><span class="token punctuation">(</span>gl<span class="token punctuation">.</span><span class="token constant">ELEMENT_ARRAY_BUFFER</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Int16Array</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">,</span> gl<span class="token punctuation">.</span><span class="token constant">STATIC_DRAW</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    gl<span class="token punctuation">.</span><span class="token function">bindBuffer</span><span class="token punctuation">(</span>gl<span class="token punctuation">.</span><span class="token constant">ELEMENT_ARRAY_BUFFER</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> ibo<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h4 id="使用ibo" tabindex="-1"><a class="header-anchor" href="#使用ibo" aria-hidden="true">#</a> 使用IBO</h4>
<div class="language-JS ext-JS line-numbers-mode"><pre v-pre class="language-JS"><code>//将IBO绑定到当前webgl上下文
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
//绑定后便可以使用ibo绘制图形了
gl.drawElements(gl.TRIANGLES, index.length, gl.UNSIGNED_SHORT, 0);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="_3-顶点数组对象vao" tabindex="-1"><a class="header-anchor" href="#_3-顶点数组对象vao" aria-hidden="true">#</a> 3.顶点数组对象VAO</h3>
<p>VAO是<strong>封装和包装顶点信息的对象</strong>是。VAO 使得更简洁地描述复杂和令人困惑的顶点缓冲区处理成为可能。</p>
<p>VAO简化了复杂顶点信息的管理。也就是说，VAO 本身并不能替代 VBO。一旦设置，VAO 就会存储有关顶点的信息</p>
<p>即使使用了VAO(VAO 只是它只是包装了 VBO 和 IBO)，初始化VBO和IBO等处理应该基本相同。</p>
<div class="language-JS ext-JS line-numbers-mode"><pre v-pre class="language-JS"><code>function create_vao(vboDataArray, attL, attS, iboData){
    var vao, vbo, ibo, i;
    vao = gl.createVertexArray(); //创建VAO
    gl.bindVertexArray(vao);//绑定VAO
    for(i in vboDataArray){//创建VBO
        vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vboDataArray[i]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(attL[i]);
        gl.vertexAttribPointer(attL[i], attS[i], gl.FLOAT, false, 0, 0);
    }
    if(iboData){//创建IBO
        ibo = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(iboData), gl.STATIC_DRAW);
    }
    gl.bindVertexArray(null);
    return vao;
}

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h4 id="使用vao" tabindex="-1"><a class="header-anchor" href="#使用vao" aria-hidden="true">#</a> 使用vao</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> sphereData <span class="token operator">=</span> <span class="token function">sphere</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">0.75</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 生成顶点数据函数</span>
<span class="token keyword">var</span> sphereVAO <span class="token operator">=</span> <span class="token function">create_vao</span><span class="token punctuation">(</span>
    <span class="token punctuation">[</span>sphereData<span class="token punctuation">.</span>p<span class="token punctuation">,</span> sphereData<span class="token punctuation">.</span>n<span class="token punctuation">,</span> sphereData<span class="token punctuation">.</span>t<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">//顶点的位置数据，法向量数据，纹理数据</span>
    attLocation<span class="token punctuation">,</span> <span class="token comment">//顶点的位置数据，法向量数据，纹理数据的地址变量</span>
    attStride<span class="token punctuation">,</span>  
    sphereData<span class="token punctuation">.</span>i <span class="token comment">//顶点的索引数据</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><blockquote>
<p>在自定义函数的开头和结尾只有绑定和解绑VAO的过程，其他的步骤其实都是饿创建VBO一样的。</p>
</blockquote>
</template>
