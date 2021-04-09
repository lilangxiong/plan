## css3 选择器

|  选择器   | 示例  | 示例说明 |
|  ----  |  ----  |  ----  |
| element1~element2	  | p~ul | 选择p元素之后的每一个ul元素 |
| [attribute^=value]  | a[src^="https"] | 选择每一个src属性的值以"https"开头的元素 |
| [attribute$=value]  | a[src*="44lan"] | 选择每一个src属性的值包含子字符串"44lan"的元素 |
| :first-of-type  | p:first-of-type | 选择每个p元素是其父级的第一个p元素 |
| :last-of-type  | p:last-of-type | 选择每个p元素是其父级的最后一个p元素 |
| :only-of-type  | p:only-of-type | 选择每个p元素是其父级的唯一p元素 |
| :only-child  | p:only-child | 选择每个p元素是其父级的唯一子元素	 |
| :nth-child(n)  | p:nth-child(2) | 选择每个p元素是其父级的第二个子元素 |
| :nth-last-child(n)  | p:nth-last-child(2) | 选择每个p元素的是其父级的第二个子元素，从最后一个子项计数 |
| :nth-of-type(n)  | p:nth-of-type(2) | 选择每个p元素是其父级的第二个p元素 |
| :nth-last-of-type(n)  | p:nth-last-of-type(2) | 选择每个p元素的是其父级的第二个p元素，从最后一个子项计数 |
| :last-child  | p:last-child | 选择每个p元素是其父级的最后一个子级	 |
| :root  | :root | 选择文档的根元素	|
| :empty  | p:empty | 选择每个没有任何子级的p元素（包括文本节点） |
| :target  | #news:target | 选择当前活动的#news元素（包含该锚名称的点击的URL） |
| :enabled  | input:enabled | 选择每一个已启用的输入元素	 |
| :disabled | input:disabled | 选择每一个禁用的输入元素	 |
| :checked  | input:checked | 选择每个选中的输入元素	 |
| :not(selector) | :not(p) | 选择每个并非p元素的元素 |
| ::selection  | ::selection | 匹配元素中被用户选中或处于高亮状态的部分 |
| :out-of-range  | :out-of-range	 | 匹配值在指定区间之外的input元素		 |
| :in-range  | :in-range | 匹配值在指定区间之内的input元素		 |
| :read-write  | :read-write | 用于匹配可读及可写的元素	|
| :read-only  | :read-only | 用于匹配设置 "readonly"（只读） 属性的元素	 |
| :optional | :optional | 用于匹配可选的输入元素 |
| :required | :required | 用于匹配设置了 "required" 属性的元素	 |
| :valid | :valid | 用于匹配输入值为合法的元素			 |
| :in-range  | :in-range | 匹配值在指定区间之内的input元素		 |
| :read-write  | :read-write | 用于匹配可读及可写的元素	|

## CSS3 边框（Borders）

用 CSS3 ，你可以创建圆角边框，添加阴影框，并作为边界的形象而不使用设计程序。

|  属性   | 示例  |
|  ----  |  ----  |
| [border-image](https://www.runoob.com/cssref/css3-pr-border-image.html)	| 设置所有边框图像的速记属性  |
| [border-radius](https://www.runoob.com/cssref/css3-pr-border-radius.html)	| 一个用于设置所有四个边框- *-半径属性的速记属性 |
| [box-shadow](https://www.runoob.com/cssref/css3-pr-box-shadow.html)	| 附加一个或多个下拉框的阴影  |


```css
div{ 
    border:2px solid; 
    border-radius:25px; 
    box-shadow: 10px 10px 5px #888888; 
    border-image:url(border.png) 30 30 round; 
}
```

## CSS3 背景

CSS3中包含几个新的背景属性，提供背景元素控制。

|  属性   | 示例  |
|  ----  |  ----  |
| [background-clip](https://www.runoob.com/cssref/css3-pr-background-clip.html)	| 规定背景的绘制区域 |
| [background-origin](https://www.runoob.com/cssref/css3-pr-background-origin.html)	| 规定背景图片的定位区域 |
| [background-size](https://www.runoob.com/cssref/css3-pr-background-size.html)	| 附加一个或多个下拉框的阴影  |

```css
div{ 
    background:url(img_flwr.gif); 
    background-repeat:no-repeat; 
    background-size:100% 100%; 
    background-origin:content-box;
} 
/*多背景*/ 
body{ 
    background-image:url(img_flwr.gif), url(img_tree.gif); 
}
```

## CSS3 渐变

CSS3 定义了两种类型的渐变（gradients）：

- 线性渐变（[Linear Gradients](https://www.runoob.com/cssref/func-linear-gradient.html)）- 向下/向上/向左/向右/对角方向

```css
div{
  background: linear-gradient(direction, color-stop1, color-stop2, ...);
}
```

- 径向渐变（[Radial Gradients](https://www.runoob.com/css3/css3-gradients.html)）- 由它们的中心定义

```css
div{
  background: radial-gradient(center, shape size, start-color, ..., last-color);
}
```

## CSS3 文本效果

| 属性 | 描述 | 示例 |
| ---- | ---- | ---- |
| [text-overflow](https://www.runoob.com/cssref/css3-pr-text-overflow.html)	 | 规定当文本溢出包含元素时发生的事情 | text-overflow:ellipsis; |
| [text-shadow](https://www.runoob.com/cssref/css3-pr-text-shadow.html) | 向文本添加阴影 | text-shadow: 2px 2px #ff0000; |
| [word-break](https://www.runoob.com/cssref/css3-pr-word-break.html) | 规定非中日韩文本的换行规则	 | word-break:break-all; |
| [word-wrap](https://www.runoob.com/cssref/css3-pr-word-wrap.html) | 允许对长的不可分割的单词进行分割并换行到下一行	 | word-wrap:break-word; |


## CSS3 转换和变形

**2D新转换属性**

以下列出了所有的转换属性:

| 属性 | 描述 |
| ---- | ---- |
| [transform](https://www.runoob.com/cssref/css3-pr-transform.html) | 适用于2D或3D转换的元素	 |
| [transform-origin](https://www.runoob.com/cssref/css3-pr-transform-origin.html) | 允许您更改转化元素位置 | 

**2D 转换方法**

| 函数 | 描述 |
| ---- | ---- |
| matrix(n,n,n,n,n,n)	 | 定义 2D 转换，使用六个值的矩阵|
| translate(x,y)	 | 定义 2D 转换，沿着 X 和 Y 轴移动元素 |
| translateX(n) | 定义 2D 转换，沿着 X 轴移动元素 |
| translateY(n) | 定义 2D 转换，沿着 Y 轴移动元素 |
| scale(x,y) | 定义 2D 缩放转换，改变元素的宽度和高度 |
| scaleX(n) | 定义 2D 缩放转换，改变元素的宽度 |
| scaleY(n) | 定义 2D 缩放转换，改变元素的高度 |
| rotate(angle) | 定义 2D 旋转，在参数中规定角度 |
| skew(x-angle,y-angle) | 定义 2D 倾斜转换，沿着 X 和 Y 轴 |
| skewX(angle) | 定义 2D 倾斜转换，沿着 X 轴 |
| skewY(angle) | 定义 2D 倾斜转换，沿着 Y 轴 |

**3D转换属性**

下表列出了所有的转换属性：

| 属性 | 描述 |
| ---- | ---- |
| [transform](https://www.runoob.com/cssref/css3-pr-transform.html) | 适用于2D或3D转换的元素	 |
| [transform-origin](https://www.runoob.com/cssref/css3-pr-transform-origin.html) | 允许您更改转化元素位置 | 
|[transform-style](https://www.runoob.com/cssref/css3-pr-transform-style.html) | 规定被嵌套元素如何在 3D 空间中显示 |
| [perspective](https://www.runoob.com/cssref/css3-pr-perspective.html) | 规定 3D 元素的透视效果 |
| [perspective-origin](https://www.runoob.com/cssref/css3-pr-perspective-origin.html) | 规定 3D 元素的底部位置 |
| [backface-visibility](https://www.runoob.com/cssref/css3-pr-backface-visibility.html) | 定义元素在不面对屏幕时是否可见 |


**3D 转换方法**


| 函数 | 描述 |
| ---- | ---- |
| matrix3d(n,n,n,n,n,n,
n,n,n,n,n,n,n,n,n,n)	| 定义 3D 转换，使用 16 个值的 4x4 矩阵 |
| translate3d(x,y,z) | 定义 3D 转化 |
| translateX(n) | 定义 3D 转化，仅使用用于 X 轴的值 |
| translateY(n) | 定义 3D 转化，仅使用用于 Y 轴的值 |
| translateZ(z) | 定义 3D 转化，仅使用用于 Z 轴的值 |
| scale3d(x,y,z) | 定义 3D 缩放转换 |
| scaleX(n) | 定义 3D 缩放转换，通过给定一个 X 轴的值 |
| scaleY(n) | 定义 3D 缩放转换，通过给定一个 Y 轴的值 |
| scaleZ(n) | 定义 3D 缩放转换，通过给定一个 Z 轴的值 |
| rotate3d(x,y,z,angle) | 定义 3D 旋转 |
| rotateX(angle) | 定义沿 X 轴的 3D 旋转 |
| rotateY(angle) | 定义沿 Y 轴的 3D 旋转 |
| rotateZ(angle) | 定义沿 Z 轴的 3D 旋转 |
| perspective(n) | 定义 3D 转换元素的透视视图 |

## CSS3 过渡

过渡属性

下表列出了所有的过渡属性:

| 属性 | 描述 |
| ---- | ---- |
| [transition](https://www.runoob.com/cssref/css3-pr-transition.html) | 简写属性，用于在一个属性中设置四个过渡属性 |
| [transition-property](https://www.runoob.com/cssref/css3-pr-transition-property.html) | 规定应用过渡的 CSS 属性的名称 |
| [transition-duration](https://www.runoob.com/cssref/css3-pr-transition-duration.html) | 定义过渡效果花费的时间。默认是 0 | 
| [transition-timing-function](https://www.runoob.com/cssref/css3-pr-transition-timing-function.html) | 规定过渡效果的时间曲线。默认是 "ease" | 
| [transition-delay](https://www.runoob.com/cssref/css3-pr-transition-delay.html) | 规定过渡效果何时开始。默认是 0 |

```css
div{
    transition-property: width;
    transition-duration: 1s;
    transition-timing-function: linear;
    transition-delay: 2s;
}
```

## CSS3 动画

要创建CSS3动画，你需要了解@keyframes规则。@keyframes规则是创建动画。 @keyframes规则内指定一个CSS样式和动画将逐步从目前的样式更改为新的样式。

**示例**

当动画为 25% 及 50% 时改变背景色，然后当动画 100% 完成时再次改变：


```css
@keyframes myfirst{
    0% {
        background: red;
    }
    25% {
        background: yellow;
    }
    50% {
        background: blue;
    }
    100% {
        background: green;
    }
}
```

下面的表格列出了 @keyframes 规则和所有动画属性：

| 属性 | 描述 |
| ---- | ---- |
| [@keyframes](https://www.runoob.com/cssref/css3-pr-animation-keyframes.html) | 规定动画。|| 
| [animation](https://www.runoob.com/cssref/css3-pr-animation.html) | 所有动画属性的简写属性，除了 animation-play-state 属性。|
| [animation-name](https://www.runoob.com/cssref/css3-pr-animation-name.html) | 规定 @keyframes 动画的名称。|
| [animation-duration](https://www.runoob.com/cssref/css3-pr-animation-duration.html) | 规定动画完成一个周期所花费的秒或毫秒。默认是 0。 |
| [animation-timing-function](https://www.runoob.com/cssref/css3-pr-animation-timing-function.html) | 规定动画的速度曲线。默认是 "ease"。 |
| [animation-delay](https://www.runoob.com/cssref/css3-pr-animation-delay.html) | 规定动画何时开始。默认是 0。 |
| [animation-iteration-count](https://www.runoob.com/cssref/css3-pr-animation-iteration-count.html) | 规定动画被播放的次数。默认是 1。 |
| [animation-direction](https://www.runoob.com/cssref/css3-pr-animation-direction.html) | 规定动画是否在下一周期逆向地播放。默认是 "normal"。 |
| [animation-play-state](https://www.runoob.com/cssref/css3-pr-animation-play-state.html) | 规定动画是否正在运行或暂停。默认是 "running"。|

```css
div {
  animation-name: myfirst;
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-delay: 2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-play-state: running;
}
```

## CSS3 多列

下表列出了所有 CSS3 的多列属性：

| 属性 | 描述 |
| ---- | ---- |
| [column-count](https://www.runoob.com/cssref/css3-pr-column-count.html) | 指定元素应该被分割的列数 |
| [column-fill](https://www.runoob.com/cssref/css3-pr-column-fill.html) | 指定如何填充列 |
| [column-gap](https://www.runoob.com/cssref/css3-pr-column-gap.html) | 指定列与列之间的间隙 |
| [column-rule](https://www.runoob.com/cssref/css3-pr-column-rule.html) | 所有 column-rule-* 属性的简写 |
| [column-rule-color](https://www.runoob.com/cssref/css3-pr-column-rule-color.html) | 指定两列间边框的颜色 |
| [column-rule-style](https://www.runoob.com/cssref/css3-pr-column-rule-style.html) | 指定两列间边框的样式 |
| [column-rule-width](https://www.runoob.com/cssref/css3-pr-column-rule-width.html) | 指定两列间边框的厚度 |
| [column-span](https://www.runoob.com/cssref/css3-pr-column-span.html) | 指定元素要跨越多少列 |
| [column-width](https://www.runoob.com/cssref/css3-pr-column-width.html) | 指定列的宽度 |
| [columns](https://www.runoob.com/cssref/css3-pr-columns.html) | 设置column-width 和 column-count 的简写 |


## CSS3 盒模型

在 CSS3 中, 增加了一些新的用户界面特性来调整元素尺寸，框尺寸和外边框，主要包括以下用户界面属性：

- resize：none | both | horizontal | vertical | inherit
- box-sizing：content-box | border-box | inherit
- outline：outline-color outline-style outline-width outine-offset

## CSS3伸缩布局盒模型(弹性盒)

CSS3 弹性盒（ Flexible Box 或 flexbox），是一种当页面需要适应不同的屏幕大小以及设备类型时确保元素拥有恰当的行为的布局方式。

引入弹性盒布局模型的目的是提供一种更加有效的方式来对一个容器中的子元素进行排列、对齐和分配空白空间。 

下表列出了在弹性盒子中常用到的属性:

| 属性 | 描述 |
| ---- | ----|
| [display](https://www.runoob.com/cssref/pr-class-display.html) | 指定 HTML 元素盒子类型 |
| [flex-direction](https://www.runoob.com/cssref/css3-pr-flex-direction.html) | 指定了弹性容器中子元素的排列方式 |
| [justify-content](https://www.runoob.com/cssref/css3-pr-justify-content.html) | 设置弹性盒子元素在主轴（横轴）方向上的对齐方式 |
| [align-items](https://www.runoob.com/cssref/css3-pr-align-items.html) | 设置弹性盒子元素在侧轴（纵轴）方向上的对齐方式 |
| [flex-wrap](https://www.runoob.com/cssref/css3-pr-flex-wrap.html) | 设置弹性盒子的子元素超出父容器时是否换行 |
| [align-content](http://www.runoob.com/cssref/css3-pr-align-content.html) | 修改 flex-wrap 属性的行为，类似 align-items, 但不是设置子元素对齐，而是设置行对齐 |
| [flex-flow](http://www.runoob.com/cssref/css3-pr-flex-flow.html) | flex-direction 和 flex-wrap 的简写 |
| [order](http://www.runoob.com/cssref/css3-pr-order.html) | 设置弹性盒子的子元素排列顺序 |
| [align-self](http://www.runoob.com/cssref/css3-pr-align-self.html) | 在弹性子元素上使用。覆盖容器的 align-items 属性 |
| [flex](http://www.runoob.com/cssref/css3-pr-flex.html) | 设置弹性盒子的子元素如何分配空间 |