<template><nav class="table-of-contents"><ul><li><RouterLink to="#_1-postgresql编译安装">1.PostgreSQL编译安装</RouterLink><ul><li><RouterLink to="#_1-相关依赖包查找安装">[1]相关依赖包查找安装</RouterLink></li><li><RouterLink to="#_2-postgresql源码下载及编译安装">[2]postgresql源码下载及编译安装</RouterLink></li><li><RouterLink to="#_3-配置环境变量">[3]配置环境变量</RouterLink></li><li><RouterLink to="#_4-创建数据库实例">[4]创建数据库实例</RouterLink></li><li><RouterLink to="#_5-访问控制配置文件">[5]访问控制配置文件</RouterLink></li><li><RouterLink to="#_6-内存参数配置">[6]内存参数配置</RouterLink></li><li><RouterLink to="#_7-常用的管理命令">[7]常用的管理命令</RouterLink></li></ul></li><li><RouterLink to="#_2-postgis编译安装">2.postgis编译安装</RouterLink><ul><li><RouterLink to="#_1-geos">[1]geos</RouterLink></li><li><RouterLink to="#_2-proj">[2]proj</RouterLink></li><li><RouterLink to="#_3-gdal">[3]gdal</RouterLink></li><li><RouterLink to="#_4-json-c">[4]json-c</RouterLink></li><li><RouterLink to="#_5-sfcgal">[5]SFCGAL</RouterLink></li><li><RouterLink to="#_6-protobuf-c">[6] protobuf-c</RouterLink></li><li><RouterLink to="#_7-libxml2">[7]libxml2</RouterLink></li><li><RouterLink to="#_8-postgis">[8]postgis</RouterLink></li></ul></li></ul></nav>
<p>之前买的腾讯云服务器因为最近校园网卡的远程命令都会卡😓。所以不得不虚拟机里（centOS8 server）重装折腾下了－O－</p>
<h3 id="_1-postgresql编译安装" tabindex="-1"><a class="header-anchor" href="#_1-postgresql编译安装" aria-hidden="true">#</a> 1.PostgreSQL编译安装</h3>
<h4 id="_1-相关依赖包查找安装" tabindex="-1"><a class="header-anchor" href="#_1-相关依赖包查找安装" aria-hidden="true">#</a> [1]相关依赖包查找安装</h4>
<p>安装数据库中的压缩功能开发包：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@VM-4-6-centos etc<span class="token punctuation">]</span><span class="token comment"># yum search zlib |grep devel</span>
ghc-zlib-devel.x86_64 <span class="token builtin class-name">:</span> Haskell zlib library development files
zlib-ada-devel.x86_64 <span class="token builtin class-name">:</span> Development files <span class="token keyword">for</span> Zlib-Ada
zlib-devel.i686 <span class="token builtin class-name">:</span> Header files and libraries <span class="token keyword">for</span> Zlib development
zlib-devel.x86_64 <span class="token builtin class-name">:</span> Header files and libraries <span class="token keyword">for</span> Zlib development
zlib-static.i686 <span class="token builtin class-name">:</span> Static libraries <span class="token keyword">for</span> Zlib development
zlib-static.x86_64 <span class="token builtin class-name">:</span> Static libraries <span class="token keyword">for</span> Zlib development
<span class="token punctuation">[</span>root@VM-4-6-centos etc<span class="token punctuation">]</span><span class="token comment"># sudo yum install zlib-devel.x86_64</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>psql中使用上下方向键把历史命令找出来的包：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@VM-4-6-centos etc<span class="token punctuation">]</span><span class="token comment"># yum search readline |grep devel</span>
readline-devel.i686 <span class="token builtin class-name">:</span> Files needed to develop programs <span class="token function">which</span> use the readline
readline-devel.x86_64 <span class="token builtin class-name">:</span> Files needed to develop programs <span class="token function">which</span> use the readline
tcl-tclreadline-devel.x86_64 <span class="token builtin class-name">:</span> Development files <span class="token keyword">for</span> the tclreadline library
<span class="token punctuation">[</span>root@VM-4-6-centos etc<span class="token punctuation">]</span><span class="token comment"># yum install readline-devel.x86_64</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="_2-postgresql源码下载及编译安装" tabindex="-1"><a class="header-anchor" href="#_2-postgresql源码下载及编译安装" aria-hidden="true">#</a> [2]postgresql源码下载及编译安装</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>curl https://ftp.postgresql.org/pub/source/v15.0/postgresql-15.0.tar.gz
tar -zxvf postgresql-15.0.tar.gz
./configure --prefix=/opt/pgsql/15.0
make
make install
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>安装后的数据文件目录为：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost <span class="token number">15.0</span><span class="token punctuation">]</span><span class="token comment"># ls -al</span>
total <span class="token number">16</span>
drwxr-xr-x. <span class="token number">6</span> shu postgres   <span class="token number">56</span> Nov  <span class="token number">2</span> <span class="token number">22</span>:40 <span class="token builtin class-name">.</span>
drwxr-xr-x. <span class="token number">3</span> shu postgres   <span class="token number">18</span> Nov  <span class="token number">2</span> <span class="token number">22</span>:32 <span class="token punctuation">..</span>
drwxr-xr-x. <span class="token number">2</span> shu postgres <span class="token number">4096</span> Nov  <span class="token number">2</span> <span class="token number">22</span>:40 bin  
drwxr-xr-x. <span class="token number">6</span> shu postgres <span class="token number">4096</span> Nov  <span class="token number">2</span> <span class="token number">22</span>:40 include  <span class="token comment">#头文件目录</span>
drwxr-xr-x. <span class="token number">4</span> shu postgres <span class="token number">4096</span> Nov  <span class="token number">2</span> <span class="token number">22</span>:40 lib <span class="token comment">#动态链接库目录</span>
drwxr-xr-x. <span class="token number">6</span> shu postgres <span class="token number">4096</span> Nov  <span class="token number">2</span> <span class="token number">22</span>:40 share<span class="token comment">#share目录存放文档和配置模板文件，一些扩展包的SQL文件在此目录的子目录"extension"下</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>创建组及用户：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>groupadd postgres
useradd shu -g postgres
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>然后将将相应的文件夹权限授予给新建的用户：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost opt<span class="token punctuation">]</span><span class="token comment"># chown shu:postgres -R /opt/pgsql</span>
<span class="token punctuation">[</span>root@localhost opt<span class="token punctuation">]</span><span class="token comment"># chown shu:postgres -R /opt/pgdata</span>
<span class="token punctuation">[</span>root@localhost opt<span class="token punctuation">]</span><span class="token comment"># ll</span>
total <span class="token number">0</span>
drwxr-xr-x. <span class="token number">2</span> shu postgres  <span class="token number">6</span> Nov  <span class="token number">2</span> <span class="token number">22</span>:55 pgdata
drwxr-xr-x. <span class="token number">3</span> shu postgres <span class="token number">18</span> Nov  <span class="token number">2</span> <span class="token number">22</span>:32 pgsql
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><blockquote>
<p>pgdata：数据目录</p>
<p>pgsql：软件软件</p>
</blockquote>
<h4 id="_3-配置环境变量" tabindex="-1"><a class="header-anchor" href="#_3-配置环境变量" aria-hidden="true">#</a> [3]配置环境变量</h4>
<p>配置数据库数据目录的环境变量（这里我又创建了一个data目录来区分存储pg中的其他数据）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost pgdata<span class="token punctuation">]</span><span class="token comment"># sudo vim /etc/bashrc</span>
在文件底下添加
<span class="token builtin class-name">export</span> <span class="token assign-left variable">PGDATA</span><span class="token operator">=</span>/opt/pgdata/data 数据目录
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span>:/opt/pgsql/15.0/bin 
<span class="token builtin class-name">export</span> <span class="token assign-left variable">LD_LIBRARY_PATH</span><span class="token operator">=</span>/opt/pgsql/15.0/lib 共享目录
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>source /etc/bashrc
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><blockquote>
<p>这里为了学习方便直接配置了全部用户有效，且永久有效</p>
</blockquote>
<p>查看配置情况：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[root@localhost pgdata]# echo $PATH
/home/shu/.local/bin:/home/shu/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin:/opt/pgsql/15.0/bin
[root@localhost pgdata]# echo $PGDATA
/opt/pgdata/data
[root@localhost pgdata]# echo $LD_LIBRARY_PATH
/opt/pgsql/15.0/lib
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h4 id="_4-创建数据库实例" tabindex="-1"><a class="header-anchor" href="#_4-创建数据库实例" aria-hidden="true">#</a> [4]创建数据库实例</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>initdb -D &lt;your_data_location> --no-locale --encoding=UTF8
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><blockquote>
<p>在PostgreSQL中，一个数据库服务（实例）下可以有多个数据库，但一个数据库不能属于多个实例，这与Oracle数据库不同。在Oracle数据库中，一个实例只能有一个数据库，但一个数据库可以在多个实例中（如RAC）</p>
</blockquote>
<p>启动服务：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>pg_ctl start -D $PGDATA
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>停止服务：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>pg_ctl stop 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>接下来则是对数据库做一些必要或者可选的配置了，配置文件在<code>$PGDATA</code>下</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[root@localhost 15.0]# cd $PGDATA
[root@localhost data]# ll
total 64
-rw-------. 1 shu postgres     3 Nov  3 12:09 PG_VERSION
drwx------. 5 shu postgres    33 Nov  3 12:09 base
drwx------. 2 shu postgres  4096 Nov  3 15:30 global
drwx------. 2 shu postgres     6 Nov  3 12:09 pg_commit_ts
drwx------. 2 shu postgres     6 Nov  3 12:09 pg_dynshmem
-rw-------. 1 shu postgres  4789 Nov  3 12:09 pg_hba.conf
-rw-------. 1 shu postgres  1636 Nov  3 12:09 pg_ident.conf
drwx------. 4 shu postgres    68 Nov  3 15:32 pg_logical
drwx------. 4 shu postgres    36 Nov  3 12:09 pg_multixact
drwx------. 2 shu postgres     6 Nov  3 12:09 pg_notify
drwx------. 2 shu postgres     6 Nov  3 12:09 pg_replslot
drwx------. 2 shu postgres     6 Nov  3 12:09 pg_serial
drwx------. 2 shu postgres     6 Nov  3 12:09 pg_snapshots
drwx------. 2 shu postgres     6 Nov  3 12:11 pg_stat
drwx------. 2 shu postgres     6 Nov  3 12:09 pg_stat_tmp
drwx------. 2 shu postgres    18 Nov  3 12:09 pg_subtrans
drwx------. 2 shu postgres     6 Nov  3 12:09 pg_tblspc
drwx------. 2 shu postgres     6 Nov  3 12:09 pg_twophase
drwx------. 3 shu postgres    60 Nov  3 12:09 pg_wal
drwx------. 2 shu postgres    18 Nov  3 12:09 pg_xact
-rw-------. 1 shu postgres    88 Nov  3 12:09 postgresql.auto.conf
-rw-------. 1 shu postgres 29423 Nov  3 12:09 postgresql.conf
-rw-------. 1 shu postgres    53 Nov  3 12:11 postmaster.opts
-rw-------. 1 shu postgres    82 Nov  3 12:11 postmaster.pid
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><blockquote>
<p>由于这里的用户为shu，而postgres的psql命令默认使用的是postgres数据库/potgres用户，使用登录时需要通过参数指定一些数据库：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>psql -d postgres
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></blockquote>
<h4 id="_5-访问控制配置文件" tabindex="-1"><a class="header-anchor" href="#_5-访问控制配置文件" aria-hidden="true">#</a> [5]访问控制配置文件</h4>
<p>在PostgreSQL中，允许哪些IP地址的机器访问数据库服务器是由<code>pg_hba.conf</code>文件来控制的。而默认创建的数据库无法接受远程连接，因为默认情况下<code>pg_hba.conf</code>中没有相应的配置项。</p>
<p>下面对该文件做简单配置：（该命令允许任何用户远程连接本数据库，连接时需要提供密码）</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>host all all 0/0 md5
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>修改完接受远程连接后还需要修改监听的IP和端口，该配置文件为postgresql.conf</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>#listen_addresses = '*' # what IP
address(es) to listen on;
#port = 5432 # (change
requires restart)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>将listen_addresses中的“localhost”改为&quot;*&quot;表示在本地的所有地址上监听，这样就可以在所以远程主机上访问该数据库了。</p>
<p>修改后重启数据库服务生效</p>
<h4 id="_6-内存参数配置" tabindex="-1"><a class="header-anchor" href="#_6-内存参数配置" aria-hidden="true">#</a> [6]内存参数配置</h4>
<p>PostgreSQL安装完毕后，可以修改以下主要内存参数。</p>
<ul>
<li><code>shared_buffers</code>：共享内存的大小，主要用于共享数据块。</li>
<li><code>work_mem</code>：单个SQL执行时，以及排序、Hash Join时使用的内存，SQL运行完毕后，该内存就会被释放</li>
</ul>
<p><code>shared_buffers</code>的默认值为32MB，如果你的机器上有足够的内存，可以把这个参数设置得大一些，如可以设置为物理内存大小的四分之一，这样数据库就可以缓存更多数据块，当读取数据时，就可以从共享内存中进行读取，而不需要再从文件上去读。而<code>work_mem</code>设置大一些，会使排序操作效率更高</p>
<h4 id="_7-常用的管理命令" tabindex="-1"><a class="header-anchor" href="#_7-常用的管理命令" aria-hidden="true">#</a> [7]常用的管理命令</h4>
<p>查看当前数据库实例的版本信息</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>select version();
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>显示当前数据库时区：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>show timezone;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>修改配置文件后重载</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>pg_ctl reload
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>查看表的大小</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>select pg_size_pretty(pg_relation_size('tablename')) ;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>查看表及其索引的总大小</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>select pg_size_pretty(pg_total_relation_size('tablename')) ;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>查看表上所有索引的大小</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>select pg_size_pretty(pg_indexes_size('tablename'));
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_2-postgis编译安装" tabindex="-1"><a class="header-anchor" href="#_2-postgis编译安装" aria-hidden="true">#</a> 2.postgis编译安装</h3>
<p>postgis依赖以及与各种依赖对应的版本</p>
<p>https://trac.osgeo.org/postgis/wiki/UsersWikiPostgreSQLPostGIS</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[shu@localhost root]$ psql --version
could not change directory to "/root": Permission denied
psql (PostgreSQL) 15.0
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>由于这里已经安装好了 PostgreSQL15.0版本，所以就全都用最新的版本吧，到时候还可以玩玩它们的新特性，这里选的相关依赖及版本为：</p>
<ul>
<li><code>PostGIS 3.2.1</code></li>
<li><a href="https://libgeos.org/usage/download/" target="_blank" rel="noopener noreferrer">GEOS 3.11.0</a>几何图形库，用于支持PostGIS中的几何处理与分析等功能</li>
<li><a href="https://github.com/OSGeo/PROJ/releases" target="_blank" rel="noopener noreferrer">Proj8.2</a>用于使PostGIS支持投影与变换相关功能</li>
<li><a href="https://github.com/OSGeo/gdal/releases" target="_blank" rel="noopener noreferrer">GDAL3.5.2</a>用于使PostGIS支持栅格数据及其处理等功能</li>
<li><code>json-c 0.16</code>使JSON-C通过来支持<code>ST_GeomFromGeoJSON()</code>函数导入GeoJSON格式的数据</li>
<li><a href="https://github.com/protobuf-c/protobuf-c/releases" target="_blank" rel="noopener noreferrer">protobuf-c 1.4.0</a>一个实现protobuf编码和解码的纯 C 库</li>
<li><code>SFCGAL 1.4.1</code>一个围绕 CGAL 的包装器，旨在在 OGC 标准模型上实现 2D 和 3D 操作</li>
<li><code>libxml</code> 用于解析xml文件的库,在各个平台下都能使用,也支持多种语言</li>
</ul>
<h4 id="_1-geos" tabindex="-1"><a class="header-anchor" href="#_1-geos" aria-hidden="true">#</a> [1]geos</h4>
<p>以为geos的安装需要cmake，所以先安装cmake</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>tar -zxvf cmake-3.24.0.tar.gz
cd cmake-3.17.4
./bootstrap
gmake
make install
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>编译安装geos</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>tar -jxvf geos-3.11.0.tar.bz2
./configure --prefix=/opt/postgis/packages/geos-3.11.0
make
make install
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>这个安装完后需要配置一下</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>vim /etc/ld.so.conf.d/geos.conf
文件中增加 /opt/postgis/packages/geos-3.11.0/lib64
保存退出
ldconfig
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h4 id="_2-proj" tabindex="-1"><a class="header-anchor" href="#_2-proj" aria-hidden="true">#</a> [2]proj</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>./configure --prefix=/opt/postgis/packages/proj-8.2.0
make &amp;&amp; make install
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><blockquote>
<p>依赖（如有依赖要求）如：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>yum install -y libtiff libtiff-devel.x86_64
yum -y install sqlite sqlite-devel
libcurl-devel  --checking for curl-config... no
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></blockquote>
<h4 id="_3-gdal" tabindex="-1"><a class="header-anchor" href="#_3-gdal" aria-hidden="true">#</a> [3]gdal</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>tar -zxvf gdal-3.5.2.tar.gz

./configure --prefix=/opt/postgis/packages/gdal-3.5.2 --with-proj=/opt/postgis/packages/proj-8.2.0

make 
make install
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h4 id="_4-json-c" tabindex="-1"><a class="header-anchor" href="#_4-json-c" aria-hidden="true">#</a> [4]json-c</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>./configure --prefix=/opt/postgis/packages/json-c
make
make install
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="_5-sfcgal" tabindex="-1"><a class="header-anchor" href="#_5-sfcgal" aria-hidden="true">#</a> [5]SFCGAL</h4>
<p>该软件包是可选的，安装SFCGAL需要依赖Boost、CGAL（pgrouting插件也依赖于CGAL和Boost，所以就先装着吧）、GMP、MPFR这四个软件，需要先进行安装。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>yum -y install boost-devel.x86_64
yum -y install gmp-devel
yum -y install mpfr-devel
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>而CGAL需要编译安装下<a href="https://github.com/CGAL/cgal/releases?page=2" target="_blank" rel="noopener noreferrer">cgal-5.3.tar.gz</a></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>tar -xzvf cgal-5.3.tar.gz
cmake /opt/postgis/tmp/cgal-5.3   -- cd到要安装的目录 生成makefile
make
make install
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>最后安装SFCGAL-v1.4.1</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>tar -xzvf SFCGAL-v1.4.1.tar.gz
cmake /opt/postgis/tmp/SFCGAL-v1.4.1
make
make install
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ln -s /usr/local/lib64/libSFCGAL.so /usr/local/lib/libSFCGAL.so
ln -s /usr/local/lib64/libSFCGAL.so.1 /usr/local/lib/libSFCGAL.so.1
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="_6-protobuf-c" tabindex="-1"><a class="header-anchor" href="#_6-protobuf-c" aria-hidden="true">#</a> [6] protobuf-c</h4>
<p>protobuf-c的安装需要依赖<a href="https://github.com/google/protobuf" target="_blank" rel="noopener noreferrer">protobuf</a>和pkg-config，所以这里先对其进行安装</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>tar -vxzf protobuf-all-3.19.5.tar.gz
./configure --prefix=/opt/postgis/packages/protobuf-3.19.5
make &amp;&amp; make install
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>安装protobuf-c</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>tar -vxzf protobuf-c-1.1.0.tar.gz
./configure --prefix=/opt/postgis/packages/protobuf-c-1.3.3
make &amp;&amp; make install
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><blockquote>
<p>报错：找不到上面安装的protobuf。。。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>checking for protobuf... no
checking for protobuf... no
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>按照提示配个环境变量试试</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sudo vim /etc/bashrc
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>export LD_LIBRARY_PATH=/opt/postgis/packages/protobuf-3.19.5/lib:$LD_LIBRARY_PATH
export PKG_CONFIG_PATH=/opt/postgis/packages/protobuf-3.19.5/lib/pkgconfig
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>source /etc/bashrc
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>ok</p>
</blockquote>
<h4 id="_7-libxml2" tabindex="-1"><a class="header-anchor" href="#_7-libxml2" aria-hidden="true">#</a> [7]libxml2</h4>
<p>https://gitlab.gnome.org/GNOME/libxml2/-/releases</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>./configure --prefix=/opt/postgis/packages/libxml2-2.9.10
make 
make install
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="_8-postgis" tabindex="-1"><a class="header-anchor" href="#_8-postgis" aria-hidden="true">#</a> [8]postgis</h4>
<p>通过<code>./configure --help</code>查看下那些包的配置名：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>tar -zvxf postgis-3.3.1.tar.gz
./configure --prefix=/opt/postgis/postgis-3.3.1 --with-geosconfig=/opt/postgis/packages/geos-3.11.0/bin/geos-config \
--with-gdalconfig=/opt/postgis/packages/gdal-3.5.2/bin/gdal-config \
--with-pgconfig=/opt/pgsql/15.0/bin/pg_config \
--with-projdir=/opt/postgis/packages/proj-8.2.0 \
--with-jsondir=/opt/postgis/packages/json-c \
--with-sfcgal=/opt/postgis/packages/SFCGAL-v1.4.1/sfcgal-config \
--with-xml2config=/opt/postgis/packages/libxml2-2.9.10/bin/xml2-config \
--with-protobuf=/opt/postgis/packages/protobuf-c-1.3.3

make &amp;&amp; make install
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>加载动态库到内存<code>sudo vim /etc/lo.so.conf</code></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>/opt/pgsql/15.0/lib
/opt/postgis/packages/geos-3.11.0/lib64
/opt/postgis/packages/proj-8.2.0/lib
/opt/postgis/packages/gdal-3.5.2/lib
/opt/postgis/packages/json-c/lib
/opt/postgis/packages/libxml2-2.9.10/lib
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>加载配置：<code>ldconfig</code></p>
<p>create extension时报错：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>gis_db<span class="token operator">=</span><span class="token comment"># create extension postgis;</span>
<span class="token number">2022</span><span class="token operator">-</span><span class="token number">11</span><span class="token operator">-</span><span class="token number">08</span> <span class="token number">16</span>:<span class="token number">10</span>:<span class="token number">34.023</span> CST <span class="token punctuation">[</span><span class="token number">1916</span><span class="token punctuation">]</span> ERROR:  could <span class="token operator">not</span> <span class="token keyword">load</span> library <span class="token string">"/opt/pgsql/15.0/lib/postgis-3.so"</span>: libSFCGAL<span class="token punctuation">.</span>so<span class="token punctuation">.</span><span class="token number">1</span>: cannot <span class="token keyword">open</span> shared object <span class="token keyword">file</span>: <span class="token keyword">No</span> such <span class="token keyword">file</span> <span class="token operator">or</span> directory
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>把对应的文件拷贝到相应目录</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost lib<span class="token punctuation">]</span><span class="token comment"># find / -name "libSFCGAL.so.1"</span>
/usr/local/lib/libSFCGAL.so.1
/usr/local/lib64/libSFCGAL.so.1
<span class="token function">cp</span> /usr/local/lib/libSFCGAL.so.1 /opt/pgsql/15.0/lib
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>ok</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>gis_db<span class="token operator">=</span><span class="token comment"># create extension postgis;</span>
<span class="token keyword">CREATE</span> EXTENSION
gis_db<span class="token operator">=</span><span class="token comment"># SELECT postgis_full_version();</span>
                                                  postgis_full_version                                            
       
<span class="token comment">---------------------------------------------------------------------------------------</span>
 POSTGIS<span class="token operator">=</span><span class="token string">"3.3.1 3786b21"</span> <span class="token punctuation">[</span>EXTENSION<span class="token punctuation">]</span> PGSQL<span class="token operator">=</span><span class="token string">"150"</span> GEOS<span class="token operator">=</span><span class="token string">"3.11.0-CAPI-1.17.0"</span> PROJ<span class="token operator">=</span><span class="token string">"8.2.0"</span> LIBXML<span class="token operator">=</span><span class="token string">"2.9.10"</span> LIBJSON<span class="token operator">=</span><span class="token string">"0
.13.1"</span>
<span class="token punctuation">(</span><span class="token number">1</span> <span class="token keyword">row</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div></template>
