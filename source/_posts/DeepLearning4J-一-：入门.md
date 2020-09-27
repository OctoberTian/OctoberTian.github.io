---
title: DeepLearning4J(一)：入门
thumbnail: /2019/05/17/d3541f2b/zd01.jpg
tags: dl4f
categories: Java
abbrlink: 1da953fb
date: 2020-01-21 23:20:49
---

## 前言

这一系列博文我将学习DeepLearning4J深度学习的一系列知识，依托于一个毕业设计项目：基于深度学习图像识别分析的X光骨龄检测与分析。选择dl4j的主要原因是因为个人喜欢Java变成，对python不感冒，而dl4j是一个企业级应用水准的深度学习框架，完全可以胜任这项任务。

<!--More-->

## 资源

- dl4j官网： https://deeplearning4j.org/
- dl4j的Git地址： https://github.com/deeplearning4j
- dl4j官方中文快速入门： https://deeplearning4j.org/cn/quickstart
- 教程Git地址: https://github.com/sjsdfg/dl4j-tutorials
- 优秀博客: https://blog.csdn.net/u011669700/article/details/80139619

## 入门知识-Lesson 01

### 两种存储方式：

- C Order行邮箱存储
- F Order列优先储存

而Dl4j所有的矩阵运算都是F Order进行存储并且进行计算的

### 基础类 INDArray

这是一个可序列化的接口类

#### 创建

> ```java
> Interface for an ndarray 简称 INDArray
> ```

它主要可以创建一些基本的多元数组:

```java
/*    构造一个3行5列的全0  ndarray */
System.out.println("构造一个3行5列的全0  ndarray");
INDArray zeros = Nd4j.zeros(3, 5);
System.out.println(zeros);

/*    构造一个3行5列的全1 ndarray */
System.out.println("构造一个3行5列的全1 ndarray");
INDArray ones = Nd4j.ones(3, 5);System.out.println(ones);

/*    构造一个3行5列，数组元素均为随机产生的ndarray */
System.out.println("构造一个3行5列，数组元素均为随机产生的ndarray");
INDArray rands = Nd4j.rand(3, 5);
System.out.println(rands);

/*    构造一个3行5列，数组元素服从高斯分布（平均值为0，标准差为1）的ndarray */
System.out.println("构造一个3行5列，数组元素服从高斯分布（平均值为0，标准差为1）的ndarray");
INDArray randns = Nd4j.randn(3, 5);System.out.println(randns);

/*    给一个一维数据，根据shape创造ndarray */
System.out.println("给一个一维数据，根据shape创造ndarray");
INDArray array1 = Nd4j.create(new float[]{2, 2, 2, 2}, new int[]{1, 4});
System.out.println(array1);
INDArray array2 = Nd4j.create(new float[]{2, 2, 2, 2}, new int[]{2, 2});
System.out.println(array2);
```

输出的结果为:

```java
构造一个3行5列的全0  ndarray
[[         0,         0,         0,         0,         0], 
 [         0,         0,         0,         0,         0], 
 [         0,         0,         0,         0,         0]]
构造一个3行5列的全1 ndarray
[[    1.0000,    1.0000,    1.0000,    1.0000,    1.0000], 
 [    1.0000,    1.0000,    1.0000,    1.0000,    1.0000], 
 [    1.0000,    1.0000,    1.0000,    1.0000,    1.0000]]
构造一个3行5列，数组元素均为随机产生的ndarray
[[    0.9616,    0.9450,    0.5324,    0.4563,    0.5084], 
 [    0.8097,    0.9463,    0.8487,    0.1333,    0.4296], 
 [    0.5177,    0.0301,    0.6035,    0.7891,    0.0182]]
构造一个3行5列，数组元素服从高斯分布（平均值为0，标准差为1）的ndarray
[[    1.0183,   -2.1546,    0.7305,   -0.3929,   -1.1482], 
 [   -2.0195,    1.2381,   -0.6725,   -1.1822,   -0.4341], 
 [   -0.1106,   -1.9217,   -0.1923,   -0.4366,    0.2219]]
给一个一维数据，根据shape创造ndarray
[[    2.0000,    2.0000,    2.0000,    2.0000]]
[[    2.0000,    2.0000], 
 [    2.0000,    2.0000]]
```

#### 设置和修改/遍历

样例代码:

```java
        INDArray nd = Nd4j.create(new float[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12}, new int[]{2, 6});
        System.out.println("打印原有数组");
        System.out.println(nd);

        /*
            获取指定索引的值
         */
        System.out.println("获取数组下标为0, 3的值");
        double value = nd.getDouble(0, 3);
        System.out.println(value);

        /*
            修改指定索引的值
         */
        System.out.println("修改数组下标为0, 3的值");
        //scalar 标量
        nd.putScalar(0, 3, 100);

        System.out.println(nd);
        /*
            使用索引迭代器遍历ndarray，使用c order
         */
        System.out.println("使用索引迭代器遍历ndarray");
        NdIndexIterator iter = new NdIndexIterator(2, 6);
        while (iter.hasNext()) {
            long[] nextIndex = iter.next();
            double nextVal = nd.getDouble(nextIndex);

            System.out.println(nextVal);
        }

```

输出结果为:

```java
打印原有数组
[[    1.0000,    2.0000,    3.0000,    4.0000,    5.0000,    6.0000], 
 [    7.0000,    8.0000,    9.0000,   10.0000,   11.0000,   12.0000]]
获取数组下标为0, 3的值
4.0
修改数组下标为0, 3的值
[[    1.0000,    2.0000,    3.0000,  100.0000,    5.0000,    6.0000], 
 [    7.0000,    8.0000,    9.0000,   10.0000,   11.0000,   12.0000]]
使用索引迭代器遍历ndarray
1.0
2.0
3.0
100.0
5.0
6.0
7.0
8.0
9.0
10.0
11.0
12.0
```

#### 获取行,获取并且设置数组部分

样例代码:

```java
        INDArray nd = Nd4j.create(new float[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12}, new int[]{2, 6});
        System.out.println("原始数组");
        System.out.println(nd);

        /*
            获取一行
         */
        System.out.println("获取数组中的一行");
        INDArray singleRow = nd.getRow(0);
        System.out.println(singleRow);

        /*
            获取多行
         */
        System.out.println("获取数组中的多行");
        INDArray multiRows = nd.getRows(0, 1);
        System.out.println(multiRows);

        /*
            替换其中的一行
         */
        System.out.println("替换原有数组中的一行");
        INDArray replaceRow = Nd4j.create(new float[]{1, 3, 5, 7, 9, 11});
        nd.putRow(0, replaceRow);
        System.out.println(nd);

```

输出结果:

```java
原始数组
[[    1.0000,    2.0000,    3.0000,    4.0000,    5.0000,    6.0000], 
 [    7.0000,    8.0000,    9.0000,   10.0000,   11.0000,   12.0000]]
获取数组中的一行
[[    1.0000,    2.0000,    3.0000,    4.0000,    5.0000,    6.0000]]
获取数组中的多行
[[    1.0000,    2.0000,    3.0000,    4.0000,    5.0000,    6.0000], 
 [    7.0000,    8.0000,    9.0000,   10.0000,   11.0000,   12.0000]]
替换原有数组中的一行
[[    1.0000,    3.0000,    5.0000,    7.0000,    9.0000,   11.0000], 
 [    7.0000,    8.0000,    9.0000,   10.0000,   11.0000,   12.0000]]
```

#### 矩阵操作

样例代码:

```java
        // 1x2的行向量
        INDArray nd = Nd4j.create(new float[]{1,2},new int[]{1, 2});
        // 2x1的列向量
        INDArray nd2 = Nd4j.create(new float[]{3,4},new int[]{2, 1}); //vector as column
        // 创造两个2x2的矩阵
        INDArray nd3 = Nd4j.create(new float[]{1,3,2,4},new int[]{2,2}); //elements arranged column major
        INDArray nd4 = Nd4j.create(new float[]{3,4,5,6},new int[]{2, 2});

        //打印
        System.out.println(nd);
        System.out.println(nd2);
        System.out.println(nd3);

        //1x2 and 2x1 -> 1x1
        INDArray ndv = nd.mmul(nd2);
        System.out.println(ndv + ", shape = " + Arrays.toString(ndv.shape()));

        //1x2 and 2x2 -> 1x2
        ndv = nd.mmul(nd4);
        System.out.println(ndv + ", shape = " + Arrays.toString(ndv.shape()));

        //2x2 and 2x2 -> 2x2
        ndv = nd3.mmul(nd4);
        System.out.println(ndv + ", shape = " + Arrays.toString(ndv.shape()));

```

输出结果:

```java
[[    1.0000,    2.0000]]
[3.0000, 
 4.0000]
[[    1.0000,    3.0000], 
 [    2.0000,    4.0000]]
11.0000, shape = [1, 1]
[[   13.0000,   16.0000]], shape = [1, 2]
[[   18.0000,   22.0000], 
 [   26.0000,   32.0000]], shape = [2, 2]
```

### Lesson 01总结

Deeplearning4j - ND4j方法快速索引

ND4J和ND4S是JVM的科学计算库，并为生产环境设计，亦即例程运行速度快，RAM要求低。

主要特点：

    多用途多维数组对象
    多平台功能，包括GPU
    线性代数和信号处理功能

由于易用性上存在的缺口，Java、Scala和Clojure编程人员无法充分利用NumPy或Matlab等数据分析方面最强大的工具。Breeze等其他库则不支持多维数组或张量，而这却是深度学习和其他任务的关键。ND4J和ND4S正得到国家级实验室的使用，以完成气候建模等任务。这类任务要求完成计算密集的模拟运算。

ND4J在开源、分布式、支持GPU的库内，为JVM带来了符合直觉的、Python编程人员所用的科学计算工具。在结构上，ND4J与SLF4J相似。ND4J让生产环境下的工程师能够轻松将算法和界面移植到Java和Scala体系内的其他库内。
创建ndarray

```java
创建值全为0： Nd4j.zeros(nRows, nCols) Nd4j.zeros(int...)
创建值全为1： Nd4j.ones(nRows, nCols)
复制NDArray： arr.dup()
创建一个行向量或者列向量： myRow = Nd4j.create(myDoubleArr)， myCol = Nd4j.create(myDoubleArr,new int[]{10,1})
使用 double[][] 创建二维 NDArray : Nd4j.create(double[][])
从行或者列进行 NDArray 堆叠：Nd4j.hstack(INDArray...) Nd4j.vstack(INDArray...)
创建元素服从正太分布的 NDArray： Nd4j.rand(int,int) Nd4j.rand(int[])
普通 （0,1）范围的 NDArray: Nd4j.randn(int,int) Nd4j.randn(int[])
```

获取 NDArray 的属性

```java
获取维度： rank()
只对二维 NDArray 有用的方法，获取行和列数： rows() columns()
第 i 个维度的长度：size(i)
获取 NDArray 的形状： shape()
获取所有元素的个数： arr.length()
判断 NDArray 的类型： isMatrix() isVector() isRowVector() isRowVector()
```

获取或者设定特定的值

```java
获取第 i 行，第 j 列的数值：arr.getDouble(i,j)
获取超过三维 NDArray 的值： arr.getDouble(int[])
对特定位置进行赋值：arr.putScalar(int[],double)
```

张量操作

```java
加上一个值： arr1.add(myDouble)
减去一个值：arr1.sub(myDouble)
乘以一个值：arr.mul(myDouble)
除以一个值：arr.div(myDouble)
减法反操作（scalar - arr1）：arr1.rsub(myDouble)
除法反操作（scalar / arr1）：arr1.rdiv(myDouble)
```

元素（Element-Wise）操作

```java
加：arr1.add(arr2)
减：arr1.sub(arr2)
乘：arr1.mul(arr2)
除：arr1.div(arr2)
赋值：arr1.assign(arr2)
```

规约操作

```java
所有元素的和：arr.sumNumber()
所有元素的乘积：arr.prod()
L1或者L2范数：arr.norm1() arr.norm2()
所有元素的标准差：arr.stdNumber()
```

线性代数操作

```java
矩阵乘法：arr1.mmul(arr2)
矩阵转置：transpose()
获取对角矩阵：Nd4j.diag(INDArray)
矩阵求逆：InvertMatrix.invert(INDArray,boolean)
```

获取 NDArray 一部分

```java
获取一行（仅用于2维 NDArray）：getRow(int)
获取多行（仅用于2维 NDArray）：getRows(int...)
设置一行（仅用于2维 NDArray）：putRow(int,INDArray)
获取前三行，所有列的值：Nd4j.create(0).get(NDArrayIndex.interval(0,3),NDArrayIndex.all());
```

元素级变换（Tanh, Sigmoid, Sin, Log etc）

```java
使用 Transform :Transforms.sin(INDArray) Transforms.log(INDArray) Transforms.sigmoid(INDArray)
方法1： Nd4j.getExecutioner().execAndReturn(new Tanh(INDArray))
方法2： Nd4j.getExecutioner().execAndReturn(Nd4j.getOpFactory().createTransform("tanh",INDArray))
```
**转载自本文为CSDN博主「寒沧」的原创文章**

### 项目配置

Pom配置如下

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org</groupId>
    <artifactId>dl4j-tutorials</artifactId>
    <version>1.0-SNAPSHOT</version>


    <properties>
        <!-- Change the nd4j.backend property to nd4j-cuda-9.2 to use CUDA GPUs -->
        <!-- CPU使用  nd4j-native-platform -->
        <!-- GPU使用  nd4j-cuda-9.2-platform-->
        <nd4j.backend>nd4j-native-platform</nd4j.backend>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <shadedClassifier>bin</shadedClassifier>


        <java.version>1.8</java.version>
        <nd4j.version>1.0.0-beta2</nd4j.version>
        <dl4j.version>1.0.0-beta2</dl4j.version>
        <datavec.version>1.0.0-beta2</datavec.version>
        <arbiter.version>1.0.0-beta2</arbiter.version>
        <rl4j.version>1.0.0-beta2</rl4j.version>

        <!-- For Spark examples: change the _1 to _2 to switch between Spark 1 and Spark 2 -->
        <dl4j.spark.version>1.0.0-beta2_spark_1</dl4j.spark.version>
        <datavec.spark.version>1.0.0-beta2_spark_1</datavec.spark.version>

        <jcommander.version>1.27</jcommander.version>

        <!-- Scala binary version: DL4J's Spark and UI functionality are released with both Scala 2.10 and 2.11 support -->
        <scala.binary.version>2.11</scala.binary.version>

        <guava.version>19.0</guava.version>
        <logback.version>1.1.7</logback.version>
        <jfreechart.version>1.0.13</jfreechart.version>
        <jcommon.version>1.0.23</jcommon.version>
        <maven-shade-plugin.version>2.4.3</maven-shade-plugin.version>
        <exec-maven-plugin.version>1.4.0</exec-maven-plugin.version>
        <maven.minimum.version>3.3.1</maven.minimum.version>
    </properties>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.nd4j</groupId>
                <artifactId>nd4j-native-platform</artifactId>
                <version>${nd4j.version}</version>
            </dependency>

            <dependency>
                <groupId>org.nd4j</groupId>
                <artifactId>nd4j-cuda-9.2</artifactId>
                <version>${nd4j.version}</version>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <dependencies>
        <!-- ND4J backend. You need one in every DL4J project. Normally define artifactId as either "nd4j-native-platform" or "nd4j-cuda-7.5-platform" -->
        <dependency>
            <groupId>org.nd4j</groupId>
            <artifactId>${nd4j.backend}</artifactId>
            <version>${nd4j.version}</version>
        </dependency>

        <dependency>
            <groupId>org.deeplearning4j</groupId>
            <artifactId>deeplearning4j-cuda-9.2</artifactId>
            <version>${dl4j.version}</version>
        </dependency>

        <!-- Core DL4J functionality -->
        <dependency>
            <groupId>org.deeplearning4j</groupId>
            <artifactId>deeplearning4j-core</artifactId>
            <version>${dl4j.version}</version>
        </dependency>

        <dependency>
            <groupId>org.deeplearning4j</groupId>
            <artifactId>deeplearning4j-nlp</artifactId>
            <version>${dl4j.version}</version>
        </dependency>

        <dependency>
            <groupId>org.deeplearning4j</groupId>
            <artifactId>deeplearning4j-zoo</artifactId>
            <version>${dl4j.version}</version>
        </dependency>

        <!-- deeplearning4j-ui is used for HistogramIterationListener + visualization: see http://deeplearning4j.org/visualization -->
        <dependency>
            <groupId>org.deeplearning4j</groupId>
            <artifactId>deeplearning4j-ui_${scala.binary.version}</artifactId>
            <version>${dl4j.version}</version>
        </dependency>

        <!-- Force guava versions for using UI/HistogramIterationListener -->
        <dependency>
            <groupId>com.google.guava</groupId>
            <artifactId>guava</artifactId>
            <version>${guava.version}</version>
        </dependency>

        <!-- datavec-data-codec: used only in video example for loading video data -->
        <dependency>
            <artifactId>datavec-data-codec</artifactId>
            <groupId>org.datavec</groupId>
            <version>${datavec.version}</version>
        </dependency>

        <!-- Used in the feedforward/classification/MLP* and feedforward/regression/RegressionMathFunctions example -->
        <dependency>
            <groupId>jfree</groupId>
            <artifactId>jfreechart</artifactId>
            <version>${jfreechart.version}</version>
        </dependency>
        <dependency>
            <groupId>org.jfree</groupId>
            <artifactId>jcommon</artifactId>
            <version>${jcommon.version}</version>
        </dependency>

        <!-- Used for downloading data in some of the examples -->
        <dependency>
            <groupId>org.apache.httpcomponents</groupId>
            <artifactId>httpclient</artifactId>
            <version>4.3.6</version>
        </dependency>

        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>${logback.version}</version>
        </dependency>

    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.codehaus.mojo</groupId>
                <artifactId>exec-maven-plugin</artifactId>
                <version>${exec-maven-plugin.version}</version>
                <executions>
                    <execution>
                        <goals>
                            <goal>exec</goal>
                        </goals>
                    </execution>
                </executions>
                <configuration>
                    <executable>java</executable>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-shade-plugin</artifactId>
                <version>${maven-shade-plugin.version}</version>
                <configuration>
                    <shadedArtifactAttached>true</shadedArtifactAttached>
                    <shadedClassifierName>${shadedClassifier}</shadedClassifierName>
                    <createDependencyReducedPom>true</createDependencyReducedPom>
                    <filters>
                        <filter>
                            <artifact>*:*</artifact>
                            <excludes>
                                <exclude>org/datanucleus/**</exclude>
                                <exclude>META-INF/*.SF</exclude>
                                <exclude>META-INF/*.DSA</exclude>
                                <exclude>META-INF/*.RSA</exclude>
                            </excludes>
                        </filter>
                    </filters>
                </configuration>
                <executions>
                    <execution>
                        <phase>package</phase>
                        <goals>
                            <goal>shade</goal>
                        </goals>
                        <configuration>
                            <transformers>
                                <transformer implementation="org.apache.maven.plugins.shade.resource.AppendingTransformer">
                                    <resource>reference.conf</resource>
                                </transformer>
                                <transformer implementation="org.apache.maven.plugins.shade.resource.ServicesResourceTransformer"/>
                                <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                                </transformer>
                            </transformers>
                        </configuration>
                    </execution>
                </executions>
            </plugin>

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.5.1</version>
                <configuration>
                    <source>${java.version}</source>
                    <target>${java.version}</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

