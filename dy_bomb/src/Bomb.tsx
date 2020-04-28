import React from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';


function NewButton({title, isBomb}) {
    let txt = isBomb?"🙀💥Bomb💥🙀":"It's ok"

    return (
        <Button
            onPress={() => Alert.alert(txt)}
            title={title}
            style={styles.button}
        />
    )

}


export default function Bomb({n_button, n_bomb}) {

    getRandomNum = (n, len) => {
        var arr = [];
        while(arr.length < len){
            var r = Math.floor(Math.random() * n) + 1;
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        
        return arr
    }

    let button_list = [...Array(n_button).keys()];
    let bomb_idx = this.getRandomNum(n_button, n_bomb)

    return (
        <View style={styles.buttonGroup}>
        {
            button_list.map((x, i) => {
                return <NewButton 
                            key={x} 
                            title={String(x)} 
                            isBomb={bomb_idx.includes(x)?true:false}
                        />
            })
        }   
        </View>
    );
}

const styles = StyleSheet.create({
    buttonGroup: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        
    }
});
