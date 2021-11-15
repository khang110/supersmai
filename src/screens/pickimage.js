import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import { ImageBrowser } from 'expo-image-picker-multiple';

function PickerImage(props) {
  const _getHeaderLoader = () => (
    <ActivityIndicator size='small' color={'#FFF'} style={styles.loading} />
  );

  const imagesCallback = (callback) => {
    const { navigation, dispatch } = props;
    props.navigation.setOptions({
      headerRight: () => _getHeaderLoader()
    });

    callback.then(async (photos) => {
      const data = [];
      for (let photo of photos) {
        const pPhoto = await _processImageAsync(photo.uri);
        data.push({
          uri: pPhoto.uri,
          name: photo.filename,
          type: 'image/jpg'
        })
      }
      dispatch({ type: 'GET_IMG', image: data })
      navigation.pop();
    })
      .catch((e) => console.log(e));
  };

  const _processImageAsync = async (uri) => {
    const file = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1000 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );
    return file;
  };

  const _renderDoneButton = (count, onSubmit) => {
    if (!count) return null;
    return <TouchableOpacity onPress={onSubmit} style={styles.wrap_btn_xong}>
      <Text onPress={onSubmit} style={{ color: 'white', fontSize: 18 }}>Xong</Text>
    </TouchableOpacity>
  }

  const updateHandler = (count, onSubmit) => {
    props.navigation.setOptions({
      title: `Đã chọn ${count} ảnh`,
      headerRight: () => _renderDoneButton(count, onSubmit)
    });
  };

  const renderSelectedComponent = (number) => (
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeText}>{number}</Text>
    </View>
  );

  const emptyStayComponent = <Text style={styles.emptyStay}>Empty =(</Text>;
  const noCameraPermissionComponent = <Text style={styles.emptyStay}>Không truy cập được vào thư viện ảnh</Text>;
  return (
    <View style={[styles.flex, styles.container]}>
      <ImageBrowser
        max={5}
        onChange={updateHandler}
        callback={imagesCallback}
        renderSelectedComponent={renderSelectedComponent}
        emptyStayComponent={emptyStayComponent}
        noCameraPermissionComponent={noCameraPermissionComponent}
        loadCompleteMetadata={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    position: 'relative'
  },
  emptyStay: {
    textAlign: 'center',
  },
  countBadge: {
    width: 30,
    height: 30,
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: 'absolute',
    right: 3,
    bottom: 3,
    justifyContent: 'center',
    backgroundColor: '#0580FF'
  },
  countBadgeText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 'auto',
    color: '#ffffff'
  },
  wrap_btn_xong: {
    paddingRight: 10
  },
  loading: {
    marginRight: 10
  }
});

export default connect(function (state) {
  return { infoPost: state.infoPost }
})(PickerImage);