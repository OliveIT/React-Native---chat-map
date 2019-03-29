'use strict';
import React, { PureComponent } from 'react';
import { Text, View, Dimensions, Platform, Image, TouchableOpacity, PermissionsAndroid, StatusBar, TextInput, Alert, Button, Animated, ListView, Keyboard } from 'react-native';
import { Container, Col, Row } from 'native-base';
import { RNCamera } from 'react-native-camera';
import * as Progress from 'react-native-progress';
import RNThumbnail from 'react-native-thumbnail';
import { Actions } from 'react-native-router-flux';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import styles from './styles';
import firebase from '../firebase/';
import { COLORS, ICONS } from '../../constants';
import { getFilePathExtension } from '../../utils/converter';
import PreviewVideo from '../commons/PreviewVideo';
import NbIcon from '../commons/NbIcon';
import Modal from '../Modal';
// import Loading from '../commons/Loading';
import LocationManager from '../../services/LocationManager';

const AnimatedProgressCircle = Animated.createAnimatedComponent(Progress.Circle);
const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
const storage = firebase.storage();
const MAX_VIDEO_DURATION = 30; // in seconds

class RecordVedioView extends React.PureComponent {
  recordingProgress = new Animated.Value(0);
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.camera = null;

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        barCodeTypes: [
          RNCamera.Constants.BarCodeType.aztec,
          RNCamera.Constants.BarCodeType.code128,
          RNCamera.Constants.BarCodeType.code39,
          RNCamera.Constants.BarCodeType.code39mod43,
          RNCamera.Constants.BarCodeType.code93,
          RNCamera.Constants.BarCodeType.ean13,
          RNCamera.Constants.BarCodeType.ean8,
          RNCamera.Constants.BarCodeType.pdf417,
          RNCamera.Constants.BarCodeType.upce,
          RNCamera.Constants.BarCodeType.qr
        ]
      },
      modalVisibleBarcode: false,
      modalVisibleChat: false,
      description: '',
      isRecording: false,
      isStartRefresh: 0,
      percent: 0,
      isDescription: 0,
      isChatIcons: 0,
      isMainView: 1,
      isScanner: false,
      isLike: 0,
      isComment: 0,
      isSetting: 0,
      form: {
        file: null,
        description: '',
        permission: 0,
        sharedWith: 'friends',
        thumbnailUrl: ''
      },
      currentLocation: {},
      modalHeight: 400,
      query: '',
      groupIds: [],
      isLoading: false,
      isCameraPermission: Platform.OS === 'ios' ? true : false,
      detectedBarCodeType: '',
      detectedBarCodeData: '',
      inputValue: '',
      dataSource: ds.cloneWithRows([]),
      hasTransactionEnded: false
    };

    this._handleTextChange = this._handleTextChange.bind(this);
    this._handleDeleteButtonPress = this._handleDeleteButtonPress.bind(this);
  }

  componentDidMount() {
    // this.props.actions.getFriends();
    StatusBar.setHidden(true);
    this.requestCameraPermission();
    if (!this.state.isScanner) Actions.refresh({ hideTabBar: false });
    if (this.state.isScanner) Actions.refresh({ hideTabBar: true });
  }

  // onAddToGroup = id => {
  //   if (!this.state.groupIds.includes(id)) {
  //     this.setState({
  //       groupIds: this.state.groupIds.concat(id)
  //     });
  //   } else {
  //     const index = this.state.groupIds.findIndex(i => i === id);
  //     const { groupIds } = this.state;
  //     delete groupIds[index];
  //     this.setState({ groupIds: groupIds });
  //   }
  // };

  // onSearch() {
  //   const { query } = this.state;
  //   this.props.actions.searchFriends(query);
  // }

  startRecording = () => {
    this.record();
  };

  stopRecording = () => {
    if (this.camera) this.camera.stopRecording();
    this.recordingProgress.setValue(0);
  };

  record = () => {
    if (this.camera) {
      Animated.timing(this.recordingProgress, {
        toValue: 1,
        duration: MAX_VIDEO_DURATION * 1000,
      }).start(() => this.stopRecording());
      this.camera
        .recordAsync({ maxDuration: MAX_VIDEO_DURATION, quality: RNCamera.Constants.VideoQuality["720p"] })
        .then(data => {
          const fileName = `${+new Date()}.${getFilePathExtension(data.uri)}`;
          const file = {
            uri: data.uri,
            name: fileName,
            type: 'multipart/form-data'
          };
          const { form } = {...this.state};
          form.file = file;
          this.setState({
            form: form,
            isStartRefresh: 1
          });
        })
        .catch(err => {
          console.log({ err });
        });
    }
  };

  async requestCameraPermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple(
          [
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
          ],
          {
            title: 'Vediohead app permission',
            message:
              'Vediohead needs access to your camera ' +
              'so you can share your wonderful moments with everyone.'
          }
        );
        if (granted) this.setState({ isCameraPermission: true });
      } catch (err) {
        console.warn(err);
      }
    } else {
      try {
        const iosGranted = true;
        if (iosGranted) this.setState({ isCameraPermission: true });
      } catch(e) {
        console.warn(err);
      }
    }
  }

  switchType = () => {
    const { type } = this.state.camera;
    const { back, front } = RNCamera.Constants.Type;

    this.setState({
      camera: {
        ...this.state.camera,
        type: type === front ? back : front
      }
    });
  };

  get typeIcon() {
    const { type } = this.state.camera;
    const { back } = RNCamera.Constants.Type;

    return (
      <NbIcon
        family={'MaterialCommunityIcons'}
        name={type === back ? 'camera-rear' : 'camera-front'}
        style={{
          color: COLORS.BRIGHT_ORANGE,
          backgroundColor: COLORS.TRANSPARENT,
          fontSize: 28
        }}
      />
    );
  }

  componentWillMount() {
    StatusBar.setHidden(true);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.routes.routeName === 'recordView' && nextProps.routes.routeName !== 'recordView') {
      StatusBar.setHidden(false);
      this.clickRefreshBtn();
    }
    if (this.props.routes.routeName !== 'recordView' && nextProps.routes.routeName === 'recordView') {
      StatusBar.setHidden(true);
    }
  }

  clickRefreshBtn = () => {
    this.setState({
      isChatIcons: 0,
      isDescription: 0,
      isStartRefresh: false,
      percent: 0,
      form: {
        ...this.state.form,
        file: null,
        description: '',
        permission: '',
      },
      isMainView: 1,
      isScanner: false
    });
    this.recordingProgress.setValue(0);
  };

  clickCheckBtn = () => {
    this.setState({ isChatIcons: 1 });
  };

  clickEditBtn = () => {
    this.setState({ isDescription: 1 });
  };

  descriptionInputShow = () => {
    const state = this.state.form.description.length == 0 ? 0 : 1;
    this.setState({ isDescription: state });
  };

  get delayButtons() {
    if (this.state.isStartRefresh == 0) {
      return (
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <View style={styles.buttonSpacing}/>

          <TouchableOpacity
            style={styles.captureButton}
            onPressIn={this.startRecording}
            onPressOut={this.stopRecording}
            activeOpacity={1}
          >
            <AnimatedProgressCircle
              size={80}
              progress={this.recordingProgress}
              indeterminate={false}
              color={COLORS.BRIGHT_ORANGE}
              unfilledColor={COLORS.LIGHT_GREY}
              borderWidth={0}
              showsText={false}
            >
              <View style={styles.recordButtonViewStyle}>
                <NbIcon
                  family={'Ionicons'}
                  name={'md-square'}
                  style={{
                    color: COLORS.RED,
                    fontSize: 50
                  }}
                />
              </View>
            </AnimatedProgressCircle>
          </TouchableOpacity>
        </View>
      );
    } else {
      if (this.state.isChatIcons == 0) {
        return (
          <View style={[styles.overlay, styles.bottomOverlay]}>
            <View style={styles.buttonDelay}>
              <TouchableOpacity
                style={styles.captureButton}
                onPress={this.clickRefreshBtn}
              >
                <View style={styles.borderedButtonFAViewStyle}>
                  <FontAwesome5Pro
                    style={styles.borderedButtonFAStyle}
                    name={'poo'}
                    size={44}
                    color={COLORS.REVERT_BROWN}
                    solid
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.captureButton}
                onPress={this.clickCheckBtn}
              >
                <View style={styles.borderedButtonFAViewStyle}>
                  <FontAwesome5Pro
                    style={styles.borderedButtonFAStyle}
                    name={'smile'}
                    size={44}
                    color={COLORS.UPLOAD_ORANGE}
                    solid
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.clickEditBtn}
                style={styles.captureButton}
              >
                <View style={styles.borderedButtonFAViewStyle}>
                  <FontAwesome5Pro
                    style={styles.borderedButtonFAStyle}
                    name={'pencil-alt'}
                    size={44}
                    color={COLORS.EDIT_BLUE}
                    solid
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    }
  }

  get descriptionInput() {
    if (this.state.isDescription == 1) {
      return (
        <View style={styles.captionViewStyle}>
          <TextInput
            style={styles.captionInputStyle}
            ref="description"
            keyboardType="default"
            autoFocus={true}
            maxLength={30}
            autoCorrect={true}
            placeholder=""
            onEndEditing={this.descriptionInputShow}
            onChangeText={description => {
              const { form } = this.state;
              form.description = description;
              this.setState({ form: form });
            }}
            returnKeyType={'done'}
            underlineColorAndroid={COLORS.TRANSPARENT}
          />
        </View>
      );
    }
  }

  onActionTaken = async (permission, sharedWith) => {
    this.setState({ isLoading: true });
    await LocationManager.start();
    try {
      const {latitude, longitude} = await LocationManager.getCurrentLocation();
      const thumbnail = await this.generateThumbnail(this.state.form.file.uri);
      const userIds = this.state.groupIds;
      let options = {};
      if (userIds.length > 0) {
        options = {
          room_name: `vedio share ${+new Date()}`,
          user_ids: userIds,
          thumbUrl: thumbnail.downloadUrl || thumbnail.downloadURL
        };
      }
      const {
        form,
      } = {...this.state};
      const {
        description,
        file,
      } = form;
      this.uploadVideo(file, {
        description,
        permission,
        lat: latitude,
        lon: longitude,
        sharedWith,
        thumbnailUrl: thumbnail.downloadUrl || thumbnail.downloadURL,
      }, options);
    }
    catch(e) {
      console.log({ error: e });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };
  uploadVideo(file, data, options) {
    this.props.actions.onUploadVideo(
      this.props.user.userID,
      file,
      data,
      options,
    );
  }
  async generateThumbnail(videoUrl) {
    const result = await RNThumbnail.get(videoUrl);
    const thumbPath = result.path;
    const time = +new Date();
    const ext1 = getFilePathExtension(thumbPath);
    const fileName1 = `${this.props.user.username}_${time}.${ext1}`;
    const newFilePath = `/thumbs/${fileName1}`;
    return await storage
      .ref(newFilePath)
      .putFile(thumbPath, {contentType: `image/${ext1}`})
  }

  get delayChatIcons() {
    if (this.state.isChatIcons == 1 && this.props.uploadDone) {
      return (
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text
              style={{
                color: COLORS.BRIGHT_ORANGE,
                fontFamily: 'avenir',
                fontSize: 16
              }}
            >
              social
            </Text>
          </View>
          <View style={styles.buttonDelay}>
            {/*
            <TouchableOpacity
              style={styles.chatIcon}
              onPress={this.clickChatIcon}
              underlayColor={COLORS.TRANSPARENT}
            >
              <View>
                <Text style={styles.textStyle}>chat</Text>
                <Image
                  style={styles.buttonStyle}
                  source={ICONS.CHAT_ICON}
                />
              </View>
            </TouchableOpacity>
            */}
            <TouchableOpacity
              style={styles.chatIcon}
              onPress={this.onActionTaken.bind(this, 0, 'friends')}
            >
              <FontAwesome5Pro
                style={styles.buttonFAStyle}
                name={'user-secret'}
                size={44}
                color={COLORS.BRIGHT_ORANGE}
                light
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.chatIcon}
              onPress={this.onActionTaken.bind(this, 0, 'everyone')}
            >
              <FontAwesome5Pro
                style={styles.buttonFAStyle}
                name={'users'}
                size={44}
                color={COLORS.BRIGHT_ORANGE}
                light
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  // setModalVisibleChat(visible) {
  //   this.setState({ modalVisibleChat: visible });
  // }

  // clickChatIcon = () => {
  //   this.setModalVisibleChat(true);
  //   this.props.actions.getFriends();
  // };

  // onCompleteAction = (options = {}) => {
  //   const {
  //     form,
  //     currentLocation
  //   } = {...this.state};
  //   const {
  //     description,
  //     file,
  //     permission,
  //     sharedWith,
  //     thumbnailUrl
  //   } = form;
  //   this.props.actions.onUploadVideo(
  //     this.props.user.userID,
  //     file,
  //     {
  //       description,
  //       permission,
  //       lat: currentLocation.coords ? currentLocation.coords.latitude : '',
  //       lon: currentLocation.coords ? currentLocation.coords.longitude : '',
  //       sharedWith,
  //       thumbnailUrl
  //     },
  //     options,
  //   );
  //   this.setState({ isLoading: false });
  // };

  // onSharedInChat = async (userIds = []) => {
  //   const self = this;
  //   const { form } = {...this.state};
  //
  //   RNThumbnail.get(form.file.uri).then(result => {
  //     const thumbPath = result.path;
  //     const time = +new Date();
  //     const ext1 = getFilePathExtension(thumbPath);
  //     const fileName1 = `${self.props.user.username}_${time}.${ext1}`;
  //     const newFilePath = `/thumbs/${fileName1}`;
  //
  //     storage
  //       .ref(newFilePath)
  //       .putFile(thumbPath, { contentType: `image/${ext1}` })
  //       .then(uploadedFile => {
  //         let options = {};
  //         if (userIds.length > 0) {
  //           options = {
  //             room_name: `vedio share ${+new Date()}`,
  //             user_ids: userIds,
  //             thumbUrl: uploadedFile.downloadUrl
  //           };
  //         }
  //         form.thumbnailUrl = uploadedFile.downloadUrl;
  //         self.setState({ form: form }, () => {
  //           self.onCompleteAction(options);
  //         });
  //       })
  //       .catch(err => {
  //         self.setState({ isLoading: false });
  //         alert(err.message);
  //       });
  //   });
  // };

  activateScanner = () => {
    this.setState({
      isScanner: true,
      detectedBarCodeType: '',
      detectedBarCodeData: '',
      hasTransactionEnded: false
    });
    Actions.refresh({ hideTabBar: true });
  };

  deactivateScanner = () => {
    this.setState({
      modalVisibleBarcode: false,
      isScanner: false,
      detectedBarCodeType: '',
      detectedBarCodeData: '',
      hasTransactionEnded: false
    });
    Actions.refresh({ hideTabBar: false });
  };

  onBarCodeRead = (code) => {
    this.setState({
      detectedBarCodeType: code.type,
      detectedBarCodeData: code.data
    });
  };

  setModalVisibleBarcode(visible) {
    this.setState({ modalVisibleBarcode: visible });
  }

  _handleTextChange = () => {
    const displayDetectedBarcode = `Type: ${this.state.detectedBarCodeType}\nCode: ${this.state.detectedBarCodeData}`;
    this.setState(() => ({
      inputValue: displayDetectedBarcode
    }));
  };

  _handleRescanButtonPress = () => {
    this.setState({
      detectedBarCodeType: '',
      detectedBarCodeData: ''
    });
    this.setModalVisibleBarcode(!this.state.modalVisibleBarcode);
  };

  _handleSendButtonPress = () => {
    if (!this.state.inputValue) {
      return;
    }
    const displayDetectedBarcode = `Type: ${this.state.detectedBarCodeType}\nCode: ${this.state.detectedBarCodeData}`;
    const textArray = this.state.dataSource._dataBlob.s1;
    textArray.push(this.state.inputValue);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(textArray),
      inputValue: '',
      detectedBarCodeType: '',
      detectedBarCodeData: ''
    });
    this.setModalVisibleBarcode(!this.state.modalVisibleBarcode);
  };

  _handleDeleteButtonPress = (id) => {
    this.setState((a) => {
      const newItem = a.dataSource._dataBlob.s1.filter((item, i) => (parseInt(id) !== i));
      return {
        dataSource: this.state.dataSource.cloneWithRows(newItem),
      }
    });
  };

  renderBarcodeEntryRow = (rowData, sectionID, rowID) => {
    const handleDelete = () => {
      return this._handleDeleteButtonPress(rowID);
    }
    return (
      <View style={styles.todoItem}>
        <Row>
          <Col
            style={{
              justifyContent: 'center',
              paddingLeft: 14,
              width: '86%'
            }}
          >
            <Text style={styles.todoText}>
              {rowData}
            </Text>
          </Col>
          <Col
            style={{
              justifyContent: 'center',
              width: '14%'
            }}
          >
            <Button
              color={COLORS.WHITE}
              title="X"
              onPress={handleDelete}
            />
          </Col>
        </Row>
      </View>
    );
  };

  renderEndTransactionRow = () => {
    if (this.state.dataSource.getRowCount() === 0) {
      return null;
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            this.setState({
              hasTransactionEnded: true
            });
          }}
        >
          <View
            style={{
              alignSelf: 'center',
              backgroundColor: COLORS.BRIGHT_ORANGE,
              // opacity: 1,
              borderRadius: deviceHeight * 0.05,
              width: deviceWidth / 1.28,
              height: deviceHeight * 0.05,
              marginBottom: 10
            }}
          >
            <Row
              style={{
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={styles.barcodeDetectionTextStyle}>
                end transaction
              </Text>
            </Row>
          </View>
        </TouchableOpacity>
      );
    }
  };

  get scannerView() {
    if (this.state.isScanner) {
      const displayDetectedBarcode = `Type: ${this.state.detectedBarCodeType}\nCode: ${this.state.detectedBarCodeData}`;
      let barcodeLines = 0;
      return (
        <View style={[styles.overlay, styles.scanViewOverlayTop]}>
          <Row style={{ height: 40, width: deviceWidth }}>
            <Col
              style={{
                marginTop: 15,
                marginLeft: 15,
                justifyContent: 'center'
              }}
            >
              <TouchableOpacity
                style={styles.typeButton}
                onPress={this.deactivateScanner}
              >
                <NbIcon
                  family={'Ionicons'}
                  name={'ios-close'}
                  style={{
                    color: COLORS.BRIGHT_ORANGE,
                    backgroundColor: COLORS.TRANSPARENT,
                    fontSize: 46,
                    top: -5
                  }}
                />
              </TouchableOpacity>
            </Col>

            <Col
              style={{
                marginTop: 5,
                marginRight: 15,
                paddingRight: deviceWidth * 0.5,
              }}
            >
              <Row style={styles.barcodeDataViewStyle}>
                <Text style={styles.barcodeDetectionTextStyle}>
                  {this.state.detectedBarCodeData !== ''
                    ? 'barcode detected!'
                    : 'no barcode detected'
                  }
                </Text>
              </Row>
            </Col>
          </Row>

          <Row style={{ justifyContent: 'space-around' }}>
            <Container
              style={{
                marginTop: 10,
                justifyContent: 'flex-start',
                height: deviceHeight * 0.188
              }}
            >
              <ListView
                dataSource={this.state.dataSource}
                enableEmptySections={true}
                renderRow={this.renderBarcodeEntryRow.bind(this)}
                renderFooter={this.renderEndTransactionRow}
              />
            </Container>
          </Row>

          {this.state.hasTransactionEnded ? (
            <Row style={[styles.overlay, {
              bottom: -deviceHeight / 1.82,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }]}>
              <TouchableOpacity>
                <View style={styles.receiptViewStyle}>
                  <FontAwesome5Pro
                    name="receipt"
                    size={36}
                    color={COLORS.BRIGHT_ORANGE}
                    light
                  />
                </View>
              </TouchableOpacity>
            </Row>
          ) : null}

          <Modal
            animationType={'fade'}
            transparent={true}
            visible={this.state.detectedBarCodeData !== ''}
            onRequestClose={() => {}}
          >
            <TouchableOpacity
              onPress={Keyboard.dismiss}
              accessible={false}
              activeOpacity={1}
            >
              <Container style={styles.formView}>
                <Row
                  style={{
                    backgroundColor: COLORS.TRANSPARENT,
                    flex: 1,
                    marginTop: 5
                  }}
                >
                  <TextInput
                    style={styles.inputForm}
                    value={this.state.inputValue}
                    onChangeText={this._handleTextChange}
                    placeholder={displayDetectedBarcode}
                    multiline={true}
                    numberOfLines={barcodeLines}
                    // onChange={(e) => {
                    //   barcodeLines = e.nativeEvent.contentSize.height / 18;
                    // }}
                  />
                </Row>
                <Row style={{ flex: 1 }}>
                  <Col
                    style={{
                      justifyContent: 'center',
                      width: '50%'
                    }}
                  >
                    <Button
                      title="Re-scan"
                      onPress={this._handleRescanButtonPress}
                    />
                  </Col>
                  <Col
                    style={{
                      justifyContent: 'center',
                      width: '50%'
                    }}
                  >
                    <Button
                      color={COLORS.LIGHT_GREEN}
                      title="Add scan"
                      onPress={this._handleSendButtonPress}
                    />
                  </Col>
                </Row>
              </Container>
            </TouchableOpacity>
          </Modal>
        </View>
      );
    }
  }

  componentWillUnmount() {
    this.camera = null;
    this.setState({
      isMainView: 1,
      isScanner: false,
      isLoading: false,
      modalVisibleBarcode: false,
      detectedBarCodeType: '',
      detectedBarCodeData: ''
    });
    StatusBar.setHidden(false);
  }

  render() {
    const {
      camera,
      form,
      isRecording,
      isScanner,
      isStartRefresh,
      isLoading,
      modalVisibleChat
    } = this.state;
    const opacity = this.recordingProgress.interpolate({
      inputRange: [0, 0.001, 1],
      outputRange: [1, 0, 0],
    });

    return (
      <Container>
        <View style={styles.squareContainer}>
          {isStartRefresh ? <PreviewVideo file={form.file}/> :
            <View
              style={{
                backgroundColor: COLORS.BLACK,
                height: deviceHeight
              }}
            >
              {this.state.isCameraPermission ? (
                <RNCamera
                  permissionDialogTitle={'Camera & Microphone required'}
                  permissionDialogMessage={'You need to authorize the app if you want to record an awesome vedio'}
                  ref={cam => {
                    this.camera = cam;
                  }}
                  type={camera.type}
                  style={styles.preview}
                  onFocusChanged={() => {}}
                  onZoomChanged={() => {}}
                  defaultTouchToFocus
                  captureAudio={!isScanner ? true : false}
                  barCodeTypes={camera.barCodeTypes}
                  onBarCodeRead={this.onBarCodeRead}
                />
              ) : (
                <View style={styles.preview}/>
              )}

              {(!isScanner) && (
                <Animated.View style={[styles.overlay, { opacity }]}>
                  <View style={styles.recordViewOverlayIconToggle}>
                    <Row style={{ paddingBottom: 8 }}>
                      <TouchableOpacity
                        style={styles.typeButton}
                        onPress={this.switchType}
                      >
                        {this.typeIcon}
                      </TouchableOpacity>
                    </Row>

                    <Row>
                      <TouchableOpacity
                        style={styles.typeButton}
                        onPress={this.activateScanner}
                      >
                        <FontAwesome5Pro
                          name="scanner-touchscreen"
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.TRANSPARENT
                          }}
                          size={25}
                          color={COLORS.BRIGHT_ORANGE}
                        />
                      </TouchableOpacity>
                    </Row>
                  </View>
                </Animated.View>
              )}
            </View>
          }

          {!isScanner && this.delayChatIcons}
          {!isScanner && this.descriptionInput}
          {!isScanner && this.delayButtons}
          {isScanner && this.scannerView}

          {/*
          <Modal
            animationType={'fade'}
            transparent={true}
            visible={modalVisibleChat}
            onRequestClose={() => {}}
          >
            <Container style={styles.friendModalContainerStyle}>
              <View
                onLayout={e => {
                  this.setState({
                    modalHeight: e.nativeEvent.layout.height
                  });
                }}
                style={{ flex: 1 }}
              >
                <View style={styles.friendModalHeadingTextViewStyle}>
                  <Text style={styles.friendModalHeadingTextStyle}>
                    who do you want to chat with?
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 20,
                    margin: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: this.state.modalHeight - 100
                  }}
                >
                  <Friends
                    data={this.props.searchResult}
                    query={this.state.query}
                    onSelect={this.onAddToGroup}
                    selected={this.state.groupIds}
                    onChange={value => {
                      this.setState({ query: value });
                      setTimeout(() => {
                        this.onSearch();
                      }, 200);
                    }}
                  />
                </View>

                {this.props.searchResult.size > 0 && (
                  <View
                    style={{
                      position: 'absolute',
                      bottom: -5,
                      alignItems: 'center',
                      flex: 1,
                      width: deviceWidth - 70
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 20,
                        paddingBottom: 20,
                        alignItems: 'center'
                      }}
                      underlayColor={COLORS.TRANSPARENT}
                      onPress={() => {
                        if (this.state.groupIds.length > 0) {
                          form.sharedWith = 'private_chat';
                          this.setState({
                            form: form,
                            groupIds: []
                          });
                          this.onSharedInChat(this.state.groupIds);
                          this.setModalVisibleChat(!modalVisibleChat);
                          return;
                        }
                      }}
                    >
                      <NbIcon
                        family={'Ionicons'}
                        name={'md-checkmark'}
                        style={{
                          color: COLORS.GREEN,
                          fontSize: 44
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </Container>

            <View
              style={{
                position: 'absolute',
                top: deviceHeight / 9 - 15,
                right: 16,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.WHITE,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: 'rgba(52, 52, 52, 0.2)'
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisibleChat(!modalVisibleChat);
                }}
              >
                <Image
                  style={{
                    alignSelf: 'flex-end',
                    backgroundColor: COLORS.TRANSPARENT,
                    borderRadius: 15,
                    borderWidth: 3,
                    borderColor: COLORS.WHITE,
                    width: 30,
                    height: 30
                  }}
                  source={ICONS.REMOVE_ICON}
                />
              </TouchableOpacity>
            </View>
          </Modal>
          */}

          <Modal
            visible={this.state.isLoading || !this.props.uploadDone}
          >
            <View style={styles.successModal}>
              <View style={styles.innerBox}>
                <Image
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    backgroundColor: COLORS.TRANSPARENT,
                    width: 40,
                    height: 40,
                    marginBottom: 10
                  }}
                  source={ICONS.LOADING_ICON}
                />
                <Text
                  style={{
                    color: 'white',
                    marginHorizontal: 20
                  }}
                >
                  {`you've successfully uploaded your vedio. please wait a moment.`}
                </Text>
              </View>
            </View>
          </Modal>

          {/*
          {this.state.isLoading || (this.props.isFetching && <Loading />)}
          */}
        </View>
      </Container>
    );
  }
}

export default RecordVedioView;
