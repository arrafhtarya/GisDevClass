/* ==========================
  原本甜點地圖功能保留
========================== */
const initCenter = ol.proj.fromLonLat([120.6465, 24.1788]);
const view = new ol.View({ center:initCenter, zoom:14 });

// 底圖
const raster = new ol.layer.Tile({ source: new ol.source.OSM() });

// 地圖初始化
const map = new ol.Map({
  target: "map",
  layers: [raster],
  view: view
});

// 甜點點位 Marker
const locations = [
  { name:"CJSJ", coord:[120.6640,24.1448] },
  { name:"法芙尼", coord:[120.6643,24.1507] },
  { name:"法布甜", coord:[120.6524,24.1599] },
  { name:"回憶甜點", coord:[120.6766,24.1641] },
  { name:"AB 法國人的甜點店", coord:[120.6612,24.1250] },
  { name:"蒔初甜點", coord:[120.6588,24.1250] },
];

const markerSource = new ol.source.Vector();
locations.forEach(l=>{
  markerSource.addFeature(new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat(l.coord)),
    name: l.name
  }));
});

const markerLayer = new ol.layer.Vector({
  source: markerSource,
  style: f=>new ol.style.Style({
    image: new ol.style.Circle({
      radius:6,
      fill: new ol.style.Fill({color:"#ffcc33"}),
      stroke: new ol.style.Stroke({color:"#333", width:1})
    }),
    text: new ol.style.Text({
      text: f.get("name"),
      offsetY:-15,
      fill: new ol.style.Fill({color:"#000"}),
      stroke: new ol.style.Stroke({color:"#fff", width:3})
    })
  })
});
map.addLayer(markerLayer);

/* ===== PanTo 功能 ===== */
const CJSJ = ol.proj.fromLonLat([120.6640,24.1448]);
const FFN = ol.proj.fromLonLat([120.6643,24.1507]);
const FBT = ol.proj.fromLonLat([120.6524,24.1599]);
const HYTD = ol.proj.fromLonLat([120.6766,24.1641]);
const AB = ol.proj.fromLonLat([120.6612,24.1250]);
const STSUTD = ol.proj.fromLonLat([120.6588,24.1250]);

function GoInitView(){ view.animate({center:initCenter, zoom:14, duration:1200}); }
function PanToCJSJ(){ view.animate({center:CJSJ, duration:1200}); }
function PanToFFN(){ view.animate({center:FFN, duration:1200}); }
function PanToFBT(){ view.animate({center:FBT, duration:1200}); }
function PanToHYTD(){ view.animate({center:HYTD, duration:1200}); }
function PanToAB(){ view.animate({center:AB, duration:1200}); }
function PanToSTSUTD(){ view.animate({center:STSUTD, duration:1200}); }

/* ===== 新增功能 ===== */
// 量測工具
let draw;
const measureSource = new ol.source.Vector();
const measureLayer = new ol.layer.Vector({ source: measureSource });
map.addLayer(measureLayer);
function addMeasure(type){
  map.removeInteraction(draw);
  draw = new ol.interaction.Draw({ source: measureSource, type:type });
  map.addInteraction(draw);
}

// 點擊顯示座標
map.on('singleclick', function(evt){
  const c = ol.proj.toLonLat(evt.coordinate);
  alert(`經度：${c[0].toFixed(6)}\n緯度：${c[1].toFixed(6)}`);
});

// 輸入經緯度定位
function goToCoord(){
  const lon=parseFloat(document.getElementById("lon").value);
  const lat=parseFloat(document.getElementById("lat").value);
  if(isNaN(lon)||isNaN(lat)){ alert("請輸入正確的經緯度"); return; }
  view.animate({center:ol.proj.fromLonLat([lon,lat]), zoom:16, duration:1200});
}

// 底圖透明度
function setOpacity(val){
  raster.setOpacity(val);
}
