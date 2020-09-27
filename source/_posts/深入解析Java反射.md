---
title: 深入解析Java反射
thumbnail: /2019/05/17/d3541f2b/zd01.jpg
tags: Java
categories: Java
abbrlink: 246303b8
date: 2019-07-30 16:35:24
---

## 前言

Java中的反射时刻在用，如果对这哥了解不能深入，谈何了解Java？

<!--More-->

> 经过个人的学习和优秀博文的整理，得到以下内容，侵删。
>
> 特别鸣谢：[sczyh30](https://www.sczyh30.com/)

# 1.什么是反射

> Oracle官方的解释：
>
> Reflection enables Java code to discover information about the fields, methods and constructors of loaded classes, and to use reflected fields, methods, and constructors to operate on their underlying counterparts, within security restrictions.
> The API accommodates applications that need access to either the public members of a target object (based on its runtime class) or the members declared by a given class. It also allows programs to suppress default reflective access control.

## 1.1 定义

反射 (Reflection) 是 Java 的特征之一，它允许运行中的 Java 程序获取自身的信息，并且可以操作类或对象的内部属性。

## 1.2 功能

我们可以在运行时获得程序或程序集中**每一个类型的成员和成员的信息**。程序中一般的对象的类型都是在**编译期**就确定下来的，而 Java 反射机制可以**动态地创建对象并调用其属性**，这样的对象的类型在编译期是未知的。所以我们可以通过反射机制**直接创建对象**，即使这个对象的类型在编译期是未知的。

简而言之：我们一般通过类寻找对象，现在我们可以通过对象寻找类，这就是反射的“反”

### **核心：**

反射的核心是 JVM 在运行时才动态加载类或调用方法/访问属性，它不需要事先（写代码的时候或编译期）知道运行对象是谁。

Java 反射主要提供以下功能：

- 在运行时判断任意一个对象所属的类；
- 在运行时构造任意一个类的对象；
- 在运行时判断任意一个类所具有的成员变量和方法（通过反射**甚至可以调用private方法**）；
- 在运行时调用任意一个对象的方法

# 2.反射的主要用途

> 有一个例子很多大神在讲的时候都会说到：
>
> 当我们在使用 IDE(如 Eclipse，IDEA)时，当我们输入一个对象或类并想调用它的属性或方法时，一按点号，编译器就会自动列出它的属性或方法，这里就会用到反射。

那么我举一个实战中的常见的例子：

在JavaEE最基础的Servlet技术中我们配置Web.xml，在xml中：

```xml
<servlet>
    <servlet-name>ChangeFactory</servlet-name>
    <servlet-class>com.drugs.Servlet.ChangeFactoryServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>ChangeFactory</servlet-name>
    <url-pattern>/ChangeFactory</url-pattern>
</servlet-mapping>
```

我们通过配置`url`为`/ChangeFactory`，映射到`com.drugs.Servlet.ChangeFactoryServlet`去自动化创建类的对象并调用他的函数，执行对应的操作，这就是JVM在运行中进行的反射操作，他可以构造任意一个类的对象并且调用其中的方法。可以说反射是各种容器实现的核心。当我们深入源代码去理解的时候，就会发现反射虽小，虽基础，但是起到了非常大的作用。

# 3.反射的基本应用

> 反射相关的类一般都在` java.lang.relfect `包里

## 3.1 获得Class对象

方法有三种：

### (1) 使用 Class 类的 `forName` 静态方法:

比如在 JDBC 开发中常用此方法加载数据库驱动:

```java
 public static Class<?> forName(String className)
 java Class.forName(driver);
```

### (2)直接获取某一个对象的 `class`，比如:

```java
Class<?> klass = int.class;Class<?> classInt = Integer.TYPE;
```

### (3)调用某个对象的 `getClass()` 方法，比如:

```java
StringBuilder str = new StringBuilder("123");Class<?> klass = str.getClass();
```

## 3.2 判断是否为某个类的实例

一般地，我们用 `instanceof` 关键字来判断是否为某个类的实例。同时我们也可以借助反射中 Class 对象的 `isInstance()` 方法来判断是否为某个类的实例，它是一个 native 方法：

```java
public native boolean isInstance(Object obj);
```

## 3.3 创建实例

通过反射来生成对象主要有两种方式。

- 使用`Class`对象的`newInstance()`方法来创建Class对象对应类的实例。

```java
Class<?> c = String.class;Object str = c.newInstance();
```

- 先通过`Class`对象获取指定的`Constructor`对象，再调用`Constructor`对象的`newInstance()`方法来创建实例。这种方法可以用指定的构造器构造类的实例。

```java
//获取String所对应的Class对象Class<?> c = String.class;//获取String类带一个String参数的构造器Constructor constructor = c.getConstructor(String.class);//根据构造器创建实例Object obj = constructor.newInstance("23333");System.out.println(obj);
```

## 3.4 获取方法

获取某个`Class`对象的方法集合，主要有以下几个方法：

- `getDeclaredMethods` 方法返回类或接口声明的所有方法，包括公共、保护、默认（包）访问和私有方法，但不包括继承的方法。

```
public Method[] getDeclaredMethods() throws SecurityException
```

- `getMethods` 方法返回某个类的所有公用（public）方法，包括其继承类的公用方法。

```
public Method[] getMethods() throws SecurityException
```

- `getMethod` 方法返回一个特定的方法，其中第一个参数为方法名称，后面的参数为方法的参数对应Class的对象。

```
public Method getMethod(String name, Class<?>... parameterTypes)
```

只是这样描述的话可能难以理解，我们用例子来理解这三个方法：

```java
package org.ScZyhSoft.common;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
public class test1 {
	public static void test() throws IllegalAccessException, InstantiationException, NoSuchMethodException, InvocationTargetException {
	        Class<?> c = methodClass.class;
	        Object object = c.newInstance();
	        Method[] methods = c.getMethods();
	        Method[] declaredMethods = c.getDeclaredMethods();
	        //获取methodClass类的add方法
	        Method method = c.getMethod("add", int.class, int.class);
	        //getMethods()方法获取的所有方法
	        System.out.println("getMethods获取的方法：");
	        for(Method m:methods)
	            System.out.println(m);
	        //getDeclaredMethods()方法获取的所有方法
	        System.out.println("getDeclaredMethods获取的方法：");
	        for(Method m:declaredMethods)
	            System.out.println(m);
	    }
    }
class methodClass {
    public final int fuck = 3;
    public int add(int a,int b) {
        return a+b;
    }
    public int sub(int a,int b) {
        return a+b;
    }
}
```

程序运行的结果如下:

```java
getMethods获取的方法：
public int org.ScZyhSoft.common.methodClass.add(int,int)
public int org.ScZyhSoft.common.methodClass.sub(int,int)
public final void java.lang.Object.wait() throws java.lang.InterruptedException
public final void java.lang.Object.wait(long,int) throws java.lang.InterruptedException
public final native void java.lang.Object.wait(long) throws java.lang.InterruptedException
public boolean java.lang.Object.equals(java.lang.Object)
public java.lang.String java.lang.Object.toString()
public native int java.lang.Object.hashCode()
public final native java.lang.Class java.lang.Object.getClass()
public final native void java.lang.Object.notify()
public final native void java.lang.Object.notifyAll()
getDeclaredMethods获取的方法：
public int org.ScZyhSoft.common.methodClass.add(int,int)
public int org.ScZyhSoft.common.methodClass.sub(int,int)
```

## 3.5 获取构造器信息

获取类构造器的用法与上述获取方法的用法类似。主要是通过Class类的getConstructor方法得到Constructor类的一个实例，而Constructor类有一个newInstance方法可以创建一个对象实例:

```
public T newInstance(Object ... initargs)
```

此方法可以根据传入的参数来调用对应的Constructor创建对象实例。

## 3.6 获取类的成员变量（字段）信息

主要是这几个方法，在此不再赘述：

- `getFiled`：访问公有的成员变量
- `getDeclaredField`：所有已声明的成员变量，但不能得到其父类的成员变量

`getFileds` 和 `getDeclaredFields` 方法用法同上（参照 Method）。

## 3.7 调用方法

> 关于`invoke()`的详情，请查看: https://www.sczyh30.com/posts/Java/java-reflection-1/

当我们从类中获取了一个方法后，我们就可以用 `invoke()` 方法来调用这个方法。`invoke` 方法的原型为:

```java
public Object invoke(Object obj, Object... args)
        throws IllegalAccessException, IllegalArgumentException,
           InvocationTargetException
```

例子:

```java
public class test1 {
    public static void main(String[] args) throws IllegalAccessException, InstantiationException, NoSuchMethodException, InvocationTargetException {
        Class<?> klass = methodClass.class;
        //创建methodClass的实例
        Object obj = klass.newInstance();
        //获取methodClass类的add方法
        Method method = klass.getMethod("add",int.class,int.class);
        //调用method对应的方法 => add(1,4)
        Object result = method.invoke(obj,1,4);
        System.out.println(result);
    }
}
class methodClass {
    public final int fuck = 3;
    public int add(int a,int b) {
        return a+b;
    }
    public int sub(int a,int b) {
        return a+b;
    }
}
```

## 3.8 利用反射创建数组

数组在Java里是比较特殊的一种类型，它可以赋值给一个`Object Reference`。下面我们看一看利用反射创建数组的例子：

```java
public static void testArray() throws ClassNotFoundException {
        Class<?> cls = Class.forName("java.lang.String");
        Object array = Array.newInstance(cls,25);
        //往数组里添加内容
        Array.set(array,0,"hello");
        Array.set(array,1,"Java");
        Array.set(array,2,"fuck");
        Array.set(array,3,"Scala");
        Array.set(array,4,"Clojure");
        //获取某一项的内容
        System.out.println(Array.get(array,3));
    }
```

其中的Array类为`java.lang.reflect.Array`类。我们通过`Array.newInstance()`创建数组对象，它的原型是:

```java
public static Object newInstance(Class<?> componentType, int length)
        throws NegativeArraySizeException {
        return newArray(componentType, length);
    }
```

而 `newArray` 方法是一个 native 方法，它在 HotSpot JVM 里的具体实现我们后边再研究，这里先把源码贴出来：

```java
private static native Object newArray(Class<?> componentType, int length)
        throws NegativeArraySizeException;
```

源码目录：`openjdk\hotspot\src\share\vm\runtime\reflection.cpp`

```java
arrayOop Reflection::reflect_new_array(oop element_mirror, jint length, TRAPS) {
  if (element_mirror == NULL) {
    THROW_0(vmSymbols::java_lang_NullPointerException());
  }
  if (length < 0) {
    THROW_0(vmSymbols::java_lang_NegativeArraySizeException());
  }
  if (java_lang_Class::is_primitive(element_mirror)) {
    Klass* tak = basic_type_mirror_to_arrayklass(element_mirror, CHECK_NULL);
    return TypeArrayKlass::cast(tak)->allocate(length, THREAD);
  } else {
    Klass* k = java_lang_Class::as_Klass(element_mirror);
    if (k->oop_is_array() && ArrayKlass::cast(k)->dimension() >= MAX_DIM) {
      THROW_0(vmSymbols::java_lang_IllegalArgumentException());
    }
    return oopFactory::new_objArray(k, length, THREAD);
  }
}
```

另外，Array 类的 `set` 和 `get` 方法都为 native 方法，在 `HotSpot JVM `里分别对应 `Reflection::array_set` 和 `Reflection::array_get` 方法，这里就不详细解析了。