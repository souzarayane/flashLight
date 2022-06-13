import  React, {useState, useEffect} from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

// You can import from local files
import AssetExample from './components/AssetExample';

export default function App() {
  const [toggle, setToggle] = useState(false);
  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() =>{
  //Liga flash do celular
   Torch.switchState(toggle);
  },[toggle]);

  useEffect(() => {
    //Quando o celular for chacoalhado, mudaremos o toggle
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });
    //Essa função vai ser chamada quando o components for desmontado
    return () => subscription.remove();
  }, []);
  

  return (
    <View style={toggle ? style.containerLight : style.container}>
      <TouchableOpacity onPress= {handleChangeToggle}>
        <Image 
          style={toggle ? style.ligthingOn : style.ligthingOff}
          source={
            toggle
            ? require('./assets/eco-light.png')
            : require('./assets/eco-light-off.png')
            }/>
        <Image 
          style={style.dioLogo}
          source={
            toggle
            ? require('./assets/logo-dio.png')
            : require('./assets/logo-dio-white.png')
            }/>    
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#fff'
  },
  containerLight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  ligthingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
    ligthingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: '#fff',
    width: 150,
    height: 150,
  },
    dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
});
