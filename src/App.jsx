import { useEffect } from 'react'

import { useGeoLocation } from './hooks/useGeolocation'
import './App.css'

const { kakao } = window;

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
}

function App() {
  const { location } = useGeoLocation(geolocationOptions);

  useEffect(() => {
    if (!location) return;

    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(location.latitude, location.longitude),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
    const message = '<div style="padding:5px;">여기에 계신가요?!</div>';
    // displayMarker(map, message, kakao);
    let marker = new kakao.maps.Marker({  
      map: map, 
      position: options.center
    });
    let iwContent = message, // 인포윈도우에 표시할 내용
      iwRemoveable = true;

    // 인포윈도우를 생성합니다
    let infowindow = new kakao.maps.InfoWindow({
        content : iwContent,
        removable : iwRemoveable
    });
    
    // 인포윈도우를 마커위에 표시합니다 
    infowindow.open(map, marker);
    
    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(options.center);      

  }, [location])

  return (
    <div id='map' style={{width: '500px', height: '500px'}}></div>
  )
}

export default App
