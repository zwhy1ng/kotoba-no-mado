# ことばの窓

日文教学视频目录，使用原生 HTML/CSS/JavaScript 构建，可直接部署到 Vercel，无需构建步骤。

## 本地预览

```bash
npx serve .
```

## 部署到 Vercel

在 Vercel 导入此 GitHub 仓库，Framework Preset 选 **Other**，Build Command 和 Output Directory 留空（根目录即站点目录）。

## 视频存储建议

不要将正式视频文件放进 Git 仓库或 Vercel 静态目录。众筹观众可能在日本同时播放，推荐使用 **Cloudflare Stream**（托管、转码、多码率自适应播放一体化）；如果希望按月付固定流量成本，可评估 **Bunny Stream**。若只有少量短视频、预算优先，也可用 YouTube 不公开视频并通过嵌入播放器展示。公开可访问的视频链接并不等于访问控制；若众筹权益需要防止外传，应选择支持签名 URL/令牌的付费方案，并避免把私密视频设为公开链接。

将托管平台的视频 URL 填入 `src/lessons.js` 每项的 `video` 字段：MP4 URL 使用原生播放器，YouTube/Vimeo 的嵌入 URL 使用 iframe。设置示例：

```js
{ ..., video: 'https://customer-abc.cloudflarestream.com/VIDEO_ID/manifest/video.m3u8' }
```

Stream 平台的播放 URL 格式请以其控制台生成的嵌入代码为准。
