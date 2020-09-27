---
title: Hexo配置文件详解
tags: Hexo
categories: 环境搭建
thumbnail: /2019/05/16/503f0645/1557970767839.png
abbrlink: 503f0645
date: 2019-05-16 09:04:35
---
## Hexo的配置

Hexo的配置还是很好做的，使用了yml的方式，简洁简单，下面我介绍一下根目录下的配置文件，关于主题的配置，请持续关注我的博客。

<!-- more -->

## 配置

在Hexo根目录中有一个名为**_config.xml**的文件，便是我们的配置文件，在这里可以修改大部分的的配置。

## 网站

```json
参数              描述
title           网站标题
subtitle        网站副标题
description     网站描述
author          您的名字
language        网站使用的语言
timezone        网站时区。Hexo 默认使用您电脑的时区。时区列表。比如说：America/New_York, Japan, 和 UTC 。
```

其中需要注意的是description比较重要，它主要用于 SEO，用来告诉搜索引擎关于站点的信息，在其中包含网站的关键词。

#### 什么是SEO呢？（摘自百度百科）

<a href="https://baike.baidu.com/item/%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E%E4%BC%98%E5%8C%96/3132?fromtitle=SEO&fromid=102990">SEO</a>（Search Engine Optimization）：汉译为[搜索引擎](https://baike.baidu.com/item/%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E)优化。是一种方式：利用[搜索引擎](https://baike.baidu.com/item/%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E/104812)的规则提高[网站](https://baike.baidu.com/item/%E7%BD%91%E7%AB%99/155722)在有关搜索引擎内的[自然排名](https://baike.baidu.com/item/%E8%87%AA%E7%84%B6%E6%8E%92%E5%90%8D/2092669)。目的是：为网站提供生态式的[自我营销](https://baike.baidu.com/item/%E8%87%AA%E6%88%91%E8%90%A5%E9%94%80/1337542)解决方案，让其在行业内占据领先地位，获得[品牌](https://baike.baidu.com/item/%E5%93%81%E7%89%8C/235720)收益；SEO包含站外SEO和站内SEO两方面；为了从[搜索引擎](https://baike.baidu.com/item/%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E/104812)中获得更多的[免费流量](https://baike.baidu.com/item/%E5%85%8D%E8%B4%B9%E6%B5%81%E9%87%8F/13479480)，从[网站结构](https://baike.baidu.com/item/%E7%BD%91%E7%AB%99%E7%BB%93%E6%9E%84/11069102)、内容建设方案、用户[互动传播](https://baike.baidu.com/item/%E4%BA%92%E5%8A%A8%E4%BC%A0%E6%92%AD/8534525)、页面等角度进行合理[规划](https://baike.baidu.com/item/%E8%A7%84%E5%88%92/2273615)，还会使搜索引擎中显示的网站相关信息对用户来说更具有[吸引力](https://baike.baidu.com/item/%E5%90%B8%E5%BC%95%E5%8A%9B/9846334)。

## 网址

```json
参数                   描述                       默认值
url                   网址     
root                  网站根目录    
permalink             文章的永久链接格式      :year/:month/:day/:title/
permalink_defaults    永久链接中各部分的默认值   
```

## 目录

```json
source_dir: source     资源文件，用来存放内容，映射到根目录下的source，在其中的_posts存放*.md文件即可完成博客发布     
public_dir: public     公共文件夹，生成的站点文件存放在这个地方
tag_dir: tags          标签文件夹
archive_dir: archives  归档文件架
category_dir: categories  分类文件夹
code_dir: downloads/code  include code文件夹
i18n_dir: :lang    国际化i18n文件夹
skip_render:    跳过指定文件的渲染，您可使用 glob 表达式来匹配路径。
```

#### 什么是i18n呢？（源自于百度百科）

<a href="https://baike.baidu.com/item/I18N/6771940?fr=aladdin">i18n</a>（其来源是英文单词 internationalization的首末字符i和n，18为中间的字符数）是“国际化”的简称。在资讯领域，国际化(i18n)指让产品（出版物，软件，硬件等）无需做大的改变就能够适应不同的语言和地区的需要。对程序来说，在不修改内部代码的情况下，能根据不同语言及地区显示相应的界面。 在全球化的时代，国际化尤为重要，因为产品的潜在用户可能来自世界的各个角落。通常与i18n相关的还有L10n（“本地化”的简称）。

#### 什么是glob表达式呢？

请查看[microkof](https://www.jianshu.com/u/eec05fd43014)的一篇博文，我认为写的很好，地址是：https://www.jianshu.com/p/91eb8d81da64

## 文章

```json
参数                  描述  
new_post_name       新文章的文件名称    
default_layout      预设布局    
auto_spacing        在中文和英文之间加入空格    
titlecase           把标题转换为 title case   
external_link       在新标签中打开链接 
filename_case       把文件名称转换为 (1) 小写或 (2) 大写     
render_drafts       显示草稿    
post_asset_folder   启动 Asset 文件夹    
relative_link       把链接改为与根目录的相对位址  
future              显示未来的文章     
highlight           代码块的设置
```

他们的默认值：

```json
# Writing
new_post_name: :title.md # File name of new posts
default_layout: post
titlecase: false # Transform title into titlecase
external_link: true # Open external links in new tab
filename_case: 0
render_drafts: false
post_asset_folder: false
relative_link: false
future: true
highlight:
  enable: true
  line_number: true
  auto_detect: false
  tab_replace:
```

#### title case 是什么？

请看title case的github进行了解：https://github.com/rvagg/titlecase

#### post_asset_folder 是什么？

asset是md文件链接图片时存放图片的默认文件夹，由此可知，开启这个选项，我们的博文中可以方便的插入图片，当然还需要一些配置：

第二步：在hexo目录下执行这样一句话`npm install hexo-asset-image --save`，这是下载安装一个可以上传本地图片的插件，等待一小段时间后，再运行`hexo n "xxxx"`来生成md博文时，`/source/_posts`文件夹内除了`xxxx.md`文件还有一个**同名的文件夹** （当然也可以自己手动建）

第三步：最后在xxxx.md中想引入图片时，先把图片复制到xxxx这个文件夹中，然后只需要在xxxx.md中按照markdown的格式引入图片：```![你想输入的替代文字](xxxx/图片名.jpg)```

注意： xxxx是这个md文件的名字，也是同名文件夹的名字。只需要有文件夹名字即可，不需要绝对路径。你想引入的图片就只需要放入xxxx这个文件夹内就好了，很像引用相对路径。

第四步：最后检查一下，hexo g生成页面后，进入public\2017\02\26\index.html文件中查看相关字段，可以发现，html标签内的语句是```<img src="2017/02/26/xxxx/图片名.jpg">```，而不是<img src="xxxx/图片名.jpg>。这很重要，关乎你的网页是否可以真正加载你想插入的图片。

## 分类&标签

```json
参数                  描述          默认值
default_category    默认分类    uncategorized
category_map        分类别名    
tag_map             标签别名    
```

## 时间日期格式

```json
参数              描述      默认值
date_format     日期格式    YYYY-MM-DD
time_format     时间格式    H:mm:ss
```

## 分页

```json
参数          描述                              默认值
per_page    每页显示的文章量 (0 = 关闭分页功能)   10
pagination_dir  分页目录                        page
```



## 拓展

```json
参数          描述
theme       当前主题名称。值为false时禁用主题
deploy      部署部分的设置
```

其中deploy部署部分，我们可以选择部署到github也可以选择部署到coding，我选择两个都进行部署，操作步骤请持续关注我的博客。

## fork me on Github 目前还没有添加，代码如下
```html
<a href="https://github.com/OctoberTian"><img width="149" height="149"
            src="https://github.blog/wp-content/uploads/2008/12/forkme_right_orange_ff7600.png?resize=149%2C149"
            class="attachment-full size-full" alt="Fork me on GitHub" data-recalc-dims="1"></a>
```
## 鸣谢

参考一下优秀博文：

作者：saucer-man 
来源：CSDN 
原文：https://blog.csdn.net/gyq1998/article/details/78294689 

![1557970767839](/Hexo配置文件详解/1557970767839.png)

