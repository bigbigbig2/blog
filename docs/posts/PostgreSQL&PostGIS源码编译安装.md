---
layout: Post
title:  PostgreSQL&PostGIS源码编译安装
date: 2022-11-08
subtitle: 最新版本PostgreSQL1.5.0&PostGIS-3.3.1编译安装
useHeaderImage: true
headerImage: /img/in-post/2022-11-08/1.jpg
tags:
  - PostgreSQL
---


[[toc]]

之前买的腾讯云服务器因为最近校园网卡的远程命令都会卡😓。所以不得不虚拟机里（centOS8 server）重装折腾下了－O－
### 1.PostgreSQL编译安装

#### [1]相关依赖包查找安装

安装数据库中的压缩功能开发包：

```shell
[root@VM-4-6-centos etc]# yum search zlib |grep devel
ghc-zlib-devel.x86_64 : Haskell zlib library development files
zlib-ada-devel.x86_64 : Development files for Zlib-Ada
zlib-devel.i686 : Header files and libraries for Zlib development
zlib-devel.x86_64 : Header files and libraries for Zlib development
zlib-static.i686 : Static libraries for Zlib development
zlib-static.x86_64 : Static libraries for Zlib development
[root@VM-4-6-centos etc]# sudo yum install zlib-devel.x86_64
```

psql中使用上下方向键把历史命令找出来的包：

```shell
[root@VM-4-6-centos etc]# yum search readline |grep devel
readline-devel.i686 : Files needed to develop programs which use the readline
readline-devel.x86_64 : Files needed to develop programs which use the readline
tcl-tclreadline-devel.x86_64 : Development files for the tclreadline library
[root@VM-4-6-centos etc]# yum install readline-devel.x86_64
```

#### [2]postgresql源码下载及编译安装

```
curl https://ftp.postgresql.org/pub/source/v15.0/postgresql-15.0.tar.gz
tar -zxvf postgresql-15.0.tar.gz
./configure --prefix=/opt/pgsql/15.0
make
make install
```

安装后的数据文件目录为：

```shell
[root@localhost 15.0]# ls -al
total 16
drwxr-xr-x. 6 shu postgres   56 Nov  2 22:40 .
drwxr-xr-x. 3 shu postgres   18 Nov  2 22:32 ..
drwxr-xr-x. 2 shu postgres 4096 Nov  2 22:40 bin  
drwxr-xr-x. 6 shu postgres 4096 Nov  2 22:40 include  #头文件目录
drwxr-xr-x. 4 shu postgres 4096 Nov  2 22:40 lib #动态链接库目录
drwxr-xr-x. 6 shu postgres 4096 Nov  2 22:40 share#share目录存放文档和配置模板文件，一些扩展包的SQL文件在此目录的子目录"extension"下
```

创建组及用户：

```
groupadd postgres
useradd shu -g postgres
```

然后将将相应的文件夹权限授予给新建的用户：

```shell
[root@localhost opt]# chown shu:postgres -R /opt/pgsql
[root@localhost opt]# chown shu:postgres -R /opt/pgdata
[root@localhost opt]# ll
total 0
drwxr-xr-x. 2 shu postgres  6 Nov  2 22:55 pgdata
drwxr-xr-x. 3 shu postgres 18 Nov  2 22:32 pgsql
```

> pgdata：数据目录
>
> pgsql：软件软件

#### [3]配置环境变量

配置数据库数据目录的环境变量（这里我又创建了一个data目录来区分存储pg中的其他数据）

```shell
[root@localhost pgdata]# sudo vim /etc/bashrc
在文件底下添加
export PGDATA=/opt/pgdata/data 数据目录
export PATH=$PATH:/opt/pgsql/15.0/bin 
export LD_LIBRARY_PATH=/opt/pgsql/15.0/lib 共享目录
```

```
source /etc/bashrc
```

> 这里为了学习方便直接配置了全部用户有效，且永久有效

查看配置情况：

```
[root@localhost pgdata]# echo $PATH
/home/shu/.local/bin:/home/shu/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin:/opt/pgsql/15.0/bin
[root@localhost pgdata]# echo $PGDATA
/opt/pgdata/data
[root@localhost pgdata]# echo $LD_LIBRARY_PATH
/opt/pgsql/15.0/lib
```

#### [4]创建数据库实例

```
initdb -D <your_data_location> --no-locale --encoding=UTF8
```

> 在PostgreSQL中，一个数据库服务（实例）下可以有多个数据库，但一个数据库不能属于多个实例，这与Oracle数据库不同。在Oracle数据库中，一个实例只能有一个数据库，但一个数据库可以在多个实例中（如RAC）

启动服务：

```
pg_ctl start -D $PGDATA
```

停止服务：

```
pg_ctl stop 
```

接下来则是对数据库做一些必要或者可选的配置了，配置文件在`$PGDATA`下

```
[root@localhost 15.0]# cd $PGDATA
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
```

> 由于这里的用户为shu，而postgres的psql命令默认使用的是postgres数据库/potgres用户，使用登录时需要通过参数指定一些数据库：
>
> ```
> psql -d postgres
> ```

#### [5]访问控制配置文件

在PostgreSQL中，允许哪些IP地址的机器访问数据库服务器是由`pg_hba.conf`文件来控制的。而默认创建的数据库无法接受远程连接，因为默认情况下`pg_hba.conf`中没有相应的配置项。

下面对该文件做简单配置：（该命令允许任何用户远程连接本数据库，连接时需要提供密码）

```
host all all 0/0 md5
```

修改完接受远程连接后还需要修改监听的IP和端口，该配置文件为postgresql.conf

```
#listen_addresses = '*' # what IP
address(es) to listen on;
#port = 5432 # (change
requires restart)
```

将listen_addresses中的“localhost”改为"*"表示在本地的所有地址上监听，这样就可以在所以远程主机上访问该数据库了。

修改后重启数据库服务生效

#### [6]内存参数配置

PostgreSQL安装完毕后，可以修改以下主要内存参数。

- `shared_buffers`：共享内存的大小，主要用于共享数据块。
- `work_mem`：单个SQL执行时，以及排序、Hash Join时使用的内存，SQL运行完毕后，该内存就会被释放

`shared_buffers`的默认值为32MB，如果你的机器上有足够的内存，可以把这个参数设置得大一些，如可以设置为物理内存大小的四分之一，这样数据库就可以缓存更多数据块，当读取数据时，就可以从共享内存中进行读取，而不需要再从文件上去读。而`work_mem`设置大一些，会使排序操作效率更高

#### [7]常用的管理命令

查看当前数据库实例的版本信息

```
select version();
```

显示当前数据库时区：

```
show timezone;
```

修改配置文件后重载

```
pg_ctl reload
```

查看表的大小

```
select pg_size_pretty(pg_relation_size('tablename')) ;
```

查看表及其索引的总大小

```
select pg_size_pretty(pg_total_relation_size('tablename')) ;
```

查看表上所有索引的大小

```
select pg_size_pretty(pg_indexes_size('tablename'));
```

### 2.postgis编译安装

postgis依赖以及与各种依赖对应的版本

https://trac.osgeo.org/postgis/wiki/UsersWikiPostgreSQLPostGIS

```
[shu@localhost root]$ psql --version
could not change directory to "/root": Permission denied
psql (PostgreSQL) 15.0
```

由于这里已经安装好了 PostgreSQL15.0版本，所以就全都用最新的版本吧，到时候还可以玩玩它们的新特性，这里选的相关依赖及版本为：

- `PostGIS 3.2.1`
- [GEOS 3.11.0](https://libgeos.org/usage/download/)几何图形库，用于支持PostGIS中的几何处理与分析等功能
- [Proj8.2](https://github.com/OSGeo/PROJ/releases)用于使PostGIS支持投影与变换相关功能
- [GDAL3.5.2](https://github.com/OSGeo/gdal/releases)用于使PostGIS支持栅格数据及其处理等功能
- `json-c 0.16`使JSON-C通过来支持`ST_GeomFromGeoJSON()`函数导入GeoJSON格式的数据
- [protobuf-c 1.4.0](https://github.com/protobuf-c/protobuf-c/releases)一个实现protobuf编码和解码的纯 C 库
- `SFCGAL 1.4.1`一个围绕 CGAL 的包装器，旨在在 OGC 标准模型上实现 2D 和 3D 操作
- `libxml` 用于解析xml文件的库,在各个平台下都能使用,也支持多种语言

#### [1]geos

以为geos的安装需要cmake，所以先安装cmake

```
tar -zxvf cmake-3.24.0.tar.gz
cd cmake-3.17.4
./bootstrap
gmake
make install
```

编译安装geos

```
tar -jxvf geos-3.11.0.tar.bz2
./configure --prefix=/opt/postgis/packages/geos-3.11.0
make
make install
```

 这个安装完后需要配置一下

```
vim /etc/ld.so.conf.d/geos.conf
文件中增加 /opt/postgis/packages/geos-3.11.0/lib64
保存退出
ldconfig
```



#### [2]proj

```
./configure --prefix=/opt/postgis/packages/proj-8.2.0
make && make install
```

> 依赖（如有依赖要求）如：
>
> ```
> yum install -y libtiff libtiff-devel.x86_64
> yum -y install sqlite sqlite-devel
> libcurl-devel  --checking for curl-config... no
> ```

#### [3]gdal

```
tar -zxvf gdal-3.5.2.tar.gz

./configure --prefix=/opt/postgis/packages/gdal-3.5.2 --with-proj=/opt/postgis/packages/proj-8.2.0

make 
make install
```

#### [4]json-c

```
./configure --prefix=/opt/postgis/packages/json-c
make
make install
```

#### [5]SFCGAL

该软件包是可选的，安装SFCGAL需要依赖Boost、CGAL（pgrouting插件也依赖于CGAL和Boost，所以就先装着吧）、GMP、MPFR这四个软件，需要先进行安装。

```
yum -y install boost-devel.x86_64
yum -y install gmp-devel
yum -y install mpfr-devel
```

而CGAL需要编译安装下[cgal-5.3.tar.gz](https://github.com/CGAL/cgal/releases?page=2)

```
tar -xzvf cgal-5.3.tar.gz
cmake /opt/postgis/tmp/cgal-5.3   -- cd到要安装的目录 生成makefile
make
make install
```

最后安装SFCGAL-v1.4.1

```
tar -xzvf SFCGAL-v1.4.1.tar.gz
cmake /opt/postgis/tmp/SFCGAL-v1.4.1
make
make install
```



```
ln -s /usr/local/lib64/libSFCGAL.so /usr/local/lib/libSFCGAL.so
ln -s /usr/local/lib64/libSFCGAL.so.1 /usr/local/lib/libSFCGAL.so.1
```



#### [6] protobuf-c

protobuf-c的安装需要依赖[protobuf](https://github.com/google/protobuf)和pkg-config，所以这里先对其进行安装

```
tar -vxzf protobuf-all-3.19.5.tar.gz
./configure --prefix=/opt/postgis/packages/protobuf-3.19.5
make && make install
```

安装protobuf-c

```
tar -vxzf protobuf-c-1.1.0.tar.gz
./configure --prefix=/opt/postgis/packages/protobuf-c-1.3.3
make && make install
```

> 报错：找不到上面安装的protobuf。。。
>
> ```
> checking for protobuf... no
> checking for protobuf... no
> ```
>
> 按照提示配个环境变量试试
>
> ```
> sudo vim /etc/bashrc
> ```
>
> ```
> export LD_LIBRARY_PATH=/opt/postgis/packages/protobuf-3.19.5/lib:$LD_LIBRARY_PATH
> export PKG_CONFIG_PATH=/opt/postgis/packages/protobuf-3.19.5/lib/pkgconfig
> ```
>
> ```
> source /etc/bashrc
> ```
>
> ok

#### [7]libxml2

https://gitlab.gnome.org/GNOME/libxml2/-/releases

```
./configure --prefix=/opt/postgis/packages/libxml2-2.9.10
make 
make install
```



#### [8]postgis

通过`./configure --help`查看下那些包的配置名：

```
tar -zvxf postgis-3.3.1.tar.gz
./configure --prefix=/opt/postgis/postgis-3.3.1 --with-geosconfig=/opt/postgis/packages/geos-3.11.0/bin/geos-config \
--with-gdalconfig=/opt/postgis/packages/gdal-3.5.2/bin/gdal-config \
--with-pgconfig=/opt/pgsql/15.0/bin/pg_config \
--with-projdir=/opt/postgis/packages/proj-8.2.0 \
--with-jsondir=/opt/postgis/packages/json-c \
--with-sfcgal=/opt/postgis/packages/SFCGAL-v1.4.1/sfcgal-config \
--with-xml2config=/opt/postgis/packages/libxml2-2.9.10/bin/xml2-config \
--with-protobuf=/opt/postgis/packages/protobuf-c-1.3.3

make && make install
```

加载动态库到内存`sudo vim /etc/lo.so.conf`

```
/opt/pgsql/15.0/lib
/opt/postgis/packages/geos-3.11.0/lib64
/opt/postgis/packages/proj-8.2.0/lib
/opt/postgis/packages/gdal-3.5.2/lib
/opt/postgis/packages/json-c/lib
/opt/postgis/packages/libxml2-2.9.10/lib
```

加载配置：`ldconfig`

create extension时报错：

```sql
gis_db=# create extension postgis;
2022-11-08 16:10:34.023 CST [1916] ERROR:  could not load library "/opt/pgsql/15.0/lib/postgis-3.so": libSFCGAL.so.1: cannot open shared object file: No such file or directory
```

把对应的文件拷贝到相应目录

```shell
[root@localhost lib]# find / -name "libSFCGAL.so.1"
/usr/local/lib/libSFCGAL.so.1
/usr/local/lib64/libSFCGAL.so.1
cp /usr/local/lib/libSFCGAL.so.1 /opt/pgsql/15.0/lib
```

ok

```sql
gis_db=# create extension postgis;
CREATE EXTENSION
gis_db=# SELECT postgis_full_version();
                                                  postgis_full_version                                            
       
---------------------------------------------------------------------------------------
 POSTGIS="3.3.1 3786b21" [EXTENSION] PGSQL="150" GEOS="3.11.0-CAPI-1.17.0" PROJ="8.2.0" LIBXML="2.9.10" LIBJSON="0
.13.1"
(1 row)
```

