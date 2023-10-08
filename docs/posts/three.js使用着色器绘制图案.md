---
layout: Post
title:  three.js使用着色器绘制图案
date: 2023-07-29
useHeaderImage: true
headerImage: https://img-blog.csdnimg.cn/img_convert/27459f3f0c1a53b3256605f2cf65f4ad.png#averageHue=#000000&clientId=u70fe2cb5-7c40-4&from=paste&height=468&id=u12c1f137&originHeight=585&originWidth=1390&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=74595&status=done&style=none&taskId=u06ca9091-6ffc-492d-99e8-b559e6fbc22&title=&width=1112
tags:
  - three.js
---

[[toc]]

除了通过加载纹理来给材质添加一些图案，我们还可以通过shader添加，这种方式添加更灵活，性能也更好些

> 此篇的作用主要是提供一些设色器图案素材

## [1]uv坐标的玩法

因为uv坐标的特性（左下角为`0,0`，右上角为`1,1`），可以借助其和一些二GLSL内置函数实现很多有意思的图案
首先如果要所以uv坐标可以直接在顶点着色器中获取到，然后传递给片段着色器：
然后就可以玩玩了
![image.png](https://img-blog.csdnimg.cn/img_convert/086bd126c40928b9cf9dc92d2652d454.png#averageHue=#b49366&clientId=u70fe2cb5-7c40-4&from=paste&height=388&id=u9981e233&originHeight=604&originWidth=1280&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=46833&status=done&style=none&taskId=u2edecfdf-69ce-4565-94c1-c5d2bccee17&title=&width=821.6000366210938)
![image.png](https://img-blog.csdnimg.cn/img_convert/8337ae822da5202ca17e4059353b150a.png#averageHue=#171717&clientId=u70fe2cb5-7c40-4&from=paste&height=388&id=ub50f387d&originHeight=608&originWidth=1281&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=23004&status=done&style=none&taskId=u218d287c-f7fe-4882-9c3d-a6cd9136f99&title=&width=816.6000366210938)
![image.png](https://img-blog.csdnimg.cn/img_convert/78d8a1301d87b25b1460c793a027c441.png#averageHue=#2f2f2f&clientId=u70fe2cb5-7c40-4&from=paste&height=387&id=u367a0032&originHeight=604&originWidth=1279&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=29735&status=done&style=none&taskId=ua793d411-25dc-4264-98ce-31d7237d83a&title=&width=819.6000366210938)

## [2]内置函数图案

### mod

![image.png](https://img-blog.csdnimg.cn/img_convert/fe1034016efef4e3a1c8db26b78f7f11.png#averageHue=#181818&clientId=u70fe2cb5-7c40-4&from=paste&height=286&id=ubde8651f&originHeight=585&originWidth=1380&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=44424&status=done&style=none&taskId=u15d8f464-60be-4195-8ac4-b12a4cd3b09&title=&width=675)

### step

阀门函数
![image.png](https://img-blog.csdnimg.cn/img_convert/b7fb8deaf6f6bdf81154a41f9a7071ef.png#averageHue=#0a0a0a&clientId=u70fe2cb5-7c40-4&from=paste&height=468&id=u52b0be36&originHeight=585&originWidth=1380&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=32519&status=done&style=none&taskId=u58bccbc2-e597-4edc-a4b1-d760cf55646&title=&width=1104)
**网格状：**（添加一个方向即可，使用加法）
![image.png](https://img-blog.csdnimg.cn/img_convert/20b49293023d68e840481c24d347178d.png#averageHue=#111111&clientId=u70fe2cb5-7c40-4&from=paste&height=468&id=ua206c669&originHeight=585&originWidth=1380&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=39307&status=done&style=none&taskId=ud35aff05-4bb5-49aa-8e4a-e2e47aa69e8&title=&width=1104)
**点状：**那是不是可以使用乘法试试：（原理也好理解，取了交叉点）
![image.png](https://img-blog.csdnimg.cn/img_convert/ed69ea0e7580afebcba7fc78e1aa38de.png#averageHue=#030303&clientId=u70fe2cb5-7c40-4&from=paste&height=468&id=uf19267f6&originHeight=585&originWidth=1380&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=27847&status=done&style=none&taskId=u7afec665-b13f-4a82-b89f-d043c3fbe32&title=&width=1104)
**台阶状：**（调整了x方向的阈值）
![image.png](https://img-blog.csdnimg.cn/img_convert/3d871550e25f4e6a4d4ac084bb12e97d.png#averageHue=#060606&clientId=u70fe2cb5-7c40-4&from=paste&height=468&id=u31ecf4ef&originHeight=585&originWidth=1380&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=39512&status=done&style=none&taskId=u27e3f7ef-afe9-4a4a-b352-1c718b99e5c&title=&width=1104)
在上面的代码基础上,继续延伸（其实就是在前面就基础上加了同样的东西）

```glsl
varying vec2 vUv;
void main(){
  float strength = step(0.4, mod(vUv.x * 10.0, 1.0));
  strength *= step(0.8, mod(vUv.y * 10.0, 1.0));
  strength += step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.4, mod(vUv.y * 10.0, 1.0));
  gl_FragColor = vec4(vec3(strength), 1.0);
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/4bed381d6249dcc9d9da29ae7a259a9a.png#averageHue=#080808&clientId=u70fe2cb5-7c40-4&from=paste&height=468&id=u704a8f7d&originHeight=585&originWidth=1380&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=10473&status=done&style=none&taskId=u87bf3926-670e-4584-847b-fbcd067b7d1&title=&width=1104)
当延伸的代码越来越多时，需要适当的重构代码，使代码结构清晰：

```glsl
varying vec2 vUv;
void main(){
  float barX = step(0.4, mod(vUv.x * 10.0 - 0.2, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
  float barY = step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.4, mod(vUv.y * 10.0 - 0.2, 1.0));
  float strength = barX + barY;
  gl_FragColor = vec4(vec3(strength), 1.0);
}
```

**添加偏移量：**
给上面的图案添加偏移量来使原图案发生变化

```glsl
varying vec2 vUv;
void main(){
  float barX = step(0.4, mod(vUv.x * 10.0 - 0.2, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
  float barY = step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.4, mod(vUv.y * 10.0 - 0.2, 1.0));
  float strength = barX + barY;
  gl_FragColor = vec4(vec3(strength), 1.0);
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/9d2d8ca8b1c321e1160519fd8adcc3c7.png#averageHue=#090909&clientId=u70fe2cb5-7c40-4&from=paste&height=468&id=ub54fdef7&originHeight=585&originWidth=1380&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=9047&status=done&style=none&taskId=u8229c9f7-f1c4-4f41-9b73-de1b72c9ca2&title=&width=1104)

### abs

绝对值函数也好理解
![image.png](https://img-blog.csdnimg.cn/img_convert/6446ea7fda13a2551953953f0014101e.png#averageHue=#100e0c&clientId=u70fe2cb5-7c40-4&from=paste&height=468&id=udc41e9ea&originHeight=585&originWidth=1380&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=42100&status=done&style=none&taskId=u8d9d6204-208a-4740-b01a-1dd19249dc4&title=&width=1104)
加上y方向：
![image.png](https://img-blog.csdnimg.cn/img_convert/d14f97fc6ac6a00196d081b3b954426e.png#averageHue=#080808&clientId=u70fe2cb5-7c40-4&from=paste&height=468&id=u2b906f0d&originHeight=585&originWidth=1380&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=30381&status=done&style=none&taskId=uc1cb0787-1b91-435e-98be-769fb3e8ff3&title=&width=1104)

### floor

向下取整

```glsl
varying vec2 vUv;
void main(){
  float strength = floor(vUv.x * 10.0) / 10.0;
  gl_FragColor = vec4(vec3(strength), 1.0);
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/91fe91da853f2d9490c538fe18788e04.png#averageHue=#131313&clientId=u70fe2cb5-7c40-4&from=paste&height=468&id=ubc878f95&originHeight=585&originWidth=1380&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=9338&status=done&style=none&taskId=u053cc111-4ddc-4389-933b-ec0d0dc9b3b&title=&width=1104)
还可以扩展为x、y轴

```glsl
varying vec2 vUv;
void main(){
  float strength = floor(vUv.x * 10.0) / 10.0 * floor(vUv.y * 10.0) / 10.0;
  gl_FragColor = vec4(vec3(strength), 1.0);
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/7732225d8b9787a933c860ca616a458d.png#averageHue=#090909&clientId=u70fe2cb5-7c40-4&from=paste&height=482&id=u49c7d36f&originHeight=603&originWidth=1369&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=10525&status=done&style=none&taskId=u33e07e03-9233-41e1-9b06-80a4b11f9a8&title=&width=1095.2)

### distance

```glsl
varying vec2 vUv;
void main(){
  float strength = distance(vUv, vec2(0.5));
  gl_FragColor = vec4(vec3(strength), 1.0);
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/fa369f767d4b4b0fb2dad99be4b50cf5.png#averageHue=#111111&clientId=u70fe2cb5-7c40-4&from=paste&height=486&id=uaee70eea&originHeight=608&originWidth=1378&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=34250&status=done&style=none&taskId=u0910e444-e3d1-487a-bbe3-3322aeec8ba&title=&width=1102.4)
反转一下

```glsl
varying vec2 vUv;
void main(){
  float strength = 1.0 - distance(vUv, vec2(0.5));
  gl_FragColor = vec4(vec3(strength), 1.0);
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/e0ac4421d84fbb49193eeb75324227a3.png#averageHue=#1b1b1a&clientId=u70fe2cb5-7c40-4&from=paste&height=484&id=uab162afa&originHeight=605&originWidth=1366&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=34277&status=done&style=none&taskId=ucab2c87d-1962-4f6c-b515-76c9da4c185&title=&width=1092.8)
还可以使用该函数创建镜头光效果：

```glsl
varying vec2 vUv;
void main(){
  float strength = 0.015 / (distance(vUv, vec2(0.5)));
  gl_FragColor = vec4(vec3(strength), 1.0);
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/522612fde4015b1f5eca98d7b45af5ab.png#averageHue=#020202&clientId=u70fe2cb5-7c40-4&from=paste&height=480&id=u1955dd46&originHeight=600&originWidth=1374&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=21610&status=done&style=none&taskId=ua88888e7-f64e-4dea-9c03-60028d500c3&title=&width=1099.2)
在x轴上拉伸：

```glsl
varying vec2 vUv;
void main(){
  float strength = 0.15 / (distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
  gl_FragColor = vec4(vec3(strength), 1.0);
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/a83445aceb9eb3bc6009329bd46426cf.png#averageHue=#0a0a0a&clientId=u70fe2cb5-7c40-4&from=paste&height=489&id=uee8c7958&originHeight=611&originWidth=1376&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=24671&status=done&style=none&taskId=u01511aae-fb87-4c70-89a3-5316b164c80&title=&width=1100.8)
扩展到x、y（这不就是可以拿来实现粒子模型那个纹理贴图了）：

```glsl
varying vec2 vUv;
void main(){
  float strength = 0.15 / (distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
  strength *= 0.15 / (distance(vec2(vUv.y, (vUv.x - 0.5) * 5.0 + 0.5), vec2(0.5)));
  gl_FragColor = vec4(vec3(strength), 1.0);
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/af765a885d75ef074ae6f85364267bbe.png#averageHue=#020202&clientId=u70fe2cb5-7c40-4&from=paste&height=458&id=udc6a13be&originHeight=572&originWidth=1374&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=26433&status=done&style=none&taskId=ud8220f4f-b577-40ba-a2b9-c1d0db5dea5&title=&width=1099.2)

### atan

```glsl
varying vec2 vUv;

void main(){
    float angle = atan(vUv.x, vUv.y);
    float strength = angle;
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/10edfc7fe48c148d84fb372deef8aa75.png#averageHue=#212121&clientId=u70fe2cb5-7c40-4&from=paste&height=489&id=uf6468220&originHeight=611&originWidth=1368&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=25513&status=done&style=none&taskId=u430abde3-c6ad-4aca-9b34-4fdd1909aac&title=&width=1094.4)
上面的效果没上面意思，主要是基于这个扩展：

```glsl
#define PI 3.1415926535897932384626433832795
varying vec2 vUv;

void main(){
   float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    angle /= PI * 2.0;
    angle += 0.5;
    float strength = angle;
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/13c84eb78a95aa9d4e7af5f819152378.png#averageHue=#191919&clientId=u70fe2cb5-7c40-4&from=paste&height=486&id=u2a5657d3&originHeight=607&originWidth=1374&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=31009&status=done&style=none&taskId=uc80e2b12-6b97-4d82-b7de-7f62249ba3a&title=&width=1099.2)
取mod

```glsl
#define PI 3.1415926535897932384626433832795
varying vec2 vUv;

void main(){
   float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
    float strength = mod(angle * 20.0, 1.0);
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/51d428ed457865c7c916b2dcf274f271.png#averageHue=#161616&clientId=u70fe2cb5-7c40-4&from=paste&height=488&id=u86759746&originHeight=610&originWidth=1375&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=64063&status=done&style=none&taskId=u0cfd14a1-9ee7-449f-b8d3-4b7d6486878&title=&width=1100)
该用sin

```glsl
#define PI 3.1415926535897932384626433832795
varying vec2 vUv;

void main(){
   float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
    float strength = sin(angle * 100.0);
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/9f03d3b48f3c2a9af04f1e75bb5ac8eb.png#averageHue=#0e0e0e&clientId=u70fe2cb5-7c40-4&from=paste&height=486&id=u11c508b1&originHeight=607&originWidth=1368&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=78279&status=done&style=none&taskId=uc8890242-2884-45c7-8e52-fe3e6e94e78&title=&width=1094.4)
波浪：

```glsl
#define PI 3.1415926535897932384626433832795
varying vec2 vUv;

void main(){
   float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
    float radius = 0.25 + sin(angle * 100.0) * 0.02;
    float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - radius));
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/f5aeae656c966e52b4184ec63d8845f0.png#averageHue=#020202&clientId=u70fe2cb5-7c40-4&from=paste&height=490&id=u765d5680&originHeight=613&originWidth=1370&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=9178&status=done&style=none&taskId=ud3cbca93-aa69-4988-92b7-f79d2153aa1&title=&width=1096)

## [3]旋转uv

下面通过实现一个旋转uv坐标的函数来实现对图形的旋转：

```glsl
#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

vec2 rotate(vec2 uv, float rotation, vec2 mid){
    return vec2(
        cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
        cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );

}
void main(){
    vec2 rotatedUv = rotate(vUv, PI * 0.25, vec2(0.5));//旋转1/8圈
    float strength = 0.15 / (distance(vec2(rotatedUv.x, (rotatedUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
    strength *= 0.15 / (distance(vec2(rotatedUv.y, (rotatedUv.x - 0.5) * 5.0 + 0.5), vec2(0.5)));
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

> uv：要旋转的uv
> rotation：旋转的角度
> mid：旋转中心

![image.png](https://img-blog.csdnimg.cn/img_convert/bda41d93976336e24b77a5d7343688b3.png#averageHue=#020202&clientId=u70fe2cb5-7c40-4&from=paste&height=474&id=uc4e3c400&originHeight=593&originWidth=1378&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=21703&status=done&style=none&taskId=ua342ce60-4d21-40e9-9e08-28cf31f125f&title=&width=1102.4)

## [4]绘制圆

```glsl
varying vec2 vUv;

void main(){
    float strength = step(0.5, distance(vUv, vec2(0.5)) + 0.25);
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/d38bb2ad9180efcfe03c4115e977dbe0.png#averageHue=#444444&clientId=u70fe2cb5-7c40-4&from=paste&height=476&id=u895e611d&originHeight=595&originWidth=1381&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=9123&status=done&style=none&taskId=u06513abd-2297-4f84-bfbb-defbfb58f5a&title=&width=1104.8)

```glsl
varying vec2 vUv;

void main(){
    float strength = abs(distance(vUv, vec2(0.5)) - 0.25);
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/08f7e8b776161680b81ecba5a13de187.png#averageHue=#070707&clientId=u70fe2cb5-7c40-4&from=paste&height=485&id=u41beed2a&originHeight=606&originWidth=1371&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=34973&status=done&style=none&taskId=u571fd1f2-0ebe-4f12-80da-f1dd5061500&title=&width=1096.8)

```glsl
varying vec2 vUv;

void main(){
    float strength = step(0.02, abs(distance(vUv, vec2(0.5)) - 0.25));
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/d10e41f2eb4a054db8f14ffa08ba6717.png#averageHue=#282828&clientId=u70fe2cb5-7c40-4&from=paste&height=490&id=ue9cedeff&originHeight=612&originWidth=1373&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=9354&status=done&style=none&taskId=ueeea81d7-24e6-4480-b60d-ac9755ead0a&title=&width=1098.4)

## [5]改变uv

这里通过改变uv坐标将原先规则的圆形

```glsl
varying vec2 vUv;

void main(){
    vec2 wavedUv = vec2(
        vUv.x,
        vUv.y + sin(vUv.x * 30.0) * 0.1
    );
    float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/8bf48e3ac80b30ab6a76976881c75ef3.png#averageHue=#010101&clientId=u70fe2cb5-7c40-4&from=paste&height=486&id=udc1cfe46&originHeight=608&originWidth=1377&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=9462&status=done&style=none&taskId=u4867e93b-a7bc-4de3-8939-02e9822b242&title=&width=1101.6)
这样就可以在此基础上扩展添加一些有意思的东西了：

```glsl
varying vec2 vUv;

void main(){
    //x、y都扭一下啊
    vec2 wavedUv = vec2(
        vUv.x + sin(vUv.y * 30.0) * 0.1,
        vUv.y + sin(vUv.x * 30.0) * 0.1
    );
    float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/9ec2141de79c40bb47d86546e623e6b2.png#averageHue=#010101&clientId=u70fe2cb5-7c40-4&from=paste&height=477&id=ueec93112&originHeight=596&originWidth=1368&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=9818&status=done&style=none&taskId=u990cecb9-f612-4df2-89ed-f9b12eb5270&title=&width=1094.4)
在扩展，添加以下sin的频率：

```glsl
varying vec2 vUv;

void main(){
    //x、y都扭一下啊
    vec2 wavedUv = vec2(
        vUv.x + sin(vUv.y * 100.0) * 0.1,
        vUv.y + sin(vUv.x * 100.0) * 0.1
    );
    float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/2c417c9b84192eba930913ff5518e404.png#averageHue=#030303&clientId=u70fe2cb5-7c40-4&from=paste&height=485&id=u1c4a2f46&originHeight=606&originWidth=1372&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=15383&status=done&style=none&taskId=u7eb92f87-230d-4ee8-8a4b-ae803e97f5b&title=&width=1097.6)

## [6]噪声

噪音有助于模拟云、水、火、地形海拔等自然现象，还也可用于模拟风中移动的草或雪制作动画。
[https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83](https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83)
上面是一些经典且常见的柏林噪声实现，不过有些代码可能需要做一些修改才能实现。
例如下面一个经典的2D噪声效果

```glsl
#define PI 3.1415926535897932384626433832795
varying vec2 vUv;
//  Classic Perlin 2D Noise 
//  by Stefan Gustavson
//

vec4 permute(vec4 x){
    return mod(((x*34.0)+1.0)*x, 289.0);
}
vec2 fade(vec2 t){
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec2 P){
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}

void main(){
   float strength = cnoise(vUv * 10.0);
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/8195e0a290cf9206ee78f36a8ed83807.png#averageHue=#060606&clientId=u70fe2cb5-7c40-4&from=paste&height=468&id=ub0621c2f&originHeight=585&originWidth=1390&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=58561&status=done&style=none&taskId=u20870121-6c01-4817-8416-259fc8f188e&title=&width=1112)
改一下：

```glsl
void main(){
   float strength = step(0.0, cnoise(vUv * 10.0));
    gl_FragColor = vec4(vec3(strength), 1.0);
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/a00c8d0663cb0a9c5120929cdddff6b1.png#averageHue=#1e1e1e&clientId=u70fe2cb5-7c40-4&from=paste&height=468&id=u6dae9ec3&originHeight=585&originWidth=1390&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=16141&status=done&style=none&taskId=u95558069-7e91-4e04-9c28-838e2d1573c&title=&width=1112)

> 这不就实现了一个奶牛的纹理

```glsl
float strength = 1.0 - abs(cnoise(vUv * 10.0));
```

![image.png](https://img-blog.csdnimg.cn/img_convert/771f44affd9bbec668e07c2483010e4e.png#averageHue=#323232&clientId=u70fe2cb5-7c40-4&from=paste&height=468&id=u7589c8ef&originHeight=585&originWidth=1390&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=127846&status=done&style=none&taskId=u9b9f126e-739a-453b-9866-e4e726f3465&title=&width=1112)

```glsl
float strength = sin(cnoise(vUv * 10.0) * 20.0);
```

![image.png](https://img-blog.csdnimg.cn/img_convert/3bce2f8b91efd0aa1e464e4c3f5ac6dc.png#averageHue=#121212&clientId=u70fe2cb5-7c40-4&from=paste&height=468&id=u1c152cd6&originHeight=585&originWidth=1390&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=317235&status=done&style=none&taskId=ucd8bbe9b-a6d6-49c6-947f-c7651a34d63&title=&width=1112)

```glsl
float strength = step(0.9, sin(cnoise(vUv * 10.0) * 20.0));
```

![image.png](https://img-blog.csdnimg.cn/img_convert/1188b06b53c090fe9b0b3e082bf94127.png#averageHue=#0a0a0a&clientId=u70fe2cb5-7c40-4&from=paste&height=468&id=ua33efca4&originHeight=585&originWidth=1390&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=34808&status=done&style=none&taskId=u6cc665f7-6ed6-41d8-a5af-b251f2cb7f2&title=&width=1112)

## [7]混合颜色

一个常用的颜色混合函数mix：这个函数可以实现百分比混合两个颜色值

```glsl
void main(){
   float strength = step(0.9, sin(cnoise(vUv * 10.0) * 20.0));
   vec3 blackColor = vec3(0.0);
   vec3 uvColor = vec3(vUv, 1.0);
   vec3 mixedColor = mix(blackColor, uvColor, strength);
    gl_FragColor = vec4(vec3(mixedColor), 1.0);
}
```

![image.png](https://img-blog.csdnimg.cn/img_convert/27459f3f0c1a53b3256605f2cf65f4ad.png#averageHue=#000000&clientId=u70fe2cb5-7c40-4&from=paste&height=468&id=u12c1f137&originHeight=585&originWidth=1390&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=74595&status=done&style=none&taskId=u06ca9091-6ffc-492d-99e8-b559e6fbc22&title=&width=1112)