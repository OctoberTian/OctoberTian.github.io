---
title: JUC简析
thumbnail: /2019/05/17/d3541f2b/zd01.jpg
tags: JUC
categories: 线程
abbrlink: 5e3d2b45
date: 2019-08-14 21:14:40
---

## 前言

一直以来对`JUC`都了解不深入,今天做一个了解和分析

<!--More-->

## 1. JUC简介

- 在` Java 5.0 `提供了 `java.util.concurrent`(简称JUC)包,在此包中增加了在`并发编程`中很常用的工具类,
   用于定义类似于线程的自定义子系统,包括`线程池`,`异步 IO` 和`轻量级任务框架`;还提供了设计用于多线程上下文中
   的 `Collection` 实现等;
- 