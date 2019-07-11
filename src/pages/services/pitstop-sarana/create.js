import React, {Component} from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Container, Content, Card, Item, Input, Label, Picker, Icon, Toast} from 'native-base';
import { Button } from 'react-native-elements';
import ServicePitstopSarana from '../../../services/pitstop-sarana';
import InputFloatingLabelWithValidation from '../../../components/input/FloatingLabelWithValidation'
import DateFloatingLabelWithValidation from '../../../components/input/DateFloatingLabelWithValidation'

export default class Create extends Component {

	static navigationOptions = ({ navigation }) => {
    // return {
    //   headerLeft: (
    //     <TouchableHighlight onPress={() => navigation.openDrawer() }>
    //       <View style={{marginLeft: 15}}>
    //         <Icon name="ios-menu" size={28} style={{ color:'white' }}/>
    //       </View>
    //     </TouchableHighlight>
    //   ),
    // }
  };

  constructor(props) {
    super(props);

    this.state = {
      line: 'line 1',
      driver: '',
      fuelman: '',
      tanggal: '',
      shift: 'siang',
      whs_number: '',
      location:'',

      validation: {
        driver: '',
        fuelman: '',
      }
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <KeyboardAvoidingView behavior="padding">
            <Card style={{marginLeft:5, marginRight:5}}>
              <View style={{flex:1}}>
                <View style={{margin:5}}>
                  <Text>
                    TAB - SUB TAB
                  </Text>
                </View>
                <View style={{borderBottomWidth:1, borderBottomColor:'#ccc'}}></View>
								<View style={{paddingVertical:5, paddingHorizontal:7}}>
									<Text style={{fontSize:18, fontWeight:'bold'}}>Pitstop Sarana</Text>
									<Text style={{fontSize:16, fontWeight:'bold'}}>Line 1</Text>
								</View>
							</View>
						</Card>

						<Card style={{marginLeft:5, marginRight:5}}>
              <View style={{flex:1}}>
								<View style={{margin:5}}>
                  <Text>
										SERVICES
                  </Text>
                </View>
                <View style={{borderBottomWidth:1, borderBottomColor:'#ccc'}}></View>
                <View style={{marginTop:10, marginHorizontal:6}}>

                  <InputFloatingLabelWithValidation title='Driver' onChangeText={(driver) => this.setState({driver})} error={this.state.validation.driver} />
                  <InputFloatingLabelWithValidation title='Fuelman' onChangeText={(fuelman) => this.setState({fuelman})} error={this.state.validation.fuelman} />
                  <DateFloatingLabelWithValidation title='Tanggal' setDefaultValue onSelected={(tanggal) => this.setState({tanggal})} error={this.state.validation.tanggal} />

                  <View style={{marginBottom:7}}>
                    <Item>
											<View style={{flex:1, flexDirection:'column'}}>
                        <Label style={{fontSize:12}}>Shift</Label>
                        <Picker
                          mode="dropdown"
                          iosIcon={<Icon name="arrow-down" />}
                          placeholder="Pilih Shift"
                          placeholderStyle={{ color: "#bfc6ea" }}
                          placeholderIconColor="#007aff"
                          style={{ width: undefined }}
                          selectedValue={this.state.shift}
                          onValueChange={(shift) => this.setState({shift})}
                        >
                          <Picker.Item label="Siang (07:00 - 17:00)" value="siang" />
                          <Picker.Item label="Malam (17:00 - 07:00)" value="malam" />
                        </Picker>
                      </View>
                    </Item>
                  </View>
                </View>
              </View>
            </Card>

						<Card style={{marginLeft:5, marginRight:5}}>
              <View style={{flex:1}}>
								<View style={{margin:5}}>
                  <Text>
										LOG SHEET FUEL
                  </Text>
                </View>
                <View style={{borderBottomWidth:1, borderBottomColor:'#ccc'}}></View>
                <View style={{marginTop:10, marginHorizontal:6}}>
                  <InputFloatingLabelWithValidation title='WHS Number' onChangeText={(whs_number) => this.setState({whs_number})} error={this.state.validation.whs_number} />
                  <InputFloatingLabelWithValidation title='Location' onChangeText={(location) => this.setState({location})} error={this.state.validation.location} />
                </View>
              </View>
            </Card>

            <View style={{flex:1, height:100, marginHorizontal:5}}>
              <Button onPress={() => this.post()} title='Simpan'></Button>
            </View>
          </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }

  post = () => {
    this.setState({
      validation: {}
    })
    
    const formData = {
      line: this.state.line,
      driver: this.state.driver,
      fuelman: this.state.fuelman,
      tanggal: this.state.tanggal,
      shift: this.state.shift,
      whs_number: this.state.whs_number,
      lokasi: this.state.location,
    } 

    ServicePitstopSarana.storeService(formData)
      .then(res => {
        if(res.success) {
          Toast.show({
            text: 'Berhasil menyimpan service pitstop sarana!',
            buttonText: 'Okay',
            type:'success'
          })
          this.props.navigation.navigate('ServicePitstopSaranaIndex')
        }
      })
      .catch(err => {
        const validationMessage = err.response.data.errors;
        this.setState({
          validation: {
            driver: validationMessage.driver,
            fuelman: validationMessage.fuelman
          }
        })
        Toast.show({
          text: 'Gagal menyimpan service pitstop sarana!',
          buttonText: 'Coba Lagi',
          type:'danger'
        })
      });
  }
}