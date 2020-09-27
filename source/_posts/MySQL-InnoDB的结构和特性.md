---
title: MySQL-InnoDB的结构和特性
thumbnail: /2019/05/17/d3541f2b/zd01.jpg
tags: MySQL
categories: 数据库
abbrlink: 9caa42ca
date: 2019-08-12 21:41:57
---

## 前言

数据库中InnoDB引擎的简析以及他和MyISAM的区别

[TOC]

<!--More-->

## InnoDB和MyISAM的区别

> 特别感谢: https://blog.csdn.net/perfectsorrow/article/details/80150672
>
> 显著区别: InnoDB支持了ACID兼容的事务（Transaction）功能事务,而MyISAM不支持,但是MyISAM具有原子性
>
> - 原子性（Atomicity）
> - 一致性（Consistency）
> - 隔离性（Isolation）
> - 持久性（Durability）

### 区别一: 事务

MyISAM是MySQL的默认数据库引擎（5.5版之前），由早期的ISAM（Indexed Sequential Access 
Method：有索引的顺序访问方法）所改良。虽然性能极佳，但却有一个缺点：**不支持事务处理（transaction）**。不过，在这几年的发展下，MySQL也导入了InnoDB（另一种数据库引擎），以强化参考完整性与并发违规处理机制，后来就逐渐取代MyISAM。

### 区别二: 存储结构

- MyISAM

  每个MyISAM在磁盘上存储成三个文件。第一个文件的名字以表的名字开始，扩展名指出文件类型。.frm文件存储表定义。数据文件的扩展名为.MYD (MYData)。索引文件的扩展名是.MYI (MYIndex)。

- InnoDB

  所有的表都保存在同一个数据文件中（也可能是多个文件，或者是独立的表空间文件），InnoDB表的大小只受限于操作系统文件的大小，一般为2GB。

### 区别三: 储存空间

- MyISAM

  可被压缩，存储空间较小。支持三种不同的存储格式：静态表(默认，但是注意数据末尾不能有空格，会被去掉)、动态表、压缩表。

- InnoDB

  需要更多的内存和存储，它会在主内存中建立其专用的缓冲池用于高速缓冲数据和索引。

### 区别四: 可移植性、备份及恢复

- MyISAM

  数据是以文件的形式存储，所以在跨平台的数据转移中会很方便。在备份和恢复时可单独针对某个表进行操作。

- InnoDB

  免费的方案可以是拷贝数据文件、备份 binlog，或者用 mysqldump，在数据量达到几十G的时候就相对痛苦了。

### 区别五: AUTO_INCREMENT

- MyISAM

  可以和其他字段一起建立联合索引。引擎的自动增长列必须是索引，如果是组合索引，自动增长可以不是第一列，他可以根据前面几列进行排序后递增。

- InnoDB

  InnoDB中必须包含只有该字段的索引。引擎的自动增长列必须是索引，如果是组合索引也必须是组合索引的第一列。

### 区别六: 表锁差异

- MyISAM

  只支持**表级锁**，用户在操作myisam表时，select，update，delete，insert语句都会给表自动加锁，如果加锁以后的表满足insert并发的情况下，可以在表的尾部插入新的数据。

- InnoDB

  支持事务和**行级锁**，是innodb的最大特色。行锁大幅度提高了多用户并发操作的新能。但是InnoDB的行锁，**只是在WHERE的主键是有效的，非主键的WHERE都会锁全表的**。

### 区别七: 全文索引

- MyISAM

  支持 FULLTEXT类型的全文索引

- InnoDB

  不支持FULLTEXT类型的全文索引，但是innodb可以使用sphinx插件支持全文索引，并且效果更好。

### 区别八: 表主键

- MyISAM

  允许没有任何索引和主键的表存在，索引都是保存行的地址。

- InnoDB

  如果没有设定主键或者非空唯一索引，就会自动生成一个6字节的主键(用户不可见)，数据是主索引的一部分，附加索引保存的是主索引的值。

### 区别九: 表的具体行数

- MyISAM

  保存有表的总行数，如果select count(*) from table;**会直接取出出该值**。*

- InnoDB

  没有保存表的总行数，如果使用select count(*) from table；就会遍历整个表，**消耗相当大**，但是在加了wehre条件后，myisam和innodb处理的方式都一样。

### 区别十: CURD操作

- MyISAM

  如果执行大量的SELECT，MyISAM是更好的选择。

- InnoDB

  如果你的数据执行大量的INSERT或UPDATE，出于性能方面的考虑，应该使用InnoDB表。DELETE  从性能上InnoDB更优，但DELETE FROM  table时，InnoDB不会重新建立表，而是一行一行的删除，在innodb上如果要清空保存有大量数据的表，最好使用**truncate  table**这个命令。

### 区别十一: 外键

- MyISAM

  不支持

- InnoDB

  支持

通过上述的分析，基本上可以考虑使用InnoDB来替代MyISAM引擎了，原因是InnoDB自身很多良好的特点，比如**事务支持、存储过程、视图、行级锁定**等等，在**并发**很多的情况下，相信InnoDB的表现肯定要比MyISAM强很多。另外，任何一种表都不是万能的，只用恰当的针对业务类型来选择合适的表类型，才能最大的发挥MySQL的性能优势。如果不是很复杂的Web应用，非关键应用，还是可以继续考虑MyISAM的，这个具体情况可以自己斟酌。