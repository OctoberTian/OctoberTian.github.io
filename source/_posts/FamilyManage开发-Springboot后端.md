---
title: FamilyManage开发-Springboot后端
thumbnail: /2019/05/17/d3541f2b/zd01.jpg
tags: FamilyManage
categories: FamilyManage
abbrlink: 9739c085
date: 2019-06-07 17:01:44
---

## 前言

本项目的后端采用Springboot框架进行开发。

<!--More-->

## 开发的IDE

我采用InteliJ IDEA，使用Maven作为版本控制工具，没有使用Gradle是因为虽然Gradle更为简洁，但是灵活性太高，虽然Maven写的更为繁琐，但是逻辑性更强，看起来结构更为清晰。

附录我创建时的pom.xml：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.1.5.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>onlypear</groupId>
    <artifactId>familygrow</artifactId>
    <version>1.0.0-FAMILY</version>
    <name>familygrow</name>
    <description>family grow web server</description>

    <properties>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.0.1</version>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.apache.shiro</groupId>
            <artifactId>shiro-spring-boot-web-starter</artifactId>
            <version>1.4.0</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```

## 目前使用到的

- Spring Shiro 安全控制（权限控制）
- Mybatis 定制化处理SQL
- MySQL 使用腾讯云主机配置的MySQL
- Lombok 编译时生成，简化代码

## 将来使用的

- RabbitMQ 消息队列
- Redis 缓存
- Spring Cloud
- Mail 邮件服务
- OSS 对象储存
- 。。。