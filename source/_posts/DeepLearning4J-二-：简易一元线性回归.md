---
title: DeepLearning4J(二)：简易一元线性回归
thumbnail: /2019/05/17/d3541f2b/zd01.jpg
tags: dl4j
categories: /java
abbrlink: ef52c58b
date: 2020-01-22 12:24:18
---

## 前言

本节学习简易一元线性回归

<!--More-->

> 考虑一个模型，用数据去计算一个y=ax+b其中a和b的值，比如我们输入(1,1)(2,2)
>
> 这就是一个一层的神经网络

## 神经网络的配置

我们需要配置神经网络的超参数->为什么叫超参数呢？

超参数 -> 用于辅助模型学习参数的参数 -> hyper-parameter -> 超参数学习的参数是什么？

 y = ax + b其中的x,y是已知的，这是用于神经网络的训练样本。参数 a,b是未知的，所以a,b是我们神经网络需要学习的参数同时我们需要配置超参数来辅助神经网络学习到a 和 b这两个参数

- seed

随机种子 -> 随机数生成通常需要一个起点，我们所生成的随机数都是伪随机数。 因为神经网络训练时，模型的初试权重和偏置是随机生成的,我们需要随机数种子保证每次初始化的权重大体一致,这样可以保证模型结果的可复现性,只有模型结果可复现->进行神经网络的调参->我们的调参对于模型效果提升是有意义的 

- optimizationAlgo

优化算法使用。最常见:OptimizationAlgorithm.STOCHASTIC_GRADIENT_DESCENT

```java
/**
 * Optimization algorithm to use
 * @author Adam Gibson
 *
 */
public enum OptimizationAlgorithm {
    LINE_GRADIENT_DESCENT,
    CONJUGATE_GRADIENT,
    LBFGS,
    STOCHASTIC_GRADIENT_DESCENT
}
```

- weightInit

对神经网络的权重进行随机初始化,随机的权重要比全0的权重对神经网络训练更有意义

```java
public enum WeightInit {
    DISTRIBUTION,
    ZERO,
    ONES,
    SIGMOID_UNIFORM,
    NORMAL,
    LECUN_NORMAL,
    UNIFORM,
    XAVIER,
    XAVIER_UNIFORM,
    XAVIER_FAN_IN,
    XAVIER_LEGACY RELU,
    RELU_UNIFORM,
    IDENTITY,
    LECUN_UNIFORM,
    VAR_SCALING_NORMAL_FAN_IN,
    VAR_SCALING_NORMAL_FAN_OUT,
    VAR_SCALING_NORMAL_FAN_AVG,
    VAR_SCALING_UNIFORM_FAN_IN,
    VAR_SCALING_UNIFORM_FAN_OUT,
    VAR_SCALING_UNIFORM_FAN_AVG
}

```

- updater

优化算法

---------------------------分割线---------------------------

完整代码:

```java
public class SingleRegression {
    //随机数种子，用于结果复现
    private static final int seed = 12345;
    //对于每个miniBatch的迭代次数
    private static final int iterations = 10;
    //epoch数量(全部数据的训练次数)
    private static final int nEpochs = 20;
    //一共生成多少样本点
    private static final int nSamples = 1000;
    //Batch size: i.e., each epoch has nSamples/batchSize parameter updates
    private static final int batchSize = 100;
    //网络模型学习率
    private static final double learningRate = 0.01;
    //随机数据生成的范围
    private static int MIN_RANGE = 0;
    private static int MAX_RANGE = 3;

    private static final Random rng = new Random(seed);

    public static void main(String[] args) {
        //Create the network
        int numInput = 1;
        int numOutputs = 1;

        /**
         * 神经网络的配置
         我们需要配置神经网络的超参数->为什么叫超参数呢？
         超参数 -> 用于辅助模型学习参数的参数 -> hyper-parameter -> 超参数
         学习的参数是什么？ y = ax + b
         其中的x,y是已知的，这是用于神经网络的训练样本。
         参数 a,b是未知的，所以a,b是我们神经网络需要学习的参数
         同时我们需要配置超参数来辅助神经网络学习到a 和 b这两个参数
         */
        MultiLayerConfiguration conf = new NeuralNetConfiguration.Builder()
                /**
                 * 随机种子 -> 随机数生成通常需要一个起点，我们所生成的随机数都是伪随机数。
                 * 因为神经网络训练时，模型的初试权重和偏置是随机生成的
                 * 我们需要随机数种子保证每次初始化的权重大体一致
                 * 这样可以保证模型结果的可复现性
                 * 只有模型结果可复现->进行神经网络的调参->我们的调参对于模型效果提升是有意义的
                 */
                .seed(seed)
                /**
                 * 找方向
                 */
                .optimizationAlgo(OptimizationAlgorithm.STOCHASTIC_GRADIENT_DESCENT)
                /**
                 * 对神经网络的权重进行随机初始化
                 * 随机的权重要比全0的权重对神经网络训练更有意义
                 */
                .weightInit(WeightInit.XAVIER)
                /**
                 * 优化算法
                 * tf,keras -> optimizer
                 * 迈步子
                 *
                 * 学习率迈步子的大小
                 * 去吴恩达->网易云课堂->微专业
                 */
                .updater(new Sgd(learningRate))
                .list()
                .layer(0, new OutputLayer.Builder(LossFunctions.LossFunction.MSE)
                        /**
                         * y = x
                         * None
                         */
                        .activation(Activation.IDENTITY)
                        /**
                         * 上一层输出
                         */
                        .nIn(numInput)
                        /**
                         * 当前层神经单元的个数
                         */
                        .nOut(numOutputs).build())
                /**
                 * 预训练
                 */
                .pretrain(false)
                /**
                 * 反向传播
                 */
                .backprop(true).build();

        // 使用 MultiLayerNetwork 对我们的 conf 进行一个包装
        // 对神经网络进行了构建
        MultiLayerNetwork net = new MultiLayerNetwork(conf);

        // 必须调用 init() 方法
        // 是对于模型参数的初始化
        net.init();

        System.out.println(net.summary());

        /**
         * 有监听器，用于监听我们神经网络训练时候的状态
         * 主要是用于监听我们神经网络训练时候的损失函数的得分
         * 目前参数为1，则说明网络每训练一次，就会打印一次损失函数的得分
         */
//        net.setListeners(new ScoreIterationListener(1));

        DataSetIterator iterator = getTrainingData(batchSize, rng);

		// 后面就是进行训练了
    }
}
```

