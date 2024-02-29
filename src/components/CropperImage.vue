<template>
  <div style="width: 100%; height: 100%">
    <n-grid :cols="1" :x-gap="10" item-responsive>
   
      <n-grid-item>
        <n-grid :cols="1" :y-gap="20" >
     
          <n-grid-item>
        <div :style="{ width: option.width, height: option.height} " >
          <div>源图片</div>
          <vueCropper
            style="width: 100%; height: 100%"
            ref="cropper"
            :img="img.img"
            :outputSize="option.outputSize"
            :outputType="option.outputType"
            :info="option.info"
            :canScale="option.canScale"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :fixedBox="option.fixedBox"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :centerBox="option.centerBox"
            :infoTrue="option.infoTrue"
            :full="option.full"
            :enlarge="option.enlarge"
            :mode="option.mode"
          >
          </vueCropper>
     
        </div>
        </n-grid-item>
        <n-grid-item >
         

        <div :style="{ width: option.width, height: option.height } " >
          <div>截图的图片</div>
          <!-- 若图片只设置宽度，可以保持等比例展示图片 -->
          <img :src="imgUrl" style="width: 100%" />
        </div>
      
        </n-grid-item>
      
        </n-grid>
      </n-grid-item>
      <n-grid-item>
        <br/>
        <n-upload class="py-2" :max="1" @change="handleFinish">
          <n-button>上传文件</n-button>
        </n-upload>
        <n-space>
          <n-button tertiary type="info" plain @click="rotateLeft"
            >《=向左旋转图片</n-button
          >
          <n-button tertiary type="info" plain @click="rotateRight"
            >向右旋转图片=》</n-button
          >
          <n-button type="primary" @click="getCropDataBase64"
            >截取图象</n-button
          >
        </n-space>
      </n-grid-item>

     
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineProps ,defineEmits} from "vue";
import { useMessage } from "naive-ui";
import { loginState } from "../store/StoreLogin";
import { ArticleCoverStore } from "../store/storeArticle";
const message = useMessage();

const store = loginState();

const CoverStore = ArticleCoverStore();

const cropper = ref();
let img = reactive({
  img: "", // 裁剪图片的地址 url 地址, base64, blob
});
let option = defineProps({
  type: { type: Number, default: 1, required: true }, // 上传图片的类型1:头像2:封面
  width: { type: String, default: "820px", required: true }, //截图显示区域大小
  height: { type: String, default: "480px", required: true }, //截图显示区域大小
  outputSize: { type: Number, default: 1, required: true }, // 裁剪生成图片的质量
  outputType: { type: String, default: "png", required: true }, // 裁剪生成图片的格式 png
  info: { type: Boolean, default: true, required: true }, // 裁剪框的大小信息
  canScale: { type: Boolean, default: true, required: true }, // 图片是否允许滚轮缩放
  autoCrop: { type: Boolean, default: true, required: true }, // 是否默认生成截图框
  autoCropWidth: { type: Number, default: 128, required: true }, // 默认生成截图框宽度
  autoCropHeight: { type: Number, default: 128, required: true }, // 默认生成截图框高度
  fixedBox: { type: Boolean, default: false, required: true }, // 固定截图框大小 不允许改变
  fixed: { type: Boolean, default: true, required: true }, // 是否开启截图框宽高固定比例，这个如果设置为true，截图框会是固定比例缩放的，如果设置为false，则截图框的狂宽高比例就不固定了
  fixedNumber: { type: Array, default: [1, 1], required: true }, // 截图框的宽高比例 [ 宽度 , 高度 ]
  canMove: { type: Boolean, default: true, required: true }, // 上传图片是否可以移动
  canMoveBox: { type: Boolean, default: true, required: true }, // 截图框能否拖动
  original: { type: Boolean, default: false, required: true }, // 上传图片按照原始比例渲染
  centerBox: { type: Boolean, default: true, required: true }, // 截图框是否被限制在图片里面
  infoTrue: { type: Boolean, default: true, required: true }, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
  full: { type: Boolean, default: true, required: true }, // 是否输出原图比例的截图
  enlarge: { type: String, default: "1", required: true }, // 图片根据截图框输出比例倍数
  mode: { type: String, default: "contain", required: true }, // 图片默认渲染方式 contain , cover, 100px, 100% auto
});

// 向左旋转图片
const rotateLeft = () => {
  // 这个默认是旋转90度的，官网有说明
  // 后面会完善不要让这个一下子旋转90度的代码
  cropper.value.rotateLeft();
};

// 向右旋转
const rotateRight = () => {
  // 这个默认也是旋转90度的，官网有说明
  // 后面会完善不要让这个一下子旋转90度的代码
  cropper.value.rotateRight();
};

// 获取图片
const getCropDataBase64 = () => {
  // 这个是获取base64的图片m,所以要转换
  cropper.value.getCropData((data: any) => {
    // 将base64位的图片转化为file文件，然后通过form表单的形式提交给后端，让后端返回一个图片的访问地址
    var file = dataURLtoFile(data, `avatar+${store.name1}.png`);
    console.log("dd", file);
    imgUrl.value = data;
    //将获取的BE64传给父组件
    UploadimgUrl(file)
    //uploadadd(file);
  });
};
//将base64转换为file
function dataURLtoFile(dataurl, filename: string) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

const imgUrl = ref("");

const fileList = ref([]);
const handleFinish = ({ file }) => {
  console.log("file", file.file);
  img.img = URL.createObjectURL(file.file);
};
const emit = defineEmits(['uploadimg'])
const UploadimgUrl = function(file) {
  emit('uploadimg', file)
}


</script>

<style scoped></style>
