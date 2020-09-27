---
title: JVM原理系列详解
thumbnail: /2019/05/17/d3541f2b/zd01.jpg
tags: JVM
categories: JVM
abbrlink: 70b32fd9
date: 2019-09-12 09:37:46
---

## 前言

本系列博文将详细介绍JVM系列知识，内容大多来自GitHub牛人的总结和观点，加上本人的思考，特此留念。

> 特别鸣谢：[doocs](https://github.com/doocs)

<!--More-->

这里仅仅记录了一些笔者认为需要重点掌握的 JVM 知识点，如果你想更加全面地了解 JVM 底层原理，可以阅读周志明老师《[深入理解Java虚拟机——JVM高级特性与最佳实践(第2版)](/book/jvm.pdf)》全书。

## 清单

<div style="border: 1px solid #000;width: 350px;height:750px;background-color: #f4f4f4">
	<p style="padding-left: 30px;padding-right: 30px;">
        <b style="color: blue;padding-left: 50px;"> JVM 原理系列详解 目录</b><br>
        <span>链接：<a href="https://blog.octber.xyz/categories/JVM/">十月博客-JVM</a></span><br>
        <span>最后更新日期：2019-09-12 09:37:46</span><br>
    </p>
    <b style="padding-left: 20px;padding-bottom: 10px;">目录</b>
    <span style="padding-left: 20px;"><a href="https://blog.octber.xyz/2019/09/12/eba9b34b.html">JVM内存结构</a></span>
    <span style="padding-left: 20px;"><a href="https://blog.octber.xyz/2019/09/12/6d96b808.html">HotSpot 虚拟机对象探秘</a></span>
    <span style="padding-left: 20px;"><a href="https://blog.octber.xyz/2019/09/12/456b8be2.html">垃圾收集策略与算法</a></span>
    <span style="padding-left: 20px;"><a href="https://blog.octber.xyz/2019/09/12/2bed3760.html">HotSpot 垃圾收集器</a></span>
    <span style="padding-left: 20px;"><a href="https://blog.octber.xyz/2019/09/12/693d4716.html">内存分配与回收策略</a></span>
    <span style="padding-left: 20px;"><a href="https://blog.octber.xyz/2019/09/12/10d372fb.html">JVM 性能调优</a></span>
    <span style="padding-left: 20px;"><a href="https://blog.octber.xyz/2019/09/12/4cb366d.html">类文件结构</a></span>
    <span style="padding-left: 20px;"><a href="https://blog.octber.xyz/2019/09/12/dddf93f5.html">类加载的时机</a></span>
    <span style="padding-left: 20px;"><a href="https://blog.octber.xyz/2019/09/12/c02d25da.html">类加载的过程</a></span>
    <span style="padding-left: 20px;"><a href="https://blog.octber.xyz/2019/09/12/6217634d.html">类加载器</a></span>
</div>