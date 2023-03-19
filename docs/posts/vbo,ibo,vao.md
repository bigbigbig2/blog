---
layout: Post
title:  vbo,ibo,vao
date: 2023-02-18
subtitle: webgl(vbo,ibo,vao)
useHeaderImage: true
headerImage: /img/in-post/2023-3/2.png
tags:
  - WebGL
---

[[toc]]

### 1.VBO顶点缓冲区对象

一个顶点缓冲区对象如果存储顶点位置坐标、顶点法向量、顶点颜色信息，则需要使用三个VBO(vertex buffer object顶点缓冲区对象)，VBO就是一个缓冲区，用于存储顶点的有关信息.

顶点属性以VBO 的形式传递给顶点着色器，VBO负责将数据传递给顶点着色器中的attribute变量（首先将顶点数据存储在VBO中。然后它告诉着色器哪些 VBO 与哪些`attribute`变量相关联，以便顶点着色器可以正确处理顶点）

#### 创建VBO函数

```js
//传入一个数组来创建VBO
function create_vbo(data){
    // 生成缓冲区对象
    var vbo = gl.createBuffer();
    // 绑定缓冲区（指定该缓冲区对象中要存储的数据类型）
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    //将输出存入该缓冲区
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    // 因为可以绑定到webgl中的缓冲区只有一个，这里设置为null为了确保使之前绑定的缓冲区无效
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return vbo;
}
```

#### VBO使用

```js
// 将VBO绑定到当前webgl上下文
gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
//激活/启用attribute属性（attribute变量地址[js变量]）
gl.enableVertexAttribArray(attLocation);
//将缓冲区中的数据赋值给上面指定的attribute变量（着色器中）
gl.vertexAttribPointer(attLocation, attStride, gl.FLOAT, false, 0, 0);
```

> 注意：在执行gl.vertexAttribPointer()，一定要先检查那个VBO与那个attribute关联起来很重要，所以不要忘记事先将 VBO 绑定到 WebGL（bindBuffer）

### 2.IBO索引缓冲对象

使用索引缓冲区时，数据直接分配到GPU上的内存区域。不是每次绘制都把数据传给GPU，GPU从内存空间拉取数据，所以这样比每次都传数据要快很多。

#### 创建IBO函数

```js
function create_ibo(data){
    //创建一个空的缓冲区对象
    var ibo = gl.createBuffer();
    //通过参数gl.ELEMENT_ARRAY_BUFFER将该缓冲区对象指定为IBO
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    // 将索引数据分配给缓冲区
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    return ibo;
}
```

#### 使用IBO

```JS
//将IBO绑定到当前webgl上下文
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
//绑定后便可以使用ibo绘制图形了
gl.drawElements(gl.TRIANGLES, index.length, gl.UNSIGNED_SHORT, 0);
```

### 3.顶点数组对象VAO

VAO是**封装和包装顶点信息的对象**是。VAO 使得更简洁地描述复杂和令人困惑的顶点缓冲区处理成为可能。

VAO简化了复杂顶点信息的管理。也就是说，VAO 本身并不能替代 VBO。一旦设置，VAO 就会存储有关顶点的信息

即使使用了VAO(VAO 只是它只是包装了 VBO 和 IBO)，初始化VBO和IBO等处理应该基本相同。

```JS
function create_vao(vboDataArray, attL, attS, iboData){
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

```

#### 使用vao

```js
var sphereData = sphere(16, 16, 0.75); // 生成顶点数据函数
var sphereVAO = create_vao(
    [sphereData.p, sphereData.n, sphereData.t], //顶点的位置数据，法向量数据，纹理数据
    attLocation, //顶点的位置数据，法向量数据，纹理数据的地址变量
    attStride,  
    sphereData.i //顶点的索引数据
);
```

> 在自定义函数的开头和结尾只有绑定和解绑VAO的过程，其他的步骤其实都是饿创建VBO一样的。