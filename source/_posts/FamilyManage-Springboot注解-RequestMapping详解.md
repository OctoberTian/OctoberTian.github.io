---
title: FamilyManage-Springboot注解-RequestMapping详解
thumbnail: /2019/05/17/d3541f2b/zd01.jpg
tags: FamilyManage
categories: FamilyManage
abbrlink: 3f6b53b0
date: 2019-06-10 15:41:16
---

## 前言

上一次详解了@RestController注解,其中包括重要的@Controller等注解,这次来研究一下常用的@RequestMapping注解

<!--More-->

## @RequestMapping

> This annotation can be used both at the class and at the method level. In most cases, at the method level applications will prefer to use one of the HTTP method specific variants

这个注释可以在类级和方法级使用。在大多数情况下，在方法级别上，应用程序更愿意使用HTTP方法特定的变体之一,这表明了我们使用的场景

- 类头
- 方法头

它一共有5种请求的方式:

```java
* @see GetMapping
* @see PostMapping
* @see PutMapping
* @see DeleteMapping
* @see PatchMapping
```

#### 源码分析

```java
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Mapping
```

它包含以上注释

- 他是方法级别,或者类/接口级别
- 他是在运行时由VM保留的
- 他会被记录到javadoc种,作为公共api接口
- 他是一个Mapping

#### name

现在我们继续看RequestMapping的源代码

```java
/**
 * Assign a name to this mapping.
 * <p><b>Supported at the type level as well as at the method level!</b>
 * When used on both levels, a combined name is derived by concatenation
 * with "#" as separator.
 * @see org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder
 * @see org.springframework.web.servlet.handler.HandlerMethodMappingNamingStrategy
 */
String name() default "";
```

简单来说就是给你的RequestMapping起个名字,在类型级别和方法级别都支持!当在这两个级别上使用时，组合名称由“#”作为分隔符连接派生。

#### value

```java
/**
 * The primary mapping expressed by this annotation.
 * <p>This is an alias for {@link #path}. For example
 * {@code @RequestMapping("/foo")} is equivalent to
 * {@code @RequestMapping(path="/foo")}.
 * <p><b>Supported at the type level as well as at the method level!</b>
 * When used at the type level, all method-level mappings inherit
 * this primary mapping, narrowing it for a specific handler method.
 */
@AliasFor("path")
String[] value() default {};
```

通过注解知道它和path是同一个意思,,可以是一个数组,默认是{}

This is an alias for [`path()`](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/bind/annotation/RequestMapping.html#path--). For example `@RequestMapping("/foo")` is equivalent to `@RequestMapping(path="/foo")`.

#### path

```java
/**
 * The path mapping URIs (e.g. "/myPath.do").
 * Ant-style path patterns are also supported (e.g. "/myPath/*.do").
 * At the method level, relative paths (e.g. "edit.do") are supported
 * within the primary mapping expressed at the type level.
 * Path mapping URIs may contain placeholders (e.g. "/${connect}").
 * <p><b>Supported at the type level as well as at the method level!</b>
 * When used at the type level, all method-level mappings inherit
 * this primary mapping, narrowing it for a specific handler method.
 * @see org.springframework.web.bind.annotation.ValueConstants#DEFAULT_NONE
 * @since 4.2
 */
@AliasFor("value")
String[] path() default {};
```

这里比较重要,path的书写方式很丰富,应当注意积累

#### method

```java
/**
 * The HTTP request methods to map to, narrowing the primary mapping:
 * GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE, TRACE.
 * <p><b>Supported at the type level as well as at the method level!</b>
 * When used at the type level, all method-level mappings inherit
 * this HTTP method restriction (i.e. the type-level restriction
 * gets checked before the handler method is even resolved).
 */
RequestMethod[] method() default {};
```

方法一共有一下集中可以指定:

```java
public enum RequestMethod {

   GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS, TRACE

}
```

这些都应该详细了解一下,在实战中具体应用

#### params

```java
/**
 * The parameters of the mapped request, narrowing the primary mapping.
 * <p>Same format for any environment: a sequence of "myParam=myValue" style
 * expressions, with a request only mapped if each such parameter is found
 * to have the given value. Expressions can be negated by using the "!=" operator,
 * as in "myParam!=myValue". "myParam" style expressions are also supported,
 * with such parameters having to be present in the request (allowed to have
 * any value). Finally, "!myParam" style expressions indicate that the
 * specified parameter is <i>not</i> supposed to be present in the request.
 * <p><b>Supported at the type level as well as at the method level!</b>
 * When used at the type level, all method-level mappings inherit
 * this parameter restriction (i.e. the type-level restriction
 * gets checked before the handler method is even resolved).
 * <p>Parameter mappings are considered as restrictions that are enforced at
 * the type level. The primary path mapping (i.e. the specified URI value)
 * still has to uniquely identify the target handler, with parameter mappings
 * simply expressing preconditions for invoking the handler.
 */
String[] params() default {};
```

映射请求的参数，缩小主映射。

适用于任何环境的相同格式:“myParam=myValue”样式表达式序列，只有在发现每个参数都具有给定值时才映射请求。表达式可以通过使用“!”="运算符，如"myParam!=myValue"。还支持“myParam”样式表达式，这些参数必须出现在请求中(允许有任何值)。最后,”!“myParam”样式表达式表示指定的参数不应该出现在请求中。

在类型级别和方法级别都支持!当在类型级使用时，所有方法级映射都继承这个参数限制(即在解析处理程序方法之前检查类型级限制)。

参数映射被认为是在类型级别强制执行的限制。主路径映射(即指定的URI值)仍然必须惟一地标识目标处理程序，参数映射只是表示调用处理程序的先决条件。

#### header

```java
/**
 * The headers of the mapped request, narrowing the primary mapping.
 * <p>Same format for any environment: a sequence of "My-Header=myValue" style
 * expressions, with a request only mapped if each such header is found
 * to have the given value. Expressions can be negated by using the "!=" operator,
 * as in "My-Header!=myValue". "My-Header" style expressions are also supported,
 * with such headers having to be present in the request (allowed to have
 * any value). Finally, "!My-Header" style expressions indicate that the
 * specified header is <i>not</i> supposed to be present in the request.
 * <p>Also supports media type wildcards (*), for headers such as Accept
 * and Content-Type. For instance,
 * <pre class="code">
 * &#064;RequestMapping(value = "/something", headers = "content-type=text/*")
 * </pre>
 * will match requests with a Content-Type of "text/html", "text/plain", etc.
 * <p><b>Supported at the type level as well as at the method level!</b>
 * When used at the type level, all method-level mappings inherit
 * this header restriction (i.e. the type-level restriction
 * gets checked before the handler method is even resolved).
 * @see org.springframework.http.MediaType
 */
String[] headers() default {};
```

支持媒体类型通配符(*)，用于Accept和Content-Type等头部,比如:

```java
@RequestMapping(value = "/something", headers = "content-type=text/*")
```

#### consumes

```java
/**
 * The consumable media types of the mapped request, narrowing the primary mapping.
 * <p>The format is a single media type or a sequence of media types,
 * with a request only mapped if the {@code Content-Type} matches one of these media types.
 * Examples:
 * <pre class="code">
 * consumes = "text/plain"
 * consumes = {"text/plain", "application/*"}
 * </pre>
 * Expressions can be negated by using the "!" operator, as in "!text/plain", which matches
 * all requests with a {@code Content-Type} other than "text/plain".
 * <p><b>Supported at the type level as well as at the method level!</b>
 * When used at the type level, all method-level mappings override
 * this consumes restriction.
 * @see org.springframework.http.MediaType
 * @see javax.servlet.http.HttpServletRequest#getContentType()
 */
String[] consumes() default {};
```

在注视中也给出了用法

```java
 consumes = "text/plain"
 consumes = {"text/plain", "application/*"}
```

#### produces

```java
/**
 * The producible media types of the mapped request, narrowing the primary mapping.
 * <p>The format is a single media type or a sequence of media types,
 * with a request only mapped if the {@code Accept} matches one of these media types.
 * Examples:
 * <pre class="code">
 * produces = "text/plain"
 * produces = {"text/plain", "application/*"}
 * produces = MediaType.APPLICATION_JSON_UTF8_VALUE
 * </pre>
 * <p>It affects the actual content type written, for example to produce a JSON response
 * with UTF-8 encoding, {@link org.springframework.http.MediaType#APPLICATION_JSON_UTF8_VALUE} should be used.
 * <p>Expressions can be negated by using the "!" operator, as in "!text/plain", which matches
 * all requests with a {@code Accept} other than "text/plain".
 * <p><b>Supported at the type level as well as at the method level!</b>
 * When used at the type level, all method-level mappings override
 * this produces restriction.
 * @see org.springframework.http.MediaType
 */
String[] produces() default {};
```

It affects the actual content type written, for example to produce a JSON response with UTF-8 encoding,

它会影响实际编写的内容类型，例如生成一个带有UTF-8编码的JSON响应

综合以上的简介我们常用的其实也就是前面几个,后面的不是很常用

最后我们先来了解一下@Mapping这个注解

## @Mapping

#### 源码分析

```java
@Target({ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface Mapping {

}
```

他是RUNTIME的注释类型,很好理解,他的解释是:

```java
Meta annotation that indicates a web mapping annotation.
```

表示web映射注释的元注释。

----------

