<template><p>本文章主要部分为https://www.postgresqltutorial.com翻译简化的学习笔记</p>
<h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1.简介</h2>
<p>L/pgSQL是一种用于PostgreSQL数据库系统的可载入的过程语言。</p>
<ul>
<li>可以被用来创建函数和触发器过程</li>
<li>对SQL语言增加控制结构</li>
<li>可以执行复杂计算</li>
<li>继承所有用户定义类型、函数和操作符</li>
<li>可以被定义为受服务器信任</li>
<li>便于使用</li>
</ul>
<h3 id="_1-使用pl-pgsql的优点" tabindex="-1"><a class="header-anchor" href="#_1-使用pl-pgsql的优点" aria-hidden="true">#</a> [1]使用PL/pgSQL的优点</h3>
<p>SQL 是一种查询语言，可让您轻松地从数据库中查询数据。但是，PostgreSQL 只能单独执行 SQL 语句。</p>
<p>这意味着您有多个语句，您需要像这样一个一个地执行它们：</p>
<ul>
<li>首先，向 PostgreSQL 数据库服务器发送查询。</li>
<li>接下来，等待它处理。</li>
<li>然后，处理结果集。</li>
<li>之后，进行一些计算。</li>
<li>最后，向 PostgreSQL 数据库服务器发送另一个查询并重复此过程。</li>
</ul>
<p>此过程会产生进程间通信和网络开销。</p>
<p>为了解决这个问题，PostgreSQL 使用 PL/pgSQL。</p>
<p>PL/pgSQL 将多个语句包装在一个对象中并将其存储在 PostgreSQL 数据库服务器上。</p>
<p>因此，您可以发送一条语句来执行存储在服务器中的对象，而不是一一发送多个语句到服务器。这使您可以：</p>
<ul>
<li>减少应用程序和 PostgreSQL 数据库服务器之间的往返次数。</li>
<li>避免在应用程序和服务器之间传输即时结果。</li>
</ul>
<h3 id="_2-postgresql-pl-pgsql-的缺点" tabindex="-1"><a class="header-anchor" href="#_2-postgresql-pl-pgsql-的缺点" aria-hidden="true">#</a> [2]PostgreSQL PL/pgSQL 的缺点</h3>
<p>除了使用 PL/pgSQL 的优点之外，还有一些注意事项：</p>
<ul>
<li>软件开发速度较慢，因为 PL/pgSQL 需要许多开发人员不具备的专业技能。</li>
<li>版本管理困难，调试困难。</li>
<li>可能无法移植到其他数据库管理系统</li>
</ul>
<h2 id="_2-符号引用的字符串常量" tabindex="-1"><a class="header-anchor" href="#_2-符号引用的字符串常量" aria-hidden="true">#</a> 2.$$符号引用的字符串常量</h2>
<p>如何<code>$$</code>在用户定义的函数和存储过程中使用美元引用的字符串常量 。</p>
<p>在 PostgreSQL 中，使用单引号作为字符串常量，如下所示：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token string">'String constant'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>当字符串常量包含单引号 ( <code>'</code>) 时，您需要通过加倍单引号来对其进行转义。例如：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token string">'I''m also a string constant'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>PostgreSQL 8.0 版引入了美元符号引用功能，使字符串常量更具可读性。</p>
<p>语法：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$tag$&lt;string_constant>$tag$
在此语法中，tag是可选的。它可能包含零个或多个字符。
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>在两个<code>$tag$</code>之间，你可以放置任何带有单引号 ( <code>'</code>) 和反斜杠 ( <code>\</code>) 的字符串。例如：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> $$I'm a string constant that <span class="token keyword">contains</span> a backslash \$$<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/af52a89eb4544c5681b0a67b51a5757e.png" alt="在这里插入图片描述"></p>
<p>使用带标记的美元引号字符串常量语法：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>SELECT $message$I'm a string constant that contains a backslash \$message$;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/db11788e3b95435e84a040421384e3e8.png" alt="在这里插入图片描述"></p>
<h3 id="_1-在匿名块中使用" tabindex="-1"><a class="header-anchor" href="#_1-在匿名块中使用" aria-hidden="true">#</a> [1]在匿名块中使用$$</h3>
<p>一个简单的PL/pgSQL匿名块</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span> 
<span class="token string">'declare
   film_count integer;
begin 
   select count(*) into film_count
   from film;
   raise notice ''The number of films: %'', film_count;
end;'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>块中的代码必须用单引号括起来。如果它内部有任何单引号，则需要通过像这样将其转义：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>raise notice ''The number of films: %'', film_count;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_2-在函数中使用" tabindex="-1"><a class="header-anchor" href="#_2-在函数中使用" aria-hidden="true">#</a> [2]在函数中使用$$</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">function</span> function_name<span class="token punctuation">(</span>param_list<span class="token punctuation">)</span> 
    <span class="token keyword">returns</span> datatype
<span class="token keyword">language</span> lang_name
<span class="token keyword">as</span> 
 <span class="token string">'function_body'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>在这种语法中，<code>function_body</code>是一个字符串常量。例如，以下函数通过 id 查找电影：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">function</span> find_film_by_id<span class="token punctuation">(</span>
   id <span class="token keyword">int</span>
<span class="token punctuation">)</span> <span class="token keyword">returns</span> film 
<span class="token keyword">language</span> <span class="token keyword">sql</span>
<span class="token keyword">as</span> 
  <span class="token string">'select * from film 
   where film_id = id'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>如您所见，<code>find_film_by_id()</code>函数的主体用单引号括起来。</p>
<p>如果函数有很多语句，它就会变得更难阅读。在这种情况下，您可以使用美元引用的字符串常量语法：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">function</span> find_film_by_id<span class="token punctuation">(</span>
   id <span class="token keyword">int</span>
<span class="token punctuation">)</span> <span class="token keyword">returns</span> film 
<span class="token keyword">language</span> <span class="token keyword">sql</span>
<span class="token keyword">as</span> 
$$
  <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> film 
  <span class="token keyword">where</span> film_id <span class="token operator">=</span> id<span class="token punctuation">;</span>  
$$<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="_2-在存储过程中使用" tabindex="-1"><a class="header-anchor" href="#_2-在存储过程中使用" aria-hidden="true">#</a> [2]在存储过程中使用$$</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">procedure</span> proc_name<span class="token punctuation">(</span>param_list<span class="token punctuation">)</span>
<span class="token keyword">language</span> lang_name
<span class="token keyword">as</span> $$
  <span class="token comment">-- stored procedure body</span>
$$
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="_3-pl-pgsql-块结构" tabindex="-1"><a class="header-anchor" href="#_3-pl-pgsql-块结构" aria-hidden="true">#</a> 3.PL/pgSQL 块结构</h2>
<p>PL/pgSQL 是一种块结构语言，因此，PL/pgSQL函数或存储过程被组织成块。</p>
<p>PL/pgSQL 中完整块的语法：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token punctuation">[</span> <span class="token operator">&lt;&lt;</span>label<span class="token operator">>></span> <span class="token punctuation">]</span>
<span class="token punctuation">[</span> <span class="token keyword">declare</span>
    declarations <span class="token punctuation">]</span>
<span class="token keyword">begin</span>
    statements<span class="token punctuation">;</span>
	<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token keyword">end</span> <span class="token punctuation">[</span> label <span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><blockquote>
<ul>
<li>每个块有两个部分：声明和正文。声明部分是可选的，而正文部分是必需的。块以关键字<code>;</code>后的分号 ( ) 结束。<code>END</code></li>
<li>一个块可能有一个位于开头和结尾的可选标签label。<code>EXIT</code>当你想在块体的语句中指定它或者当你想限定在块中声明的<a href="https://www.postgresqltutorial.com/plpgsql-variables/" target="_blank" rel="noopener noreferrer">变量</a>的名称时，你可以使用块标签</li>
<li>声明部分是声明在正文中所使用的变量的地方。声明部分中的每条语句都以分号 ( <code>;</code>) 结束。</li>
<li>正文部分是放置代码的地方。正文部分中的每个语句也以分号 (😉 结束。</li>
<li></li>
</ul>
</blockquote>
<h3 id="_1-pl-pgsql-块结构示例" tabindex="-1"><a class="header-anchor" href="#_1-pl-pgsql-块结构示例" aria-hidden="true">#</a> [1]PL/pgSQL 块结构示例</h3>
<p>一个匿名块</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span> $$ 
<span class="token operator">&lt;&lt;</span>first_block<span class="token operator">>></span>
<span class="token keyword">declare</span>
  film_count <span class="token keyword">integer</span> :<span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">begin</span>
   <span class="token comment">-- get the number of films</span>
   <span class="token keyword">select</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> 
   <span class="token keyword">into</span> film_count
   <span class="token keyword">from</span> film<span class="token punctuation">;</span>
   <span class="token comment">-- display a message</span>
   raise notice <span class="token string">'The number of films is %'</span><span class="token punctuation">,</span> film_count<span class="token punctuation">;</span>
<span class="token keyword">end</span> first_block $$<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>NOTICE:  The current value of counter is 1
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><blockquote>
<ul>
<li>
<p>该<code>DO</code>语句不属于该块。它用于执行匿名块。PostgreSQL<code>DO</code>从 9.0 版本开始引入该语句。</p>
</li>
<li>
<p>匿名块必须用单引号或$$包起来</p>
</li>
</ul>
</blockquote>
<h3 id="_2-pl-pgsql-子块" tabindex="-1"><a class="header-anchor" href="#_2-pl-pgsql-子块" aria-hidden="true">#</a> [2]PL/pgSQL 子块</h3>
<p>PL/pgSQL 允许您将一个块放置在另一个块的主体内。</p>
<p>嵌套在另一个块中的块称为子块。包含子块的块称为外块。</p>
<p>下图说明了外块和子块：</p>
<p><img src="https://img-blog.csdnimg.cn/088fc4e5fb514146a1af765889452a66.png" alt="在这里插入图片描述"></p>
<blockquote>
<p>通常，您将一个大块划分为更小且更具逻辑性的子块。子块中的变量可以具有与外部块中的名称相同的名称，尽管这不是一个好的做法。</p>
</blockquote>
<h3 id="_3-小结" tabindex="-1"><a class="header-anchor" href="#_3-小结" aria-hidden="true">#</a> [3]小结</h3>
<ul>
<li>PL/pgSQL 是一种块结构语言。它将程序组织成块。</li>
<li>块包含两部分：声明和主体。声明部分是可选的，而正文部分是强制性的。</li>
<li>块可以嵌套。嵌套块是放置在另一个块的主体内的块</li>
</ul>
<h2 id="_4-变量和常量" tabindex="-1"><a class="header-anchor" href="#_4-变量和常量" aria-hidden="true">#</a> 4.变量和常量</h2>
<h3 id="_1-变量" tabindex="-1"><a class="header-anchor" href="#_1-变量" aria-hidden="true">#</a> [1]变量</h3>
<p>在使用变量之前，您必须在<a href="https://www.postgresqltutorial.com/plpgsql-block-structure/" target="_blank" rel="noopener noreferrer">PL/pgSQL 块</a>的声明部分中声明它</p>
<p>声明语法:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>variable_name data_type [:= expression];
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><blockquote>
<ul>
<li>使用特定数据类型与变量相关联。数据类型可以是任何有效的数据类型，例如<a href="https://www.postgresqltutorial.com/postgresql-integer/" target="_blank" rel="noopener noreferrer">integer</a>、<a href="https://www.postgresqltutorial.com/postgresql-numeric/" target="_blank" rel="noopener noreferrer">numeric</a>、<a href="https://www.postgresqltutorial.com/postgresql-char-varchar-text/" target="_blank" rel="noopener noreferrer">varchar</a>和 <a href="https://www.postgresqltutorial.com/postgresql-char-varchar-text/" target="_blank" rel="noopener noreferrer">char</a>。</li>
<li>可选地为变量分配默认值。如果不这样做，变量的初始值为<code>NULL</code></li>
<li>可以使用<code>:=</code>或<code>=</code>赋值运算符来初始化变量并将值分配给变量。</li>
</ul>
</blockquote>
<p>示例：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span> $$ 
<span class="token keyword">declare</span>
   counter    <span class="token keyword">integer</span> :<span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
   first_name <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> :<span class="token operator">=</span> <span class="token string">'John'</span><span class="token punctuation">;</span>
   last_name  <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> :<span class="token operator">=</span> <span class="token string">'Doe'</span><span class="token punctuation">;</span>
   payment    <span class="token keyword">numeric</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> :<span class="token operator">=</span> <span class="token number">20.5</span><span class="token punctuation">;</span>
<span class="token keyword">begin</span> 
   raise notice <span class="token string">'% % % has been paid % USD'</span><span class="token punctuation">,</span> 
       counter<span class="token punctuation">,</span> 
	   first_name<span class="token punctuation">,</span> 
	   last_name<span class="token punctuation">,</span> 
	   payment<span class="token punctuation">;</span>
<span class="token keyword">end</span> $$<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/5d0e29effc45407d9729c2593ec88dfe.png" alt="在这里插入图片描述"></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span> $$
<span class="token keyword">declare</span> 
	created_at <span class="token keyword">time</span> :<span class="token operator">=</span> <span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">begin</span> 
	raise notice <span class="token string">'%'</span><span class="token punctuation">,</span>created_at<span class="token punctuation">;</span>
	perform pg_sleep<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	raise notice <span class="token string">'%'</span><span class="token punctuation">,</span>created_at<span class="token punctuation">;</span>
<span class="token keyword">end</span> $$<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>NOTICE:  14:23:33.064008
NOTICE:  14:23:33.064008
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="_2-复制数据类型" tabindex="-1"><a class="header-anchor" href="#_2-复制数据类型" aria-hidden="true">#</a> [2]复制数据类型</h3>
<p>使用%type来复制表中某个字段（或某个已经存在的变量）的数据类型</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>variable_name table_name.column_name%type;
variable_name variable%type;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>示例：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span> $$ 
<span class="token keyword">declare</span>
   film_title film<span class="token punctuation">.</span>title<span class="token operator">%</span><span class="token keyword">type</span><span class="token punctuation">;</span>
   featured_title film_title<span class="token operator">%</span><span class="token keyword">type</span><span class="token punctuation">;</span>
<span class="token keyword">begin</span> 
   <span class="token comment">-- get title of the film id 100</span>
   <span class="token keyword">select</span> title
   <span class="token keyword">from</span> film
   <span class="token keyword">into</span> film_title
   <span class="token keyword">where</span> film_id <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
   
   <span class="token comment">-- show the film title</span>
   raise notice <span class="token string">'Film title id 100: %s'</span><span class="token punctuation">,</span> film_title<span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span> $$
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h4 id="块和子块中的变量" tabindex="-1"><a class="header-anchor" href="#块和子块中的变量" aria-hidden="true">#</a> 块和子块中的变量</h4>
<p>当您在子块中声明与外部块中的另一个变量同名的变量时，外部块中的变量将隐藏在子块中。</p>
<p>如果要访问外部块中的变量，请使用块标签来限定其名称，如下例所示：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span> $$
<span class="token operator">&lt;&lt;</span>outer_block<span class="token operator">>></span>
<span class="token keyword">declare</span>
	counter <span class="token keyword">integer</span> :<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">begin</span> 
	counter :<span class="token operator">=</span>counter <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
	raise notice <span class="token string">'The current value of the counter is %'</span><span class="token punctuation">,</span>counter<span class="token punctuation">;</span>
	
	<span class="token keyword">declare</span> 
		counter <span class="token keyword">integer</span> :<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
	<span class="token keyword">begin</span> 
		counter :<span class="token operator">=</span>counter <span class="token operator">+</span><span class="token number">10</span><span class="token punctuation">;</span>
		raise notice <span class="token string">'Counter in the subblock is %'</span><span class="token punctuation">,</span>counter<span class="token punctuation">;</span>
		raise notice <span class="token string">'Counter in the outer block is %'</span><span class="token punctuation">,</span>outer_block<span class="token punctuation">.</span>counter<span class="token punctuation">;</span>
	<span class="token keyword">end</span><span class="token punctuation">;</span>
	
	raise notice <span class="token string">'Counter in the outer block is %'</span><span class="token punctuation">,</span>counter<span class="token punctuation">;</span>
<span class="token keyword">end</span> outer_block $$<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>NOTICE:  The current value of the counter is 1
NOTICE:  Counter in the subblock is 10
NOTICE:  Counter in the outer block is 1
NOTICE:  Counter in the outer block is 1
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><blockquote>
<ul>
<li>
<p>内部块与外部块可以同名</p>
</li>
<li>
<p>在内部块中使用外部块的变量时，需要加上外部块的表示符</p>
</li>
</ul>
</blockquote>
<h3 id="_3-select-into" tabindex="-1"><a class="header-anchor" href="#_3-select-into" aria-hidden="true">#</a> [3]select into</h3>
<p>PostgreSQL<code>SELECT INTO</code>语句创建一个新表并将查询返回的数据插入到表中</p>
<p>与常规<a href="https://www.postgresqltutorial.com/postgresql-select/" target="_blank" rel="noopener noreferrer"><code>SELECT</code></a>语句不同，该<code>SELECT INTO</code>语句不向客户端返回结果</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
    select_list
<span class="token keyword">INTO</span> <span class="token punctuation">[</span> <span class="token keyword">TEMPORARY</span> <span class="token operator">|</span> <span class="token keyword">TEMP</span> <span class="token operator">|</span> UNLOGGED <span class="token punctuation">]</span> <span class="token punctuation">[</span> <span class="token keyword">TABLE</span> <span class="token punctuation">]</span> new_table_name
<span class="token keyword">FROM</span>
    table_name
<span class="token keyword">WHERE</span>
    search_condition<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><blockquote>
<ul>
<li>
<p>要使用从结果集派生的结构和数据创建新表，请在<code>INTO</code>关键字后指定新表名</p>
</li>
<li>
<p><code>TEMP</code>or<code>TEMPORARY</code>关键字是可选的；它允许您创建一个临时表</p>
</li>
<li>
<p>如果可用的<code>UNLOGGED</code>关键字将使新表成为未记录的表</p>
</li>
<li>
<p>不能在 PL/pgSQL 中使用<code>SELECT INTO</code>，因为它对<code>INTO</code>子句的解释不同。在这种情况下，您可以使用<code>CREATE TABLE AS</code>提供比语句更多功能的<code>SELECT INTO</code>语句。</p>
</li>
</ul>
</blockquote>
<p><strong>示例：</strong>(创建一个新表<code>film_r</code>)</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
    film_id<span class="token punctuation">,</span>
    title<span class="token punctuation">,</span>
    rental_rate
<span class="token keyword">INTO</span> <span class="token keyword">TABLE</span> film_r
<span class="token keyword">FROM</span>
    film
<span class="token keyword">WHERE</span>
    rating <span class="token operator">=</span> <span class="token string">'R'</span>
<span class="token operator">AND</span> rental_duration <span class="token operator">=</span> <span class="token number">5</span>
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span>
    title<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>SELECT * FROM film_r;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><strong>示例：</strong>（创建一个临时表）</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
    film_id<span class="token punctuation">,</span>
    title<span class="token punctuation">,</span>
    length 
<span class="token keyword">INTO</span> <span class="token keyword">TEMP</span> <span class="token keyword">TABLE</span> short_film
<span class="token keyword">FROM</span>
    film
<span class="token keyword">WHERE</span>
    length <span class="token operator">&lt;</span> <span class="token number">60</span>
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span>
    title<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="_4-行类型变量" tabindex="-1"><a class="header-anchor" href="#_4-行类型变量" aria-hidden="true">#</a> [4]行类型变量</h3>
<p>使用 PL/pgSQL 行类型来声明保存结果集的完整行的行变量</p>
<p>要存储语句返回的结果集的整行<code>select into</code>，请使用行类型变量或行变量</p>
<p>您可以使用以下语法声明具有与表中行的数据类型相同数据类型的变量：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>row_variable table_name%ROWTYPE;
row_variable view_name%ROWTYPE;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>要访问行变量的单个字段，请使用点表示法 ( <code>.</code>)，如下所示：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>row_variable.field_name
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><strong>示例：</strong>（显示了演员 id 10 的名字和姓氏）</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span> $$
<span class="token keyword">declare</span>
   selected_actor actor<span class="token operator">%</span>rowtype<span class="token punctuation">;</span>
<span class="token keyword">begin</span>
   <span class="token comment">-- select actor with id 10   </span>
   <span class="token keyword">select</span> <span class="token operator">*</span> 
   <span class="token keyword">from</span> actor
   <span class="token keyword">into</span> selected_actor   <span class="token comment">-- 将查询结果存到这个行类型变量中</span>
   <span class="token keyword">where</span> actor_id <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>

   <span class="token comment">-- show the number of actor</span>
   raise notice <span class="token string">'The actor name is % %'</span><span class="token punctuation">,</span>
      selected_actor<span class="token punctuation">.</span>first_name<span class="token punctuation">,</span>
      selected_actor<span class="token punctuation">.</span>last_name<span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span> $$

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="_5-记录类型变量" tabindex="-1"><a class="header-anchor" href="#_5-记录类型变量" aria-hidden="true">#</a> [5]记录类型变量</h3>
<p>记录类型允许您定义可以保存结果集中单行的变量</p>
<p><code>record</code>变量类似于行类型变量。它只能保存结果集的一行</p>
<p>语法：<code>variable_name record;</code></p>
<p><strong>示例1：（使用带有 select into 语句的记录）</strong></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span>
$$
<span class="token keyword">declare</span>
	rec record<span class="token punctuation">;</span>
<span class="token keyword">begin</span>
	<span class="token comment">-- select the film </span>
	<span class="token keyword">select</span> film_id<span class="token punctuation">,</span> title<span class="token punctuation">,</span> length 
	<span class="token keyword">into</span> rec
	<span class="token keyword">from</span> film
	<span class="token keyword">where</span> film_id <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span>
	
	raise notice <span class="token string">'% % %'</span><span class="token punctuation">,</span> rec<span class="token punctuation">.</span>film_id<span class="token punctuation">,</span> rec<span class="token punctuation">.</span>title<span class="token punctuation">,</span> rec<span class="token punctuation">.</span>length<span class="token punctuation">;</span>   
	
<span class="token keyword">end</span><span class="token punctuation">;</span>
$$
<span class="token keyword">language</span> plpgsql<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p><strong>示例2：（在for循环语句中使用记录变量）</strong></p>
<p>下面展示了如何在<code>for loop</code>语句中使用记录变量：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span>
$$
<span class="token keyword">declare</span>
	rec record<span class="token punctuation">;</span>
<span class="token keyword">begin</span>
	<span class="token keyword">for</span> rec <span class="token operator">in</span> <span class="token keyword">select</span> title<span class="token punctuation">,</span> length 
			<span class="token keyword">from</span> film 
			<span class="token keyword">where</span> length <span class="token operator">></span> <span class="token number">50</span>
			<span class="token keyword">order</span> <span class="token keyword">by</span> length
	<span class="token keyword">loop</span>
		raise notice <span class="token string">'% (%)'</span><span class="token punctuation">,</span> rec<span class="token punctuation">.</span>title<span class="token punctuation">,</span> rec<span class="token punctuation">.</span>length<span class="token punctuation">;</span>	
	<span class="token keyword">end</span> <span class="token keyword">loop</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
$$
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>NOTICE:  Hall Cassidy (51)
NOTICE:  Champion Flatliners (51)
NOTICE:  Deep Crusade (51)
NOTICE:  Simon North (51)
NOTICE:  English Bulworth (51)
...
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><blockquote>
<ul>
<li>首先，声明一个名为 r 的变量，其类型为<code>record</code>。</li>
<li>其次，使用该<code>for loop</code>语句从<code>film</code>表中获取行（在示例数据库中）。该语句在每次迭代中将由和<code>for loop</code>组成的行分配给变量。title，length，rec</li>
<li><code>rec.title</code>三、使用点表示法（和<code>rec.length</code>）显示记录变量的字段内容</li>
</ul>
</blockquote>
<ul>
<li>记录是一个占位符，可以保存结果集的单行。</li>
<li>记录没有像行变量那样的预定义结构。它的结构是在您为其分配行时确定的。</li>
</ul>
<h3 id="_6-常量" tabindex="-1"><a class="header-anchor" href="#_6-常量" aria-hidden="true">#</a> [6]常量</h3>
<p>与变量不同，常量的值一旦初始化就不能更改</p>
<p>常量使代码更具可读性和可维护性</p>
<p><strong>定义常量：</strong></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>constant_name constant data_type :<span class="token operator">=</span> expression<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><strong>示例：</strong></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span> $$ 
<span class="token keyword">declare</span>
   vat constant <span class="token keyword">numeric</span> :<span class="token operator">=</span> <span class="token number">0.1</span><span class="token punctuation">;</span>
   net_price    <span class="token keyword">numeric</span> :<span class="token operator">=</span> <span class="token number">20.5</span><span class="token punctuation">;</span>
<span class="token keyword">begin</span>
   raise notice <span class="token string">'The selling price is %'</span><span class="token punctuation">,</span> net_price <span class="token operator">*</span> <span class="token punctuation">(</span> <span class="token number">1</span> <span class="token operator">+</span> vat <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">end</span> $$<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="_5-报告消息和错误" tabindex="-1"><a class="header-anchor" href="#_5-报告消息和错误" aria-hidden="true">#</a> 5.报告消息和错误</h2>
<p>使用<code>raise</code>语句报告消息和引发错误，使用该<code>assert</code>语句将调试检查插入到 PL/pgSQL 块中</p>
<h3 id="_1-报告消息" tabindex="-1"><a class="header-anchor" href="#_1-报告消息" aria-hidden="true">#</a> [1]报告消息</h3>
<p>要引发消息，请使用以下<code>raise</code>语句：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>raise level format;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>让我们更详细地检查该<code>raise</code>语句。</p>
<h3 id="_2-等级" tabindex="-1"><a class="header-anchor" href="#_2-等级" aria-hidden="true">#</a> [2]等级</h3>
<p>语句后面是指定错误严重性<code>raise</code>的选项。<code>level</code></p>
<p>PostgreSQL 提供以下级别：</p>
<ul>
<li><code>debug</code></li>
<li><code>log</code></li>
<li><code>notice</code></li>
<li><code>info</code></li>
<li><code>warning</code></li>
<li><code>exception</code></li>
</ul>
<p>如果您不指定<code>level</code>，默认情况下，该<code>raise</code>语句将使用<code>exception</code> 引发错误并停止当前事务的级别。</p>
<h3 id="_3-格式" tabindex="-1"><a class="header-anchor" href="#_3-格式" aria-hidden="true">#</a> [3]格式</h3>
<p>这<code>format</code>是一个指定消息的字符串。使用将由参数替换的百分比 ( ) 占位符<code>format</code>。<code>%</code></p>
<p>占位符的数量必须与参数的数量相同，否则 PostgreSQL 会报错：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[Err] ERROR:  too many parameters specified for raise代码语言： CSS  （css ）
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>以下示例说明了<code>raise</code>在当前时间报告不同消息的语句。</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span> $$ 
<span class="token keyword">begin</span> 
  raise info <span class="token string">'information message %'</span><span class="token punctuation">,</span> <span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
  raise log <span class="token string">'log message %'</span><span class="token punctuation">,</span> <span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  raise debug <span class="token string">'debug message %'</span><span class="token punctuation">,</span> <span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  raise warning <span class="token string">'warning message %'</span><span class="token punctuation">,</span> <span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  raise notice <span class="token string">'notice message %'</span><span class="token punctuation">,</span> <span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">end</span> $$<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>输出：
<img src="https://img-blog.csdnimg.cn/cad3dab050344350a8969a0b13237e18.png" alt="在这里插入图片描述"></p>
<blockquote>
<p>请注意，并非所有消息都报告给客户端。PostgreSQL 仅将 、 和 level 消息报告<code>info</code>回<code>warning</code>客户<code>notice</code>端。这由<code>client_min_messages</code> 配置<code>log_min_messages</code> 参数控制</p>
</blockquote>
<h3 id="_4-引发错误" tabindex="-1"><a class="header-anchor" href="#_4-引发错误" aria-hidden="true">#</a> [4]引发错误</h3>
<p>要引发错误，请使用语句<code>exception</code>后的级别。<code>raise</code>请注意，该<code>raise</code>语句<code>exception</code>默认使用级别。</p>
<p>除了引发错误之外，您还可以使用以下附加子句添加更多信息：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>using option = expression
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><code>option</code>可以是：</p>
<ul>
<li><code>message</code>: 设置错误信息</li>
<li><code>hint</code>：提供提示信息，以便更容易发现错误的根本原因。</li>
<li><code>detail</code>: 提供有关错误的详细信息。</li>
<li><code>errcode</code>：识别错误代码，可以是条件名称，也可以直接是五字符<code>SQLSTATE</code>代码。请参阅<a href="https://www.postgresql.org/docs/current/static/errcodes-appendix.html" target="_blank" rel="noopener noreferrer">错误代码和条件名称表</a>。</li>
</ul>
<p>是一个字符串值的<code>expression</code>表达式。以下示例引发重复的电子邮件错误消息：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span> $$ 
<span class="token keyword">declare</span>
  email <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> :<span class="token operator">=</span> <span class="token string">'info@postgresqltutorial.com'</span><span class="token punctuation">;</span>
<span class="token keyword">begin</span> 
  <span class="token comment">-- check email for duplicate</span>
  <span class="token comment">-- ...</span>
  <span class="token comment">-- report duplicate email</span>
  raise exception <span class="token string">'duplicate email: %'</span><span class="token punctuation">,</span> email 
		<span class="token keyword">using</span> hint <span class="token operator">=</span> <span class="token string">'check the email again'</span><span class="token punctuation">;</span>
<span class="token keyword">end</span> $$<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/04c061723056432c854c38d2b74bf648.png" alt="在这里插入图片描述"></p>
<p>以下示例说明了如何引发 an<code>SQLSTATE</code>及其对应的条件：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span> $$ 
<span class="token keyword">begin</span> 
	<span class="token comment">--...</span>
	raise sqlstate <span class="token string">'2210b'</span><span class="token punctuation">;</span>
<span class="token keyword">end</span> $$<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span> $$ 
<span class="token keyword">begin</span> 
	<span class="token comment">--...</span>
	raise invalid_regular_expression<span class="token punctuation">;</span>
<span class="token keyword">end</span> $$<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>现在您可以使用<code>raise</code>语句来引发消息或报告错误。</p>
<h3 id="_5-assert" tabindex="-1"><a class="header-anchor" href="#_5-assert" aria-hidden="true">#</a> [5]Assert</h3>
<p>PostgreSQL 断言语句以及如何将其用于调试目的</p>
<blockquote>
<p>PostgreSQL<code>assert</code>从 9.5 版开始引入了该语句。在使用之前检查您的 PostgreSQL 版本。</p>
</blockquote>
<p>下面说明了<code>assert</code>语句的语法：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>assert condition <span class="token punctuation">[</span><span class="token punctuation">,</span> message<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>在这种语法中：</p>
<h4 id="_1-条件" tabindex="-1"><a class="header-anchor" href="#_1-条件" aria-hidden="true">#</a> 1) 条件</h4>
<p>是<code>condition</code>一个布尔表达式，预期总是返回<code>true</code>。</p>
<p>如果<code>condition</code>计算结果为<code>true</code>，则该<code>assert</code>语句不执行任何操作。</p>
<p>如果<code>condition</code>计算结果为<code>false</code>or <code>null</code>，PostgreSQL 会引发<code>assert_failure</code>异常。</p>
<h4 id="_2-留言" tabindex="-1"><a class="header-anchor" href="#_2-留言" aria-hidden="true">#</a> 2) 留言</h4>
<p>该消息是可选的。</p>
<p>如果你不通过<code>message</code>，PostgreSQL<code>assertion failed</code>默认使用“ ”消息。如果您将 传递<code>message</code>给<code>assert</code>语句，它将使用它来替换默认消息。</p>
<p>请注意，您应该将该<code>assert</code>语句仅用于检测错误，而不是用于报告。要报告消息或错误，请改用<code>raise</code>语句。</p>
<h4 id="启用-禁用断言" tabindex="-1"><a class="header-anchor" href="#启用-禁用断言" aria-hidden="true">#</a> 启用/禁用断言</h4>
<p>PostgreSQL 提供<code>plpgsql.check_asserts</code>配置参数来启用或禁用断言测试。如果将此参数设置为<code>off</code>，则 assert 语句将不执行任何操作。</p>
<p>示例：使用该<code>assert</code>语句检查示例数据库<code>film</code>中的表是否有数据：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span> $$
<span class="token keyword">declare</span> 
   film_count <span class="token keyword">integer</span><span class="token punctuation">;</span>
<span class="token keyword">begin</span>
   <span class="token keyword">select</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span>
   <span class="token keyword">into</span> film_count
   <span class="token keyword">from</span> film<span class="token punctuation">;</span>
   
   assert film_count <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">'Film not found, check the film table'</span><span class="token punctuation">;</span>
<span class="token keyword">end</span>$$<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>因为电影表有数据，所以块没有发出任何消息。</p>
<p>以下示例发出错误，因为电影表中的电影数量不大于<code>1,000</code>。</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span> $$
<span class="token keyword">declare</span> 
   film_count <span class="token keyword">integer</span><span class="token punctuation">;</span>
<span class="token keyword">begin</span>
   <span class="token keyword">select</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span>
   <span class="token keyword">into</span> film_count
   <span class="token keyword">from</span> film<span class="token punctuation">;</span>
   
   assert film_count <span class="token operator">></span> <span class="token number">1000</span><span class="token punctuation">,</span> <span class="token string">'1000 Film found, check the film table'</span><span class="token punctuation">;</span>
<span class="token keyword">end</span>$$<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/566c9a06370e4374981480c53fa5b1e8.png" alt="在这里插入图片描述"></p>
<p>小结：</p>
<ul>
<li>使用该<code>assert</code>语句将调试检查添加到 PL/pgSQL 代码。</li>
<li>该<code>assert</code>语句评估<code>condition</code>预期为的 a 并在条件为或<code>true</code>的情况下发出错误。<code>false``null</code></li>
<li>该<code>assert</code>语句仅用于检测错误。要报告普通消息和错误，请改用该<code>raise</code>语句。</li>
</ul>
<h2 id="_5-控制结构" tabindex="-1"><a class="header-anchor" href="#_5-控制结构" aria-hidden="true">#</a> 5.控制结构</h2>
<h3 id="_1-if" tabindex="-1"><a class="header-anchor" href="#_1-if" aria-hidden="true">#</a> [1]if</h3>
<p>PL/pgSQL 提供了三种形式的<code>if</code>语句。</p>
<ul>
<li><code>if then</code></li>
<li><code>if then else</code></li>
<li><code>if then elsif</code></li>
</ul>
<h4 id="_1-pl-pgsql-if-then-语句" tabindex="-1"><a class="header-anchor" href="#_1-pl-pgsql-if-then-语句" aria-hidden="true">#</a> 1) PL/pgSQL if-then 语句</h4>
<p>下面说明了该<code>if</code>语句的最简单形式：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">if</span> condition <span class="token keyword">then</span>
   statements<span class="token punctuation">;</span>
<span class="token keyword">end</span> <span class="token keyword">if</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/ffa282d63ca94d809403310673ff9f11.png" alt="在这里插入图片描述"></p>
<p>使用示例：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span> $$
<span class="token keyword">declare</span>
  selected_film film<span class="token operator">%</span>rowtype<span class="token punctuation">;</span>
  input_film_id film<span class="token punctuation">.</span>film_id<span class="token operator">%</span><span class="token keyword">type</span> :<span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">begin</span>  

  <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> film
  <span class="token keyword">into</span> selected_film
  <span class="token keyword">where</span> film_id <span class="token operator">=</span> input_film_id<span class="token punctuation">;</span>
  
  <span class="token keyword">if</span> <span class="token operator">not</span> found <span class="token keyword">then</span>
     raise notice<span class="token string">'The film % could not be found'</span><span class="token punctuation">,</span> 
	    input_film_id<span class="token punctuation">;</span>
  <span class="token keyword">end</span> <span class="token keyword">if</span><span class="token punctuation">;</span>
<span class="token keyword">end</span> $$
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><blockquote>
<p>这<code>found</code>是一个在 PL/pgSQL 过程语言中可用的全局变量</p>
</blockquote>
<h4 id="_2-pl-pgsql-if-then-else-语句" tabindex="-1"><a class="header-anchor" href="#_2-pl-pgsql-if-then-else-语句" aria-hidden="true">#</a> 2) PL/pgSQL if-then-else 语句</h4>
<p>语法</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">if</span> condition <span class="token keyword">then</span>
  statements<span class="token punctuation">;</span>
<span class="token keyword">else</span>
  alternative<span class="token operator">-</span>statements<span class="token punctuation">;</span>
<span class="token keyword">END</span> <span class="token keyword">if</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>示例：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span> $$
<span class="token keyword">declare</span>
  selected_film film<span class="token operator">%</span>rowtype<span class="token punctuation">;</span>
  input_film_id film<span class="token punctuation">.</span>film_id<span class="token operator">%</span><span class="token keyword">type</span> :<span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
<span class="token keyword">begin</span>  

  <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> film
  <span class="token keyword">into</span> selected_film
  <span class="token keyword">where</span> film_id <span class="token operator">=</span> input_film_id<span class="token punctuation">;</span>
  
  <span class="token keyword">if</span> <span class="token operator">not</span> found <span class="token keyword">then</span>
     raise notice <span class="token string">'The film % could not be found'</span><span class="token punctuation">,</span> 
	    input_film_id<span class="token punctuation">;</span>
  <span class="token keyword">else</span>
     raise notice <span class="token string">'The film title is %'</span><span class="token punctuation">,</span> selected_film<span class="token punctuation">.</span>title<span class="token punctuation">;</span>
  <span class="token keyword">end</span> <span class="token keyword">if</span><span class="token punctuation">;</span>
<span class="token keyword">end</span> $$
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h4 id="_3-pl-pgsql-if-then-elsif-语句" tabindex="-1"><a class="header-anchor" href="#_3-pl-pgsql-if-then-elsif-语句" aria-hidden="true">#</a> 3) PL/pgSQL if-then-elsif 语句</h4>
<p>语法：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">if</span> condition_1 <span class="token keyword">then</span>
  statement_1<span class="token punctuation">;</span>
elsif condition_2 <span class="token keyword">then</span>
  statement_2
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
elsif condition_n <span class="token keyword">then</span>
  statement_n<span class="token punctuation">;</span>
<span class="token keyword">else</span>
  <span class="token keyword">else</span><span class="token operator">-</span>statement<span class="token punctuation">;</span>
<span class="token keyword">end</span> <span class="token keyword">if</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>示例：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span> $$
<span class="token keyword">declare</span>
   v_film film<span class="token operator">%</span>rowtype<span class="token punctuation">;</span>
   len_description <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">begin</span>  

  <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> film
  <span class="token keyword">into</span> v_film
  <span class="token keyword">where</span> film_id <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
  
  <span class="token keyword">if</span> <span class="token operator">not</span> found <span class="token keyword">then</span>
     raise notice <span class="token string">'Film not found'</span><span class="token punctuation">;</span>
  <span class="token keyword">else</span>
      <span class="token keyword">if</span> v_film<span class="token punctuation">.</span>length <span class="token operator">></span><span class="token number">0</span> <span class="token operator">and</span> v_film<span class="token punctuation">.</span>length <span class="token operator">&lt;=</span> <span class="token number">50</span> <span class="token keyword">then</span>
		 len_description :<span class="token operator">=</span> <span class="token string">'Short'</span><span class="token punctuation">;</span>
	  elsif v_film<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">50</span> <span class="token operator">and</span> v_film<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> <span class="token number">120</span> <span class="token keyword">then</span>
		 len_description :<span class="token operator">=</span> <span class="token string">'Medium'</span><span class="token punctuation">;</span>
	  elsif v_film<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">120</span> <span class="token keyword">then</span>
		 len_description :<span class="token operator">=</span> <span class="token string">'Long'</span><span class="token punctuation">;</span>
	  <span class="token keyword">else</span> 
		 len_description :<span class="token operator">=</span> <span class="token string">'N/A'</span><span class="token punctuation">;</span>
	  <span class="token keyword">end</span> <span class="token keyword">if</span><span class="token punctuation">;</span>
    
	  raise notice <span class="token string">'The % film is %.'</span><span class="token punctuation">,</span>
	     v_film<span class="token punctuation">.</span>title<span class="token punctuation">,</span>  
	     len_description<span class="token punctuation">;</span>
  <span class="token keyword">end</span> <span class="token keyword">if</span><span class="token punctuation">;</span>
<span class="token keyword">end</span> $$
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h3 id="_2-case语句" tabindex="-1"><a class="header-anchor" href="#_2-case语句" aria-hidden="true">#</a> [2]case语句</h3>
<p><code>case</code>声明有两种形式：</p>
<ul>
<li>简单的<code>case</code>陈述</li>
<li>搜索<code>case</code>语句</li>
</ul>
<blockquote>
<p>请注意，您不要混淆<code>case</code>语句和case 表达式。<code>case</code>表达式计算为一个值，而语句<code>case</code>根据条件选择要执行的部分。</p>
</blockquote>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">case</span> search<span class="token operator">-</span>expression
   <span class="token keyword">when</span> expression_1 <span class="token punctuation">[</span><span class="token punctuation">,</span> expression_2<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span> <span class="token keyword">then</span>
      <span class="token keyword">when</span><span class="token operator">-</span>statements
  <span class="token punctuation">[</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">]</span>
  <span class="token punctuation">[</span><span class="token keyword">else</span>
      <span class="token keyword">else</span><span class="token operator">-</span>statements <span class="token punctuation">]</span>
<span class="token keyword">END</span> <span class="token keyword">case</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h4 id="_1-简单的case语句" tabindex="-1"><a class="header-anchor" href="#_1-简单的case语句" aria-hidden="true">#</a> 1) 简单的case语句</h4>
<p>示例：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span> $$
<span class="token keyword">declare</span> 
	rate   film<span class="token punctuation">.</span>rental_rate<span class="token operator">%</span><span class="token keyword">type</span><span class="token punctuation">;</span>
	price_segment <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">begin</span>
    <span class="token comment">-- get the rental rate</span>
    <span class="token keyword">select</span> rental_rate <span class="token keyword">into</span> rate 
    <span class="token keyword">from</span> film 
    <span class="token keyword">where</span> film_id <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
	
	<span class="token comment">-- assign the price segment</span>
	<span class="token keyword">if</span> found <span class="token keyword">then</span>
		<span class="token keyword">case</span> rate
		   <span class="token keyword">when</span> <span class="token number">0.99</span> <span class="token keyword">then</span>
              price_segment <span class="token operator">=</span>  <span class="token string">'Mass'</span><span class="token punctuation">;</span>
		   <span class="token keyword">when</span> <span class="token number">2.99</span> <span class="token keyword">then</span>
              price_segment <span class="token operator">=</span> <span class="token string">'Mainstream'</span><span class="token punctuation">;</span>
		   <span class="token keyword">when</span> <span class="token number">4.99</span> <span class="token keyword">then</span>
              price_segment <span class="token operator">=</span> <span class="token string">'High End'</span><span class="token punctuation">;</span>
		   <span class="token keyword">else</span>
	    	  price_segment <span class="token operator">=</span> <span class="token string">'Unspecified'</span><span class="token punctuation">;</span>
		   <span class="token keyword">end</span> <span class="token keyword">case</span><span class="token punctuation">;</span>
		raise notice <span class="token string">'%'</span><span class="token punctuation">,</span> price_segment<span class="token punctuation">;</span>  
    <span class="token keyword">end</span> <span class="token keyword">if</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span> $$
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/9f94c0a69a7c47eb84c8e6aa46f2adfd.png" alt="在这里插入图片描述"></p>
<h4 id="_2-检索案例陈述" tabindex="-1"><a class="header-anchor" href="#_2-检索案例陈述" aria-hidden="true">#</a> 2) 检索案例陈述</h4>
<p>以下语法显示了搜索<code>case</code>语句的语法：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">case</span>
    <span class="token keyword">when</span> <span class="token keyword">boolean</span><span class="token operator">-</span>expression<span class="token operator">-</span><span class="token number">1</span> <span class="token keyword">then</span>
      statements
  <span class="token punctuation">[</span> <span class="token keyword">when</span> <span class="token keyword">boolean</span><span class="token operator">-</span>expression<span class="token operator">-</span><span class="token number">2</span> <span class="token keyword">then</span>
      statements
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">]</span>
  <span class="token punctuation">[</span> <span class="token keyword">else</span>
      statements <span class="token punctuation">]</span>
<span class="token keyword">end</span> <span class="token keyword">case</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>示例：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span> $$ 
<span class="token keyword">declare</span>
    total_payment <span class="token keyword">numeric</span><span class="token punctuation">;</span> 
    service_level <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
<span class="token keyword">begin</span>
     <span class="token keyword">select</span> <span class="token function">sum</span><span class="token punctuation">(</span>amount<span class="token punctuation">)</span> <span class="token keyword">into</span> total_payment
     <span class="token keyword">from</span> Payment
     <span class="token keyword">where</span> customer_id <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span> 
	 
	 <span class="token keyword">if</span> found <span class="token keyword">then</span>
	    <span class="token keyword">case</span> 
		   <span class="token keyword">when</span> total_payment <span class="token operator">></span> <span class="token number">200</span> <span class="token keyword">then</span>
               service_level <span class="token operator">=</span> <span class="token string">'Platinum'</span> <span class="token punctuation">;</span>
           <span class="token keyword">when</span> total_payment <span class="token operator">></span> <span class="token number">100</span> <span class="token keyword">then</span>
	           service_level <span class="token operator">=</span> <span class="token string">'Gold'</span> <span class="token punctuation">;</span>
           <span class="token keyword">else</span>
               service_level <span class="token operator">=</span> <span class="token string">'Silver'</span> <span class="token punctuation">;</span>
        <span class="token keyword">end</span> <span class="token keyword">case</span><span class="token punctuation">;</span>
		raise notice <span class="token string">'Service Level: %'</span><span class="token punctuation">,</span> service_level<span class="token punctuation">;</span>
     <span class="token keyword">else</span>
	    raise notice <span class="token string">'Customer not found'</span><span class="token punctuation">;</span>
	 <span class="token keyword">end</span> <span class="token keyword">if</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span> $$ 

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h3 id="_3-loop循环" tabindex="-1"><a class="header-anchor" href="#_3-loop循环" aria-hidden="true">#</a> [3]loop循环</h3>
<p><code>loop</code>重复执行一段代码，直到被<code>exit</code>or<code>return</code>语句终止</p>
<p><strong>语法：</strong></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token operator">&lt;&lt;</span>label<span class="token operator">>></span>
<span class="token keyword">loop</span>
   statements<span class="token punctuation">;</span>
<span class="token keyword">end</span> <span class="token keyword">loop</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>通常使用<code>if</code>循环内的语句来根据如下条件终止它：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token operator">&lt;&lt;</span>label<span class="token operator">>></span>
<span class="token keyword">loop</span>
   statements<span class="token punctuation">;</span>
   <span class="token keyword">if</span> condition <span class="token keyword">then</span>
      <span class="token keyword">exit</span><span class="token punctuation">;</span>
   <span class="token keyword">end</span> <span class="token keyword">if</span><span class="token punctuation">;</span>
<span class="token keyword">end</span> <span class="token keyword">loop</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>也可以嵌套循环</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token operator">&lt;&lt;</span><span class="token keyword">outer</span><span class="token operator">>></span>
<span class="token keyword">loop</span> 
   statements<span class="token punctuation">;</span>
   <span class="token operator">&lt;&lt;</span><span class="token keyword">inner</span><span class="token operator">>></span>
   <span class="token keyword">loop</span>
     <span class="token comment">/* ... */</span>
     <span class="token keyword">exit</span> <span class="token operator">&lt;&lt;</span><span class="token keyword">inner</span><span class="token operator">>></span>
   <span class="token keyword">end</span> <span class="token keyword">loop</span><span class="token punctuation">;</span>
<span class="token keyword">end</span> <span class="token keyword">loop</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><blockquote>
<p>当有嵌套循环时，需要使用循环标签，以便可以在<code>exit</code>and<code>continue</code>语句中指定它以指示这些语句引用哪个循环。</p>
</blockquote>
<p><strong>示例：</strong></p>
<p>使用<code>loop</code>语句来计算斐波那契数列</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span> $$
<span class="token keyword">declare</span>
   n <span class="token keyword">integer</span>:<span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
   fib <span class="token keyword">integer</span> :<span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
   counter <span class="token keyword">integer</span> :<span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">;</span> 
   i <span class="token keyword">integer</span> :<span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">;</span> 
   j <span class="token keyword">integer</span> :<span class="token operator">=</span> <span class="token number">1</span> <span class="token punctuation">;</span>
<span class="token keyword">begin</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">&lt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">then</span>
		fib :<span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">;</span>
	<span class="token keyword">end</span> <span class="token keyword">if</span><span class="token punctuation">;</span> 
	<span class="token keyword">loop</span> 
		<span class="token keyword">exit</span> <span class="token keyword">when</span> counter <span class="token operator">=</span> n <span class="token punctuation">;</span> 
		counter :<span class="token operator">=</span> counter <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">;</span> 
		<span class="token keyword">select</span> j<span class="token punctuation">,</span> i <span class="token operator">+</span> j <span class="token keyword">into</span> i<span class="token punctuation">,</span>	j <span class="token punctuation">;</span>
	<span class="token keyword">end</span> <span class="token keyword">loop</span><span class="token punctuation">;</span> 
	fib :<span class="token operator">=</span> i<span class="token punctuation">;</span>
    raise notice <span class="token string">'%'</span><span class="token punctuation">,</span> fib<span class="token punctuation">;</span> 
<span class="token keyword">end</span><span class="token punctuation">;</span> $$
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h3 id="_4-while循环" tabindex="-1"><a class="header-anchor" href="#_4-while循环" aria-hidden="true">#</a> [4]while循环</h3>
<p><code>while</code>循环语句执行代码块，直到条件计算为<code>false</code>。</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token punctuation">[</span> <span class="token operator">&lt;&lt;</span>label<span class="token operator">>></span> <span class="token punctuation">]</span>
<span class="token keyword">while</span> condition <span class="token keyword">loop</span>
   statements<span class="token punctuation">;</span>
<span class="token keyword">end</span> <span class="token keyword">loop</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><strong>示例：（使用<code>while</code>循环语句来显示计数器的值）</strong></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span> $$
<span class="token keyword">declare</span> 
   counter <span class="token keyword">integer</span> :<span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">begin</span>
   <span class="token keyword">while</span> counter <span class="token operator">&lt;</span> <span class="token number">5</span> <span class="token keyword">loop</span>
      raise notice <span class="token string">'Counter %'</span><span class="token punctuation">,</span> counter<span class="token punctuation">;</span>
	  counter :<span class="token operator">=</span> counter <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
   <span class="token keyword">end</span> <span class="token keyword">loop</span><span class="token punctuation">;</span>
<span class="token keyword">end</span>$$<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="_5-for循环" tabindex="-1"><a class="header-anchor" href="#_5-for循环" aria-hidden="true">#</a> [5]for循环</h3>
<p>下面说明了在<code>for</code>整数范围内循环的循环语句的语法：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token punctuation">[</span> <span class="token operator">&lt;&lt;</span>label<span class="token operator">>></span> <span class="token punctuation">]</span>
<span class="token keyword">for</span> loop_counter <span class="token operator">in</span> <span class="token punctuation">[</span> reverse <span class="token punctuation">]</span> <span class="token keyword">from</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token keyword">to</span> <span class="token punctuation">[</span> <span class="token keyword">by</span> step <span class="token punctuation">]</span> <span class="token keyword">loop</span>
    statements
<span class="token keyword">end</span> <span class="token keyword">loop</span> <span class="token punctuation">[</span> label <span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>示例：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span> $$
<span class="token keyword">begin</span>
   <span class="token keyword">for</span> counter <span class="token operator">in</span> <span class="token number">1.</span><span class="token number">.5</span> <span class="token keyword">loop</span>
	raise notice <span class="token string">'counter: %'</span><span class="token punctuation">,</span> counter<span class="token punctuation">;</span>
   <span class="token keyword">end</span> <span class="token keyword">loop</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span> $$
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>NOTICE:  Counter: 1
NOTICE:  Counter: 2
NOTICE:  Counter: 3
NOTICE:  Counter: 4
NOTICE:  Counter: 5
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span> $$
<span class="token keyword">begin</span>
   <span class="token keyword">for</span> counter <span class="token operator">in</span> reverse <span class="token number">5.</span><span class="token number">.1</span> <span class="token keyword">loop</span>
      raise notice <span class="token string">'counter: %'</span><span class="token punctuation">,</span> counter<span class="token punctuation">;</span>
   <span class="token keyword">end</span> <span class="token keyword">loop</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span> $$
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>NOTICE:  Counter: 5
NOTICE:  Counter: 4
NOTICE:  Counter: 3
NOTICE:  Counter: 2
NOTICE:  Counter: 1
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span> $$
<span class="token keyword">begin</span> 
  <span class="token keyword">for</span> counter <span class="token operator">in</span> <span class="token number">1.</span><span class="token number">.6</span> <span class="token keyword">by</span> <span class="token number">2</span> <span class="token keyword">loop</span>
    raise notice <span class="token string">'counter: %'</span><span class="token punctuation">,</span> counter<span class="token punctuation">;</span>
  <span class="token keyword">end</span> <span class="token keyword">loop</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span> $$
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>NOTICE:  Counter 1
NOTICE:  Counter 3
NOTICE:  Counter 5
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="使用-pl-pgsql-for-循环查询结果" tabindex="-1"><a class="header-anchor" href="#使用-pl-pgsql-for-循环查询结果" aria-hidden="true">#</a> 使用 PL/pgSQL for 循环查询结果</h4>
<p>语法：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token punctuation">[</span> <span class="token operator">&lt;&lt;</span>label<span class="token operator">>></span> <span class="token punctuation">]</span>
<span class="token keyword">for</span> target <span class="token operator">in</span> query <span class="token keyword">loop</span>
    statements
<span class="token keyword">end</span> <span class="token keyword">loop</span> <span class="token punctuation">[</span> label <span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>示例：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span>
$$
<span class="token keyword">declare</span>
    f record<span class="token punctuation">;</span>
<span class="token keyword">begin</span>
    <span class="token keyword">for</span> f <span class="token operator">in</span> <span class="token keyword">select</span> title<span class="token punctuation">,</span> length 
	       <span class="token keyword">from</span> film 
	       <span class="token keyword">order</span> <span class="token keyword">by</span> length <span class="token keyword">desc</span><span class="token punctuation">,</span> title
	       <span class="token keyword">limit</span> <span class="token number">10</span> 
    <span class="token keyword">loop</span> 
	raise notice <span class="token string">'%(% mins)'</span><span class="token punctuation">,</span> f<span class="token punctuation">.</span>title<span class="token punctuation">,</span> f<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
    <span class="token keyword">end</span> <span class="token keyword">loop</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
$$
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>NOTICE:  Chicago North(185 mins)
NOTICE:  Control Anthem(185 mins)
NOTICE:  Darn Forrester(185 mins)
NOTICE:  Gangs Pride(185 mins)
NOTICE:  Home Pity(185 mins)
NOTICE:  Muscle Bright(185 mins)
NOTICE:  Pond Seattle(185 mins)
NOTICE:  Soldiers Evolution(185 mins)
NOTICE:  Sweet Brotherhood(185 mins)
NOTICE:  Worst Banger(185 mins)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h4 id="使用-pl-pgsql-for-循环动态查询结果" tabindex="-1"><a class="header-anchor" href="#使用-pl-pgsql-for-循环动态查询结果" aria-hidden="true">#</a> 使用 PL/pgSQL for 循环动态查询结果</h4>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token punctuation">[</span> <span class="token operator">&lt;&lt;</span>label<span class="token operator">>></span> <span class="token punctuation">]</span>
<span class="token keyword">for</span> <span class="token keyword">row</span> <span class="token operator">in</span> <span class="token keyword">execute</span> query_expression <span class="token punctuation">[</span> <span class="token keyword">using</span> query_param <span class="token punctuation">[</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">]</span> <span class="token punctuation">]</span> 
<span class="token keyword">loop</span>
    statements
<span class="token keyword">end</span> <span class="token keyword">loop</span> <span class="token punctuation">[</span> label <span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>示例：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span> $$
<span class="token keyword">declare</span>
    <span class="token comment">-- sort by 1: title, 2: release year</span>
    sort_type <span class="token keyword">smallint</span> :<span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> 
	<span class="token comment">-- return the number of films</span>
	rec_count <span class="token keyword">int</span> :<span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
	<span class="token comment">-- use to iterate over the film</span>
	rec record<span class="token punctuation">;</span>
	<span class="token comment">-- dynamic query</span>
    query <span class="token keyword">text</span><span class="token punctuation">;</span>
<span class="token keyword">begin</span>
		
	query :<span class="token operator">=</span> <span class="token string">'select title, release_year from film '</span><span class="token punctuation">;</span>
	
	<span class="token keyword">if</span> sort_type <span class="token operator">=</span> <span class="token number">1</span> <span class="token keyword">then</span>
		query :<span class="token operator">=</span> query <span class="token operator">||</span> <span class="token string">'order by title'</span><span class="token punctuation">;</span>
	elsif sort_type <span class="token operator">=</span> <span class="token number">2</span> <span class="token keyword">then</span>
	  query :<span class="token operator">=</span> query <span class="token operator">||</span> <span class="token string">'order by release_year'</span><span class="token punctuation">;</span>
	<span class="token keyword">else</span> 
	   raise <span class="token string">'invalid sort type %s'</span><span class="token punctuation">,</span> sort_type<span class="token punctuation">;</span>
	<span class="token keyword">end</span> <span class="token keyword">if</span><span class="token punctuation">;</span>

	query :<span class="token operator">=</span> query <span class="token operator">||</span> <span class="token string">' limit $1'</span><span class="token punctuation">;</span>

	<span class="token keyword">for</span> rec <span class="token operator">in</span> <span class="token keyword">execute</span> query <span class="token keyword">using</span> rec_count
        <span class="token keyword">loop</span>
	     raise notice <span class="token string">'% - %'</span><span class="token punctuation">,</span> rec<span class="token punctuation">.</span>release_year<span class="token punctuation">,</span> rec<span class="token punctuation">.</span>title<span class="token punctuation">;</span>
	<span class="token keyword">end</span> <span class="token keyword">loop</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
$$
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>NOTICE:  2006 - Academy Dinosaur
NOTICE:  2006 - Ace Goldfinger
NOTICE:  2006 - Adaptation Holes
NOTICE:  2006 - Affair Prejudice
NOTICE:  2006 - African Egg
NOTICE:  2006 - Agent Truman
NOTICE:  2006 - Airplane Sierra
NOTICE:  2006 - Airport Pollock
NOTICE:  2006 - Alabama Devil
NOTICE:  2006 - Aladdin Calendar
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="_6-exit" tabindex="-1"><a class="header-anchor" href="#_6-exit" aria-hidden="true">#</a> [6]exit</h3>
<p>该<code>exit</code>语句允许您终止循环，包括无loop循环、while 循环和for 循环</p>
<p>语法：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>exit [label] [when boolean_expression]
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><blockquote>
<p>如果不使用标签，<code>exit</code>语句将终止当前循环</p>
</blockquote>
<p>以下语句是等效的：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>exit when counter > 10;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if counter > 10 then
   exit;
end if;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><code>exit when</code>绝对更干净，更短</p>
<p><strong>示例：</strong></p>
<h4 id="_1-使用-pl-pgsql-exit-语句终止loop" tabindex="-1"><a class="header-anchor" href="#_1-使用-pl-pgsql-exit-语句终止loop" aria-hidden="true">#</a> 1) 使用 PL/pgSQL Exit 语句终止loop</h4>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span>
$$
<span class="token keyword">declare</span> 
   i <span class="token keyword">int</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
   j <span class="token keyword">int</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">begin</span>
  <span class="token operator">&lt;&lt;</span>outer_loop<span class="token operator">>></span>
  <span class="token keyword">loop</span> 
     i <span class="token operator">=</span> i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
     <span class="token keyword">exit</span> <span class="token keyword">when</span> i <span class="token operator">></span> <span class="token number">3</span><span class="token punctuation">;</span>
	 <span class="token comment">-- inner loop</span>
	 j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
     <span class="token operator">&lt;&lt;</span>inner_loop<span class="token operator">>></span>
     <span class="token keyword">loop</span> 
		j <span class="token operator">=</span> j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
		<span class="token keyword">exit</span> <span class="token keyword">when</span> j <span class="token operator">></span> <span class="token number">3</span><span class="token punctuation">;</span>
		raise notice <span class="token string">'(i,j): (%,%)'</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> j<span class="token punctuation">;</span>
	 <span class="token keyword">end</span> <span class="token keyword">loop</span> inner_loop<span class="token punctuation">;</span>
  <span class="token keyword">end</span> <span class="token keyword">loop</span> outer_loop<span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
$$
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>NOTICE:  (i,j): (1,1)
NOTICE:  (i,j): (1,2)
NOTICE:  (i,j): (1,3)
NOTICE:  (i,j): (2,1)
NOTICE:  (i,j): (2,2)
NOTICE:  (i,j): (2,3)
NOTICE:  (i,j): (3,1)
NOTICE:  (i,j): (3,2)
NOTICE:  (i,j): (3,3)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="_2-使用-pl-pgsql-exit-语句退出一个块" tabindex="-1"><a class="header-anchor" href="#_2-使用-pl-pgsql-exit-语句退出一个块" aria-hidden="true">#</a> 2) 使用 PL/pgSQL Exit 语句退出一个块</h4>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span>
$$
<span class="token keyword">begin</span>
  
  <span class="token operator">&lt;&lt;</span>simple_block<span class="token operator">>></span>  
   <span class="token keyword">begin</span>
  	 <span class="token keyword">exit</span> simple_block<span class="token punctuation">;</span>
         <span class="token comment">-- for demo purposes</span>
	 raise notice <span class="token string">'%'</span><span class="token punctuation">,</span> <span class="token string">'unreachable!'</span><span class="token punctuation">;</span>
   <span class="token keyword">end</span><span class="token punctuation">;</span>
   raise notice <span class="token string">'%'</span><span class="token punctuation">,</span> <span class="token string">'End of block'</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
$$
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>NOTICE:  End of block
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_7-continue" tabindex="-1"><a class="header-anchor" href="#_7-continue" aria-hidden="true">#</a> [7]continue</h3>
<p><code>continue</code>语句跳过某次循环的当前迭代并跳转到下一个迭代</p>
<p>该<code>continue</code>语句可用于各种循环，包括无条件循环、while 循环)和for 循环</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>continue [loop_label] [when condition]
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><blockquote>
<p><code>loop_label</code>和<code>when condition</code>是可选的</p>
</blockquote>
<p>示例：</p>
<p>以下示例使用<code>continue</code>无条件循环中的语句打印出 1 到 10 的奇数：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span>
$$
<span class="token keyword">declare</span>
   counter <span class="token keyword">int</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">begin</span>
  <span class="token keyword">loop</span>
     counter <span class="token operator">=</span> counter <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
	 <span class="token comment">-- exit the loop if counter > 10</span>
	 <span class="token keyword">exit</span> <span class="token keyword">when</span> counter <span class="token operator">></span> <span class="token number">10</span><span class="token punctuation">;</span>
	 <span class="token comment">-- skip the current iteration if counter is an even number</span>
	 <span class="token keyword">continue</span> <span class="token keyword">when</span> <span class="token function">mod</span><span class="token punctuation">(</span>counter<span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
	 <span class="token comment">-- print out the counter</span>
	 raise notice <span class="token string">'%'</span><span class="token punctuation">,</span> counter<span class="token punctuation">;</span>
  <span class="token keyword">end</span> <span class="token keyword">loop</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
$$
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>输出：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>NOTICE:  1
NOTICE:  3
NOTICE:  5
NOTICE:  7
NOTICE:  9
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="_7-用户自定义函数" tabindex="-1"><a class="header-anchor" href="#_7-用户自定义函数" aria-hidden="true">#</a> 7.用户自定义函数</h2>
<h3 id="_1-创建函数" tabindex="-1"><a class="header-anchor" href="#_1-创建函数" aria-hidden="true">#</a> [1]创建函数</h3>
<p>用户可以使用create function定义一个新的函数</p>
<p><strong>语法：</strong></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token punctuation">[</span><span class="token operator">or</span> <span class="token keyword">replace</span><span class="token punctuation">]</span> <span class="token keyword">function</span> function_name<span class="token punctuation">(</span>param_list<span class="token punctuation">)</span>
   <span class="token keyword">returns</span> return_type 
   <span class="token keyword">language</span> plpgsql
  <span class="token keyword">as</span>
$$
<span class="token keyword">declare</span> 
<span class="token comment">-- variable declaration</span>
<span class="token keyword">begin</span>
 <span class="token comment">-- logic</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
$$
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><blockquote>
<ul>
<li>使用<code>language plpgsql</code>指定函数的过程语言。请注意，PostgreSQL 支持许多过程语言，而不仅仅是<code>plpgsql</code></li>
<li>最后使用$$在函数后面定义一个块</li>
</ul>
</blockquote>
<p><strong>示例：</strong></p>
<p>创建了一个函数来计算长度在<code>len_from</code>和<code>len_to</code>参数之间的电影</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">function</span> get_film_count<span class="token punctuation">(</span>len_from <span class="token keyword">int</span><span class="token punctuation">,</span> len_to <span class="token keyword">int</span><span class="token punctuation">)</span>
<span class="token keyword">returns</span> <span class="token keyword">int</span>
<span class="token keyword">language</span> plpgsql
<span class="token keyword">as</span>
$$
<span class="token keyword">declare</span>
   film_count <span class="token keyword">integer</span><span class="token punctuation">;</span>
<span class="token keyword">begin</span>
   <span class="token keyword">select</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> 
   <span class="token keyword">into</span> film_count
   <span class="token keyword">from</span> film
   <span class="token keyword">where</span> length <span class="token operator">between</span> len_from <span class="token operator">and</span> len_to<span class="token punctuation">;</span>
   
   <span class="token keyword">return</span> film_count<span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
$$<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><blockquote>
<ul>
<li>
<p>该函数<code>get_film_count</code>有两个主要部分：标题和正文</p>
</li>
<li>
<p>在块的末尾，使用<code>return</code>语句返回<code>film_count</code>给函数
<img src="https://img-blog.csdnimg.cn/ff899a3995e34b4d951c8e6b4dffcbf4.png" alt="在这里插入图片描述"></p>
</li>
</ul>
</blockquote>
<p>调用用户自定义函数：</p>
<p>PostgreSQL 为您提供了三种调用用户定义函数的方法：</p>
<ul>
<li>使用位置符号</li>
<li>使用命名符号</li>
<li>使用混合符号。</li>
</ul>
<p><strong>1) 使用位置符号</strong></p>
<p>要使用位置符号调用函数，您需要以与参数相同的顺序指定参数。例如：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> get_film_count<span class="token punctuation">(</span><span class="token number">40</span><span class="token punctuation">,</span><span class="token number">90</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>输出：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code> get_film_count
----------------
            325
(1 row)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><strong>2) 使用命名符号</strong></p>
<p>下面显示了如何<code>get_film_count</code>使用位置表示法调用函数：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> get_film_count<span class="token punctuation">(</span>
    len_from <span class="token operator">=</span><span class="token operator">></span> <span class="token number">40</span><span class="token punctuation">,</span> 
     len_to <span class="token operator">=</span><span class="token operator">></span> <span class="token number">90</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>输出：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code> get_film_count
----------------
            325
(1 row)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>在命名符号中，您使用<code>=&gt;</code>分隔参数的名称和它的值。</p>
<p>为了向后兼容，PostgreSQL 支持基于<code>:=</code>以下的旧语法：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> get_film_count<span class="token punctuation">(</span>
    len_from :<span class="token operator">=</span> <span class="token number">40</span><span class="token punctuation">,</span> 
    len_to :<span class="token operator">=</span> <span class="token number">90</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><strong>3) 使用混合符号</strong></p>
<p>混合符号是位置符号和命名符号的组合。例如：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> get_film_count<span class="token punctuation">(</span><span class="token number">40</span><span class="token punctuation">,</span> len_to <span class="token operator">=</span><span class="token operator">></span> <span class="token number">90</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>请注意，您不能在位置参数之前使用命名参数，如下所示：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> get_film_count<span class="token punctuation">(</span>len_from <span class="token operator">=</span><span class="token operator">></span> <span class="token number">40</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>错误：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ERROR:  positional argument cannot follow named argument
LINE <span class="token number">1</span>: <span class="token keyword">select</span> get_film_count<span class="token punctuation">(</span>len_from <span class="token operator">=</span><span class="token operator">></span> <span class="token number">40</span>, <span class="token number">90</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="_2-函数参数模式" tabindex="-1"><a class="header-anchor" href="#_2-函数参数模式" aria-hidden="true">#</a> [2]函数参数模式</h3>
<p>参数模式决定了参数的行为。PL/pgSQL 支持三种参数模式：<code>in</code>、<code>out</code>和<code>inout</code>. 如果您未明确指定参数，则默认情况下采用<code>in</code>模式</p>
<table>
<thead>
<tr>
<th style="text-align:left">in</th>
<th style="text-align:left">out</th>
<th style="text-align:left">inout</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">默认</td>
<td style="text-align:left">明确指定</td>
<td style="text-align:left">明确指定</td>
</tr>
<tr>
<td style="text-align:left">将值传递给函数</td>
<td style="text-align:left">从函数返回一个值</td>
<td style="text-align:left">将值传递给函数并返回更新的值。</td>
</tr>
<tr>
<td style="text-align:left"><code>in</code>参数的作用类似于常量</td>
<td style="text-align:left"><code>out</code>参数就像未初始化的变量</td>
<td style="text-align:left"><code>inout</code>参数就像一个初始化的变量</td>
</tr>
<tr>
<td style="text-align:left">无法赋值</td>
<td style="text-align:left">必须赋值</td>
<td style="text-align:left">应该赋值</td>
</tr>
</tbody>
</table>
<h4 id="_1-in模式" tabindex="-1"><a class="header-anchor" href="#_1-in模式" aria-hidden="true">#</a> 1）in模式</h4>
<p>示例：以下函数通过 id 查找电影并返回电影的标题：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token operator">or</span> <span class="token keyword">replace</span> <span class="token keyword">function</span> find_film_by_id<span class="token punctuation">(</span>p_film_id <span class="token keyword">int</span><span class="token punctuation">)</span>
<span class="token keyword">returns</span> <span class="token keyword">varchar</span>
<span class="token keyword">language</span> plpgsql
<span class="token keyword">as</span> $$
<span class="token keyword">declare</span>
   film_title film<span class="token punctuation">.</span>title<span class="token operator">%</span><span class="token keyword">type</span><span class="token punctuation">;</span>
<span class="token keyword">begin</span>
  <span class="token comment">-- find film title by id</span>
  <span class="token keyword">select</span> title 
  <span class="token keyword">into</span> film_title
  <span class="token keyword">from</span> film
  <span class="token keyword">where</span> film_id <span class="token operator">=</span> p_film_id<span class="token punctuation">;</span>
  
  <span class="token keyword">if</span> <span class="token operator">not</span> found <span class="token keyword">then</span>
     raise <span class="token string">'Film with id % not found'</span><span class="token punctuation">,</span> p_film_id<span class="token punctuation">;</span>
  <span class="token keyword">end</span> <span class="token keyword">if</span><span class="token punctuation">;</span>
  
  <span class="token keyword">return</span> title<span class="token punctuation">;</span>
  
<span class="token keyword">end</span><span class="token punctuation">;</span>$$
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><blockquote>
<p>因为我们没有指定<code>p_film_id</code>参数的模式，所以它<code>in</code>默认采用模式。</p>
</blockquote>
<h4 id="_2-out模式" tabindex="-1"><a class="header-anchor" href="#_2-out模式" aria-hidden="true">#</a> 2）out模式</h4>
<p>将参数作为输出</p>
<p><code>out</code>参数在需要返回多个值的函数中非常有用。</p>
<p>示例：（定义了<code>get_film_stat</code>具有三个<code>out</code>参数的函数）</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token operator">or</span> <span class="token keyword">replace</span> <span class="token keyword">function</span> get_film_stat<span class="token punctuation">(</span>
    <span class="token keyword">out</span> min_len <span class="token keyword">int</span><span class="token punctuation">,</span>
    <span class="token keyword">out</span> max_len <span class="token keyword">int</span><span class="token punctuation">,</span>
    <span class="token keyword">out</span> avg_len <span class="token keyword">numeric</span><span class="token punctuation">)</span> 
<span class="token keyword">language</span> plpgsql
<span class="token keyword">as</span> $$
<span class="token keyword">begin</span>  
  <span class="token keyword">select</span> <span class="token function">min</span><span class="token punctuation">(</span>length<span class="token punctuation">)</span><span class="token punctuation">,</span>
         <span class="token function">max</span><span class="token punctuation">(</span>length<span class="token punctuation">)</span><span class="token punctuation">,</span>
		 <span class="token function">avg</span><span class="token punctuation">(</span>length<span class="token punctuation">)</span>::<span class="token keyword">numeric</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token keyword">into</span> min_len<span class="token punctuation">,</span> max_len<span class="token punctuation">,</span> avg_len
  <span class="token keyword">from</span> film<span class="token punctuation">;</span>

<span class="token keyword">end</span><span class="token punctuation">;</span>$$
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> get_film_stat<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/78bfbc40a9304f6c9efe3e91765eae7c.png" alt="在这里插入图片描述"></p>
<p>该函数的输出是一条记录。要将输出分隔为列，请使用以下语句：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> get_film_stat<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/e666adb3da20489a8df4b973879e8eb8.png" alt="在这里插入图片描述"></p>
<h4 id="_3-inout模式" tabindex="-1"><a class="header-anchor" href="#_3-inout模式" aria-hidden="true">#</a> 3）inout模式</h4>
<p><code>inout</code>模式是组合<code>in</code>和<code>out</code>模式。</p>
<p>这意味着调用者可以将参数传递给函数。该函数更改参数并返回更新后的值。</p>
<p>以下<code>swap</code>函数接受两个整数及其值：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token operator">or</span> <span class="token keyword">replace</span> <span class="token keyword">function</span> swap<span class="token punctuation">(</span>
	<span class="token keyword">inout</span> x <span class="token keyword">int</span><span class="token punctuation">,</span>
	<span class="token keyword">inout</span> y <span class="token keyword">int</span>
<span class="token punctuation">)</span> 
<span class="token keyword">language</span> plpgsql	
<span class="token keyword">as</span> $$
<span class="token keyword">begin</span>
   <span class="token keyword">select</span> x<span class="token punctuation">,</span>y <span class="token keyword">into</span> y<span class="token punctuation">,</span>x<span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span> $$<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>调用函数：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> swap<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/f7fc0a922f184d5eaf84ffa0fbf0c3df.png" alt="在这里插入图片描述"></p>
<h3 id="_3-函数重载" tabindex="-1"><a class="header-anchor" href="#_3-函数重载" aria-hidden="true">#</a> [3]函数重载</h3>
<p>PostgreSQL 允许多个函数共享相同的名称，只要它们具有不同的参数</p>
<p>如果两个或多个函数共享相同的名称，则函数名称将被重载</p>
<p>当您可以调用重载函数时，PostgreSQL 会根据函数参数列表选择最佳候选函数来执行。</p>
<p>以下<code>get_rental_duration()</code>函数返回指定客户的总租赁天数：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token operator">or</span> <span class="token keyword">replace</span> <span class="token keyword">function</span> get_rental_duration<span class="token punctuation">(</span>
	p_customer_id <span class="token keyword">integer</span>
<span class="token punctuation">)</span>
<span class="token keyword">returns</span> <span class="token keyword">integer</span> 
<span class="token keyword">language</span> plpgsql
<span class="token keyword">as</span> $$
<span class="token keyword">declare</span> 
	rental_duration <span class="token keyword">integer</span><span class="token punctuation">;</span> 
<span class="token keyword">begin</span>
	<span class="token keyword">select</span> 
		<span class="token function">sum</span><span class="token punctuation">(</span> extract<span class="token punctuation">(</span><span class="token keyword">day</span> <span class="token keyword">from</span> return_date <span class="token operator">-</span> rental_date<span class="token punctuation">)</span><span class="token punctuation">)</span> 
	<span class="token keyword">into</span> rental_duration 
    <span class="token keyword">from</span> rental 
	<span class="token keyword">where</span> customer_id <span class="token operator">=</span> p_customer_id<span class="token punctuation">;</span>

	<span class="token keyword">return</span> rental_duration<span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span> $$
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>该<code>get_rental_function</code>函数具有<code>p_customer_id</code>作为<code>in</code>参数。</p>
<p>以下返回客户 id 232 的租赁天数：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>SELECT get_rental_duration(232);
 get_rental_duration
---------------------
                  90
(1 row)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>假设您想了解客户从特定日期到现在的租赁期限。</p>
<p>为此，您可以<code>p_from_date</code>在<code>get_retal_duration()</code>函数中再添加一个参数。或者您可以开发一个具有相同名称但有两个参数的新函数，如下所示：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token operator">or</span> <span class="token keyword">replace</span> <span class="token keyword">function</span> get_rental_duration<span class="token punctuation">(</span>
	p_customer_id <span class="token keyword">integer</span><span class="token punctuation">,</span> 
	p_from_date <span class="token keyword">date</span>
<span class="token punctuation">)</span>
<span class="token keyword">returns</span> <span class="token keyword">integer</span> 
<span class="token keyword">language</span> plpgsql
<span class="token keyword">as</span> $$
<span class="token keyword">declare</span> 
	rental_duration <span class="token keyword">integer</span><span class="token punctuation">;</span>
<span class="token keyword">begin</span>
	<span class="token comment">-- get the rental duration based on customer_id </span>
	<span class="token comment">-- and rental date</span>
	<span class="token keyword">select</span> <span class="token function">sum</span><span class="token punctuation">(</span> extract<span class="token punctuation">(</span> <span class="token keyword">day</span> <span class="token keyword">from</span> return_date <span class="token operator">+</span> <span class="token string">'12:00:00'</span> <span class="token operator">-</span> rental_date<span class="token punctuation">)</span><span class="token punctuation">)</span> 
	<span class="token keyword">into</span> rental_duration
	<span class="token keyword">from</span> rental 
	<span class="token keyword">where</span> customer_id <span class="token operator">=</span> p_customer_id <span class="token operator">and</span> 
		  rental_date <span class="token operator">>=</span> p_from_date<span class="token punctuation">;</span>
	
	<span class="token comment">-- return the rental duration in days</span>
	<span class="token keyword">return</span> rental_duration<span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span> $$

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>此函数与第一个函数同名，只是它有两个参数。</p>
<p>换句话说，<code>get_rental_duration(integer)</code> 函数被函数重载了<code>get_rental_duration(integer,date)</code>。</p>
<p>以下语句返回客户 ID 的租用期限，<code>232</code>因为<code>July 1st 2005</code>：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>SELECT get_rental_duration(232,'2005-07-01');代码语言： SQL（结构化查询语言） （sql ）
 get_rental_duration
---------------------
                  85
(1 row)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>请注意，如果您省略第二个参数，PostgreSQL 将调用<code>get_rental_duration(integer)</code>具有一个参数的函数。</p>
<h4 id="函数重载和默认值" tabindex="-1"><a class="header-anchor" href="#函数重载和默认值" aria-hidden="true">#</a> 函数重载和默认值</h4>
<p>在<code>get_rental_duration(integer,date)</code>函数中，如果要为第二个参数设置默认值，如下所示：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token operator">or</span> <span class="token keyword">replace</span> <span class="token keyword">function</span> get_rental_duration<span class="token punctuation">(</span>
	p_customer_id <span class="token keyword">integer</span><span class="token punctuation">,</span> 
	p_from_date <span class="token keyword">date</span> <span class="token keyword">default</span> <span class="token string">'2005-01-01'</span>
<span class="token punctuation">)</span>
<span class="token keyword">returns</span> <span class="token keyword">integer</span>
<span class="token keyword">language</span> plpgsql
<span class="token keyword">as</span> $$
<span class="token keyword">declare</span> 
	rental_duration <span class="token keyword">integer</span><span class="token punctuation">;</span>
<span class="token keyword">begin</span>
	<span class="token keyword">select</span> <span class="token function">sum</span><span class="token punctuation">(</span> 
		extract<span class="token punctuation">(</span> <span class="token keyword">day</span> <span class="token keyword">from</span> return_date <span class="token operator">+</span> <span class="token string">'12:00:00'</span> <span class="token operator">-</span> rental_date<span class="token punctuation">)</span>
	<span class="token punctuation">)</span> 
	<span class="token keyword">into</span> rental_duration
	<span class="token keyword">from</span> rental 
	<span class="token keyword">where</span> customer_id<span class="token operator">=</span> p_customer_id <span class="token operator">and</span> 
		  rental_date <span class="token operator">>=</span> p_from_date<span class="token punctuation">;</span>
	 
	<span class="token keyword">return</span> rental_duration<span class="token punctuation">;</span>

<span class="token keyword">end</span><span class="token punctuation">;</span> $$代码语言： <span class="token keyword">SQL</span>（结构化查询语言） （<span class="token keyword">sql</span> ）
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>以下调用该<code>get_rental_duration()</code>函数并传递客户 ID 232：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> get_rental_duration<span class="token punctuation">(</span><span class="token number">232</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>PostgreSQL 发出错误：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ERROR:  function get_rental_duration(integer) is not unique
LINE 1: SELECT get_rental_duration(232);
               ^
HINT:  Could not choose the best candidate function. You might need to add explicit type casts.
SQL state: 42725
Character: 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>在这种情况下，PostgreSQL 无法选择最佳候选函数来执行</p>
<p>在这种情况下，您具有三个功能：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>get_rental_duration(p_customer_id integer);
get_rental_duration(p_customer_id integer, p_from_date date)
get_rental_duration(p_customer_id integer, p_from_date date default '2005-01-01'
)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>PostgreSQL 不知道应该执行第一个函数还是第三个函数</p>
<p>所以：当你重载一个函数时，你应该总是让它们的参数列表是唯一的</p>
<h3 id="_4-返回表的函数" tabindex="-1"><a class="header-anchor" href="#_4-返回表的函数" aria-hidden="true">#</a> [4]返回表的函数</h3>
<p>要定义返回表的函数，请使用以下形式的create function语句：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token operator">or</span> <span class="token keyword">replace</span> <span class="token keyword">function</span> function_name <span class="token punctuation">(</span>
   parameter_list
<span class="token punctuation">)</span> 
<span class="token keyword">returns</span> <span class="token keyword">table</span> <span class="token punctuation">(</span> column_list <span class="token punctuation">)</span> 
<span class="token keyword">language</span> plpgsql
<span class="token keyword">as</span> $$
<span class="token keyword">declare</span> 
<span class="token comment">-- variable declaration</span>
<span class="token keyword">begin</span>
<span class="token comment">-- body</span>
<span class="token keyword">end</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>此语法允许您返回具有指定列列表的表，而不是返回单个值：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>returns table ( column_list )
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>使用<code>film</code>表进行演示：（使用了ILIKE 运算符返回其标题与特定模式匹配的所有电影）</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token operator">or</span> <span class="token keyword">replace</span> <span class="token keyword">function</span> get_film <span class="token punctuation">(</span>
  p_pattern <span class="token keyword">varchar</span>
<span class="token punctuation">)</span> 
	<span class="token keyword">returns</span> <span class="token keyword">table</span> <span class="token punctuation">(</span>
		film_title <span class="token keyword">varchar</span><span class="token punctuation">,</span>
		film_release_year <span class="token keyword">int</span>
	<span class="token punctuation">)</span> 
	<span class="token keyword">language</span> plpgsql
<span class="token keyword">as</span> $$
<span class="token keyword">begin</span>
	<span class="token keyword">return</span> query 
		<span class="token keyword">select</span>
			title<span class="token punctuation">,</span>
			release_year::<span class="token keyword">integer</span>
		<span class="token keyword">from</span>
			film
		<span class="token keyword">where</span>
			title <span class="token operator">ilike</span> p_pattern<span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>$$
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><blockquote>
<ul>
<li>
<p>这<code>get_film(varchar)</code>接受一个参数，该参数<code>p_pattern</code>是您想要与电影标题匹配的模式</p>
</li>
<li>
<p>该函数返回一个查询，该查询是 select 语句的结果</p>
</li>
<li>
<p>集中的列的数据类型必须与<code>returns table</code>子句后定义的表中的列相同</p>
</li>
</ul>
</blockquote>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> get_film <span class="token punctuation">(</span><span class="token string">'Al%'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/592e816e3ac0438cb28c96c4f73c9c79.png" alt="在这里插入图片描述"></p>
<p>在实践中，您通常在将每一行附加到函数的结果集中之前对其进行处理：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token operator">or</span> <span class="token keyword">replace</span> <span class="token keyword">function</span> get_film <span class="token punctuation">(</span>
	p_pattern <span class="token keyword">varchar</span><span class="token punctuation">,</span>
	p_year <span class="token keyword">int</span>
<span class="token punctuation">)</span> 
<span class="token keyword">returns</span> <span class="token keyword">table</span> <span class="token punctuation">(</span>
	film_title <span class="token keyword">varchar</span><span class="token punctuation">,</span>
	film_release_year <span class="token keyword">int</span>
<span class="token punctuation">)</span> 
<span class="token keyword">language</span> plpgsql
<span class="token keyword">as</span> $$
<span class="token keyword">declare</span> 
    var_r record<span class="token punctuation">;</span>
<span class="token keyword">begin</span>
	<span class="token keyword">for</span> var_r <span class="token operator">in</span><span class="token punctuation">(</span>
            <span class="token keyword">select</span> title<span class="token punctuation">,</span> release_year 
            <span class="token keyword">from</span> film 
	     <span class="token keyword">where</span> title <span class="token operator">ilike</span> p_pattern <span class="token operator">and</span> 
		    release_year <span class="token operator">=</span> p_year
        <span class="token punctuation">)</span> <span class="token keyword">loop</span>  film_title :<span class="token operator">=</span> upper<span class="token punctuation">(</span>var_r<span class="token punctuation">.</span>title<span class="token punctuation">)</span> <span class="token punctuation">;</span> 
		film_release_year :<span class="token operator">=</span> var_r<span class="token punctuation">.</span>release_year<span class="token punctuation">;</span>
           <span class="token keyword">return</span> <span class="token keyword">next</span><span class="token punctuation">;</span>
	<span class="token keyword">end</span> <span class="token keyword">loop</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span> $$ 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>在这个例子中，我们创建了<code>get_film(varchar,int)</code>接受两个参数的：</p>
<ul>
<li><code>p_pattern</code>用于搜索电影。</li>
<li><code>p_year</code> 是电影的发行年份。</li>
</ul>
<p>在函数体中，我们使用<code>for loop</code>语句逐行处理查询。</p>
<p>该<code>return next</code>语句将一行添加到函数的返回表中。</p>
<p>下面说明如何调用该<code>get_film()</code>函数：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> get_film <span class="token punctuation">(</span><span class="token string">'%er'</span><span class="token punctuation">,</span> <span class="token number">2006</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/3e4387f73e4a4519affff82d60ce2164.png" alt="在这里插入图片描述"></p>
<h3 id="_5-删除函数" tabindex="-1"><a class="header-anchor" href="#_5-删除函数" aria-hidden="true">#</a> [5]删除函数</h3>
<p>删除语法：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">drop</span> <span class="token keyword">function</span> <span class="token punctuation">[</span><span class="token keyword">if</span> <span class="token keyword">exists</span><span class="token punctuation">]</span> function_name<span class="token punctuation">(</span>argument_list<span class="token punctuation">)</span>
<span class="token punctuation">[</span><span class="token keyword">cascade</span> <span class="token operator">|</span> <span class="token keyword">restrict</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><blockquote>
<ul>
<li>当函数有任何依赖对象（例如操作符或触发器）时，不能直接删除该函数。</li>
<li>要删除函数及其依赖对象，您需要指定<code>cascade</code>选项。<code>drop function</code>with选项将<code>cacade</code>递归地删除函数、它的依赖对象以及依赖于这些对象的对象，依此类推。</li>
<li>默认情况下，该<code>drop function</code>语句使用<code>restrict</code>当函数具有任何依赖对象时拒绝删除函数的选项。</li>
</ul>
</blockquote>
<p>要使用单个语句删除多个函数，请在关键字<code>drop function</code>后指定一个以逗号分隔的函数名称列表，如下所示：<code>drop function</code></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">drop</span> <span class="token keyword">function</span> <span class="token punctuation">[</span><span class="token keyword">if</span> <span class="token keyword">exists</span><span class="token punctuation">]</span> function1<span class="token punctuation">,</span> function2<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="_8-异常处理" tabindex="-1"><a class="header-anchor" href="#_8-异常处理" aria-hidden="true">#</a> 8.异常处理</h2>
<p>学习如何在 PL/pgSQL 中捕获 PostgreSQL 异常</p>
<p>当块中发生错误时，PostgreSQL 将中止块的执行以及周围的事务。</p>
<p>要从错误中恢复，您可以使用块<code>exception</code>中的子句<code>begin...end</code>。</p>
<p>下面说明了<code>exception</code>子句的语法：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token operator">&lt;&lt;</span>label<span class="token operator">>></span>
<span class="token keyword">declare</span>
<span class="token keyword">begin</span>
    statements<span class="token punctuation">;</span>
exception
    <span class="token keyword">when</span> condition <span class="token punctuation">[</span><span class="token operator">or</span> condition<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span> <span class="token keyword">then</span>
       handle_exception<span class="token punctuation">;</span>
   <span class="token punctuation">[</span><span class="token keyword">when</span> condition <span class="token punctuation">[</span><span class="token operator">or</span> condition<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span> <span class="token keyword">then</span>
       handle_exception<span class="token punctuation">;</span><span class="token punctuation">]</span>
   <span class="token punctuation">[</span><span class="token keyword">when</span> others <span class="token keyword">then</span>
       handle_other_exceptions<span class="token punctuation">;</span>
   <span class="token punctuation">]</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p><strong>示例：</strong></p>
<h3 id="_1-处理-no-data-found-异常示例" tabindex="-1"><a class="header-anchor" href="#_1-处理-no-data-found-异常示例" aria-hidden="true">#</a> [1]处理 no_data_found 异常示例</h3>
<p>以下示例发出错误，因为 id 为 2000 的电影不存在。</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span>
$$
<span class="token keyword">declare</span>
	rec record<span class="token punctuation">;</span>
	v_film_id <span class="token keyword">int</span> <span class="token operator">=</span> <span class="token number">2000</span><span class="token punctuation">;</span>
<span class="token keyword">begin</span>
	<span class="token comment">-- select a film </span>
	<span class="token keyword">select</span> film_id<span class="token punctuation">,</span> title 
	<span class="token keyword">into</span> strict rec
	<span class="token keyword">from</span> film
	<span class="token keyword">where</span> film_id <span class="token operator">=</span> v_film_id<span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
$$
<span class="token keyword">language</span> plpgsql<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>输出：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ERROR:  query returned no rows
CONTEXT:  PL/pgSQL function inline_code_block line 6 at SQL statement
SQL state: P0002代码语言： Shell Session  （shell ）
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>以下示例使用该<code>exception</code>子句捕获<code>no_data_found</code>异常并报告更有意义的消息：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span>
$$
<span class="token keyword">declare</span>
	rec record<span class="token punctuation">;</span>
	v_film_id <span class="token keyword">int</span> <span class="token operator">=</span> <span class="token number">2000</span><span class="token punctuation">;</span>
<span class="token keyword">begin</span>
	<span class="token comment">-- select a film </span>
	<span class="token keyword">select</span> film_id<span class="token punctuation">,</span> title 
	<span class="token keyword">into</span> strict rec
	<span class="token keyword">from</span> film
	<span class="token keyword">where</span> film_id <span class="token operator">=</span> v_film_id<span class="token punctuation">;</span>
        <span class="token comment">-- catch exception</span>
	exception 
	   <span class="token keyword">when</span> no_data_found <span class="token keyword">then</span> 
	      raise exception <span class="token string">'film % not found'</span><span class="token punctuation">,</span> v_film_id<span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
$$
<span class="token keyword">language</span> plpgsql<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>输出：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ERROR:  film 2000 not found
CONTEXT:  PL/pgSQL function inline_code_block line 14 at RAISE
SQL state: P0001
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="_2-处理-too-many-rows-异常示例" tabindex="-1"><a class="header-anchor" href="#_2-处理-too-many-rows-异常示例" aria-hidden="true">#</a> [2]处理 too_many_rows 异常示例</h3>
<p>以下示例说明了如何处理<code>too_many_rows</code>异常：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span>
$$
<span class="token keyword">declare</span>
	rec record<span class="token punctuation">;</span>
<span class="token keyword">begin</span>
	<span class="token comment">-- select film </span>
	<span class="token keyword">select</span> film_id<span class="token punctuation">,</span> title 
	<span class="token keyword">into</span> strict rec
	<span class="token keyword">from</span> film
	<span class="token keyword">where</span> title <span class="token operator">LIKE</span> <span class="token string">'A%'</span><span class="token punctuation">;</span>
	
	exception 
	   <span class="token keyword">when</span> too_many_rows <span class="token keyword">then</span>
	      raise exception <span class="token string">'Search query returns too many rows'</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
$$
<span class="token keyword">language</span> plpgsql<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>输出：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ERROR:  Search query returns too many rows
CONTEXT:  PL/pgSQL function inline_code_block line 15 at RAISE
SQL state: P0001
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>在此示例中，<code>too_many_rows</code>发生异常是因为该<code>select into</code>语句返回多行，而它应该返回一行。</p>
<h3 id="_3-处理多个异常" tabindex="-1"><a class="header-anchor" href="#_3-处理多个异常" aria-hidden="true">#</a> [3]处理多个异常</h3>
<p>以下示例说明了如何捕获多个异常：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span>
$$
<span class="token keyword">declare</span>
	rec record<span class="token punctuation">;</span>
	v_length <span class="token keyword">int</span> <span class="token operator">=</span> <span class="token number">90</span><span class="token punctuation">;</span>
<span class="token keyword">begin</span>
	<span class="token comment">-- select a film </span>
	<span class="token keyword">select</span> film_id<span class="token punctuation">,</span> title 
	<span class="token keyword">into</span> strict rec
	<span class="token keyword">from</span> film
	<span class="token keyword">where</span> length <span class="token operator">=</span> v_length<span class="token punctuation">;</span>
	
        <span class="token comment">-- catch exception</span>
	exception 
	   <span class="token keyword">when</span> sqlstate <span class="token string">'P0002'</span> <span class="token keyword">then</span> 
	      raise exception <span class="token string">'film with length % not found'</span><span class="token punctuation">,</span> v_length<span class="token punctuation">;</span>
	   <span class="token keyword">when</span> sqlstate <span class="token string">'P0003'</span> <span class="token keyword">then</span> 
	      raise exception <span class="token string">'The with length % is not unique'</span><span class="token punctuation">,</span> v_length<span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
$$
<span class="token keyword">language</span> plpgsql<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>输出：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ERROR:  The with length 90 is not unique
CONTEXT:  PL/pgSQL function inline_code_block line 17 at RAISE
SQL state: P0001
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="_4-将异常处理为-sqlstate-代码" tabindex="-1"><a class="header-anchor" href="#_4-将异常处理为-sqlstate-代码" aria-hidden="true">#</a> [4]将异常处理为 SQLSTATE 代码</h3>
<p>以下示例与上面的示例相同，只是它使用<code>SQLSTATE</code>代码而不是条件名称：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">do</span>
$$
<span class="token keyword">declare</span>
	rec record<span class="token punctuation">;</span>
	v_length <span class="token keyword">int</span> <span class="token operator">=</span> <span class="token number">30</span><span class="token punctuation">;</span>
<span class="token keyword">begin</span>
	<span class="token comment">-- select a film </span>
	<span class="token keyword">select</span> film_id<span class="token punctuation">,</span> title 
	<span class="token keyword">into</span> strict rec
	<span class="token keyword">from</span> film
	<span class="token keyword">where</span> length <span class="token operator">=</span> v_length<span class="token punctuation">;</span>
	
        <span class="token comment">-- catch exception</span>
	exception 
	   <span class="token keyword">when</span> sqlstate <span class="token string">'P0002'</span> <span class="token keyword">then</span> 
	      raise exception <span class="token string">'film with length % not found'</span><span class="token punctuation">,</span> v_length<span class="token punctuation">;</span>
	   <span class="token keyword">when</span> sqlstate <span class="token string">'P0003'</span> <span class="token keyword">then</span> 
	      raise exception <span class="token string">'The with length % is not unique'</span><span class="token punctuation">,</span> v_length<span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
$$
<span class="token keyword">language</span> plpgsql<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>输出：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ERROR:  film with length 30 not found
CONTEXT:  PL/pgSQL function inline_code_block line 15 at RAISE
SQL state: P0001
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="_9-存储过程" tabindex="-1"><a class="header-anchor" href="#_9-存储过程" aria-hidden="true">#</a> 9.存储过程</h2>
<h3 id="_1-创建存储过程" tabindex="-1"><a class="header-anchor" href="#_1-创建存储过程" aria-hidden="true">#</a> [1]创建存储过程</h3>
<p>在用户定义的函数中，不能启动事务，并提交或回滚它</p>
<p>PostgreSQL 11 引入了支持事务的存储过程</p>
<p><code>create procedure</code>语句的基本语法：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token punctuation">[</span><span class="token operator">or</span> <span class="token keyword">replace</span><span class="token punctuation">]</span> <span class="token keyword">procedure</span> procedure_name<span class="token punctuation">(</span>parameter_list<span class="token punctuation">)</span>
<span class="token keyword">language</span> plpgsql
<span class="token keyword">as</span> $$
<span class="token keyword">declare</span>
<span class="token comment">-- variable declaration</span>
<span class="token keyword">begin</span>
<span class="token comment">-- stored procedure body</span>
<span class="token keyword">end</span><span class="token punctuation">;</span> $$
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><blockquote>
<ul>
<li>
<p>存储过程中的参数可以有<code>in</code>和<code>inout</code>模式。他们不能有<code>out</code>模式</p>
</li>
<li>
<p>存储过程不返回值。您不能<code>return</code>在存储过程中使用带有值的语句</p>
</li>
<li>
<p>但是，您可以使用不带值的return来停止存储过程</p>
</li>
<li>
<p>如果要从存储过程中返回值，可以将参数与<code>inout</code>模式一起使用</p>
</li>
</ul>
</blockquote>
<p>示例：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">drop</span> <span class="token keyword">table</span> <span class="token keyword">if</span> <span class="token keyword">exists</span> accounts<span class="token punctuation">;</span>

<span class="token keyword">create</span> <span class="token keyword">table</span> accounts <span class="token punctuation">(</span>
    id <span class="token keyword">int</span> generated <span class="token keyword">by</span> <span class="token keyword">default</span> <span class="token keyword">as</span> <span class="token keyword">identity</span><span class="token punctuation">,</span>
    name <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
    balance <span class="token keyword">dec</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
    <span class="token keyword">primary</span> <span class="token keyword">key</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">insert</span> <span class="token keyword">into</span> accounts<span class="token punctuation">(</span>name<span class="token punctuation">,</span>balance<span class="token punctuation">)</span>
<span class="token keyword">values</span><span class="token punctuation">(</span><span class="token string">'Bob'</span><span class="token punctuation">,</span><span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">insert</span> <span class="token keyword">into</span> accounts<span class="token punctuation">(</span>name<span class="token punctuation">,</span>balance<span class="token punctuation">)</span>
<span class="token keyword">values</span><span class="token punctuation">(</span><span class="token string">'Alice'</span><span class="token punctuation">,</span><span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/efeebbf8e09e49d49821e95efab371e2.png" alt="在这里插入图片描述"></p>
<p>下面的示例创建一个名为的存储过程<code>transfer</code>，将指定金额的资金从一个帐户转移到另一个帐户。</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token operator">or</span> <span class="token keyword">replace</span> <span class="token keyword">procedure</span> transfer<span class="token punctuation">(</span>
   sender <span class="token keyword">int</span><span class="token punctuation">,</span>
   receiver <span class="token keyword">int</span><span class="token punctuation">,</span> 
   amount <span class="token keyword">dec</span>
<span class="token punctuation">)</span>
<span class="token keyword">language</span> plpgsql    
<span class="token keyword">as</span> $$
<span class="token keyword">begin</span>
    <span class="token comment">-- subtracting the amount from the sender's account </span>
    <span class="token keyword">update</span> accounts 
    <span class="token keyword">set</span> balance <span class="token operator">=</span> balance <span class="token operator">-</span> amount 
    <span class="token keyword">where</span> id <span class="token operator">=</span> sender<span class="token punctuation">;</span>

    <span class="token comment">-- adding the amount to the receiver's account</span>
    <span class="token keyword">update</span> accounts 
    <span class="token keyword">set</span> balance <span class="token operator">=</span> balance <span class="token operator">+</span> amount 
    <span class="token keyword">where</span> id <span class="token operator">=</span> receiver<span class="token punctuation">;</span>

    <span class="token keyword">commit</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>$$
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h3 id="_2-调用存储过程" tabindex="-1"><a class="header-anchor" href="#_2-调用存储过程" aria-hidden="true">#</a> [2]调用存储过程</h3>
<p>要调用存储过程，请使用<code>CALL</code>如下语句：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">call</span> stored_procedure_name<span class="token punctuation">(</span>argument_list<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>例如，此语句调用<code>transfer</code>存储过程<code>$1,000</code>从 Bob 的帐户转移到 Alice 的帐户。</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">call</span> transfer<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_3-删除存储过程" tabindex="-1"><a class="header-anchor" href="#_3-删除存储过程" aria-hidden="true">#</a> [3]删除存储过程</h3>
<p>删除语法：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">drop</span> <span class="token keyword">procedure</span> <span class="token punctuation">[</span><span class="token keyword">if</span> <span class="token keyword">exists</span><span class="token punctuation">]</span> procedure_name <span class="token punctuation">(</span>argument_list<span class="token punctuation">)</span>
<span class="token punctuation">[</span><span class="token keyword">cascade</span> <span class="token operator">|</span> <span class="token keyword">restrict</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><blockquote>
<p>使用<code>cascade</code>选项删除存储过程及其依赖对象以及依赖于这些对象的对象等等。默认选项是<code>restrict</code>在存储过程有任何依赖对象的情况下拒绝删除它。</p>
</blockquote>
<p>要删除多个存储过程，请在 drop procedure 关键字之后指定存储过程名称的逗号列表，如下所示：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>drop procedure [if exists] name1, name2, ...;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="_10-cursor游标" tabindex="-1"><a class="header-anchor" href="#_10-cursor游标" aria-hidden="true">#</a> 10.Cursor游标</h2>
<p>游标是SQL 的一种数据访问机制 ，游标是一种处理数据的方法。众所周知，使用SQL的select查询操作返回的结果是一个包含一行或者是多行的数据集，如果我们要对查询的结果再进行查询，比如（查看结果的第一行、下一行、最后一行、前十行等等操作）简单的通过select语句是无法完成的，因为这时候索要查询的结果不是数据表，而是已经查询出来的结果集。游标就是针对这种情况而出现的。</p>
<p>PL/pgSQL 游标允许您封装查询并一次处理每一行</p>
<p>将大型结果集划分为多个部分并单独处理每个部分时，推荐使用游标。如果一次处理，可能会出现内存溢出错误，而且，你可以开发一个返回对游标的引用的函数。这是从函数返回大型结果集的有效方法。函数的调用者可以根据游标引用处理结果集。</p>
<p>在PostgreSQL中使用游标的具体：</p>
<p><img src="https://img-blog.csdnimg.cn/88a01cebfe3c42eda2bcd4e3c1f3c99b.png" alt="在这里插入图片描述"></p>
<ul>
<li><strong>声明一个游标</strong>---要访问游标，你需要在块的声明部分中声明游标变量，游标变量的类型为refcursor</li>
<li><strong>打开游标</strong>---</li>
<li>然后，将结果集中的行提取到目标中。</li>
<li>之后，检查是否还有更多行要获取。如果是，转步骤3，否则转步骤5。</li>
<li>最后，关闭光标</li>
</ul>
<h3 id="_1-声明游标" tabindex="-1"><a class="header-anchor" href="#_1-声明游标" aria-hidden="true">#</a> [1]声明游标</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 声明游标</span>
<span class="token keyword">declare</span> my_cursor refcursor<span class="token punctuation">;</span>
<span class="token comment">-- 或者在查询语句中声明</span>
cursor_name <span class="token punctuation">[</span> <span class="token punctuation">[</span><span class="token keyword">no</span><span class="token punctuation">]</span> scroll <span class="token punctuation">]</span> <span class="token keyword">cursor</span> <span class="token punctuation">[</span><span class="token punctuation">(</span> name datatype<span class="token punctuation">,</span> name <span class="token keyword">data</span> <span class="token keyword">type</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token keyword">for</span> query
<span class="token comment">-- NO SCROLL 游标不能向后滚动</span>
<span class="token comment">-- 示例</span>
<span class="token keyword">declare</span>
    cur_films  <span class="token keyword">cursor</span> <span class="token keyword">for</span> <span class="token comment">-- cur_films是封装表中所有行的游标film</span>
		<span class="token keyword">select</span> <span class="token operator">*</span> 
		<span class="token keyword">from</span> film<span class="token punctuation">;</span>
    cur_films2 <span class="token keyword">cursor</span> <span class="token punctuation">(</span><span class="token keyword">year</span> <span class="token keyword">integer</span><span class="token punctuation">)</span> <span class="token keyword">for</span>  <span class="token comment">-- cur_films2封装了具有特定发行年份的电影。film</span>
		<span class="token keyword">select</span> <span class="token operator">*</span> 
		<span class="token keyword">from</span> film 
		<span class="token keyword">where</span> release_year <span class="token operator">=</span> <span class="token keyword">year</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="_2-打开游标" tabindex="-1"><a class="header-anchor" href="#_2-打开游标" aria-hidden="true">#</a> [2]打开游标</h3>
<p>打开游标分为打开绑定游标和未绑定游标</p>
<p>打开未绑定游标：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 打开未绑定游标</span>
<span class="token keyword">OPEN</span> unbound_cursor_variable <span class="token punctuation">[</span> <span class="token punctuation">[</span> <span class="token keyword">NO</span> <span class="token punctuation">]</span> SCROLL <span class="token punctuation">]</span> <span class="token keyword">FOR</span> query<span class="token punctuation">;</span> 

<span class="token comment">-- 因为未绑定游标变量在我们声明它时没有绑定到任何查询，所以我们必须在打开它时指定查询</span>
<span class="token keyword">open</span> my_cursor <span class="token keyword">for</span> 
	<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> city 
	<span class="token keyword">where</span> country <span class="token operator">=</span> p_country<span class="token punctuation">;</span>
	
<span class="token comment">-- PostgreSQL 允许您打开游标并将其绑定到动态查询	</span>
<span class="token keyword">open</span> unbound_cursor_variable<span class="token punctuation">[</span> <span class="token punctuation">[</span> <span class="token keyword">no</span> <span class="token punctuation">]</span> scroll <span class="token punctuation">]</span> 
<span class="token keyword">for</span> <span class="token keyword">execute</span> query_string <span class="token punctuation">[</span><span class="token keyword">using</span> expression <span class="token punctuation">[</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">]</span> <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">-- 示例：使用参数sort_field对行进行排序的动态查询</span>
query :<span class="token operator">=</span> <span class="token string">'select * from city order by $1'</span><span class="token punctuation">;</span>
<span class="token keyword">open</span> cur_city <span class="token keyword">for</span> <span class="token keyword">execute</span> query <span class="token keyword">using</span> sort_field<span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>打开绑定游标：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 打开绑定游标</span>
<span class="token keyword">open</span> cursor_variable<span class="token punctuation">[</span> <span class="token punctuation">(</span>name:<span class="token operator">=</span><span class="token keyword">value</span><span class="token punctuation">,</span>name:<span class="token operator">=</span><span class="token keyword">value</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">-- 示例</span>
<span class="token keyword">open</span> cur_films<span class="token punctuation">;</span>
<span class="token keyword">open</span> cur_films2<span class="token punctuation">(</span><span class="token keyword">year</span>:<span class="token operator">=</span><span class="token number">2005</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="_3-使用游标" tabindex="-1"><a class="header-anchor" href="#_3-使用游标" aria-hidden="true">#</a> [3]使用游标</h3>
<p>打开游标后，我们可以使用<code>FETCH</code>、<code>MOVE</code>、<code>UPDATE</code>或<code>DELETE</code>语句对其进行操作</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 获取下一行</span>
<span class="token keyword">fetch</span> <span class="token punctuation">[</span> direction { <span class="token keyword">from</span> <span class="token operator">|</span> <span class="token operator">in</span> } <span class="token punctuation">]</span> cursor_variable <span class="token keyword">into</span> target_variable<span class="token punctuation">;</span>
<span class="token comment">-- 默认情况下，如果您未明确指定方向，则光标将获取下一行next。以下对游标有效：</span>
<span class="token comment">-- next </span>
<span class="token comment">-- last </span>
<span class="token comment">-- prior</span>
<span class="token comment">-- first</span>
<span class="token comment">-- absolute count</span>
<span class="token comment">-- relative count</span>
<span class="token comment">-- forward</span>
<span class="token comment">-- backward</span>

<span class="token comment">-- 示例</span>
<span class="token keyword">fetch</span> cur_films <span class="token keyword">into</span> row_film<span class="token punctuation">;</span>
<span class="token keyword">fetch</span> <span class="token keyword">last</span> <span class="token keyword">from</span> row_film <span class="token keyword">into</span> title<span class="token punctuation">,</span> release_year<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="_4-移动光标" tabindex="-1"><a class="header-anchor" href="#_4-移动光标" aria-hidden="true">#</a> [4]移动光标</h3>
<p>如果您只想移动光标而不检索任何行，则使用该<code>MOVE</code>语句。<code>FETCH</code>方向接受与语句相同的值</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 移动语法</span>
move <span class="token punctuation">[</span> direction { <span class="token keyword">from</span> <span class="token operator">|</span> <span class="token operator">in</span> } <span class="token punctuation">]</span> cursor_variable<span class="token punctuation">;</span>

<span class="token comment">-- 示例</span>
move cur_films2<span class="token punctuation">;</span>
move <span class="token keyword">last</span> <span class="token keyword">from</span> cur_films<span class="token punctuation">;</span>
move relative <span class="token operator">-</span><span class="token number">1</span> <span class="token keyword">from</span> cur_films<span class="token punctuation">;</span>
move forward <span class="token number">3</span> <span class="token keyword">from</span> cur_films<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="_5-删除或更新行" tabindex="-1"><a class="header-anchor" href="#_5-删除或更新行" aria-hidden="true">#</a> [5]删除或更新行</h3>
<p>定位游标后，我们可以使用<code>DELETE WHERE CURRENT OF</code>or<code>UPDATE WHERE CURRENT OF</code>语句删除或更新游标标识的行，如下所示：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 更新、删除行语法</span>
<span class="token keyword">update</span> table_name 
<span class="token keyword">set</span> <span class="token keyword">column</span> <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> 
<span class="token keyword">where</span> <span class="token keyword">current</span> <span class="token keyword">of</span> cursor_variable<span class="token punctuation">;</span>

<span class="token keyword">delete</span> <span class="token keyword">from</span> table_name 
<span class="token keyword">where</span> <span class="token keyword">current</span> <span class="token keyword">of</span> cursor_variable<span class="token punctuation">;</span>

<span class="token comment">-- 示例</span>
<span class="token keyword">update</span> film 
<span class="token keyword">set</span> release_year <span class="token operator">=</span> p_year 
<span class="token keyword">where</span> <span class="token keyword">current</span> <span class="token keyword">of</span> cur_films<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="_6-关闭游标" tabindex="-1"><a class="header-anchor" href="#_6-关闭游标" aria-hidden="true">#</a> [6]关闭游标</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">close</span> cursor_variable<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_7-综合示例" tabindex="-1"><a class="header-anchor" href="#_7-综合示例" aria-hidden="true">#</a> [7]综合示例</h3>
<p>创建一个函数，在这个函数内使用游标实现查找2006发行年份的电影并且电影名中包含ful的信息</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> title<span class="token punctuation">,</span> release_year <span class="token keyword">from</span> film <span class="token keyword">where</span> release_year <span class="token operator">=</span> <span class="token number">2006</span><span class="token punctuation">;</span> <span class="token comment">-- 有一千条结果</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/ad9df9ec157a484f84629642223d85f0.png" alt="在这里插入图片描述"></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token operator">or</span> <span class="token keyword">replace</span> <span class="token keyword">function</span> get_film_titles<span class="token punctuation">(</span>p_year <span class="token keyword">integer</span><span class="token punctuation">)</span>
   <span class="token keyword">returns</span> <span class="token keyword">text</span> <span class="token keyword">as</span> $$
<span class="token keyword">declare</span> 
	 titles <span class="token keyword">text</span> <span class="token keyword">default</span> <span class="token string">''</span><span class="token punctuation">;</span>
	 rec_film   record<span class="token punctuation">;</span>
	 cur_films <span class="token keyword">cursor</span><span class="token punctuation">(</span>p_year <span class="token keyword">integer</span><span class="token punctuation">)</span> <span class="token comment">-- 查询某年份的电影</span>
		 <span class="token keyword">for</span> <span class="token keyword">select</span> title<span class="token punctuation">,</span> release_year
		 <span class="token keyword">from</span> film
		 <span class="token keyword">where</span> release_year <span class="token operator">=</span> p_year<span class="token punctuation">;</span>
<span class="token keyword">begin</span>
   <span class="token comment">-- 打开游标</span>
   <span class="token keyword">open</span> cur_films<span class="token punctuation">(</span>p_year<span class="token punctuation">)</span><span class="token punctuation">;</span>
	
   <span class="token keyword">loop</span>
    <span class="token comment">-- fetch row into the film 使用游标 将将查询结果挨个处理</span>
      <span class="token keyword">fetch</span> cur_films <span class="token keyword">into</span> rec_film<span class="token punctuation">;</span>
    <span class="token comment">-- exit when no more row to fetch</span>
      <span class="token keyword">exit</span> <span class="token keyword">when</span> <span class="token operator">not</span> found<span class="token punctuation">;</span>

    <span class="token comment">-- build the output</span>
      <span class="token keyword">if</span> rec_film<span class="token punctuation">.</span>title <span class="token operator">like</span> <span class="token string">'%ful%'</span> <span class="token keyword">then</span> 
         titles :<span class="token operator">=</span> titles <span class="token operator">||</span> <span class="token string">','</span> <span class="token operator">||</span> rec_film<span class="token punctuation">.</span>title <span class="token operator">||</span> <span class="token string">':'</span> <span class="token operator">||</span> rec_film<span class="token punctuation">.</span>release_year<span class="token punctuation">;</span>
      <span class="token keyword">end</span> <span class="token keyword">if</span><span class="token punctuation">;</span>
   <span class="token keyword">end</span> <span class="token keyword">loop</span><span class="token punctuation">;</span>
  
   <span class="token comment">-- close the cursor</span>
   <span class="token keyword">close</span> cur_films<span class="token punctuation">;</span>

   <span class="token keyword">return</span> titles<span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span> $$

<span class="token keyword">language</span> plpgsql<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> get_film_titles<span class="token punctuation">(</span><span class="token number">2006</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://img-blog.csdnimg.cn/90dddf5d3f8c45b1b949cefb485348fb.png" alt="在这里插入图片描述"></p>
<h2 id="_11-触发器" tabindex="-1"><a class="header-anchor" href="#_11-触发器" aria-hidden="true">#</a> 11.触发器</h2>
<p>参考：https://www.postgresqltutorial.com/postgresql-plpgsql/</p>
<h3 id="_1-触发器简介" tabindex="-1"><a class="header-anchor" href="#_1-触发器简介" aria-hidden="true">#</a> [1]触发器简介</h3>
<p>PostgreSQL 触发器是每当与表关联的事件发生时自动调用的函数。事件可以是以下任何一种：<code>INSERT</code>、<code>UPDATE</code>、<code>DELETE</code>或<code>TRUNCATE</code></p>
<p>触发器是与表关联的特殊用户定义函数。要创建新触发器，首先定义一个触发器函数，然后将此触发器函数绑定到一个表。触发器和用户自定义函数的区别在于触发器在触发事件发生时自动调用。</p>
<p>PostgreSQL 提供两种主要类型的触发器：<strong>行级触发器</strong>和<strong>语句级触发器</strong>。这两种的区别在于触发器被调用的次数和时间。</p>
<p>例如，如果您发出一条<code>UPDATE</code>影响 20 行的语句，则行级触发器将被调用 20 次，而语句级触发器将被调用 1 次。</p>
<p>您可以指定触发器是在事件<strong>之前</strong>还是<strong>之后</strong>调用。如果触发器在事件之前调用，它可以跳过当前行的操作，甚至更改正在更新或插入的行。如果在事件之后调用触发器，则触发器可以使用所有更改。</p>
<p>触发器在各种应用程序访问数据库的情况下很有用，并且您希望在修改表数据时自动运行的数据库中保持跨功能。例如，如果您想保留数据历史记录而不要求应用程序具有检查每个事件的逻辑，例如<code>INSERT</code>或<code>UDPATE</code>。</p>
<p>您还可以使用触发器来维护复杂的数据完整性规则，除了在数据库级别之外，您无法在其他地方实现这些规则。例如，当向<code>customer</code>表中添加新行时，还必须在银行和信用表中创建其他行。</p>
<p>使用触发器的主要缺点是您必须知道触发器的存在并了解其逻辑才能弄清楚数据更改时的影响。</p>
<p>尽管 PostgreSQL 实现了 SQL 标准，但 PostgreSQL 中的触发器具有一些特定的功能：</p>
<ul>
<li>PostgreSQL 触发 <code>TRUNCATE</code>事件的触发器。</li>
<li>PostgreSQL 允许您在视图上定义语句级触发器。</li>
<li>PostgreSQL 要求你定义一个用户定义的函数作为触发器的动作，而 SQL 标准允许你使用任何 SQL 命令。</li>
</ul>
<h3 id="_2-创建触发器" tabindex="-1"><a class="header-anchor" href="#_2-创建触发器" aria-hidden="true">#</a> [2]创建触发器</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 创建触发器</span>
<span class="token keyword">CREATE</span> <span class="token keyword">FUNCTION</span> <span class="token comment">-- 首先，使用语句创建一个触发函数。</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TRIGGER</span> <span class="token comment">-- 其次，通过using语句将触发器函数绑定到表。</span>

<span class="token comment">-- 创建触发器函数语法</span>
<span class="token keyword">CREATE</span> <span class="token keyword">FUNCTION</span> trigger_function<span class="token punctuation">(</span><span class="token punctuation">)</span> 
   <span class="token keyword">RETURNS</span> <span class="token keyword">TRIGGER</span> 
   <span class="token keyword">LANGUAGE</span> PLPGSQL
<span class="token keyword">AS</span> $$
<span class="token keyword">BEGIN</span>
   <span class="token comment">-- trigger logic</span>
<span class="token keyword">END</span><span class="token punctuation">;</span>
$$
<span class="token comment">-- 触发函数类似于常规的用户定义函数。但是，触发器函数不接受任何参数，并且具有类型为trigger的返回值。</span>
<span class="token comment">-- 一旦定义了触发函数，就可以将其绑定到一个或多个触发事件，例如INSERT、UPDATE和DELETE。</span>

<span class="token comment">-- 创建触发器基本语法</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TRIGGER</span> trigger_name 
   {BEFORE <span class="token operator">|</span> <span class="token keyword">AFTER</span>} { event } <span class="token comment">-- BEFORE、AFTER：触发触发器的时间 ，event：触发触发器事件</span>
   <span class="token keyword">ON</span> table_name <span class="token comment">-- 触发器绑定的表</span>
   <span class="token punctuation">[</span><span class="token keyword">FOR</span> <span class="token punctuation">[</span>EACH<span class="token punctuation">]</span> { <span class="token keyword">ROW</span> <span class="token operator">|</span> STATEMENT }<span class="token punctuation">]</span> <span class="token comment">--  ROW：行级触发器，STATEMENT语句触发器</span>
       <span class="token keyword">EXECUTE</span> <span class="token keyword">PROCEDURE</span> trigger_function <span class="token comment">-- 指定触发器函数名称</span>
  
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>示例：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> employees<span class="token punctuation">;</span>

<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> employees<span class="token punctuation">(</span>
   id <span class="token keyword">INT</span> GENERATED ALWAYS <span class="token keyword">AS</span> <span class="token keyword">IDENTITY</span><span class="token punctuation">,</span>
   first_name <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">40</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
   last_name <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">40</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
   <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 假设当员工的姓名发生更改时，您希望将更改记录在名为的单独表中employee_audits：</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> employee_audits <span class="token punctuation">(</span>
   id <span class="token keyword">INT</span> GENERATED ALWAYS <span class="token keyword">AS</span> <span class="token keyword">IDENTITY</span><span class="token punctuation">,</span>
   employee_id <span class="token keyword">INT</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
   last_name <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">40</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
   changed_on <span class="token keyword">TIMESTAMP</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 创建触发器函数</span>
<span class="token keyword">CREATE</span> <span class="token operator">OR</span> <span class="token keyword">REPLACE</span> <span class="token keyword">FUNCTION</span> log_last_name_changes<span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">RETURNS</span> <span class="token keyword">TRIGGER</span> 
  <span class="token keyword">LANGUAGE</span> PLPGSQL
  <span class="token keyword">AS</span>
$$
<span class="token keyword">BEGIN</span>
	<span class="token keyword">IF</span> NEW<span class="token punctuation">.</span>last_name <span class="token operator">&lt;></span> OLD<span class="token punctuation">.</span>last_name <span class="token keyword">THEN</span>
		 <span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> employee_audits<span class="token punctuation">(</span>employee_id<span class="token punctuation">,</span>last_name<span class="token punctuation">,</span>changed_on<span class="token punctuation">)</span>
		 <span class="token keyword">VALUES</span><span class="token punctuation">(</span>OLD<span class="token punctuation">.</span>id<span class="token punctuation">,</span>OLD<span class="token punctuation">.</span>last_name<span class="token punctuation">,</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">END</span> <span class="token keyword">IF</span><span class="token punctuation">;</span>

	<span class="token keyword">RETURN</span> NEW<span class="token punctuation">;</span>
<span class="token keyword">END</span><span class="token punctuation">;</span>
$$

<span class="token comment">-- 创建触发器（将触发器函数绑定到employees表</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TRIGGER</span> last_name_changes
  BEFORE <span class="token keyword">UPDATE</span>
  <span class="token keyword">ON</span> employees
  <span class="token keyword">FOR EACH ROW</span>
  <span class="token keyword">EXECUTE</span> <span class="token keyword">PROCEDURE</span> log_last_name_changes<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  
<span class="token comment">-- 插入些测试数据</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> employees <span class="token punctuation">(</span>first_name<span class="token punctuation">,</span> last_name<span class="token punctuation">)</span>
<span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">'John'</span><span class="token punctuation">,</span> <span class="token string">'Doe'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> employees <span class="token punctuation">(</span>first_name<span class="token punctuation">,</span> last_name<span class="token punctuation">)</span>
<span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">'Lily'</span><span class="token punctuation">,</span> <span class="token string">'Bush'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 使用触发器</span>
<span class="token keyword">UPDATE</span> employees <span class="token keyword">SET</span> last_name <span class="token operator">=</span> <span class="token string">'Brown'</span> <span class="token keyword">WHERE</span> ID <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token comment">-- 更新后</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> employees<span class="token punctuation">;</span>
 id <span class="token operator">|</span> first_name <span class="token operator">|</span> last_name
<span class="token comment">----+------------+-----------</span>
  <span class="token number">1</span> <span class="token operator">|</span> John       <span class="token operator">|</span> Doe
  <span class="token number">2</span> <span class="token operator">|</span> Lily       <span class="token operator">|</span> Brown
  
  
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> employee_audits<span class="token punctuation">;</span>
d <span class="token operator">|</span> last_name <span class="token operator">|</span>        changed_on
<span class="token comment">----+-------------+-----------+---------------------------</span>
  <span class="token number">1</span> <span class="token operator">|</span>           <span class="token number">2</span> <span class="token operator">|</span> Bush      <span class="token operator">|</span> <span class="token number">2022</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">10</span> <span class="token number">13</span>:<span class="token number">34</span>:<span class="token number">15.19555</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br></div></div><h3 id="_3-删除触发器" tabindex="-1"><a class="header-anchor" href="#_3-删除触发器" aria-hidden="true">#</a> [3]删除触发器</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 从表中删除触发器语法</span>
<span class="token keyword">DROP</span> <span class="token keyword">TRIGGER</span> <span class="token punctuation">[</span><span class="token keyword">IF</span> <span class="token keyword">EXISTS</span><span class="token punctuation">]</span> trigger_name 
<span class="token keyword">ON</span> table_name <span class="token punctuation">[</span> <span class="token keyword">CASCADE</span> <span class="token operator">|</span> <span class="token keyword">RESTRICT</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> 
<span class="token comment">-- CASCADE连同删除依赖触发器的对象，默认RESTRICT不删除依赖对象</span>

<span class="token comment">-- 示例：</span>
<span class="token comment">-- 创建一个验证员工用户名的函数。员工的用户名不能为空，长度至少为8。</span>
<span class="token keyword">CREATE</span> <span class="token keyword">FUNCTION</span> check_staff_user<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">RETURNS</span> <span class="token keyword">TRIGGER</span>
<span class="token keyword">AS</span> $$
<span class="token keyword">BEGIN</span>
    <span class="token keyword">IF</span> length<span class="token punctuation">(</span>NEW<span class="token punctuation">.</span>username<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">8</span> <span class="token operator">OR</span> NEW<span class="token punctuation">.</span>username <span class="token operator">IS</span> <span class="token boolean">NULL</span> <span class="token keyword">THEN</span>
        RAISE EXCEPTION <span class="token string">'The username cannot be less than 8 characters'</span><span class="token punctuation">;</span>
    <span class="token keyword">END</span> <span class="token keyword">IF</span><span class="token punctuation">;</span>
    <span class="token keyword">IF</span> NEW<span class="token punctuation">.</span>NAME <span class="token operator">IS</span> <span class="token boolean">NULL</span> <span class="token keyword">THEN</span>
        RAISE EXCEPTION <span class="token string">'Username cannot be NULL'</span><span class="token punctuation">;</span>
    <span class="token keyword">END</span> <span class="token keyword">IF</span><span class="token punctuation">;</span>
    <span class="token keyword">RETURN</span> NEW<span class="token punctuation">;</span>
<span class="token keyword">END</span><span class="token punctuation">;</span>
$$
<span class="token keyword">LANGUAGE</span> plpgsql<span class="token punctuation">;</span>

<span class="token comment">-- 创建触发器绑定触发器函数</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TRIGGER</span> username_check 
    BEFORE <span class="token keyword">INSERT</span> <span class="token operator">OR</span> <span class="token keyword">UPDATE</span>
<span class="token keyword">ON</span> staff
<span class="token keyword">FOR EACH ROW</span> 
    <span class="token keyword">EXECUTE</span> <span class="token keyword">PROCEDURE</span> check_staff_user<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 删除触发器</span>
<span class="token keyword">DROP</span> <span class="token keyword">TRIGGER</span> username_check
<span class="token keyword">ON</span> staff<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><h3 id="_4-重命名触发器" tabindex="-1"><a class="header-anchor" href="#_4-重命名触发器" aria-hidden="true">#</a> [4]重命名触发器</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 重命名触发器名称</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TRIGGER</span> trigger_name
<span class="token keyword">ON</span> table_name 
<span class="token keyword">RENAME</span> <span class="token keyword">TO</span> new_trigger_name<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="_5-禁用触发器" tabindex="-1"><a class="header-anchor" href="#_5-禁用触发器" aria-hidden="true">#</a> [5]禁用触发器</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> table_name
<span class="token keyword">DISABLE</span> <span class="token keyword">TRIGGER</span> trigger_name <span class="token operator">|</span> <span class="token keyword">ALL</span>
<span class="token comment">-- ALL禁用与该表关联的所有触发器</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="_6-启用触发器" tabindex="-1"><a class="header-anchor" href="#_6-启用触发器" aria-hidden="true">#</a> [6]启用触发器</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> table_name
<span class="token keyword">ENABLE</span> <span class="token keyword">TRIGGER</span> trigger_name <span class="token operator">|</span>  <span class="token keyword">ALL</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>参考：https://www.postgresqltutorial.com/</p>
</template>
