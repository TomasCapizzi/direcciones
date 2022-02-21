import * as ImagePicker from 'react-native-image-picker';

import {
  Button,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import React, {useState} from 'react';

import {COLORS} from '../../constants';
import {launchCamera} from 'react-native-image-picker';

const ImageSelector = ({onImage}) => {
  //  const [pickedUri, setPickedUri] = useState();
  const [pickerResponse, setPickerResponse] = useState();
  const IS_IOS = Platform.OS === 'ios';
  /*
  const verifyPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'DIRECCIONES Camera Permission',
          message: 'DIRECCIONES App needs access to your camara',
          buttonNeutral: 'Ask me later',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  };
  */
  /*
  const handleTakeImage = async () => {
    const isCaemraOk = await verifyPermission();
    if (!isCaemraOk) {return;}
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, response => {
      setPickedUri(response.assets[0].uri);
      console.warn(response.assets[0].uri);
      //props.onImage(response.assets[0].uri)
    });
  };
  */

  const handleTakePicture = async () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    let granted;
    if (IS_IOS) {
      granted = await request(PERMISSIONS.IOS.CAMERA);
    } else {
      granted = await request(PERMISSIONS.ANDROID.CAMERA);
    }
    if (granted === RESULTS.GRANTED) {
      launchCamera(options, res => {
        if (!res.didCancel && !res.error) {
          setPickerResponse(res.assets[0]);
          onImage && onImage(res.assets[0].uri);
        }
      });
    } else {
      console.warn('Permission denied');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {!pickerResponse ? (
          <Text>No hay imagen seleccionada</Text>
        ) : (
          <Image style={styles.image} source={{uri: pickerResponse.uri}} />
        )}
      </View>
      <Button
        title="Tomar foto"
        color={COLORS.MAROON}
        onPress={handleTakePicture}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
export default ImageSelector;
