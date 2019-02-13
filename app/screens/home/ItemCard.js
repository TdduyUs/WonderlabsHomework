import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import {Text, Icon, Badge} from 'native-base';
import styles from './styles';

const defaultImg = require("../../assets/images/default-img.png");

class ItemTask extends Component {

    render() {
        let {item, _clickItem} = this.props
        let img = null;
        if (!!item.images)
            img = {uri: item.images[0].src};
        else
            img = defaultImg;
        return (
            <View>
                {
                    !!item && <TouchableOpacity style={styles.itemCard}
                                      onPress={() => _clickItem()}>
                        <Image style={styles.itemImage} source={img}/>
                        <View style={styles.overlay}>
                            <Text style={styles.headline} numberOfLines={1}>{item.name}</Text>
                            <Text style={styles.headline}>${item.price}</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

export default ItemTask
