---
title: FamilyManage开发-深入Springboot注释
thumbnail: /2019/05/17/d3541f2b/zd01.jpg
tags: FamilyManage
categories: FamilyManage
abbrlink: 5e8335ad
date: 2019-06-09 15:47:51
---

## 前言

Springboot最关键的就是优秀的注解,平时使用都没有注意底层的原理,虽然我也看不了多么的深,尽量吧

<!--More-->

## 注释大全

有一个博客记录的比较详细:https://blog.csdn.net/weixin_40753536/article/details/81285046 

当然这个没有底层原理,我希望了解的是底层的原理

## @RestController

> ```
> @Target(ElementType.TYPE)
> @Retention(RetentionPolicy.RUNTIME)
> @Documented
> @Controller
> @ResponseBody
> ```

RestController是由@Controller和@ResponseBody组成,也就是它既是一个Controller,也是直接返回结果的,不做路由跳转

我们一个一个了解:

## @Target

> ```java
> @Documented
> @Retention(RetentionPolicy.RUNTIME)
> @Target(ElementType.ANNOTATION_TYPE)
> public @interface Target {
>     /**
>      * Returns an array of the kinds of elements an annotation type
>      * can be applied to.
>      * @return an array of the kinds of elements an annotation type
>      * can be applied to
>      */
>     ElementType[] value();
> }
> ```

- java.lang.annotation.Target     用于设定注解范围
- java.lang.annotation.ElementType     Target通过ElementType来指定注解适用范围的枚举集合

Target有一个ElementType[]的数组,而RestController中的@Target传入了ElementType中的**TYPE**类型,ElementType是什么?有哪些类型?

```java
public enum ElementType {
    /** Class, interface (including annotation type), or enum declaration */
    TYPE,

    /** Field declaration (includes enum constants) */
    FIELD,

    /** Method declaration */
    METHOD,

    /** Formal parameter declaration */
    PARAMETER,

    /** Constructor declaration */
    CONSTRUCTOR,

    /** Local variable declaration */
    LOCAL_VARIABLE,

    /** Annotation type declaration */
    ANNOTATION_TYPE,

    /** Package declaration */
    PACKAGE,

    /**
     * Type parameter declaration
     *
     * @since 1.8
     */
    TYPE_PARAMETER,

    /**
     * Use of a type
     *
     * @since 1.8
     */
    TYPE_USE
}
```

ElementType是一个枚举类型,此枚举类型的常量提供了Java程序中声明的元素的简单分类。

这些常量与[`Target`](https://docs.oracle.com/javase/7/docs/api/java/lang/annotation/Target.html)元注释类型，用于指定使用注释类型的合法位置。

| `**ANNOTATION_TYPE**`注释类型声明          |
| ------------------------------------------ |
| `**CONSTRUCTOR**`构造函数声明              |
| `**FIELD**`字段声明(包括枚举常量)          |
| `**LOCAL_VARIABLE**`局部变量声明           |
| `**METHOD**`方法声明                       |
| `**PACKAGE**`包申报                        |
| `**PARAMETER**`参数声明                    |
| `**TYPE**`类、接口(包括注释类型)或枚举声明 |

在@RestController中使用@Target(ElementType.TYPE),表明@RestController是一个类/接口(包括注释类型)或枚举声明,规定了这个类的用途

## @Retention

> ```java
> @Documented
> @Retention(RetentionPolicy.RUNTIME)
> @Target(ElementType.ANNOTATION_TYPE)
> public @interface Retention {
>     /**
>      * Returns the retention policy.
>      * @return the retention policy
>      */
>     RetentionPolicy value();
> }
> ```

指示要保留带注释类型的注释的时间。如果注释类型声明中没有保留注释，则保留策略默认为RetentionPolicy.CLASS

只有当元注释类型直接用于注释时，保留元注释才有效。如果元注释类型在另一个注释类型中用作成员类型，则没有任何效果。

- 首先它是一个@Target(ElementType.ANNOTATION_TYPE)**注释类型声明**
- 默认使用RetentionPolicy,这是一个枚举类型,包括:
  - SOURCE
  - CLASS
  - RUNTIME

而@RestController就是RUNTIME的类型,这三种类型是什么意思了?

| `**CLASS**`注释将由编译器记录在类文件中，而不必在运行时由VM保留。 |
| ------------------------------------------------------------ |
| `**RUNTIME**`注释将由编译器记录在类文件中，并在运行时由VM保留，因此可以反射地读取注释。 |
| `**SOURCE**`注释将被编译器丢弃。                             |

则表示@RestController是一个在运行时由VM保留的类,通过强大的反射机制进行操作

## @Documented

> ```
> @Documented
> @Retention(RetentionPolicy.RUNTIME)
> @Target(ElementType.ANNOTATION_TYPE)
> public @interface Documented {
> }
> ```

这是一个很基础很简单的注释,根据之前的注释我们知道它是一个Runtime的Retention,并且是一个ElementType.ANNOTATION_TYPE)注释类型,没有成员方法

他的作用很简单:**如果用@Ducumented对类型声明进行注释，则它的注释将成为带注释元素的公共API的一部分,**



## @Controller

> ```java
> @Target({ElementType.TYPE})
> @Retention(RetentionPolicy.RUNTIME)
> @Documented
> @Component
> public @interface Controller {
> 
>    /**
>     * The value may indicate a suggestion for a logical component name,
>     * to be turned into a Spring bean in case of an autodetected component.
>     * @return the suggested component name, if any (or empty String otherwise)
>     */
>    @AliasFor(annotation = Component.class)
>    String value() default "";
> 
> }
> ```

@Controller是一个我们经常使用缺不知道原理的注解,我们首先根据他的源代码了解,文档中只说**指示带注释的类是“控制器”(例如web控制器)**。但是我们还需要深究

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component

其中前三个注释我们明白其中的意思,那么第四个是什么意思呢?

## @Component

> ```java
> @Target(ElementType.TYPE)
> @Retention(RetentionPolicy.RUNTIME)
> @Documented
> @Indexed
> public @interface Component {
> 
>    /**
>     * The value may indicate a suggestion for a logical component name,
>     * to be turned into a Spring bean in case of an autodetected component.
>     * @return the suggested component name, if any (or empty String otherwise)
>     */
>    String value() default "";
> 
> }
> ```

被标注的类将会是一个"组件"

常用的几个用来标记stereotype的annotation。

@Component，@Controller，@Repository，@Service。

这四个都在org.springframework.stereotype包下面，后面3个都属于@Component。

可以理解为@Component是@Controller，@Repository，@Service的基类。

@Component是用来标记任何被Spring管理的组件。

@Controller用来标记presentation层（比如web controller）。

@Repository用来标记persistence层（比如DAO）。

@Service用来标记service层。

| Annotation Type                                              | Description                                                  |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [Component](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/stereotype/Component.html) | Indicates that an annotated class is a "component".指示带注释的类是“组件”。 |
| [Controller](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/stereotype/Controller.html) | Indicates that an annotated class is a "Controller" (e.g.)指示带注释的类是“控制器” |
| [Indexed](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/stereotype/Indexed.html) | Indicate that the annotated element represents a stereotype for the index.指示带注释的元素表示索引的构造型。 |
| [Repository](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/stereotype/Repository.html) | Indicates that an annotated class is a "Repository", originally defined by Domain-Driven Design (Evans, 2003) as "a mechanism for encapsulating storage, retrieval, and search behavior which emulates a collection of objects".指示带注释的类是“存储库”，最初由领域驱动设计(Evans，2003)定义为“一种封装存储、检索和搜索行为的机制，该机制模拟对象的集合”。 |
| [Service](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/stereotype/Service.html) | Indicates that an annotated class is a "Service", originally defined by Domain-Driven Design (Evans, 2003) as "an operation offered as an interface that stands alone in the model, with no encapsulated state."指示带注释的类是“服务”，最初由领域驱动设计(Evans，2003)定义为“作为独立于模型的接口提供的操作，没有封装状态”。 |

## @AliasFor

可以看到在@Controller注解中的String Value() default "";头上的注解@AliasFor(annotation = Component.class),该值可能表示对逻辑组件名称的建议，在自动检测组件的情况下转换为Spring bean。

1. AliasFor包含的注释:

   ```java
   @Retention(RetentionPolicy.RUNTIME)
   @Target(ElementType.METHOD)
   @Documented
   ```

- 他是一个方法申明
- 他是一个运行时由VM保留的的类
- 注释将由javadoc记录

2. 官方的解释:@AliasFor是一个注释，用于声明注释属性的别名。

   `@AliasFor` is an annotation that is used to declare aliases for annotation attributes.

3. 使用场景

   **注释中的显式别名:**在单个注释中，可以对一对属性声明@AliasFor，以表明它们是彼此可互换的别名。

   **元注释中属性的显式别名:**如果@AliasFor的annotation()属性被设置为与声明它的注释不同的注释，则属性()被解释为元注释中属性的别名(即，显式元注释属性覆盖)。这允许精确地控制注释层次结构中覆盖哪些属性。事实上，使用@AliasFor甚至可以为元注释的value属性声明别名。

   **隐式注释中的别名:**如果一个或多个属性在一个声明注释的属性覆盖相同元注释属性(直接或间接)横跨,这些属性将被视为一组隐含的别名为彼此,导致行为类似于在一个注释中明确的别名。

4. 在Spring的众多注解中，经常会发现很多注解的不同属性起着相同的作用，比如@RequestMapping的value属性和path属性，这就需要做一些基本的限制，比如value和path的值不能冲突，比如任意设置value或者设置path属性的值，都能够通过另一个属性来获取值等等。为了统一处理这些情况，Spring创建了@AliasFor标签。

​	例子:

```java
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Mapping
public @interface RequestMapping {

    @AliasFor("path")
    String[] value() default {};

    @AliasFor("value")
    String[] path() default {};

    //...
}
```

上述代码是RequestMappding的Path和Value,我们在使用过程中知道这两个属性的意思是一样的,通过互相显示的标注,表明这两者不能发生冲突,是唯一的

再比如就在@AliasFor的源代码中有两个属性就是一样的:

```java
@AliasFor("attribute")
String value() default "";
@AliasFor("value")
String attribute() default "";
```

而我们疑惑的@AliasFor(annotation = Component.class),也是表示我们的注解的类型,默认是 Annotation.class

这样我们就全部了解了@Controller了,现在我们来了解一下@ResponseBody

## @ResponseBody

Annotation that indicates a method return value should be bound to the web response body. Supported for annotated handler methods.

解释过来就是:这个注解表明这是一个方法用来江"值"返回到网页返回体中,而不是跳转路由

源代码:

```java
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface ResponseBody {

}
```

到此我们九八RestController全部理解完毕,当然还欠缺很多,之后继续学习