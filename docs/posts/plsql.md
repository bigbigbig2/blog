---
layout: Post
title:  PL/pgSQL
date: 2022-09-10
subtitle: PL/pgSQL基本语法、用户自定义函数、存储过程、Cursor游标、触发器等
useHeaderImage: true
headerImage: /img/in-post/2022-9-10/1.jpg
tags:
  - PostgreSQL
  - PL/pgSQL
---

本文章主要部分为https://www.postgresqltutorial.com翻译简化的学习笔记

## 1.简介

L/pgSQL是一种用于PostgreSQL数据库系统的可载入的过程语言。

- 可以被用来创建函数和触发器过程
- 对SQL语言增加控制结构
- 可以执行复杂计算
- 继承所有用户定义类型、函数和操作符
- 可以被定义为受服务器信任
- 便于使用

### [1]使用PL/pgSQL的优点

SQL 是一种查询语言，可让您轻松地从数据库中查询数据。但是，PostgreSQL 只能单独执行 SQL 语句。

这意味着您有多个语句，您需要像这样一个一个地执行它们：

- 首先，向 PostgreSQL 数据库服务器发送查询。
- 接下来，等待它处理。
- 然后，处理结果集。
- 之后，进行一些计算。
- 最后，向 PostgreSQL 数据库服务器发送另一个查询并重复此过程。

此过程会产生进程间通信和网络开销。

为了解决这个问题，PostgreSQL 使用 PL/pgSQL。

PL/pgSQL 将多个语句包装在一个对象中并将其存储在 PostgreSQL 数据库服务器上。

因此，您可以发送一条语句来执行存储在服务器中的对象，而不是一一发送多个语句到服务器。这使您可以：

- 减少应用程序和 PostgreSQL 数据库服务器之间的往返次数。
- 避免在应用程序和服务器之间传输即时结果。

### [2]PostgreSQL PL/pgSQL 的缺点

除了使用 PL/pgSQL 的优点之外，还有一些注意事项：

- 软件开发速度较慢，因为 PL/pgSQL 需要许多开发人员不具备的专业技能。
- 版本管理困难，调试困难。
- 可能无法移植到其他数据库管理系统

## 2.$$符号引用的字符串常量

如何`$$`在用户定义的函数和存储过程中使用美元引用的字符串常量 。

在 PostgreSQL 中，使用单引号作为字符串常量，如下所示：

```sql
select 'String constant';
```

当字符串常量包含单引号 ( `'`) 时，您需要通过加倍单引号来对其进行转义。例如：

```sql
select 'I''m also a string constant';
```

PostgreSQL 8.0 版引入了美元符号引用功能，使字符串常量更具可读性。

语法：

```
$tag$<string_constant>$tag$
在此语法中，tag是可选的。它可能包含零个或多个字符。
```

在两个`$tag$`之间，你可以放置任何带有单引号 ( `'`) 和反斜杠 ( `\`) 的字符串。例如：

```sql
select $$I'm a string constant that contains a backslash \$$;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/af52a89eb4544c5681b0a67b51a5757e.png)


使用带标记的美元引号字符串常量语法：

```
SELECT $message$I'm a string constant that contains a backslash \$message$;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/db11788e3b95435e84a040421384e3e8.png)




### [1]在匿名块中使用$$

一个简单的PL/pgSQL匿名块

```sql
do 
'declare
   film_count integer;
begin 
   select count(*) into film_count
   from film;
   raise notice ''The number of films: %'', film_count;
end;';
```

块中的代码必须用单引号括起来。如果它内部有任何单引号，则需要通过像这样将其转义：

```
raise notice ''The number of films: %'', film_count;
```

### [2]在函数中使用$$

```sql
create function function_name(param_list) 
    returns datatype
language lang_name
as 
 'function_body'
```

在这种语法中，`function_body`是一个字符串常量。例如，以下函数通过 id 查找电影：

```sql
create function find_film_by_id(
   id int
) returns film 
language sql
as 
  'select * from film 
   where film_id = id';
```

如您所见，`find_film_by_id()`函数的主体用单引号括起来。

如果函数有很多语句，它就会变得更难阅读。在这种情况下，您可以使用美元引用的字符串常量语法：

```sql
create function find_film_by_id(
   id int
) returns film 
language sql
as 
$$
  select * from film 
  where film_id = id;  
$$;
```

### [2]在存储过程中使用$$

```sql
create procedure proc_name(param_list)
language lang_name
as $$
  -- stored procedure body
$$
```

## 3.PL/pgSQL 块结构

PL/pgSQL 是一种块结构语言，因此，PL/pgSQL函数或存储过程被组织成块。

PL/pgSQL 中完整块的语法：

```sql
[ <<label>> ]
[ declare
    declarations ]
begin
    statements;
	...
end [ label ];
```

> - 每个块有两个部分：声明和正文。声明部分是可选的，而正文部分是必需的。块以关键字`;`后的分号 ( ) 结束。`END`
> - 一个块可能有一个位于开头和结尾的可选标签label。`EXIT`当你想在块体的语句中指定它或者当你想限定在块中声明的[变量](https://www.postgresqltutorial.com/plpgsql-variables/)的名称时，你可以使用块标签 
> - 声明部分是声明在正文中所使用的变量的地方。声明部分中的每条语句都以分号 ( `;`) 结束。
> - 正文部分是放置代码的地方。正文部分中的每个语句也以分号 (;) 结束。
> - 

### [1]PL/pgSQL 块结构示例

一个匿名块

```sql
do $$ 
<<first_block>>
declare
  film_count integer := 0;
begin
   -- get the number of films
   select count(*) 
   into film_count
   from film;
   -- display a message
   raise notice 'The number of films is %', film_count;
end first_block $$;
```

```
NOTICE:  The current value of counter is 1
```

> - 该`DO`语句不属于该块。它用于执行匿名块。PostgreSQL`DO`从 9.0 版本开始引入该语句。
>
> - 匿名块必须用单引号或$$包起来

### [2]PL/pgSQL 子块

PL/pgSQL 允许您将一个块放置在另一个块的主体内。

嵌套在另一个块中的块称为子块。包含子块的块称为外块。

下图说明了外块和子块：

![在这里插入图片描述](https://img-blog.csdnimg.cn/088fc4e5fb514146a1af765889452a66.png)


> 通常，您将一个大块划分为更小且更具逻辑性的子块。子块中的变量可以具有与外部块中的名称相同的名称，尽管这不是一个好的做法。

### [3]小结

- PL/pgSQL 是一种块结构语言。它将程序组织成块。
- 块包含两部分：声明和主体。声明部分是可选的，而正文部分是强制性的。
- 块可以嵌套。嵌套块是放置在另一个块的主体内的块

## 4.变量和常量

### [1]变量

在使用变量之前，您必须在[PL/pgSQL 块](https://www.postgresqltutorial.com/plpgsql-block-structure/)的声明部分中声明它

声明语法:

```
variable_name data_type [:= expression];
```

> - 使用特定数据类型与变量相关联。数据类型可以是任何有效的数据类型，例如[integer](https://www.postgresqltutorial.com/postgresql-integer/)、[numeric](https://www.postgresqltutorial.com/postgresql-numeric/)、[varchar](https://www.postgresqltutorial.com/postgresql-char-varchar-text/)和 [char](https://www.postgresqltutorial.com/postgresql-char-varchar-text/)。
> - 可选地为变量分配默认值。如果不这样做，变量的初始值为`NULL`
> - 可以使用`:=`或`=`赋值运算符来初始化变量并将值分配给变量。

示例：

```sql
do $$ 
declare
   counter    integer := 1;
   first_name varchar(50) := 'John';
   last_name  varchar(50) := 'Doe';
   payment    numeric(11,2) := 20.5;
begin 
   raise notice '% % % has been paid % USD', 
       counter, 
	   first_name, 
	   last_name, 
	   payment;
end $$;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/5d0e29effc45407d9729c2593ec88dfe.png)

```sql
do $$
declare 
	created_at time := now();
begin 
	raise notice '%',created_at;
	perform pg_sleep(10);
	raise notice '%',created_at;
end $$;
```

```
NOTICE:  14:23:33.064008
NOTICE:  14:23:33.064008
```

### [2]复制数据类型

使用%type来复制表中某个字段（或某个已经存在的变量）的数据类型

```
variable_name table_name.column_name%type;
variable_name variable%type;
```

示例：

```sql
do $$ 
declare
   film_title film.title%type;
   featured_title film_title%type;
begin 
   -- get title of the film id 100
   select title
   from film
   into film_title
   where film_id = 100;
   
   -- show the film title
   raise notice 'Film title id 100: %s', film_title;
end; $$
```

#### 块和子块中的变量

当您在子块中声明与外部块中的另一个变量同名的变量时，外部块中的变量将隐藏在子块中。

如果要访问外部块中的变量，请使用块标签来限定其名称，如下例所示：

```sql
do $$
<<outer_block>>
declare
	counter integer :=0;
begin 
	counter :=counter + 1;
	raise notice 'The current value of the counter is %',counter;
	
	declare 
		counter integer :=0;
	begin 
		counter :=counter +10;
		raise notice 'Counter in the subblock is %',counter;
		raise notice 'Counter in the outer block is %',outer_block.counter;
	end;
	
	raise notice 'Counter in the outer block is %',counter;
end outer_block $$;
```

```
NOTICE:  The current value of the counter is 1
NOTICE:  Counter in the subblock is 10
NOTICE:  Counter in the outer block is 1
NOTICE:  Counter in the outer block is 1
```

> - 内部块与外部块可以同名
>
> - 在内部块中使用外部块的变量时，需要加上外部块的表示符

### [3]select into

PostgreSQL`SELECT INTO`语句创建一个新表并将查询返回的数据插入到表中

与常规[`SELECT`](https://www.postgresqltutorial.com/postgresql-select/)语句不同，该`SELECT INTO`语句不向客户端返回结果

```sql
SELECT
    select_list
INTO [ TEMPORARY | TEMP | UNLOGGED ] [ TABLE ] new_table_name
FROM
    table_name
WHERE
    search_condition;

```

> - 要使用从结果集派生的结构和数据创建新表，请在`INTO`关键字后指定新表名
>
> - `TEMP`or`TEMPORARY`关键字是可选的；它允许您创建一个临时表
>
> - 如果可用的`UNLOGGED`关键字将使新表成为未记录的表
> - 不能在 PL/pgSQL 中使用`SELECT INTO`，因为它对`INTO`子句的解释不同。在这种情况下，您可以使用`CREATE TABLE AS`提供比语句更多功能的`SELECT INTO`语句。

**示例：**(创建一个新表`film_r`)

```sql
SELECT
    film_id,
    title,
    rental_rate
INTO TABLE film_r
FROM
    film
WHERE
    rating = 'R'
AND rental_duration = 5
ORDER BY
    title;

```

```
SELECT * FROM film_r;
```

**示例：**（创建一个临时表）

```sql
SELECT
    film_id,
    title,
    length 
INTO TEMP TABLE short_film
FROM
    film
WHERE
    length < 60
ORDER BY
    title;
```

### [4]行类型变量

使用 PL/pgSQL 行类型来声明保存结果集的完整行的行变量

要存储语句返回的结果集的整行`select into`，请使用行类型变量或行变量

您可以使用以下语法声明具有与表中行的数据类型相同数据类型的变量：

```
row_variable table_name%ROWTYPE;
row_variable view_name%ROWTYPE;
```

要访问行变量的单个字段，请使用点表示法 ( `.`)，如下所示：

```
row_variable.field_name
```

**示例：**（显示了演员 id 10 的名字和姓氏）

```sql
do $$
declare
   selected_actor actor%rowtype;
begin
   -- select actor with id 10   
   select * 
   from actor
   into selected_actor   -- 将查询结果存到这个行类型变量中
   where actor_id = 10;

   -- show the number of actor
   raise notice 'The actor name is % %',
      selected_actor.first_name,
      selected_actor.last_name;
end; $$

```

### [5]记录类型变量

记录类型允许您定义可以保存结果集中单行的变量

`record`变量类似于行类型变量。它只能保存结果集的一行

语法：`variable_name record;`

**示例1：（使用带有 select into 语句的记录）**

```sql
do
$$
declare
	rec record;
begin
	-- select the film 
	select film_id, title, length 
	into rec
	from film
	where film_id = 200;
	
	raise notice '% % %', rec.film_id, rec.title, rec.length;   
	
end;
$$
language plpgsql;

```

**示例2：（在for循环语句中使用记录变量）**

下面展示了如何在`for loop`语句中使用记录变量：

```sql
do
$$
declare
	rec record;
begin
	for rec in select title, length 
			from film 
			where length > 50
			order by length
	loop
		raise notice '% (%)', rec.title, rec.length;	
	end loop;
end;
$$
```

```
NOTICE:  Hall Cassidy (51)
NOTICE:  Champion Flatliners (51)
NOTICE:  Deep Crusade (51)
NOTICE:  Simon North (51)
NOTICE:  English Bulworth (51)
...
```

> - 首先，声明一个名为 r 的变量，其类型为`record`。
> - 其次，使用该`for loop`语句从`film`表中获取行（在示例数据库中）。该语句在每次迭代中将由和`for loop`组成的行分配给变量。title，length，rec
> - `rec.title`三、使用点表示法（和`rec.length`）显示记录变量的字段内容

- 记录是一个占位符，可以保存结果集的单行。
- 记录没有像行变量那样的预定义结构。它的结构是在您为其分配行时确定的。

### [6]常量

与变量不同，常量的值一旦初始化就不能更改

常量使代码更具可读性和可维护性

**定义常量：**

```sql
constant_name constant data_type := expression;
```

**示例：**

```sql
do $$ 
declare
   vat constant numeric := 0.1;
   net_price    numeric := 20.5;
begin
   raise notice 'The selling price is %', net_price * ( 1 + vat );
end $$;
```

## 5.报告消息和错误

使用`raise`语句报告消息和引发错误，使用该`assert`语句将调试检查插入到 PL/pgSQL 块中

### [1]报告消息

要引发消息，请使用以下`raise`语句：

```
raise level format;
```

让我们更详细地检查该`raise`语句。

### [2]等级

语句后面是指定错误严重性`raise`的选项。`level`

PostgreSQL 提供以下级别：

-  `debug`
-  `log`
-  `notice`
-  `info`
-  `warning`
-  `exception`

如果您不指定`level`，默认情况下，该`raise`语句将使用`exception` 引发错误并停止当前事务的级别。

### [3]格式

这`format`是一个指定消息的字符串。使用将由参数替换的百分比 ( ) 占位符`format`。`%`

占位符的数量必须与参数的数量相同，否则 PostgreSQL 会报错：

```
[Err] ERROR:  too many parameters specified for raise代码语言： CSS  （css ）
```

以下示例说明了`raise`在当前时间报告不同消息的语句。

```sql
do $$ 
begin 
  raise info 'information message %', now() ;
  raise log 'log message %', now();
  raise debug 'debug message %', now();
  raise warning 'warning message %', now();
  raise notice 'notice message %', now();
end $$;
```

输出：
![在这里插入图片描述](https://img-blog.csdnimg.cn/cad3dab050344350a8969a0b13237e18.png)


> 请注意，并非所有消息都报告给客户端。PostgreSQL 仅将 、 和 level 消息报告`info`回`warning`客户`notice`端。这由`client_min_messages` 配置`log_min_messages` 参数控制

### [4]引发错误

要引发错误，请使用语句`exception`后的级别。`raise`请注意，该`raise`语句`exception`默认使用级别。

除了引发错误之外，您还可以使用以下附加子句添加更多信息：

```
using option = expression
```

`option`可以是：

- `message`: 设置错误信息
- `hint`：提供提示信息，以便更容易发现错误的根本原因。
- `detail`: 提供有关错误的详细信息。
- `errcode`：识别错误代码，可以是条件名称，也可以直接是五字符`SQLSTATE`代码。请参阅[错误代码和条件名称表](https://www.postgresql.org/docs/current/static/errcodes-appendix.html)。

是一个字符串值的`expression`表达式。以下示例引发重复的电子邮件错误消息：

```sql
do $$ 
declare
  email varchar(255) := 'info@postgresqltutorial.com';
begin 
  -- check email for duplicate
  -- ...
  -- report duplicate email
  raise exception 'duplicate email: %', email 
		using hint = 'check the email again';
end $$;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/04c061723056432c854c38d2b74bf648.png)


以下示例说明了如何引发 an`SQLSTATE`及其对应的条件：

```sql
do $$ 
begin 
	--...
	raise sqlstate '2210b';
end $$;
```

```sql
do $$ 
begin 
	--...
	raise invalid_regular_expression;
end $$;
```

现在您可以使用`raise`语句来引发消息或报告错误。

### [5]Assert

 PostgreSQL 断言语句以及如何将其用于调试目的

> PostgreSQL`assert`从 9.5 版开始引入了该语句。在使用之前检查您的 PostgreSQL 版本。

下面说明了`assert`语句的语法：

```sql
assert condition [, message];
```

在这种语法中：

#### 1) 条件

是`condition`一个布尔表达式，预期总是返回`true`。

如果`condition`计算结果为`true`，则该`assert`语句不执行任何操作。

如果`condition`计算结果为`false`or `null`，PostgreSQL 会引发`assert_failure`异常。

#### 2) 留言

该消息是可选的。

如果你不通过`message`，PostgreSQL`assertion failed`默认使用“ ”消息。如果您将 传递`message`给`assert`语句，它将使用它来替换默认消息。

请注意，您应该将该`assert`语句仅用于检测错误，而不是用于报告。要报告消息或错误，请改用`raise`语句。

#### 启用/禁用断言

PostgreSQL 提供`plpgsql.check_asserts`配置参数来启用或禁用断言测试。如果将此参数设置为`off`，则 assert 语句将不执行任何操作。

示例：使用该`assert`语句检查示例数据库`film`中的表是否有数据：

```sql
do $$
declare 
   film_count integer;
begin
   select count(*)
   into film_count
   from film;
   
   assert film_count > 0, 'Film not found, check the film table';
end$$;
```

因为电影表有数据，所以块没有发出任何消息。

以下示例发出错误，因为电影表中的电影数量不大于`1,000`。

```sql
do $$
declare 
   film_count integer;
begin
   select count(*)
   into film_count
   from film;
   
   assert film_count > 1000, '1000 Film found, check the film table';
end$$;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/566c9a06370e4374981480c53fa5b1e8.png)


小结：

- 使用该`assert`语句将调试检查添加到 PL/pgSQL 代码。
- 该`assert`语句评估`condition`预期为的 a 并在条件为或`true`的情况下发出错误。`false``null`
- 该`assert`语句仅用于检测错误。要报告普通消息和错误，请改用该`raise`语句。

## 5.控制结构

### [1]if

PL/pgSQL 提供了三种形式的`if`语句。

- `if then`
- `if then else`
- `if then elsif`

#### 1) PL/pgSQL if-then 语句

下面说明了该`if`语句的最简单形式：

```sql
if condition then
   statements;
end if;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/ffa282d63ca94d809403310673ff9f11.png)


使用示例：

```sql
do $$
declare
  selected_film film%rowtype;
  input_film_id film.film_id%type := 0;
begin  

  select * from film
  into selected_film
  where film_id = input_film_id;
  
  if not found then
     raise notice'The film % could not be found', 
	    input_film_id;
  end if;
end $$
```

> 这`found`是一个在 PL/pgSQL 过程语言中可用的全局变量

#### 2) PL/pgSQL if-then-else 语句

语法

```sql
if condition then
  statements;
else
  alternative-statements;
END if;
```

示例：

```sql
do $$
declare
  selected_film film%rowtype;
  input_film_id film.film_id%type := 100;
begin  

  select * from film
  into selected_film
  where film_id = input_film_id;
  
  if not found then
     raise notice 'The film % could not be found', 
	    input_film_id;
  else
     raise notice 'The film title is %', selected_film.title;
  end if;
end $$
```

#### 3) PL/pgSQL if-then-elsif 语句

语法：

```sql
if condition_1 then
  statement_1;
elsif condition_2 then
  statement_2
...
elsif condition_n then
  statement_n;
else
  else-statement;
end if;
```

示例：

```sql
do $$
declare
   v_film film%rowtype;
   len_description varchar(100);
begin  

  select * from film
  into v_film
  where film_id = 100;
  
  if not found then
     raise notice 'Film not found';
  else
      if v_film.length >0 and v_film.length <= 50 then
		 len_description := 'Short';
	  elsif v_film.length > 50 and v_film.length < 120 then
		 len_description := 'Medium';
	  elsif v_film.length > 120 then
		 len_description := 'Long';
	  else 
		 len_description := 'N/A';
	  end if;
    
	  raise notice 'The % film is %.',
	     v_film.title,  
	     len_description;
  end if;
end $$
```

### [2]case语句

`case`声明有两种形式：

- 简单的`case`陈述
- 搜索`case`语句

> 请注意，您不要混淆`case`语句和case 表达式。`case`表达式计算为一个值，而语句`case`根据条件选择要执行的部分。

```sql
case search-expression
   when expression_1 [, expression_2, ...] then
      when-statements
  [ ... ]
  [else
      else-statements ]
END case;
```

#### 1) 简单的case语句

示例：

```sql
do $$
declare 
	rate   film.rental_rate%type;
	price_segment varchar(50);
begin
    -- get the rental rate
    select rental_rate into rate 
    from film 
    where film_id = 100;
	
	-- assign the price segment
	if found then
		case rate
		   when 0.99 then
              price_segment =  'Mass';
		   when 2.99 then
              price_segment = 'Mainstream';
		   when 4.99 then
              price_segment = 'High End';
		   else
	    	  price_segment = 'Unspecified';
		   end case;
		raise notice '%', price_segment;  
    end if;
end; $$
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/9f94c0a69a7c47eb84c8e6aa46f2adfd.png)


#### 2) 检索案例陈述

以下语法显示了搜索`case`语句的语法：

```sql
case
    when boolean-expression-1 then
      statements
  [ when boolean-expression-2 then
      statements
    ... ]
  [ else
      statements ]
end case;
```

示例：

```sql
do $$ 
declare
    total_payment numeric; 
    service_level varchar(25) ;
begin
     select sum(amount) into total_payment
     from Payment
     where customer_id = 100; 
	 
	 if found then
	    case 
		   when total_payment > 200 then
               service_level = 'Platinum' ;
           when total_payment > 100 then
	           service_level = 'Gold' ;
           else
               service_level = 'Silver' ;
        end case;
		raise notice 'Service Level: %', service_level;
     else
	    raise notice 'Customer not found';
	 end if;
end; $$ 

```

### [3]loop循环

`loop`重复执行一段代码，直到被`exit`or`return`语句终止

**语法：**

```sql
<<label>>
loop
   statements;
end loop;
```

通常使用`if`循环内的语句来根据如下条件终止它：

```sql
<<label>>
loop
   statements;
   if condition then
      exit;
   end if;
end loop;
```

也可以嵌套循环

```sql
<<outer>>
loop 
   statements;
   <<inner>>
   loop
     /* ... */
     exit <<inner>>
   end loop;
end loop;
```

> 当有嵌套循环时，需要使用循环标签，以便可以在`exit`and`continue`语句中指定它以指示这些语句引用哪个循环。

**示例：**

使用`loop`语句来计算斐波那契数列

```sql
do $$
declare
   n integer:= 10;
   fib integer := 0;
   counter integer := 0 ; 
   i integer := 0 ; 
   j integer := 1 ;
begin
	if (n < 1) then
		fib := 0 ;
	end if; 
	loop 
		exit when counter = n ; 
		counter := counter + 1 ; 
		select j, i + j into i,	j ;
	end loop; 
	fib := i;
    raise notice '%', fib; 
end; $$
```

### [4]while循环

`while`循环语句执行代码块，直到条件计算为`false`。

```sql
[ <<label>> ]
while condition loop
   statements;
end loop;
```

**示例：（使用`while`循环语句来显示计数器的值）**

```sql
do $$
declare 
   counter integer := 0;
begin
   while counter < 5 loop
      raise notice 'Counter %', counter;
	  counter := counter + 1;
   end loop;
end$$;
```

### [5]for循环

下面说明了在`for`整数范围内循环的循环语句的语法：

```sql
[ <<label>> ]
for loop_counter in [ reverse ] from.. to [ by step ] loop
    statements
end loop [ label ];
```

示例：

```sql
do $$
begin
   for counter in 1..5 loop
	raise notice 'counter: %', counter;
   end loop;
end; $$
```

```
NOTICE:  Counter: 1
NOTICE:  Counter: 2
NOTICE:  Counter: 3
NOTICE:  Counter: 4
NOTICE:  Counter: 5
```

```sql
do $$
begin
   for counter in reverse 5..1 loop
      raise notice 'counter: %', counter;
   end loop;
end; $$
```

```
NOTICE:  Counter: 5
NOTICE:  Counter: 4
NOTICE:  Counter: 3
NOTICE:  Counter: 2
NOTICE:  Counter: 1
```

```sql
do $$
begin 
  for counter in 1..6 by 2 loop
    raise notice 'counter: %', counter;
  end loop;
end; $$
```

```
NOTICE:  Counter 1
NOTICE:  Counter 3
NOTICE:  Counter 5
```

#### 使用 PL/pgSQL for 循环查询结果

语法：

```sql
[ <<label>> ]
for target in query loop
    statements
end loop [ label ];
```

示例：

```sql
do
$$
declare
    f record;
begin
    for f in select title, length 
	       from film 
	       order by length desc, title
	       limit 10 
    loop 
	raise notice '%(% mins)', f.title, f.length;
    end loop;
end;
$$
```

```
NOTICE:  Chicago North(185 mins)
NOTICE:  Control Anthem(185 mins)
NOTICE:  Darn Forrester(185 mins)
NOTICE:  Gangs Pride(185 mins)
NOTICE:  Home Pity(185 mins)
NOTICE:  Muscle Bright(185 mins)
NOTICE:  Pond Seattle(185 mins)
NOTICE:  Soldiers Evolution(185 mins)
NOTICE:  Sweet Brotherhood(185 mins)
NOTICE:  Worst Banger(185 mins)
```

#### 使用 PL/pgSQL for 循环动态查询结果

```sql
[ <<label>> ]
for row in execute query_expression [ using query_param [, ... ] ] 
loop
    statements
end loop [ label ];
```

示例：

```sql
do $$
declare
    -- sort by 1: title, 2: release year
    sort_type smallint := 1; 
	-- return the number of films
	rec_count int := 10;
	-- use to iterate over the film
	rec record;
	-- dynamic query
    query text;
begin
		
	query := 'select title, release_year from film ';
	
	if sort_type = 1 then
		query := query || 'order by title';
	elsif sort_type = 2 then
	  query := query || 'order by release_year';
	else 
	   raise 'invalid sort type %s', sort_type;
	end if;

	query := query || ' limit $1';

	for rec in execute query using rec_count
        loop
	     raise notice '% - %', rec.release_year, rec.title;
	end loop;
end;
$$
```

```
NOTICE:  2006 - Academy Dinosaur
NOTICE:  2006 - Ace Goldfinger
NOTICE:  2006 - Adaptation Holes
NOTICE:  2006 - Affair Prejudice
NOTICE:  2006 - African Egg
NOTICE:  2006 - Agent Truman
NOTICE:  2006 - Airplane Sierra
NOTICE:  2006 - Airport Pollock
NOTICE:  2006 - Alabama Devil
NOTICE:  2006 - Aladdin Calendar
```

### [6]exit

该`exit`语句允许您终止循环，包括无loop循环、while 循环和for 循环

语法：

```
exit [label] [when boolean_expression]
```

> 如果不使用标签，`exit`语句将终止当前循环

以下语句是等效的：

```
exit when counter > 10;
```

```
if counter > 10 then
   exit;
end if;
```

`exit when`绝对更干净，更短

**示例：**

#### 1) 使用 PL/pgSQL Exit 语句终止loop

```sql
do
$$
declare 
   i int = 0;
   j int = 0;
begin
  <<outer_loop>>
  loop 
     i = i + 1;
     exit when i > 3;
	 -- inner loop
	 j = 0;
     <<inner_loop>>
     loop 
		j = j + 1;
		exit when j > 3;
		raise notice '(i,j): (%,%)', i, j;
	 end loop inner_loop;
  end loop outer_loop;
end;
$$
```

```
NOTICE:  (i,j): (1,1)
NOTICE:  (i,j): (1,2)
NOTICE:  (i,j): (1,3)
NOTICE:  (i,j): (2,1)
NOTICE:  (i,j): (2,2)
NOTICE:  (i,j): (2,3)
NOTICE:  (i,j): (3,1)
NOTICE:  (i,j): (3,2)
NOTICE:  (i,j): (3,3)
```

#### 2) 使用 PL/pgSQL Exit 语句退出一个块

```sql
do
$$
begin
  
  <<simple_block>>  
   begin
  	 exit simple_block;
         -- for demo purposes
	 raise notice '%', 'unreachable!';
   end;
   raise notice '%', 'End of block';
end;
$$
```

```
NOTICE:  End of block
```

### [7]continue

`continue`语句跳过某次循环的当前迭代并跳转到下一个迭代

该`continue`语句可用于各种循环，包括无条件循环、while 循环)和for 循环

```
continue [loop_label] [when condition]
```

> `loop_label`和`when condition`是可选的

示例：

以下示例使用`continue`无条件循环中的语句打印出 1 到 10 的奇数：

```sql
do
$$
declare
   counter int = 0;
begin
  loop
     counter = counter + 1;
	 -- exit the loop if counter > 10
	 exit when counter > 10;
	 -- skip the current iteration if counter is an even number
	 continue when mod(counter,2) = 0;
	 -- print out the counter
	 raise notice '%', counter;
  end loop;
end;
$$
```

输出：

```
NOTICE:  1
NOTICE:  3
NOTICE:  5
NOTICE:  7
NOTICE:  9
```

## 7.用户自定义函数

### [1]创建函数

用户可以使用create function定义一个新的函数

**语法：**

```sql
create [or replace] function function_name(param_list)
   returns return_type 
   language plpgsql
  as
$$
declare 
-- variable declaration
begin
 -- logic
end;
$$
```

> - 使用`language plpgsql`指定函数的过程语言。请注意，PostgreSQL 支持许多过程语言，而不仅仅是`plpgsql`
> - 最后使用$$在函数后面定义一个块

**示例：**

创建了一个函数来计算长度在`len_from`和`len_to`参数之间的电影

```sql
create function get_film_count(len_from int, len_to int)
returns int
language plpgsql
as
$$
declare
   film_count integer;
begin
   select count(*) 
   into film_count
   from film
   where length between len_from and len_to;
   
   return film_count;
end;
$$;
```

> - 该函数`get_film_count`有两个主要部分：标题和正文
>
> - 在块的末尾，使用`return`语句返回`film_count`给函数
> ![在这里插入图片描述](https://img-blog.csdnimg.cn/ff899a3995e34b4d951c8e6b4dffcbf4.png)


调用用户自定义函数：

PostgreSQL 为您提供了三种调用用户定义函数的方法：

- 使用位置符号
- 使用命名符号
- 使用混合符号。

**1) 使用位置符号**

要使用位置符号调用函数，您需要以与参数相同的顺序指定参数。例如：

```sql
select get_film_count(40,90);
```

输出：

```
 get_film_count
----------------
            325
(1 row)
```

**2) 使用命名符号**

下面显示了如何`get_film_count`使用位置表示法调用函数：

```sql
select get_film_count(
    len_from => 40, 
     len_to => 90
);
```

输出：

```
 get_film_count
----------------
            325
(1 row)
```

在命名符号中，您使用`=>`分隔参数的名称和它的值。

为了向后兼容，PostgreSQL 支持基于`:=`以下的旧语法：

```sql
select get_film_count(
    len_from := 40, 
    len_to := 90
);
```

**3) 使用混合符号**

混合符号是位置符号和命名符号的组合。例如：

```sql
select get_film_count(40, len_to => 90);
```

请注意，您不能在位置参数之前使用命名参数，如下所示：

```sql
select get_film_count(len_from => 40, 90);
```

错误：

```shell
ERROR:  positional argument cannot follow named argument
LINE 1: select get_film_count(len_from => 40, 90);
```

### [2]函数参数模式

参数模式决定了参数的行为。PL/pgSQL 支持三种参数模式：`in`、`out`和`inout`. 如果您未明确指定参数，则默认情况下采用`in`模式

| in                       | out                         | inout                           |
| :----------------------- | :-------------------------- | :------------------------------ |
| 默认                     | 明确指定                    | 明确指定                        |
| 将值传递给函数           | 从函数返回一个值            | 将值传递给函数并返回更新的值。  |
| `in`参数的作用类似于常量 | `out`参数就像未初始化的变量 | `inout`参数就像一个初始化的变量 |
| 无法赋值                 | 必须赋值                    | 应该赋值                        |

#### 1）in模式

示例：以下函数通过 id 查找电影并返回电影的标题：

```sql
create or replace function find_film_by_id(p_film_id int)
returns varchar
language plpgsql
as $$
declare
   film_title film.title%type;
begin
  -- find film title by id
  select title 
  into film_title
  from film
  where film_id = p_film_id;
  
  if not found then
     raise 'Film with id % not found', p_film_id;
  end if;
  
  return title;
  
end;$$
```

> 因为我们没有指定`p_film_id`参数的模式，所以它`in`默认采用模式。

#### 2）out模式

将参数作为输出

`out`参数在需要返回多个值的函数中非常有用。

示例：（定义了`get_film_stat`具有三个`out`参数的函数）

```sql
create or replace function get_film_stat(
    out min_len int,
    out max_len int,
    out avg_len numeric) 
language plpgsql
as $$
begin  
  select min(length),
         max(length),
		 avg(length)::numeric(5,1)
  into min_len, max_len, avg_len
  from film;

end;$$
```

```sql
select get_film_stat();
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/78bfbc40a9304f6c9efe3e91765eae7c.png)


该函数的输出是一条记录。要将输出分隔为列，请使用以下语句：

```sql
select * from get_film_stat();
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/e666adb3da20489a8df4b973879e8eb8.png)


#### 3）inout模式

`inout`模式是组合`in`和`out`模式。

这意味着调用者可以将参数传递给函数。该函数更改参数并返回更新后的值。

以下`swap`函数接受两个整数及其值：

```sql
create or replace function swap(
	inout x int,
	inout y int
) 
language plpgsql	
as $$
begin
   select x,y into y,x;
end; $$;
```

调用函数：

```sql
select * from swap(10,20);
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/f7fc0a922f184d5eaf84ffa0fbf0c3df.png)


### [3]函数重载

PostgreSQL 允许多个函数共享相同的名称，只要它们具有不同的参数

如果两个或多个函数共享相同的名称，则函数名称将被重载

当您可以调用重载函数时，PostgreSQL 会根据函数参数列表选择最佳候选函数来执行。

以下`get_rental_duration()`函数返回指定客户的总租赁天数：

```sql
create or replace function get_rental_duration(
	p_customer_id integer
)
returns integer 
language plpgsql
as $$
declare 
	rental_duration integer; 
begin
	select 
		sum( extract(day from return_date - rental_date)) 
	into rental_duration 
    from rental 
	where customer_id = p_customer_id;

	return rental_duration;
end; $$
```

该`get_rental_function`函数具有`p_customer_id`作为`in`参数。

以下返回客户 id 232 的租赁天数：

```
SELECT get_rental_duration(232);
 get_rental_duration
---------------------
                  90
(1 row)
```

假设您想了解客户从特定日期到现在的租赁期限。

为此，您可以`p_from_date`在`get_retal_duration()`函数中再添加一个参数。或者您可以开发一个具有相同名称但有两个参数的新函数，如下所示：

```sql
create or replace function get_rental_duration(
	p_customer_id integer, 
	p_from_date date
)
returns integer 
language plpgsql
as $$
declare 
	rental_duration integer;
begin
	-- get the rental duration based on customer_id 
	-- and rental date
	select sum( extract( day from return_date + '12:00:00' - rental_date)) 
	into rental_duration
	from rental 
	where customer_id = p_customer_id and 
		  rental_date >= p_from_date;
	
	-- return the rental duration in days
	return rental_duration;
end; $$

```

此函数与第一个函数同名，只是它有两个参数。

换句话说，`get_rental_duration(integer)` 函数被函数重载了`get_rental_duration(integer,date)`。

以下语句返回客户 ID 的租用期限，`232`因为`July 1st 2005`：

```
SELECT get_rental_duration(232,'2005-07-01');代码语言： SQL（结构化查询语言） （sql ）
 get_rental_duration
---------------------
                  85
(1 row)
```

请注意，如果您省略第二个参数，PostgreSQL 将调用`get_rental_duration(integer)`具有一个参数的函数。

#### 函数重载和默认值

在`get_rental_duration(integer,date)`函数中，如果要为第二个参数设置默认值，如下所示：

```sql
create or replace function get_rental_duration(
	p_customer_id integer, 
	p_from_date date default '2005-01-01'
)
returns integer
language plpgsql
as $$
declare 
	rental_duration integer;
begin
	select sum( 
		extract( day from return_date + '12:00:00' - rental_date)
	) 
	into rental_duration
	from rental 
	where customer_id= p_customer_id and 
		  rental_date >= p_from_date;
	 
	return rental_duration;

end; $$代码语言： SQL（结构化查询语言） （sql ）
```

以下调用该`get_rental_duration()`函数并传递客户 ID 232：

```sql
SELECT get_rental_duration(232);
```

PostgreSQL 发出错误：

```
ERROR:  function get_rental_duration(integer) is not unique
LINE 1: SELECT get_rental_duration(232);
               ^
HINT:  Could not choose the best candidate function. You might need to add explicit type casts.
SQL state: 42725
Character: 
```

在这种情况下，PostgreSQL 无法选择最佳候选函数来执行

在这种情况下，您具有三个功能：

```
get_rental_duration(p_customer_id integer);
get_rental_duration(p_customer_id integer, p_from_date date)
get_rental_duration(p_customer_id integer, p_from_date date default '2005-01-01'
)
```

PostgreSQL 不知道应该执行第一个函数还是第三个函数

所以：当你重载一个函数时，你应该总是让它们的参数列表是唯一的

### [4]返回表的函数

要定义返回表的函数，请使用以下形式的create function语句：

```sql
create or replace function function_name (
   parameter_list
) 
returns table ( column_list ) 
language plpgsql
as $$
declare 
-- variable declaration
begin
-- body
end; 
```

此语法允许您返回具有指定列列表的表，而不是返回单个值：

```
returns table ( column_list )
```

使用`film`表进行演示：（使用了ILIKE 运算符返回其标题与特定模式匹配的所有电影）

```sql
create or replace function get_film (
  p_pattern varchar
) 
	returns table (
		film_title varchar,
		film_release_year int
	) 
	language plpgsql
as $$
begin
	return query 
		select
			title,
			release_year::integer
		from
			film
		where
			title ilike p_pattern;
end;$$
```

> - 这`get_film(varchar)`接受一个参数，该参数`p_pattern`是您想要与电影标题匹配的模式
>
> - 该函数返回一个查询，该查询是 select 语句的结果
>
> - 集中的列的数据类型必须与`returns table`子句后定义的表中的列相同

```sql
SELECT * FROM get_film ('Al%');
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/592e816e3ac0438cb28c96c4f73c9c79.png)


在实践中，您通常在将每一行附加到函数的结果集中之前对其进行处理：

```sql
create or replace function get_film (
	p_pattern varchar,
	p_year int
) 
returns table (
	film_title varchar,
	film_release_year int
) 
language plpgsql
as $$
declare 
    var_r record;
begin
	for var_r in(
            select title, release_year 
            from film 
	     where title ilike p_pattern and 
		    release_year = p_year
        ) loop  film_title := upper(var_r.title) ; 
		film_release_year := var_r.release_year;
           return next;
	end loop;
end; $$ 
```

在这个例子中，我们创建了`get_film(varchar,int)`接受两个参数的：

- `p_pattern`用于搜索电影。
- `p_year` 是电影的发行年份。

在函数体中，我们使用`for loop`语句逐行处理查询。

该`return next`语句将一行添加到函数的返回表中。

下面说明如何调用该`get_film()`函数：

```sql
SELECT * FROM get_film ('%er', 2006);
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/3e4387f73e4a4519affff82d60ce2164.png)


### [5]删除函数

删除语法：

```sql
drop function [if exists] function_name(argument_list)
[cascade | restrict]
```

> - 当函数有任何依赖对象（例如操作符或触发器）时，不能直接删除该函数。
> - 要删除函数及其依赖对象，您需要指定`cascade`选项。`drop function`with选项将`cacade`递归地删除函数、它的依赖对象以及依赖于这些对象的对象，依此类推。
> - 默认情况下，该`drop function`语句使用`restrict`当函数具有任何依赖对象时拒绝删除函数的选项。

要使用单个语句删除多个函数，请在关键字`drop function`后指定一个以逗号分隔的函数名称列表，如下所示：`drop function`

```sql
drop function [if exists] function1, function2, ...;
```

## 8.异常处理

学习如何在 PL/pgSQL 中捕获 PostgreSQL 异常

当块中发生错误时，PostgreSQL 将中止块的执行以及周围的事务。

要从错误中恢复，您可以使用块`exception`中的子句`begin...end`。

下面说明了`exception`子句的语法：

```sql
<<label>>
declare
begin
    statements;
exception
    when condition [or condition...] then
       handle_exception;
   [when condition [or condition...] then
       handle_exception;]
   [when others then
       handle_other_exceptions;
   ]
end;
```

**示例：**

### [1]处理 no_data_found 异常示例

以下示例发出错误，因为 id 为 2000 的电影不存在。

```sql
do
$$
declare
	rec record;
	v_film_id int = 2000;
begin
	-- select a film 
	select film_id, title 
	into strict rec
	from film
	where film_id = v_film_id;
end;
$$
language plpgsql;
```

输出：

```
ERROR:  query returned no rows
CONTEXT:  PL/pgSQL function inline_code_block line 6 at SQL statement
SQL state: P0002代码语言： Shell Session  （shell ）
```

以下示例使用该`exception`子句捕获`no_data_found`异常并报告更有意义的消息：

```sql
do
$$
declare
	rec record;
	v_film_id int = 2000;
begin
	-- select a film 
	select film_id, title 
	into strict rec
	from film
	where film_id = v_film_id;
        -- catch exception
	exception 
	   when no_data_found then 
	      raise exception 'film % not found', v_film_id;
end;
$$
language plpgsql;
```

输出：

```
ERROR:  film 2000 not found
CONTEXT:  PL/pgSQL function inline_code_block line 14 at RAISE
SQL state: P0001
```

### [2]处理 too_many_rows 异常示例

以下示例说明了如何处理`too_many_rows`异常：

```sql
do
$$
declare
	rec record;
begin
	-- select film 
	select film_id, title 
	into strict rec
	from film
	where title LIKE 'A%';
	
	exception 
	   when too_many_rows then
	      raise exception 'Search query returns too many rows';
end;
$$
language plpgsql;
```

输出：

```
ERROR:  Search query returns too many rows
CONTEXT:  PL/pgSQL function inline_code_block line 15 at RAISE
SQL state: P0001
```

在此示例中，`too_many_rows`发生异常是因为该`select into`语句返回多行，而它应该返回一行。

### [3]处理多个异常

以下示例说明了如何捕获多个异常：

```sql
do
$$
declare
	rec record;
	v_length int = 90;
begin
	-- select a film 
	select film_id, title 
	into strict rec
	from film
	where length = v_length;
	
        -- catch exception
	exception 
	   when sqlstate 'P0002' then 
	      raise exception 'film with length % not found', v_length;
	   when sqlstate 'P0003' then 
	      raise exception 'The with length % is not unique', v_length;
end;
$$
language plpgsql;
```

输出：

```
ERROR:  The with length 90 is not unique
CONTEXT:  PL/pgSQL function inline_code_block line 17 at RAISE
SQL state: P0001
```

### [4]将异常处理为 SQLSTATE 代码

以下示例与上面的示例相同，只是它使用`SQLSTATE`代码而不是条件名称：

```sql
do
$$
declare
	rec record;
	v_length int = 30;
begin
	-- select a film 
	select film_id, title 
	into strict rec
	from film
	where length = v_length;
	
        -- catch exception
	exception 
	   when sqlstate 'P0002' then 
	      raise exception 'film with length % not found', v_length;
	   when sqlstate 'P0003' then 
	      raise exception 'The with length % is not unique', v_length;
end;
$$
language plpgsql;
```

输出：

```
ERROR:  film with length 30 not found
CONTEXT:  PL/pgSQL function inline_code_block line 15 at RAISE
SQL state: P0001
```

## 9.存储过程

### [1]创建存储过程

在用户定义的函数中，不能启动事务，并提交或回滚它

PostgreSQL 11 引入了支持事务的存储过程

`create procedure`语句的基本语法：

```sql
create [or replace] procedure procedure_name(parameter_list)
language plpgsql
as $$
declare
-- variable declaration
begin
-- stored procedure body
end; $$
```

> - 存储过程中的参数可以有`in`和`inout`模式。他们不能有`out`模式
>
> - 存储过程不返回值。您不能`return`在存储过程中使用带有值的语句
> - 但是，您可以使用不带值的return来停止存储过程
> - 如果要从存储过程中返回值，可以将参数与`inout`模式一起使用

示例：

```sql
drop table if exists accounts;

create table accounts (
    id int generated by default as identity,
    name varchar(100) not null,
    balance dec(15,2) not null,
    primary key(id)
);

insert into accounts(name,balance)
values('Bob',10000);

insert into accounts(name,balance)
values('Alice',10000);
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/efeebbf8e09e49d49821e95efab371e2.png)

下面的示例创建一个名为的存储过程`transfer`，将指定金额的资金从一个帐户转移到另一个帐户。

```sql
create or replace procedure transfer(
   sender int,
   receiver int, 
   amount dec
)
language plpgsql    
as $$
begin
    -- subtracting the amount from the sender's account 
    update accounts 
    set balance = balance - amount 
    where id = sender;

    -- adding the amount to the receiver's account
    update accounts 
    set balance = balance + amount 
    where id = receiver;

    commit;
end;$$
```

### [2]调用存储过程

要调用存储过程，请使用`CALL`如下语句：

```sql
call stored_procedure_name(argument_list);
```

例如，此语句调用`transfer`存储过程`$1,000`从 Bob 的帐户转移到 Alice 的帐户。

```sql
call transfer(1,2,1000);
```

### [3]删除存储过程

删除语法：

```sql
drop procedure [if exists] procedure_name (argument_list)
[cascade | restrict]
```

> 使用`cascade`选项删除存储过程及其依赖对象以及依赖于这些对象的对象等等。默认选项是`restrict`在存储过程有任何依赖对象的情况下拒绝删除它。

要删除多个存储过程，请在 drop procedure 关键字之后指定存储过程名称的逗号列表，如下所示：

```
drop procedure [if exists] name1, name2, ...;
```

## 10.Cursor游标

游标是SQL 的一种数据访问机制 ，游标是一种处理数据的方法。众所周知，使用SQL的select查询操作返回的结果是一个包含一行或者是多行的数据集，如果我们要对查询的结果再进行查询，比如（查看结果的第一行、下一行、最后一行、前十行等等操作）简单的通过select语句是无法完成的，因为这时候索要查询的结果不是数据表，而是已经查询出来的结果集。游标就是针对这种情况而出现的。

PL/pgSQL 游标允许您封装查询并一次处理每一行

将大型结果集划分为多个部分并单独处理每个部分时，推荐使用游标。如果一次处理，可能会出现内存溢出错误，而且，你可以开发一个返回对游标的引用的函数。这是从函数返回大型结果集的有效方法。函数的调用者可以根据游标引用处理结果集。

在PostgreSQL中使用游标的具体：

![在这里插入图片描述](https://img-blog.csdnimg.cn/88a01cebfe3c42eda2bcd4e3c1f3c99b.png)


- **声明一个游标**---要访问游标，你需要在块的声明部分中声明游标变量，游标变量的类型为refcursor
- **打开游标**---
- 然后，将结果集中的行提取到目标中。
- 之后，检查是否还有更多行要获取。如果是，转步骤3，否则转步骤5。
- 最后，关闭光标

### [1]声明游标

```sql
-- 声明游标
declare my_cursor refcursor;
-- 或者在查询语句中声明
cursor_name [ [no] scroll ] cursor [( name datatype, name data type, ...)] for query
-- NO SCROLL 游标不能向后滚动
-- 示例
declare
    cur_films  cursor for -- cur_films是封装表中所有行的游标film
		select * 
		from film;
    cur_films2 cursor (year integer) for  -- cur_films2封装了具有特定发行年份的电影。film
		select * 
		from film 
		where release_year = year;
```

### [2]打开游标

打开游标分为打开绑定游标和未绑定游标

打开未绑定游标：

```sql
-- 打开未绑定游标
OPEN unbound_cursor_variable [ [ NO ] SCROLL ] FOR query; 

-- 因为未绑定游标变量在我们声明它时没有绑定到任何查询，所以我们必须在打开它时指定查询
open my_cursor for 
	select * from city 
	where country = p_country;
	
-- PostgreSQL 允许您打开游标并将其绑定到动态查询	
open unbound_cursor_variable[ [ no ] scroll ] 
for execute query_string [using expression [, ... ] ];
-- 示例：使用参数sort_field对行进行排序的动态查询
query := 'select * from city order by $1';
open cur_city for execute query using sort_field; 
```

打开绑定游标：

```sql
-- 打开绑定游标
open cursor_variable[ (name:=value,name:=value,...)];

-- 示例
open cur_films;
open cur_films2(year:=2005);
```

### [3]使用游标

打开游标后，我们可以使用`FETCH`、`MOVE`、`UPDATE`或`DELETE`语句对其进行操作

```sql
-- 获取下一行
fetch [ direction { from | in } ] cursor_variable into target_variable;
-- 默认情况下，如果您未明确指定方向，则光标将获取下一行next。以下对游标有效：
-- next 
-- last 
-- prior
-- first
-- absolute count
-- relative count
-- forward
-- backward

-- 示例
fetch cur_films into row_film;
fetch last from row_film into title, release_year;
```

### [4]移动光标

如果您只想移动光标而不检索任何行，则使用该`MOVE`语句。`FETCH`方向接受与语句相同的值

```sql
-- 移动语法
move [ direction { from | in } ] cursor_variable;

-- 示例
move cur_films2;
move last from cur_films;
move relative -1 from cur_films;
move forward 3 from cur_films;
```

### [5]删除或更新行

定位游标后，我们可以使用`DELETE WHERE CURRENT OF`or`UPDATE WHERE CURRENT OF`语句删除或更新游标标识的行，如下所示：

```sql
-- 更新、删除行语法
update table_name 
set column = value, ... 
where current of cursor_variable;

delete from table_name 
where current of cursor_variable;

-- 示例
update film 
set release_year = p_year 
where current of cur_films;
```

### [6]关闭游标

```sql
close cursor_variable;
```

### [7]综合示例

创建一个函数，在这个函数内使用游标实现查找2006发行年份的电影并且电影名中包含ful的信息

```sql
select title, release_year from film where release_year = 2006; -- 有一千条结果
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/ad9df9ec157a484f84629642223d85f0.png)


```sql
create or replace function get_film_titles(p_year integer)
   returns text as $$
declare 
	 titles text default '';
	 rec_film   record;
	 cur_films cursor(p_year integer) -- 查询某年份的电影
		 for select title, release_year
		 from film
		 where release_year = p_year;
begin
   -- 打开游标
   open cur_films(p_year);
	
   loop
    -- fetch row into the film 使用游标 将将查询结果挨个处理
      fetch cur_films into rec_film;
    -- exit when no more row to fetch
      exit when not found;

    -- build the output
      if rec_film.title like '%ful%' then 
         titles := titles || ',' || rec_film.title || ':' || rec_film.release_year;
      end if;
   end loop;
  
   -- close the cursor
   close cur_films;

   return titles;
end; $$

language plpgsql;
```

```sql
select get_film_titles(2006);
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/90dddf5d3f8c45b1b949cefb485348fb.png)


## 11.触发器

参考：https://www.postgresqltutorial.com/postgresql-plpgsql/

### [1]触发器简介

PostgreSQL 触发器是每当与表关联的事件发生时自动调用的函数。事件可以是以下任何一种：`INSERT`、`UPDATE`、`DELETE`或`TRUNCATE`

触发器是与表关联的特殊用户定义函数。要创建新触发器，首先定义一个触发器函数，然后将此触发器函数绑定到一个表。触发器和用户自定义函数的区别在于触发器在触发事件发生时自动调用。

PostgreSQL 提供两种主要类型的触发器：**行级触发器**和**语句级触发器**。这两种的区别在于触发器被调用的次数和时间。

例如，如果您发出一条`UPDATE`影响 20 行的语句，则行级触发器将被调用 20 次，而语句级触发器将被调用 1 次。

您可以指定触发器是在事件**之前**还是**之后**调用。如果触发器在事件之前调用，它可以跳过当前行的操作，甚至更改正在更新或插入的行。如果在事件之后调用触发器，则触发器可以使用所有更改。

触发器在各种应用程序访问数据库的情况下很有用，并且您希望在修改表数据时自动运行的数据库中保持跨功能。例如，如果您想保留数据历史记录而不要求应用程序具有检查每个事件的逻辑，例如`INSERT`或`UDPATE`。

您还可以使用触发器来维护复杂的数据完整性规则，除了在数据库级别之外，您无法在其他地方实现这些规则。例如，当向`customer`表中添加新行时，还必须在银行和信用表中创建其他行。

使用触发器的主要缺点是您必须知道触发器的存在并了解其逻辑才能弄清楚数据更改时的影响。

尽管 PostgreSQL 实现了 SQL 标准，但 PostgreSQL 中的触发器具有一些特定的功能：

- PostgreSQL 触发 `TRUNCATE`事件的触发器。
- PostgreSQL 允许您在视图上定义语句级触发器。
- PostgreSQL 要求你定义一个用户定义的函数作为触发器的动作，而 SQL 标准允许你使用任何 SQL 命令。

### [2]创建触发器

```sql
-- 创建触发器
CREATE FUNCTION -- 首先，使用语句创建一个触发函数。
CREATE TRIGGER -- 其次，通过using语句将触发器函数绑定到表。

-- 创建触发器函数语法
CREATE FUNCTION trigger_function() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
   -- trigger logic
END;
$$
-- 触发函数类似于常规的用户定义函数。但是，触发器函数不接受任何参数，并且具有类型为trigger的返回值。
-- 一旦定义了触发函数，就可以将其绑定到一个或多个触发事件，例如INSERT、UPDATE和DELETE。

-- 创建触发器基本语法
CREATE TRIGGER trigger_name 
   {BEFORE | AFTER} { event } -- BEFORE、AFTER：触发触发器的时间 ，event：触发触发器事件
   ON table_name -- 触发器绑定的表
   [FOR [EACH] { ROW | STATEMENT }] --  ROW：行级触发器，STATEMENT语句触发器
       EXECUTE PROCEDURE trigger_function -- 指定触发器函数名称
  
```

示例：

```sql
DROP TABLE IF EXISTS employees;

CREATE TABLE employees(
   id INT GENERATED ALWAYS AS IDENTITY,
   first_name VARCHAR(40) NOT NULL,
   last_name VARCHAR(40) NOT NULL,
   PRIMARY KEY(id)
);

-- 假设当员工的姓名发生更改时，您希望将更改记录在名为的单独表中employee_audits：
CREATE TABLE employee_audits (
   id INT GENERATED ALWAYS AS IDENTITY,
   employee_id INT NOT NULL,
   last_name VARCHAR(40) NOT NULL,
   changed_on TIMESTAMP(6) NOT NULL
);

-- 创建触发器函数
CREATE OR REPLACE FUNCTION log_last_name_changes()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
BEGIN
	IF NEW.last_name <> OLD.last_name THEN
		 INSERT INTO employee_audits(employee_id,last_name,changed_on)
		 VALUES(OLD.id,OLD.last_name,now());
	END IF;

	RETURN NEW;
END;
$$

-- 创建触发器（将触发器函数绑定到employees表
CREATE TRIGGER last_name_changes
  BEFORE UPDATE
  ON employees
  FOR EACH ROW
  EXECUTE PROCEDURE log_last_name_changes();
  
-- 插入些测试数据
INSERT INTO employees (first_name, last_name)
VALUES ('John', 'Doe');

INSERT INTO employees (first_name, last_name)
VALUES ('Lily', 'Bush');

-- 使用触发器
UPDATE employees SET last_name = 'Brown' WHERE ID = 2;

-- 更新后
SELECT * FROM employees;
 id | first_name | last_name
----+------------+-----------
  1 | John       | Doe
  2 | Lily       | Brown
  
  
SELECT * FROM employee_audits;
d | last_name |        changed_on
----+-------------+-----------+---------------------------
  1 |           2 | Bush      | 2022-09-10 13:34:15.19555
```

### [3]删除触发器

```sql
-- 从表中删除触发器语法
DROP TRIGGER [IF EXISTS] trigger_name 
ON table_name [ CASCADE | RESTRICT ]; 
-- CASCADE连同删除依赖触发器的对象，默认RESTRICT不删除依赖对象

-- 示例：
-- 创建一个验证员工用户名的函数。员工的用户名不能为空，长度至少为8。
CREATE FUNCTION check_staff_user()
    RETURNS TRIGGER
AS $$
BEGIN
    IF length(NEW.username) < 8 OR NEW.username IS NULL THEN
        RAISE EXCEPTION 'The username cannot be less than 8 characters';
    END IF;
    IF NEW.NAME IS NULL THEN
        RAISE EXCEPTION 'Username cannot be NULL';
    END IF;
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

-- 创建触发器绑定触发器函数
CREATE TRIGGER username_check 
    BEFORE INSERT OR UPDATE
ON staff
FOR EACH ROW 
    EXECUTE PROCEDURE check_staff_user();

-- 删除触发器
DROP TRIGGER username_check
ON staff;
```

### [4]重命名触发器

```sql
-- 重命名触发器名称
ALTER TRIGGER trigger_name
ON table_name 
RENAME TO new_trigger_name;
```

### [5]禁用触发器

```sql
ALTER TABLE table_name
DISABLE TRIGGER trigger_name | ALL
-- ALL禁用与该表关联的所有触发器
```

### [6]启用触发器

```sql
ALTER TABLE table_name
ENABLE TRIGGER trigger_name |  ALL;
```

参考：https://www.postgresqltutorial.com/