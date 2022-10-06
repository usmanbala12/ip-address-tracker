import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Loader from './components/Loader';
import arrow from './images/icon-arrow.svg'

function App() {
  const [userIp, setUserIp] = useState('')
  const [ipData, setIpData] = useState(null)

  const getIpData = (ipaddress) => {
    axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_81xOuSrkn61i3MimHRwHMitxYO70Z&ipAddress=${ipaddress}`).then(res => {
      setIpData(res.data)
    })
  }

  useEffect(() => {
    axios.get('https://geo.ipify.org/api/v2/country,city?apiKey=at_81xOuSrkn61i3MimHRwHMitxYO70Z').then(res => setIpData(res.data))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    getIpData(userIp)
    console.log(ipData)
  }

  const MapRenderer = ({lat, lng}) => {
    return(
      <MapContainer center={[lat, lng]} zoom={13}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
        <Marker position={[lat, lng]}>
          <Popup>Ip is here</Popup>
        </Marker>
      </MapContainer>
    )
  }
  

  return (
    <div>
      {ipData === null ? 
          <Loader />
              : 
          <div>
                <div className='header'>
        <span className='header-title'>IP Address Tracker</span>
        <form onSubmit={handleSubmit}>
          <input placeholder='search for any ip address or domain' name='ip-input' onChange={({target}) => setUserIp(target.value)} value={userIp}/>
          <button className='submit'><img src={arrow} alt='arrow'/></button>
        </form>
        <div className='ip-details'>
          <div className='ipaddress'>
            <span className='head'>
              IP Address
            </span>
            <span className='info'>
            {ipData ? ipData.ip : ''}
            </span> 
          </div>
          <div className='location'>
            <span className='head'>
              Location
            </span>
            <span className='info'>
            {ipData ? ipData.location.region : ''}
            </span>
          </div>
          <div className='timezone'>
          <span className='head'>
              Timezone
            </span>
            <span className='info'>
            GMT {ipData ? ipData.location.timezone : ''}
            </span>
          </div>
          <div className='isp'>
            <span className='head'>
              isp
            </span>
            <span className='info'>
              {ipData ? ipData.isp : ''}
            </span>
          </div>
        </div>
      </div>
      <div className='map-wrap'>
        {ipData === null ? 
          <Loader />
              : 
          <MapRenderer lat={ipData.location.lat} lng={ipData.location.lng}/>
        }
      </div>
          </div>
        }
    </div>
  );
}

export default App;
