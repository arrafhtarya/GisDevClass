/* ==========================
  你的原本 main.js 內容保留
  (WMTS 底圖、甜點點位、控制器、PanTo)
========================== */

/* ===== 以下為新增功能（五項） ===== */

// ===== 量測工具 =====
let draw;
const measureSource = new ol.source.Vector();
const measureLayer = new ol.layer.Vector({ source: measureSource });
map.addLayer(measureLayer);

function addMeasure(type) {
  map.removeInteraction(draw);
  draw = new ol.interaction.Draw({
    source: measureSource,
    type: type
  });
  map.addInteraction(draw);
}

// ===== 點擊顯示座標 =====
map.on('singleclick', function(evt) {
  const coord = ol.proj.toLonLat(evt.coordinate);
  alert(`經度：${coord[0].toFixed(6)}\n緯度：${coord[1].toFixed(6)}`);
});

// ===== 經緯度輸入定位 =====
function goToCoord() {
  const lon = parseFloat(document.getElementById("lon").value);
  const lat = parseFloat(document.getElementById("lat").value);
  if (isNaN(lon) || isNaN(lat)) {
    alert("請輸入正確的經緯度");
    return;
  }
  view.animate({
    center: ol.proj.fromLonLat([lon, lat]),
    zoom: 16,
    duration: 1200
  });
}

// ===== 底圖透明度控制 =====
function setOpacity(val) {
  if (typeof raster !== "undefined") raster.setOpacity(val);
  if (typeof rasterWMTS !== "undefined") rasterWMTS.setOpacity(val);
  if (typeof rasterEMAP8 !== "undefined") rasterEMAP8.setOpacity(val);
  if (typeof rasterEMAP15 !== "undefined") rasterEMAP15.setOpacity(val);
  if (typeof rasterPHOTO2 !== "undefined") rasterPHOTO2.setOpacity(val);
  if (typeof rasterPHOTO_MIX !== "undefined") rasterPHOTO_MIX.setOpacity(val);
}

// ===== 指北針 =====
// 純 HTML 視覺，無 JS 邏輯


