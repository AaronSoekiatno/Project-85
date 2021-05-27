import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,TextInput, Alert} from 'react-native';
import * as firebase from 'firebase';
import MyHeader from '../components/MyHeader'
import db from '../config';

export default class ExchangeScreen extends React.Component {
constructor(){
    super();
    this.state={
        itemName:'',
        description:'',
        userName:'',
        exchangeID:''
    }
}

createUniqueId(){
   return Math.random().toString(36).substring(7)
}

addItem=(itemName,description,)=>{
    var userName = this.state.userName;
    var exchangeId = this.createUniqueId();
    db.collection("exchange_requests").add({
        "username": userName,
        "item_name":itemName,
        "description":description,
        "request_id":exchangeId
    })
    this.setState({
        itemName:'',
        description:'',
        exchangeID:exchangeId
    })

    return Alert.alert(
        'Item ready to exchange',
        '',
        [
            {text: 'OK', onPress:()=>{
                this.props.navigation.navigate('HomeScreen')
            }}
        ]
    );
}
    render(){
        return(
            <View style={styles.container}>
                <Text style={{fontSize:32,}}>Add Item</Text>
                <TextInput
                style={styles.txtInput}
                placeholder="Item Name"
                onChangeText={(text)=>{
                    this.setState({
                        itemName:text
                    })
                }}/>

                <TextInput
                style={styles.txtInput}
                placeholder="Description"
                onChangeText={(text)=>{
                    this.setState({
                        description:text
                    })
                }}/>

            <TouchableOpacity       
            style={styles.btn}
            onPress={()=>{this.addItem(this.state.itemName,this.state.desc)}}>
            <Text style={{color:'ffff',fontSize:'18',fontWeight:'bold'}}>Add Item</Text>
            </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn:{
        width:200,
        height:100,
        borderRadius:50,
        alignItems: 'center',
        marginTop:10,
        backgroundColor: 'orange',
    },
    txtInput:{
        borderWidth:1.5,
        marginTop:5,
        borderColor:'orange'
    },
    scroll:{
        flex:1,
        backgroundColor: 'peach',
        textAlign: 'center',
    },
  });