---
title: Springboot-Shiro-编码/加密
thumbnail: /2019/05/17/d3541f2b/zd01.jpg
tags: Shiro
categories: Springbooot
abbrlink: 3a76d525
date: 2019-06-19 09:30:54
---

# 前言

此文章为填坑FamilyManage中关于加密次数的问题，拓展为对编码/加密模块的学习和思考。

<!--More-->

# 编码/解码
Shiro 提供了 base64 和 16 进制字符串编码 / 解码的 API 支持，方便一些编码解码操作。Shiro 内部的一些数据的存储 / 表示都使用了 base64 和 16 进制字符串。
```java
String str = "hello"; 
String base64Encoded = Base64.encodeToString(str.getBytes()); String str2 = Base64.decodeToString(base64Encoded); Assert.assertEquals(str, str2);
```
通过debug,我们逐步查看:
hello字符串首先被转换成byte类型,传入函数:

![1560908997513](Springboot-Shiro-编码-加密.assets/1560908997513.png)

加密过后会生成:(这个过程可以参看下面Base64编码的讲解,博客中间的很清楚)

![1560909234406](Springboot-Shiro-编码-加密.assets/1560909234406.png)

编码过后变为 5 × 8 ÷ 6 = 7,但为什么会有8个呢,就是因为出现了位数不足的问题:

![1560909870526](Springboot-Shiro-编码-加密.assets/1560909870526.png)

所以最后出现的结果为hello=>![1560909903478](Springboot-Shiro-编码-加密.assets/1560909903478.png)

有一个等于号,一共是八位,这个过程就看完了




## Base64编码
目前Base64已经成为网络上常见的传输8Bit字节代码的编码方式之一。在做支付系统时，系统之间的报文交互都需要使用Base64对明文进行转码，然后再进行签名或加密，之后再进行（或再次Base64）传输。

在参数传输的过程中经常遇到的一种情况：使用全英文的没问题，但一旦涉及到中文就会出现乱码情况。与此类似，网络上传输的字符并不全是可打印的字符，比如二进制文件、图片等。Base64的出现就是为了解决此问题，它是基于64个可打印的字符来表示二进制的数据的一种方法。

### Base64的编码原理
Base64的原理比较简单，每当我们使用Base64时都会先定义一个类似这样的数组：
`['A', 'B', 'C', ... 'a', 'b', 'c', ... '0', '1', ... '+', '/']`
上面就是Base64的索引表，字符选用了"A-Z、a-z、0-9、+、/" 64个可打印字符，这是标准的Base64协议规定。在日常使用中我们还会看到“=”或“==”号出现在Base64的编码结果中，“=”在此是作为填充字符出现

### 具体转换过程

第一步，将待转换的字符串每三个字节分为一组，每个字节占8bit，那么共有24个二进制位。
第二步，将上面的24个二进制位每6个一组，共分为4组。
第三步，在每组前面添加两个0，每组由6个变为8个二进制位，总共32个二进制位，即四个字节。
第四步，根据Base64编码对照表（见下图）获得对应的值。
0　A　　17　R　　　34　i　　　51　z

1　B　　18　S　　　35　j　　　52　0

2　C　　19　T　　　36　k　　　53　1

3　D　　20　U　　　37　l　　　54　2

4　E　　21　V　　　38　m　　　55　3

5　F　　22　W　　　39　n　　　56　4

6　G　　23　X　　　40　o　　　57　5

7　H　　24　Y　　　41　p　　　58　6

8　I　　25　Z　　　42　q　　　59　7

9　J　　26　a　　　43　r　　　60　8

10　K　　27　b　　　44　s　　　61　9

11　L　　28　c　　　45　t　　　62　+

12　M　　29　d　　　46　u　　　63　/

13　N　　30　e　　　47　v

14　O　　31　f　　　48　w　　　

15　P　　32　g　　　49　x

16　Q　　33　h　　　50　y
从上面的步骤我们发现：

- Base64字符表中的字符原本用6个bit就可以表示，现在前面添加2个0，变为8个bit，会造成一定的浪费。因此，Base64编码之后的文本，要比原文大约三分之一。

- 为什么使用3个字节一组呢？因为6和8的最小公倍数为24，三个字节正好24个二进制位，每6个bit位一组，恰好能够分为4组。

![1560909636567](Springboot-Shiro-编码-加密.assets/1560909636567.png)

详细内容还请参看下面的博文

### 特别鸣谢
作者：二师兄-公众号-程序新视界 
来源：CSDN 
原文：https://blog.csdn.net/wo541075754/article/details/81734770 
版权声明：本文为博主原创文章，转载请附上博文链接！

# 散列算法

Base64是一种编码方式,它并不能进行加密,因为他的过程是可逆的,我告诉你我的密码的base64,你可以哪去转换为明文,所以并不能使用base64进行加密



散列算法一般用于生成数据的摘要信息，是一种**不可逆的算法**，一般适合存储密码之类的数据，常见的散列算法如 **MD5、SHA** 等。一般进行散列时最好提供一个 **salt（盐）**，比如加密密码 “admin”，产生的散列值是 “21232f297a57a5a743894a0e4a801fc3”，可以到一些 md5 解密网站很容易的通过散列值得到密码 “admin”，**即如果直接对密码进行散列相对来说破解更容易**，此时我们可以加一些只有系统知道的干扰数据，如用户名和 ID（即盐）；这样散列的对象是 “**密码 + 用户名 +ID”**，这样生成的散列值相对来说更难破解。

而我们往往要通过Base64的方式,我们可以看到Md5Hash的静态方法

![1560910528059](Springboot-Shiro-编码-加密.assets/1560910528059.png)

我们可以通过这个方法进行加密

```java
@Test
public void Md5Code() {
    String str = "hello";
    String salt = "123";
    String md5 = new Md5Hash(str, salt).toString();//还可以转换为 toBase64()/toHex()
}
```

如上代码通过盐 “123”MD5 散列 “hello”。另外散列时还可以指定散列次数，如 2 次表示：md5(md5(str))：“new Md5Hash(str, salt, 2).toString()”。

我之前遇到的坑,这个散列次数,我是用1024,出现了错误,后来改成2就对了

# Springboot Shiro

```java
@Bean("hashedCredentialsMatcher")
public HashedCredentialsMatcher shiroHashedCredentialsMatcher() {
    HashedCredentialsMatcher credentialsMatcher = new HashedCredentialsMatcher();
    //指定加密方式为MD5
    credentialsMatcher.setHashAlgorithmName("MD5");
    //加密次数
    credentialsMatcher.setHashIterations(2);
    credentialsMatcher.setStoredCredentialsHexEncoded(true);
    return credentialsMatcher;
}
```

我们首先制定了@Bean("hashedCredentialsMatcher"),就可以为我们的密码认证进行加密,我们设置了加密的方法为MD5,加密次数为2,那么setHashIterations()的方法具体的意思是什么?

```java
/ * *
*设置提交的{@code AuthenticationToken}的凭据在进行比较之前被散列的次数,指向存储在*系统中的凭据。除非被覆盖，否则默认值为{@code 1}，这意味着将执行正常的单个散列。如果*该参数小于1(即0或负数)，则应用默认值1。一定要有至少进行一次哈希迭代(否则将没有哈希)。
*/
public void setHashIterations(int hashIterations) {
        if (hashIterations < 1) {
            this.hashIterations = 1;
        } else {
            this.hashIterations = hashIterations;
        }
    }
```

