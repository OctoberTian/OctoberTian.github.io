---
title: ServletContext引起的思考
thumbnail: /2019/05/17/d3541f2b/zd01.jpg
tags: Servlet
categories: Springboot
abbrlink: 2832afc7
date: 2019-06-20 15:05:11
---

## 前言

Servlet三大域对象的应用 request、session、application（ServletContext）

ServletContext是一个全局的储存信息的空间，服务器开始就存在，服务器关闭才释放。

request，一个用户可有多个；session，一个用户一个；而servletContext，所有用户共用一个。所以，为了节省空间，提高效率，ServletContext中，要放必须的、重要的、所有用户需要共享的线程又是安全的一些信息。

<!--More-->

## 获取servletcontext对象：

```java
ServletContext sc = null;
        sc = request.getSession().getServletContext();
//或者使用
//ServletContext sc = this.getServletContext();
        System.out.println("sc=" + sc);
```

还有一种方法，通过ServletContextListener获得：

```java
public class MySCListener1 implements ServletContextListener {
   public MySCListener1() {
        // TODO Auto-generated constructor stub
   }
   @Override
   public void contextDestroyed(ServletContextEvent sce) {
      // TODO Auto-generated method stub
   }
   @Override
   public void contextInitialized(ServletContextEvent sce) {
      // 通过事件对象获取事件源(ServletContext)
      ServletContext sc=sce.getServletContext();
   }
}
```

## 拓展：JavaEE中常见的监听器和事件

Servlet和JSP提供Listener接口8个，Event类6个

| **Listener****接口**            | **Event****类**                                    |
| ------------------------------- | -------------------------------------------------- |
| ServletContextListener          | ServletContextEvent（上下文事件）                  |
| ServletContextAtrributeListener | ServletContextAttributeEvent（**上下文属性事件**） |
| HttpSessionListener             | HttpSessionEvent                                   |
| HttpSessionActivationListener   |                                                    |
| HttpSessionAttributeListener    | **HttpSessionBindingEvent（会话绑定事件）**        |
| HttpSessionBindingListener      |                                                    |
| ServletRequestListener          | ServletRequestEvent                                |
| ServletRequestAttributeListener | ServletRequestAttributeEvent                       |

 一般来说也就是围绕着之前说的三大域对象：Request、Session、ServlerContext来进行的

源码级别了解ServletContextListener

### **类头注释**

```java
/**
 * Implementations of this interface receive notifications about changes to the
 * servlet context of the web application they are part of. To receive
 * notification events, the implementation class must be configured in the
 * deployment descriptor for the web application.
 *
 * @see ServletContextEvent
 * @since v 2.3
 */
```

意思很简单，就是说实现这个接口的类将会接收到servlet context的一些changes，也就是改变，为了能够接收到这些改变，必须实现这些对应的方法（废话）。

### **类中函数**

```java
/**
 ** Notification that the web application initialization process is starting.
 * All ServletContextListeners are notified of context initialization before
 * any filter or servlet in the web application is initialized.
 * @param sce Information about the ServletContext that was initialized
 */
public void contextInitialized(ServletContextEvent sce);

/**
 ** Notification that the servlet context is about to be shut down. All
 * servlets and filters have been destroy()ed before any
 * ServletContextListeners are notified of context destruction.
 * @param sce Information about the ServletContext that was destroyed
 */
public void contextDestroyed(ServletContextEvent sce);
```

`contextInitialized:`在web引用初始化的时候就启动了servlet context,也就是在servlet context初始化的时候调用了这个函数,我们可以在这里做一些项目初始化的操作,当然需要注意这些操作会占用长期的系统资源,谨慎使用

`contextDestoryed:`在servlet context在将要关闭的时候,会执行这个方法,可以做一些资源的释放,达到安全的关闭应用,或者记录一些关键数据,或者备份

### **类中参数**

`ServletContextEvent:`这个类作为上述函数的参数,继承自`extends java.util.EventObject`,显而易见,他是一个事件对象,类头的注释也很容易理解

```java
This is the event class for notifications about changes to the servlet
context of a web application.
```

他有着两个函数:

```java
/**
 * Construct a ServletContextEvent from the given context.
 *
 * @param source
 *            - the ServletContext that is sending the event.
 */
public ServletContextEvent(ServletContext source) {
    super(source);
}

/**
 * Return the ServletContext that changed.
 *
 * @return the ServletContext that sent the event.
 */
public ServletContext getServletContext() {
    return (ServletContext) super.getSource();
}
```

而我们之前获取servlet context也正是调用了`getServletContext()`这个函数,这个函数会返回ServletContext,如何返回?他通过调用他的父类方法(super)的getSource(),那么他的父类是`EventObject`,这是一个可以序列化的类(因为它实现了:implements java.io.Serializable),它里面定义了一个不可序列化的保护对象:`protected transient Object  source;`并且通过`getSource()`返回了这个source,也就"源"对象

## ServletContext的特性

1. 获取全局对象中的储存数据
2. 所有用户贡献一个

### 优秀博文推荐(Api向)

这里有他很多用法,用的时候可以注意看一下

<a href="https://yq.aliyun.com/articles/603121">ServletContext对象核心方法</a>

**建议直接查看ServletContext源码**

