+++
date = '2025-11-26T09:14:00+08:00'
title = '[CV] X-AnyLabeling配置YOLO模型（含大量白底图片，当心眼睛！）'
toc = true  # 启用目录
+++
**摘要**: 例如，在 yolov8n 目标检测模型的基础上，使用 BDD100K 数据集训练了一个新的模型，那么如何在 X-AnyLabeling 上使用这个新训练出来的模型来进行自动化标注。
## 1. 确认基础模型类型

打开官方提供的 model zoo（[X-AnyLabeling/docs/en/model_zoo.md at main · CVHub520/X-AnyLabeling · GitHub](https://github.com/CVHub520/X-AnyLabeling/blob/main/docs/en/model_zoo.md)），找到目标检测标题下，对应的模型。

<img src="/images/x-anylabeling_custom_model/1.png" alt="model_zoo" width="80%">

## 2. 自定义yaml文件
<img src="/images/x-anylabeling_custom_model/2.png" alt="important param" width="80%">

点进去看他具体的配置，可以直接把所有内容复制出来，核心配置项是3个：

- type: yolov8

- name: yolov8n-r20230520

- model_path: ....

前 2 项必须<font color="red">**原封不动**</font>地复制到我们自己的配置文件中。`model_path` 则是选择自己onnx模型的路径就行。

以我本地的一个例子为例，`yolowithbdd.yaml`配置文件应该长这样：

```yaml
type: yolov8
name: yolov8n-r20230520
display_name: bdd-ep100-res640
provider: dingyx
conf_threshold: 0.3
model_path: /home/kinglong/Workspace/auto-anno/bdd_yolo8n_640_ep100_best.onnx
classes:
  - car
  - bus
  - person
  - bike
  - truck
  - motor
  - train
  - rider
  - traffic sign
  - traffic light
```

其中：

- `type`: 必须照抄官方配置;

- `name`: 必须照抄官方配置;

- `display_name`: 在 X-AnyLabeling 中显示的名称;

- `provider`: 没什么用;

- `conf_threshold`、`iou_threshold`: 置信区间类的参数，这里配置的数值其实也没什么用，因为可以在软件中进一步配置;

- `model_path`: 模型的本地路径;

- `classes`: 类别标签，和训练时的类别标签一致即可。

## 3. 在 X-AnyLabeling 中配置

<img src="/images/x-anylabeling_custom_model/3.png" alt="important param" width="80%">



<img src="/images/x-anylabeling_custom_model/4.png" alt="important param" width="80%">



<img src="/images/x-anylabeling_custom_model/5.png" alt="important param" width="80%">



选择在 2 中配置好的 `yolowithbdd.yaml` 文件，然后这个模型就出现了

<img src="/images/x-anylabeling_custom_model/6.png" alt="important param" width="80%">



<img src="/images/x-anylabeling_custom_model/7.png" alt="important param" width="80%">
