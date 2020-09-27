---
title: Java8中ConcurrentHashMap变动
thumbnail: /2019/05/17/d3541f2b/zd01.jpg
tags: 集合框架
categories: Java
abbrlink: ba3aeaf3
date: 2019-08-22 15:05:39
---

# 概述

> 转载自 <a href="https://www.wanaright.com/2018/09/30/java10-concurrenthashmap-no-segment-lock/">🔗链接</a>

我们知道， 在 Java 5 之后，JDK 引入了 java.util.concurrent 并发包  ，其中最常用的就是 ConcurrentHashMap 了， 它的原理是引用了内部的 Segment ( ReentrantLock )   分段锁，保证在操作不同段 map 的时候， 可以并发执行， 操作同段 map 的时候，进行锁的竞争和等待。从而达到线程安全， 且效率大于  synchronized。

但是在 Java 8 之后， JDK 却弃用了这个策略，重新使用了 synchronized。

# 弃用原因

通过  JDK 的源码和官方文档看来， 他们认为的弃用分段锁的原因由以下几点：

1. 加入多个分段锁浪费内存空间。
1. 生产环境中， map 在放入时竞争同一个锁的概率非常小，分段锁反而会造成更新等操作的长时间等待。
1. 为了提高 GC 的效率

# 新的同步方案

既然弃用了分段锁， 那么一定由新的线程安全方案， 我们来看看源码是怎么解决线程安全的呢？（源码保留了segment 代码， 但并没有使用）

put

首先通过 hash 找到对应链表过后， 查看是否是第一个object， 如果是， 直接用cas原则插入，无需加锁。

```java
Node<K,V> f; int n, i, fh; K fk; V fv;
if (tab == null || (n = tab.length) == 0)
    tab = initTable(); // 这里在整个map第一次操作时，初始化hash桶， 也就是一个table
else if ((f = tabAt(tab, i = (n - 1) & hash)) == null) {
//如果是第一个object， 则直接cas放入， 不用锁
    if (casTabAt(tab, i, null, new Node<K,V>(hash, key, value)))
        break;                   
}
```

然后， 如果不是链表第一个object， 则直接用链表第一个object加锁，这里加的锁是synchronized，虽然效率不如 
ReentrantLock， 但节约了空间，这里会一直用第一个object为锁， 直到重新计算map大小， 
比如扩容或者操作了第一个object为止。

```java
synchronized (f) {// 这里的f即为第一个链表的object
    if (tabAt(tab, i) == f) {
        if (fh >= 0) {
            binCount = 1;
            for (Node<K,V> e = f;; ++binCount) {
                K ek;
                if (e.hash == hash &&
                    ((ek = e.key) == key ||
                     (ek != null && key.equals(ek)))) {
                    oldVal = e.val;
                    if (!onlyIfAbsent)
                        e.val = value;
                    break;
                }
                Node<K,V> pred = e;
                if ((e = e.next) == null) {
                    pred.next = new Node<K,V>(hash, key, value);
                    break;
                }
            }
        }
        else if (f instanceof TreeBin) { // 太长会用红黑树
            Node<K,V> p;
            binCount = 2;
            if ((p = ((TreeBin<K,V>)f).putTreeVal(hash, key,
                                           value)) != null) {
                oldVal = p.val;
                if (!onlyIfAbsent)
                    p.val = value;
            }
        }
        else if (f instanceof ReservationNode)
            throw new IllegalStateException("Recursive update");
    }
}
```

